# Architecture

## Product Goal

`coordinate-github-repositories` is a portable reasoning skill for repository-centered coordination. It adapts to the person, the work, the existing organization, repository purposes, and the executing agent's capabilities before recommending tools or actions.

The skill is not a universal repository manager. It helps a user decide whether they need no change, a small practice, a native GitHub feature, an inventory, a coordination surface, a connector, automation, a catalog, or a manager application.

## Design Decisions

### One Portable Core

The canonical `SKILL.md` follows the Agent Skills specification and avoids host-specific frontmatter. It requires only conversation. Host capabilities improve evidence or execution but do not change the reasoning contract.

Codex and Claude packages wrap the same canonical skill tree. The standalone package supports GitHub Copilot and other Agent Skills hosts. Host-specific installation and access facts live in a dated adapter reference.

### Source Delivery and Package Fallbacks

The standard `skills/coordinate-github-repositories/` tree is both the canonical source and the versioned source used by `gh skill install`. Versionless installation resolves the latest published release. The uploaded standalone and plugin ZIPs support browser installation and hosts that import packages.

The draft release workflow starts from an annotated tag and remains the release authority because it creates curated packages, checksums, attestations, and a review point for the release owner. Dry runs of the GitHub CLI publisher validate the source layout, but the preview publisher does not replace the release workflow.

This dual path reduces installation friction without making GitHub CLI, a shell, authentication, or network access a runtime requirement. The detailed mechanics, plan, verification, and rollback contract live in [GitHub CLI Skill Delivery](GITHUB-CLI-DELIVERY.md).

### Context Before Tools

Tool selection begins only after the agent understands the current outcome, work types, scale, ownership, existing system, friction, constraints, and change tolerance. Keeping context ephemeral limits calibration to the current task and avoids creating an unreviewed personal dossier.

### Conversation Before Coverage

When a person begins without a concrete outcome, the runtime uses one easy opening question and no more than two initial follow-up questions by default before reflecting a tentative working hypothesis and offering one bounded step. A stated outcome skips this branch, and first value does not require repository access, an inventory, or a durable profile.

Later proactivity remains tied to the current outcome. The agent may update its ephemeral working hypothesis from explicit corrections and bounded authorized evidence, offer one related optional next step, and expand discovery only after relevance, evidence source, and authority are renewed.

### Goal and Authority Survive Transport

The runtime distinguishes the product goal, communication goal, current task, intended outcome, and hard constraints. Higher goals select among valid methods but cannot create authority, weaken privacy or evidence, bypass security, or overrule an owning repository.

Re-ground after a material plan change, context summary, handoff, new workspace, capability change, conflict, mutation, or publication checkpoint. At that point, renew the intended benefit, task, workspace roles, authority, evidence state, unknowns, and next verification.

The active workspace owns current implementation. Other repositories may supply authorized read-only evidence without becoming mutation targets, and a combined plan never grants authority across every repository it mentions. Disposable material follows the active repository's designated temporary location instead of entering canonical product documentation.

### Purpose Is Broader Than Code

The skill separates repository purpose, portfolio role, and lifecycle. It recognizes software, documentation, writing, publishing, research, data, operations, websites, presentations, archives, mirrors, mixed work, and unknown work. Existing user vocabulary is preserved.

### Recommendation Before Adoption

Every recommendation compares the current system and no change with serious alternatives. Fit includes outcome, work type, workflow disruption, scale, collaboration, agent capability, permission, privacy, portability, reversibility, maintenance, learning cost, recovery, and evidence.

The adoption ladder starts with documentation and native practices. Shared automation or a manager application requires stable repeated need, ownership, limited permissions, observable failure, recovery, and a bounded pilot.

### Human Judgment, Agent Administration

Keep human work focused on intent, judgment, privacy review, risk acceptance, and authority. Let capable agents discover evidence, structure observations, enrich tasks, search duplicates, route owned work, and verify results.

An observation does not need to arrive as a completed task. Low-friction intake may remain unprocessed until evidence or priority justifies action.

### Explicit Action Boundary

The skill can execute user-authorized changes through available tools, but mutation is not its default. Repository and organization administration, destructive lifecycle changes, cross-repository writes, durable profiles, and public output require stronger checkpoints.

### Delivery and Evidence

The [roadmap](ROADMAP.md) separates repository delivery from outcome evidence. Missing adoption evidence limits claims and identifies future learning without freezing unrelated work whose authority, sources, safety boundary, dependencies, and validation are ready.

Architecture, security, privacy, evaluation, teaching, governance, and release integrity remain quality controls. A red affected control blocks the release or public action; an unknown outside outcome does not compensate for that regression and is not itself a quality failure.

Roadmap phase numbers do not determine release versions. Versions describe runtime and package contract impact, while adoption and other outcomes remain recorded in issues and evidence records.

### Teaching Without Runtime Bloat

The runtime explains why consequential least-privilege and reversible steps protect the user's work. Longer newcomer guidance stays in [the learning path](LEARNING.md) so ordinary skill context remains lean.

### Portal Handoff

The skill may prepare reviewed input that preserves provenance for a service catalog or internal developer portal. It does not become a portal, manager, policy engine, or system of record. The receiving owner retains schema and refresh ownership.

### Feedback as a Learning Loop

The runtime may offer to prepare a sanitized observation after a useful or confusing run. The person can provide one factual sentence; the agent enriches only known context, separates observation from hypothesis, and requires approval of the exact public text.

