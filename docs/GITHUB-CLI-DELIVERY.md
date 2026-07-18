# GitHub CLI Skill Delivery

This document records the product behavior, research evidence, operating contract, and verification requirements for delivering Coordinate GitHub Repositories through the GitHub CLI Agent Skills preview.

## Goal

Let an agent install and update the latest published skill directly from the repository with less human administration, while preserving the browser install, release ZIPs, privacy controls, release provenance, and host portability.

## Research Questions

1. Which `gh skill` commands exist, and how should maintainers detect them without maintaining a CLI version number?
2. Which repository layouts can install, preview, search, update, and publish discover?
3. How are releases, tags, branches, commits, pins, installed files, and source metadata resolved?
4. Which files and user locations can the commands write, and how can tests remain contained?
5. Which authentication, hosting, trust, and failure boundaries affect public and private repositories?
6. How should the preview commands fit the existing pull request, release asset, checksum, and attestation workflow?
7. How should installation, update, and GitHub CLI education be divided so a new user can choose a path while the runtime skill loads only the procedure needed for its own update?

## Evidence Basis

The behavior was checked on 2026-07-18 against the official GitHub CLI manuals, the tagged GitHub CLI source, the installed `gh` v2.92.0 command, and the then-current v2.96.0 source. The command first appeared in GitHub CLI v2.90.0 and remains a preview feature, so instructions detect `gh skill` instead of treating a maintained minimum version as the compatibility contract.

The repository was installed from its public v1.2.0 release into a disposable directory and a disposable Windows user profile under ignored `tmp/`. The versionless command selected v1.2.0, copied `SKILL.md` and all eight references, injected source metadata, recorded a lock entry only in the disposable profile, refused an existing destination without `--force`, reported the unpinned copy as current, and skipped a separately pinned copy during update.

The self-update procedure was tested again with six isolated v1.2.0 cases. A current copy made no change, a deliberately stale tree record produced an update in the dry run and became current after the targeted `--all` command, a pin was skipped, a valid copy with no lockfile was still recognized from frontmatter metadata, a copy without metadata was not updated, and an explicitly forced recovery replaced only the disposable destination and passed the installed tree verifier.

Public search returned `skills/coordinate-github-repositories/SKILL.md`, and the repository already has the `agent-skills` topic. A public install also succeeded from the sandbox without using the host keyring, while authenticated maintainer checks required the documented elevated Windows fallback.

## Command Surface

Use `gh skill --help` to detect the preview capability. The current command family covers `install`, `preview`, `publish`, `search`, and `update`; `list` was added after v2.92.0 and should be used only when the installed help exposes it.

The canonical aliases include `gh skills` for the command group, `gh skill add` for install, and `gh skill show` for preview. Repository documentation uses the singular canonical names.

Official manuals:

