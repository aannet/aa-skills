---
name: aa-clarity-polish
description: Lower the reading effort of an information deliverable. Use this skill to polish, simplify, lighten or clean up a dashboard, report, note, e-mail or slide deck. It rounds numbers, removes jargon, cuts figures and puts the answer first. Use it when the user says "polis", "allège", "simplifie", "trop de chiffres", "trop technique", "lissage", "réduis l'effort cognitif" or "rends ça lisible pour la direction". It changes information density and clarity only. For a visual redesign, use taste-skill. For chart mechanics, use dataviz.
---

# aa-clarity-polish

## Purpose

Make a deliverable easy for a human to read. Keep each fact that the reader needs to decide or act. Remove the rest, or move it to a detail layer.

The goal is less mental effort. Precision made for machines is not a goal.

## Invocation

`/aa-clarity-polish <file|folder> [manager|direction]`

The level argument sets the reader. If it is missing and the reader is not clear, ask one question. The default level is `manager`.

## Defaults

The user can cancel each default with an explicit request. Then apply the new choice everywhere in the deliverable.

- Show percentages as whole numbers.
- Use common words. Do not use technical jargon.
- Show an exact figure only where the reader must process each item or compare to a fixed limit.
- Keep exact values available in a detail layer.

## Workflow

1. Find the reader, the decision and the action. Read `references/audiences.md`.
2. Look for a style guide in the project, such as `design.md`. If one exists, read it. Do not stop if there is none.
3. Find the source of the deliverable. If code or a template generates the file, edit that source. Do not edit the generated file. Generate it again after the edit.
4. If the level is `direction`, go to "Direction level" below. Do not edit anything yet.
5. Apply `references/numbers.md`, `references/jargon.md` and `references/structure.md`. If Node is available, run `scripts/polish-lint.mjs <path>` before and after. It lists decimals, raw identifiers and long sentences. Use `--compare` to show the gain.
6. For a dashboard, report, e-mail or slide deck, read `references/formats.md`.
7. Run the checks below.
8. If the project has rules for changes (changelog, version file, notes), follow them.
9. Send the report.

## Direction level

A Direction deliverable never doubles a full dashboard or report. Write an impact report first. Then stop and wait for the user to approve it.

The impact report lists, for each element:

- what you remove, round, group or rename;
- what the manager loses, or finds in the detail layer;
- the effort: low, medium or high;
- the points that need a business check;
- each contradiction with the project style guide, if there is one.

After approval, apply only the approved changes. Edit the elements in place, or add one short summary at the top. Never copy the whole deliverable.

## Checks

Run these checks before you report.

- You added no new fact and invented no value.
- No rounding changes a ranking, a trend or a conclusion.
- Shares that appear together add up to 100.
- Each kind of value has one format, everywhere. A small base is the one exception: show a count.
- The reader can still reach the exact detail.
- You defined each unknown term once, or replaced it.
- A generated deliverable shows no unexplained empty value, no placeholder and no raw identifier.
- Facts did not change: counts, lists and rankings match the original.

## Report

Keep the report to 10 lines or fewer. Give:

1. The main changes, as short before and after pairs.
2. What moved to the detail layer.
3. Open questions: each term that you could not settle, each removed block, and each point that needs an expert check.
4. What you could not check, such as the look of a page.
5. Each contradiction between this skill and the project style guide. Write what the guide says and what you did. Do not settle it yourself. The user decides.

Do not write a long diagnosis.

## Limits

- Never invent a figure, a date, a rule or a procedure.
- If a text has legal, medical, financial or HR content, flag it for an expert check. Never simplify away an obligation.
- Flag once for the whole deliverable, with the list of topics. Do not flag each item.
- This skill does not depend on a style guide. Apply its rules with or without one. A style guide only adds contradictions to report.
- Skip the steps that do not apply to the format. A plain text has no generator, no lexicon and no change rules.
- Write in the language of the deliverable. French is the default.
- Use FALC (easy-to-read French) only on explicit request. Tell the user that people with intellectual disability must review a real FALC document.
- `aa-writing-style` sets the voice of the author. This skill sets the effort of the reader. The two are separate. If they conflict on jargon, this skill wins for a non-technical reader.
- A visual redesign is not in scope. Use taste-skill.

## Maintenance

This skill text follows ASD-STE100 (Simplified Technical English) as far as possible. After an edit, run `node scripts/ste-check.mjs .` and fix each warning. The script checks sentence length, paragraph length and passive voice. It does not check the approved vocabulary.
