# Governance Decision 0005: Use One Typed Decision Registry

Decision type: Governance.

## Status

Accepted on 2026-07-19 through [issue #19](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/19) and the v1.10.0 implementation.

## Context

The repository originally numbered roadmap sequencing and evidence acceptance records as architecture decisions even though they did not change system structure. Version 1.2.0 corrected the labels and added a small index, but issue #19 intentionally deferred the full taxonomy, procedure boundary, migration, and validation design.

The current record set shares one directory and four-digit sequence. Published documentation and GitHub history link to those filenames, so reorganizing or renumbering the files would create broken references and obscure why earlier choices were made.

The validator discovers all record files, but its recognized type list is hard-coded and it checks only whether each file declares a type and appears somewhere in the index. It does not verify stable identifiers, title and type agreement, the common record shape, exact index coverage, or stale index entries.

Primary architecture guidance favors short records with status, context, decision, consequences, rationale, stable identifiers, and preserved supersession history. Python's PEP registry demonstrates that different decision types can share one numbered index. Open governance and evidence-to-decision guidance support explicit authority, stakeholder, evidence, limitation, and review information for decisions outside architecture.

## Options

- Keep the minimal three-type guide and hard-coded validator.
- Keep one directory and sequence, define four explicit types, and make the index the maintained type and discovery registry.
- Split architecture, program, evidence, and governance records into separate directories and identifier sequences.
- Rename or renumber the existing files around the new taxonomy.
- Remove separate records and keep every rationale in its owning guide.

## Decision

Keep one `docs/decisions/` directory and one monotonically increasing four-digit identifier sequence for Architecture, Program governance, Evidence classification, and Governance records. Use Governance as the repository term for durable policy decisions about authority, ownership, approval, security acceptance, contribution, release, recommendation independence, or another repository-wide obligation.

Keep routine testing, release, feedback, maintenance, security, and other operational steps in their owning guides. Create a separate record only when the procedure embodies a durable tradeoff, authority rule, cross-cutting invariant, or recovery constraint whose rationale future maintainers need before changing it.

Require every record to declare a canonical type and matching title identifier. Require Status, Context, Decision, Consequences, Links, and Review Trigger sections. Include options, rationale, decision makers, consulted stakeholders, evidence, confirmation, and supersession information when they affect the decision.

Preserve historical filenames and identifiers. Never reuse a number. Keep superseded records, link both directions, and create a new record for a material replacement while maintaining current operating truth in the owning guide.

Make `docs/decisions/README.md` the maintained type registry, creation guide, migration note, and record index. Validation derives allowed types and index coverage from marked blocks in that guide, discovers record files dynamically, and rejects malformed identifiers, mismatched headings, missing common sections, duplicate identifiers, missing index entries, duplicate index entries, and stale index links.

## Rationale

One typed registry preserves every existing URL and keeps the collection easy to scan at its current scale. Explicit types prevent architecture from becoming a generic label while allowing all records to reuse one small format and sequence.

The creation test keeps ordinary maintenance in the document that owns current behavior. Dynamic validation protects the system's shape without making today's five records permanent dependencies of future releases.

## Consequences

Maintainers receive a concrete test, examples, counterexamples, format, status model, supersession rule, migration plan, and creation workflow in one discovery surface. Governance decisions become a supported record type rather than an unused validator value.

The validator becomes stricter, so a new record must follow the naming, heading, section, and index contracts. It still does not judge whether the decision was wise, whether a body of evidence is true, or whether human approval exists.

All existing records remain valid without renaming or content migration. Separate type directories remain available as a later change if scale, ownership, access, or lifecycle evidence justifies the additional structure.

The research did not inspect an unnamed private portfolio inventory or unrelated repositories. The selected taxonomy is justified for this repository and does not claim portfolio-wide adoption.

## Links

- [Decision record guide](README.md)
- [Issue #19](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/19)
- [Architecture](../ARCHITECTURE.md)
- [Governance](../GOVERNANCE.md)
- [Testing](../TESTING.md)
- [Releasing](../RELEASING.md)
- [Program Evidence](../PROGRAM-EVIDENCE.md)
- [Michael Nygard's ADR description](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [MADR 4.0](https://adr.github.io/madr/)
- [UK Government ADR Framework](https://www.gov.uk/government/publications/architectural-decision-record-framework/architectural-decision-record-framework)
- [Python PEP 1](https://peps.python.org/pep-0001/)
- [Open Decision Framework](https://github.com/open-organization/open-decision-framework/blob/master/ODF-community.md)
- [GRADE Working Group](https://www.gradeworkinggroup.org/)

## Review Triggers

Review this decision when the record index becomes difficult to maintain, one type develops a distinct owner or access boundary, records need different lifecycles, routine changes create excessive record ceremony, validation blocks valid historical forms, a stable redirect mechanism makes reorganization beneficial, or observed maintenance contradicts the four-type boundary.
