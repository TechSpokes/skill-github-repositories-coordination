# Coordinate GitHub Repositories

Coordinate GitHub repositories across personal accounts, organizations, and
different kinds of work without forcing every user into the same inventory,
taxonomy, project system, or manager application.

This Agent Skill helps an agent diagnose access, understand a repository
portfolio, route cross-repository work, and compare organization tools by fit.
It supports software, documentation, writing, research, data, operations,
publishing, and mixed repositories. It remains useful in a conversation-only
agent and uses local, GitHub, IDE, CLI, connector, or MCP capabilities when they
are actually available.

## What It Helps With

- Diagnose which personal and organization repositories an agent can see.
- Build a lightweight index or a structured inventory at the scale needed.
- Understand repository purpose without assuming every repository is code.
- Coordinate one outcome across several repository owners and workflows.
- Review findability, routing, lifecycle, and governance problems.
- Compare GitHub-native features, local records, knowledge systems, connectors,
  catalogs, automation, and the no-change option.
- Choose the smallest reversible improvement that fits the user's work.

## Quick Start

1. Download the standalone ZIP from the latest GitHub release.
2. Extract `coordinate-github-repositories` into a user-level skills directory
   supported by your agent.
3. Start a new agent session if the host does not detect skill changes live.
4. Ask a repository-centered question such as:

```text
Help me understand which repositories my agent can access across my personal
account and organizations, then suggest the smallest useful way to coordinate
them.
```

See [installation options](docs/INSTALL.md) for Codex, Claude Code, GitHub
Copilot, project-scoped use, and plugin packages.

## How It Works

The skill follows a context-first sequence:

1. Establish the outcome, scope, authority, and local instructions.
2. Understand only the work context that changes the decision.
3. Describe repository purposes without a code-only assumption.
4. Detect agent capabilities and access gaps.
5. Shape the coordination problem.
6. Gather bounded evidence and preserve uncertainty.
7. Compare the current system, no change, and proportionate alternatives.
8. Recommend a reversible next step.
9. Execute only exact actions the user authorizes.
10. Verify the result and route implementation to owning repositories.

Detailed design: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Safety and Adaptation

The skill does not silently persist a user profile, request broader access,
install tools, change organization policy, expose private information, or make
repository lifecycle decisions from inactivity alone. Administrative,
destructive, cross-repository, and public actions require stronger checkpoints.

Local repository and organization instructions remain authoritative for their
scope. The skill supplies portable reasoning, not a replacement governance
system.

## Release Packages

Each release contains:

- A standalone Agent Skill ZIP.
- A Codex plugin ZIP.
- A Claude plugin ZIP.

`skills/coordinate-github-repositories/SKILL.md` is the canonical runtime skill. All packages contain the same
portable core and focused references.

## Documentation

- [Quickstart](docs/QUICKSTART.md)
- [Installation](docs/INSTALL.md)
- [Architecture and research basis](docs/ARCHITECTURE.md)
- [Testing and scenario review](docs/TESTING.md)
- [Version policy](docs/VERSION.md)
- [Release process](docs/RELEASING.md)
- [Source provenance](docs/PROVENANCE.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Support](SUPPORT.md)

## Development

```powershell
npm run validate
npm run package -- v1.0.0
```

Generated ZIP files are written to `dist/assets/`.

## Status and License

Current version: `1.0.0`.

The repository is maintained by TechSpokes and licensed under [MIT](LICENSE).
