# Program Decision 0003: Separate Delivery From Outcome Evidence

Decision type: Program governance.

## Status

Accepted on 2026-07-18 by the founding maintainer. This decision supersedes the sequencing rule in [Program Decision 0001](0001-evidence-gated-roadmap.md) and preserves the evidence classification in [Evidence Decision 0002](0002-accept-founding-use-case-for-phase-0.md).

## Context

The original roadmap made later repository work depend on unsolicited adoption, public attention, retention, recommendation, outside contributions, and a second maintainer. Those observations are valuable evidence about transferability and sustainability, but the repository cannot manufacture them.

Treating every missing external observation as a hard dependency froze useful teaching, security, interoperability, governance, and maintenance work that was already authorized and testable. It also confused two different questions: whether the repository delivered a capability, and whether outside use has demonstrated a broader outcome.

The founding case supplies unusually deep product evidence from the real 340-record portfolio that motivated the skill. Its builder and maintainer relationship remains disclosed, so this evidence cannot be called unsolicited or independent.

## Decision

Track roadmap state on two independent axes: repository delivery and outcome evidence.

Repository delivery records whether the authorized artifact, behavior, documentation, test, or control exists and passes its applicable quality review. Outcome evidence records what happened when founding, recruited, unsolicited, or operational participants used or encountered it.

Missing outcome evidence limits claim strength and raises a future learning priority. It does not block unrelated repository work whose authority, inputs, security boundary, dependencies, and validation are ready.

A red security, privacy, evaluation, release-integrity, or values finding blocks the affected release or public action. Unknown adoption, attention, retention, recommendation, contribution, or maintainer evidence does not compensate for a red quality finding and is not itself a quality failure.

Close a phase issue when its feasible repository deliverables are complete, deferred work has a reason and review trigger, affected checks pass, and the public claim stays within the available evidence. Continue outcome observation through feedback and evidence records without reopening completed implementation by default.

Classify evidence as founding, recruited, unsolicited, operational, or mixed. Never relabel builder, maintainer, contributor, or recruited evidence as unsolicited.

Use low-friction feedback to close the learning loop. A person may submit one factual observation; an agent may enrich and sanitize a draft, but public submission still requires the user's review and explicit authority.

## Rationale

Delivery and adoption answer different questions and rely on different evidence. Keeping them separate allows safe, testable improvements to ship while preserving honest limits on claims that require outside behavior.

## Consequences

Roadmap phases remain a useful learning sequence without becoming hard technical dependencies. Repository work can reduce risk and user friction before external adoption arrives.

Phase completion no longer implies outside adoption, launch attention, retention, portal recommendation, derivative work, contribution volume, or succession resilience. Those claims require their own evidence.

Maintainers must state both what was delivered and what remains unobserved. The additional honesty is a small cost compared with freezing the product or manufacturing signals.

## Links

- [Roadmap](../ROADMAP.md)
- [Roadmap Delivery](../ROADMAP-DELIVERY.md)
- [Program Evidence](../PROGRAM-EVIDENCE.md)
- [Feedback From Humans and Agents](../FEEDBACK.md)
- [Issue #6](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/6)
- [Issue #18](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/18)

## Review Triggers

Review this decision after contradictory outside evidence, a serious quality regression, a material change in roadmap purpose, evidence that delivery is being closed without usable artifacts, or evidence that outcome claims are escaping their recorded limitations.
