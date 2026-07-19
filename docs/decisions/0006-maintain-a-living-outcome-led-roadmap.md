# Program Decision 0006: Maintain a Living Outcome-Led Roadmap

Decision type: Program governance.

## Status

Accepted for implementation on 2026-07-19 through [issue #46](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/46) and the maintainer's request for v1.11.0.

## Context

The original roadmap implemented issue #6 as a finite seven-phase program. The repository completed those deliverables in v1.2.0, preserved them in `docs/ROADMAP-DELIVERY.md`, closed issues #7 through #13, and continued to deliver v1.3.0 through v1.10.0 through separately justified issues.

`docs/ROADMAP.md` still described the completed phases as the roadmap, `README.md` still sent maintainers there for program direction, and validation required phrases tied to that completed program. The record remained accurate history but no longer told maintainers which outcomes guide current work, how candidates become accepted tasks, or where active delivery state belongs.

The repository instructions require GitHub issue and pull request state to remain in GitHub instead of becoming a second backlog in documentation. Program Decision 0003 also requires delivery and outcome evidence to remain separate so missing adoption evidence limits claims without freezing unrelated authorized work.

## Options

- Keep the completed phase roadmap as the current direction.
- Delete the roadmap and rely only on issues.
- Maintain a detailed task and status table in Markdown.
- Preserve the completed program as history and maintain a living roadmap of current outcomes, selection rules, evidence boundaries, and review triggers while GitHub owns delivery state.

## Decision

Use the fourth option. Maintain `docs/ROADMAP.md` as the current outcome and work-selection contract after the founding program.

Keep concrete work, ownership, status, and completion state in GitHub issues and pull requests. Link the roadmap to the canonical open-issue view instead of copying issue state into a Markdown task table.

Keep `docs/ROADMAP-DELIVERY.md`, issue #6, and phase issues #7 through #13 as historical delivery evidence. Do not present the completed phases as the active backlog or erase their evidence and claim boundaries.

Rank current outcomes while allowing an urgent quality risk to move first. Accept work only when its expected benefit, evidence, target, authority, privacy boundary, security impact, dependencies, completion evidence, and owner are clear enough for the proposed change.

Treat feedback and outcome evidence as candidate inputs rather than automatic tasks. Preserve Program Decision 0003: missing external adoption limits claims, a red affected quality control blocks release or public action, and neither evidence class substitutes for the other.

Record a review date and owner in the roadmap. Reassess the model when priorities lose evidence, accepted issues drift from the stated outcomes, quality or host conditions change materially, or the process adds administration without improving decisions.

## Rationale

The selected model keeps durable direction visible without duplicating a fast-changing backlog. It preserves the evidence and public history of the founding program while allowing later work to be justified by current outcomes and explicit issues.

An issue-only model would hide the stable selection rules that maintainers need before creating work. A Markdown task table would duplicate GitHub state and become stale through ordinary issue changes.

## Consequences

Readers can distinguish current direction, active delivery, historical delivery, and outcome evidence. Maintainers can change issue state without editing the roadmap and can change priorities without rewriting completed phase history.

The roadmap still requires judgment and periodic review. Its priority order may become stale, but the review date, triggers, issue-backed state, and decision history make that drift visible and reversible.

The change adds a backward-compatible maintainer workflow and deterministic validation. It does not change runtime activation, user-facing coordination behavior, safety or permission boundaries, evaluation fixtures, package format, or conversation-only usefulness.

## Links

- [Issue #46](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/46)
- [Roadmap](../ROADMAP.md)
- [Founding Roadmap Delivery Record](../ROADMAP-DELIVERY.md)
- [Program Evidence](../PROGRAM-EVIDENCE.md)
- [Feedback From Humans and Agents](../FEEDBACK.md)
- [Program Decision 0001](0001-evidence-gated-roadmap.md)
- [Program Decision 0003](0003-separate-delivery-from-outcome-evidence.md)
- [Governance Decision 0005](0005-use-one-typed-decision-registry.md)

## Review Triggers

Review this decision when GitHub no longer serves as the delivery system, the roadmap repeatedly fails to guide issue selection, maintainers need a different owner or review cadence, outcome priorities become an unmaintainable taxonomy, historical and current state become confused again, or new evidence requires a different relationship between delivery and outcomes.
