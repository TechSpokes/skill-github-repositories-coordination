# Releasing

## Change Workflow

Changes reach `main` through a pull request:

1. Create a branch from current `main`.
2. Update the skill, references, fixtures, docs, and manifests coherently.
3. Run `npm run validate`.
4. Run `npm run package -- vX.Y.Z` when packaging or release content changes.
5. Run `npm run release:verify-assets -- vX.Y.Z` and inspect the generated archives when packaging behavior, runtime content, or privacy boundaries change.
6. Review the deterministic archive checksums in `dist/assets/SHA256SUMS`.
7. Review threat, evaluation, governance, and roadmap quality impact.
8. Push the branch and open a pull request.
9. Wait for `Validate skill package`, resolve actionable failures or conversations, and squash-merge.

Do not push directly to `main`. Pull request CI runs once for the pull request and remains manually dispatchable; it does not repeat on the resulting `main` commit.

## Release Preparation

For version `X.Y.Z`:

1. Set `X.Y.Z` in `package.json` and both plugin manifests.
2. Add `## [vX.Y.Z]` to `CHANGELOG.md`.
3. Add `docs/releases/vX.Y.Z.md`.
4. Update `docs/VERSION.md` and user-facing install examples.
5. Review affected activation, behavior, adversarial, documentation, and release invariants.
6. On the final uncommitted release tree, run the single release preflight.

```shell
npm run release:preflight -- vX.Y.Z
```

The preflight validates synchronized release identity, confirms that the tag and release are unused, runs the repository validator, removes only generated `dist/` before `gh skill publish --dry-run`, builds and inspects all three archives twice, requires identical checksums, and fails if any tracked or nonignored untracked file changes while it runs. It emits digests for the complete candidate tree and checksum manifest.

7. Review the three ZIP inventories and `SHA256SUMS`, then commit the exact validated tree without editing it.
8. Push the branch, let the protected pull request gate verify the same source, and squash-merge.
9. If any tracked content changes after preflight, rerun the preflight before requesting tag authorization.

The ZIP builder is a dependency-free Node.js implementation with sorted names, fixed metadata, normalized paths, stored entries, and fixed file permissions. It produces the same bytes on Windows, macOS, and Linux for the same staged content and does not depend on `zip`, `tar`, PowerShell, or host filesystem timestamps.

## Tag and Publish

After the release commit is on `main`, create and push the matching annotated tag:

```shell
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

The tag is staging authorization for one immutable candidate. `.github/workflows/release-draft.yml` verifies that the remote annotated tag resolves to the checked-out commit, is reachable from `origin/main`, and matches every version and release file. It then builds and verifies deterministic assets, installs the exact unpublished tag through GitHub CLI in the runner temporary directory, attests the ZIP files, and creates the draft.

If an equivalent draft already exists, a rerun reuses it and replaces only the deterministic assets. If the existing draft title, notes, or state differs from the tagged source, the workflow stops instead of overwriting reviewed or manually edited release content.

Review the title, notes, tag target, ZIP contents, checksums, exact-tag install result, and GitHub artifact attestations, then publish the existing draft. The tag workflow does not repeat the full source validation already performed on the final tree and protected pull request.

Publishing the reviewed draft is production authorization for the public delivery channels. `.github/workflows/gh-skill-install.yml` installs the versionless public source into one ephemeral runner directory and verifies the resolved release tag, repository, source path, tree metadata, file inventory, and runtime content without executing the installed skill. A separate contained job installs the previous published release into another runner directory, previews the update, updates only that directory, and verifies the current release.

The draft and publication workflows share a per-tag, non-cancelling concurrency group. Different versions remain independent, while preparation and publication state for one tag cannot race.

Do not use `gh skill publish --tag` in this repository. The preview publisher can push the current branch and create an immediately published release, but it cannot preserve this repository's curated draft, three packages, checksums, attestations, and publication review.

Technical releasability does not authorize publication. The release owner must confirm security, evaluation, privacy, support, rollback or correction, and roadmap quality status before publishing the draft.

Do not mutate an existing published release. A rejected or failed final-form tag is consumed permanently; preserve its workflow evidence and correct the candidate with a new patch version. This repository does not add a separate deployment workflow, merge queue, or abandonment marker workflow because its current release volume and asset-only delivery do not justify those controls.

## Why This Release Shape Fits

The repository retains squash-only pull requests and a linear protected `main` because they produce one reviewable commit per change with low maintenance cost. A merge queue would add coordination machinery without reducing current contention.

The process combines controls learned from authorized portfolio examples but does not copy any one procedure. Exact-tree preflight and consumed tags fit immutable package delivery; machine-readable state and narrow publication checks remove repeated work; contained migration verification fits the GitHub CLI channel; production environment, hotfix ancestry, provider credentials, and application health gates remain outside this repository because it does not deploy a running service.

## Repository Protections

Protect `main` with a repository ruleset that requires a pull request and the `Validate skill package` check, blocks force pushes and deletion, requires linear history, and permits squash merges only. Zero required approvals supports a solo maintainer; require approval and CODEOWNERS review when another active maintainer is available.

The expected `main protection` ruleset follows the current TechSpokes public skill baseline:

- Require a pull request, dismiss stale approvals, and resolve review threads.
- Require the branch to be current and `Validate skill package` to pass.
- Block force pushes and branch deletion.
- Require linear history and squash merge.
- Allow repository administrators an emergency bypass so a solo maintainer can repair a broken required check or ruleset.

An active `release tag protection` ruleset targets `refs/tags/v*` and restricts tag updates and deletions. Repository administrators retain an emergency bypass. Create corrected releases with a new semantic version instead of moving a published tag.

Repository settings should enable Discussions, Issues, squash merge, and automatic branch deletion. Disable repository Projects, Wiki, merge commits, and rebase merges unless the skill develops a demonstrated need for them.

Enable secret scanning, push protection, Dependabot alerts, and security updates where the repository plan and organization policy support them.

Run `gh skill publish --dry-run` from a clean checkout before a release. Resolve skill validation errors and review its repository hardening warnings before tagging.

Verify a built ZIP after publication with `gh attestation verify <zip> -R TechSpokes/skill-github-repositories-coordination`. GitHub attestations establish source and workflow provenance; they do not replace package inspection.

Verify live settings before changing them. Do not create a second ruleset when an existing `main protection` ruleset can be repaired in place.
