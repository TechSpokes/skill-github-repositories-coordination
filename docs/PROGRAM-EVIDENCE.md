# Program Evidence

## Purpose

Use these records to run the roadmap without turning attention, recruited praise, or maintainer judgment into false product evidence. Store only sanitized, consented, publishable information in the public repository.

Keep raw volunteer repository maps, account topology, local paths, private issue content, credentials, and contact details outside this repository. Do not create a durable participant profile unless the participant approves its fields, location, visibility, owner, and retention.

## Volunteer Trial Record

Record one trial per participant and portfolio shape:

```yaml
trial:
  id: ""
  phase_issue: ""
  portfolio_shape: solo | multi-org | non-code | mixed
  recruitment: founding | recruited | unsolicited | operational
  participant_relationship: ""
  consent_scope: ""
  skill_version: ""
  host_and_model: ""
  available_capabilities: []
  intended_outcome: ""
  sanitized_before: ""
  observed_result: ""
  previously_unknown_insight: ""
  participant_words_approved_for_publication: ""
  limitations: []
  privacy_review: pending
  reviewer: ""
  observed_at: ""
```

Use `previously_unknown_insight` only when the participant independently confirms it. Leave the field empty when the run was useful in another way.

Always disclose the participant's relationship to the skill. Never classify founding, recruited, builder, maintainer, or contributor evidence as an unsolicited outside signal.

## Feedback Observation

Initial feedback may contain only the factual observation. Add the other fields only when they are known and useful, and do not turn a low-friction observation into a required implementation plan.

```yaml
feedback_observation:
  observation: ""
  intended_outcome: ""
  impact_or_usefulness: ""
  expected_or_preferred: ""
  participant_relationship: ""
  skill_version: ""
  generalized_capabilities: []
  evidence: []
  hypothesis: ""
  confidence: ""
  privacy_review: ""
  consent_scope: ""
  related_links: []
  observed_at: ""
```

An observation may remain unprocessed until evidence or priority justifies triage. If it becomes work, enrich the canonical issue with scope, completion evidence, risks, and verification instead of requiring the original reporter to supply them.

## Case Study Record

Publish a case study only after explicit review of the exact text:

```yaml
case_study:
  id: ""
  source_trial: ""
  problem: ""
  work_context: ""
  bounded_evidence: []
  recommendation: ""
  no_change_option: ""
  outcome: ""
  lesson: ""
  limitations: []
  quotation_consent: ""
  identity_consent: anonymous | named
  privacy_reviewer: ""
  approved_at: ""
```

Explain one transferable practice in plain language. Do not present one participant's result as a universal promise.

## Launch Record

Use one record per channel and one summary for the coordinated launch:

```yaml
launch:
  id: ""
  release: ""
  channel: ""
  owner: ""
  audience: ""
  message_source: ""
  entry_gate_evidence: []
  open_security_findings: []
  evaluation_evidence: []
  install_path_checked_at: ""
  support_owner: ""
  community_rules_checked_at: ""
  consent_dependencies: []
  link_target: ""
  response_plan: ""
  correction_path: ""
  baseline_window: ""
  observation_window: ""
  durable_signals: []
  spike_signals: []
  limitations: []
```

Do not automate posting, evade community rules, duplicate the same message across unsuitable communities, or call recruited feedback unsolicited.

## Release Health Record

Use this record for release review and maintainer handoff. It records current evidence; it does not authorize publication.

```yaml
release_health:
  release: ""
  source_commit: ""
  release_owner: ""
  human_approver: ""
  deterministic_checks: []
  forward_review: []
  security_review: ""
  privacy_review: ""
  open_findings: []
  volatile_guidance_reviewed_at: ""
  volatile_guidance_owner: ""
  package_digests: []
  provenance: []
  support_readiness: ""
  correction_path: ""
  maintainer_coverage: []
  reviewed_at: ""
  next_review_trigger: ""
```

Do not mark maintainer coverage green when only one authorized person can complete the release. Keep technical releasability separate from the human decision to publish.

## Phase Review Record

Record delivery, evidence maturity, quality review, and bounded claims in the phase issue:

```yaml
phase_review:
  phase: ""
  issue: ""
  execution_status: planned | active | complete | deferred
  delivered_artifacts: []
  deferred_work: []
  outcome_evidence_level: none | founding | recruited | unsolicited | operational | mixed
  outcome_evidence: []
  claim_scope: ""
  architecture: green | red | unknown
  security: green | red | unknown
  evaluation: green | red | unknown
  teaching: green | red | unknown
  governance: green | red | unknown
  reviewer: ""
  decided_at: ""
  limitations: []
  next_action: ""
  review_trigger: ""
```

Unknown outcome evidence is valid and limits the claim rather than blocking unrelated delivery. A red quality result blocks the affected release or public action. Record accepted risk only with an accountable approver, reason, expiry or review trigger, and affected downstream work.

Historical `phase_gate` records remain valid evidence of the decision model used at the time. Do not rewrite them; use `phase_review` for new decisions.

## Baseline and Skill-Assisted Review

Use the registered cases under `tests/evals/`. Run a bare-agent response and a fresh skill-assisted response under comparable capability assumptions. Score both against the fixture invariants without expecting exact wording.

Record the raw sanitized outputs, model or host identity, observation date, reviewer, result, and limitations. Model review is evidence for the observed configuration, not proof that every host or future version behaves identically.
