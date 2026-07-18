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
  recruitment: recruited | unsolicited
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

Use this record for release review and maintainer handoff. It records current
evidence; it does not authorize publication.

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

Do not mark maintainer coverage green when only one authorized person can
complete the release. Keep technical releasability separate from the human
decision to publish.

## Phase Gate Record

Record gate decisions in the phase issue:

```yaml
phase_gate:
  phase: ""
  issue: ""
  product_gate: pass | fail | unknown
  product_evidence: []
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

Unknown is a valid result and blocks phase advancement. Record accepted risk only with an accountable approver, reason, expiry or review trigger, and affected downstream work.

## Baseline and Skill-Assisted Review

Use the registered cases under `tests/evals/`. Run a bare-agent response and a fresh skill-assisted response under comparable capability assumptions. Score both against the fixture invariants without expecting exact wording.

Record the raw sanitized outputs, model or host identity, observation date, reviewer, result, and limitations. Model review is evidence for the observed configuration, not proof that every host or future version behaves identically.
