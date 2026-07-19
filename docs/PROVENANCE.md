# Provenance

## Product Intent

The skill was designed from user requirements for adaptive repository coordination across personal accounts, organizations, non-code work, coding agents, and general agents. The user required context-sensitive tool advice that does not harm established workflows or silently persist a personal profile.

Issue #6 supplied a public strategy attachment with market observations, seven growth phases, and five cross-cutting quality tracks. The repository preserves the durable phase objectives and quality controls while separating repository deliverables from external evidence that maintainers cannot manufacture.

## Founding Lineage

The maintainer coordinates 340 projects across a personal account and two organizations. Before this skill, three private implementations addressed parts of that portfolio:

- The structured inventory contributed discovery, stable identity, provenance, staged review, and reporting at portfolio scale.
- The cross-repository coordination tracker contributed shared outcomes, simple observation intake, agent enrichment, owner routing, and evidence-gated automation.
- The partial repository manager contributed stable identity, least privilege, idempotency, untrusted-input handling, and lifecycle recovery while demonstrating the cost of assuming a persistent manager application.

The current skill is the fourth attempt. It distills the useful parts of those implementations into portable agent reasoning and runs daily on the same portfolio it was built to support. The [release knowledge reuse case study](CASE-STUDY-FOUNDING-PORTFOLIO.md) traces one complete result from portfolio discovery through implementation in this repository.

This lineage explains the product's origin and operating context. The public documentation includes the practices and results needed to understand the skill while excluding private names, paths, account data, repository records, routing tables, credentials, and raw source content.

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

## Benefit Relationship Sources

Benefit relationship research was checked on 2026-07-19 against these primary sources:

- GitHub dependency graph: <https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-graph>
- PROV-O: <https://www.w3.org/TR/prov-o/>
- DCAT 3: <https://www.w3.org/TR/vocab-dcat-3/>
- Web Annotation Data Model: <https://www.w3.org/TR/annotation-model/>
- Data Quality Vocabulary: <https://www.w3.org/TR/vocab-dqv/>

GitHub's dependency graph defines structural evidence from manifests, lock files, and submitted dependencies. The W3C sources provide precedents for qualifying a relationship with source, time, role, context, and quality information without requiring one storage or transport system.

The runtime adopts the smaller design conclusion: preserve only the evidence and uncertainty needed for the current decision. It does not implement the external vocabularies, claim standards conformance, impose a relationship taxonomy, or require a graph.

## Decision Record Sources

Decision-record research for issue #19 was checked on 2026-07-19 against the current repository records, procedure and governance guides, validator, Git history, and related roadmap issues. Public primary sources included [Michael Nygard's original ADR description](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), [MADR 4.0](https://adr.github.io/madr/), the [UK Government ADR Framework](https://www.gov.uk/government/publications/architectural-decision-record-framework/architectural-decision-record-framework), the [ISO/IEC/IEEE 42010 conceptual model](http://www.iso-architecture.org/42010/cm), [Python PEP 1](https://peps.python.org/pep-0001/), the [Open Decision Framework](https://github.com/open-organization/open-decision-framework/blob/master/ODF-community.md), and the [GRADE Working Group](https://www.gradeworkinggroup.org/).

The sources support a narrow architecture category, short records with explicit status and rationale, preserved supersession history, a shared typed registry, a threshold that excludes ordinary fixes, transparent governance context, and separation of evidence certainty from the resulting decision. [Governance Decision 0005](decisions/0005-use-one-typed-decision-registry.md) applies those precedents to this repository without claiming conformance to an external format.

No exact private portfolio inventory or additional portfolio repository was named as an authorized evidence source for this implementation. Existing public portfolio summaries support concern separation, but the release does not claim that the complete portfolio uses the same taxonomy.

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
