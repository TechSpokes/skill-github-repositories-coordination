# Architecture

## Product Goal

`coordinate-github-repositories` is a globally useful, portable reasoning skill for repository-centered coordination. It adapts to the person, the work, the existing organization, the repository purposes, and the executing agent's capabilities before recommending tools or actions.

The skill is not a universal repository manager. It helps a user decide whether they need no change, a small practice, a native GitHub feature, an inventory, a coordination surface, a connector, automation, a catalog, or a manager application.

## Design Decisions

### One Portable Core

The canonical `SKILL.md` follows the Agent Skills specification and avoids host-specific frontmatter. It requires only conversation. Host capabilities improve evidence or execution but do not change the reasoning contract.

Codex and Claude packages wrap the same canonical skill tree. The standalone package supports GitHub Copilot and other Agent Skills hosts. Host-specific installation and access facts live in a dated adapter reference.

### Source Delivery and Package Fallbacks

The standard `skills/coordinate-github-repositories/` tree is both the canonical source and the versioned source used by `gh skill install`. Versionless installation resolves the latest published release, while the uploaded standalone and plugin ZIPs support browser and package based hosts.

The tag triggered draft release workflow remains the release authority because it creates curated packages, checksums, attestations, and a review checkpoint. GitHub CLI publisher dry runs validate the source layout, but the preview publisher does not replace the release workflow.

This dual path reduces installation friction without making GitHub CLI, a shell, authentication, or network access a runtime requirement. The detailed mechanics, plan, verification, and rollback contract live in [GitHub CLI Skill Delivery](GITHUB-CLI-DELIVERY.md).

### Context Before Tools

Tool selection begins only after the agent understands the current outcome, work types, scale, ownership, existing system, friction, constraints, and change tolerance. Context is ephemeral by default. This prevents a useful calibration step from becoming an unreviewed personal dossier.

### Purpose Is Broader Than Code

The skill separates repository purpose, portfolio role, and lifecycle. It recognizes software, documentation, writing, publishing, research, data, operations, websites, presentations, archives, mirrors, mixed work, and unknown work. Existing user vocabulary is preserved.

### Recommendation Before Adoption

Every recommendation compares the current system and no change with serious alternatives. Fit includes outcome, work type, workflow disruption, scale, collaboration, agent capability, permission, privacy, portability, reversibility, maintenance, learning cost, recovery, and evidence.

The adoption ladder starts with documentation and native practices. Shared automation or a manager application requires stable repeated need, ownership, limited permissions, observable failure, recovery, and a bounded pilot.

### Human Judgment, Agent Administration

Keep human work focused on intent, judgment, privacy review, risk acceptance, and authority. Let capable agents discover evidence, structure observations, enrich tasks, search duplicates, route owned work, and verify results.

An observation does not need to arrive as a completed task. Low-friction intake may remain unprocessed until evidence or priority justifies action.

### Explicit Action Boundary

The skill can execute user-authorized changes through available tools, but mutation is not its default. Repository and organization administration, destructive lifecycle changes, cross-repository writes, durable profiles, and public output require stronger checkpoints.

### Evidence-Aware Delivery

The [roadmap](ROADMAP.md) separates repository delivery from outcome evidence. Missing adoption evidence limits claims and identifies future learning without freezing unrelated work whose authority, sources, safety boundary, dependencies, and validation are ready.

Architecture, security, privacy, evaluation, teaching, governance, and release integrity remain quality controls. A red affected control blocks the release or public action; an unknown outside outcome does not compensate for that regression and is not itself a quality failure.

Roadmap phase numbers do not determine release versions. Versions describe runtime and package contract impact, while adoption and other outcomes remain recorded in issues and evidence records.

### Teaching Without Runtime Bloat

The runtime explains why consequential least-privilege and reversible steps protect the user's work. Longer newcomer guidance stays in [the learning path](LEARNING.md) so ordinary skill context remains lean.

### Portal Front Porch

