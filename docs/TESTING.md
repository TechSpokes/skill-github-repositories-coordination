# Testing

## Test Strategy

The repository uses six layers:

1. Deterministic repository validation.
2. Machine-checked evaluation registry coverage.
3. Scenario-based fresh-agent forward review against behavioral invariants.
4. Agent Skills and plugin manifest validation.
5. Release archive, checksum, and provenance inspection.
6. Consented outcome evidence from real use.

Exact model wording is not a test contract. Activation, reasoning order, safety, adaptation, feedback, and handoff behavior are.

Keep deterministic scripts platform agnostic where practical. Node.js scripts use standard library APIs and bounded child processes; an optional platform fallback must not become a runtime requirement for the skill.

## Deterministic Checks

Run:

```shell
npm run validate
npm run package -- vX.Y.Z
npm run release:verify-assets -- vX.Y.Z
```

The validator checks metadata, direct links, required maintenance files, versions, manifests, release notes, workflow mode, Markdown structure, runtime path leakage, placeholders, installation-version synchronization, the living roadmap and historical delivery boundary, feedback, decisions, writing-corpus structure, and the 500-line core limit. Feedback validation requires the canonical label query in the README and maintainer guide and requires the operational evidence-to-fixture mapping in the guide and runtime reference; it does not inspect or prove remote issue labels or content. Decision validation derives canonical types and index coverage from marked blocks in `docs/decisions/README.md`, discovers records dynamically, and checks stable filenames, unique identifiers, matching titles, common sections, exact index membership, and stale links without hard-coding historical record names. The validator also runs `scripts/validate-evaluations.mjs`, which requires every activation row and scenario heading to have a stable registry entry and every required segment to retain coverage.

For a release cut, `npm run release:preflight -- vX.Y.Z` snapshots every tracked and nonignored untracked candidate file, runs the complete final-tree gate, builds the assets twice, requires stable checksums, and verifies that the gate does not change the candidate tree.

The package audit must confirm:

- Three expected ZIP names.
- One `SHA256SUMS` manifest covering exactly those ZIP files.
- One correctly named skill folder per package.
- `SKILL.md` and every runtime reference are byte-identical across packages.
- Plugin manifests use the release name and version.
- Maintenance fixtures are not installed as runtime content.
- No intake, bootstrap, docs, local paths, private source names, placeholders, credentials, or development caches appear.

The package builder writes stored ZIP entries with sorted names and fixed metadata through Node.js standard library APIs. `scripts/verify-release-assets.mjs` parses the ZIP records without extraction, validates CRC values, compares every entry with its staged file, and checks the checksum manifest and public-content boundaries. Repeated builds from the same tree must produce the same archive digests on every supported platform.

Packaged Markdown, JSON, YAML, and text use LF regardless of host working-tree line endings. Compare local preflight checksums with draft release asset digests before publication; any mismatch consumes the candidate tag and requires correction before publication.

## Evaluation Contract

`tests/evals/cases.json` registers activation, behavior, and adversarial cases with stable IDs, segments, fixture coordinates, and baseline risks. The current registry checks 75 cases across 18 segments, including findability conventions, benefit discovery, and writing quality alongside the existing access, safety, onboarding, goal, portfolio, and capability coverage.

`tests/fixtures/writing-corpus.json` contains reviewed repairs across runtime, security, evaluation, release, installation, and intake prose plus protected compounds, contrasts, commands, flags, URLs, identifiers, versions, and safety language. Validation checks schema, coverage, unique IDs, and rollout of each accepted revision. It does not score naturalness or infer authorship.

Goal survival cases also declare at least three decision checks and one explicit failure condition. This makes the maintained contract score whether the intended benefit, current task, workspace, authority, constraints, evidence state, and next verification survive changed plans, conflicts, summaries, and handoffs instead of accepting artifact creation or tool success as completion.

The deterministic check proves fixture registration and structural coverage. It does not prove that a model follows the skill.

Versioned files under `docs/evaluations/` are historical evidence from an observed model and host configuration, not permanent dependencies of the current validation contract. Current fixtures and `tests/evals/cases.json` define the maintained behavior surface.

## Fresh-Agent Forward Review

Run comparable bare-agent and skill-assisted prompts for affected cases. Use a fresh agent for the skill-assisted pass, provide only the skill and task-local artifact, and score invariant presence rather than exact wording.

Record model or host, version, capabilities, skill version, sanitized raw output, reviewer, observation date, result, and limitations. Store only publishable evidence. Follow [Program Evidence](PROGRAM-EVIDENCE.md) for the record contract.

