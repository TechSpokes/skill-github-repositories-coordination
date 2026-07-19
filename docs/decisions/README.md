# Decision Records

## Purpose

Keep durable choices reviewable without calling every important document an architecture decision. A decision record preserves why a choice was made, while the owning runtime, policy, specification, or procedure remains the source for current behavior.

## Creation Test

Create a decision record when all of these conditions apply:

- A specific choice is ready for durable review, accepted, rejected, or superseded. An open question or implementation plan belongs in an issue or pull request until a decision exists.
- The choice changes a durable contract, authority rule, evidence boundary, or cross-cutting program rule rather than one local implementation detail.
- Future maintainers will need the rationale, alternatives, or consequences before they can change the choice responsibly.
- The rationale cannot remain clear enough in the owning architecture, governance, evidence, or procedure guide alone.

Use a normal documentation or implementation change when the edit corrects facts, applies an accepted decision, changes one local detail, or updates routine steps without creating a new durable tradeoff or authority boundary. This threshold keeps the record set small enough to review and prevents ordinary maintenance from becoming governance ceremony.

## Decision Types

The values between the markers are the canonical `Decision type` values used by validation.

<!-- decision-types:start -->
- `Architecture`: A durable choice about system structure, component or source boundaries, runtime contracts, quality-attribute tradeoffs, integration shape, dependencies, interfaces, or a significant technical constraint.
- `Program governance`: A cross-cutting choice about roadmap sequencing, delivery coordination, program review, or how a bounded program uses evidence without changing product structure or permanent repository authority.
- `Evidence classification`: A choice that accepts, rejects, classifies, or limits a body of evidence and states the claims that evidence may support.
- `Governance`: A durable policy choice about decision authority, ownership, approval, security acceptance, contribution rules, release authority, recommendation independence, or another repository-wide obligation.
<!-- decision-types:end -->

Use `Governance` as this repository's policy-decision type. A program decision coordinates a bounded delivery or learning program; a governance decision controls authority or obligations that continue independently of that program.

## Examples and Counterexamples

| Type or owner | Record-worthy example | Keep in the owning artifact |
|---|---|---|
| Architecture | Add a focused runtime reference instead of expanding the always-loaded core. | Reword one paragraph without changing behavior or source boundaries. |
| Program governance | Separate repository delivery from external outcome evidence across the roadmap. | Update one issue checklist or release date. |
| Evidence classification | Accept a founding trial for one claim while excluding it from unsolicited-adoption claims. | Add a source link or correct an observation date without changing the accepted claim. |
| Governance | Change who may approve public releases or accept security risk. | Clarify a contributor step without changing authority or obligations. |
| Procedure guide | Record a release immutability or recovery tradeoff that future maintainers must understand before changing the steps. | Update a command, tool version, or routine sequence in `TESTING.md`, `RELEASING.md`, `FEEDBACK.md`, or `MAINTENANCE.md`. |

## Record Format

Use the next unused four-digit identifier and a lowercase dashed filename: `NNNN-short-title.md`. Keep all types in this directory and one shared sequence. Never reuse an identifier, even when a draft is rejected or a record is superseded.

Start the title with the display type and matching identifier, such as `# Governance Decision 0005: Use One Typed Decision Registry`. Declare the canonical type on the next line as `Decision type: Governance.`

Every record contains these sections:

- `Status` states whether the choice is proposed, accepted, rejected, deprecated, or superseded and gives the relevant date or replacement.
- `Context` states the problem, constraints, and relevant evidence without presenting inference as fact.
- `Decision` states the chosen rule or response in current, explicit language.
- `Consequences` records beneficial, adverse, and neutral effects that matter to later work.
- `Links` connects the owning issue, implementation, current guidance, and related or superseding records.
- `Review Trigger` or `Review Triggers` states which changed evidence or operating condition should reopen the choice.

Add options, rationale, decision makers, consulted stakeholders, confirmation, or a supersession section when they improve reviewability. Do not copy the current procedure into the record; link the owning guide instead.

## Status and Supersession

Preserve accepted, rejected, deprecated, and superseded records as history. Correct factual errors and maintain status, replacement, and link information, but create a new record when the decision itself changes materially.

The replacement links back with `Replaces`, and the older record links forward with `Superseded by`. Current runtime, governance, evidence, and procedure documents must state the rule that applies now so an agent does not need every historical record to perform ordinary work.

## Record Index

The index is the discovery surface for every record. Validation discovers record files from this directory and requires each file to appear exactly once between these markers.

<!-- decision-index:start -->
- [Program Decision 0001](0001-evidence-gated-roadmap.md) records the original evidence-gated roadmap model and is superseded.
- [Evidence Decision 0002](0002-accept-founding-use-case-for-phase-0.md) classifies the founding target use case and its claim boundary.
- [Program Decision 0003](0003-separate-delivery-from-outcome-evidence.md) separates repository delivery from external outcome evidence.
- [Architecture Decision 0004](0004-separate-benefit-discovery-from-inventory.md) separates focused benefit discovery from inventory administration and persistent relationship storage.
- [Governance Decision 0005](0005-use-one-typed-decision-registry.md) defines the shared taxonomy, procedure boundary, identifier policy, index, and validation contract.
<!-- decision-index:end -->

## Maintainer Workflow

1. Link the proposed choice to an issue and confirm that it passes the creation test.
2. Compare the current system and no change with the serious alternatives.
3. Select the decision type and next unused identifier without renaming historical files.
4. Add the record, update its owning current guide, and add one index entry in the same pull request.
5. Run `npm run validate` and the release checks required by the change.
6. After acceptance, keep implementation and current operating truth in their owning artifacts and use a later record for material replacement.

## Migration

The v1.10.0 migration is additive. Records 0001 through 0004 retain their filenames, identifiers, type labels, links, and history. Record 0005 adds the previously documented but unused `Governance` type and formalizes the shared registry.

Separate directories or per-type sequences would add navigation and collision rules without improving the current five-record collection. Revisit categorization only when the index becomes difficult to maintain or one type develops a distinct owner, audience, access boundary, or lifecycle.

## Research Basis

Research for [issue #19](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/19) was reviewed on 2026-07-19. The repository audit covered all current records, procedure and governance guides, validation, Git history, and related roadmap issues.

Primary sources support short records with status, context, decision, consequences, rationale, stable identifiers, and preserved supersession history. [Michael Nygard's original ADR description](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), [MADR 4.0](https://adr.github.io/madr/), [the UK Government ADR Framework](https://www.gov.uk/government/publications/architectural-decision-record-framework/architectural-decision-record-framework), and the [ISO/IEC/IEEE 42010 conceptual model](http://www.iso-architecture.org/42010/cm) define the architecture boundary and common record shape.

[Python PEP 1](https://peps.python.org/pep-0001/) demonstrates one indexed sequence with explicit record types and a threshold that leaves ordinary fixes outside the proposal system. The [Open Decision Framework](https://github.com/open-organization/open-decision-framework/blob/master/ODF-community.md) informs the governance fields for authority, stakeholders, constraints, research, impact, and review. The [GRADE Working Group](https://www.gradeworkinggroup.org/) supports keeping evidence certainty and limitations separate from the recommendation or decision made from that evidence.

No exact private portfolio inventory or additional portfolio repository was named as an authorized evidence source for this implementation. Existing public repository summaries corroborate the value of separating architecture, evidence, governance, and procedure concerns, but this release does not claim that the complete portfolio uses the same four-type taxonomy.
