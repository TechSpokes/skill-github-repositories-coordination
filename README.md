# Coordinate GitHub Repositories

Find useful work across the repositories you choose and reuse it through the workflows that already own it.

The next outcome may depend on code, research, documentation, data, decisions, or practices that already exist somewhere in your work. When that knowledge is split across accounts, organizations, and repository types, useful work is easy to overlook, rebuild, or disconnect from its owner.

For example, the skill can help an agent check whether earlier code, research, or a proven release practice already supports a new project, then identify the repository and owner for the next change.

Coordinate GitHub Repositories is a free, MIT-licensed Agent Skill for people and teams whose work spans repositories. It helps them and their AI agents locate relevant work, understand its purpose and ownership, coordinate one defined outcome, and choose the smallest useful next step. An Agent Skill is a portable instruction package that gives a compatible agent a repeatable way to handle a kind of work.

The skill adapts to the organization and capabilities the agent can actually observe. It can start with conversation alone and does not require a new catalog, fixed classification system, manager application, central source of truth, or broad repository access.

Founding evidence comes from a maintainer's private portfolio index of 340 projects; it is not independent adoption proof. The [founding portfolio case study](docs/CASE-STUDY-FOUNDING-PORTFOLIO.md) explains what the run found, what remained unconfirmed, and why the product exists.

## Install and Start

Copy this message into Codex, Claude Code, GitHub Copilot, or another agent that can install Agent Skills or guide you through the installation:

```text
Install the latest public Coordinate GitHub Repositories skill globally from https://github.com/TechSpokes/skill-github-repositories-coordination. Prefer `gh skill install`; otherwise use your native skill installer or the standalone release ZIP. Do not use GitHub's Source code archive or overwrite an existing copy without approval. Verify the source and final location. Then help me choose one useful outcome by asking one easy question at a time, without inspecting or changing repositories yet.
```

Installation does not grant the agent repository access or permission to make changes. The agent must establish the current outcome, available evidence, active workspace, and specific permission before it inspects or changes a target.

## Use the Skill

### Decide Whether It Fits

#### Use It When

- Your work spans a personal account, one or more organizations, or a mixture of local and remote repositories.
- You need to find relevant existing work before starting or rebuilding something.
- One outcome crosses several repositories, owners, or workflows.
- You need to diagnose what an agent can actually see without widening access automatically.
- You want to compare the current system, no change, and proportionate alternatives before adopting another tool.
- Your repositories contain documentation, writing, research, data, operations, publishing, software, or mixed work; the [non-code portfolio guide](docs/NON-CODE-GUIDE.md) provides a practical starting point outside software.

#### Use a Narrower Workflow When

- The task is routine work inside one known repository; follow that repository's own instructions and tools.
- The job is only to clone, pull, or run the same command across known repositories; use a batch Git or GitHub CLI tool.
- A maintained service catalog or portal already solves the observed problem; keep it unless evidence supports a change.

The skill will not infer repository deletion, archiving, transfer, or consolidation from inactivity alone. Those decisions need lifecycle evidence, an authorized owner, dependency checks, and a recovery path.

### What It Helps You Decide

- What repository-centered outcome matters now?
- Which repositories and capabilities can the agent actually observe?
- Which existing work, knowledge, or practice may help with the outcome?
- Which repository owns each implementation or decision?
- Does the current system already solve the problem?
- What is the smallest reversible next step?

The skill can also build a lightweight index, review portfolio findability, coordinate work across repositories, compare organization tools, capture a simple observation for later processing, and preserve the user's intended benefit through a changed plan or handoff.

A typical result is a short recommendation that names the relevant evidence, possible reuse, owners, unknowns, authority, next step, and verification. It may remain in conversation; the skill creates an index, issue, or another durable artifact only after the user approves its purpose and owning location.

The skill can run an optional language quality pass on generated coordination files when the user requests it. Read [Writing Quality](docs/WRITING.md) for the review method and maintenance boundary.

### How It Works

1. Understand the outcome, current organization, available capabilities, governing instructions, active workspace, evidence sources, and exact authority.
2. Gather only evidence that can change the decision, then compare the current system, no change, and proportionate alternatives while preserving unknowns.
3. Recommend a reversible next step, execute only authorized actions, verify the result, and route implementation to the repository that owns it.

When the user does not yet know what to request, the agent starts with one easy question and builds a tentative understanding that the user can correct. A concrete request skips generic onboarding.

