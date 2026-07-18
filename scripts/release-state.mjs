#!/usr/bin/env node
/* global process */
import { appendFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const [command, ...argumentsList] = process.argv.slice(2);
const options = parseOptions(argumentsList);

if (command !== "guard" || !options.tag || !/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(options.tag)) {
  throw new Error("Usage: node scripts/release-state.mjs guard --tag vX.Y.Z [--github-output path]");
}

const state = guardTag(options.tag);
if (options.githubOutput) {
  appendFileSync(options.githubOutput, Object.entries(state).map(([key, value]) => `${key}=${value}`).join("\n") + "\n", "utf8");
}
console.log(JSON.stringify(state));

function guardTag(tag) {
  git(["fetch", "--quiet", "origin", "refs/heads/main:refs/remotes/origin/main", "refs/tags/*:refs/tags/*"]);
  const localType = git(["cat-file", "-t", `refs/tags/${tag}`]);
  if (localType !== "tag") {
    throw new Error(`${tag} must be an annotated tag.`);
  }

  const releaseCommit = git(["rev-parse", "--verify", `${tag}^{commit}`]);
  const headCommit = git(["rev-parse", "--verify", "HEAD^{commit}"]);
  if (releaseCommit !== headCommit) {
    throw new Error(`Checked out commit ${headCommit} does not match ${tag} at ${releaseCommit}.`);
  }

  const ancestry = spawnSync("git", ["merge-base", "--is-ancestor", releaseCommit, "origin/main"], { encoding: "utf8" });
  if (ancestry.status !== 0) {
    throw new Error(`${tag} is not reachable from origin/main.`);
  }

  const remoteLines = git(["ls-remote", "--tags", "origin", `refs/tags/${tag}`, `refs/tags/${tag}^{}`]).split(/\r?\n/);
  const remote = new Map(remoteLines.filter(Boolean).map((line) => {
    const [object, ref] = line.split(/\s+/, 2);
    return [ref, object];
  }));
  const remoteObject = remote.get(`refs/tags/${tag}`);
  const remoteCommit = remote.get(`refs/tags/${tag}^{}`);
  if (!remoteObject || !remoteCommit || remoteObject === remoteCommit || remoteCommit !== releaseCommit) {
    throw new Error(`${tag} must exist remotely as one annotated tag on ${releaseCommit}.`);
  }

  const version = tag.slice(1);
  const packageDocument = JSON.parse(git(["show", `${releaseCommit}:package.json`]));
  const codexManifest = JSON.parse(git(["show", `${releaseCommit}:packaging/codex-plugin/.codex-plugin/plugin.json`]));
  const claudeManifest = JSON.parse(git(["show", `${releaseCommit}:packaging/claude-plugin/.claude-plugin/plugin.json`]));
  if ([packageDocument.version, codexManifest.version, claudeManifest.version].some((candidate) => candidate !== version)) {
    throw new Error(`${tag} does not match every packaged version at ${releaseCommit}.`);
  }
  git(["cat-file", "-e", `${releaseCommit}:docs/releases/${tag}.md`]);
  const changelog = git(["show", `${releaseCommit}:CHANGELOG.md`]);
  if (!changelog.includes(`## [${tag}]`)) {
    throw new Error(`CHANGELOG.md at ${releaseCommit} is missing ## [${tag}].`);
  }

  return { tag, version, release_commit: releaseCommit };
}

function parseOptions(args) {
  const parsed = { tag: "", githubOutput: "" };
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!value || !["--tag", "--github-output"].includes(flag)) {
      throw new Error(`Invalid release-state option near ${flag || "<missing>"}.`);
    }
    parsed[flag === "--tag" ? "tag" : "githubOutput"] = value;
  }
  return parsed;
}

function git(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || `git ${args[0]} failed.`);
  }
  return result.stdout.trim();
}
