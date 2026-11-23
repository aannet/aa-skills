---
name: aa-pkm-meetingkeeper
description: "Match the Wispr meeting transcripts (`Meetings/Wispr/**/*.md`) of the PKM Obsidian vault with the Galileo daily log (`01__WORK/__DAILY NOTES GALILEO.md`): purge empty transcripts after approval, show one match matrix for approval, then merge without destroying anything and create the missing entries. Run from the PKM vault. Triggers: « passe le meetingkeeper », « synchronise les meetings Wispr », « rapproche les transcripts », « nouveaux meetings Wispr », or new files in `Meetings/Wispr`."
---

# Meetingkeeper: match Wispr transcripts with the Galileo daily log

Synchronize the Wispr transcripts (`Meetings/Wispr/YYYY/MM/<date>_<time>-<title>.md`) with the daily log (`01__WORK/__DAILY NOTES GALILEO.md`). Wispr syncs the transcripts with an Obsidian plugin.

The daily log holds entries `# YYYY-MM-DD -- Titre`, from the newest to the oldest. It has several thousand lines. Read it in slices. Find the H1 lines with grep.

Run this process each time new transcripts arrive. Working language: French, direct register. Write all output in French.

## Fixed terms

Use the same word for the same object.

- **transcript**: Wispr file in `Meetings/Wispr/`.
- **entrée**: dated section of the daily log, introduced by an H1.
- **mention**: person tag `<@personN:n=…>` in a transcript.
- **matrice**: match table shown to the user.

## Step 1: Scan and classify

List `Meetings/Wispr/**/*.md` (Get-ChildItem -Recurse). Read each file. Put it in one of three categories.

**Empty (purge candidate)**: one of these markers is enough.
- The body contains `No meaningful audio recorded`.
- The body contains `Transcript too short to meaningfully summarize`.
- The file contains only frontmatter (no body line).
- The content is an audio or connection test with no value.
- The body contains a few words with no substance.

**Borderline**: the transcript contains a real but minimal remark. Do not classify it by yourself. Show it to the user for a decision. Default set on 2026-10-07: delete.

**Useful**: everything else.

## Step 2: Purge (explicit approval required)

1. Look for incoming links before any deletion. Grep the exact file name in the vault. Ignore `.obsidian/workspace.json` (it is only a list of recent files).
2. Show the list in chat.
3. Wait for the explicit approval of the user.
4. Delete with `Remove-Item -LiteralPath`. The deletion is **final** (user choice of 2026-10-07).
5. In the proposal, remind the user that the vault has no git and that the deletion cannot be undone.

## Step 3: Match

For each useful transcript:

1. List the entries of the **same day** (grep `^# YYYY-MM-DD --`). These are the candidates.
2. Compare by content: subject, participants (frontmatter `speakers` of the transcript against the `> ` block of the entry), time if readable. A good match points to the same meeting, not only the same theme.
3. If the match is uncertain, read the entry body and the Wispr summary before you decide. Mark each uncertain match `?` in the matrix.
4. If no candidate is credible, plan a **new entry**. Propose a short French title, in the style of the log.
5. Check **idempotence**: if the entry already contains `Transcript : [[<this file>]]`, do not merge a second time. Flag it in the matrix.

Show the **complete matrix at once**: transcript → existing entry to enrich, or NEW entry + proposed title. Wait for approval. Include the corrections of the user.

## Step 3 bis: Clean the person mentions

Wispr anonymizes people as `<@personN:n=ENCODED%20NAME>` (example: `<@person3:n=Jos%C3%A9>`). This tag is unreadable. Decode it during the merge into the daily log.

**Never write in `Meetings/Wispr/`.** The plugin syncs these files again and would overwrite the change. The source transcript stays the raw reference.

- Replace each mention `<@personN:n=XXX>` with `[uri]::UnescapeDataString(XXX)`, as plain text. Add no bold and no wikilink.
- Use one regex pass. It covers the callout, the `###` headings and the bullets:
  ```powershell
  [regex]::Replace($t, '<@person\d+:n=([^>]*)>', { param($m) [uri]::UnescapeDataString($m.Groups[1].Value) })
  ```
