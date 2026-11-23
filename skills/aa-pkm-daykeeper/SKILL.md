---
name: aa-pkm-daykeeper
description: "Rework raw entries of the Galileo daily log (`01__WORK/__DAILY NOTES GALILEO.md`) in the PKM Obsidian vault: title, tags, bullet version with a NEXT section that replaces the entry body (no raw copy kept). Propose in chat, apply only after explicit approval. Run from the PKM vault. Triggers: « reformate mon entrée », « passe le daykeeper », « retravaille la note du ... », « mets au propre mes notes », « reformate les entrées du jour »."
argument-hint: "[date or title fragment — default: all entries of today]"
---

# Daykeeper: rework entries of the daily log

Rework the entries of the Galileo daily log (`01__WORK/__DAILY NOTES GALILEO.md`). Recent entries are at the top. The entry separator is `---`. Process the entries one by one, in a loop. By default, the batch holds all entries of today.

Target given by the user: $ARGUMENTS

**Principle: the reworked version replaces the entry body. Keep no raw version.** Never write `## Version brute`. The original disappears, so the reworked version must be fully faithful (step 4). If a piece of user information does not fit the format, keep it in the reworked version. Write no H2. The idempotence marker is the Obsidian comment `%% daykeeper %%`, alone on the first line under the H1 (invisible when reading). Old entries carry `## Version LLM retravaillée`. Treat it as an equivalent marker. Never write it in a new entry.

Working language: French, direct register. Write all output in French.

## Fixed terms

Use the same word for the same object.

- **entrée**: dated section of the daily log, introduced by an H1.
- **lot**: set of entries to process in one run.
- **version retravaillée**: entry body marked by `%% daykeeper %%` (or, for old entries, under `## Version LLM retravaillée`).
- **transcript**: Wispr file in `Meetings/Wispr/`.
- **mention**: person tag `<@personN:n=…>` in a transcript.

## Step 0: Read in slices

The file has several thousand lines. Read it in slices (Read with offset and limit). Find the H1 lines with grep. Never read the whole file.

## Step 1: Target the entries

**No target from the user**: the batch holds all entries of today (system date).

1. Find the H1 lines with grep. Accept the formats `YYYY-MM-DD` and `YY-MM-DD`. Example: `grep -nE '^# (20)?26-11-04 --'`.
2. Process the entries in file order (top to bottom).
3. Extend each entry to the next `---` or the next H1.
4. If today has no entry, take the entries of the most recent date at the top. Say so in the header.
5. If a block of raw content **without H1** comes before the first `# <date> --` (after the frontmatter), add it to the batch. Put a new H1 on it (`# YYYY-MM-DD -- <proposed title>`) with today's date. Say that the date needs confirmation.

**With a target** (date or title fragment):

- The batch holds the matching entries. Find them with grep on the H1 lines.
- If one date matches several entries, process all of them. Say so.
- If a title fragment is truly ambiguous, ask the user.

**Idempotence, per entry**: if an entry already contains `%% daykeeper %%` (or the old H2 `## Version LLM retravaillée`), skip it and report it. Process the other entries of the batch as usual.

### Prerequisite check: Wispr transcripts

For each entry of the batch, look for the link `Transcript : [[...]]`.

- **No link**, and the entry probably has a Wispr meeting (same day in `Meetings/Wispr/`): report it at the top of the summary. Propose to run `aa-pkm-meetingkeeper` first. Do not chain it automatically. Its approvals (purge, entry creation) are separate.
- **Link present, poor entry** (only Wispr summary and "Points évoqués", no manual notes): read the transcript as a complementary source (step 4). The file is `Meetings/Wispr/YYYY/MM/<name>.md`. Find it with Glob if needed.
- **Link present, entry rich in manual notes**: do not read the transcript, unless asked.

## Step 2: Detect the template defaults

The template `7-TEMPLATES/TPL - Daily Note.md` inserts four elements:
- the H1 `# <date> -- PROJET -- INSTANCE`;
- the line `#tag`;
- the line `> ` (participants);
- `**NEXT**`.

**Default H1** (suffix `-- PROJET -- INSTANCE`, or empty title): propose a short title taken from the content. Keep the date prefix **as it is**. Two formats exist in the log (`2026-09-02` and `26-07-30`). Do not normalize them.

**Tags**: if the `#tag` line is alone or the tags are missing, propose 1 to 4 tags (step 3). If real tags exist, do not change them.

**Participants**: if the `> ` line is empty, propose the names found in the content. If it has names, do not change it.

## Step 3: Propose the tags

Run the tag inventory of the vault **once** for the whole batch. Infer the tags from the content (subject, project, school, tool, meeting type). Choose them **first among the existing tags of the vault**.

