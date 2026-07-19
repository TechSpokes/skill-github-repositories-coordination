# Version

Current version: `1.6.1`.

## Source of Truth

Release tags use:

```text
vX.Y.Z
```

The tag, `package.json`, both plugin manifests, the `CHANGELOG.md` heading, and `docs/releases/vX.Y.Z.md` must match.

## Compatibility Policy

- Patch releases correct guidance, docs, fixtures, validation, or packaging without intentionally changing the activation or output contract.
- Minor releases add backward-compatible workflows, references, fixtures, or optional capabilities.
- Major releases may change the activation boundary, core workflow, required inputs, safety contract, or output contract.

Host paths and preview features may change between skill releases. Their checked date belongs in `skills/coordinate-github-repositories/references/agent-capability-adapters.md`.

Roadmap phases do not determine versions. Outreach and evidence collection may need no release, while a phase that changes the backward-compatible runtime contract may justify a minor release.
