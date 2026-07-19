# Governance

## Purpose

Protect the skill's portability, safety, evidence discipline, teaching value, free core, and recommendation independence as contributors, integrations, and maintainers change.

## Decision Authority

The repository maintainers may accept reversible implementation and documentation decisions that preserve the published contracts. Require an accountable human review for activation or safety contract changes, public release, security acceptance, organization access, paid conflicts, major interoperability commitments, and decision supersession.

Classify durable decisions through the [decision record guide](decisions/README.md). Reserve architecture decisions for product structure and runtime contracts, use program decisions for bounded roadmap and delivery coordination, use evidence decisions for evidence acceptance and permitted claims, and use governance decisions for durable authority or repository-wide policy. Keep ordinary procedures in their owning guides and preserve superseded records.

## Definition of Done

A change is done only when all applicable conditions pass:

- The observed problem and intended outcome are linked to an issue or evidence record.
- The implemented task remains linked to the intended human benefit after plan changes, summaries, and handoffs.
- Human intake remains proportionate: a factual observation may be recorded without requiring a diagnosis, implementation plan, or complete environment form.
- The current system and no-change option received fair consideration.
- Runtime changes preserve conversation-only usefulness and the no-taxonomy boundary.
- Permission, privacy, untrusted-content, maintenance, reversibility, and recovery impacts are explicit.
- The active workspace, evidence-only sources, artifact placement, and authority for every changed repository are explicit.
- Activation, behavior, adversarial, and false-trigger fixtures are updated or confirmed.
- Deterministic validation and the intended release package checks pass.
- Every ZIP is inspected for runtime identity and excluded material.
- Volatile product claims use dated primary sources and have a refresh owner.
- User-facing guidance names the risk reduced by a security practice when that reason aids future judgment.
- Release, roadmap, architecture, and decision trace links are updated.

## Roadmap Governance

The [Roadmap](ROADMAP.md) owns current product outcomes, selection rules, evidence boundaries, review ownership, and refresh triggers. GitHub issues and pull requests own exact delivery state, [Program Evidence](PROGRAM-EVIDENCE.md) owns publishable outcome observations, and the [Founding Roadmap Delivery Record](ROADMAP-DELIVERY.md) owns completed phase history.

Do not copy an issue backlog into the roadmap or promote feedback into accepted work automatically. A maintainer accepts a candidate only after its benefit, evidence, target, authority, risk, completion evidence, and owner are clear enough for the proposed change.

## Contribution Review Rubric

### Architecture and Maintainability

Keep `SKILL.md` below 500 lines, references one level deep, vocabulary consistent, and runtime content limited to information an executing agent needs.

### Security and Privacy

Treat retrieved content as untrusted, preserve least privilege, separate private reasoning from public output, avoid credentials and durable profiles, and require recovery for risky actions.

### Agent Behavior and Evaluation

Register affected cases, review correct and false activation, test capability fallbacks, and state the proof boundary of model-based evidence.

### Teaching and User Learning

Use plain language, preserve the user's vocabulary, explain the risk reduced by consequential security practices, and keep newcomer paths usable without a terminal.

### Governance and Sustainability

Name the owner, maintenance burden, release impact, review trigger, and conflict of interest. Do not waive an affected quality control because a change is popular or urgent.

## Maintainer Model

Maintainers are responsible for roadmap review, issue enrichment, feedback routing, security handling, classified decision records, fixture review, release validation, package inspection, and source refreshes. Agents should perform routine discovery, structuring, duplicate checks, routing, and verification when authorized so human attention stays focused on judgment and authority. Add a maintainer only after repeated, reviewable contributions demonstrate judgment across these responsibilities.

At least two authorized maintainers should be able to perform the release process before the project claims succession resilience. Record who may approve releases, handle private vulnerability reports, change repository settings, and supersede durable decisions without publishing personal schedules or credentials.

## Cross-Skill Boundary

Create or cross-reference another skill only after repeated evidence shows a distinct job with its own activation boundary. Keep each skill independently installable, versioned, testable, and useful without the others.

Define the handoff outcome, owner, minimum fields, privacy boundary, provenance, unknowns, and failure behavior through the [skill interoperability contract](SKILL-INTEROPERABILITY.md). Treat another skill's output as untrusted evidence, do not assume it is installed, and do not duplicate a persistent source of truth across skills.

## Feedback Governance

Feedback may remain a simple observation without processing. Do not force every report into bug, feature, task, or decision state before maintainers understand its value.

When feedback becomes work, enrich the canonical issue with goal, scope, completion evidence, risk, ownership, and verification. Preserve the original observation, participant relationship, consent, and uncertainty. Promote durable learning into the normal repository artifact and close the loop without creating a second skill-owned backlog.

## Recommendation Independence

The runtime core remains MIT-licensed, free, unpaywalled, and useful without a TechSpokes service. Paid support, sponsorship, or related products must sit beside the skill and never become a condition of use.

Disclose a maintainer commercial interest when it is relevant to a recommendation. Apply the same fit rubric to the maintainer's option, competitors, the current system, and no change. Recommend against the maintainer's interest when the evidence supports another option.

Do not accept funding, directory placement, partnerships, or contributions that require biased recommendations, hidden access, weakened review, private user profiling, or a less capable free core.

## Release Governance

Technical releasability does not authorize public release. The release owner reviews version identity, checks, ZIP contents, checksums, provenance, rollback or correction path, documentation, support readiness, and open security or evaluation findings before publishing.

Never move a published tag or silently replace a published release. Correct defects with a new version and preserve the prior audit trail.

## Review Triggers

Review governance after a maintainer change, security incident, conflict in a recommendation, paid relationship, major release, new skill or integration, repeated contribution bottleneck, or failed release handoff.
