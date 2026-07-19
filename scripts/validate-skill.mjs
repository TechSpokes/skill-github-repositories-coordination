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
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/\r\n/g, "\n");
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
  const installPrompt = "Install the latest public Coordinate GitHub Repositories skill globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer `gh skill install`; otherwise use your native skill installer or the standalone release ZIP. Do not use GitHub's Source code archive or overwrite an existing copy without approval. Verify the source and final location.";
  const readme = readText("README.md");
  const install = readText("INSTALL.md");
  const quickstart = readText("docs/QUICKSTART.md");
  const evergreenDocs = [
    ["README.md", readme],
    ["INSTALL.md", install],
    ["docs/QUICKSTART.md", quickstart],
  ];

  if (!readme.includes(`Current version: \`${version}\`.`)) {
    fail("README.md current version must match package.json.");
  }
  if (!/Source code \(zip\)|Source code ZIP/.test(install)) {
    fail("INSTALL.md must warn against GitHub's automatic Source code archive.");
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

  if (!install.includes("latest published release") || !install.includes("https://cli.github.com/manual/gh_skill_install")) {
    fail("INSTALL.md must explain and source GitHub CLI's versionless latest-release resolution.");
  }

  for (const expected of ["gh skill --help", "gh skill update coordinate-github-repositories --dry-run", "GITHUB-CLI-DELIVERY.md"]) {
    if (!install.includes(expected)) {
      fail(`INSTALL.md is missing the GitHub CLI delivery contract: ${expected}.`);
    }
  }

  for (const agent of ["codex", "github-copilot", "claude-code"]) {
    const expected = `${skillName} --agent ${agent} --scope user`;
    if (!install.includes(expected)) {
      fail(`INSTALL.md is missing the user-scope GitHub CLI example for ${agent}.`);
    }
  }

  if (/gh skill install[^\n]*coordinate-github-repositories@v\d+\.\d+\.\d+/.test(install)) {
    fail("INSTALL.md evergreen GitHub CLI examples must not pin a release version.");
  }

  for (const file of ["INSTALL.md", "docs/GITHUB-CLI.md", "docs/GITHUB-CLI-DELIVERY.md"]) {
    const text = readText(file);
    if (/gh skill (?:install|update|preview)[^\n]*@v\d+\.\d+\.\d+/.test(text) || /latest (?:usable )?published v\d+\.\d+\.\d+ release/i.test(text)) {
      fail(`${file} evergreen GitHub CLI guidance must not bake in a project release version.`);
    }
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
    ".gitattributes",
    "README.md",
    "INSTALL.md",
    "AGENTS.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "SUPPORT.md",
    "docs/ARCHITECTURE.md",
    "docs/CASE-STUDY-FOUNDING-PORTFOLIO.md",
    "docs/FEEDBACK.md",
    "docs/GOVERNANCE.md",
    "docs/GITHUB-CLI-DELIVERY.md",
    "docs/GITHUB-CLI.md",
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
    "docs/WRITING.md",
    "docs/decisions/README.md",
    ".github/ISSUE_TEMPLATE/skill_run_feedback.yml",
    ".github/workflows/gh-skill-install.yml",
    ".github/workflows/release-abandon.yml",
    "scripts/verify-gh-skill-install.mjs",
    "skills/coordinate-github-repositories/references/install-and-update-this-skill.md",
    "skills/coordinate-github-repositories/references/goal-and-authority.md",
    "skills/coordinate-github-repositories/references/writing-quality.md",
    "tests/fixtures/agent-surface-contract.json",
    "tests/fixtures/activation.md",
    "tests/fixtures/adversarial-scenarios.md",
    "tests/fixtures/behavior-scenarios.md",
    "tests/fixtures/writing-corpus.json",
    "tests/evals/cases.json"
  ];

  for (const file of requiredFiles) {
    if (!exists(file)) {
      fail(`Missing required maintenance file ${file}.`);
    }
  }

  if (!readText(".gitattributes").split("\n").includes("* text=auto eol=lf")) {
    fail(".gitattributes must keep repository text deterministic across Windows, macOS, and Linux.");
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
  for (const expected of ["createStoredZip", "./lib/stored-zip.mjs", "copyReleaseFile", "replace(/\\r\\n/g, \"\\n\")"]) {
    if (!packageScript.includes(expected)) {
      fail(`scripts/package-release.mjs is missing deterministic cross-platform archive contract: ${expected}.`);
    }
  }

  const releaseWorkflow = readText(".github/workflows/release-draft.yml");
  for (const expected of ["attestations: write", "id-token: write", "actions/attest@v4", "subject-path: dist/assets/*.zip", "dist/assets/SHA256SUMS --clobber"]) {
    if (!releaseWorkflow.includes(expected)) {
      fail(`.github/workflows/release-draft.yml is missing release provenance contract: ${expected}.`);
    }
  }

  const ciWorkflow = readText(".github/workflows/ci.yml");
  for (const expected of ["gh skill publish --dry-run", "npm run release:verify-assets -- v0.0.0", "pull-request-checks-${{ github.ref }}"]) {
    if (!ciWorkflow.includes(expected)) {
      fail(`CI workflow is missing the pull-request release gate: ${expected}.`);
    }
  }
  for (const expected of ["npm run release:state -- guard", "npm run release:verify-assets", "gh skill install", "release-state-${{ github.event.inputs.tag || github.ref_name }}"]) {
    if (!releaseWorkflow.includes(expected)) {
      fail(`release workflow is missing the immutable tag delivery contract: ${expected}.`);
    }
  }

  const installWorkflow = readText(".github/workflows/gh-skill-install.yml");
  for (const expected of ["types:\n      - published", "permissions:\n  contents: read", "gh skill install", "gh skill update", "scripts/verify-gh-skill-install.mjs", "npm run verify:gh-skill", "Compare released runtime", "steps.runtime.outputs.changed", "Verify the unchanged runtime", "release-state-${{ github.event.release.tag_name }}"]) {
    if (!installWorkflow.includes(expected)) {
      fail(`.github/workflows/gh-skill-install.yml is missing delivery contract: ${expected}.`);
    }
  }

  const abandonmentWorkflow = readText(".github/workflows/release-abandon.yml");
  for (const expected of ["abandoned/v*.*.*", "npm run release:state -- inspect", "marker_state", "gh release delete", "permanently prohibited from publication"]) {
    if (!abandonmentWorkflow.includes(expected)) {
      fail(`.github/workflows/release-abandon.yml is missing abandonment contract: ${expected}.`);
    }
  }

  const assetVerifier = readText("scripts/verify-release-assets.mjs");
  if (!assetVerifier.includes("host-specific CRLF bytes")) {
    fail("scripts/verify-release-assets.mjs must reject host-specific CRLF package content.");
  }

  const packageManifest = readJson("package.json");
  if (packageManifest.scripts?.["verify:gh-skill"] !== "node scripts/verify-gh-skill-install.mjs") {
    fail("package.json must expose the platform-neutral GitHub CLI install verifier.");
  }
  for (const [name, command] of [
    ["release:preflight", "node scripts/release-preflight.mjs"],
    ["release:state", "node scripts/release-state.mjs"],
    ["release:verify-assets", "node scripts/verify-release-assets.mjs"]
  ]) {
    if (packageManifest.scripts?.[name] !== command) {
      fail(`package.json must expose ${name} as ${command}.`);
    }
  }
}

/**
 * Derives the runtime map from canonical files and rejects stale evergreen maintenance claims.
 * @returns {void}
 * @sideEffects Reads the agent-surface fixture and appends contract violations.
 * @why Issues #28 and #32 require partial agent instructions and public runtime maps to fail deterministically when they drift from the canonical tree.
 * @since 1.5.0
 */
function validateAgentSurfaceContract() {
  const fixturePath = "tests/fixtures/agent-surface-contract.json";
  if (!exists(fixturePath)) {
    fail(`Missing ${fixturePath}.`);
    return;
  }

  let contract;
  try {
    contract = readJson(fixturePath);
  } catch (error) {
    fail(`${fixturePath} is not valid JSON: ${error.message}`);
    return;
  }

  if (contract.schema_version !== 1) {
    fail(`${fixturePath} must use schema_version 1.`);
  }

  const runtimeFiles = new Set(
    walk(contract.canonical_runtime_root)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replaceAll("\\", "/"))
  );
  const mapDocument = readText(contract.runtime_map_document);
  const mapStart = mapDocument.indexOf(contract.runtime_map_start);
  const mapEnd = mapDocument.indexOf(contract.runtime_map_end);

  if (mapStart === -1 || mapEnd === -1 || mapEnd <= mapStart) {
    fail(`${contract.runtime_map_document} must contain the canonical runtime map markers in source order.`);
  } else {
    const mappedBlock = mapDocument.slice(mapStart, mapEnd);
    const mappedFiles = new Set(
      [...mappedBlock.matchAll(/`(skills\/coordinate-github-repositories\/(?:SKILL\.md|references\/[a-z0-9-]+\.md))`/g)].map((match) => match[1])
    );

    for (const file of runtimeFiles) {
      if (!mappedFiles.has(file)) {
        fail(`${contract.runtime_map_document} runtime map is missing ${file}.`);
      }
    }
    for (const file of mappedFiles) {
      if (!runtimeFiles.has(file)) {
        fail(`${contract.runtime_map_document} runtime map contains noncanonical file ${file}.`);
      }
    }
  }

  const agentInstructions = readText("AGENTS.md");
  for (const section of contract.required_agent_sections) {
    if (!new RegExp(`^## ${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(agentInstructions)) {
      fail(`AGENTS.md is missing required section ${section}.`);
    }
  }
  for (const document of contract.required_agent_documents) {
    if (!agentInstructions.includes(document)) {
      fail(`AGENTS.md must route the applicable decision to ${document}.`);
    }
  }

  for (const claim of contract.forbidden_claims) {
    let pattern;
    try {
      pattern = new RegExp(claim.pattern, "i");
    } catch (error) {
      fail(`${fixturePath} has invalid pattern ${claim.id}: ${error.message}`);
      continue;
    }
    for (const document of claim.documents) {
      if (pattern.test(readText(document))) {
        fail(`${document} contains forbidden evergreen claim ${claim.id}.`);
      }
    }
  }

  for (const claim of contract.required_current_claims) {
    if (!readText(claim.document).includes(claim.text)) {
      fail(`${claim.document} is missing current implementation claim: ${claim.text}.`);
    }
  }
}

function validateFeedbackContract() {
  // @constraints Program Decision 0003 keeps missing external adoption evidence from freezing safe repository delivery.
  const roadmap = readText("docs/ROADMAP.md");
  const delivery = readText("docs/ROADMAP-DELIVERY.md");
  const feedback = readText("docs/FEEDBACK.md");
  const skill = readText("skills/coordinate-github-repositories/SKILL.md");
  const reference = readText("skills/coordinate-github-repositories/references/feedback-and-improvement.md");
  const form = readText(".github/ISSUE_TEMPLATE/skill_run_feedback.yml");

  for (const expected of ["Missing external adoption evidence limits claims", "They are not hard dependencies", "Program Decision 0003"]) {
    if (!roadmap.includes(expected)) {
      fail(`docs/ROADMAP.md is missing the evidence and claim boundary: ${expected}.`);
    }
  }
  if (!delivery.includes("roadmap issues #7 through #13") || !delivery.includes("are not claimed")) {
    fail("docs/ROADMAP-DELIVERY.md must separate delivered repository work from unproven external outcomes.");
  }

  // @constraints Feedback intake stays useful when a person knows only the observation; enrichment is agent or maintainer work.
  const requiredFields = form.match(/required:\s*true/g) ?? [];
  if (requiredFields.length !== 2 || !form.includes("id: observation") || !form.includes("id: privacy_review")) {
    fail("The skill-run feedback form must require one written observation and one privacy confirmation.");
  }
  for (const expected of ["Only Observation requires text", "simple record", "Privacy review", "private security route"]) {
    if (!form.includes(expected)) {
      fail(`The feedback form is missing the simple intake or privacy contract: ${expected}.`);
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
  // @constraints Issue #19 requires validation to discover historical records instead of hard-coding the files from one release.
  const index = readText("docs/decisions/README.md");
  const markedBlock = (startMarker, endMarker, label) => {
    const start = index.indexOf(startMarker);
    const end = index.indexOf(endMarker);
    if (start === -1 || end === -1 || end <= start) {
      fail(`docs/decisions/README.md must contain the ${label} markers in source order.`);
      return null;
    }
    return index.slice(start + startMarker.length, end);
  };

  const typeBlock = markedBlock("<!-- decision-types:start -->", "<!-- decision-types:end -->", "decision type registry");
  const recordIndexBlock = markedBlock("<!-- decision-index:start -->", "<!-- decision-index:end -->", "decision index");
  if (typeBlock === null || recordIndexBlock === null) {
    return;
  }

  const declaredTypes = [...typeBlock.matchAll(/^- `([^`\n]+)`:/gm)].map((match) => match[1]);
  const allowedTypes = new Set(declaredTypes);
  if (declaredTypes.length === 0 || allowedTypes.size !== declaredTypes.length) {
    fail("docs/decisions/README.md must declare unique canonical decision types inside the type registry markers.");
  }

  const records = walk("docs/decisions").filter((file) => file.endsWith(".md") && path.basename(file) !== "README.md");
  const recordNames = new Set(records.map((file) => path.basename(file)));
  const indexedNames = [...recordIndexBlock.matchAll(/\]\((\d{4}-[a-z0-9]+(?:-[a-z0-9]+)*\.md)\)/g)].map((match) => match[1]);
  const numberOwners = new Map();

  for (const file of records) {
    const text = readText(file);
    const filename = path.basename(file);
    const filenameMatch = filename.match(/^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/);
    if (!filenameMatch) {
      fail(`${file} must use the stable NNNN-lowercase-dashed-title.md filename format.`);
      continue;
    }

    const identifier = filenameMatch[1];
    if (numberOwners.has(identifier)) {
      fail(`${file} reuses decision identifier ${identifier} already owned by ${numberOwners.get(identifier)}.`);
    } else {
      numberOwners.set(identifier, file);
    }

    const type = text.match(/^Decision type:\s*([^\n.]+)\.?$/m)?.[1];
    if (!type || !allowedTypes.has(type)) {
      fail(`${file} must declare a recognized Decision type.`);
    } else {
      const displayType = type.split(/\s+/)[0];
      if (!text.startsWith(`# ${displayType} Decision ${identifier}: `)) {
        fail(`${file} title must match its Decision type and identifier.`);
      }
    }

    for (const section of ["Status", "Context", "Decision", "Consequences", "Links"]) {
      if (!new RegExp(`^## ${section}$`, "m").test(text)) {
        fail(`${file} must contain a ${section} section.`);
      }
    }
    if (!/^## Review Triggers?$/m.test(text)) {
      fail(`${file} must contain a Review Trigger or Review Triggers section.`);
    }

    const indexEntryCount = indexedNames.filter((name) => name === filename).length;
    if (indexEntryCount !== 1) {
      fail(`${file} must appear exactly once inside the decision index markers.`);
    }
  }

  for (const filename of indexedNames) {
    if (!recordNames.has(filename)) {
      fail(`docs/decisions/README.md indexes missing decision record ${filename}.`);
    }
  }
}

/**
 * Validates the routed writing guidance and the reviewed repair and protection corpus.
 * @returns {void}
 * @sideEffects Reads local writing-control files and appends contract violations.
 * @constraints This check validates structure and applied revisions only; it never scores grammar, naturalness, or authorship.
 * @since 1.6.0
 */
function validateWritingContract() {
  const instructionPath = ".github/instructions/writing.instructions.md";
  const guidePath = "docs/WRITING.md";
  const referencePath = "skills/coordinate-github-repositories/references/writing-quality.md";
  const corpusPath = "tests/fixtures/writing-corpus.json";

  for (const file of [instructionPath, guidePath, referencePath, corpusPath]) {
    if (!exists(file)) {
      fail(`Missing writing quality file ${file}.`);
      return;
    }
  }

  const agentInstructions = readText("AGENTS.md");
  for (const file of [instructionPath, guidePath]) {
    if (!agentInstructions.includes(file)) {
      fail(`AGENTS.md must route prose maintenance to ${file}.`);
    }
  }

  const skill = readText("skills/coordinate-github-repositories/SKILL.md");
  if (!skill.includes("](references/writing-quality.md)") || !skill.includes("only when the user requests a language quality pass")) {
    fail("SKILL.md must route the optional writing quality pass without loading it for every run.");
  }

  const guide = readText(guidePath);
  for (const expected of ["American English", "does not use style as an authorship detector", "adds no grammar dependency", "optional writing quality pass"]) {
    if (!guide.includes(expected)) {
      fail(`${guidePath} is missing the writing quality boundary: ${expected}.`);
    }
  }

  let corpus;
  try {
    corpus = readJson(corpusPath);
  } catch (error) {
    fail(`${corpusPath} is not valid JSON: ${error.message}`);
    return;
  }

  if (corpus.schema_version !== 1) {
    fail(`${corpusPath} must use schema_version 1.`);
  }
  if (!Array.isArray(corpus.repairs) || corpus.repairs.length < 20) {
    fail(`${corpusPath} must contain at least 20 reviewed repair cases.`);
  }
  if (!Array.isArray(corpus.protected) || corpus.protected.length < 8) {
    fail(`${corpusPath} must contain at least eight protected examples.`);
  }

  const requiredSurfaces = new Set(corpus.required_surfaces ?? []);
  const coveredSurfaces = new Set((corpus.repairs ?? []).map((item) => item.surface));
  for (const surface of requiredSurfaces) {
    if (!coveredSurfaces.has(surface)) {
      fail(`${corpusPath} has no repair for required surface ${surface}.`);
    }
  }

  const ids = new Set();
  for (const item of [...(corpus.repairs ?? []), ...(corpus.protected ?? [])]) {
    if (typeof item.id !== "string" || item.id.trim() === "") {
      fail(`${corpusPath} contains a case without an id.`);
      continue;
    }
    if (ids.has(item.id)) {
      fail(`${corpusPath} contains duplicate id ${item.id}.`);
    }
    ids.add(item.id);
  }

  for (const item of corpus.repairs ?? []) {
    for (const field of ["surface", "source", "artifact", "before", "after"]) {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        fail(`${corpusPath} repair ${item.id} is missing ${field}.`);
      }
    }
    if (!Array.isArray(item.preserves) || item.preserves.length === 0) {
      fail(`${corpusPath} repair ${item.id} must declare preserved meaning.`);
    }
    if (item.before === item.after) {
      fail(`${corpusPath} repair ${item.id} does not change the text.`);
    }
    if (typeof item.source === "string" && exists(item.source) && typeof item.after === "string" && !readText(item.source).includes(item.after)) {
      fail(`${corpusPath} repair ${item.id} is not applied in ${item.source}.`);
    }
  }

  for (const item of corpus.protected ?? []) {
    if (typeof item.text !== "string" || typeof item.reason !== "string" || !Array.isArray(item.protected_literals) || item.protected_literals.length === 0) {
      fail(`${corpusPath} protected case ${item.id} is incomplete.`);
      continue;
    }
    for (const literal of item.protected_literals) {
      if (!item.text.includes(literal)) {
        fail(`${corpusPath} protected case ${item.id} does not contain literal ${literal}.`);
      }
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
validateAgentSurfaceContract();
validateFeedbackContract();
validateDecisionRecords();
validateWritingContract();
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