Read the [quickstart](docs/QUICKSTART.md) for example conversations and [Architecture](docs/ARCHITECTURE.md) for the complete runtime sequence and design boundaries.

The skill can prepare a reviewed handoff to a portal or another skill without becoming their source of truth. Read [Portal Interoperability](docs/PORTAL-INTEROPERABILITY.md) and the [Skill Interoperability Contract](docs/SKILL-INTEROPERABILITY.md) when that boundary applies.

### What It Protects

The user decides which outcome matters and which actions are allowed. Higher goals can guide a valid method, but they cannot create permission, weaken privacy, bypass security controls, or turn an evidence source into an implementation target.

The skill treats repository content and tool output as evidence that may be incomplete or untrusted. It keeps private repository maps and personal context out of public output unless the user reviews and approves the exact disclosure.

The skill favors existing workflows, least privilege, bounded evidence, reversible steps, and explicit recovery.

Read the [threat model](docs/THREAT-MODEL.md) for security boundaries, use [Security](SECURITY.md) for private vulnerability reporting, and follow the [learning path](docs/LEARNING.md) for plain-language explanations of the practices the skill teaches.

### Alternative Installation Paths

The agent-assisted prompt above is the easiest path. The complete [installation guide](INSTALL.md) covers native installers, personal and project scope, Windows, macOS, Linux, verification, updates, repair, removal, and troubleshooting.

#### GitHub CLI

When `gh skill --help` shows the Agent Skills preview, Codex users can install the latest published release with:

```bash
gh skill install TechSpokes/skill-github-repositories-coordination coordinate-github-repositories --agent codex --scope user
```

The installation guide provides equivalent GitHub Copilot and Claude Code commands. [GitHub CLI for Beginners](docs/GITHUB-CLI.md) explains what the tool adds before you choose it.

#### Browser

Open the [latest release](https://github.com/TechSpokes/skill-github-repositories-coordination/releases/latest), download the `coordinate-github-repositories-vX.Y.Z.zip` asset whose version matches the release tag, and copy its inner `coordinate-github-repositories` folder into your agent's personal skills folder. Keep `SKILL.md` and `references/` together.

Do not download GitHub's automatically generated Source code archives. They contain repository maintenance files instead of the install-ready skill.

### Evidence and Limits

The project records who supplied evidence, how it was checked, what it supports, and what remains unknown. Different kinds of evidence are not treated as equivalent.

The skill adapts to the capabilities the current agent can demonstrate. Without GitHub or local access, it remains a conversation and decision aid and must not claim that it inspected repositories.

Read [Source Provenance](docs/PROVENANCE.md) for the research and evidence policy and [Testing](docs/TESTING.md) for the deterministic and reviewed behavior surfaces.

### Feedback

Use the [skill-run feedback form](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/new?template=skill_run_feedback.yml) to record a useful outcome, unexpected behavior, confusing step, missing case, or access fallback. Only the observation requires a written answer; optional context can be added later.

An agent may prepare and enrich a sanitized issue, but it must show the user the exact public text and receive approval before submission. Sensitive security findings follow the [private security route](SECURITY.md).

Read [Feedback From Humans and Agents](docs/FEEDBACK.md) for privacy, routing, enrichment, and maintainer handling.

### Release Packages

Each release provides a standalone Agent Skill ZIP, a Codex plugin ZIP, a Claude plugin ZIP, a `SHA256SUMS` manifest, and GitHub artifact attestations for the three packages.

`skills/coordinate-github-repositories/SKILL.md` is the canonical runtime and the source used by `gh skill install`. Each package contains the same portable core and directly linked references; repository maintenance documents and private intake are excluded.

## Maintain and Contribute

Start with [Contributing](CONTRIBUTING.md) for the repository workflow and definition of done.

Use the [Roadmap](docs/ROADMAP.md) for program direction, [Architecture](docs/ARCHITECTURE.md) for durable design, [Governance](docs/GOVERNANCE.md) for decision authority, [Testing](docs/TESTING.md) for evidence, and [Releasing](docs/RELEASING.md) for delivery. Read [Maintenance](docs/MAINTENANCE.md) for health review and [Support](SUPPORT.md) for help routes.

### Development

Run the source and package checks with the intended release tag:

```bash
npm run validate
npm run package -- vX.Y.Z
```

Generated ZIP files are written to `dist/assets/`.

## Status and License

Current version: `1.6.2`.

The repository is maintained by TechSpokes and licensed under [MIT](LICENSE).