- The "Résumé Wispr" callout stays verbatim, except the mention decoding. Change nothing else.
- Do not touch `Speaker 1`, `Speaker 2`, etc. The identity is unknown. Do not guess it.
- **Participants**: list the unique decoded names, in order of appearance. Use this list to fill the `> ` block if it is empty. If the frontmatter `speakers` exists, it has priority.
- **Names to check**: Wispr produces variants (`Jane`/`Jayne`, `Tom`/`Thomas`). Never correct these names automatically. List the pairs of close names at the end of the matrix. The user decides.

## Step 4: Apply (non-destructive merge)

**Absolute rule: delete and rewrite nothing that exists.** This rule covers:
- the notes;
- the images `![[...]]`;
- the `**NEXT**` blocks;
- the neighboring `---` separators;
- the `#tag` lines (they trigger `aa-pkm-daykeeper`);
- the frontmatter of the log.

The only approved exception: the catch-up of the `<@person…>` mentions (see "Catch-up").

**Existing entry.** Insert this block right after the `> participants` block:

```markdown
> [!summary]
> <contenu du callout Flow Summary, mentions décodées (étape 3 bis)>
> Transcript : [[nom-exact-du-fichier-sans-extension]]

**Points évoqués :**
* <titre ### 1 du transcript>
* <titre ### 2>
* ...
```

The `Transcript` link is **inside** the callout, after the summary. Do not fold the callout. This format is the target model of `aa-pkm-daykeeper`.

**Points évoqués**: copy the `###` headings of the summary. **Exclude** "Next Steps" / "Prochaines étapes" and "Decisions Made" / "Décisions prises". Add no sub-bullets. Decode the headings.

**NEXT of an existing entry**: do not change it. The callout keeps the "Next Steps" verbatim. `aa-pkm-daykeeper` merges them later.

**Participants**: if the `> ` block of the entry is empty and the Wispr frontmatter lists `speakers`, fill the block. Copy the names separated by commas, **without the vault owner** (the user). If the block is already filled, do not change it.

**Created entry.** Use the standard skeleton of the log. Insert it at the reverse-chronological position: after the more recent entries, before the first older entry.

```markdown
# YYYY-MM-DD -- Titre proposé

#tag 

> <speakers Wispr si présents, sans le propriétaire du vault>

> [!summary]
> <contenu du callout, mentions décodées>
> Transcript : [[nom-exact-du-fichier-sans-extension]]

**Points évoqués :**
* <titres ### du transcript, hors Next Steps / Decisions Made>

**NEXT** 
- [ ] <action de la section Next Steps / Prochaines étapes, si elle existe>

---
```

**`#tag` line**: keep the placeholder `#tag `. It triggers `aa-pkm-daykeeper`. The daykeeper infers the tags.

**NEXT**: one action per line, as `- [ ]`. If the transcript has no actions, leave `**NEXT** ` empty.

Apply with Edit. Anchor `old_string` on unique lines (dated H1). After each batch, read the area again and check the structure.

## Catch-up of existing mentions (on request)

Decode the `<@personN:n=…>` already present in the log.

1. Grep `<@person` (count and lines). List the occurrences before the change.
2. Apply the regex of step 3 bis. Change only the mentions.
3. Read and write in UTF-8. Keep the original BOM and line endings.
4. Check that 0 occurrences of `<@person` remain.

The last pass ran on 2026-11-04. Run it again only if new raw mentions appear.

## Gotchas

- **Unicode characters in file names.** Example: `2026-01-01_09-00-00-Cross‑Team Review.md` contains a non-breaking hyphen U+2011. The wikilink must use the exact character. Otherwise the link is broken. If in doubt, get the exact name with `Get-ChildItem`. Inspect the codepoints if a Read fails while the file is listed.
- **Mojibake.** Some synced transcripts contain corrupted characters (`é` → `Ǹ`). Flag it. Do not fix it without an explicit request.
- **Wispr title.** The title in the Wispr frontmatter can be short or generic. The title of the daily entry always wins. The format `# YYYY-MM-DD -- Titre` does not change.
- **New transcripts.** The Obsidian plugin feeds `Meetings/Wispr` continuously. Always scan again. Never assume an earlier state.