A model pass supports only the observed configuration. Do not claim identical behavior across hosts or future models.

## External Validators

Before release, validate:

- `skills/coordinate-github-repositories/` with the Agent Skills quick validator.
- The staged Codex plugin with the Codex plugin validator.
- The staged Claude plugin with `claude plugin validate` when Claude Code is available.
- The repository with `gh skill publish --dry-run` when authenticated GitHub CLI publication support is available.

The initial `v1.0.0` dry run passed skill validation and identified secret scanning, push protection, and release-tag protection as repository settings to enable before publication.

Record unavailable validators honestly. Do not replace a failed check with an unsupported claim.

## GitHub CLI Delivery Review

Run `gh skill publish --dry-run` through the final-tree release preflight before packaging creates `dist/` and before ignored research or installed skill copies exist. The preview publisher scans the working directory instead of limiting validation to tracked files.

The tag workflow performs an exact-tag install before draft creation. The release event workflow performs both the public versionless install and a previous-release update on ephemeral runners hosted by GitHub with read-only repository permission. Each operation uses a runner temporary directory and disposable user home, and it never executes installed instructions or scripts.

The abandonment workflow requires an annotated same-commit marker before deleting only an unpublished draft. Test its state classifier with absent, matching, lightweight, wrong-commit, missing-draft, and published-release cases when the workflow or tag rules change.

`scripts/verify-gh-skill-install.mjs` verifies an already installed copy. It accepts the explicit-tag and resolved-release metadata forms for the same expected tag, then checks the source repository, canonical skill path, tree SHA, unpinned state, file inventory, portable frontmatter fields, `SKILL.md` body, and byte identity of every other runtime file.

The contained update job compares the previous and current skill directory Git tree IDs. A matching tree skips GitHub CLI update and runs the existing strict verifier against the current source while expecting the previous tag metadata. A different tree runs the update and requires current tag metadata and current runtime content.

The skill update fixture requires a source check and dry run before replacement, treats a pin as a separate decision, rejects automatic force on missing metadata, limits the target to this skill, and verifies the source and path without executing installed content.

Do not run a remote install test against a maintainer's normal user profile merely because `--dir` points into a sandbox. GitHub CLI also records install state below the effective user home. Use a disposable operating system profile, container, virtual machine, or ephemeral CI runner.

After publication, confirm the workflow result and run a read-only update check from the disposable installation when manual verification is needed:

```shell
gh skill update coordinate-github-repositories --dry-run --dir PATH_TO_DISPOSABLE_SKILLS
```

Treat `PATH_TO_DISPOSABLE_SKILLS` as an instruction placeholder, not a literal maintained path.

Before release, test already-current, documentation-only equivalent, available-update, pinned, missing-metadata, existing-destination, and approved recovery paths in a disposable user profile. No case may write to the maintainer's normal skill folders or lockfile.

## Release Integrity

`npm run package -- vX.Y.Z` creates the three ZIPs and `SHA256SUMS`. Recompute each SHA-256 digest during inspection and compare it with the manifest.

The release workflow uses `actions/attest@v4` to attest each ZIP after packaging and before upload. Verify a published ZIP with:

```shell
gh attestation verify ./coordinate-github-repositories-vX.Y.Z.zip -R TechSpokes/skill-github-repositories-coordination
```

An attestation proves source and build provenance, not artifact safety. Content inspection and release approval remain separate requirements.

## Installation Usability Review

Version v1.0.1 was reviewed against the latest prior TechSpokes skill release and these beginner-facing invariants:

| Invariant | Evidence | Result |
|---|---|---|
| One default package is recommended | README and install guide lead with the standalone ZIP | Pass |
| No terminal is required | Agent-assisted and browser-only paths appear before CLI details | Pass |
| Package choice is understandable | Plain-language three-package table | Pass |
| Wrong GitHub download is prevented | Source code archive warning | Pass |
| Hidden folders are navigable | File Explorer and Finder instructions | Pass |
| Global scope is explicit | Personal-folder table and `--scope user` examples | Pass |
| Installation is verifiable | Final tree and copyable verification prompt | Pass |
| Download stays version-aligned | Validator checks the README and install guide asset URL | Pass |

## Activation Review

`tests/fixtures/activation.md` contains positive and negative prompts. Review the frontmatter description for these boundaries:

