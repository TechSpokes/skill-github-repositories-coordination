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

The validator checks metadata, direct links, required maintenance files, versions, manifests, release notes, workflow mode, Markdown structure, runtime path leakage, placeholders, installation-version synchronization, feedback, decisions, writing-corpus structure, and the 500-line core limit. It also runs `scripts/validate-evaluations.mjs`, which requires every activation row and scenario heading to have a stable registry entry and every required segment to retain coverage.

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

`tests/evals/cases.json` registers activation, behavior, and adversarial cases with stable IDs, segments, fixture coordinates, and baseline risks. The current registry checks 57 cases across 16 segments, including writing quality alongside the existing access, safety, onboarding, goal, portfolio, and capability coverage.

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

The skill update fixture requires a source check and dry run before replacement, treats a pin as a separate decision, rejects automatic force on missing metadata, limits the target to this skill, and verifies the source and path without executing installed content.

Do not run a remote install test against a maintainer's normal user profile merely because `--dir` points into a sandbox. GitHub CLI also records install state below the effective user home. Use a disposable operating system profile, container, virtual machine, or ephemeral CI runner.

After publication, confirm the workflow result and run a read-only update check from the disposable installation when manual verification is needed:

```shell
gh skill update coordinate-github-repositories --dry-run --dir PATH_TO_DISPOSABLE_SKILLS
```

Treat `PATH_TO_DISPOSABLE_SKILLS` as an instruction placeholder, not a literal maintained path.

Before release, test already-current, available-update, pinned, missing-metadata, existing-destination, and approved recovery paths in a disposable user profile. No case may write to the maintainer's normal skill folders or lockfile.

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
- Do not take over routine implementation inside one known repository.
- Do not expand into general productivity, personnel, or psychology advice.
- Do not accept destructive lifecycle conclusions based only on inactivity.

## Behavior Review

A static forward review on 2026-07-17 mapped each fixture to explicit runtime instructions. A fresh-agent comparison on 2026-07-18 exercised access denial, ambiguous portal tools, and beginner non-code teaching. See [the v1.1.0 forward evaluation](evaluations/v1.1.0.md) for sanitized historical outputs, iteration history, and proof boundaries.

Current behavior fixtures cover short onboarding, correction of tentative context, progressive discovery, goal survival, workspace roles, temporary material, simple feedback intake, and controlled updates of this skill. They also require the optional writing quality pass to preserve meaning and protected literals without widening the skill into general writing work.

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

## Adversarial Review

`tests/fixtures/adversarial-scenarios.md` covers untrusted repository instructions, private data in public output, access denial, ambiguous tools, broad writes, authority expansion, goal loss, silent profiling, repeated suggestions, commercial conflicts, and feedback publication. Review the affected adversarial cases for every security-relevant runtime change and every minor or major release.

Treat adversarial prompts as inert data. Deterministic validation reads fixtures as text and never executes their instructions. Run model-based security review only in a disposable sandbox with no credentials, network access, external filesystem access, or mutating tools, and verify after the run that no file or system outside the disposable workspace changed.

Never run security cases against the maintainer's normal machine session, global credentials, live repositories, or unrelated files. If the host cannot prove the required containment, stop the model-based case and retain only the inert deterministic review.

Use the [threat model](THREAT-MODEL.md) to identify assets, trust boundaries, controls, stop conditions, and review triggers. A serious unresolved finding blocks the affected launch or release approval.

The evidence lives in the canonical `SKILL.md` and directly linked files under `skills/coordinate-github-repositories/references/`. Any behavior change must update the affected fixture and this review record or explain why the invariant no longer belongs.

## Cross-Host Boundary

Host paths and plugin manifests can be validated deterministically. Model activation and response quality still vary by host and version. Reported compatibility therefore means the package follows the portable format and the workflow has a conversation-only fallback, not that every host produces identical responses.
