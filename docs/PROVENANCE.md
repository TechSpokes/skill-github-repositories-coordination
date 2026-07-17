# Provenance

## Product Intent

The skill was designed from user requirements for adaptive repository
coordination across personal accounts, organizations, non-code work, coding
agents, and general agents. The user required context-sensitive tool advice that
does not harm established workflows or silently persist a personal profile.

## Local Observations

The design used read-only observations from three private local repositories:

- A structured project inventory.
- A general cross-repository issue tracker.
- A partially implemented repository manager and its architecture research.

Only generic patterns were transformed into the public skill. Private names,
paths, account data, repository records, routing tables, credentials, and raw
source content were excluded.

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

## Source Policy

User requirements are authoritative for intent. Local repositories are evidence
only for observed behavior. Product behavior relies on official sources and is
time-bound. Design conclusions such as the context-first sequence, no-change
option, and adoption ladder are maintained product judgments rather than claims
that one external source mandates them.

## Template Lineage

The repository was bootstrapped from TechSpokes Skill Base Template. Bootstrap
control files and raw intake were removed before publication. The maintained
repository is self-contained and does not depend on template instructions.
