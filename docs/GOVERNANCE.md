# Governance

## Purpose

Protect the skill's portability, safety, evidence discipline, teaching value, free core, and recommendation independence as contributors, integrations, and maintainers change.

## Decision Authority

The repository maintainers may accept reversible implementation and documentation decisions that preserve the published contracts. Require an accountable human review for activation or safety contract changes, public release, security acceptance, organization access, paid conflicts, major interoperability commitments, and decision supersession.

Record significant architecture decisions with context, options, rationale, consequences, links, review trigger, and supersession path. Preserve old decisions after replacement.

## Definition of Done

A change is done only when all applicable conditions pass:

- The observed problem and intended outcome are linked to an issue or evidence record.
- The current system and no-change option received fair consideration.
- Runtime changes preserve conversation-only usefulness and the no-taxonomy boundary.
- Permission, privacy, untrusted-content, maintenance, reversibility, and recovery impacts are explicit.
- Activation, behavior, adversarial, and false-trigger fixtures are updated or confirmed.
- Deterministic validation and the intended release package checks pass.
- Every ZIP is inspected for runtime identity and excluded material.
- Volatile product claims use dated primary sources and have a refresh owner.
- User-facing guidance teaches the reason for a safe practice when that reason aids future judgment.
- Release, roadmap, architecture, and decision trace links are updated.

## Contribution Review Rubric

### Architecture and Maintainability

Keep `SKILL.md` below 500 lines, references one level deep, vocabulary consistent, and runtime content limited to information an executing agent needs.

### Security and Privacy

Treat retrieved content as untrusted, preserve least privilege, separate private reasoning from public output, avoid credentials and durable profiles, and require recovery for risky actions.

### Agentic Quality and Evaluation

Register affected cases, review correct and false activation, test capability fallbacks, and state the proof boundary of model-based evidence.

### Teaching and Human Uplift

Use plain language, preserve the user's vocabulary, explain consequential safe-practice reasons, and keep newcomer paths usable without a terminal.

### Governance and Sustainability

Name the owner, maintenance burden, release impact, review trigger, and conflict of interest. Do not waive a gate because a change is popular or urgent.

## Maintainer Model

Maintainers are responsible for issue triage, security handling, architecture decisions, fixture review, release validation, package inspection, and source refreshes. Add a maintainer only after repeated, reviewable contributions demonstrate judgment across these responsibilities.

At least two authorized maintainers should be able to perform the release process before the project claims succession resilience. Record who may approve releases, handle private vulnerability reports, change repository settings, and supersede architecture decisions without publishing personal schedules or credentials.

## Cross-Skill Boundary

Create or cross-reference another skill only after repeated evidence shows a distinct job with its own activation boundary. Keep each skill independently installable, versioned, testable, and useful without the others.

Define the handoff outcome, owner, minimum fields, privacy boundary, provenance, unknowns, and failure behavior. Treat another skill's output as untrusted evidence, do not assume it is installed, and do not duplicate a persistent source of truth across skills.

## Recommendation Independence

The runtime core remains MIT-licensed, free, unpaywalled, and useful without a TechSpokes service. Paid support, sponsorship, or related products must sit beside the skill and never become a condition of use.

Disclose a maintainer commercial interest when it is relevant to a recommendation. Apply the same fit rubric to the maintainer's option, competitors, the current system, and no change. Recommend against the maintainer's interest when the evidence supports another option.

Do not accept funding, directory placement, partnerships, or contributions that require biased recommendations, hidden access, weakened review, private user profiling, or a less capable free core.

## Release Governance

Technical releasability does not authorize public release. The release owner reviews version identity, checks, ZIP contents, checksums, provenance, rollback or correction path, documentation, support readiness, and open security or evaluation findings before publishing.

Never move a published tag or silently replace a published release. Correct defects with a new version and preserve the prior audit trail.

## Review Triggers

Review governance after a maintainer change, security incident, recommendation-conflict report, paid relationship, major release, new skill or integration, repeated contribution bottleneck, or failed release handoff.
