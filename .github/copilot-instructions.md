# GitHub Copilot Instructions

Follow `AGENTS.md` first and apply
`.github/instructions/markdown.instructions.md` to Markdown changes.

Maintain one portable skill for adaptive GitHub repository coordination. Do not
assume repositories contain code or that the agent has GitHub access, write
permission, or administrative authority.

Run `npm run validate` after changing runtime content, docs, manifests,
validation, packaging, or workflows. Run `npm run package -- vX.Y.Z` and inspect
all ZIP files when release content changes.
