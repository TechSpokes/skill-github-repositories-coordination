# Evidence Decision 0002: Accept the Founding Target Use Case for Phase 0

Decision type: Evidence classification.

## Status

Accepted on 2026-07-18.

## Context

The strategy attached to issue #6 identifies the founding maintainer's portfolio as a target use case: a large body of work spanning a personal account and multiple organizations, with earlier tools that separately addressed inventory, routing, and structural relationships. The repository exists because that real portfolio exposed an unresolved coordination problem.

The founding builder used version `1.1.0` through an agent on that portfolio in a consented, read-only trial. The review found that the missing layer was a reversible benefit map connecting project evidence to reusable capabilities and outcomes, and the participant independently confirmed that the graph semantics were previously unnoticed. The trial passed privacy review, disclosed the builder and maintainer relationship, and did not claim an unconfirmed technical dependency.

The original Phase 0 wording required a person who did not build the skill. That restriction excluded direct evidence from the target use case that motivated the product, even though Phase 1 already requires unsolicited signals from outside the recruited trial group.

## Options

- Keep a Phase 0 gate that accepts only external users and leave the founding target use case as supporting evidence.
- Treat the founding trial as an undocumented exception without changing the durable contract.
- Accept a real target user, including the founding builder or maintainer, when the relationship and limitations are disclosed, while preserving Phase 1's gate for unsolicited outside signals.
- Remove relationship and recruitment distinctions from both phases.

## Decision

Accept the third option. Phase 0 may pass when a real target user uses the skill, directly or through their agent, on a portfolio they control and independently confirms a true, previously unnoticed insight. The evidence record must disclose whether the participant is a builder, maintainer, contributor, or outside user.

The founding trial remains founding builder and maintainer evidence and cannot count as an unsolicited outside signal. [Program Decision 0003](0003-separate-delivery-from-outcome-evidence.md) later changed outside signals from a delivery dependency into outcome evidence that limits claims and informs later learning.

## Rationale

The revised gate tests whether the product creates a genuine outcome in its intended problem setting. It does not confuse founder conviction with market validation because the participant relationship is explicit and Phase 1 retains a separate threshold for outside evidence.

Changing the written contract is more honest than retroactively describing the builder as an outside user or silently making an exception. The decision preserves both the useful founding evidence and the distinction between recruited proof and unsolicited adoption.

## Consequences

Phase 0 can close with the recorded founding portfolio trial and its limitations. Later repository work can proceed while outside evidence remains accurately unknown.

This evidence does not establish usefulness for outside, solo, or non-code users. It does not confirm the candidate OCR relationship as an existing dependency, and it does not count as an unsolicited signal.

Future trial records must include `participant_relationship`. Gate reviews must evaluate evidence against the phase contract in force and preserve earlier corrections instead of rewriting history.

## Links

- [Roadmap](../ROADMAP.md)
- [Program Evidence](../PROGRAM-EVIDENCE.md)
- [Program Decision 0001](0001-evidence-gated-roadmap.md)
- [Program Decision 0003](0003-separate-delivery-from-outcome-evidence.md)
- [Issue #6](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/6)
- [Phase 0 issue #7](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/7)
- [Phase 1 issue #8](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/8)

## Review Trigger

Review this decision if Phase 1 outside evidence contradicts the founding result, if participant relationships become ambiguous, if privacy or consent changes, or if the proof model across the two phases stops distinguishing product discovery from outside adoption.

## Supersession

Preserve this record. Program Decision 0003 changes roadmap sequencing but does not change this trial's relationship, consent, result, or limitations.
