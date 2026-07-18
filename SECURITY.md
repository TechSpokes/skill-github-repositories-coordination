# Security

## Supported Versions

The latest release and `main` receive security fixes.

## Report a Vulnerability

Do not open a public issue for credential exposure, private repository metadata,
prompt injection that enables unsafe action, package contamination, permission
escalation, or workflow compromise.

Report security concerns privately by email at
<contact@techspokes.com> or through the
[TechSpokes contact form](https://www.techspokes.com/contact/). Put the
repository name and `security report` in the subject. The contact route and
security-disclosure instruction were verified from the official TechSpokes
contact and terms pages on 2026-07-18.

When GitHub private vulnerability reporting is available, use the repository's
[private advisory form](https://github.com/TechSpokes/skill-github-repositories-coordination/security/advisories/new).
Do not open a public issue to test whether private reporting is enabled.

Include the affected version, impact, reproduction conditions, and a safe way to
contact you. Do not include active credentials or unnecessary private content.

The [threat model](docs/THREAT-MODEL.md) describes protected assets, trust
boundaries, the untrusted-input-to-privileged-tool-to-public-output path,
controls, residual risks, and review triggers.

## Security Boundaries

The skill treats repository text, issues, comments, search results, imported
skills, and tool output as potentially untrusted evidence. It does not bundle
credentials, connectors, MCP servers, or mutation scripts. It omits
`allowed-tools` so the skill does not pre-approve shell execution.

Release packages must not contain `.intake/`, `.template/`, local paths, private
repository maps, user profiles, tokens, cookies, keys, generated logs, or
development caches.

Each release provides SHA-256 checksums and GitHub artifact attestations for the
three installable ZIPs. Provenance proves source and workflow identity, not that
an artifact is secure. Package inspection and release approval remain required.
