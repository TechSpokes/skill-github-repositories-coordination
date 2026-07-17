# Tool Fit

Load this reference when the user asks what tool, practice, connector, catalog,
inventory, project surface, or automation would fit their situation.

## Start With the Problem

Name the smallest repository-centered problem before naming products:

- Access.
- Inventory.
- Findability.
- Portfolio understanding.
- Routing.
- Cross-repository coordination.
- Knowledge reuse.
- Lifecycle review.
- Governance.
- Tool overload.

If the actual problem is unrelated to repository coordination, explain the
boundary and hand off rather than expanding the skill into general productivity
advice.

## Candidate Categories

Generate candidates by capability before selecting a named product.

| Category | Best fit | Typical burden |
|---|---|---|
| Current manual practice | Rare or judgment-heavy work | Low setup, recurring attention |
| Documentation improvement | Shared conventions or a missing index | Low |
| GitHub-native feature | Issues, views, properties, discussion, or policy | Low to medium |
| Local structured inventory | Private cross-account discovery and review | Medium |
| Shared coordination surface | Routing and multi-repository outcomes | Medium |
| Knowledge or publishing system | Documentation, writing, research, and discovery | Medium |
| Connector or MCP surface | Agent read or action access | Medium |
| Repository-local automation | Stable repetition owned by one repository | Medium |
| Shared automation or catalog | Stable portfolio-wide need and ownership | High |
| Manager application | Persistent integration and operating model | High |

Always include the current system and no change as candidates.

## Fit Rubric

Evaluate each serious candidate against the same criteria:

| Criterion | Question |
|---|---|
| Outcome | Does it solve the observed problem? |
| Work type | Does it support the actual repository purposes? |
| Workflow | What useful practice would it preserve or disrupt? |
| Scale | Does it stay understandable at the observed scale? |
| Collaboration | Does it match ownership and participants? |
| Agent capability | Can the active agent use or explain it? |
| Permission | Are required privileges available and proportionate? |
| Privacy | Does it preserve visibility and publication boundaries? |
| Portability | Can essential knowledge survive a tool or agent change? |
| Reversibility | Can a pilot stop without damaging work? |
| Maintenance | Who owns updates, failures, and retirement? |
| Learning | Is the conceptual cost proportionate? |
| Recovery | Are errors observable and recoverable? |
| Evidence | Is the need observed or hypothetical? |

Do not hide a critical misfit inside an aggregate score. Explain decisive
tradeoffs in plain language.

## Adoption Ladder

Prefer the lowest level that solves the problem:

1. Keep the current system and document it.
2. Make a small manual or documentation improvement.
3. Configure an existing native feature.
4. Create a local private inventory.
5. Establish a coordination issue or project pattern.
6. Pilot repository-local automation.
7. Evaluate a connector, external catalog, or shared automation.
8. Build or adopt a manager application only with sustained evidence and an
   operating owner.

## Named Product Rule

Verify current official documentation when availability, installation path,
pricing, plan, limits, authentication, permissions, or integration behavior
affects the recommendation. Date the finding and state what may change.

## Recommendation Contract

Use concise prose unless structure improves the decision:

```yaml
recommendation:
  problem: ""
  evidence: []
  assumptions: []
  candidates:
    - option: ""
      fit: []
      misfit: []
      required_capabilities: []
      permissions: []
      maintenance_owner: ""
      reversibility: ""
      confidence: low
  preferred_option: ""
  no_change_option: ""
  pilot: ""
  approvals: []
  refresh_triggers: []
```

Recommend a bounded pilot with success, stop, and recovery criteria when change
is justified.
