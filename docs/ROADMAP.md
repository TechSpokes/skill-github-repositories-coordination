# Roadmap

## Purpose

This living roadmap states the current product outcomes and the rules used to select work after the founding phase program finished. GitHub issues and pull requests are the canonical delivery state; this document does not copy their task status.

Last reviewed: `2026-07-19`.

Owner: repository maintainers.

## Product Goal

Help people and agents preserve and reuse repository-centered value with less human administration while maintaining a portable, trustworthy, free, and maintainable skill that respects authority, privacy, evidence integrity, ownership, and existing workflows.

## Current Outcome Priorities

The priorities are ordered. A lower priority may move first when it addresses an urgent quality risk or when the higher priority lacks evidence, authority, or an implementation owner.

### 1. Establish Transferability Through Real Use

Learn whether people beyond the founding maintainer can reach useful outcomes across software, documentation, writing, research, data, operations, and mixed work. Prefer observations from real runs, preserve participant relationships, and improve the product without presenting recruited or founding evidence as unsolicited adoption.

### 2. Improve Value Preservation and Reuse

Reduce the effort required to find, understand, apply, and preserve useful functionality, knowledge, practices, and relationships across repositories. Prioritize observed gaps that the portable reasoning layer can solve without imposing a taxonomy, persistent profile, graph, connector, portal, or manager application.

### 3. Maintain Trust Across Hosts and Releases

Keep conversation-only usefulness, least privilege, privacy, untrusted-content handling, evaluation coverage, package identity, installation paths, and recovery healthy as agent hosts and GitHub capabilities change. Treat a red security, privacy, evaluation, release-integrity, or values result as a blocker for the affected release or public action.

### 4. Reduce Maintenance and Continuity Risk

Keep decisions, tests, documentation, release controls, support routes, and ownership understandable enough for another qualified maintainer to review and operate. Simplify recurring work before adding automation, and do not claim succession resilience until at least two authorized maintainers can perform the release process.

## Work Selection

Candidate work may come from a real run, a sanitized feedback observation, a security report, an evaluation failure, a host change, a release failure, a maintainer review, or outcome evidence. An observation is not automatically an accepted task.

Compare each candidate with the current system and no change. Rank it by expected user benefit, evidence quality, affected risk, frequency, reach across work types, urgency, reversibility, maintenance burden, dependency readiness, and available ownership.

Accept work only when the target, authority, source, privacy boundary, security impact, dependencies, completion evidence, and owner are clear enough for the proposed change. Record accepted work in a GitHub issue and route implementation through a pull request.

Use the repository's [open issues](https://github.com/TechSpokes/skill-github-repositories-coordination/issues?q=is%3Aissue%20state%3Aopen) for current work. An empty issue list may mean that no candidate is ready; it does not justify inventing work or weakening evidence.

## Evidence and Claim Boundary

Repository delivery and outcome evidence remain separate under [Program Decision 0003](decisions/0003-separate-delivery-from-outcome-evidence.md). Missing external adoption evidence limits claims. It does not block unrelated repository work whose authority, inputs, safety boundary, dependencies, and validation are ready.

Classify outcome evidence as founding, recruited, unsolicited, operational, or mixed. Record publishable observations through [Program Evidence](PROGRAM-EVIDENCE.md), and use [Feedback From Humans and Agents](FEEDBACK.md) for low-friction intake. Neither surface grants publication authority or promotes an observation into accepted work.

Quality evidence and outcome evidence cannot substitute for each other. A passing validator does not prove user benefit, and an adoption signal does not excuse a security, privacy, evaluation, or release-integrity regression.

## Historical Program

Issue [#6](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/6) and phase issues #7 through #13 delivered the founding seven-phase program. The [Founding Roadmap Delivery Record](ROADMAP-DELIVERY.md) preserves what the repository delivered and which external outcomes remained unproven.

The completed phase program is evidence and history, not the active backlog. [Program Decision 0006](decisions/0006-maintain-a-living-outcome-led-roadmap.md) records the transition to this living outcome-led model.

## Review and Recovery

Review this roadmap when evidence changes a priority, accepted work does not map to an outcome, open issues repeatedly drift from the stated direction, a serious quality finding appears, a material host or maintainer change occurs, or the selection model creates unnecessary administration.

Review the roadmap during every minor or major release that changes product direction or the maintainer workflow. Change the review date only after reassessing the priorities, selection rules, evidence boundary, ownership, and historical links.

Preserve issue, decision, and release history when direction changes. Use a new decision record when the selection model or evidence boundary changes materially; use an ordinary roadmap edit when evidence changes priority without changing the durable model. Git history and the founding delivery record provide recovery if a revision loses necessary context.
