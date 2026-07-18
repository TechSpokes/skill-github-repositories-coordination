/* global process */
/**
 * Builds the three installable skill archives and their checksum manifest.
 * @since 1.0.0
 * @why Release consumers need byte-identical runtime packages with verifiable artifact identity.
 * @see ../docs/RELEASING.md
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceSkillDir = path.join(root, "skills", "coordinate-github-repositories");
const tag = process.argv[2];

if (!tag || !/^v[0-9]+\.[0-9]+\.[0-9]+([.-][A-Za-z0-9.-]+)?$/.test(tag)) {
  console.error("Usage: npm run package -- vX.Y.Z");
  process.exit(1);
}

const version = tag.slice(1);
const skill = parseSkill();
const dist = path.join(root, "dist");
const stage = path.join(dist, "stage");
const assets = path.join(dist, "assets");

resetDir(dist);
fs.mkdirSync(stage, { recursive: true });
fs.mkdirSync(assets, { recursive: true });

stageStandalone(skill.name);
stagePlugin("codex", skill.name, version);
stagePlugin("claude", skill.name, version);

const standaloneAsset = path.join(assets, `${skill.name}-${tag}.zip`);
const codexAsset = path.join(assets, `${skill.name}-codex-plugin-${tag}.zip`);
const claudeAsset = path.join(assets, `${skill.name}-claude-plugin-${tag}.zip`);

zipDirectory(path.join(stage, skill.name), standaloneAsset);
zipDirectory(
  path.join(stage, `${skill.name}-codex-plugin`),
  codexAsset
);
zipDirectory(
  path.join(stage, `${skill.name}-claude-plugin`),
  claudeAsset
);
writeChecksums([standaloneAsset, codexAsset, claudeAsset], path.join(assets, "SHA256SUMS"));

console.log(`Packaged release assets for ${skill.name} ${tag}.`);

function parseSkill() {
  const skillPath = path.join(sourceSkillDir, "SKILL.md");
  const text = fs.readFileSync(skillPath, "utf8");
  const name = text.match(/\n?name:\s*([a-z0-9-]+)/)?.[1];
  const description = text.match(/\n?description:\s*(.+)/)?.[1]?.trim();

  if (!name) {
    throw new Error("The canonical SKILL.md is missing a valid name.");
  }

  return { name, description };
}

function resetDir(directory) {
  const resolved = path.resolve(directory);
  const relative = path.relative(root, resolved);
  // @constraints Recursive cleanup is limited to this repository's generated dist directory.
  if (relative !== "dist" || path.isAbsolute(relative)) {
    throw new Error(`Refusing to reset unsafe release directory: ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
  fs.mkdirSync(resolved, { recursive: true });
}

// @constraints Release copies drop placeholders, explicit maintenance entries, and directories emptied by those exclusions.
function copyDir(source, destination, excludedNames = new Set()) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.name === ".gitkeep" || excludedNames.has(entry.name)) {
      continue;
    }
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, destinationPath, excludedNames);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
  if (fs.readdirSync(destination).length === 0) {
    fs.rmdirSync(destination);
  }
}

function stageStandalone(skillName) {
  const target = path.join(stage, skillName);
  // @constraints Test fixtures validate maintenance behavior but are not runtime skill resources.
  copyDir(sourceSkillDir, target);
}

function stagePlugin(type, skillName, version) {
  const pluginName = `${skillName}-${type}-plugin`;
  const target = path.join(stage, pluginName);
  const manifestDir = type === "codex" ? ".codex-plugin" : ".claude-plugin";
  const manifestSource = path.join(root, "packaging", `${type}-plugin`);

  copyDir(manifestSource, target);
  copyDir(
    sourceSkillDir,
    path.join(target, "skills", skillName)
  );

  const manifestPath = path.join(target, manifestDir, "plugin.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = skillName;
  manifest.version = version;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

/**
 * Creates one ZIP with portable archivers and a final PowerShell fallback.
 * @param {string} source Absolute directory path to archive.
 * @param {string} destination Absolute ZIP path to create or replace.
 * @returns {void}
 * @throws {Error} When zip, archive-capable tar, and available PowerShell hosts all fail.
 * @sideEffects Creates or replaces the destination archive and streams archiver output.
 * @since 1.0.0
 */
function zipDirectory(source, destination) {
  const parent = path.dirname(source);
  const base = path.basename(source);
  const zip = spawnSync("zip", ["-r", destination, base], {
    cwd: parent,
    stdio: "inherit"
  });

  if (zip.status === 0) {
    return;
  }

  const tar = spawnSync("tar", ["-a", "-c", "-f", destination, base], {
    cwd: parent,
    stdio: "inherit"
  });

  if (tar.status === 0) {
    return;
  }

  const escapedSource = source.replaceAll("'", "''");
  const escapedDestination = destination.replaceAll("'", "''");
  const command = `Compress-Archive -LiteralPath '${escapedSource}' -DestinationPath '${escapedDestination}' -Force`;
  const fallbackHosts = process.platform === "win32" ? ["pwsh", "powershell"] : ["pwsh"];

  for (const host of fallbackHosts) {
    const powershell = spawnSync(host, ["-NoProfile", "-NonInteractive", "-Command", command], {
      stdio: "inherit"
    });
    if (powershell.status === 0) {
      return;
    }
  }

  throw new Error(`Unable to create ZIP ${destination}. Install zip, archive-capable tar, or PowerShell 7 and retry.`);
}

/**
 * Writes a deterministic SHA-256 manifest for release assets.
 * @param {string[]} files Absolute paths to the packaged release files.
 * @param {string} destination Absolute path of the checksum manifest to overwrite.
 * @returns {void}
 * @throws {Error} When an asset cannot be read or the manifest cannot be written.
 * @sideEffects Reads every asset and overwrites the destination file.
 * @since 1.1.0
 */
function writeChecksums(files, destination) {
  const lines = files
    .map((file) => {
      // @why PhpStorm's WEB_MODULE lacks the Node Hash overloads used by this dependency-free script.
      // noinspection JSCheckFunctionSignatures
      const digest = crypto.createHash("sha256").update(fs.readFileSync(file)).digest().toString("hex");
      return `${digest}  ${path.basename(file)}`;
    })
    .sort();
  fs.writeFileSync(destination, `${lines.join("\n")}\n`);
}