```powershell
$vault = (Get-Location).Path   # run from the vault root
$files = Get-ChildItem -LiteralPath $vault -Recurse -File -Filter "*.md" | Where-Object { $_.FullName -notmatch '\\\.(trash|obsidian|smart|opencode)' -and $_.FullName -notmatch '\\(OpenNote|_ASSETS|7-TEMPLATES)\\' -and $_.Name -notmatch ' \(conflict ' -and $_.Name -notlike '*.excalidraw.md' }
$tags = @{}; foreach ($f in $files) { $c = Get-Content -LiteralPath $f.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue; if (-not $c) { continue }; foreach ($m in [regex]::Matches($c, '(?m)(?<![\w/])#([a-zA-Z][\w/-]{1,40})')) { $t = $m.Groups[1].Value; if ($t -notmatch '^(tag|tags)$' -and $t -notmatch '^[0-9a-fA-F]{3,8}$') { $tags[$t.ToLower()] = 1 + ($tags[$t.ToLower()] -as [int]) } } }; $tags.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 50 | ForEach-Object { "{0}  x{1}" -f $_.Key, $_.Value }
```

The filter removes the placeholders (`tag`, `tags`) and the leftover Excalidraw hex colors.

Frequent vocabulary: `galileo`, `ia`, `web`, `webfactory`, `aifactory`, `kickoff`, `rex`, `run`, `budget`, `integration`, `management`, `tool/*`, `vendor/*`, `galileo/projet/*`, `galileo/ecole/*`, `school/*`.

Conventions:
- Write `#ia`, never `#ai`.
- Write `galileo/ecole/<code>` for schools.
- Write `tool/<name>` for tools.
- Write `vendor/<name>` for vendors.

Propose a **new** tag only if it is really useful. Mark it "nouveau" in the proposal.

Put the tags on one inline line under the H1 (`#web #kickoff`). Do not use the frontmatter. Never change the frontmatter of the log.

## Step 4: The reworked version

**Full fidelity**: group, order, remove duplicates. **Never** invent.

- Resolve an abbreviation only if it is unambiguous in context. Otherwise keep it as it is. Mark it `(?)` if needed.
- Keep the original FR/EN mix.
- Write in bullets. Use bold labels (`**CONTEXTE**`, `**RISQUES**`, `**FACTS**`…), as in the rest of the log. Do not use H3 headings.
- If the entry contains an image `![[...]]`, embed it again as it is in the reworked version. Put it at the logical place: after "Points évoqués" for an entry with a transcript. Never remove it.
- Keep every manual note, even brief or unfinished. Example: an empty "Défis" heading. Flag it in one line. Remove no note, except an exact duplicate.

**Transcript as complementary source.** If you read a linked transcript (poor entry), the rule "never invent" applies to the transcript as to the original text. Use nothing outside these two sources.

- Mark `(transcript)` at the end of each bullet that comes only from the transcript.
- If the entry has no manual notes, write one mention at the top of the reworked version instead: `*Source : résumé Wispr + transcript, pas de notes manuelles*`.
- Never copy the transcript into the entry.

**Mandatory section: `**NEXT**`.** Merge all actions of the entry into a `- [ ]` checklist. Sources to merge:
- the existing `NEXT` blocks;
- the scattered `- [ ]` todos;
- the implicit wordings ("caler", "contacter", "à faire"…).

Remove duplicate actions. Omit actions already checked `[x]`, unless they give context.

### Frame: Web / IA Factory

For any entry on web / IA Factory subjects (new stack, sites, web run, web team), use this fixed frame instead of free labels:

1. `**STREAM RUN**`
2. `**STREAMS PRODUITS**`: sub-blocks in italics by subject present: `*IAFACTORY*`, `*DESIGNSYSTEM*`, `*NEWSTACK*`. You can add a short subtitle (example: `*NEWSTACK — tests*`).
3. `*DELIVERY SITES*`
4. `*EQUIPE*`
5. `*STAFFING*`

Then add `**NEXT**`. Write a block only if it has content. Keep the order.

### Density: exec summary

Write as an exec summary, not as minutes. Each bullet holds one fact or one actionable. Use direct wording. Do not paraphrase the whole discussion. Do not compress to the extreme either. Keep the distinction between two categories:

- **What happened**: decisions made, incidents, dated figures and milestones, names and roles, striking examples (they carry context).
- **What to keep in mind for later**: open risks, undecided questions, watch points, deadlines.

Guide: a rich entry fits in 12 to 20 core bullets, NEXT excluded. NEXT stays a checklist of assigned actions, one line per action.

### Target model: entries with a Wispr transcript (link `Transcript : [[...]]`)

If the entry has a link `Transcript : [[...]]`, the reworked version follows **exactly** this model. It replaces the free labels (`**CONTEXTE**`, `**FACTS**`…) and the Web / IA Factory frame. Keep the block order. No `**DÉCISIONS**` block.

1. **Tags**: one inline line under the H1. Infer them from the content (step 3).
2. **Participants** (`> `): list the people **without the vault owner** (the user).
   - Source: transcript mentions and `speakers` in the Wispr frontmatter.
   - Decode the mentions with `[uri]::UnescapeDataString` (see `aa-pkm-meetingkeeper`, step 3 bis).
   - Do not resolve `Speaker N`.
   - If the `> ` line is already filled, do not change it. Only remove the vault owner.
