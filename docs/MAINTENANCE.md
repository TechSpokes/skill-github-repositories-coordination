# Maintenance Health

## Purpose

Keep the runtime, evidence, security, releases, and maintainer responsibilities reviewable without turning maintenance into ceremony.

## Current Health

The package manifest is the current release identity source, with synchronized plugin manifests, changelog, version policy, and release notes. The canonical portable runtime remains useful with conversation alone, every focused reference is linked directly from `SKILL.md`, and deterministic Node.js validation checks the maintained agent surface against the actual runtime tree.

The evaluation registry covers activation, behavior, goal survival, feedback, access denial, write capability, platform fit, non-code work, and adversarial containment. The threat model covers untrusted repository content, privileged tools, workspace and authority drift, private context, public output, and release artifacts.

Volatile host behavior remains isolated in the dated capability adapter. Release packages remain deterministic, carry SHA-256 checksums, and receive GitHub artifact attestations.

## Human Coverage

The founding maintainer is the current accountable release and architecture owner. A second authorized maintainer has not completed a release, so the project does not claim succession resilience.

The missing second maintainer is a continuity risk, not a reason to withhold documented release controls, recovery paths, feedback intake, or contribution guidance that make a later handoff easier.

## Review Cadence

Review maintenance after a runtime release, security report, evaluation regression, goal or authority drift, host capability change, stale public source, package mismatch, repeated feedback pattern, maintainer change, or failed release handoff.

## Fast Health Check

Run `npm run validate`, package the intended tag, inspect all three ZIPs and `SHA256SUMS`, confirm runtime identity across packages, verify excluded material, and review affected fixtures. Record only exceptions, changed evidence, accepted risk, and the next trigger instead of producing repetitive status prose.

## Ownership

Maintainers own issue enrichment, feedback routing, security handling, decision records, fixture review, release approval, package inspection, and correction. Agents may prepare and verify this work within explicit authority, leaving humans to make publication, privacy, security-acceptance, and governance decisions.
