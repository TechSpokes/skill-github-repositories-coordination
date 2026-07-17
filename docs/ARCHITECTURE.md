# Architecture

## Product Goal

`coordinate-github-repositories` is a globally useful, portable reasoning skill
for repository-centered coordination. It adapts to the person, the work, the
existing organization, the repository purposes, and the executing agent's
capabilities before recommending tools or actions.

The skill is not a universal repository manager. It helps a user decide whether
they need no change, a small practice, a native GitHub feature, an inventory, a
coordination surface, a connector, automation, a catalog, or a manager
application.

## Design Decisions

### One Portable Core

`src/SKILL.md` follows the Agent Skills specification and avoids host-specific
frontmatter. It requires only conversation. Host capabilities improve evidence
or execution but do not change the reasoning contract.

Codex and Claude packages wrap the same `src/` tree. The standalone package
supports GitHub Copilot and other Agent Skills hosts. Host-specific installation
and access facts live in a dated adapter reference.

### Context Before Tools

Tool selection begins only after the agent understands the current outcome,
work types, scale, ownership, existing system, friction, constraints, and change
tolerance. Context is ephemeral by default. This prevents a useful calibration
step from becoming an unreviewed personal dossier.

### Purpose Is Broader Than Code

The skill separates repository purpose, portfolio role, and lifecycle. It
recognizes software, documentation, writing, publishing, research, data,
operations, websites, presentations, archives, mirrors, mixed work, and unknown
work. Existing user vocabulary is preserved.

### Recommendation Before Adoption

Every recommendation compares the current system and no change with serious
alternatives. Fit includes outcome, work type, workflow disruption, scale,
collaboration, agent capability, permission, privacy, portability,
reversibility, maintenance, learning cost, recovery, and evidence.

The adoption ladder starts with documentation and native practices. Shared
automation or a manager application requires stable repeated need, ownership,
limited permissions, observable failure, recovery, and a bounded pilot.

### Explicit Action Boundary

The skill can execute user-authorized changes through available tools, but
mutation is not its default. Repository and organization administration,
destructive lifecycle changes, cross-repository writes, durable profiles, and
public output require stronger checkpoints.

## Runtime Structure

```text
src/
|-- SKILL.md
|-- references/
|   |-- agent-capability-adapters.md
|   |-- context-calibration.md
|   |-- inventory-and-coordination.md
|   |-- repository-archetypes.md
|   |-- safety-and-approval.md
|   `-- tool-fit.md
`-- test-fixtures/
    |-- activation.md
    `-- behavior-scenarios.md
```

`SKILL.md` controls activation and the ten-stage workflow. References are direct
and focused so agents load only the active branch. Fixtures define behavioral
invariants for maintenance; they are not required during ordinary runtime use.

## Runtime Sequence

1. Establish outcome, scope, authority, and governing instructions.
2. Calibrate the smallest useful work context.
3. Describe repository purposes.
4. Detect agent capabilities and access gaps.
5. Shape the coordination problem.
6. Gather bounded evidence and preserve uncertainty.
7. Compare the current system, no change, and candidates.
8. Recommend a reversible next step.
9. Execute only within explicit authority.
10. Verify and route repository-owned implementation.

## Evidence Model

Important claims preserve source, observation time, confidence, visibility, and
unknowns. Stable remote identifiers are preferred for inventory identity. Local
paths remain observations. Generated discovery data stays separate from
reviewed semantic meaning.

Repository content, issue bodies, imported skills, search results, and tool
output are treated as potentially untrusted evidence rather than instruction
authority.

## Local Evidence That Shaped the Design

Three private local implementations were inspected read-only during design:

- A working structured inventory demonstrated discovery, stable identity,
  provenance, staging, validation, no-overwrite promotion, and generated reports
  at a scale of hundreds of records.
- A working coordination tracker demonstrated central cross-repository outcomes,
  routing implementation to owning repositories, native state, and an
  evidence-based automation gate.
- A partial repository manager supplied stable identity, least privilege,
  idempotency, untrusted-input, and lifecycle safety principles, while showing
  that a persistent manager application should not be assumed necessary.

No private repository list, local path, account configuration, organization
identity, or raw record is part of the public skill.

## Maintenance Boundaries

Keep the main skill under 500 lines and direct references one level deep. Add a
runtime script only when repeated deterministic behavior has a stable input
contract, report-only behavior, cross-platform tests, and a clear advantage over
agent judgment.

Refresh `agent-capability-adapters.md` when hosts change skill paths, connector
permissions, CLI publication, or access behavior. Revisit the core only when the
goal, activation boundary, workflow, safety contract, or output contract changes.