3. **Callout `> [!summary]`**: copy the Wispr summary as it is (mentions decoded). Put the line `> Transcript : [[exact-file-name-without-extension]]` **inside** the callout, after the summary. Do not fold the callout.
4. **`**Points évoqués :**`**: one bullet per `###` heading of the Wispr summary, headings decoded.
   - **Exclude** "Next Steps" / "Prochaines étapes" and "Decisions Made" / "Décisions prises". Never put them in the list.
   - Add no sub-bullets.
5. **`**NEXT**`**: actions of the section "Next Steps" / "Prochaines étapes" of the Wispr summary, if they exist. Write one action per line, as `- [ ]`. Write no empty bullet if the summary has no actions.

**Manual notes.** If the entry also has manual notes:
- Add them as bullets under `**Points évoqués :**`, after the Wispr headings. Invent nothing (step 4).
- Merge their actions into `**NEXT**`. Remove duplicates.
- Mark `(transcript)` only on items that come from the transcript read in step 1 (poor entry).

**Decisions.** Do not create a `**DÉCISIONS**` block. If a decision carries an important figure or date, write it as a bullet in `**Points évoqués :**`, under the relevant heading.

**Doubtful names** (spelling variants of one name, such as `Jane`/`Jayne`): do not correct them. Flag them in the proposal.

## Step 5: Replace the body

The reworked version replaces the whole original body, from the line under the H1 up to the separator `---` (excluded). Write no raw version.

- If the original H1 carries a custom title that differs from the chosen title, replace it with the chosen title. Flag the change in the proposal.
- In the proposal, list the original elements that the format does not keep as they are (fixed typos, resolved abbreviations, empty headings). The user approves before you apply.

## Step 6: Loop: propose, then apply after approval

1. **Propose all entries of the batch in chat**, one by one, in file order.
   - For each entry, first write a compact header: targeted entry and lines, proposed title, proposed tags, proposed participants, new tags flagged.
   - Then write the full block, ready to insert.
   - At the top, write a summary: number of entries in the batch and skipped entries (already processed).
2. **Wait for explicit approval.** It can be global (« ok pour tout », « applique », « go ») or per entry (« ok pour la 2 »).
   - If the user corrects a title, tags or content, apply the correction to that entry only.
   - Apply only approved entries. Leave the others in their original state.
3. **Apply in a loop**, entry by entry, with Edit.
   - Include the H1 line in `old_string` (it is unique thanks to the date and title). If Edit reports "multiple matches", widen the context.
   - Read the file again before each Edit. Line positions change after each insertion.
   - Touch **no** entry outside the batch.
   - Never touch the frontmatter of the file.
   - Never touch the neighboring `---` separators.
4. **Check each entry** after you apply it. Read the changed area again. Confirm the structure: H1, `%% daykeeper %%` under the H1, NEXT section, no H2. Confirm that no `## Version brute` and no `## Version LLM retravaillée` exists.
5. **Final review by a Haiku subagent (automatic).** Run this step after you apply and check all entries.
   - Call the `Agent` tool with `model: haiku`. Make one call per entry, in parallel.
   - Give each agent the entry body (from `%% daykeeper %%` to the separator).
   - Instruction to the agent: read the whole day again. Find duplicates (between NEXT, Points évoqués, summary and notes). Find empty, generic, redundant or useless bullets. **Rewrite and add nothing.** Return a list of proposed deletions, with the exact line and the reason.
   - Then apply the relevant deletions with Edit. The main model decides last. Reject any suggestion that would remove unique information, a NEXT action, or a figure or date.
   - Read the area again after you apply.
6. **Final report**: list the applied entries, the skipped entries, the entries not approved and any anomalies.

## Target structure

```markdown
# 2026-09-02 -- Titre proposé

%% daykeeper %%

#web #kickoff

> Prénom, Prénom

**CONTEXTE**
- ...

**NEXT**
- [ ] Action consolidée
```

### Target structure: entry with Wispr transcript

```markdown
# 2026-11-02 -- Titre proposé

%% daykeeper %%

#tag1 #tag2

> Prénom Nom, Prénom Nom

> [!summary]
> <résumé Wispr, mentions décodées>
> Transcript : [[2026-11-02_14-02-52-Nom du fichier]]

**Points évoqués :**
* <titre ### Wispr 1>
* <titre ### Wispr 2>

**NEXT**
- [ ] Action issue de Wispr ou des notes
```

## Never do

- Do not touch an entry outside the batch (other days included).
- Do not restructure the file.
- Do not reorder the entries.
- Do not change the frontmatter.
- Do not write `## Version brute`.
- Do not remove any manual note or image. You may replace only the empty template shell and the generated blocks (callout, Wispr headings).