- Activate for access, portfolio inventory, findability, routing, cross-repository coordination, lifecycle evidence, tool fit, feedback from a skill run, a first conversation after installation, and this skill's own installation or update.
- Activate for software and non-code repository work.
- Activate when the user asks which existing functionality or knowledge may contribute to an outcome or become difficult to reconstruct.
- Activate when observed repository artifact naming, placement, or entry points prevent humans, agents, or tools from finding shared work.
- Do not take over routine implementation inside one known repository.
- Do not take over structural dependency tracing inside one known repository.
- Do not take over local code naming, formatting, private-method, or API conventions inside one known repository.
- Do not expand into general productivity, personnel, or psychology advice.
- Do not accept destructive lifecycle conclusions based only on inactivity.

## Behavior Review

A static forward review on 2026-07-17 mapped each fixture to explicit runtime instructions. A fresh-agent comparison on 2026-07-18 exercised access denial, ambiguous portal tools, and beginner non-code teaching. See [the v1.1.0 forward evaluation](evaluations/v1.1.0.md) for sanitized historical outputs, iteration history, and proof boundaries.

Current behavior fixtures cover short onboarding, correction of tentative context, progressive discovery, findability convention proposals, benefit discovery, goal survival, workspace roles, temporary material, simple feedback intake, and controlled updates of this skill. Convention cases cover human discussion before adoption, exact pilot authority, consumer verification, portfolio promotion through reviewed snapshots, per-target revalidation, non-code evidence, and a no-change result. Benefit cases cover functionality reuse, indirect chains, local and remote evidence, non-code reconstruction, confirmation and correction, conversation-only use, owner routing, and a no-supported-candidate result. The fixtures also require the optional writing quality pass to preserve meaning and protected literals without widening the skill into general writing work.

## v1.12.0 Findability Convention Forward Review

On 2026-07-20, four fresh Codex subagents produced bare responses before reading the candidate runtime, then read only `SKILL.md` and the direct references required by their synthetic case. The tasks prohibited network access, credentials, external services, external repositories, unrelated file reads, and writes. The host did not expose a precise model identifier.

- The proposal pass improved from four full and one partial invariant to all five invariants by making meaning, scope, exclusions, and the exact human decision explicit.
- The exact pilot pass improved from two full and two partial invariants to all four invariants by separating convention acceptance from write authority and preserving missing target and consumer details as prerequisites.
- The portfolio promotion pass met all five invariants, but its review exposed that local instructions were named after acceptance rather than before the proposal. The candidate reference was revised, and the same reviewer confirmed the sequencing repair.
- The non-code no-change pass met all four invariants before and after loading the skill. The assisted response made the no-change threshold and the distinction between a retrieval path and supporting evidence explicit.

The blanket-convention security prompt remained inert because the maintainer session exposes credentials, network access, external filesystem access, and mutating tools. Static review mapped the case to the human acceptance, target snapshot, per-target revalidation, local instruction, and exact write authority controls.

The complete sanitized prompts, outputs, scores, configuration, repair, and limits are recorded in [the v1.12.0 forward evaluation](evaluations/v1.12.0.md). These passes show the candidate can produce the intended decisions in this observed configuration; they do not prove actual retrieval, user comprehension, portfolio fit, or behavior across other models and hosts.

## v1.7.0 Benefit Relationship Forward Review

On 2026-07-19, three fresh Codex subagents produced a bare response before reading the candidate runtime, then read only `SKILL.md`, `benefit-relationships.md`, and `goal-and-authority.md` and produced a skill-assisted response. Each task prohibited other repository reads, network access, external services, and writes. The host did not expose a precise model identifier.

- The functionality pass improved from eight full criteria, one partial criterion, and one missed criterion to all ten criteria. The skill-assisted response added scoped confirmation, maintenance, recovery, and explicit evidence-repository ownership.
- The indirect-chain pass improved from seven full and two partial criteria to all nine criteria. The skill-assisted response evaluated each hop, rejected automatic transitivity, identified the unsupported final hop, and returned no supported end-to-end candidate.
- The conversation-only non-code pass met all eight criteria both before and after loading the skill. The skill-assisted response added explicit candidate status and distinguished preserved output from the rationale that may remain difficult to reconstruct.

The rubric was visible before each bare response, which strengthened the baseline and limits causal comparison. The complete sanitized prompts, outputs, scores, configuration, and limits are recorded in [the v1.7.0 forward evaluation](evaluations/v1.7.0.md).

The private-candidate security prompt remained inert because the maintainer session exposes credentials, network access, external filesystem access, and mutating tools. Static review mapped the case to the runtime confirmation, visibility, and publication boundaries, and deterministic validation registered it without execution.

## v1.4.0 Interaction Forward Review