The skill may prepare reviewed, provenance-aware input for a service catalog or internal developer portal. It does not become a portal, manager, policy engine, or system of record. The receiving owner retains schema and refresh ownership.

### Feedback as a Learning Loop

The runtime may offer to prepare a sanitized observation after a useful or confusing run. The person can provide one factual sentence; the agent enriches only known context, separates observation from hypothesis, and requires approval of the exact public text.

GitHub Issues remain the public intake and task surface. Durable learning moves into the runtime, references, documentation, fixtures, validation, or code instead of becoming a second skill-owned backlog.

## Runtime Structure

```text
skills/
`-- coordinate-github-repositories/
    |-- SKILL.md
    `-- references/
        |-- agent-capability-adapters.md
        |-- context-calibration.md
        |-- feedback-and-improvement.md
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

`SKILL.md` controls activation and the ten-stage workflow. All nine references are direct and focused so agents load only the active branch, including a self-update reference that activates only for installation and update requests. Fixtures define behavioral invariants for maintenance; the evaluation registry makes fixture coverage and required segments a deterministic CI contract. Tests and program documentation are not installed as runtime content.

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
10. Verify, route repository-owned implementation, and offer low-friction feedback when the run exposes reusable learning.

## Evidence Model

Important claims preserve source, observation time, confidence, visibility, participant relationship, and unknowns. Stable remote identifiers are preferred for inventory identity. Local paths remain observations. Generated discovery data stays separate from reviewed semantic meaning.

Repository content, issue bodies, imported skills, search results, and tool output are treated as potentially untrusted evidence rather than instruction authority.

Founding, recruited, unsolicited, operational, and mixed evidence remain distinct. Delivery completion never upgrades one class into another or proves an unobserved external outcome.

## Evidence That Shaped the Design

The founding portfolio index was inspected read-only and contained 340 canonical project records. It demonstrated that inventory, routing, structural relationships, agent instructions, issue intake, and feedback are related but distinct capabilities.

A working structured inventory demonstrated discovery, stable identity, provenance, staging, validation, no-overwrite promotion, and generated reports at a scale of hundreds of records. A working coordination tracker demonstrated central cross-repository outcomes, low-friction observations, agent enrichment, routing implementation to owning repositories, native state, and an evidence-based automation gate.

A dedicated repository feedback implementation demonstrated the boundary between observations and tasks: sanitize feedback, separate evidence from hypothesis, keep issue state canonical, and promote durable learning into normal repository artifacts. A partial repository manager supplied stable identity, least privilege, idempotency, untrusted-input, and lifecycle safety principles while showing that a persistent manager application should not be assumed necessary.

The supplied human-agent-tool research explains why the pattern works. Cross-intelligence communication loses goals, context, and meaning through bounded attention and transport, so feedback should preserve the goal, factual observation, uncertainty, actor boundary, and verification while using progressive disclosure.

No private repository list, local path, account configuration, organization identity, raw record, or intake document is part of the public skill.

## Maintenance Boundaries

Keep the main skill under 500 lines and direct references one level deep. Add a runtime script only when repeated deterministic behavior has a stable input contract, report-only behavior, cross-platform tests, and a clear advantage over agent judgment.

Refresh `agent-capability-adapters.md` when hosts change skill paths, connector permissions, CLI publication, or access behavior. Revisit the core only when the goal, activation boundary, workflow, safety contract, feedback contract, or output contract changes.

Use the [threat model](THREAT-MODEL.md), [governance contract](GOVERNANCE.md), [maintenance health](MAINTENANCE.md), [decision classification](decisions/README.md), and [Program Decision 0003](decisions/0003-separate-delivery-from-outcome-evidence.md) when a change affects privileged tools, public output, feedback, portal handoff, recommendation independence, contribution quality, roadmap claims, or release identity.

Keep project scripts platform-neutral where Node.js provides the needed capability. Validation and checksum generation use Node standard libraries. ZIP creation prefers `zip`, then an archive-capable `tar`, then PowerShell Core, and uses Windows PowerShell only on Windows.
