# Testing

## Test Strategy

The repository uses six layers:

1. Deterministic repository validation.
2. Machine-checked evaluation registry coverage.
3. Scenario-based fresh-agent forward review against behavioral invariants.
4. Agent Skills and plugin manifest validation.
5. Release archive, checksum, and provenance inspection.
6. Consented outcome evidence from real use.

Exact model wording is not a test contract. Activation, reasoning order, safety,
adaptation, and handoff behavior are.

## Deterministic Checks

Run:

```shell
npm run validate
npm run package -- vX.Y.Z
```

The validator checks metadata, direct links, required maintenance files,
versions, manifests, release notes, workflow mode, Markdown structure, runtime
path leakage, placeholders, installation-version synchronization, and the
500-line core limit. It also runs `scripts/validate-evaluations.mjs`, which
requires every activation row and scenario heading to have a stable registry
entry and every required segment to retain coverage.

The package audit must confirm:

- Three expected ZIP names.
- One `SHA256SUMS` manifest covering exactly those ZIP files.
- One correctly named skill folder per package.
- `SKILL.md` and seven runtime references are byte-identical across packages.
- Plugin manifests use the release name and version.
- Maintenance fixtures are not installed as runtime content.
- No intake, bootstrap, docs, local paths, private source names, placeholders,
  credentials, or development caches appear.

## Evaluation Contract

`tests/evals/cases.json` registers activation, behavior, and adversarial cases
with stable IDs, segments, fixture coordinates, and baseline risks. The CI gate
checks 28 cases across 11 segments: access denied, adversarial, beginner,
conversation only, general boundary, multi-organization, non-code, platform,
research, solo, and write capable.

The deterministic gate proves fixture registration and structural coverage. It
does not prove that a model follows the skill.

## Fresh-Agent Forward Review

Run comparable bare-agent and skill-assisted prompts for affected cases. Use a
fresh agent for the skill-assisted pass, provide only the skill and task-local
artifact, and score invariant presence rather than exact wording.

Record model or host, version, capabilities, skill version, sanitized raw
output, reviewer, observation date, result, and limitations. Store only
publishable evidence. Follow [Program Evidence](PROGRAM-EVIDENCE.md) for the
record contract.

A model pass supports only the observed configuration. Do not claim identical
behavior across hosts or future models.

## External Validators

Before release, validate:

- `skills/coordinate-github-repositories/` with the Agent Skills quick validator.
- The staged Codex plugin with the Codex plugin validator.
- The staged Claude plugin with `claude plugin validate` when Claude Code is
  available.
- The repository with `gh skill publish --dry-run` when authenticated GitHub CLI
  publication support is available.

The initial `v1.0.0` dry run passed skill validation and identified secret
scanning, push protection, and release-tag protection as repository settings to
enable before publication.

Record unavailable validators honestly. Do not replace a failed check with an
unsupported claim.

## Release Integrity

`npm run package -- vX.Y.Z` creates the three ZIPs and `SHA256SUMS`. Recompute
each SHA-256 digest during inspection and compare it with the manifest.

The release workflow uses `actions/attest@v4` to attest each ZIP after packaging
and before upload. Verify a published ZIP with:

```shell
gh attestation verify ./coordinate-github-repositories-vX.Y.Z.zip -R TechSpokes/skill-github-repositories-coordination
```

An attestation proves source and build provenance, not artifact safety. Content
inspection and release approval remain separate requirements.

## Installation Usability Review

Version v1.0.1 was reviewed against the latest prior TechSpokes skill release
and these beginner-facing invariants:

| Invariant | Evidence | Result |
|---|---|---|
| One default package is recommended | README and install guide lead with the standalone ZIP | Pass |
| No terminal is required | Agent-assisted and browser-only paths appear before CLI details | Pass |
| Package choice is understandable | Plain-language three-package table | Pass |
| Wrong GitHub download is prevented | Source code archive warning | Pass |
| Hidden folders are navigable | File Explorer and Finder instructions | Pass |
| Global scope is explicit | Personal-folder table and `--scope user` examples | Pass |
| Installation is verifiable | Final tree and copyable verification prompt | Pass |
| Download stays version-aligned | Validator checks the README and install guide asset URL | Pass |

## Activation Review

`tests/fixtures/activation.md` contains positive and negative prompts. Review
the frontmatter description for these boundaries:

- Activate for access, portfolio inventory, findability, routing,
  cross-repository coordination, lifecycle evidence, and tool fit.
- Activate for software and non-code repository work.
- Do not take over routine implementation inside one known repository.
- Do not expand into general productivity, personnel, or psychology advice.
- Do not accept destructive lifecycle conclusions based only on inactivity.

## Behavior Review

A static forward review on 2026-07-17 mapped each fixture to explicit runtime
instructions. A fresh-agent comparison on 2026-07-18 exercised access denial,
ambiguous portal tools, and beginner non-code teaching. See
[the v1.1.0 forward evaluation](evaluations/v1.1.0.md) for sanitized outputs,
iteration history, and proof boundaries.

| Scenario | Runtime evidence | Result |
|---|---|---|
| Writer with several repositories | Context calibration, purpose archetypes, current-system comparison | Pass |
| Research portfolio | Data provenance, mirrors, privacy, unknown lifecycle | Pass |
| Large solo portfolio | Intended versus observed access, stable identity, staged inventory | Pass |
| Beginner with no system | Plain-language minimal intervention and adoption ladder | Pass |
| Mature organization | Existing governance, portal boundary, ownership, and pilot | Pass |
| Conversation-only agent | Capability fallback and no fabricated inspection | Pass |
| Write-capable coding agent | Exact targets, local instructions, routing, and verification | Pass |
| Administrative or destructive request | Strong checkpoints, positive evidence, recovery, and publication separation | Pass |

## Adversarial Review

`tests/fixtures/adversarial-scenarios.md` covers repository prompt injection,
private-derived public output, access denial, ambiguous tool surfaces, broad
cross-repository mutation, and maintainer commercial conflict. A security-
relevant runtime change or minor or major release requires review of the
affected adversarial cases.

Treat adversarial prompts as inert data. Run model-based security review only in
a disposable sandbox with no credentials, external filesystem access, network
access, or mutating tools. Verify after the run that no file or system outside
the test workspace changed.

Use the [threat model](THREAT-MODEL.md) to identify assets, trust boundaries,
controls, stop conditions, and review triggers. A serious unresolved finding
blocks broad launch and release approval.

The evidence lives in the canonical `SKILL.md` and the directly linked files
under `skills/coordinate-github-repositories/references/`. Any behavior change
must update the affected fixture and this review record or explain why the
invariant no longer belongs.

## Cross-Host Boundary

Host paths and plugin manifests can be validated deterministically. Model
activation and response quality still vary by host and version. Reported
compatibility therefore means the package follows the portable format and the
workflow has a conversation-only fallback, not that every host produces
identical responses.