On 2026-07-19, four fresh Codex subagent passes read only the candidate runtime skill and directly applicable reference, with no network calls, repository inspection, or writes. The host did not expose a model identifier, so the results apply only to this observed configuration.

- The blank start pass explained the capability and limits in one sentence and asked one easy opening question without beginning repository discovery.

- The concrete request pass skipped generic onboarding, compared the stated options from supplied context, preserved unknowns, and recommended no change pending evidence.

- The progressive discovery pass preserved the user's ownership correction, offered one optional read-only comparison, and did not widen scope or create work.

- The handoff pass preserved the outcome, corrected ownership, tentative connection, evidence boundary, unknowns, and next approval without restarting onboarding or granting new authority.

The normal maintainer session cannot prove the containment required for model-based adversarial execution, so silent profiling and repeated dismissal fixtures remained inert and were checked only through deterministic registration and static review. Keeping those prompts inert protects credentials, networks, and unrelated files from the security evaluation itself.

These passes show that the candidate instructions can produce the intended interaction in the observed host. They do not prove user comfort, question burden, time to first value, or behavior across other models and hosts; those outcomes require consented participant observation.

## v1.5.0 Goal and Authority Forward Review

On 2026-07-19, four fresh Codex subagent passes read only the candidate runtime skill and directly applicable references. The host exposed broader file, network, and write tools, but each task prohibited repository inspection beyond those runtime files, network use, writes, and external actions; the reported work contained only the permitted reads and synthetic responses. The host did not expose a precise model identifier, so the results apply only to this observed configuration.

- The task and goal conflict pass stopped a superseded six-issue procedure after new evidence showed that the existing coordination surface already covered the work, preserved no change, and connected the deviation to lower duplication and maintenance.

- The workspace roles pass identified the current skill repository as the only implementation target, kept two examples as read-only evidence, and treated possible upstream feedback as unapproved future work requiring an exact destination and public text decision.

- The handoff pass preserved the intended benefit, current task, purpose link, active workspace, evidence-only source, ownership, tentative evidence, authority, privacy boundary, unknowns, completed verification, and next verification without restarting discovery or granting authority.

- The valid goals pass offered a useful partial public report based only on confirmed facts, omitted an uncertain private relationship, deferred dependent conclusions, and retained exact publication approval.

The passes scored observable decisions rather than wording or repetition of a goal sentence. They show that the candidate instructions can preserve the goal and authority contract in these synthetic cases, but they do not prove long-horizon behavior, real user benefit, or behavior across other models and hosts.

The optional Agent Skills quick validator could not start because the host Python environment lacks PyYAML. No global dependency was installed merely to change that environment; the repository's own skill, frontmatter, direct-reference, manifest, fixture, and package validators passed, but that does not count as an external-validator pass.

## v1.6.0 Writing Quality Forward Review

On 2026-07-19, four fresh Codex subagent passes read only the candidate `SKILL.md` and, when applicable, the optional writing quality reference. The tasks prohibited all other repository reads, network use, external tools, and writes. The host did not expose a precise model identifier, so the results apply only to this observed configuration.

- The activation pass loaded the optional reference for a requested review of generated coordination files and handed an unrelated novel paragraph to a general writing workflow without loading the reference.
- The protected language pass retained the genuine contrast between evidence and authority, the exact command and flag `gh skill install --scope user`, the `read-only` compound, and the approved source boundary while splitting the sentence.
- The first quality pass preserved all safety results and replaced the vague harm claim, but it coined the unnecessary compound `repository-instruction injection`. The runtime and maintainer rules were tightened to prefer an ordinary verb phrase over a newly coined compound label.
- A fresh retry replaced every dense test label with ordinary verb phrases, preserved all five scenario types and safety results, bounded the claims to the tested scenarios, and introduced no new compound label.

These passes show that the optional route and repair sequence can work in the observed synthetic cases. They do not prove comprehension for every reader, quality across other models or hosts, or authorship from style. The reviewed corpus and maintainer criteria remain the release ground truth; model output is supplementary evidence.

## v1.6.1 Repository Review Forward Checks

On 2026-07-19, three fresh Codex subagent checks read only the candidate `SKILL.md` and the direct references required by each task. The checks prohibited all other repository reads, network access, external repositories, credentials, and mutating tools. The host did not expose a precise model identifier, so the results apply only to this observed configuration.

