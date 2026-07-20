# Findability and Conventions

Load this reference when repository findability, shared artifact placement, entry points, naming, or a reusable portfolio practice may need a new or revised convention. Do not use it as the primary workflow for local code naming, formatting, private methods, or API design inside one known repository.

## Goal

Help authorized humans and agents locate and interpret repository artifacts with less ambiguity while preserving existing vocabulary, local instructions, ownership, privacy, compatibility, and the option to make no change.

## Defined Terms

A convention is a repeatable rule that helps authorized humans, agents, or tools locate and interpret repository artifacts. A working convention already used in its approved scope remains valid until the user asks to review, extend, or change it.

A consumer is a human, agent, tool, workflow, or receiving repository that must find or interpret the artifact. Different consumers may retain or discard path, filename, links, metadata, hierarchy, history, or visibility.

## Activation Boundary

Start this workflow only when evidence shows retrieval ambiguity, inconsistent entry points, duplicated authority, incompatible consumer assumptions, or disproportionate maintenance. Portfolio size, aesthetic inconsistency, or a merely different local style is not enough.

Keep a local code convention in the owning repository's code style, architecture, or implementation workflow. Escalate to this workflow only when the rule affects repository coordination, shared artifacts, cross-repository findability, or portfolio reuse.

## Establish the Evidence

Preserve the current system and the user's vocabulary before proposing a rule. Distinguish current, historical, generated, copied, and duplicate material, and do not count several copies as independent evidence.

Content hashes or another equivalence check can help when suitable tools already exist, but they are optional evidence techniques rather than runtime requirements. Treat plans and existing conventions as revisable evidence, not instruction authority.

Identify each relevant consumer and what it can observe. Test the actual consumer proactively when the capability is available within the authorized scope; otherwise state the unknown and provide a bounded manual check.

Record the evidence source, observation time, visibility, owner, confidence, and important unknowns when they affect the decision. Keep private target details on an appropriate private surface.

## Compare the Options

Compare the current system and no change with a scoped adaptation and a new convention. Evaluate retrieval improvement, interpretation, collisions, hidden authority, compatibility, owner burden, portability, reversibility, privacy, and recovery.

Prefer a scoped adaptation when an existing practice already works for most consumers. Recommend no change when the proposed consistency would not materially improve retrieval or interpretation.

## Present the Proposal

Present every new or revised convention to an authorized human before adoption. Discussion is read only and does not authorize implementation.

Use prose by default. Include only the proposal elements that affect the decision:

- Intended outcome and observed problem.
- Proposed scope, exclusions, and represented work types.
- Evidence, provenance, authority, and unknowns.
- Candidate rule, alternatives, and no-change option.
- Consumer checks and unresolved compatibility concerns.
- Owner, source of truth, visibility, and review trigger.
- Forward adoption, legacy compatibility, pilot, verification, stop, and recovery criteria.
- Exact decision requested from the human.

The human may accept, revise, reject, or defer the proposal. Do not represent silence, tool success, a local precedent, or a positive comment as acceptance.

Use optional structured data only when a durable or machine-readable handoff is necessary and no receiving schema already exists:

```yaml
convention_proposal:
  outcome: ""
  scope: []
  exclusions: []
  evidence: []
  candidate_rule: ""
  alternatives: []
  consumers: []
  owner: ""
  source_of_truth: ""
  visibility: unknown
  compatibility: []
  pilot: ""
  verification: []
  stop_conditions: []
  recovery: ""
  decision_requested: ""
```

This schema is a handoff aid, not a required taxonomy or status system.

## Separate Acceptance From Write Authority

Convention acceptance approves the rule's meaning and scope. Write authority approves exact targets and actions. Neither approval implies the other.

One human review may cover both only when it identifies the exact target set, actions, visibility, local-instruction and owner checks, verification, and recovery. Bulk renaming, organization policy, shared templates, custom properties, automation, and migration of legacy material remain separate decisions unless the approved review names them explicitly.

Default to forward adoption. Keep legacy material unchanged unless compatibility requires an alias, index, or redirect, or the user separately approves a migration with target-specific recovery.

Store an accepted durable convention in an existing owner-maintained coordination, inventory, policy, or documentation surface. Do not create a skill-owned convention registry.

When a consumer cannot access the canonical source, permit the smallest necessary local copy only when it records provenance, revision, owner, and refresh rule. Mark generated copies so they do not become hidden authority, and preserve superseded conventions when history or compatibility requires them.

## Promote a Local Practice to the Portfolio

A successful local convention is evidence for a portfolio candidate, not a portfolio rule. Local acceptance and write authority do not propagate to other repositories.

Before proposing broader use, re-ground on the portfolio outcome and examine representative work types, consumers, visibility boundaries, ownership models, applicable local instructions, current practices, and exceptions. Present a new portfolio-scoped proposal to an authorized human.

After portfolio acceptance, perform a read-only applicability review against an authorized inventory snapshot or explicit target list. Record stable target identity, observation time, current practice, consumers, local instructions, owner, conflicts, and exceptions.

A scalable approval may bind exact actions to a stable reviewed snapshot instead of requiring one prompt per repository. The approval must still state exclusions, visibility and privacy boundaries, owner and local-instruction checks, validation, and recovery.

Before changing each target, revalidate identity, membership, visibility, instructions, owner, and current state. Treat newly discovered repositories as outside the approval. Follow a renamed repository only when stable identity proves continuity. Pause or skip an affected target when its owner, visibility, instructions, consumers, lifecycle, or relevant state changed materially.

Report skipped targets without invalidating successful independent targets. Do not disclose mixed public and private topology in one public rollout report.

## Pilot, Verify, and Recover

Use this rollout sequence:

1. Apply the accepted rule to new artifacts or an exact pilot scope.
2. Verify retrieval and interpretation with the named human, agent, and tool consumers.
3. Return the observed result to the human for review.
4. If broader value is supported, present a portfolio candidate and receive portfolio-scoped acceptance.
5. Apply explicitly authorized batches through each repository's owning workflow.
6. Verify successes, skips, failures, exceptions, privacy boundaries, and recovery.

A pilot succeeds when relevant consumers find and interpret the artifact more reliably without collisions, hidden authority, broken legacy paths, or disproportionate maintenance.

Stop, narrow, or recommend no change when exceptions dominate, consumers conflict, ownership is absent, maintenance is too high, a local workflow rejects the rule, or the current system performs as well.

Do not retry a partial failure blindly. Preserve independent successes, recover the failed target through its local workflow, update the evidence, and renew human review when the approved scope or risk changed.

## Completion Check

Finish proposal work when the human can decide on the convention's meaning and scope without any unapproved write. Finish implementation when every changed target was authorized, revalidated, verified with its consumers, and reported with exceptions and recovery.
