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
      if (manifest["repository"] !== "https://github.com/TechSpokes/skill-github-repositories-coordination") {
        fail(`${manifestPath} has an unexpected repository URL.`);
      }
      if (manifestPath.includes(".codex-plugin")) {
        for (const key of ["displayName", "shortDescription", "longDescription", "developerName", "category"]) {
          if (!manifest["interface"]?.[key]) {
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
  const sourceFiles = walk("skills/coordinate-github-repositories");
  for (const file of sourceFiles) {
    const text = fs.readFileSync(path.join(root, file));
    if (!bootstrapMode && text.includes(Buffer.from(".template/"))) {
      fail(`${file} references bootstrap control files.`);
    }
  }
}

function validateInstallationContract() {
  const version = readJson("package.json").version;
  const skillName = "coordinate-github-repositories";
  const latestRelease = "releases/latest";
  const assetPattern = `${skillName}-vX.Y.Z.zip`;
  const installPrompt = "Install the latest public release of Coordinate GitHub Repositories globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer your native skill installer; otherwise use the standalone skill ZIP under Assets, never a GitHub Source code or plugin ZIP. Ask before overwriting. Keep SKILL.md and references/ together. Verify the location and version, and say if a new session is needed.";
  const readme = readText("README.md");
  const install = readText("docs/INSTALL.md");
  const quickstart = readText("docs/QUICKSTART.md");
  const evergreenDocs = [
    ["README.md", readme],
    ["docs/INSTALL.md", install],
    ["docs/QUICKSTART.md", quickstart],
  ];

  if (!readme.includes(`Current version: \`${version}\`.`)) {
    fail("README.md current version must match package.json.");
  }
  if (!/Source code \(zip\)|Source code ZIP/.test(install)) {
    fail("docs/INSTALL.md must warn against GitHub's automatic Source code archive.");
  }

  for (const [file, text] of evergreenDocs) {
    if (!text.includes(latestRelease)) {
      fail(`${file} must link to the latest release without baking in a version.`);
    }
    if (!text.includes(assetPattern)) {
      fail(`${file} must identify the maintenance-free standalone asset pattern ${assetPattern}.`);
    }
    if (!text.includes(installPrompt)) {
      fail(`${file} must include the canonical maintenance-free installation prompt.`);
    }
    if (/releases\/latest\/download\/coordinate-github-repositories-v\d+\.\d+\.\d+\.zip/.test(text)) {
      fail(`${file} must not bake a version into the latest-release download path.`);
    }
  }

  if (!install.includes("latest tagged release") || !install.includes("https://cli.github.com/manual/gh_skill_install")) {
    fail("docs/INSTALL.md must explain and source GitHub CLI's versionless latest-release resolution.");
  }

  for (const agent of ["codex", "github-copilot", "claude-code"]) {
    const expected = `${skillName} --agent ${agent} --scope user`;
    if (!install.includes(expected)) {
      fail(`docs/INSTALL.md is missing the user-scope GitHub CLI example for ${agent}.`);
    }
  }

  if (/gh skill install[^\n]*coordinate-github-repositories@v\d+\.\d+\.\d+/.test(install)) {
    fail("docs/INSTALL.md evergreen GitHub CLI examples must not pin a release version.");
  }

  for (const file of ["AGENTS.md", "README.md", "CONTRIBUTING.md", "docs/TESTING.md", "docs/RELEASING.md"]) {
    if (/npm run package -- v\d+\.\d+\.\d+/.test(readText(file))) {
      fail(`${file} must use vX.Y.Z instead of a maintained package-command version.`);
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
    "docs/CASE-STUDY-FOUNDING-PORTFOLIO.md",
    "docs/FEEDBACK.md",
    "docs/GOVERNANCE.md",
    "docs/INSTALL.md",
    "docs/LAUNCH.md",
    "docs/LEARNING.md",
    "docs/MAINTENANCE.md",
    "docs/NON-CODE-GUIDE.md",
    "docs/PORTAL-INTEROPERABILITY.md",
    "docs/PROGRAM-EVIDENCE.md",
    "docs/QUICKSTART.md",
    "docs/ROADMAP.md",
    "docs/ROADMAP-DELIVERY.md",
    "docs/RELEASING.md",
    "docs/SKILL-INTEROPERABILITY.md",
    "docs/TESTING.md",
    "docs/THREAT-MODEL.md",
    "docs/VERSION.md",
    "docs/decisions/README.md",
    ".github/ISSUE_TEMPLATE/skill_run_feedback.yml",
    "tests/fixtures/activation.md",
    "tests/fixtures/adversarial-scenarios.md",
    "tests/fixtures/behavior-scenarios.md",
    "tests/evals/cases.json"
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

  // @constraints Every runtime reference must remain one level deep and directly discoverable from SKILL.md.
  const skillText = readText("skills/coordinate-github-repositories/SKILL.md");
  const directReferenceLinks = new Set(
    [...skillText.matchAll(/]\(references\/([a-z0-9-]+\.md)\)/g)].map((match) => match[1])
  );
  const referenceFiles = walk("skills/coordinate-github-repositories/references").map((file) => path.basename(file));
  for (const referenceFile of referenceFiles) {
    if (!directReferenceLinks.has(referenceFile)) {
      fail(`Runtime reference ${referenceFile} must be linked directly from SKILL.md.`);
    }
  }

  // @constraints Checksum and provenance controls are release contracts, not optional documentation claims.
  const packageScript = readText("scripts/package-release.mjs");
  if (!packageScript.includes("SHA256SUMS")) {
    fail("scripts/package-release.mjs must generate SHA256SUMS.");
  }
  for (const expected of ["fileURLToPath(import.meta.url)", "relative !== \"dist\"", "Refusing to reset unsafe release directory"]) {
    if (!packageScript.includes(expected)) {
      fail(`scripts/package-release.mjs is missing the release cleanup safety contract: ${expected}.`);
    }
  }

  const releaseWorkflow = readText(".github/workflows/release-draft.yml");
  for (const expected of ["attestations: write", "id-token: write", "actions/attest@v4", "subject-path: dist/assets/*.zip", "dist/assets/SHA256SUMS --clobber"]) {
    if (!releaseWorkflow.includes(expected)) {
      fail(`.github/workflows/release-draft.yml is missing release provenance contract: ${expected}.`);
    }
  }
}

function validateFeedbackContract() {
  // @constraints Program Decision 0003 keeps missing adoption evidence from freezing safe repository delivery.
  const roadmap = readText("docs/ROADMAP.md");
  const delivery = readText("docs/ROADMAP-DELIVERY.md");
  const feedback = readText("docs/FEEDBACK.md");
  const skill = readText("skills/coordinate-github-repositories/SKILL.md");
  const reference = readText("skills/coordinate-github-repositories/references/feedback-and-improvement.md");
  const form = readText(".github/ISSUE_TEMPLATE/skill_run_feedback.yml");

  for (const expected of ["Missing external evidence limits adoption claims", "They are not hard dependencies", "Program Decision 0003"]) {
    if (!roadmap.includes(expected)) {
      fail(`docs/ROADMAP.md is missing the evidence-aware delivery contract: ${expected}.`);
    }
  }
  if (!delivery.includes("repository-controlled work") || !delivery.includes("are not claimed")) {
    fail("docs/ROADMAP-DELIVERY.md must separate delivered repository work from unproven external outcomes.");
  }

  // @constraints Feedback intake stays useful when a person knows only the observation; enrichment is agent or maintainer work.
  const requiredFields = form.match(/required:\s*true/g) ?? [];
  if (requiredFields.length !== 2 || !form.includes("id: observation") || !form.includes("id: privacy_review")) {
    fail("The skill-run feedback form must require one written observation and one privacy confirmation.");
  }
  for (const expected of ["Only Observation asks for a written response", "simple record", "Privacy review", "private security route"]) {
    if (!form.includes(expected)) {
      fail(`The skill-run feedback form is missing the low-friction safety contract: ${expected}.`);
    }
  }

  for (const [file, text] of [
    ["docs/FEEDBACK.md", feedback],
    ["skills/coordinate-github-repositories/SKILL.md", skill],
    ["skills/coordinate-github-repositories/references/feedback-and-improvement.md", reference]
  ]) {
    for (const expected of ["observation", "hypothesis", "exact public", "never submit feedback automatically"]) {
      if (!text.toLowerCase().includes(expected.toLowerCase())) {
        fail(`${file} is missing the human-agent feedback contract: ${expected}.`);
      }
    }
  }
}

function validateDecisionRecords() {
  // @constraints Historical records are indexed by decision type instead of being hard-coded as current repository dependencies.
  const index = readText("docs/decisions/README.md");
  const allowedTypes = new Set(["Architecture", "Program governance", "Evidence classification", "Governance"]);
  const records = walk("docs/decisions").filter((file) => file.endsWith(".md") && path.basename(file) !== "README.md");

  for (const file of records) {
    const text = readText(file);
    const type = text.match(/^Decision type:\s*([^\n.]+)\.?$/m)?.[1];
    if (!type || !allowedTypes.has(type)) {
      fail(`${file} must declare a recognized Decision type.`);
    }
    if (!index.includes(`(${path.basename(file)})`)) {
      fail(`${file} must be linked from docs/decisions/README.md.`);
    }
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

function validateReleaseMarkdownWrapping() {
  const releaseFiles = walk("docs/releases").filter((file) => file.endsWith(".md") && exists(file));

  for (const file of releaseFiles) {
    const lines = readText(file).replace(/\r\n/g, "\n").split("\n");
    let inFence = false;
    let previousKind = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("```")) {
        inFence = !inFence;
        previousKind = null;
        continue;
      }
      if (inFence || trimmed.length === 0) {
        previousKind = null;
        continue;
      }
      if (/^#{1,6}\s|^\||^(?:[-*+] |\d+\. )|^>|^---+$/.test(trimmed)) {
        previousKind = /^(?:[-*+] |\d+\. )/.test(trimmed) ? "list" : null;
        continue;
      }
      if (previousKind === "prose" || (previousKind === "list" && /^\s/.test(line))) {
        fail(`${file} hard-wraps a paragraph or list item; keep each Markdown block on one physical source line.`);
        break;
      }
      previousKind = "prose";
    }
  }
}

validateSkill();
validateReferences();
validateManifests();
validateReleaseNotes();
validatePackagingBoundaries();
validateInstallationContract();
validateWorkflowMode();
validateRepositoryContract();
validateFeedbackContract();
validateDecisionRecords();
validateMarkdownStructure();
validateReleaseMarkdownWrapping();

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
