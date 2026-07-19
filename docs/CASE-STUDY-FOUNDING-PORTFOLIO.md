# Reusing Release Knowledge Across 340 Projects

## The Request

The maintainer already had release procedures and automation spread across repositories they managed. The request to the agent was practical: inspect three established release approaches and apply what fit this repository.

The person making that request built this skill and maintains it in daily use. The result below is the repository's own operating history, preserved in its pull requests, release notes, workflows, and scripts.

The difficult part was not writing another workflow. It was finding the relevant experience in a 340-project portfolio, understanding why each repository used its controls, and combining the useful parts without importing application infrastructure or changing the source repositories.

## What the Skill Found

The portfolio index located three relevant repositories across two organizations. Their purposes made them useful for different reasons:

- A package template defined installable artifacts, synchronized version identity, release notes, and draft review.
- A production application used a cutover plan with a final readiness check, an explicit approval point, and post-change verification.
- A deployed service separated pull request validation, immutable version tags, staging, publication, production delivery, and recovery state.

The agent used the inventory for discovery, then inspected only the release instructions, workflows, and validation tools that could change the decision. The three source repositories remained read-only evidence.

## How the Practices Were Adapted

| Repository model | Useful practice | Adaptation in this repository |
| --- | --- | --- |
| Package template | Build versioned installable packages from a tag, keep package identity synchronized, and review a draft before publication. | Build three skill packages and a checksum manifest from one release identity, then preserve a human publication checkpoint. |
| Application cutover | Validate the complete candidate before the cutover and separate readiness from approval and post-change verification. | Run one final-tree preflight before the release commit, then keep tag preparation and publication as narrower delivery checks. |
| Deployed service | Let pull request CI own the source gate, use immutable tags for candidate identity, and verify the unchanged candidate at each delivery stage. | Avoid repeating the complete source gate; guard the tag and release state, verify the exact unpublished install, and test the public install and update path after publication. |

The agent did not copy the complete release system from any source. Production environments, provider credentials, application health checks, hotfix ancestry, and merge queues solved problems this repository does not have. Separate abandonment automation was also left out of the initial design because no failure had demonstrated that need here.

## What Changed in This Repository

[Pull request #25](https://github.com/TechSpokes/skill-github-repositories-coordination/pull/25) implemented the combined release design. It added or substantially changed the concrete machinery that still carries the process:

- [`scripts/release-preflight.mjs`](../scripts/release-preflight.mjs) validates the complete candidate tree, builds twice, and rejects changed or nondeterministic content.
- [`scripts/lib/stored-zip.mjs`](../scripts/lib/stored-zip.mjs) creates and reads deterministic ZIP files without relying on a host archiver.
- [`scripts/verify-release-assets.mjs`](../scripts/verify-release-assets.mjs) checks archive inventory, bytes, checksums, unsafe paths, private material, and credential patterns without extracting the packages.
- [`.github/workflows/release-draft.yml`](../.github/workflows/release-draft.yml) guards the immutable tag, verifies the exact unpublished installation, and creates the reviewed draft.
- [`.github/workflows/gh-skill-install.yml`](../.github/workflows/gh-skill-install.yml) verifies the versionless public installation and a contained update from the previous release.

The implementation changed 28 files and added 971 lines while removing 118. The useful measure is not the amount of code. The repository gained a release process assembled from controls already understood elsewhere in the portfolio, adapted to this package and its risks.

## What Happened Next

The first [`v1.3.1` candidate](releases/v1.3.1.md) found a real defect: a Windows checkout and the Linux release runner produced different archive hashes because of host line endings. The immutable tag remained consumed and the draft was not published.

Version [`v1.3.2`](releases/v1.3.2.md) corrected the package builder by normalizing portable text content and comparing local and draft asset digests. That observed failure also justified the abandonment path that the first adaptation had intentionally omitted. The workflow now preserves the failed tag as evidence, creates an immutable `abandoned/vX.Y.Z` marker after explicit authorization, and can remove only the matching unpublished draft.

## Why This Is the Use Case

The maintainer did not need to remember which repository held each useful release idea or explain every implementation to the agent. The skill used the portfolio to find prior knowledge, compared that knowledge against the current outcome, and routed the implementation to the repository that owned the change.

That is the repository-scale benefit: work completed in one project remains available to improve another, even when the useful answer must be recombined from several sources. Private repository names, local paths, credentials, and unrelated application details remain outside this public case study.
