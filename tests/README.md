# Test Fixtures

## Use

Use `activation.md` to review trigger boundaries. Use
`behavior-scenarios.md` to review safety, adaptation, portability, and output
invariants. Use `adversarial-scenarios.md` to review injection containment,
privacy, access denial, ambiguous tools, broad mutation, and recommendation
independence.

`tests/evals/cases.json` registers every fixture case with a stable ID and user
segment. Run `npm run test:eval` to fail on missing fixture registration,
segment gaps, malformed scenarios, or drift between activation tables and the
registry.

## Boundary

Fixtures are maintenance evidence. Runtime agents do not need to load them for
ordinary coordination work.
