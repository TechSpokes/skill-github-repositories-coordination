# Decision Records

## Purpose

Keep durable decisions reviewable while distinguishing architecture from program governance, evidence classification, and procedure.

## Decision Types

### Architecture Decision

Use an architecture decision when a choice changes durable system structure, component or source boundaries, runtime contracts, quality-attribute tradeoffs, integration shape, or a technically significant constraint. Architecture decisions belong in this directory with `Decision type: Architecture`.

### Program Decision

Use a program decision when a choice changes roadmap sequencing, delivery governance, evidence use, review policy, or another cross-cutting program rule without changing system structure. Program decisions belong in this directory with `Decision type: Program governance`.

### Evidence Decision

Use an evidence decision when a choice accepts, rejects, classifies, or limits a body of evidence and its permitted claims. Evidence decisions belong in this directory with `Decision type: Evidence classification`.

### Procedure

Put ordinary steps in their owning guide, such as `TESTING.md`, `RELEASING.md`, `FEEDBACK.md`, or `MAINTENANCE.md`. Create a decision record only when the procedure reflects a durable tradeoff, authority rule, or cross-cutting policy that future maintainers must understand before changing it.

## Current Records

- [Program Decision 0001](0001-evidence-gated-roadmap.md) records the original evidence-gated roadmap model and is superseded.
- [Evidence Decision 0002](0002-accept-founding-use-case-for-phase-0.md) classifies the founding target use case and its claim boundary.
- [Program Decision 0003](0003-separate-delivery-from-outcome-evidence.md) separates repository delivery from external outcome evidence.
- [Architecture Decision 0004](0004-separate-benefit-discovery-from-inventory.md) separates focused benefit discovery from inventory administration and persistent relationship storage.

## Maintenance

Preserve superseded records and link their replacement. Each record states its decision type, status, context, decision, consequences, links, and review or supersession trigger.

The deeper research into decision types, naming, storage, and procedure boundaries is tracked in [issue #19](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/19) and does not block the current roadmap delivery.
