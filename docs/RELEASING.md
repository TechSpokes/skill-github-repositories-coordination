# Releasing

## Change Workflow

Changes reach `main` through a pull request:

1. Create a branch from current `main`.
2. Update the skill, references, fixtures, docs, and manifests coherently.
3. Run `npm run validate`.
4. Run `npm run package -- vX.Y.Z` when packaging or release content changes.
5. Inspect all generated archives for content and privacy boundaries.
6. Push the branch and open a pull request.
7. Wait for `Validate skill package`, resolve conversations, and squash-merge.

Do not push directly to `main`.

## Release Preparation

For version `X.Y.Z`:

1. Set `X.Y.Z` in `package.json` and both plugin manifests.
2. Add `## [vX.Y.Z]` to `CHANGELOG.md`.
3. Add `docs/releases/vX.Y.Z.md`.
4. Update `docs/VERSION.md` and user-facing install examples.
5. Run:

```powershell
npm run validate
npm run package -- vX.Y.Z
```

6. Inspect the standalone, Codex plugin, and Claude plugin ZIP files.
7. Confirm no intake, bootstrap, local path, secret, placeholder, development
   cache, or unrelated repository file is present.
8. Land the release change through the pull request workflow.

## Tag and Publish

After the release commit is on `main`, create and push the matching annotated
tag:

```powershell
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

The release workflow validates the tag, builds the three ZIP assets, and creates
or updates a draft GitHub release from `docs/releases/vX.Y.Z.md`. Review the
title, notes, tag target, and assets, then publish the release.

Do not mutate an existing published release. Correct it with a new version.

## Repository Protections

Protect `main` with a repository ruleset that requires a pull request and the
`Validate skill package` check, blocks force pushes and deletion, requires
linear history, and permits squash merges only. Zero required approvals supports
a solo maintainer; require approval and CODEOWNERS review when another active
maintainer is available.

The expected `main protection` ruleset follows the current TechSpokes public
skill baseline:

- Require a pull request, dismiss stale approvals, and resolve review threads.
- Require the branch to be current and `Validate skill package` to pass.
- Block force pushes and branch deletion.
- Require linear history and squash merge.
- Allow repository administrators an emergency bypass so a solo maintainer can
  repair a broken required check or ruleset.

An active `release tag protection` ruleset targets `refs/tags/v*` and restricts
tag updates and deletions. Repository administrators retain an emergency bypass.
Create corrected releases with a new semantic version instead of moving a
published tag.

Protect release tags with a separate active `release tag protection` ruleset.
Target `refs/tags/v*`, block tag updates and deletion, allow initial creation,
and grant the same repository-administrator emergency bypass. This keeps a
published version identifier immutable in normal operation without blocking the
release workflow.

Repository settings should enable Discussions, Issues, squash merge, and
automatic branch deletion. Disable repository Projects, Wiki, merge commits, and
rebase merges unless the skill develops a demonstrated need for them.

Enable secret scanning, push protection, Dependabot alerts, and security
updates where the repository plan and organization policy support them.

Run `gh skill publish --dry-run` before a release. Resolve skill validation
errors and review its repository-hardening warnings before tagging.

Verify live settings before changing them. Do not create a second ruleset when
an existing `main protection` ruleset can be repaired in place.
