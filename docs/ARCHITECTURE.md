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

The canonical `SKILL.md` follows the Agent Skills specification and avoids host-specific
frontmatter. It requires only conversation. Host capabilities improve evidence
or execution but do not change the reasoning contract.

Codex and Claude packages wrap the same canonical skill tree. The standalone package
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

### Evidence-Gated Growth

The [roadmap](ROADMAP.md) separates repository deliverables from product
evidence. Each phase requires both an outcome gate and a tracks gate covering
architecture, security, evaluation, teaching, and governance. Public attention
cannot compensate for a regression in those tracks.

Roadmap phase numbers do not determine release versions. Versions describe
runtime and package contract impact, while external adoption remains recorded
in phase issues and evidence records.

### Teaching Without Runtime Bloat

The runtime explains why consequential least-privilege and reversible steps
protect the user's work. Longer newcomer guidance stays in
[the learning path](LEARNING.md) so ordinary skill context remains lean.

### Portal Front Porch

The skill may prepare reviewed, provenance-aware input for a service catalog or
internal developer portal. It does not become a portal, manager, policy engine,
or system of record. The receiving owner retains schema and refresh ownership.

## Runtime Structure

```text
skills/
`-- coordinate-github-repositories/
    |-- SKILL.md
    `-- references/
        |-- agent-capability-adapters.md
        |-- context-calibration.md
        |-- inventory-and-coordination.md
        |-- portal-interoperability.md
        |-- repository-archetypes.md
        |-- safety-and-approval.md
        `-- tool-fit.md

tests/
|-- evals/
|   `-- cases.json
`-- fixtures/
    |-- activation.md
    |-- adversarial-scenarios.md
    `-- behavior-scenarios.md
```

`SKILL.md` controls activation and the ten-stage workflow. All seven references
are direct and focused so agents load only the active branch. Fixtures define
behavioral invariants for maintenance; the evaluation registry makes fixture
coverage and required segments a deterministic CI contract. Tests and program
documentation are not installed as runtime content.

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

Use the [threat model](THREAT-MODEL.md), [governance contract](GOVERNANCE.md),
and [ADR 0001](decisions/0001-evidence-gated-roadmap.md) when a change affects
growth gates, privileged tools, public output, portal handoff, recommendation
independence, contribution quality, or release identity.

Keep project scripts platform-neutral where Node.js provides the needed
capability. Validation and checksum generation use Node standard libraries.
ZIP creation prefers `zip`, then an archive-capable `tar`, then PowerShell Core,
and uses Windows PowerShell only on Windows.
