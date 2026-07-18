# Quickstart

## Install Globally

The easiest path is to ask the agent to install the public skill at user or
personal scope:

```text
Install Coordinate GitHub Repositories v1.1.0 globally from
https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer
your native skill installer, do not use GitHub's Source code ZIP, ask before
overwriting anything, and verify the final installation path.
```

For a browser-only install, [download the recommended standalone ZIP](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest/download/coordinate-github-repositories-v1.1.0.zip),
open it, and copy the inner `coordinate-github-repositories` folder into a
personal skills directory.

The shared Agent Skills location used by Codex and GitHub Copilot is:

```text
$HOME/.agents/skills/coordinate-github-repositories/
```

On Windows, `$HOME` normally corresponds to `%USERPROFILE%`.

Claude Code also supports:

```text
~/.claude/skills/coordinate-github-repositories/
```

Keep `SKILL.md` and `references/` together. See the
[plain-language installation guide](INSTALL.md) for File Explorer and Finder
steps, Claude Code, project-level installs, GitHub CLI, and plugin packages.

## Start With an Outcome

Ask the agent for a repository-centered decision, not an abstract demand to
organize everything:

```text
I have repositories in my personal account and two organizations. Help me check
what you can access, understand the kinds of work they contain, and recommend a
proportionate way to coordinate them without replacing useful workflows.
```

Other useful starts:

```text
Help me coordinate a research paper, its dataset, experiments, and publication
site across repositories.
```

```text
Compare our current GitHub Projects setup with a local inventory and an external
catalog. Include the no-change option and the smallest reversible pilot.
```

## What to Expect

The agent should:

- Clarify only facts that can change the decision.
- State which repositories and capabilities it can and cannot observe.
- Recognize code and non-code work.
- Preserve existing vocabulary and governance.
- Compare the current system and no change with alternatives.
- Explain why a consequential least-privilege or reversible step is safer.
- Ask before writes, installations, access changes, administrative actions, or
  public output.
- Route concrete implementation back to the owning repository workflow.

## If the Agent Has No GitHub Access

The skill still supports conversation-only analysis. The agent should state that
it has not inspected repositories, build a small context model from your input,
compare options, and provide a manual verification plan.

Use the [learning path](LEARNING.md) to understand least privilege, untrusted
repository content, private and public boundaries, evidence, reversibility, and
the no-change option without needing a terminal.
