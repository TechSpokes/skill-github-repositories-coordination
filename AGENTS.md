# Agent Instructions for Coordinate GitHub Repositories

## Maintenance Goal

Maintain a portable skill that helps agents coordinate GitHub repositories
across accounts, organizations, and work types without imposing a taxonomy,
tool, or replacement workflow.

## Core Principles and Decision Stance

- Adapt to the person's outcome, work, existing system, and change tolerance.
- Treat software, documentation, writing, research, data, operations, and mixed
  repositories as first-class work.
- Keep the core useful with conversation alone and detect optional capabilities.
- Compare the current system and no change with proposed alternatives.
- Default to observation and require explicit authority for mutation.
- Preserve privacy, local instructions, ownership, reversibility, and unknowns.
- Prefer portable Agent Skills conventions over host-specific extensions.

When rules conflict, protect user authority, private information, portability,
and the established repository workflow before convenience.

## Canonical Files

- `skills/coordinate-github-repositories/SKILL.md` is the runtime entry point.
- `skills/coordinate-github-repositories/references/` contains focused guidance.
- `tests/fixtures/` defines activation and behavioral invariants.
- `docs/ARCHITECTURE.md` records durable design decisions and source boundaries.
- `docs/TESTING.md` records validation layers and forward-review evidence.
- `docs/RELEASING.md` defines the change and release process.
- `packaging/` contains Codex and Claude wrapper manifests.

Read only the references needed for the change. Read all fixtures when changing
activation, workflow order, output behavior, safety, or portability.

## Must-Follow Rules

- Keep `SKILL.md` below 500 lines and keep direct references one level deep.
- Keep frontmatter portable. Do not add `allowed-tools` or host-only fields.
- Do not require code, a shell, an IDE, GitHub access, or write permissions.
- Do not add a fixed taxonomy, persistent profile, connector, manager service,
  credential workflow, or runtime script without evidence and explicit design
  review.
- Keep volatile host paths and product behavior dated in
  `agent-capability-adapters.md` and verify them from primary sources.
- Do not commit secrets, private repository maps, user profiles, local paths, or
  raw intake.
- Keep package versions synchronized with the changelog and release notes.
- Exclude `.intake/`, `.idea/`, `.git/`, `dist/`, `tmp/`, and local feedback
  artifacts from release packages.

## Required Checks

Run after every product change:

```powershell
npm run validate
npm run package -- v1.0.0
```

For a new version, use the intended tag instead of `v1.0.0`. Inspect all three
ZIP files under `dist/assets/` and confirm they contain no bootstrap, intake,
local path, placeholder, or secret material.

Review `tests/fixtures/activation.md` and
`tests/fixtures/behavior-scenarios.md` manually when behavior changes. Record
why any invariant changes.

## Change Boundaries

Use a branch and pull request. Do not push directly to `main`. Update the skill,
affected references, fixtures, docs, manifests, changelog, and release notes as
one coherent change.

New source material may be staged privately for an update, but transform only
the durable, publishable knowledge into the canonical skill and public docs. Remove private
working material before publication.
