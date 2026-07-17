# Testing

## Test Strategy

The repository uses four layers:

1. Deterministic repository validation.
2. Agent Skills and plugin manifest validation.
3. Release archive inspection.
4. Scenario-based forward review against behavioral invariants.

Exact model wording is not a test contract. Activation, reasoning order, safety,
adaptation, and handoff behavior are.

## Deterministic Checks

Run:

```powershell
npm run validate
npm run package -- v1.0.0
```

The validator checks metadata, direct links, required maintenance files,
versions, manifests, release notes, workflow mode, Markdown structure, runtime
path leakage, placeholders, and the 500-line core limit.

The package audit must confirm:

- Three expected ZIP names.
- One correctly named skill folder per package.
- `SKILL.md` and six runtime references are byte-identical across packages.
- Plugin manifests use the release name and version.
- Maintenance fixtures are not installed as runtime content.
- No intake, bootstrap, docs, local paths, private source names, placeholders,
  credentials, or development caches appear.

## External Validators

Before release, validate:

- `src/` with the Agent Skills quick validator.
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

## Activation Review

`src/test-fixtures/activation.md` contains positive and negative prompts. Review
the frontmatter description for these boundaries:

- Activate for access, portfolio inventory, findability, routing,
  cross-repository coordination, lifecycle evidence, and tool fit.
- Activate for software and non-code repository work.
- Do not take over routine implementation inside one known repository.
- Do not expand into general productivity, personnel, or psychology advice.
- Do not accept destructive lifecycle conclusions based only on inactivity.

## Behavior Review

A static forward review on 2026-07-17 mapped each fixture to explicit runtime
instructions. It did not claim independent model execution.

| Scenario | Runtime evidence | Result |
|---|---|---|
| Writer with several repositories | Context calibration, purpose archetypes, current-system comparison | Pass |
| Research portfolio | Data provenance, mirrors, privacy, unknown lifecycle | Pass |
| Large solo portfolio | Intended versus observed access, stable identity, staged inventory | Pass |
| Beginner with no system | Plain-language minimal intervention and adoption ladder | Pass |
| Mature organization | Existing governance, concrete gap, ownership, and pilot | Pass |
| Conversation-only agent | Capability fallback and no fabricated inspection | Pass |
| Write-capable coding agent | Exact targets, local instructions, routing, and verification | Pass |
| Administrative or destructive request | Strong checkpoints, positive evidence, recovery, and publication separation | Pass |

The evidence lives in `src/SKILL.md` and the directly linked files under
`src/references/`. Any behavior change must update the affected fixture and this
review record or explain why the invariant no longer belongs.

## Cross-Host Boundary

Host paths and plugin manifests can be validated deterministically. Model
activation and response quality still vary by host and version. Reported
compatibility therefore means the package follows the portable format and the
workflow has a conversation-only fallback, not that every host produces
identical responses.
