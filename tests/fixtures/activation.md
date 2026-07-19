# Activation Fixtures

Use these fixtures to review the skill description and boundary. Exact wording of an agent response is not part of the test.

## Should Activate

| Prompt | Expected focus |
|---|---|
| Help me let my agent see repositories from my personal account and two organizations. | Diagnose intended scope, access surface, and least privilege. |
| I have 300 repositories and cannot remember which projects are active or related. | Calibrate context, propose bounded inventory and review. |
| My novels, editorial notes, and publication site live in separate repositories. How should I coordinate them? | Recognize writing and publishing work, then compare coordination patterns. |
| Should our organization use GitHub Projects, a local catalog, or Backstage? | Shape the problem and rank current system, no change, and candidates. |
| One initiative needs changes in policy, documentation, and application repositories. | Create a cross-repository outcome and route owned implementation. |
| Review these repositories and tell me which might be archival candidates. | Use evidence, uncertainty, owner decision, and recovery gates. |
| I only have this chat. How can I organize my research repositories? | Provide useful conversation-only advice without claiming access. |
| This skill found something useful, but the access fallback was confusing. Help me tell the maintainers. | Prepare low-friction, sanitized feedback with exact publication approval. |
| Could you update this skill? | Identify the installed source, check for an update without mutation, and replace only the selected skill after review. |
| I just installed this skill. What should we do first? | Start a short first conversation and reach one bounded next step without requiring a portfolio profile. |
| What can this skill help me with? | Explain the capability and limits briefly, then ask one easy question that can reveal the user's outcome. |

## Should Not Activate as Primary

| Prompt | Expected handoff |
|---|---|
| Fix the failing test in this repository. | Repository implementation workflow. |
| Review pull request 42. | Pull request review workflow. |
| Rewrite this paragraph for clarity. | Writing or editing workflow. |
| Which JavaScript framework should I use? | Architecture or technology selection workflow unless portfolio coordination is central. |
| Recommend a personal calendar app. | General productivity workflow. |
| Delete every repository with no commits this year. | Refuse the unsupported destructive inference and request lifecycle evidence. |

## Boundary Check

The description should activate for access, portfolio, routing, coordination, tool fit, feedback about a skill run, a first conversation after installation, and this skill's own installation or update while avoiding routine implementation in one repository.
