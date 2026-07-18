---
applyTo: "**/*.md"
---

# Markdown Instructions

## Goal

Keep Markdown files readable by humans, AI agents, GitHub, IDEs, and simple tooling.

## Rules

- Use one H1 title per file.
- Maintain heading hierarchy without skipped levels.
- Use real headings instead of bold text as headings.
- Keep each paragraph focused on one related idea. Related sentences may share a paragraph; unrelated ideas belong in separate paragraphs.
- Write each prose paragraph and list item on one physical source line. Rely on the editor or renderer to soft-wrap text for display.
- Do not hard-wrap, hard-crop, or insert line breaks at a fixed source column.
- Separate adjacent Markdown blocks, including headings, paragraphs, lists, and fenced code, with one blank line.
- Use flat lists.
- Avoid nested lists.
- Use dashes for unordered lists.
- Use numbered lists only when order matters.
- Add language identifiers to fenced code blocks.
- Use `bash` for portable shell commands.
- Use `text` for command output.
- Use `powershell` only when the command uses PowerShell-specific syntax.
- Avoid horizontal rules.
- Avoid em dash punctuation.
- Use relative links for repository files.
- Define specialized terms before relying on them.

## Rationale

Markdown in this repository is read by humans, AI agents, GitHub, IDEs, and validation tools. Structural Markdown survives across those readers better than visual formatting.
