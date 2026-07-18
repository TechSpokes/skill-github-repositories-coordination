/* global process */
/**
 * Validates the model-evaluation registry against its Markdown fixture contracts.
 * @since 1.1.0
 * @why Issue #7 requires fixture drift and segment coverage gaps to fail CI.
 * @see ../docs/TESTING.md
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const fixtureRoot = path.join(root, "tests", "fixtures");
const registryPath = path.join(root, "tests", "evals", "cases.json");
const failures = [];

/**
 * @typedef {object} EvaluationRegistry
 * @property {number} schema_version Registry schema version.
 * @property {string[]} required_segments Segments that must retain at least one case.
 * @property {Array<Record<string, unknown>>} cases Registered activation and scenario cases.
 */

function fail(message) {
  failures.push(message);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

/**
 * Extracts activation prompts and their expected routing from the fixture tables.
 * @param {string} text Normalized activation fixture text.
 * @returns {Array<{prompt: string, expected: string}>} Registered table rows in source order.
 * @since 1.1.0
 */
function parseActivationRows(text) {
  const rows = [];
  let expected = null;

  for (const line of text.split("\n")) {
    if (line === "## Should Activate") {
      expected = "activate";
      continue;
    }
    if (line === "## Should Not Activate as Primary") {
      expected = "handoff";
      continue;
    }
    if (!expected || !line.startsWith("| ") || line.includes("|---")) {
      continue;
    }
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells[0] === "Prompt" || cells.length !== 2) {
      continue;
    }
    rows.push({ prompt: cells[0], expected });
  }

  return rows;
}

/**
 * Extracts second-level scenario sections from one fixture.
 * @param {string} text Normalized scenario fixture text.
 * @returns {Map<string, string>} Scenario heading to section-body map.
 * @since 1.1.0
 */
function parseScenarioSections(text) {
  const sections = new Map();
  const matches = [...text.matchAll(/^## (.+)$/gm)];

  for (let index = 0; index < matches.length; index += 1) {
    const heading = matches[index][1].trim();
    const start = matches[index].index + matches[index][0].length;
    const end = matches[index + 1]?.index ?? text.length;
    sections.set(heading, text.slice(start, end));
  }

  return sections;
}

/**
 * Checks registry fields, IDs, case kinds, and required segment coverage.
 * @param {EvaluationRegistry} registry Parsed evaluation registry.
 * @returns {void}
 * @sideEffects Appends contract violations to the shared failure collection.
 * @since 1.1.0
 */
function validateRegistryShape(registry) {
  if (registry.schema_version !== 1) {
    fail("tests/evals/cases.json must use schema_version 1.");
  }
  if (!Array.isArray(registry.required_segments) || registry.required_segments.length === 0) {
    fail("tests/evals/cases.json must declare required_segments.");
  }
  if (!Array.isArray(registry.cases) || registry.cases.length === 0) {
    fail("tests/evals/cases.json must declare cases.");
    return;
  }

  const ids = new Set();
  const coveredSegments = new Set();
  for (const item of registry.cases) {
    for (const field of ["id", "kind", "fixture", "segment"]) {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        fail(`Evaluation case ${item.id ?? "<unknown>"} is missing ${field}.`);
      }
    }
    if (ids.has(item.id)) {
      fail(`Duplicate evaluation case id ${item.id}.`);
    }
    ids.add(item.id);
    coveredSegments.add(item.segment);

    if (item.kind === "activation") {
      if (typeof item.prompt !== "string" || !["activate", "handoff"].includes(item.expected)) {
        fail(`Activation case ${item.id} must declare prompt and expected.`);
      }
      continue;
    }
    if (item.kind === "scenario") {
      if (typeof item.heading !== "string" || !Array.isArray(item.baseline_risks) || item.baseline_risks.length === 0) {
        fail(`Scenario case ${item.id} must declare heading and baseline_risks.`);
      }
      continue;
    }
    fail(`Evaluation case ${item.id} has unsupported kind ${item.kind}.`);
  }

  for (const segment of registry.required_segments) {
    if (!coveredSegments.has(segment)) {
      fail(`Required evaluation segment ${segment} has no case.`);
    }
  }
}

/**
 * Checks that every activation row and registry case match exactly.
 * @param {EvaluationRegistry} registry Parsed evaluation registry.
 * @returns {void}
 * @sideEffects Reads the activation fixture and appends contract violations.
 * @since 1.1.0
 */
function validateActivationCases(registry) {
  const fixturePath = path.join(fixtureRoot, "activation.md");
  const fixtureRows = parseActivationRows(readText(fixturePath));
  const cases = registry.cases.filter((item) => item.kind === "activation");
  const caseKeys = new Set(cases.map((item) => `${item.expected}\u0000${item.prompt}`));
  const fixtureKeys = new Set(fixtureRows.map((item) => `${item.expected}\u0000${item.prompt}`));

  for (const row of fixtureRows) {
    if (!caseKeys.has(`${row.expected}\u0000${row.prompt}`)) {
      fail(`Activation fixture prompt is not registered: ${row.prompt}`);
    }
  }
  for (const item of cases) {
    if (item.fixture !== "activation.md") {
      fail(`Activation case ${item.id} must reference activation.md.`);
    }
    if (!fixtureKeys.has(`${item.expected}\u0000${item.prompt}`)) {
      fail(`Activation case ${item.id} does not match a fixture row.`);
    }
  }
}

/**
 * Checks scenario registration, required input text, and invariant structure.
 * @param {EvaluationRegistry} registry Parsed evaluation registry.
 * @param {string} fixtureName Fixture filename relative to tests/fixtures.
 * @returns {void}
 * @sideEffects Reads one fixture and appends contract violations.
 * @since 1.1.0
 */
function validateScenarioCases(registry, fixtureName) {
  const fixturePath = path.join(fixtureRoot, fixtureName);
  const sections = parseScenarioSections(readText(fixturePath));
  const cases = registry.cases.filter((item) => item.kind === "scenario" && item.fixture === fixtureName);
  const registeredHeadings = new Set(cases.map((item) => item.heading));

  for (const [heading, section] of sections) {
    if (!registeredHeadings.has(heading)) {
      fail(`${fixtureName} scenario is not registered: ${heading}`);
    }
    if (!/\nInput:\s+\S/.test(section)) {
      fail(`${fixtureName} scenario ${heading} is missing Input.`);
    }
    const invariants = section.match(/^- .+$/gm) ?? [];
    if (!section.includes("Expected invariants:") || invariants.length < 3) {
      fail(`${fixtureName} scenario ${heading} must contain at least three expected invariants.`);
    }
  }
  for (const item of cases) {
    if (!sections.has(item.heading)) {
      fail(`Scenario case ${item.id} does not match a ${fixtureName} heading.`);
    }
  }
}

/** @type {EvaluationRegistry | undefined} */
let registry;
try {
  registry = JSON.parse(readText(registryPath));
} catch (error) {
  fail(`Unable to parse tests/evals/cases.json: ${error.message}`);
}

if (registry) {
  validateRegistryShape(registry);
  validateActivationCases(registry);
  validateScenarioCases(registry, "behavior-scenarios.md");
  validateScenarioCases(registry, "adversarial-scenarios.md");
}

if (failures.length > 0) {
  console.error("Evaluation contract validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const caseCount = registry.cases.length;
const segmentCount = new Set(registry.cases.map((item) => item.segment)).size;
console.log(`Evaluation contract passed: ${caseCount} cases across ${segmentCount} segments.`);
