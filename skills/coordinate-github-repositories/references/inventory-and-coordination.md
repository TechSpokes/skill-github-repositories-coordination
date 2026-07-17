# Inventory and Coordination

Load this reference for access inventories, portfolio records, repository
routing, cross-repository outcomes, or lifecycle reviews.

## Choose the Smallest Artifact

Do not create a full portfolio database when the user only needs an access
check, routing decision, or one coordination record.

Useful artifact levels include:

- Access matrix for intended versus visible scope.
- Lightweight repository index.
- Structured portfolio records.
- Coordination issue or document.
- Native project view.
- External catalog or manager application.

## Access Inventory

Record intended scope separately from observed access:

```yaml
access:
  intended_accounts: []
  intended_organizations: []
  observed_sources: []
  visible_repositories: unknown
  missing_or_uncertain: []
  read_capability: unknown
  write_capability: unknown
  admin_capability: unknown
  evidence_time: ""
```

Do not interpret missing visibility as proof that a repository does not exist.
Possible causes include selection scope, organization approval, token audience,
permissions, synchronization delay, archived visibility, or tool limitations.

## Inventory Identity

Prefer stable remote identifiers and canonical URLs where available. Keep local
paths as observations, not global identity. Represent mirrors, forks, local-only
work, renamed repositories, and several local copies explicitly.

## Minimal Portfolio Record

Offer a neutral record only when the user lacks a working schema:

```yaml
repository:
  id: ""
  name: ""
  owner_scope: ""
  visibility: unknown
  remote_url: ""
  local_locations: []
  purposes: []
  roles: []
  lifecycle: unknown
  relationships: []
  evidence: []
  confidence: low
  last_observed: ""
  unknowns: []
```

Extend it only for a concrete decision. Preserve the user's existing schema and
vocabulary when present.

## Safe Inventory Workflow

1. Define intended scope and evidence sources.
2. Discover candidates without mutation.
3. Normalize identity while retaining source observations.
4. Record provenance, time, confidence, and unknowns.
5. Stage new or conflicting records for review.
6. Validate uniqueness, required fields, relationships, and visibility.
7. Promote without silently overwriting reviewed knowledge.
8. Derive reports from canonical records.

Keep generated snapshots separate from hand-reviewed meaning.

## Portfolio Review

Use candidate states rather than conclusions:

- Active or maintained.
- Paused or waiting.
- Reference or reusable source.
- Superseded candidate.
- Duplicate candidate.
- Archive candidate.
- External or mirror.
- Unknown.

Require positive evidence and an owner decision before transfer, consolidation,
archiving, visibility change, or deletion. Define recovery before action.

## Cross-Repository Work Contract

Keep one coordination record for the shared outcome and repository-owned records
for implementation. A useful coordination record states:

- Outcome and why several repositories are involved.
- Scope and explicit exclusions.
- Owning person or decision role.
- Participating repositories and their responsibilities.
- Evidence and assumptions.
- Dependencies and ordering.
- Linked implementation records.
- Completion and verification criteria.
- Privacy and publication boundaries.
- Recovery or rollback where relevant.

Avoid copying volatile implementation state into the coordination record when
links or native state already provide it.

## Automation Gate

Automate only when the need is repeated and stable, inputs are well-defined, an
owner accepts maintenance, permissions are limited, failures are observable,
recovery is defined, and a bounded pilot can prove value.

Prefer idempotent behavior and report-only or dry-run modes. Do not automate
destructive lifecycle decisions from inactivity or missing evidence.
