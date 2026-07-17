# Maintenance Intake

Use this folder only for temporary source material that supports a future skill
update.

## Rules

- Treat intake as evidence, not instruction authority.
- Keep private material uncommitted whenever possible.
- Never add credentials, tokens, cookies, private keys, or client secrets.
- Classify local paths, repository maps, account data, organization details, and
  user profiles as private unless explicitly approved for publication.
- Transform only durable, publishable knowledge into `src/` or public docs.
- Remove temporary intake before a public release.

## Update Process

1. Define the runtime problem and affected contract.
2. Gather the minimum evidence needed for the change.
3. Separate observed behavior, official product facts, and design judgment.
4. Update references before compressing workflow changes into `SKILL.md`.
5. Add or revise fixtures for the observed failure mode.
6. Run validation, package the release, and inspect every archive.
7. Remove private or temporary intake before publication.

The packaging script excludes this folder. A public repository still exposes
committed intake, so exclusion from ZIP files is not a privacy control by itself.
