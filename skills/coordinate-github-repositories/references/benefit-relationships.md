# Benefit Relationships

Load this reference when the user asks what existing functionality or knowledge may contribute to a current outcome, or what would become difficult to reconstruct if existing work became unavailable. Do not load it for structural dependency tracing alone or routine implementation inside one known repository.

## Goal

Help the user find and apply existing value without requiring a complete inventory, fixed benefit taxonomy, persistent graph, manager application, or broader repository access.

Use the benefit, reusable capability, benefit relationship, candidate relationship, and confirmed relationship terms from [goal and authority](goal-and-authority.md). Confirmation accepts meaning for one decision. It does not grant access, mutation, persistence, publication, or cross-repository authority.

## Start From the Outcome

State the current outcome before searching for reusable work. Translate it into one or more needed capabilities or knowledge questions in the user's vocabulary.

Use conversation alone when that is the available evidence. When an authorized inventory or coordination surface exists, use it to locate plausible sources before inspecting repository content. Do not require a new inventory merely to answer one decision.

Search only the bounded sources that could change the recommendation. Stop when one useful candidate is sufficiently supported, no candidate is supported, another source would not change the decision, or further discovery would require new scope or access.

## Evidence Gate

A candidate relationship needs all of these elements:

- A stated current outcome.
- An identifiable source work item, capability, or body of knowledge.
- An observed artifact or authorized statement that supports what the source can do, explain, or help decide.
- A plausible mechanism that connects the source to the current outcome.
- Enough provenance, observation time, visibility, confidence, and unknowns to judge the next step.

Repository names, topics, language, stars, size, activity, file counts, documentation polish, and structural dependency edges are discovery clues. They do not establish a benefit relationship on their own.

Useful evidence depends on the work and the current decision:

- Software evidence may include interfaces, tests, examples, releases, deployed behavior, or known consumers.
- Documentation and writing evidence may include reviewed guidance, source material, editorial decisions, publication configuration, or audience-tested output.
- Research evidence may include questions, methods, findings, citations, limitations, or reproducible experiments.
- Data evidence may include provenance, schema, license, transformations, quality checks, or refresh ownership.
- Operations evidence may include runbooks, workflows, incident findings, recovery procedures, or observed service behavior.
- Mixed work may combine several evidence types without forcing one classification.

Treat a clue without this evidence as a possible place to verify, not as a candidate relationship. Do not assign a numeric score when plain language can state why confidence is limited.

## Discovery Workflow

1. State the outcome and the capability or knowledge needed.
2. Reuse explicit user context and any authorized inventory or coordination surface.
3. Inspect only the source evidence needed to test a plausible contribution.
4. Separate the observed source capability or knowledge from the inferred contribution.
5. Form a candidate only when the evidence gate passes.
6. Test each hop separately when the contribution is indirect.
7. Ask for confirmation only when meaning affects the decision or a consequential next action.
8. Compare reuse, adaptation, new work, and no change.
9. Route any implementation to its owning repository and verify within that repository's workflow.

## Candidate and Confirmed Meaning

Present a candidate as an inference awaiting review. State the source, proposed contribution, decisive evidence, confidence, visibility boundary, important unknowns, and smallest useful verification.

Ask an owner or another authorized person to confirm meaning when it would change a recommendation, durable record, publication, implementation route, lifecycle conclusion, or knowledge reconstruction claim. Reuse existing confirmed context and avoid asking the user to review low-impact details that do not affect the next step.

A confirmation is scoped to the decision where it is used. New evidence, a changed target context, a source change, or an owner correction can require review again. Accept correction, rejection, or an unresolved result without converting those outcomes into a mandatory state taxonomy.

Confirmation does not change the visibility of its evidence. A relationship derived from private evidence remains private unless the user separately approves the exact artifact and audience.

## Indirect Benefit Chains

An indirect chain contains two or more proposed relationships between the source and the outcome. Require evidence, confidence, visibility, and unknowns for every hop.

Do not assume that benefit is transitive. An unsupported or contradicted hop breaks the combined claim. Show the shortest useful chain and identify the weakest or unresolved hop instead of producing a complete graph.

## Application Fit

Confirmation establishes reviewed meaning, not implementation fitness. Before recommending reuse, compare:

- Compatibility with the target context, interface, format, or audience.
- Freshness and whether the source still behaves as observed.
- License, rights, privacy, confidentiality, and publication limits.
- Adaptation effort, workflow disruption, and maintenance ownership.
- Recovery when the reused functionality or knowledge is wrong or becomes unavailable.
- The current system, no change, new work, and a smaller manual alternative.

Recommend reuse only when its decisive fit is supported. A no-change result is valid when the available candidates are weak, stale, incompatible, too costly, or unnecessary.

## Knowledge Reconstruction

Treat a knowledge-loss question as a counterfactual: what capability, evidence, decision context, method, or operational understanding would become difficult to reconstruct if this source became unavailable?

Check for maintained copies, mirrors, releases, publications, external references, other knowledgeable owners, and independent evidence before describing reconstruction risk. State what is unique, what is duplicated, what remains unknown, and which preservation step would be proportionate.

Do not claim that knowledge will be lost merely because a repository is old, inactive, unfamiliar, or poorly documented. Do not infer an archive, deletion, or preservation decision without lifecycle evidence and owner authority.

## Output Contract

Give the user the decision before the internal evidence structure. By default, return one to three supported candidates or state that no useful candidate is supported.

For each candidate, include only what the user needs now:

- The existing functionality or knowledge that may help.
- How it may contribute to the current outcome.
- The decisive evidence.
- A material caveat, visibility limit, or unknown.
- The next bounded verification.

Surface detailed provenance, observation time, confidence, ownership, and refresh information when they affect the decision or the user requests a reusable artifact. Do not expose an internal schema merely because the agent used one to reason.

If the user approves persistence, use the existing inventory, coordination surface, or owner-maintained documentation. Record the outcome, source, contribution, evidence, candidate or confirmed meaning, visibility, observation time, important unknowns, owner, and refresh trigger in the receiving system's vocabulary. Do not create a skill-owned graph or profile.

## Ownership and Completion

Treat every source repository as evidence only until the user authorizes an exact implementation target and action. Route changes to the repository that owns the functionality, document, data, policy, or decision. Linking several repositories in one relationship does not authorize writes to any of them.

Finish when the user can identify what existing work may help, why the evidence supports or limits that claim, whether confirmation or fit remains unresolved, which option is preferred, who owns implementation, and what bounded verification comes next.
