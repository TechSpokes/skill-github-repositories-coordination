# Install and Update This Skill

Use this reference only for Coordinate GitHub Repositories itself. Keep broader GitHub CLI education and maintainer release mechanics in the public repository documentation.

## Identify the Installed Source

Locate this installed `SKILL.md`, record the absolute path of its parent skills folder, and inspect its frontmatter before changing files. A GitHub CLI installation from the canonical repository has `metadata.github-repo: https://github.com/TechSpokes/skill-github-repositories-coordination` and `metadata.github-path: skills/coordinate-github-repositories`.

Treat a different repository, path, or missing source record as an unresolved origin. Report it and do not overwrite the installation until the user confirms which source should replace it.

## Check Before Updating

Confirm that `gh skill --help` exposes the preview command. Replace `<ABSOLUTE_SKILLS_FOLDER>` below with the literal parent folder recorded for this installation, then run this read-only check:

```bash
gh skill update coordinate-github-repositories --dry-run --dir "<ABSOLUTE_SKILLS_FOLDER>"
```

Review the reported skill name, source repository, current tree, target tree, and release ref when shown. If the command reports that the skill is current, make no change.

## Apply an Available Update

If the user asked to update this skill, the recorded source is canonical, the dry run found an update, and no local modifications need preservation, run:

```bash
gh skill update coordinate-github-repositories --all --dir "<ABSOLUTE_SKILLS_FOLDER>"
```

The explicit folder and skill name limit the target to the discovered copy in that folder. `--all` suppresses the interactive confirmation for the selected update; it does not authorize updating unrelated skills.

Verify the command result, inspect the updated frontmatter source and ref, report the installation path, and start a new agent session when the host does not reload skills automatically.

## Pinned Installations

A normal update skips a pinned installation. Report the pin and ask whether the user wants to leave the reproducible version in place or move to the latest published release.

After explicit approval to remove the pin, preview and apply only this skill:

```bash
gh skill update coordinate-github-repositories --dry-run --unpin --dir "<ABSOLUTE_SKILLS_FOLDER>"
gh skill update coordinate-github-repositories --all --unpin --dir "<ABSOLUTE_SKILLS_FOLDER>"
```

## Missing Metadata or Recovery

Do not use `--force` merely because an update failed. Missing GitHub metadata, a manually copied folder, a native installer, local edits, or an unexpected path requires source and destination review before replacement.

For a fresh installation or approved recovery, use the maintained public guide at <https://github.com/TechSpokes/skill-github-repositories-coordination/blob/main/INSTALL.md>. The guide selects the exact host and scope and keeps forced replacement as an explicit recovery decision.

## Safety Boundary

An update replaces installed runtime content with remote repository content. Preserve user authority, preview the source when trust is uncertain, never execute retrieved scripts as part of verification, and do not modify other skill folders, user files, repositories, or host configuration.
