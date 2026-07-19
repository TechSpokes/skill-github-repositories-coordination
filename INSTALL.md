# Install Coordinate GitHub Repositories

This guide helps people who have never installed an Agent Skill and agents that need an exact, verifiable installation path. You can install the skill without cloning this repository, changing your repositories, or granting organization administration access.

## Choose the Path That Fits You

| Your situation | Recommended path | What you need |
|---|---|---|
| You want the easiest setup | Ask your agent | An agent that can install skills or guide you |
| You already use a terminal or manage many repositories | GitHub CLI | A current `gh` command with `gh skill` available |
| Your agent has its own trusted skill installer | Native installer | The public repository URL |
| You do not want a terminal | Browser and standalone ZIP | A browser and your agent's personal skills folder |
| You need the skill in one repository only | Project installation | Write access to that repository's local skill folder |
| You maintain or contribute to the skill | Source checkout | Git, Node.js, and the repository development checks |

GitHub CLI is convenient, but it is not required. Read [GitHub CLI for Beginners](docs/GITHUB-CLI.md) if you want to understand what it adds before choosing it.

## Easiest Option: Ask Your Agent

Copy this single instruction into Codex, Claude Code, GitHub Copilot, or another agent that can install skills:

```text
Install the latest public Coordinate GitHub Repositories skill globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer `gh skill install`; otherwise use your native skill installer or the standalone release ZIP. Do not use GitHub's Source code archive or overwrite an existing copy without approval. Verify the source and final location.
```

The agent should detect its available installation method, choose personal or user scope, preserve the complete skill folder, and report the source, release, and final path. If an existing copy would be replaced, the agent should show you what it found and ask first.

## Install With GitHub CLI

GitHub CLI is the preferred command path when this check succeeds:

```bash
gh skill --help
```

The Agent Skills commands are in preview, so detect the command instead of relying on a maintained minimum version number.

Choose the command for the agent that will use the skill.

For Codex:

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent codex --scope user
```

For GitHub Copilot:

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent github-copilot --scope user
```

For Claude Code:

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent claude-code --scope user
```

Use `gh skill install --help` to see other supported agents. The explicit agent and user scope prevent a noninteractive session from choosing an unintended default or a project folder.

The versionless command resolves the latest published release first and uses the repository default branch only when no usable release exists. This behavior is documented in the [official install manual](https://cli.github.com/manual/gh_skill_install).

Add `@vX.Y.Z` or `--pin vX.Y.Z` only when a reproducible workflow must remain on one release. A normal installation should stay versionless so future update checks can follow new published releases.

GitHub CLI copies the runtime files from the tagged Git tree and adds source tracking metadata to the installed `SKILL.md`. It does not install the uploaded standalone or plugin ZIP.

## Install With a Native Skill Manager

If your agent has a built-in skill installer, give it the canonical repository URL and ask for a global or personal installation. Prefer that supported workflow when GitHub CLI is unavailable or the host manages skills through its own interface.

The installer must select `skills/coordinate-github-repositories/`, preserve `SKILL.md` and the complete `references/` folder, avoid GitHub's automatic Source code archives, and report the final path. It must not replace an existing installation without approval.

## Install With a Browser Only

1. Open the [latest release](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest).

2. Under `Assets`, download `coordinate-github-repositories-vX.Y.Z.zip`, where `vX.Y.Z` is the tag shown on that release.

3. Open the downloaded ZIP and find its inner `coordinate-github-repositories` folder.

4. Copy that complete folder into the personal skills folder used by your agent.

5. Start a new agent session if the current session does not detect newly installed skills.

Do not choose `Source code (zip)` or `Source code (tar.gz)`. GitHub creates those archives from the whole maintenance repository, so they are not install-ready packages.

### Codex Personal Folder

On Windows, copy the skill folder into `%USERPROFILE%\.codex\skills\`. On macOS or Linux, copy it into `~/.codex/skills/`.

### GitHub Copilot Personal Folder

On Windows, copy the skill folder into `%USERPROFILE%\.copilot\skills\`. On macOS or Linux, copy it into `~/.copilot/skills/`.

### Claude Code Personal Folder

On Windows, copy the skill folder into `%USERPROFILE%\.claude\skills\`. On macOS or Linux, copy it into `~/.claude/skills/`.

Host locations can change. Prefer the location shown by your agent or its current documentation, and never copy files into an unrelated application folder merely because its name looks similar.

The final runtime structure must keep the folder name and references together:

```text
skills/
`-- coordinate-github-repositories/
    |-- SKILL.md
    `-- references/
```

An extra directory level between the agent's skills folder and `coordinate-github-repositories` can prevent discovery.

## Choose the Correct Release Asset

| What you want | Asset |
|---|---|
| A portable personal Agent Skill | `coordinate-github-repositories-vX.Y.Z.zip` |
| A complete Codex plugin package for a host that imports plugin ZIPs | `coordinate-github-repositories-codex-plugin-vX.Y.Z.zip` |
| A complete Claude plugin package for a host that imports plugin ZIPs | `coordinate-github-repositories-claude-plugin-vX.Y.Z.zip` |

The `vX.Y.Z` text is a pattern, not a version that you should type literally. Choose the asset whose version matches the current release tag.

## Install for One Project

Use project scope when only one repository should expose the skill. A project installation becomes part of that repository's local operating context and remains subordinate to its own instructions.

Open a terminal in the root folder of the intended repository before running one of the commands below. Confirm the repository path first because project scope writes inside the current repository.

### Codex Project Installation

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent codex --scope project
```

