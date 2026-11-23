# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal Claude skills (Markdown, not an application). `skills/` is the source of truth; `~/.claude/skills/` and `~/.agents/skills/` (OpenCode) hold symlinks to it, so edits here are live without a reinstall. There is no build, test suite or linter for the repo itself. README and skill content are in French; most skill text is English or French depending on the skill.

## Commands

```bash
./install.sh          # symlink each skills/<name> into ~/.claude/skills and ~/.agents/skills (idempotent; real dirs are moved to <name>.bak)
./install.sh --zip    # build dist/<name>.zip for upload to claude.ai (dist/ is untracked; re-upload after each change)
```

Only `aa-clarity-polish` ships tooling (Node 22, no dependencies):

```bash
node skills/aa-clarity-polish/scripts/polish-lint.mjs <file|folder> [--lexicon f] [--json]
node skills/aa-clarity-polish/scripts/polish-lint.mjs --compare <before> <after>
node skills/aa-clarity-polish/scripts/ste-check.mjs skills/aa-clarity-polish   # STE-100 style check of the skill's own text
```

## Skill structure

Each skill is `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`). The `description` is the trigger text Claude uses to decide when to load the skill, so keep trigger phrases there, not in the body. `aa-clarity-polish` additionally has `references/*.md` (loaded on demand from steps in SKILL.md) and `scripts/`.

Adding a skill: create `skills/<name>/SKILL.md`, add a row to the README table, run `./install.sh`.

## Conventions

- `aa-clarity-polish/SKILL.md` and its references are written in ASD-STE100 style (short sentences, active voice). After editing them, run `ste-check.mjs` and fix the warnings.
- The skills cross-reference other skills by name (`taste-skill`, `dataviz`); do not rename skills without updating those mentions.
- Edit skills here only, never in `~/.claude/skills/synced/` (claude.ai sync overwrites it). Do not add third-party skills (humanizer, twg*, Anthropic ones): they have their own source.
- Keep `description` on a single line in the frontmatter (most portable format).

## Git

- Branch `main`, remote `origin` over SSH (`aannet/aa-skills`). The personal GitHub key is set in this repo via `core.sshCommand`; do not touch `~/.ssh/config`.
- Commit with the personal email, never the GGE one. Short English imperative messages.
