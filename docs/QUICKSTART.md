# Quickstart

## Install Globally

The easiest path is to ask the agent to install the latest public release at user or personal scope:

```text
Install the latest public Coordinate GitHub Repositories skill globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Use `gh skill install` when available; otherwise use your native skill installer or the standalone release ZIP. Never use GitHub's Source code archive, ask before overwriting, and verify the source and final location.
```

For a browser installation, open the [latest release](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest), download the `coordinate-github-repositories-vX.Y.Z.zip` asset under `Assets`, and copy its inner `coordinate-github-repositories` folder into the personal skills folder for your agent.

Keep `SKILL.md` and `references/` together. Use the root [installation guide](../INSTALL.md) for complete commands, folders, verification, update, repair, and removal instructions.

## Start a Useful Conversation

If you do not yet know which repository decision matters, ask:

```text
I just installed this skill. What should we do first?
```

The agent should explain the skill's role and limits in one sentence, then ask what made you install it or what you want to make easier. It may ask up to two relevant follow-up questions before reflecting a tentative understanding that you can correct and offering one bounded next step.

If you already know the outcome, state it directly so the agent skips generic onboarding:

```text
I have repositories in my personal account and two organizations. Help me check what you can access, understand the kinds of work they contain, and recommend a proportionate way to coordinate them without replacing useful workflows.
```

Other useful starts:

```text
Help me coordinate a research paper, its dataset, experiments, and publication site across repositories.
```

```text
Compare our current GitHub Projects setup with a local inventory and an external catalog. Include the no-change option and the smallest reversible pilot.
```

## What to Expect

- The agent clarifies only facts that can change the decision.

- The agent skips generic onboarding when your concrete outcome is already clear.

- The agent states which repositories and capabilities it can and cannot observe.

- The agent recognizes code and non-code work.

- The agent preserves existing vocabulary and governance.

- The agent compares the current system and no change with alternatives.

- The agent explains which specific harm a consequential permission or recovery boundary prevents.

- The agent asks before writes, installations, access changes, administrative actions, or public output.

- The agent routes concrete implementation back to the owning repository workflow.

- The agent may offer one related optional next step after new evidence, but it stops before broader discovery, persistence, or action without renewed scope and authority.

## If the Agent Has No GitHub Access

The skill still supports conversation-only analysis. The agent should state that it has not inspected repositories, build a small context model from your input, compare options, and provide a manual verification plan.

Use the [learning path](LEARNING.md) to understand least privilege, untrusted repository content, private and public boundaries, evidence, reversibility, and the no-change option without needing a terminal.