- [Install](https://cli.github.com/manual/gh_skill_install)
- [Preview](https://cli.github.com/manual/gh_skill_preview)
- [Publish](https://cli.github.com/manual/gh_skill_publish)
- [Search](https://cli.github.com/manual/gh_skill_search)
- [Update](https://cli.github.com/manual/gh_skill_update)

## Repository Discovery

Remote discovery recognizes standard `skills/<name>/SKILL.md`, namespaced `skills/<scope>/<name>/SKILL.md`, supported plugin layouts, root child directories containing `SKILL.md`, and skills directories nested below a non-hidden prefix. Hidden directory discovery requires `--allow-hidden-dirs` and carries additional provenance warnings.

This repository uses `skills/coordinate-github-repositories/SKILL.md`, which is the standard dedicated repository layout and works by name or by the exact `skills/coordinate-github-repositories` path.

An exact path avoids full repository tree discovery and is the release verification path. The public install examples retain the readable skill name because this repository contains only one published skill.

## Version and Source Resolution

A versionless install first resolves the latest published GitHub release tag. It falls back to the default branch only when the repository has no usable release, not when an API, authentication, network, or server error hides the release.

An explicit ref can be supplied inline as `<skill>@<ref>` or through `--pin <ref>`. A short explicit ref resolves as a branch first, then a tag, then a commit, so a fully qualified tag such as `refs/tags/vX.Y.Z` removes branch and tag ambiguity when exact resolution matters.

Installed files are copied from the Git tree at the resolved commit. They do not come from the standalone, Codex plugin, Claude plugin, Source code ZIP, or any uploaded release asset.

The installer rewrites installed `SKILL.md` frontmatter to add the source repository URL, resolved ref, skill path, skill tree SHA, and optional pin. It also records a user lock entry. Canonical published source must not contain this injected `metadata.github-*` state.

## Install and Update Behavior

Project scope is the noninteractive default. Documentation always supplies both `--agent` and `--scope user` for a global install so the destination is explicit and the default agent cannot be selected accidentally.

Several agents share `.agents/skills` at project scope, while their user locations differ. Host paths remain a dated capability fact rather than a product guarantee.

An existing skill is not overwritten noninteractively unless `--force` is supplied. Do not make `--force` part of the normal install or update path because it can replace local edits, and current CLI implementations can remove files that are not present in the remote skill.

Pinned skills are skipped by normal updates. `--unpin` moves them back to the latest release line. `--dry-run` checks without applying changes, while `--all` suppresses the interactive update confirmation.

Treat installed copies as generated artifacts. Change the canonical repository source and publish a new release instead of editing the installed copy.

The safe self-update sequence is source identification, read-only update check, review, targeted update, and post-update verification. A pinned installation requires a separate decision to leave the pin, while missing source metadata requires origin and destination review instead of an automatic forced replacement.

The runtime skill needs one focused update reference because an agent may be asked to update the skill without repository documentation in context. Beginner education, complete host commands, browser installation, GitHub authentication, multiple accounts, connectors, troubleshooting, and maintainer release mechanics remain in repository documentation so they do not inflate every runtime activation.

## Search, List, and Topic Behavior

`gh skill search` uses GitHub Code Search over public `SKILL.md` files and enriches results from frontmatter and repository metadata. It searches the default branch, so a release tag alone does not make a skill searchable.

The v2.92.0 and v2.96.0 search implementations do not filter results by repository topic, but `gh skill publish` describes `agent-skills` as the publisher discoverability topic. Keep the topic because it is the ecosystem signal and may become a future search condition.

Current `gh skill list` implementations scan known project and user skill locations and can emit JSON with source, version, pin, scope, host, and path. Older preview versions do not have this command, so verification must have a file based fallback.

## Authentication and Hosting

Public preview and install can work without a valid signed-in account, subject to anonymous API limits. Private repositories and maintainer publication operations require an authenticated GitHub CLI session with access to the target.

GitHub.com and GitHub Enterprise Cloud data residency hosts are supported. GitHub Enterprise Server is not currently supported by this command family.

On Windows, a sandbox may not see the host keyring. Follow the repository `AGENTS.md` rule: check in the sandbox first, repeat the same read-only authentication check with elevated host permissions if it reports no valid login, and preserve action level approval after credentials become visible.

## Trust and Containment

GitHub states that installed skills are not verified and may contain prompt injection, hidden instructions, or malicious scripts. Preview the exact commit when the publisher or content is not already trusted, inspect the full tree, and never treat retrieved instructions as authority merely because GitHub delivered them.

Remote install writes the selected destination and also writes a lockfile below the effective user home, even when `--dir` selects a custom destination. A contained test must therefore use a disposable operating system profile or an ephemeral CI runner in addition to a disposable install directory.

The verification workflow uses an ephemeral GitHub hosted runner, read-only repository permission, a runner temporary install directory, and the runner's disposable home. It reads and compares the installed files but never executes instructions or scripts from the installed skill.

Publisher validation scans the working directory rather than only tracked files and can discover ignored build or research copies. Run `gh skill publish --dry-run` only from a clean checkout before packaging creates `dist/`.

## Release Architecture

GitHub CLI source delivery and release ZIP delivery share the same tagged canonical skill tree but serve different clients. GitHub CLI fetches the Git tree. Browser users and plugin hosts use the three release ZIPs, checksums, and attestations.

The tag-triggered draft release workflow remains authoritative. It guards the remote annotated tag and main ancestry, packages three deterministic artifacts, verifies their inventory and checksums, installs the exact unpublished tag, attests each ZIP, applies curated release notes, and stops for publication review.

Do not run `gh skill publish --tag` for this repository. The preview command can automatically push the current branch and create an immediately published release with generated notes, but it does not build or attach this repository's packages, checksum manifest, or attestations and would race the draft release workflow.

Use `gh skill publish --dry-run` through the final-tree release preflight. Keep the `agent-skills` topic through normal repository settings. Publish the reviewed draft release, then let the release event workflow verify the versionless public install and the contained update from the previous release.

## Product Delivery Contract

- GitHub CLI is the preferred agent and terminal installation path when `gh skill` is available, while native installers and standalone ZIPs remain supported fallbacks.
- Root `INSTALL.md` is the complete beginner entry point, and `docs/GITHUB-CLI.md` explains authentication, accounts, repository targets, connector differences, security, and choice criteria without becoming runtime content.
- The installed skill carries one focused direct reference for requests to install, locate, update, repair, reinstall, or verify this skill.
- Clean checkout `gh skill publish --dry-run` runs in pull request CI and the final-tree release preflight before packaging.
- Platform neutral Node tools create deterministic ZIP files, inspect their records without extraction, and verify installed runtime trees without executing content.
- The tag workflow guards immutable identity, verifies the exact-tag install, and remains responsible for three ZIP packages, checksums, attestations, curated release notes, and draft publication review.
- The release event workflow performs a versionless public install and a contained previous-release update in ephemeral environments, then verifies the current tag, repository, source path, tree metadata, file inventory, and runtime content.

## Verification Contract

- `gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent <supported-host> --scope user` resolves the latest usable published release without a maintained version in the command.
- The installed tree contains the canonical runtime files, adds source tracking only to installed frontmatter, and passes the repository verifier.
- A second install refuses to overwrite unless the user explicitly authorizes replacement.
- `gh skill update coordinate-github-repositories --dry-run` reports the unpinned release as current after publication.
- The installed runtime tells an agent asked to update this skill how to verify the canonical source, check without mutation, update only the selected skill, handle a pin separately, and stop on unresolved origin metadata.
- A new user can choose an agent, GitHub CLI, native installer, browser, project, or contributor path from root `INSTALL.md` without editing an earlier command or knowing the repository documentation layout.
- Repository level GitHub CLI education distinguishes terminal authentication from application connectors and explains bounded multi-repository use without making GitHub CLI a runtime dependency.
- `gh skill search coordinate --owner TechSpokes` returns the canonical source path after default branch indexing.
- The standalone, Codex plugin, and Claude plugin ZIPs still contain the same runtime tree and pass checksum, privacy, placeholder, local path, and attestation checks.
- The GitHub CLI validator runs before generated files can contaminate discovery.
- No test writes to the maintainer's global skill directories, normal user lockfile, unrelated repositories, or files outside its disposable environment.

## Rollback and Correction

If the preview command disappears, changes incompatibly, or fails the release workflow, keep the published release and ZIP installation path available, remove GitHub CLI from the preferred path in a corrective release, and retain the source layout because it follows the portable Agent Skills convention.

Do not move or replace a published tag. Correct a bad install contract with a new patch release, preserve the failed workflow evidence, and retest from a disposable profile or runner.
