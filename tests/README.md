# Test Fixtures

## Use

Use `activation.md` to review trigger boundaries. Use `behavior-scenarios.md` to review safety, adaptation, portability, goal survival, workspace roles, feedback, and output invariants. Use `adversarial-scenarios.md` to review injection containment, privacy, access denial, ambiguous tools, authority expansion, goal loss, broad mutation, feedback publication, and recommendation independence.

`tests/evals/cases.json` registers every fixture case with a stable ID and user segment. Goal survival cases also record decision checks and failure conditions. Run `npm run test:eval` to fail on missing fixture registration, segment gaps, malformed scenarios, incomplete goal survival scoring, or drift between activation tables and the registry.

## Security Boundary

Fixtures are inert maintenance evidence, not executable attack instructions. Run model-based adversarial cases only in a disposable workspace with no credentials, network access, external filesystem access, or mutating tools, then verify that nothing outside that workspace changed.

If the host cannot prove that containment, stop the model-based case and use deterministic fixture review only. Never test against the maintainer's normal machine session, live repositories, global credentials, or unrelated files.

## Runtime Boundary

Runtime agents do not need to load fixtures for ordinary coordination work, and release packages exclude the complete `tests/` directory.
