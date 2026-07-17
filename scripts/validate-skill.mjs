/* global process, Buffer */
/**
 * Validates the portable skill, maintenance repository, and release contracts.
 * @since 1.0.0
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];
const bootstrapMode = exists(".template");

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function parseFrontmatter(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return null;
  }

  const end = normalized.indexOf("\n---", 4);
  if (end === -1) {
    return null;
  }

  const block = normalized.slice(4, end).trim();
  const lines = block.split("\n");
  const data = {};
  const types = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2].trim();

    if (value === ">" || value === "|") {
      const folded = value === ">";
      const collected = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        collected.push(lines[index].trim());
      }
      data[key] = folded ? collected.join(" ") : collected.join("\n");
      types[key] = "string";
      continue;
    }

    if (value === "") {
      const collected = [];
      while (index + 1 < lines.length && /^\s+/.test(lines[index + 1])) {
        index += 1;
        collected.push(lines[index]);
      }
      data[key] = collected.join("\n");
      types[key] = "mapping";
      continue;
    }

    data[key] = value.replace(/^["']|["']$/g, "");
    types[key] = "string";
  }

  return { data, types, keys: Object.keys(data), raw: block };
}

function walk(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const files = [];
  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(relativePath));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

function validateSkill() {
  if (!exists("skills/coordinate-github-repositories/SKILL.md")) {
    fail("Missing skills/coordinate-github-repositories/SKILL.md.");
    return;
  }

  const skillText = readText("skills/coordinate-github-repositories/SKILL.md");
  const parsed = parseFrontmatter(skillText);
  if (!parsed) {
    fail("skills/coordinate-github-repositories/SKILL.md must start with YAML frontmatter.");
    return;
  }

  const { data: frontmatter, types } = parsed;
  const standardFields = new Set(["name", "description", "license", "compatibility", "metadata", "allowed-tools"]);
  const vscodeFields = new Set(["argument-hint", "user-invocable", "disable-model-invocation"]);

  for (const key of parsed.keys) {
    if (standardFields.has(key) || vscodeFields.has(key)) {
      continue;
    }
    warn(`skills/coordinate-github-repositories/SKILL.md has non-standard frontmatter field '${key}'. Prefer metadata for portable custom data.`);
  }

  if (!frontmatter.name) {
    fail("skills/coordinate-github-repositories/SKILL.md frontmatter is missing name.");
  } else if (frontmatter.name.length > 64) {
    fail("Skill name must be 64 characters or fewer.");
  } else if (frontmatter.name !== "coordinate-github-repositories") {
    fail("Skill name must match its containing directory.");
  } else if (!/^(?!.*--)[a-z0-9]+(-[a-z0-9]+)*$/.test(frontmatter.name)) {
    fail("Skill name must use lowercase letters, numbers, and hyphens, with no leading, trailing, or consecutive hyphens.");
  }

  if (!frontmatter.description) {
    fail("skills/coordinate-github-repositories/SKILL.md frontmatter is missing description.");
  } else if (frontmatter.description.length > 1024) {
    fail("Skill description must be 1024 characters or fewer.");
  } else {
    if (frontmatter.description.trim().length === 0) {
      fail("Skill description must be non-empty.");
    }
    if (frontmatter.description.length < 80) {
      warn("Skill description is short. Include what the skill does and when agents should use it.");
    }
    if (!/\b(use|when|asked|needs?|whenever|trigger|for)\b/i.test(frontmatter.description)) {
      warn("Skill description should include trigger context, not only capability description.");
    }
  }

  if (frontmatter["license"] !== undefined && frontmatter["license"].trim().length === 0) {
    fail("license must be non-empty when provided.");
  }

  if (frontmatter["compatibility"] !== undefined) {
    if (frontmatter["compatibility"].trim().length === 0) {
      fail("compatibility must be non-empty when provided.");
    }
    if (frontmatter["compatibility"].length > 500) {
      fail("compatibility must be 500 characters or fewer.");
    }
  }

  if (frontmatter.metadata !== undefined && types.metadata !== "mapping") {
    fail("metadata must be a YAML mapping when provided.");
  }

  if (frontmatter["allowed-tools"] !== undefined && types["allowed-tools"] !== "string") {
    fail("allowed-tools must be a space-separated string when provided.");
  }

  for (const key of ["user-invocable", "disable-model-invocation"]) {
    if (frontmatter[key] !== undefined && !/^(true|false)$/.test(frontmatter[key])) {
      fail(`${key} must be true or false when provided.`);
    }
  }

  if (frontmatter["argument-hint"] !== undefined && frontmatter["argument-hint"].trim().length === 0) {
    fail("argument-hint must be non-empty when provided.");
  }

  if (!bootstrapMode && skillText.includes(".template/")) {
    fail("skills/coordinate-github-repositories/SKILL.md must not reference .template/ after generation.");
  }
}

function validateReferences() {
  const markdownFiles = [
    ...walk("skills/coordinate-github-repositories"),
    ...walk("docs"),
    ...walk(".github"),
    "README.md",
    "AGENTS.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "SUPPORT.md"
  ].filter((file) => file.endsWith(".md") && exists(file));
  const linkPattern = /\[[^\]]+]\(([^)]+)\)/g;

  for (const file of markdownFiles) {
    const text = readText(file);
    let match;
    while ((match = linkPattern.exec(text)) !== null) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) {
        continue;
      }

      const cleaned = target.split("#")[0];
      if (!cleaned) {
        continue;
      }

      const resolved = path.normalize(path.join(path.dirname(file), cleaned));
      if (!exists(resolved)) {
        fail(`${file} links to missing file ${target}.`);
      }
    }
  }
}

function validateManifests() {
  const packageManifest = readJson("package.json");
  const skill = parseFrontmatter(readText("skills/coordinate-github-repositories/SKILL.md"))?.data;
  const manifestPaths = [
    "packaging/codex-plugin/.codex-plugin/plugin.json",
    "packaging/claude-plugin/.claude-plugin/plugin.json"
  ];

  for (const manifestPath of manifestPaths) {
    if (!exists(manifestPath)) {
      fail(`Missing ${manifestPath}.`);
      continue;
    }

    try {
      const manifest = readJson(manifestPath);
      for (const key of ["name", "version", "description", "license"]) {
        if (!manifest[key]) {
          fail(`${manifestPath} is missing ${key}.`);
        }
      }
      if (manifestPath.includes(".claude-plugin") && !manifest.displayName) {
        fail(`${manifestPath} is missing top-level displayName.`);
      }
      if (manifest.name !== skill?.name) {
        fail(`${manifestPath} name must match the skill name.`);
      }
      if (manifest.version !== packageManifest.version) {
        fail(`${manifestPath} version must match package.json.`);
      }
      if (manifest.repository !== "https://github.com/TechSpokes/skill-github-repositories-coordination") {
        fail(`${manifestPath} has an unexpected repository URL.`);
      }
      if (manifestPath.includes(".codex-plugin")) {
        for (const key of ["displayName", "shortDescription", "longDescription", "developerName", "category"]) {
          if (!manifest.interface?.[key]) {
            fail(`${manifestPath} is missing interface.${key}.`);
          }
        }
      }
    } catch (error) {
      fail(`${manifestPath} is not valid JSON: ${error.message}`);
    }
  }
}

function validateReleaseNotes() {
  if (!exists("CHANGELOG.md")) {
    fail("Missing CHANGELOG.md.");
  }

  if (!exists("docs/releases/README.md")) {
    fail("Missing docs/releases/README.md.");
  }

  const version = readJson("package.json").version;
  const tag = `v${version}`;
  if (!exists(`docs/releases/${tag}.md`)) {
    fail(`Missing docs/releases/${tag}.md.`);
  }
  if (!readText("CHANGELOG.md").includes(`## [${tag}]`)) {
    fail(`CHANGELOG.md is missing ## [${tag}].`);
  }
  if (!readText("docs/VERSION.md").includes(`Current version: \`${version}\`.`)) {
    fail("docs/VERSION.md does not match package.json.");
  }
}

function validatePackagingBoundaries() {
  const sourceFiles = walk("src");
  for (const file of sourceFiles) {
    const text = fs.readFileSync(path.join(root, file));
    if (!bootstrapMode && text.includes(Buffer.from(".template/"))) {
      fail(`${file} references bootstrap control files.`);
    }
  }
}

function validateWorkflowMode() {
  if (bootstrapMode) {
    if (!exists(".github/workflows/template-ci.yml")) {
      fail("Template mode requires .github/workflows/template-ci.yml.");
    }
    for (const workflow of [".github/workflows/ci.yml", ".github/workflows/release-draft.yml"]) {
      if (exists(workflow)) {
        fail(`${workflow} should live under .template/generated/ while the repository is in template mode.`);
      }
    }
    return;
  }

  if (exists(".github/workflows/template-ci.yml")) {
    fail("Maintenance mode must remove .github/workflows/template-ci.yml.");
  }
  for (const workflow of [".github/workflows/ci.yml", ".github/workflows/release-draft.yml"]) {
    if (!exists(workflow)) {
      fail(`Maintenance mode requires ${workflow}.`);
    }
  }
}

function validateRepositoryContract() {
  const requiredFiles = [
    "README.md",
    "AGENTS.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "SUPPORT.md",
    "docs/ARCHITECTURE.md",
    "docs/INSTALL.md",
    "docs/QUICKSTART.md",
    "docs/RELEASING.md",
    "docs/TESTING.md",
    "docs/VERSION.md",
    "tests/fixtures/activation.md",
    "tests/fixtures/behavior-scenarios.md"
  ];

  for (const file of requiredFiles) {
    if (!exists(file)) {
      fail(`Missing required maintenance file ${file}.`);
    }
  }

  const runtimeFiles = walk("skills/coordinate-github-repositories");
  const forbiddenRuntimePatterns = [
    { pattern: /placeholder-skill|OWNER\/REPOSITORY|Template Author/i, label: "placeholder text" },
    { pattern: /[A-Za-z]:\\Users\\/i, label: "absolute Windows user path" },
    { pattern: /\.template\//i, label: "bootstrap reference" },
    { pattern: /allowed-tools\s*:/i, label: "pre-approved tool frontmatter" }
  ];

  for (const file of runtimeFiles) {
    const text = readText(file);
    for (const { pattern, label } of forbiddenRuntimePatterns) {
      if (pattern.test(text)) {
        fail(`${file} contains forbidden ${label}.`);
      }
    }
  }

  const skillLineCount = readText("skills/coordinate-github-repositories/SKILL.md").replace(/\r\n/g, "\n").split("\n").length;
  if (skillLineCount > 500) {
    fail("skills/coordinate-github-repositories/SKILL.md must remain below 500 lines.");
  }
}

function validateMarkdownStructure() {
  const markdownFiles = [
    ...walk("skills/coordinate-github-repositories"),
    ...walk("docs"),
    "README.md",
    "AGENTS.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "SUPPORT.md"
  ].filter((file) => file.endsWith(".md") && exists(file));

  for (const file of markdownFiles) {
    const text = readText(file).replace(/\r\n/g, "\n");
    const headings = [...text.matchAll(/^(#{1,6})\s+\S.+$/gm)].map((match) => match[1].length);
    if (headings.filter((level) => level === 1).length !== 1) {
      fail(`${file} must contain exactly one H1.`);
    }
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index] > headings[index - 1] + 1) {
        fail(`${file} skips a heading level.`);
        break;
      }
    }
    if (/[\u2013\u2014\u2018\u2019\u201c\u201d]/u.test(text)) {
      fail(`${file} contains non-ASCII technical punctuation.`);
    }
    let inFence = false;
    for (const line of text.split("\n")) {
      if (!line.startsWith("```")) {
        continue;
      }
      if (!inFence && line.trim() === "```") {
        fail(`${file} contains an untagged fenced code block.`);
        break;
      }
      inFence = !inFence;
    }
  }
}

validateSkill();
validateReferences();
validateManifests();
validateReleaseNotes();
validatePackagingBoundaries();
validateWorkflowMode();
validateRepositoryContract();
validateMarkdownStructure();

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log("Validation passed.");
