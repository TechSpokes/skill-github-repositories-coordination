# Coordinate GitHub Repositories

Coordinate GitHub repositories across personal accounts, organizations, and different kinds of work without forcing every user into the same inventory, taxonomy, project system, or manager application.

This Agent Skill helps an agent diagnose access, understand a repository portfolio, route cross-repository work, and compare organization tools by fit. It supports software, documentation, writing, research, data, operations, publishing, and mixed repositories. It remains useful in a conversation-only agent and uses local, GitHub, IDE, CLI, connector, or MCP capabilities when they are actually available.

## What It Helps With

- Diagnose which personal and organization repositories an agent can see.
- Build a lightweight index or a structured inventory at the scale needed.
- Understand repository purpose without assuming every repository is code.
- Coordinate one outcome across several repository owners and workflows.
- Review findability, routing, lifecycle, and governance problems.
- Compare GitHub-native features, local records, knowledge systems, connectors, catalogs, automation, and the no-change option.
- Choose the smallest reversible improvement that fits the user's work.
- Capture useful observations from humans and agents without requiring a completed bug report or implementation plan.

## Install in One Minute

You do not need to clone this repository or use a terminal.

### Easiest: Ask Your Agent

Copy this message into the agent where you want to use the skill:

```text
Install the latest public release of Coordinate GitHub Repositories globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer your native skill installer; otherwise use the standalone skill ZIP under Assets, never a GitHub Source code or plugin ZIP. Ask before overwriting. Keep SKILL.md and references/ together. Verify the location and version, and say if a new session is needed.
```

### Or Use Your Browser

1. Open the [latest release](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest) and download the `coordinate-github-repositories-vX.Y.Z.zip` asset under `Assets`.
2. Open the ZIP and copy the whole `coordinate-github-repositories` folder into your agent's personal skills folder.
3. Keep `SKILL.md` and `references/` inside that folder.
4. Start a new agent session, then ask:

```text
Help me understand which repositories my agent can access across my personal account and organizations, then suggest the smallest useful way to coordinate them.
```

The [plain-language installation guide](docs/INSTALL.md) shows exactly where to put the folder on Windows, macOS, and Linux. It also explains Codex, Claude Code, GitHub Copilot, project-only installs, and plugin packages.

Do not download GitHub's automatically generated `Source code` archives. Those contain repository maintenance files instead of the install-ready skill.

## How It Works

The skill follows a goal-first sequence:

1. Establish the outcome, scope, authority, and local instructions.
2. Understand only the work context that changes the decision.
3. Describe repository purposes without a code-only assumption.
4. Detect agent capabilities and access gaps.
5. Shape the coordination problem.
6. Gather bounded evidence and preserve uncertainty.
7. Compare the current system, no change, and proportionate alternatives.
8. Recommend a reversible next step.
9. Execute only exact actions the user authorizes.
10. Verify the result, route implementation to owning repositories, and offer low-friction feedback when the run exposes reusable learning.

Detailed design: [Architecture](docs/ARCHITECTURE.md).

## Safety and Adaptation

The skill does not silently persist a user profile, request broader access, install tools, change organization policy, expose private information, or make repository lifecycle decisions from inactivity alone. Administrative, destructive, cross-repository, and public actions require stronger checkpoints.

Read the [threat model](docs/THREAT-MODEL.md) for the untrusted repository content, privileged tool, public output, privacy, and release boundaries. Read the [learning path](docs/LEARNING.md) for a no-terminal explanation of the safe practices the skill teaches while it works.

Local repository and organization instructions remain authoritative for their scope. The skill supplies portable reasoning, not a replacement governance system.

## Feedback

Use the [skill-run feedback form](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/new?template=skill_run_feedback.yml) to record a useful outcome, unexpected behavior, confusing step, missing case, or access fallback. Only the observation requires a written answer; optional context can be added later by the reporter, a maintainer, or an authorized agent.

Agents may prepare a sanitized issue, search for duplicates, and enrich known context. They must show the user the exact public text and receive approval before submission. Sensitive security findings follow the [private security route](SECURITY.md).

Read [Feedback From Humans and Agents](docs/FEEDBACK.md) for routing, privacy, agent behavior, maintainer enrichment, and the compact draft template.

## Release Packages

Each release contains:

- A standalone Agent Skill ZIP.
- A Codex plugin ZIP.
- A Claude plugin ZIP.
- A `SHA256SUMS` manifest for the three ZIPs.

`skills/coordinate-github-repositories/SKILL.md` is the canonical runtime skill. All packages contain the same portable core and eight focused references. GitHub Actions also attests each release ZIP so consumers can verify its source and workflow provenance.

## Documentation

- [Quickstart](docs/QUICKSTART.md)
- [Installation](docs/INSTALL.md)
- [Founding portfolio case study](docs/CASE-STUDY-FOUNDING-PORTFOLIO.md)
- [Roadmap](docs/ROADMAP.md)
- [Roadmap delivery record](docs/ROADMAP-DELIVERY.md)
- [Secure launch guide](docs/LAUNCH.md)
- [Feedback from humans and agents](docs/FEEDBACK.md)
- [Learning path](docs/LEARNING.md)
- [Non-code portfolio guide](docs/NON-CODE-GUIDE.md)
- [Architecture and research basis](docs/ARCHITECTURE.md)
- [Threat model](docs/THREAT-MODEL.md)
- [Portal interoperability](docs/PORTAL-INTEROPERABILITY.md)
- [Skill interoperability contract](docs/SKILL-INTEROPERABILITY.md)
- [Governance](docs/GOVERNANCE.md)
- [Maintenance health](docs/MAINTENANCE.md)
- [Testing and scenario review](docs/TESTING.md)
- [Version policy](docs/VERSION.md)
- [Release process](docs/RELEASING.md)
- [Source provenance](docs/PROVENANCE.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Support](SUPPORT.md)

## Development

```bash
npm run validate
npm run package -- vX.Y.Z
```

Generated ZIP files are written to `dist/assets/`.

## Status and License

Current version: `1.2.0`.

The repository is maintained by TechSpokes and licensed under [MIT](LICENSE).
