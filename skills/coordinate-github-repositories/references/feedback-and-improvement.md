# Feedback and Improvement

## Goal

Turn useful outcomes and friction from real runs into maintainable improvements while keeping human effort, public disclosure, and duplicate administration low.

## When to Offer Feedback

Offer a feedback draft when the run reveals a reusable success, unexpected behavior, confusing instruction, missing case, access fallback, repeated workaround, or unsafe recommendation. Do not interrupt routine work for trivial commentary that cannot improve the skill.

## Low-Friction Contract

Only the factual observation requires a written answer. The user may provide one sentence, and the agent may derive a draft from the current run without asking the user to complete a form. A separate privacy confirmation verifies the exact public issue before submission.

Add intended outcome, impact, expected behavior, frequency, skill version, capability context, evidence, hypothesis, and related links only when they are known and useful. Never invent missing fields or turn intake into an implementation specification.

## Agent Workflow

1. Preserve the user's goal and the relevant before-and-after observation.
2. Separate observed facts from possible explanations and label uncertainty.
3. Remove private repository identities, account topology, organization relationships, local paths, credentials, raw logs, private issue content, and restricted screenshots.
4. Search the target repository for a matching issue when access exists, then update the canonical report instead of creating a duplicate when authorized.
5. Choose the skill-run feedback form for observations, the bug form for reproducible defects, the improvement form for proposed changes, Discussions for questions, or the private security route for sensitive findings.
6. Show the exact public title and body to the user and receive explicit approval before any issue or comment write.
7. Verify the created or updated record and report the link, or return a copyable draft when write access or approval is absent.

GitHub access does not grant publication authority. Never submit feedback automatically or describe an agent-prepared report as the user's words unless the user approves that exact text.

## Handoff to Maintainers

The initial issue is an observation, not an accepted task or diagnosis. Maintainers or explicitly delegated agents enrich accepted feedback with the smallest scope, completion evidence, affected fixtures, risk, and verification needed for implementation.

An accepted operational report that validates or extends runtime behavior must link an existing fixture or propose a new fixture case. This mapping is maintainer enrichment and does not add a required field for the reporter.

Promote durable learning into the runtime skill, a focused reference, documentation, validation, fixtures, or code. Keep issue status and decisions in GitHub rather than creating a second skill-owned backlog.

Use the source repository's canonical `feedback` label query to browse reports. Do not add a feedback-artifact directory unless several sanitized artifacts develop a distinct owner, audience, retention rule, or lifecycle that GitHub Issues and the owning product files cannot support.

## Evidence Classification

Record whether the participant is the builder, maintainer, contributor, recruited reviewer, unsolicited outside user, or an operational observer. Do not relabel founding or recruited feedback as unsolicited.

The public maintainer guide and form live in the source repository's `docs/FEEDBACK.md` and `.github/ISSUE_TEMPLATE/skill_run_feedback.yml`. If those surfaces are unavailable, return the sanitized draft to the user without weakening the privacy or approval boundary.
