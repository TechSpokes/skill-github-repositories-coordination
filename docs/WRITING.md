# Writing Quality

## Goal

Repository prose should communicate the intended meaning on the first reading without erasing technical detail, evidence limits, authority, or the user's vocabulary.

This guide covers prose written by maintainers and agents in public repository files. Markdown source layout remains governed by [Markdown Instructions](../.github/instructions/markdown.instructions.md), and code comments remain governed by the owning code and comment conventions.

## What Counts as a Writing Defect

A construction is a defect only when it obscures an actor, action, relationship, evidence state, scope, or first-pass meaning for the target reader. A pattern does not prove that AI wrote the text, and the repository does not use style as an authorship detector.

The project protects legitimate compounds, true contrasts, quotations, product names, commands, flags, URLs, identifiers, versions, and necessary technical language. Reader comprehension and semantic fidelity take precedence over making punctuation or sentence shape uniform.

## House Authority

Use American English for new prose. Preserve quoted language, product spelling, identifiers, established project terms, and the user's own vocabulary.

This house decision was reviewed on 2026-07-19.

Resolve a usage question in this order: the convention already established in the owning document, this guide and the focused writing instruction, the [Google developer documentation style guide](https://developers.google.com/style), and [Merriam-Webster](https://www.merriam-webster.com/) for American spelling and compounds. Use [Cambridge hyphen guidance](https://dictionary.cambridge.org/grammar/british-grammar/hyphens) and the [University of Oxford punctuation guide](https://www.ox.ac.uk/about/the-university/brand/style-guide/punctuation) as grammar comparisons when they clarify a construction.

The repository corpus supports this choice: `organization` and `behavior` are established throughout public files, while their British variants are absent. A local convention may still yield when it makes the text harder to understand or damages a protected term.

## Writing Values

- Preserve meaning before style.
- Name actors, actions, objects, and ownership when they affect a decision.
- Separate observation, inference, recommendation, execution, and verification.
- Prefer the user's vocabulary and define specialized terms before relying on them.
- Keep necessary complexity and remove complexity that carries no meaning.
- Choose the smallest structure and explanation that supports the reader's task.

## Observable Diagnostics

### Overloaded Sentences

An overloaded sentence asks the reader to retain several independent actions, evidence claims, or qualifications at once. State the governing fact first, then split independent results or obligations into separate sentences.

### Dense Labels and Modifiers

Several classifying labels or multiword modifiers before the noun can turn punctuation into a decoding task. Name the set, then state what it did. Move modifiers after the noun when that makes the relationship clearer.

Hyphens remain correct in compounds such as `read-only`, `cross-repository`, and `least-privilege`. Google recommends rewriting compound modifiers longer than two words when possible, which is more useful here than deleting each hyphen. Do not replace one dense label chain with a newly coined compound when an ordinary verb phrase states the action clearly.

### Hidden Actors and Abstract Actions

Process nouns such as `validation`, `publication`, and `resolution` are useful defined terms, but they can hide who acts or decides. Name the person, agent, workflow, or evidence source when responsibility matters.

### Formulaic Repetition

An exact output template can make later prose repeat the same opening or conclusion without improving the explanation. Require the meaning, not a stock sentence. Repeat exact wording only when a stable interface, legal rule, or safety label needs it.

### Redundant Conclusions

Do not describe a result and then append a ceremonial result label that adds no evidence. Keep one explicit outcome sentence or use a dedicated machine-readable status field.

### Unsupported Contrast

Use `not X but Y`, `rather than`, and similar forms when the two propositions genuinely differ and the rejected alternative matters. If the contrast invents a position or preserves an obsolete option, state the selected claim directly.

### Vague or Inflated Claims

Words such as `complete`, `robust`, `safe`, and `seamless` need an observable subject, scope, and basis. Replace the evaluation word with what passed, what evidence supports it, and what remains unknown.

### Unnecessary Structure

Lists support real sets, procedures, and comparisons. They do not improve a short connected explanation merely by making it look comprehensive. Use prose when the content expresses one related idea.

### Additive Revision and Drift

Repeated revisions can preserve obsolete alternatives and add explanations until the document loses the author's goal. Remove superseded wording first, preserve a short meaning checklist, and add only information needed to restore meaning.

## Quality Pass

Before revising, record the actors, actions, objects, relationships, evidence limits, exceptions, and exact literals that must survive.

Remove repetition, empty framing, obsolete alternatives, redundant status labels, and decorative structure. Then restore any missing actor, definition, evidence limit, exception, or relationship.

Read the revision for first-pass meaning and compare it with the preservation checklist. Report any intentional compound, contrast, technical term, or long sentence that a broad style rule might otherwise damage.

The portable skill exposes the same process through an optional writing quality pass in its [writing quality reference](../skills/coordinate-github-repositories/references/writing-quality.md). It loads only when a user requests a language quality pass, reports a concrete clarity defect, or asks to review generated coordination files before handoff or publication.

## Repository-Wide Application

Version `1.6.1` applies this review process to every tracked prose surface in Markdown, YAML, and JSON across the source repository and packaged skill. The review includes user guidance, maintainer instructions, runtime references, templates, manifests, fixture descriptions, release history, and authored evaluation commentary.

Approved quotations, commands, flags, URLs, identifiers, version facts, raw historical model outputs, and inert adversarial prompts remain exact unless the surrounding explanation needs repair. A reviewed file may remain unchanged when the pass finds no material defect.

The repository-wide pass is a user-authorized application of the optional capability, not a new requirement for every patch. Future reviews should stay proportional to the reported defect, changed behavior, and affected documents.

## Evidence and Limits

Research reviewed on 2026-07-19 supports a multidimensional, context-sensitive approach. Reinhart et al. found noun-heavy, nominalized, coordinated, and genre-insensitive tendencies in the studied instruction-tuned models, while a broader [linguistic survey](https://arxiv.org/abs/2510.05136) found repetition and formulaic patterns but substantial variation across models, prompts, languages, and genres.

Professional writers in [Can AI writing be salvaged?](https://arxiv.org/abs/2409.14509) converged on edit categories including cliches, unnecessary exposition, poor sentence structure, lack of specificity, and awkward phrasing. The study focused on creative prose, so this project transfers the diagnostic method rather than treating its taxonomy as a technical-writing law.

[Writing as a testbed for open ended agents](https://arxiv.org/abs/2503.19711) found that the evaluated models favored addition and elaboration while human editors more often deleted, simplified, and restructured. This supports a subtractive first pass and a meaning checklist to control drift.

[Flattery, Fluff, and Fog](https://arxiv.org/abs/2506.05339) found that tested preference models could overvalue length, list structure, jargon, sycophancy, and vagueness. Other studies report style-sensitive model judges and model preference for model-written text. These results do not invalidate every model review, but they rule out using a generic model score as the sole writing gate.

The maintainer's explanation that false opposition may preserve alternatives from earlier context remains a plausible situational mechanism. No reviewed source establishes it as the general cause, and the project does not infer hidden reasoning from surface prose.

## Verification and Maintenance Budget

The committed regression corpus contains reviewed repairs and protected examples. Validation checks its schema, coverage, and protected literals but does not score naturalness or ban ordinary English forms.

The project adds no grammar dependency, network request, AI detector, runtime writing script, or mandatory model judge. In v1.6.0, the always-loaded `SKILL.md` is one word smaller than v1.5.0. The optional reference contains 433 words in 51 lines and remains unloaded during ordinary runs, while the focused maintainer instruction contains 28 lines.

For v1.6.1, the always-loaded `SKILL.md` remains 178 lines. The optional reference contains 419 words in 51 lines, and the corpus contains 30 applied repairs plus 10 protected examples. Validation still uses the existing Node.js process and standard library.

Review the corpus when a writing rule changes or a material new failure is reported. Routine patches do not require a complete style audit.

The complete research archive, source notes, mechanism confidence review, contradictions, and candidate corpus remain in ignored private intake for later reuse. They are not packaged with the skill.