- The activation check loaded the optional writing reference for a requested final review of generated coordination files, handed unrelated novel editing to a general writing workflow, and left the reference unloaded during ordinary coordination across three repositories.
- The protected language check preserved `gh skill install --scope user`, `repository-derived`, `cross-repository`, and `read-only`. It rejected retrieved instructions as authority, required separate authority for each target, and replaced a vague safety claim with the risk of changing repository content outside the approved scope.
- The behavior check kept documentation edits limited to repository A, treated repositories B and C as evidence only, inferred no mutation, and required separate publication approval for the exact artifact and audience.
- The first behavior check used the old dense phrase `target-specific authority` in its explanatory note. A focused retry replaced that phrase with ordinary language and confirmed that the defect affected the prose, not the preserved behavior contract.

These checks support the optional activation boundary, preservation rules, and editorial equivalence in the observed synthetic cases. They do not measure comprehension, task completion time, user trust, or behavior across other models and hosts. The deterministic corpus and repository validation remain the primary release evidence.

## v1.6.2 README Product Page Review

Issue [#39](https://github.com/TechSpokes/skill-github-repositories-coordination/issues/39) defined separate acceptance criteria for a compact conversion layer and a product home that routes readers through progressive discovery. The criteria covered problem recognition, outcome, audience, differentiation, trust, evidence limits, one primary action, fit, typical results, persistence, and the boundary between end-user and maintainer routes.

On 2026-07-19, three fresh Codex subagent checks read only the candidate `README.md`. The tasks prohibited other repository reads, network access, credentials, and writes. The host did not expose a precise model identifier, so the results apply only to this observed configuration.

- The newcomer check identified the problem, audience, value, differentiation, trust signals, founding evidence limit, and copyable install action without hidden context.
- The product navigation check found every requested route and identified ambiguity around system-of-record status, durable indexes, repeated links, and the transition from user guidance to maintainer material.
- The agent interpretation check found one primary action and no contradiction, but it showed that the original opening could imply automatic discovery more strongly than the later access boundary supported.

The revision stated that the skill is not a central source of truth, defined the typical result and consent required for a durable artifact, qualified discovery to repositories the user chooses, added a concrete example, simplified evidence language, removed repeated navigation, and separated `Use the Skill` from `Maintain and Contribute`.

Two fresh checks reviewed the revised document, followed by one exact-tree check after the final audience and evidence edit. The final check passed the complete landing, fit, navigation, persistence, compatibility, evidence, scanning, authority, and source-of-truth criteria with no blocking or material finding.

These checks support first-pass comprehension and navigation in the observed host. They do not measure conversion rate, installation completion, user trust, independent adoption, or behavior across every reader and agent; those outcomes require live user evidence.

## v1.6.3 Documentation-Only Update Correction

The published v1.6.2 versionless install passed, while its contained update job reported `All skills are up to date` and retained the v1.6.1 metadata. The Git trees for `skills/coordinate-github-repositories/` were identical in v1.6.1 and v1.6.2, so the unchanged installation was correct and the final metadata expectation was not.

The v1.6.3 workflow compares the two skill directory Git tree IDs before updating. Local checks confirmed that v1.6.1 and v1.6.2 share one tree ID, while v1.6.0 and v1.6.1 have different tree IDs.

This correction does not weaken a runtime-changing update check. A changed tree still runs GitHub CLI update, requires current tag metadata, and compares installed content with the current source.

## Adversarial Review

`tests/fixtures/adversarial-scenarios.md` covers untrusted repository instructions, private data in public output, private relationship promotion, access denial, ambiguous tools, broad writes, authority expansion, blanket convention adoption, goal loss, silent profiling, repeated suggestions, commercial conflicts, and feedback publication. Review the affected adversarial cases for every security-relevant runtime change and every minor or major release.

Treat adversarial prompts as inert data. Deterministic validation reads fixtures as text and never executes their instructions. Run model-based security review only in a disposable sandbox with no credentials, network access, external filesystem access, or mutating tools, and verify after the run that no file or system outside the disposable workspace changed.

Never run security cases against the maintainer's normal machine session, global credentials, live repositories, or unrelated files. If the host cannot prove the required containment, stop the model-based case and retain only the inert deterministic review.

Use the [threat model](THREAT-MODEL.md) to identify assets, trust boundaries, controls, stop conditions, and review triggers. A serious unresolved finding blocks the affected launch or release approval.

The evidence lives in the canonical `SKILL.md` and directly linked files under `skills/coordinate-github-repositories/references/`. Any behavior change must update the affected fixture and this review record or explain why the invariant no longer belongs.

## Cross-Host Boundary

Host paths and plugin manifests can be validated deterministically. Model activation and response quality still vary by host and version. Reported compatibility therefore means the package follows the portable format and the workflow has a conversation-only fallback, not that every host produces identical responses.
