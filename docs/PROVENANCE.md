# Provenance

## Product Intent

The skill was designed from user requirements for adaptive repository coordination across personal accounts, organizations, non-code work, coding agents, and general agents. The user required context-sensitive tool advice that does not harm established workflows or silently persist a personal profile.

Issue #6 supplied a public strategy attachment with market observations, seven growth phases, and five cross-cutting quality tracks. The repository preserves the durable phase objectives and quality controls while separating repository deliverables from external evidence that maintainers cannot manufacture.

## Local Observations

The design used read-only observations from three private local repositories:

- A structured project inventory.
- A general cross-repository issue tracker.
- A partially implemented repository manager and its architecture research.

Only generic patterns were transformed into the public skill. Private names, paths, account data, repository records, routing tables, credentials, and raw source content were excluded.

## Public Primary Sources

Product and standard behavior was checked on 2026-07-17 against:

- Agent Skills specification: <https://agentskills.io/specification>
- OpenAI skill guidance: <https://learn.chatgpt.com/docs/build-skills>
- Claude Code skills: <https://code.claude.com/docs/en/skills>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins>
- GitHub Copilot Agent Skills: <https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills>
- GitHub repositories: <https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories>
- GitHub App installation: <https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party>
- GitHub custom properties: <https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization>
- GitHub sub-issues: <https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues>
- GitHub MCP Server: <https://github.com/github/github-mcp-server>
- MCP security guidance: <https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices>
- Backstage Software Catalog: <https://backstage.io/docs/features/software-catalog/>
- GitHub artifact attestations: <https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations>
- GitHub CLI skill installation: <https://cli.github.com/manual/gh_skill_install>
- TechSpokes contact and security-disclosure routes: <https://www.techspokes.com/contact/> and <https://www.techspokes.com/terms-of-use/>

Artifact-attestation workflow syntax was checked on 2026-07-18. The release workflow uses GitHub's documented `actions/attest@v4` action with `id-token: write` and `attestations: write` permissions for public ZIP provenance.

GitHub CLI version resolution for `gh skill install` was checked on 2026-07-18. A versionless skill name resolves the latest tagged release first and falls back to the default branch when no tagged release exists.

## Writing Quality Sources

The writing quality decision was reviewed on 2026-07-19 against the repository corpus, issue #15 maintainer feedback, professional edit research, empirical studies of generated prose and model preference, and authoritative technical style guidance. The public source hierarchy and limits are recorded in [Writing Quality](WRITING.md).

The research supports controls for observable reading costs such as overloaded sentences, dense labels, hidden actors, formulaic repetition, unsupported contrast, vague claims, unnecessary structure, and revision drift. It does not support inferring authorship from style, banning ordinary English constructions, reconstructing hidden model reasoning, or using a generic model judge as the sole quality gate.

For v1.6.1, the maintainer explicitly authorized a one-time application of the optional process across the public repository and packaged skill. That authorization changes the scope of this review, not the default maintenance cost for later patches.

The complete research notes, confidence records, contradictions, and source extracts remain in ignored private intake for later reuse. Release packages contain only the optional runtime quality pass and omit the research archive, public maintainer guide, and regression corpus.

## Roadmap Source Treatment

The issue #6 attachment is authoritative for the requested program direction, not for every market or security claim it cites. Phase plans use its durable objectives, safety principles, and evidence controls. Publishable market claims, community rules, product behavior, pricing, and host capabilities must be verified from current primary sources when they affect an action.

The attachment is not installed as runtime content. The reviewed program contract lives in `docs/ROADMAP.md`, phase plans live in issues #7 through #13, and the classified program decisions live in `docs/decisions/`.

## Installation Usability Comparison

On 2026-07-17, the most recently published prior TechSpokes skill release was `skill-ide-phpstorm-mcp` v1.4.0. Its public README and install guide established three useful organization patterns:

- Put installation near the top of the README.
- Explain the purpose of each release asset.
- Warn users that GitHub's automatic Source code archives are not runtime packages.

Version v1.0.1 adopts those patterns and lowers the remaining barrier by adding an agent-assisted global install prompt, browser-only instructions, native Windows and macOS folder navigation, one recommended default package, and an explicit final-path check. The comparison used public repository and release content only: <https://github.com/TechSpokes/skill-ide-phpstorm-mcp/releases/tag/v1.4.0>.

## Source Policy

User requirements are authoritative for intent. Local repositories are evidence only for observed behavior. Product behavior relies on official sources and is time-bound. Design conclusions such as the sequence that begins with context, the option to make no change, and the adoption ladder are maintained product judgments rather than claims that one external source mandates them.

## Template Lineage

The repository was bootstrapped from TechSpokes Skill Base Template. Bootstrap control files and raw intake were removed before publication. The maintained repository is self-contained and does not depend on template instructions.
