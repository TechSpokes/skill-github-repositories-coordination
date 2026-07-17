# Context Calibration

Load this reference when the user's work pattern, existing organization, or
change tolerance could alter the recommendation. Skip questions whose answers
are already explicit or observable.

## Goal

Build the smallest working context model needed for the current repository
coordination decision. This is task calibration, not personal profiling.

## Evidence Order

Use evidence in this order:

1. The user's stated goal, constraints, and preferences.
2. Applicable organization and repository instructions.
3. Existing artifacts such as inventories, issue forms, project views,
   documentation, naming conventions, and folder structure.
4. Bounded questions whose answers would change the next step.
5. Explicit unknowns when evidence is unavailable.

Do not infer competence, motivation, reliability, or personal worth from
activity, age, naming, language, documentation, or unfinished work.

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

Identify the decision the user wants to make now. Separate it from a larger
aspiration such as "organize everything."

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

Ask what the repositories help produce. Allow software, documentation, writing,
publishing, research, data, operations, learning, websites, presentations, or a
mixed portfolio.

### Scale and Topology

Estimate only the scale needed for the decision:

- Repository and project counts may differ.
- One project may span several repositories.
- One repository may contain several workstreams.
- Local folders and remote repositories may not correspond one-to-one.
- Personal accounts, organizations, clients, and public mirrors may have
  different visibility rules.

### Collaboration and Ownership

Determine whether the work is solo, team-owned, client-owned, community-run, or
organization-governed. Identify who owns decisions, maintenance, and recovery.

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

Consider privacy, client boundaries, publication, portability, cost, offline
work, accessibility, learning burden, platform support, and maintenance
capacity. Distinguish advisory-only, manual improvement, native configuration,
repository-local automation, and shared automation.

## Question Rule

Ask a question only when at least two plausible answers lead to materially
different recommendations or safety boundaries. Explain the decision the answer
will affect. Otherwise proceed with a stated assumption or unknown.

## Persistence Rule

Do not create a durable user or organization profile by default. If persistence
would help, propose the exact fields, location, visibility, owner, and refresh
rule. Write it only after the user explicitly approves and can review it.
