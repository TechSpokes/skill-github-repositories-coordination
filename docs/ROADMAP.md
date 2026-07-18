# Roadmap

## Program Goal

Make Coordinate GitHub Repositories a trusted, useful, free, and maintainable default for repository coordination across code and non-code work. Growth is valid only when the runtime, security posture, evaluation evidence, teaching value, and governance remain healthy.

This roadmap implements [issue #6](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/6). It transforms the attached strategy into an evidence-gated program that fits the current portable architecture and release process.

## Scope Boundary

The repository can supply runtime behavior, tests, documentation, release controls, and evidence formats. It cannot manufacture volunteer insight, unsolicited adoption, third-party recommendations, outside contributions, or additional maintainers. Those outcomes require real people and remain open until their evidence is recorded.

Do not close a phase because its repository checklist is complete. Close it only when both gates pass.

## Two-Gate Rule

### Product Gate

Require evidence that the phase changed a user or maintainer outcome. Record the source, observation window, limitations, owner, privacy review, and release identity.

### Tracks Gate

Require all five cross-cutting tracks to remain green:

- Architecture and maintainability.
- Security and privacy.
- Agentic quality and evaluation.
- Teaching and human uplift.
- Governance, contribution quality, and sustainability.

Stop phase advancement when either gate is red or unknown. A growth signal never compensates for a security, evaluation, privacy, or values regression.

## Execution Order

### Phase 0: Foundation

[Issue #7](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/7) establishes trust, evaluation, and undeniable outcomes. Start after reviewing the current architecture and fixtures. Require evidence that an outside user discovered a true, previously unnoticed insight.

### Phase 1: Proof

[Issue #8](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/8) publishes proof and earns outside users. Start after both Phase 0 gates pass. Require three unsolicited signals, including one from a non-code user.

### Phase 2: Secure Launch

[Issue #9](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/9) runs a secure coordinated launch. Start after both Phase 1 gates pass and the release board is green. Require attention above baseline, useful outside issues, and one unprompted third-party mention.

### Phase 3: Teaching

[Issue #10](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/10) teaches beginners and non-code users through first run. Advance after Phase 2, while prototypes may begin after Phase 0. Require outside users to complete a useful run and later return.

### Phase 4: Portal Interoperability

[Issue #11](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/11) earns platform trust through honest interoperability. Start after both Phase 3 gates pass. Require adoption and onward recommendation inside an engineering organization without a substantiated overclaiming concern.

### Phase 5: Skill Constellation

[Issue #12](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/12) grows evidence-backed complementary skills and reusable patterns. Start after both Phase 4 gates pass. Require outside contributions, derivative work, or independent reuse.

### Phase 6: Sustainability

[Issue #13](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/13) sustains free, auditable, independent maintenance. Advance after Phase 5, while governance foundations may begin earlier. Require another authorized maintainer to complete a release while the founder steps back.

## Parallel Foundations

Some work can begin before its phase advances when it reduces risk without claiming outcome evidence. Threat modeling, evaluation contracts, teaching prototypes, contribution review, release provenance, and governance can improve early. Public launch, proof claims, portal adoption claims, skill expansion, and sustainability claims must wait for their entry gates.

## Evidence Records

Use [Program Evidence](PROGRAM-EVIDENCE.md) for volunteer trials, case studies, launch observations, phase decisions, and accepted risks. Keep recruited feedback separate from unsolicited signals and keep generated snapshots separate from reviewed meaning.

Every active phase needs a named owner. Every gate decision needs a reviewer, evidence, status, date, limitations, downstream action, and review trigger.

## Release Strategy

Do not assign one version per phase automatically. Use semantic versioning according to behavior impact:

- Use a patch release for corrections, refreshed volatile guidance, documentation fixes, or packaging fixes that do not intentionally change the runtime contract.
- Use a minor release for a backward-compatible workflow, reference, evaluation behavior, or optional interoperability capability.
- Use a major release for an activation, required-input, safety, workflow, or output-contract break.
- Use no release for outreach or evidence collection when the installable runtime is unchanged.

Version `1.1.0` establishes the cross-phase foundations: executable evaluation coverage, adversarial cases, threat modeling, teaching guidance, portal handoff, governance rules, checksums, and release provenance.

## Current State

Phase 0 is active. The repository foundations can be implemented and reviewed now, but the Phase 0 product gate remains open until consented outside use produces the required insight. Phases 1 through 6 remain dependent on their documented gates.

## Review Triggers

Review this roadmap after a gate decision, serious security report, evaluation regression, material host change, maintainer change, recommendation-conflict incident, or evidence that a phase objective no longer fits users.

Preserve prior issue and decision history when the roadmap changes. Update the phase issue, this file, and any affected architecture decision in the same change.
