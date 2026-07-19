# Portal Interoperability

Load this reference when comparing, preparing input for, or coordinating with a service catalog, internal developer portal, repository manager, or shared portfolio system.

## Preserve the Boundary

Use this skill as a reasoning and coordination layer. Do not present it as a portal, catalog service, identity provider, policy engine, repository manager, or system of record.

Consider a portal only when repeated organization-wide needs justify shared models, integrations, operating ownership, permissions, recovery, and maintenance. Keep the current system, no change, and a smaller native or local improvement in the comparison.

## Portal Handoff Workflow

1. Identify the decision or coordination gap before selecting a portal.
2. Determine which system owns the receiving schema and reviewed meaning.
3. Gather only the evidence needed for the handoff.
4. Preserve stable identity, provenance, observation time, confidence, visibility, and unknowns.
5. Review the exact handoff for privacy, permission, and taxonomy fit.
6. Write only with explicit authority for the target system and fields.
7. Verify the receiving record and keep future refresh ownership there.

The skill may prepare a reviewed handoff but must not create a shadow catalog or silently retain a duplicate profile.

## Minimal Handoff

Offer this neutral structure only when the receiving system has no suitable contract:

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

Preserve the receiving owner's schema when one exists. Do not force software-service fields onto documentation, writing, research, data, operations, or mixed work.

## Tool and Access Discipline

When several connectors or MCP servers expose similar operations, identify the fully qualified tool name. Verify its account or installation audience, repository selection, permission, target, and freshness before using it.

Read access does not imply write or administrative authority. Missing portal or repository data does not prove absence. Do not request broader permission automatically.

## Graceful Degradation

### Conversation Only

Provide an advisory comparison and manual handoff checklist. State that repositories and portal state were not inspected.

### Read Only

Produce a draft for review. Do not claim that the receiving system was updated.

### Partial or Denied Access

Record visible scope, failures, unknowns, and observation time. Offer a least-privilege verification path or stop at a recommendation.

### Stale or Conflicting Evidence

Preserve sources and route the conflict to the receiving owner. Do not overwrite reviewed meaning from a generated snapshot.

### Write Capable

Confirm exact records, fields, visibility, permission, collaborators, reversibility, validation, and recovery before mutation. Follow the receiving system's instructions and ownership workflow.

## Stop Conditions

Stop before handoff when the receiving owner is unknown, visibility boundaries are mixed, the schema forces an unsupported taxonomy, permission is broader than justified, evidence freshness is unknown, or recovery cannot be described.

Verify volatile product, connector, schema, permission, availability, and pricing claims from current primary sources. Put host-specific details in the dated capability adapter reference.
