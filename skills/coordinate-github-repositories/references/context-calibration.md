# Context Calibration

Load this reference when the user's work pattern, existing organization, change tolerance, first conversation, or progressive discovery could alter the recommendation. Skip questions whose answers are already explicit or observable.

## Goal

Build the smallest working context model needed for the current repository coordination decision. This is task calibration, not personal profiling.

## Contents

- [Defined Terms](#defined-terms)

- [Evidence Order](#evidence-order)

- [First Conversation](#first-conversation)

- [Working Profile](#working-profile)

- [Context Dimensions](#context-dimensions)

- [Progressive Discovery](#progressive-discovery)

- [Question Rule](#question-rule)

- [Persistence Rule](#persistence-rule)

## Defined Terms

A working hypothesis is the agent's temporary and correctable understanding of the current outcome, useful existing practice, observed friction, relevant boundary, and important unknowns. It is not a durable user or organization profile.

Proactivity means an evidence supported suggestion or bounded discovery step within the user's current outcome. It does not grant authority for monitoring, persistence, broader access, mutation, publication, or unrelated work.

## Evidence Order

Use evidence in this order:

1. The user's stated goal, constraints, and preferences.

2. Applicable organization and repository instructions.

3. Existing artifacts such as inventories, issue forms, project views, documentation, naming conventions, and folder structure.

4. Bounded questions whose answers would change the next step.

5. Explicit unknowns when evidence is unavailable.

Do not infer competence, motivation, reliability, or personal worth from activity, age, naming, language, documentation, or unfinished work.

## First Conversation

Use this branch only when the user asks what to do after installation or asks what the skill can help with without stating a concrete outcome. Skip it when the user already provides enough context for the normal workflow.

Explain in one sentence that the skill can help understand and coordinate repository centered work, can begin with conversation alone, and will not inspect or change anything without the applicable access and authority.

Ask one opening question: "What made you install this skill today, or what would you like to be easier?"

Ask no more than two initial follow-up questions by default before reflecting the working hypothesis and offering a bounded first step. This is a burden limit, not a requirement to ask three questions.

Choose follow-up questions only when their answers change the next decision:

- Ask what kind of work the repositories help produce and offer examples such as software, research, writing, operations, publishing, or a mix.

- Ask how the person finds or coordinates the work now and what already works well enough to preserve.

- Ask whether the current outcome concerns the person's work, team work, client work, community work, or a mix when ownership changes the next step.

- Ask where the person loses the most time or context.

- Ask what the agent must not inspect, change, retain, or make public before a proposed evidence source makes that boundary relevant.

Do not ask for a job title, complete portfolio description, or business profile by default. Accept approximate, unknown, or skipped answers and derive observable facts from authorized artifacts instead of asking the person to repeat them.

Reflect the interpreted outcome, useful current practice, main friction, relevant boundary, and important unknowns as a tentative working hypothesis. Make correction easy before proposing one small next step.

Complete the first conversation when the person can correct the working hypothesis and choose one bounded next step. Do not require an inventory, tool connection, repository access, or durable profile.

If no human is available to answer, preserve unknowns and prepare only the short ordered question set needed for the next decision. Perform only already authorized and useful read-only work, and do not begin a broad portfolio scan or invent business context.

## Working Profile

Keep this model in working context unless the user asks for a durable artifact:

```yaml
context:
  requested_outcome: ""
  work_types: []
  scale:
    repositories: unknown
    projects: unknown
    accounts: unknown
    organizations: unknown
  collaboration: unknown
  existing_systems: []
  observed_frictions: []
  constraints: []
  change_tolerance: unknown
  agent_capabilities: []
  unknowns: []
  persistence: ephemeral
```

The schema is a reasoning aid. Present prose when YAML would burden the user.

## Context Dimensions

### Requested Outcome

Identify the decision the user wants to make now. Separate it from a larger aspiration such as "organize everything."

Useful distinctions include:

- Diagnose access.

- Build or repair an inventory.

- Find or understand work.

- Route a request.

- Coordinate a multi-repository outcome.

- Review lifecycle candidates.

- Choose a tool or practice.

- Establish governance.

### Work Types

Ask what the repositories help produce. Allow software, documentation, writing, publishing, research, data, operations, learning, websites, presentations, or a mixed portfolio.

### Scale and Topology

Estimate only the scale needed for the decision:

- Repository and project counts may differ.

- One project may span several repositories.

- One repository may contain several workstreams.

- Local folders and remote repositories may not correspond one to one.

- Personal accounts, organizations, clients, and public mirrors may have different visibility rules.

### Collaboration and Ownership

Determine whether the work belongs to one person, a team, a client, a community, or an organization. Identify who owns decisions, maintenance, and recovery.

### Existing System

Look for useful practices before proposing a replacement:

- Folder or naming conventions.

- README indexes or knowledge maps.

- Issues, labels, milestones, Projects, or discussions.

- Spreadsheets, databases, documents, or catalogs.

- Custom repository properties.

- Local structured records or generated reports.

- Manual reviews and recurring rituals.

### Friction

Record observed friction rather than imagined optimization:

- Missing access or uncertain coverage.

- Poor findability.

- Duplicate or ambiguous identity.

- Unclear ownership or routing.

- Cross-repository dependency gaps.

- Forgotten or unknown lifecycle state.

- Excessive manual maintenance.

- Tool overload or inconsistent sources of truth.

### Constraints and Change Tolerance

Consider privacy, client boundaries, publication, portability, cost, offline work, accessibility, learning burden, platform support, and maintenance capacity. Distinguish advisory work, manual improvement, native configuration, repository local automation, and shared automation.

## Progressive Discovery

Use progressive discovery after the first conversation or during later authorized work when new evidence may improve the current outcome.

Learn only from explicit statements, corrections, current decisions, and bounded authorized artifacts. Keep confirmed facts separate from tentative inferences, and record provenance, confidence, and unknowns when the distinction affects a decision.

When surfacing a newly inferred connection, state the supporting evidence, confidence, important unknowns, and why the connection may help the current outcome.

Follow this loop:

1. Begin from the current outcome and an authorized evidence source.

2. Update the ephemeral working hypothesis without expanding its purpose.

3. Reflect only a change that affects a recommendation, authority boundary, or useful next step.

4. Offer one related optional next step by default and explain its connection to the current outcome.

5. Expand discovery only when the new scope is relevant, the evidence source is authorized, and the user can correct, decline, or stop the direction.

6. Return to the user's goal after each meaningful discovery and stop when further evidence would not change the decision.

Renew the scope before inspecting another account, organization, repository group, local folder, private source, or unrelated workstream.

Stop or ask before continuing when:

- The user declines or the current goal is satisfied.

- Relevance becomes weak or evidence is already sufficient.

- Authority or a privacy boundary is uncertain.

- Access, cost, or delay must expand materially.

- A durable profile, mutation, publication, monitoring, or unrelated repository implementation would begin.

- The agent would repeat a dismissed suggestion or ask for context that is already explicit and current.

Do not infer competence, motivation, confidential business relationships, lifecycle state, value, or authority from repository activity or naming. Do not make the user manage an agent generated backlog merely because more work was noticed.

When summarizing or handing off the work, preserve the current outcome, confirmed context, tentative hypotheses, user corrections, authority and privacy boundaries, important unknowns, and next verification. Do not restart generic onboarding, promote an inference to fact, or create a durable profile merely to transport context.

## Question Rule

Ask a question only when at least two plausible answers lead to materially different recommendations or safety boundaries. Explain the decision the answer will affect. Otherwise proceed with a stated assumption or unknown.

## Persistence Rule

Do not create a durable user or organization profile by default. If persistence would help, propose the exact fields, location, visibility, owner, and refresh rule. Write it only after the user explicitly approves and can review it.
