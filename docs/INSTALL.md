# Install

Release packages preserve the skill directory so `SKILL.md` can load its
references by relative path. Install a release asset rather than copying raw
repository bootstrap or development files.

## Choose a Package

Each `vX.Y.Z` release provides:

- `coordinate-github-repositories-vX.Y.Z.zip` for standalone Agent Skills hosts.
- `coordinate-github-repositories-codex-plugin-vX.Y.Z.zip` for Codex plugin
  distribution.
- `coordinate-github-repositories-claude-plugin-vX.Y.Z.zip` for Claude plugin
  distribution.

The standalone package is the most portable and is recommended for a global
personal installation.

## Codex and Shared Agent Skills

Extract the standalone folder to:

```text
$HOME/.agents/skills/coordinate-github-repositories/
```

Codex uses this user scope across repositories. GitHub Copilot also documents
the shared user-level `.agents/skills` location.

For one repository only, install under its root:

```text
.agents/skills/coordinate-github-repositories/
```

Official references:

- <https://learn.chatgpt.com/docs/build-skills>
- <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills>

## Claude Code

For a personal installation across projects, extract the standalone folder to:

```text
~/.claude/skills/coordinate-github-repositories/
```

For one repository only, use:

```text
.claude/skills/coordinate-github-repositories/
```

The Claude plugin release contains `.claude-plugin/plugin.json` and the skill
under `skills/`. Use it through a Claude plugin workflow when centralized plugin
distribution is preferable.

Official reference: <https://code.claude.com/docs/en/skills>

## GitHub Copilot

GitHub Copilot accepts personal skills under `~/.copilot/skills` or
`~/.agents/skills`. It accepts project skills under `.github/skills`,
`.claude/skills`, or `.agents/skills`.

GitHub CLI also provides preview commands for discovering and installing skills.
Preview the source before installation and follow the current CLI prompts for
agent and scope selection:

```powershell
gh skill preview TechSpokes/skill-github-repositories-coordination coordinate-github-repositories
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories@v1.0.0
```

The release ZIP remains the authoritative installation path if the preview CLI
does not recognize this repository layout.

## Codex Plugin Package

The Codex plugin release contains `.codex-plugin/plugin.json` and the portable
skill under `skills/`. Codex installs plugins from configured marketplace
sources. Use the standalone package unless you already operate a Codex plugin
marketplace or need plugin-level distribution.

Official references:

- <https://learn.chatgpt.com/docs/plugins>
- <https://learn.chatgpt.com/docs/build-plugins>

## Verify Installation

Confirm the installed folder contains:

```text
coordinate-github-repositories/
|-- SKILL.md
`-- references/
```

Start a new agent session if the host does not detect additions live. Ask a
clear activation prompt:

```text
Help me diagnose repository access across my personal account and organizations,
then compare proportionate inventory options.
```

The agent should identify the skill, state its observed capabilities, and avoid
claiming access it has not verified.

## Update or Remove

Replace the entire installed skill folder with a newer release so references do
not mix versions. To remove it, delete only the exact
`coordinate-github-repositories` installation folder or uninstall the wrapper
plugin through the host's plugin manager.