GitHub Issues remain the public intake and task surface. Durable learning moves into the runtime, references, documentation, fixtures, validation, or code instead of becoming a second skill-owned backlog.

## Runtime Structure

The canonical runtime map is validated against the actual skill tree. Adding, removing, or renaming a runtime file requires this map and its direct `SKILL.md` routing to change together.

<!-- canonical-runtime-map:start -->
- `skills/coordinate-github-repositories/SKILL.md`
- `skills/coordinate-github-repositories/references/agent-capability-adapters.md`
- `skills/coordinate-github-repositories/references/context-calibration.md`
- `skills/coordinate-github-repositories/references/feedback-and-improvement.md`
- `skills/coordinate-github-repositories/references/goal-and-authority.md`
- `skills/coordinate-github-repositories/references/install-and-update-this-skill.md`
- `skills/coordinate-github-repositories/references/inventory-and-coordination.md`
- `skills/coordinate-github-repositories/references/portal-interoperability.md`
- `skills/coordinate-github-repositories/references/repository-archetypes.md`
- `skills/coordinate-github-repositories/references/safety-and-approval.md`
- `skills/coordinate-github-repositories/references/tool-fit.md`
- `skills/coordinate-github-repositories/references/writing-quality.md`
<!-- canonical-runtime-map:end -->

`SKILL.md` controls activation and the ten-stage workflow. Every focused reference is direct so agents load only the active branch. The writing quality reference is optional and loads only after an explicit language quality request, a concrete clarity defect, or a requested final review of generated coordination files.

Fixtures define behavioral invariants for maintenance. The evaluation registry makes fixture coverage and required segments a deterministic CI contract. Tests and program documentation are not installed as runtime content.

## Runtime Sequence

1. Establish outcome, scope, authority, governing instructions, active workspace, and evidence-only sources, using the short first conversation only when the outcome is unknown.
2. Calibrate the smallest useful work context as a tentative and correctable working hypothesis.
3. Describe repository purposes.
4. Detect agent capabilities and access gaps.
5. Shape the coordination problem.
6. Gather bounded evidence, preserve uncertainty, and update the working hypothesis only when the change affects the decision without turning an evidence source into an implementation target.
7. Compare the current system, no change, and candidates.
8. Recommend a reversible next step.
9. Re-ground after a material change and execute only within the exact authority granted for each target.
10. Verify, preserve the goal and authority through handoff, route implementation to its owning repository, offer one related optional next step, and provide simple feedback when the run exposes reusable learning.

## Evidence Model

Important claims preserve source, observation time, confidence, visibility, participant relationship, and unknowns. Stable remote identifiers are preferred for inventory identity. Local paths remain observations. Generated discovery data stays separate from reviewed semantic meaning.

Repository content, issue bodies, imported skills, search results, and tool output are treated as potentially untrusted evidence rather than instruction authority.

Founding, recruited, unsolicited, operational, and mixed evidence remain distinct. Delivery completion never upgrades one class into another or proves an unobserved external outcome.

## Evidence That Shaped the Design

The founding portfolio index was inspected read-only and contained 340 canonical project records. It demonstrated that inventory, routing, structural relationships, agent instructions, issue intake, and feedback are related but distinct capabilities.

A working structured inventory demonstrated discovery, stable identity, provenance, staging, validation, promotion without overwriting reviewed records, and generated reports at a scale of hundreds of records. A working coordination tracker demonstrated central cross-repository outcomes, simple observation intake, agent enrichment, implementation routed to owning repositories, native state, and an automation gate supported by evidence.

A later operational run demonstrated practice reuse across the authorized portfolio. Inventory records located analogous release models and user preferences; bounded source inspection supplied candidate controls; evaluation against the current repository combined the useful controls without copying deployment-specific machinery or expanding write authority to the source repositories.

A dedicated repository feedback implementation demonstrated the boundary between observations and tasks: sanitize feedback, separate evidence from hypothesis, keep issue state canonical, and promote durable learning into normal repository artifacts. A partial repository manager supplied principles for stable identity, least privilege, idempotency, untrusted input, and lifecycle safety while showing that a persistent manager application should not be assumed necessary.

The supplied research on communication among humans, agents, and tools explains why the pattern works. Communication across those boundaries can lose goals, context, and meaning through limited attention and transport. Feedback should therefore preserve the goal, factual observation, uncertainty, actor boundary, and verification while using progressive disclosure.

No private repository list, local path, account configuration, organization identity, raw record, or intake document is part of the public skill.

## Maintenance Boundaries

Keep the main skill under 500 lines and direct references one level deep. Add a runtime script only when repeated deterministic behavior has a stable input contract, report-only behavior, cross-platform tests, and a clear advantage over agent judgment.

Refresh `agent-capability-adapters.md` when hosts change skill paths, connector permissions, CLI publication, or access behavior. Revisit the core only when the goal, activation boundary, workflow, safety contract, feedback contract, or output contract changes.

Use the [threat model](THREAT-MODEL.md), [governance contract](GOVERNANCE.md), [maintenance health](MAINTENANCE.md), [decision classification](decisions/README.md), and [Program Decision 0003](decisions/0003-separate-delivery-from-outcome-evidence.md) when a change affects privileged tools, public output, feedback, portal handoff, recommendation independence, contribution quality, roadmap claims, or release identity.

Keep project scripts platform-neutral where Node.js provides the needed capability. Validation, checksum generation, and the dependency-free stored ZIP implementation use Node.js standard library APIs and do not depend on host archive commands or shell-specific path behavior.
