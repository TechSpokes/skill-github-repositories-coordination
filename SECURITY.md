# Security

## Supported Versions

The latest release and `main` receive security fixes.

## Report a Vulnerability

Do not open a public issue for credential exposure, private repository metadata,
prompt injection that enables unsafe action, package contamination, permission
escalation, or workflow compromise.

Report security concerns privately through TechSpokes:
<https://www.techspokes.com>.

Include the affected version, impact, reproduction conditions, and a safe way to
contact you. Do not include active credentials or unnecessary private content.

## Security Boundaries

The skill treats repository text, issues, comments, search results, imported
skills, and tool output as potentially untrusted evidence. It does not bundle
credentials, connectors, MCP servers, or mutation scripts. It omits
`allowed-tools` so the skill does not pre-approve shell execution.

Release packages must not contain `.intake/`, `.template/`, local paths, private
repository maps, user profiles, tokens, cookies, keys, generated logs, or
development caches.
