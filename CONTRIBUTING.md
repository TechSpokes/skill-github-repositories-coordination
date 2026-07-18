# Contributing

Thank you for improving Coordinate GitHub Repositories.

## Contribution Goal

Contributions should make repository coordination more adaptive, portable,
evidence-based, or safe without turning the skill into a mandatory taxonomy,
tool, connector, or manager application.

Useful contributions include:

- Clearer activation or non-activation boundaries.
- Better handling for documentation, writing, research, data, operations, or
  mixed portfolios.
- Evidence-backed coordination and inventory patterns.
- Updated official host or GitHub behavior.
- Safety, privacy, permission, lifecycle, or recovery improvements.
- Behavioral fixtures that expose a real failure mode.
- Validation, packaging, installation, or release improvements.

## Before a Pull Request

Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and `docs/GOVERNANCE.md`. For runtime
changes, read the affected references and all test fixtures.

Run:

```shell
npm run validate
npm run package -- vX.Y.Z
```

Use the intended version when preparing a release. Inspect all generated ZIP
files and compare their digests with `dist/assets/SHA256SUMS`.

## Definition of Done

Use the complete definition of done and five-track review rubric in
[Governance](docs/GOVERNANCE.md). Every change must preserve applicable
architecture, security, evaluation, teaching, governance, privacy, portability,
and release contracts.

Register new activation, behavior, or adversarial cases in
`tests/evals/cases.json`. Run `npm run test:eval` when fixture or runtime
behavior changes.

## Pull Request Content

Explain:

- The observed problem.
- The affected activation, workflow, safety, output, or packaging contract.
- Why the change preserves adaptation and portability.
- Which fixtures changed or still pass.
- Commands and manual checks used for validation.
- Product facts that need a source date or future refresh.
- Affected roadmap phase, threat, evaluation case, decision, and release links.

## Source and Privacy Rules

Use primary sources for current product behavior. Distinguish working evidence
from proposals. Do not include private repository lists, local paths, account
configuration, user profiles, client information, credentials, or raw intake.

## Documentation Style

Use one H1, real heading levels, short paragraphs, flat atomic lists, ASCII
technical punctuation, and language-tagged code fences. Explain rationale where
future maintainers need judgment rather than copying long research into runtime
files.
