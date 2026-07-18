# Install

The recommended setup is personal or global: install the skill once and let the same agent use it across your projects. You do not need to clone this repository or understand Git to install it.

## Easiest Option: Ask Your Agent

Copy this message into Codex, Claude Code, GitHub Copilot, or another agent that can install skills:

```text
Install the latest public release of Coordinate GitHub Repositories globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer your native skill installer; otherwise use the standalone skill ZIP under Assets, never a GitHub Source code or plugin ZIP. Ask before overwriting. Keep SKILL.md and references/ together. Verify the location and version, and say if a new session is needed.
```

The agent should choose its supported personal or user scope, preserve the folder, and report what it actually installed. If the agent cannot install files, use the browser-only steps below.

## Install With a Browser Only

1. Open the [latest release](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest).
2. Under `Assets`, download `coordinate-github-repositories-vX.Y.Z.zip`, where `vX.Y.Z` is the tag shown on that release.
3. Open the downloaded ZIP.
4. Find the folder named `coordinate-github-repositories` inside it.
5. Copy that whole folder into the personal skills folder for your agent.
6. Start a new agent session if the current session does not detect new skills.

Use this destination table:

| Agent | Windows folder | macOS or Linux folder |
|---|---|---|
| Codex | `%USERPROFILE%\.agents\skills` | `~/.agents/skills` |
| GitHub Copilot | `%USERPROFILE%\.agents\skills` | `~/.agents/skills` |
| Claude Code | `%USERPROFILE%\.claude\skills` | `~/.claude/skills` |
| Another Agent Skills host | Use the personal skills location shown by that app, or ask the agent to identify it. | Use the personal skills location shown by that app, or ask the agent to identify it. |

On Windows, paste the folder path into the File Explorer address bar and create missing `.agents`, `.claude`, or `skills` folders when needed. On macOS, choose `Go > Go to Folder` in Finder and paste the path. On Linux, press `Ctrl+L` in the file manager, enter the path, and use `Ctrl+H` if hidden folders are not visible.

The final structure must look like this. An extra folder level can prevent the agent from finding the skill.

```text
skills/
`-- coordinate-github-repositories/
    |-- SKILL.md
    `-- references/
```

## Choose the Right Download

For most people, the first row is the right choice.

| What you want | Asset name |
|---|---|
| Use the skill personally across projects | `coordinate-github-repositories-vX.Y.Z.zip` (recommended) |
| Import a complete plugin into a Codex host that accepts plugin ZIPs | `coordinate-github-repositories-codex-plugin-vX.Y.Z.zip` |
| Import a complete plugin into a Claude host that accepts plugin ZIPs | `coordinate-github-repositories-claude-plugin-vX.Y.Z.zip` |

The filenames above are patterns; choose the files whose `vX.Y.Z` matches the current release tag.

Do not choose `Source code (zip)` or `Source code (tar.gz)`. GitHub creates those archives automatically from the maintenance repository, and they are not install-ready packages.

## Install With GitHub CLI

This option is useful when GitHub CLI is already installed. The versionless commands below install the latest tagged release into the correct personal folder and record where the skill came from.

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

As verified in the [GitHub CLI manual](https://cli.github.com/manual/gh_skill_install) on 2026-07-18, omitting the version resolves the latest tagged release first and falls back to the default branch only when the repository has no tagged release. Add `@vX.Y.Z` or `--pin vX.Y.Z` only when a reproducible workflow needs a fixed release. The `gh skill` command is in public preview and may change.

GitHub CLI supports additional agents. Run `gh skill install --help` or ask the agent for its supported `--agent` name instead of guessing a folder.

If the skill already exists, review it before allowing an overwrite.

## Install for One Project Only

Choose project scope when the skill belongs to one repository rather than your general agent setup.

- Codex and GitHub Copilot: `.agents/skills/coordinate-github-repositories/`
- Claude Code: `.claude/skills/coordinate-github-repositories/`
- GitHub Copilot also accepts `.github/skills/coordinate-github-repositories/`

Place those folders at the project root. Project instructions still control work inside that repository.

## Verify Installation

Start a new session and ask:

```text
Use the Coordinate GitHub Repositories skill. Tell me where it is installed, then help me understand which repositories you can actually access without changing anything.
```

A correct response should identify the skill, distinguish observed access from assumed access, and avoid making changes without permission.

Each release includes a `SHA256SUMS` asset for local checksum comparison. When GitHub CLI is available, verify a downloaded ZIP's provenance with:

```bash
gh attestation verify ./coordinate-github-repositories-vX.Y.Z.zip -R TechSpokes/skill-github-repositories-coordination
```

An attestation verifies source and workflow identity. It does not prove that an artifact is secure, so maintainers must still inspect release contents.

## Update or Remove

For a browser installation, replace the entire `coordinate-github-repositories` folder with the folder from a newer standalone release. Do not mix reference files from different versions.

For GitHub CLI installations, ask the agent to check for an update or use the CLI update flow supported by the installed version. To remove the skill, delete only the exact `coordinate-github-repositories` installation folder or use the host's plugin manager.

## Official Host References

- GitHub CLI skill install: <https://cli.github.com/manual/gh_skill_install>
- Codex skills: <https://learn.chatgpt.com/docs/build-skills>
- GitHub Copilot skills: <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills>
- Claude Code skills: <https://code.claude.com/docs/en/skills>
- Codex plugins: <https://learn.chatgpt.com/docs/plugins>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins>
