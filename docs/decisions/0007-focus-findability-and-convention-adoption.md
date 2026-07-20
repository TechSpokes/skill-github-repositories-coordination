# Architecture Decision 0007: Focus Findability and Convention Adoption

Decision type: Architecture.

## Status

Accepted on 2026-07-20.

## Context

Issue [#48](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/48) reports an operational portfolio practice reuse run in which retrieval behavior affected the plan. The human requested an IDE and terminal retrieval check, and the agent adapted the plan from those results. The agent also deduplicated equivalent material, distinguished current from historical authority, treated an existing plan as revisable evidence, and placed pilots before schemas.

The runtime already recognized findability, existing folder and naming conventions, practice reuse, human approval, and cross-repository authority. Those cues were distributed across the core, context calibration, inventory, and safety references. They did not define how to test consumers, present a convention for human discussion, separate acceptance from write authority, or promote a successful local practice into an authorized portfolio rollout.

The user clarified that conventions must be presented to a human before adoption and that unusually useful conventions may need a controlled path across the portfolio. The design must remain useful through conversation alone and must not create a fixed taxonomy, persistent profile, manager service, convention registry, or automation interface without separate evidence and review.

## Options

### Keep the Distributed Cues

No change would preserve the smallest runtime tree, but agents would continue to infer proposal, consumer-test, and portfolio-promotion behavior from incomplete cues.

### Expand Inventory and Coordination

Adding the complete workflow to `inventory-and-coordination.md` would keep one fewer reference, but it would mix inventory administration, work routing, practice reuse, convention decisions, and staged adoption in one source.

### Add a Focused Runtime Reference

A direct reference can activate only for repository findability and coordination conventions. It can preserve human discussion, current-system comparison, consumer verification, and target-specific portfolio authority without burdening routine inventory or local code work.

### Build Automation

A schema, registry, or rollout tool could enforce consistent execution, but the current evidence does not establish a stable machine interface, repeated operator need, or maintenance owner. Automation would create a new source of truth before the manual contract is proven.

## Decision

Add `findability-and-conventions.md` as a focused runtime reference directly linked from `SKILL.md`. Keep the core activation description unchanged and route only repository findability, shared artifact, entry-point, and portfolio convention work into the focused workflow.

Require an authorized human to review every new or revised convention before adoption. Separate acceptance of meaning and scope from authority to write exact targets, while allowing one review to cover both when the complete target, action, visibility, verification, and recovery contract is explicit.

Treat a successful local convention as evidence for a new portfolio-scoped proposal rather than inherited authority. After acceptance, bind scalable rollout approval to an explicit target list or stable reviewed snapshot, revalidate each target before mutation, and skip changed targets without widening authority.

Default to prose, forward adoption, existing owner-maintained sources of truth, and a manual pilot. Do not add a convention registry, mandatory status taxonomy, connector, manager service, or automation interface in this decision.

## Rationale

The focused reference keeps progressive disclosure while giving agents an executable sequence for the behavior exposed by issue #48. The human gate preserves decision authority, consumer tests protect actual retrieval rather than aesthetic consistency, and snapshot-bound rollout makes portfolio adoption scalable without converting broad visibility into blanket mutation permission.

## Consequences

The runtime gains one directly linked reference and a new evaluation segment. Agents must compare no change and scoped adaptation, present the convention before adoption, and verify named consumers when available.

Portfolio rollout requires more explicit evidence and target review than a blanket instruction, but independent targets can still proceed in approved batches. Existing local conventions remain valid unless review or change is requested.

Maintainers must keep the reference, architecture map, safety controls, fixtures, evaluation registry, feedback mapping, and threat model synchronized. Future automation remains possible only after repeated stable need, ownership, failure observability, and a separate design review.

## Links

- [Issue #48](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/48)
- [Architecture](../ARCHITECTURE.md)
- [Findability and Conventions](../../skills/coordinate-github-repositories/references/findability-and-conventions.md)
- [Testing](../TESTING.md)
- [Threat Model](../THREAT-MODEL.md)

## Review Triggers

Review this decision when real use shows that the activation boundary captures local code conventions, the proposal creates excessive human administration, snapshot-bound approval cannot handle ordinary portfolio change, local exceptions dominate, consumer checks are not feasible, or repeated stable rollout work supports a separately owned automation design.

## Supersession

Preserve this record if a later decision changes the workflow. Link the replacement here and update the owning runtime and architecture guidance.
