# Portal Interoperability

## Position

Coordinate GitHub Repositories is a reasoning and coordination layer. It is not a service catalog, internal developer portal, repository manager, identity provider, policy engine, or system of record.

Use it before a portal when the immediate problem is access diagnosis, bounded inventory, portfolio understanding, routing, tool fit, or a cross-repository decision. Use a portal when sustained organizational needs justify shared models, integrations, ownership, operations, and maintenance.

## Honest Option Comparison

Compare four serious candidates:

- Keep and document the current system.
- Use this skill for advisory coordination and a bounded artifact.
- Improve an existing native or local coordination surface.
- Pilot or extend a portal when repeated evidence and an owner justify it.

Evaluate each option with the same outcome, workflow, scale, permission, privacy, portability, reversibility, maintenance, learning, recovery, and evidence criteria.

## Front-Porch Handoff

The skill may prepare reviewed input for a portal without becoming its source of truth. A handoff should contain only the fields needed for the receiving decision:

```yaml
portal_handoff:
  outcome: ""
  receiving_owner: ""
  intended_system: ""
  repositories: []
  purposes: []
  relationships: []
  provenance: []
  confidence: low
  unknowns: []
  visibility_boundary: ""
  observed_at: ""
  refresh_owner: ""
  approvals: []
```

Prefer stable repository identities. Keep local paths, credentials, raw tool output, and unnecessary private relationships out of the handoff.

## Capability and Tool Rules

Identify actual capabilities before selecting a connector or MCP surface. When several servers expose similar operations, name the fully qualified tool and verify its account or installation audience, repository selection, permission, freshness, and target.

Do not infer write or administrative authority from read access. Do not widen permission automatically when a portal, catalog, or connector returns partial data.

## Graceful Degradation

### Conversation Only

Prepare an advisory comparison and a manual handoff checklist. State that repositories and portal state were not inspected.

### Read Only

Produce a draft or local reviewed artifact. Do not claim the receiving portal was updated.

### Missing or Denied Access

Record partial visibility, unknowns, and a least-privilege verification path. Do not treat missing results as proof of absence.

### Stale or Conflicting Data

Preserve source and observation time. Route the conflict to the system owner instead of silently overwriting reviewed meaning.

### Write Capable

Confirm the exact target, schema, visibility, ownership, permission, reversibility, and verification before a portal write. Keep the authoritative state in the system its owner maintains.

## Stop Conditions

Stop before handoff when the receiving owner is unknown, the artifact mixes visibility boundaries, the schema would force a code-only taxonomy, access is broader than justified, evidence freshness is unknown, or recovery cannot be described.

Verify current product, connector, permission, schema, and pricing facts from primary sources at execution time. Keep volatile details in the dated runtime adapter reference rather than this durable positioning note.
