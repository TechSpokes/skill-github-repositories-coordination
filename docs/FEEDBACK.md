# Feedback From Humans and Agents

## Fastest Path

Open the [skill-run feedback form](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/new?template=skill_run_feedback.yml) and state what happened. That is the only required answer.

Useful feedback may describe a successful outcome, unexpected behavior, confusing guidance, a missing case, an access fallback, or a repeated friction point. You do not need to diagnose the cause, design the fix, reproduce a one-time observation, or complete an environment inventory before submitting it.

## Choose the Right Route

- Use skill-run feedback for an observation from a real human or agent-assisted run.
- Use the bug form for a reproducible defect with an expected invariant.
- Use the improvement form when you already want to propose a change.
- Use Discussions for questions and public coordination patterns.
- Use [private security reporting](../SECURITY.md) for credential exposure, private repository disclosure, prompt injection that enables unsafe action, package compromise, permission escalation, or another sensitive finding.

## What Helps When It Is Easy to Provide

Optional context includes the intended outcome, impact or usefulness, expected behavior, frequency, skill version, generalized agent capabilities, sanitized evidence, a possible explanation marked as a hypothesis, and related issues.

Keep the observation factual before proposing the cause. A one-time observation can still be useful. Maintainers or explicitly delegated agents can search duplicates, ask targeted questions, and enrich an accepted observation into a self-contained task later.

## Agent-Prepared Feedback

An agent may notice reusable learning during verification or may be asked to report feedback. The agent should preserve the user's goal, separate observation from hypothesis, identify important unknowns, generalize capability context, search for an existing issue, and prepare the smallest useful public draft.

The agent must remove private repository identities, account topology, organization relationships, local paths, credentials, raw logs, private issue content, and restricted screenshots. It must show the user the exact public text and receive explicit approval before creating or commenting on an issue.

An agent never gains publication authority merely because it can access GitHub. If write access is absent or the user does not approve submission, return the draft and link instead.

Never submit feedback automatically. The form keeps privacy review separate from the observation and asks the submitting human or agent to confirm that the exact public issue contains no private information.

## Compact Draft Template

Only `Observation` is required. Delete empty optional sections instead of filling them with placeholders.

```markdown
## Observation

What happened in factual terms.

## Intended Outcome

Optional: what the person was trying to accomplish.

## Impact or Usefulness

Optional: why the observation matters or whether it repeated.

## Expected or Preferred Behavior

Optional: what would have helped.

## Sanitized Context and Evidence

Optional: version, generalized capabilities, safe reproduction, evidence, uncertainty, and related links.
```

## Maintainer Loop

Treat feedback as intake and learning evidence, not automatically as a bug, task, accepted solution, or product endorsement. Preserve participant relationship and consent, distinguish founding, recruited, unsolicited, and operational evidence, and avoid counting the same observation twice.

For accepted feedback, define the goal and completion evidence, route implementation to the owning artifact, add or update a fixture when behavior should persist, and promote the durable lesson into the skill, documentation, validation, or code. Close the loop on the issue with what changed, what remains unknown, and the release or review trigger.

## Research Basis

Read-only research across the founding portfolio's 340 canonical project records found dedicated feedback, instruction, and issue-intake concerns. The strongest existing portfolio pattern requires only a factual observation at intake, separates observation from hypothesis, keeps issues as the task surface, and promotes repeated learning into durable repository artifacts.

The supplied cross-intelligence research treats feedback as the last stage of a communication fidelity chain and recommends goal-first, explicit, progressively disclosed messages that survive bounded human and agent attention. This design therefore keeps intake minimal while allowing later agent enrichment.

GitHub's [issue-form syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms), reviewed on 2026-07-18, supports typed fields with selective validation. GitHub's [agent-task guidance](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results#making-sure-your-issues-are-well-scoped), reviewed on 2026-07-18, supports adding clear scope, acceptance criteria, relevant files, and tests when an observation becomes executable work rather than demanding those details at initial intake.

[Roadmap issue #18](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/18) records the research, readiness audit, recommendation, boundaries, and implementation evidence.
