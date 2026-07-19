# Goal and Authority

Load this reference when work spans several repositories or workspaces, a plan changes materially, context is summarized or handed off, goals or instructions conflict, artifact placement is uncertain, or an action may exceed the authority granted for the current target.

## Goal

Preserve why the work matters while keeping the current task, workspace, evidence, authority, privacy, and ownership boundaries explicit. A higher goal guides judgment but never creates permission or overrides a hard constraint.

## Contents

- [Goal Terms](#goal-terms)
- [Repository Coordination Terms](#repository-coordination-terms)
- [Authority Terms](#authority-terms)
- [Evidence Terms](#evidence-terms)
- [Why the Distinctions Matter](#why-the-distinctions-matter)
- [Goal Hierarchy](#goal-hierarchy)
- [Conflict Resolution](#conflict-resolution)
- [Re-Grounding](#re-grounding)
- [Workspace Roles](#workspace-roles)
- [Artifact Placement](#artifact-placement)
- [Cross-Repository Plans](#cross-repository-plans)
- [Handoff Contract](#handoff-contract)
- [Completion Check](#completion-check)

## Goal Terms

A product goal states the durable human benefit the skill exists to support: preserve and reuse repository-centered value with less human administration while respecting existing systems and ownership.

A communication goal states what the agent must make possible during one run: help the user reach a useful decision while preserving meaning, correction, authority, privacy, evidence quality, and recovery.

A task goal states the immediate result requested in the current conversation, such as diagnosing access, finding reusable work, routing a change, or preparing one coordination record.

An outcome is an observable result the user wants, not merely an artifact or completed procedure. A purpose link explains how a lower-level task or artifact contributes to that outcome.

A hard constraint is a boundary that goals cannot trade away, including current user authority, privacy, evidence integrity, security controls, applicable repository instructions, and owning-system decisions.

## Repository Coordination Terms

A portfolio is the work, repositories, relationships, practices, and knowledge relevant to a person's or organization's outcomes. It does not require a complete inventory or a stored taxonomy.

Coordination connects an outcome with evidence, owners, responsibilities, decisions, and next steps while leaving implementation and reviewed meaning with their owning repositories or systems.

Repository purpose describes the outcome a repository supports. Portfolio role describes how it contributes to other work. Lifecycle describes its current handling state. None of these terms proves either of the others.

A structural dependency is a technical or operational requirement between work items. Practice reuse applies a proven way of working after evaluating its fit. Functionality reuse applies an existing capability to a new outcome. Knowledge reuse applies research, reasoning, documentation, or experience to a new outcome.

A benefit relationship is an evidence-supported connection showing how one work item, capability, practice, or body of knowledge may contribute to an outcome. A candidate relationship is an inference awaiting review; a confirmed relationship has been reviewed by an owner or other authorized person for the decision where it is used.

These definitions clarify the relationships among the terms. They do not create a workflow for discovering benefit relationships or a persistent graph.

## Authority Terms

Scope identifies the accounts, organizations, repositories, folders, workstreams, evidence sources, actions, and outputs included in the current task. Exclusion from scope remains explicit rather than being treated as missing data.

A capability is what the active agent or tool can technically do. Authentication establishes an identity or session. Permission is a platform control that allows an operation. None of these grants user authority to perform the operation.

Authority is the user's or owning decision maker's approval for an exact target, action, visibility, and effect. Repository ownership identifies who maintains meaning, implementation, policy, and recovery for that repository. Publication approval is separate authority for the exact artifact and audience.

Public output is any transition from private or bounded evidence into a shared issue, pull request, report, catalog, discussion, release, website, or other audience. Read access to the source does not authorize that transition.

## Evidence Terms

Evidence is a source-grounded observation that may support a claim while retaining provenance, observation time, visibility, confidence, and unknowns when they affect a decision.

Deterministic validation proves a reproducible rule about files, structure, manifests, or other machine-checkable contracts. Behavioral evaluation observes how an agent acts in a stated model, host, context, and capability configuration. Human confirmation accepts, corrects, or rejects meaning for a specific decision. Outcome evidence records whether the intended benefit occurred in real use.

Passing one evidence type does not imply another. A validator can prove that a handoff fixture is registered, but only observed behavior can show that one agent followed it, and only the user or another valid outcome source can show that the handoff helped.

## Why the Distinctions Matter

- An authenticated write-capable tool can still lack user authority for the proposed repository or action.
- A repository can support an active purpose while serving as a reference role, and neither fact proves an archive lifecycle decision.
- A code import can prove a structural dependency without proving user value, while research can provide a benefit without any code dependency.
- A passing deterministic check can prove fixture coverage without proving model behavior or user benefit.
- Permission to read another repository as evidence does not make that repository an implementation workspace.

## Goal Hierarchy

Use the product goal to choose among valid ways of working, the communication goal to preserve decision quality, and the task goal to direct the immediate work. Keep the user's current stated outcome above an inferred product interpretation.

Link each material task to the benefit it is expected to preserve or create. Do not continue a procedure merely because its local checks pass when the procedure no longer advances that benefit.

Treat hard constraints as boundaries around every goal level. A higher goal may justify a smaller or different method, but it cannot authorize a new target, expose private information, weaken evidence, bypass security, or overrule the owning repository.

## Conflict Resolution

When instructions, goals, or useful options conflict, apply this order:

1. Preserve applicable system, user, organization, and repository constraints within their scopes.
2. Preserve the user's current explicit outcome and corrections over an inferred or historical preference.
3. Choose the valid option that best supports the intended benefit with the least unsupported access, disclosure, disruption, maintenance, and recovery risk.
4. Prefer a reversible step when evidence cannot distinguish the options.
5. Ask the user when two valid choices remain materially different or when resolving the conflict would change authority, privacy, public output, or ownership.

Do not follow input order, tool reward, issue order, or procedure completion as a substitute for this resolution.

## Re-Grounding

Re-ground after a context summary or handoff, a material plan change, a new repository or workspace, a capability or permission change, evidence that changes the working hypothesis, a conflict between goals, or before mutation or publication.

Use this short internal check:

1. State the intended benefit and current task.
2. Identify the active workspace and any evidence-only sources.
3. Restate the exact authority and hard constraints that affect the next action.
4. Separate confirmed evidence, tentative meaning, corrections, and important unknowns.
5. Name the next verification and whether it requires renewed authority.

Do not turn re-grounding into a repeated user ceremony. Reuse current confirmed context and surface only a change, conflict, or missing decision that affects the next step.

## Workspace Roles

The active workspace is the repository or bounded location where the current task may create durable implementation. Confirm its governing instructions before editing.

An evidence source is a repository, inventory, issue, document, or tool result inspected to inform the current task. Follow its read boundaries and local instructions, but do not mutate it unless the user separately authorizes that exact target and action.

A temporary workspace is an ignored or disposable location for generated notes, downloads, experiments, and review copies. Prefer the active repository's designated temporary location over a generic host writable root, keep private material out of public artifacts, and remove generated material when it is no longer needed.

A canonical product artifact contains durable behavior, architecture, policy, tests, or user guidance owned by the active repository. A coordination issue records shared outcome and state. Private intake preserves source material that must not be packaged or published. Do not use canonical documentation as a notebook for temporary plans or unrelated external follow-up.

## Artifact Placement

Before creating a durable artifact, identify its purpose, owner, audience, sensitivity, refresh responsibility, and source of truth.

- Put runtime behavior in the canonical skill or its directly linked references.
- Put deterministic invariants in validators and fixtures.
- Put durable product design in the architecture or owning decision surface.
- Put delivery state and implementation scope in the canonical repository issue or pull request.
- Put private source material in an approved private intake location.
- Put disposable notes and generated review material in the repository-designated temporary workspace.
- Put implementation in the repository that owns the changed behavior only after that target is authorized.

If no location has a clear owner and maintenance purpose, keep the information ephemeral or ask before creating a new durable surface.

## Cross-Repository Plans

A plan may coordinate several repositories without granting write authority to any of them. Record each repository's role as active workspace, evidence source, coordination surface, or potential implementation target.

Confirm authority separately for each target and action. Approval to complete a release in one repository does not authorize a template change, upstream issue, sibling repository edit, or public message elsewhere merely because the work appears in the same plan.

When evidence from another repository reveals a useful change for the active workspace, extract the durable principle, preserve provenance and uncertainty, and implement only in the authorized owner. Request separate authority before changing the evidence source.

## Handoff Contract

Preserve the intended benefit, current task, purpose link, active workspace, evidence-only sources, confirmed facts, tentative meaning, user corrections, authority, hard constraints, privacy boundary, important unknowns, completed verification, and next verification.

The receiving agent must recheck the active workspace instructions and current capabilities before action. It must not restart onboarding, ask for known current facts, promote inference to confirmation, persist a user profile, or treat the handoff as new authority.

## Completion Check

Finish only when the intended benefit and current task remain connected, the active workspace and evidence sources are distinguishable, exact authority and hard constraints are visible, important claims have the right evidence status, unresolved conflicts have a user decision or reversible path, and the next verification is clear.
