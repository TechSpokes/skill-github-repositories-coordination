# ADR 0001: Use Evidence-Gated Roadmap Phases

## Status

Accepted for implementation in version `1.1.0`.

## Context

Issue #6 supplied a seven-phase growth strategy with five cross-cutting quality tracks. Several phase objectives depend on outside users, public communities, third-party recommendations, contributors, and maintainers, while the repository can directly control only runtime behavior, tests, documentation, packaging, and governance.

Treating repository deliverables as proof of product outcomes would encourage premature launch claims and false phase completion. Treating all phases as one release would also confuse behavior versions with outreach and adoption events.

## Options

- Complete phases when their repository checklists are finished.
- Bind each phase to a predetermined minor version.
- Require separate product and cross-track gates, and version only behavior or package changes.
- Keep the current release process and store the roadmap only in issue #6.

## Decision

Use evidence-gated phases with separate product and tracks gates. Allow risk-reducing foundations to begin early, but block phase advancement and public claims until both gates pass.

Use semantic versions according to runtime and package impact rather than phase number. Keep standalone phase plans in issues #7 through #13 and the durable program contract in `docs/ROADMAP.md`.

## Rationale

This option preserves traceability from strategy to issues, implementation, checks, releases, and real outcomes. It protects the existing architecture from growth pressure, distinguishes technical completion from external evidence, and permits coherent minor releases only when users receive a backward-compatible capability.

## Consequences

The roadmap can remain active across several releases without pretending external gates are complete. Maintainers must record gate evidence and keep recruited feedback separate from unsolicited signals.

Phase status requires more review discipline. Some repository foundations may ship while the corresponding product gate remains open.

## Links

- [Roadmap](../ROADMAP.md)
- [Architecture](../ARCHITECTURE.md)
- [Testing](../TESTING.md)
- [Program Evidence](../PROGRAM-EVIDENCE.md)
- [Issue #6](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/6)

## Review Trigger

Review this decision when evidence shows the two-gate model blocks useful work without reducing risk, when phase ownership changes, or when the roadmap no longer matches the product goal.

## Supersession

Preserve this record and link any replacement decision here.
