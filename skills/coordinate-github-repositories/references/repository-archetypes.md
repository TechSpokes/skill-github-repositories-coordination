# Repository Archetypes

Load this reference when classifying repositories, designing an inventory, or adapting coordination to non-code and mixed work.

## Separate Three Concepts

Do not collapse purpose, role, and lifecycle into one label.

- Purpose describes what outcome the repository supports.
- Role describes how it relates to other work.
- Lifecycle describes its current handling state.

A repository can have multiple purposes and roles. Keep lifecycle unknown until evidence or an owner decision establishes it.

## Open Purpose Archetypes

| Archetype | Typical outcomes | Useful evidence |
|---|---|---|
| Software product or service | Application, API, package, deployed service | Product docs, releases, deployment config |
| Reusable component | Library, template, starter, shared asset | Consumers, package metadata, usage docs |
| Infrastructure or automation | Environment, workflow, provisioning, operations | Runbooks, workflow files, ownership |
| Documentation or knowledge | Manuals, policies, reference, notes | Information architecture, publication path |
| Writing or publishing | Manuscript, editorial flow, publication assets | Draft structure, editorial status, output channel |
| Research or learning | Papers, experiments, literature, prototypes | Research question, methods, evidence, conclusions |
| Data work | Dataset, annotation, transformation, analysis | Data provenance, schema, license, refresh process |
| Operational workspace | Requests, administration, service tracking | Intake contract, state, owner, response process |
| Website or presentation | Public site, portfolio, slide or media source | Build or publishing process, audience |
| Archive or mirror | Historical record, vendor mirror, preserved source | Provenance, retention reason, update relationship |
| Mixed or unknown | Several outcomes or insufficient evidence | Explicit uncertainty and review owner |

These are reasoning aids, not mandatory stored values.

## Common Roles

- Primary source of truth.
- Delivery or publication surface.
- Shared component.
- Coordination surface.
- Evidence or research source.
- Generated mirror.
- Template or seed.
- Archive or historical reference.
- External dependency or fork.

## Evidence Discipline

Prefer explicit purpose statements, linked consumers, publishing configuration, issue contracts, and owner confirmation. Treat language statistics, recent activity, stars, and file counts as weak supporting evidence only.

Do not infer that:

- No code means no project.
- A broken build means abandoned work.
- Old activity permits archiving.
- A sparse README means low value.
- Similar names prove duplication.
- A fork or mirror is disposable.

## Existing Vocabulary

If the user already has categories, preserve them. Map them privately to these archetypes only when mapping helps compare or report. Propose vocabulary changes only when an ambiguity or missing term affects a decision.

## Minimal Classification Output

```yaml
repository:
  identity: ""
  purposes: []
  roles: []
  lifecycle: unknown
  evidence: []
  confidence: low
  unknowns: []
```

Keep classification optional. A routing or access problem may not need a portfolio taxonomy.
