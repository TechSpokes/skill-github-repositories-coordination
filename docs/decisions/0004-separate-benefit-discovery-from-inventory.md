# Architecture Decision 0004: Separate Benefit Discovery From Inventory

Decision type: Architecture.

## Status

Accepted for implementation on 2026-07-19 through [issue #27](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/27) and the user-approved implementation plan.

## Context

The runtime could inventory repositories, reuse established practices, and preserve tentative relationship meaning. It did not tell an agent how to discover existing functionality or knowledge that may contribute to a current outcome, confirm that meaning, evaluate application fit, or answer what would become difficult to reconstruct if work became unavailable.

Adding the workflow to `inventory-and-coordination.md` would make a focused reuse question load portfolio schemas, lifecycle guidance, automation gates, and cross-repository contracts. Putting it in `SKILL.md` would increase the always-loaded core. Leaving the workflow implicit would preserve the gap described in issue #27.

Research checked on 2026-07-19 supports a qualified evidence relationship without requiring a graph vocabulary. GitHub's dependency graph describes manifests, lock files, and submitted dependencies, so it is structural evidence rather than proof of benefit. PROV-O and DCAT show how a relationship can carry qualifying context. The Web Annotation Data Model separates a related body and target without requiring one transport system. The Data Quality Vocabulary treats quality as dependent on the context of use.

## Decision

Add `benefit-relationships.md` as a focused reference linked directly from `SKILL.md`. Load it only for functionality reuse, knowledge reuse, or knowledge reconstruction questions. Keep practice reuse, inventory construction, routing, lifecycle, and cross-repository work contracts in `inventory-and-coordination.md`.

Begin benefit discovery with the user's current outcome. Use explicit context and an authorized inventory or coordination surface when available, then inspect only evidence that could reveal a relevant capability or body of knowledge.

Require an identifiable source, observed capability or knowledge, plausible contribution mechanism, and enough provenance, time, visibility, confidence, and unknowns to support a candidate. Treat repository metadata, activity, language, documentation quality, and dependency edges as discovery clues rather than benefit evidence.

Keep candidate inference separate from confirmation for the current decision. Confirmation does not grant access, mutation, persistence, publication, or cross-repository authority. Test each hop in an indirect chain separately and do not assume transitive benefit.

Return one to three concise candidates or a no-supported-candidate result by default. Show detailed relationship fields only when they affect the decision or the user requests a durable artifact.

Store a durable relationship only after the user approves its purpose, location, visibility, owner, and refresh trigger. Reuse an existing inventory, coordination surface, or owner-maintained document. Do not create a skill-owned graph, profile, connector, portal, or manager application.

Route implementation to the repository that owns the changed functionality, document, data, policy, or decision. Treat every source repository as evidence only until the user separately authorizes an exact target and action.

## Consequences

A simple reuse question loads only the focused relationship workflow instead of portfolio administration guidance. The core remains conversation capable and below its line limit.

Agents can apply one evidence contract to software, documentation, writing, research, data, operations, publishing, and mixed work without storing a mandatory taxonomy.

The runtime gains a new direct reference and activation language. Architecture, evaluation, threat, release, and package surfaces must therefore change together.

The workflow can identify a supported candidate, an unresolved indirect chain, or no useful candidate. It cannot prove user benefit beyond the observed model and evidence context, and it does not replace owner review or outcome evidence from real use.

## Alternatives Considered

No change was rejected because it left the stated user outcome unimplemented.

Extending `inventory-and-coordination.md` was rejected because it would load unrelated schemas and administration for one reuse decision.

Embedding the full workflow in `SKILL.md` was rejected because it would burden every run.

A persistent graph or new manager surface was rejected because one decision does not establish a stable schema, owner, refresh contract, or repeated need.

## Links

- [Issue #27](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/27)
- [Architecture](../ARCHITECTURE.md)
- [Goal and Authority](../../skills/coordinate-github-repositories/references/goal-and-authority.md)
- [Benefit Relationships](../../skills/coordinate-github-repositories/references/benefit-relationships.md)
- [GitHub Dependency Graph](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph)
- [PROV-O](https://www.w3.org/TR/prov-o/)
- [DCAT 3](https://www.w3.org/TR/vocab-dcat-3/)
- [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)
- [Data Quality Vocabulary](https://www.w3.org/TR/vocab-dqv/)

## Review Triggers

Review this decision when observed users need a stable shared relationship model, the focused reference repeatedly loads with unrelated workflows, confirmation burden delays ordinary decisions, indirect chains produce unsupported claims, private relationships escape their visibility boundary, or a receiving inventory or portal establishes a better owned contract.