The resulting project folder is `.agents/skills/coordinate-github-repositories/`.

### GitHub Copilot Project Installation

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent github-copilot --scope project
```

The resulting project folder is `.agents/skills/coordinate-github-repositories/`.

### Claude Code Project Installation

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent claude-code --scope project
```

The resulting project folder is `.claude/skills/coordinate-github-repositories/`.

For a browser installation, create the folder shown for your agent at the intended project root and copy the complete runtime folder into it. Do not create or modify a skills folder in an adjacent repository.

## Verify the Installation

Start a new session and ask:

```text
Use the Coordinate GitHub Repositories skill. Tell me where it is installed and which source it records. Then help me decide a useful first outcome by asking one easy question at a time, without inspecting or changing repositories yet.
```

A correct response identifies the skill and location, explains its role and limits briefly, and begins with one easy question about why you installed it or what you want to make easier. It does not inspect repositories, build a profile, or change access without a relevant outcome and authority.

For a GitHub CLI installation, the installed `SKILL.md` should record `https://github.com/TechSpokes/skill-github-repositories-coordination` and `skills/coordinate-github-repositories` in its generated metadata. Those fields support later update checks.

Each release includes a `SHA256SUMS` asset for local checksum comparison. When GitHub CLI is available, verify a downloaded standalone ZIP's provenance with:

```bash
gh attestation verify ./coordinate-github-repositories-vX.Y.Z.zip -R TechSpokes/skill-github-repositories-coordination
```

An attestation verifies source and workflow identity. It does not prove that content is secure, so trust review and safe execution boundaries still apply.

## Update a GitHub CLI Installation

Check this skill without changing files:

```bash
gh skill update coordinate-github-repositories --dry-run
```

If the command reports an available update from the canonical repository and no local changes need preservation, apply only the selected skill in a noninteractive agent session:

```bash
gh skill update coordinate-github-repositories --all
```

The skill name excludes unrelated skills, but GitHub CLI can find copies with the same name in several known agent folders. Review every target shown by the dry run before applying the update. In this command, `--all` suppresses the confirmation prompt for the selected skill name.

If several copies exist and you want to update only one, follow the installed [update reference](skills/coordinate-github-repositories/references/install-and-update-this-skill.md). It uses `--dir` with the actual parent skills folder to limit discovery to that installation.

Pinned installations are skipped. Remove a pin only after deciding to leave the fixed release line:

```bash
gh skill update coordinate-github-repositories --dry-run --unpin
gh skill update coordinate-github-repositories --all --unpin
```

The installed skill includes its own [update reference](skills/coordinate-github-repositories/references/install-and-update-this-skill.md), so an agent asked to update the skill can follow the same source check and exact commands.

## Update a Browser or Native Installation

For a browser installation, download the new standalone ZIP, preserve any intentional local changes separately, and replace the complete `coordinate-github-repositories` folder. Do not mix `SKILL.md` and reference files from different releases.

For a native skill manager, use its update action when available. If it cannot prove the existing source and destination, stop and resolve those facts before replacing files.

## Existing Copies, Repair, and Force

The noninteractive GitHub CLI installer refuses an existing destination unless `--force` is supplied. This is useful protection because forced replacement can discard local edits and may remove files that are absent from the published skill.

Do not make `--force` part of routine installation instructions. Use the metadata-aware update command first, and use a forced reinstall only when the user has approved the exact source, agent, scope, destination, and loss of local changes.

If a manually installed copy has no source metadata, compare its path and content with the intended release or move it to a recoverable backup location before installing a replacement. Do not delete broad skill, profile, home, or project directories.

## Remove the Skill

Remove only the exact `coordinate-github-repositories` installation folder through the host's skill manager or a verified file operation. Do not remove its parent skills folder because that folder may contain unrelated skills.

Removing the runtime folder does not change repositories, GitHub authentication, organization access, or other agent settings.

## Troubleshooting

If `gh skill` is unavailable, update GitHub CLI through its [official installation path](https://github.com/cli/cli#installation) or choose the native installer or browser path. Do not bake a GitHub CLI version number into reusable instructions because the command is still in preview.

If GitHub CLI reports no login, public installation may still work within anonymous API limits. Private repository access and maintainer operations require authentication; read [GitHub CLI for Beginners](docs/GITHUB-CLI.md) before changing an account session.

If the agent cannot find the skill, confirm that the final folder is named `coordinate-github-repositories`, contains `SKILL.md` directly, and includes `references/` beside it. Restart the agent if its skill catalog is loaded only at session start.

If update reports missing GitHub metadata, the copy was probably installed manually or by a different tool. Do not guess its origin or force an overwrite until the source and destination are confirmed.

## Learn More

- [GitHub CLI for Beginners](docs/GITHUB-CLI.md) explains installation, authentication, accounts, repositories, skills, and scoped command use.

- [Quickstart](docs/QUICKSTART.md) moves from installation to a first useful repository coordination request.

- [GitHub CLI Skill Delivery](docs/GITHUB-CLI-DELIVERY.md) records the maintainer research, source behavior, release architecture, containment, and rollback plan.

- [Official GitHub CLI skill install manual](https://cli.github.com/manual/gh_skill_install) is the current command reference.

- [Official GitHub CLI skill update manual](https://cli.github.com/manual/gh_skill_update) is the current update reference.
