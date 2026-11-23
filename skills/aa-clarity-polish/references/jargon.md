# Jargon

Use the reader's words. A term that the reader does not know costs effort.

## Method

1. List each technical term, acronym, code and label in the deliverable.
2. For each term, decide if the reader knows it.
3. Replace each unknown term with a common word.
4. If you must keep a term, define it once, at its first use.
5. Use one word for one idea in the whole deliverable.

## What to replace

- Raw values from a tool: status codes, enumerations, field names, identifiers.
- Identifiers with underscores or camel case.
- Acronyms that the reader does not use.
- English words inside French text, when a common French word exists.
- Statistical terms: median, percentile, standard deviation, correlation.
- Formulas and scores that the reader must decode.
- Internal process words that mean nothing outside the team.
- Symbols and abbreviations such as "≥", "Δ", "vs", "nb".
- Compact codes in a matrix (Z1, Z2, C4). Use names. If space forces codes, add a legend next to them.

Examples:

| Before | After |
|---|---|
| taux de breach du SLA : 12,4 % | 12 % des livraisons en retard |
| lead time p90 : 18 j | 9 commandes sur 10 livrées en moins de 3 semaines |
| churn mensuel | clients perdus chaque mois |
| attrition du headcount | départs |
| indice = marge × rotation | classement des produits (calcul en annexe) |
| statut `in_progress` | en cours |

## What to keep

- A legal or regulatory term that has an exact meaning. Keep it, then explain it in plain words.
- A term that the reader uses every day, even if it is technical.
- A proper name: a product, a team, a place.

## Know the reader's words

Use this test: would the reader say this word aloud in a meeting? If yes, keep it.

Find the reader's words in this order:

1. The project lexicon, if one exists.
2. The brief, the intent note and the earlier deliverables of the project.
3. The user's own words in the request.

If the sources do not settle a term, keep it and define it once. List it as an open question in the report. Do not guess.

## Labels that also act as keys

A label may also be a filter key, a data key or a link target. Change the display text only. Keep the key as it is. Check that filters still work.

## Define a term

- Define the term at its first use, in 12 words or fewer. A detail layer can hold a longer definition.
- If the deliverable has many terms, group them in one short glossary at the end.
- In an interface, put a short definition in a tooltip. Put a long one in a detail section.

## Project lexicon

If a file named `lexique.md`, `glossary.md` or `glossary.csv` exists in the project, read it. Apply its replacements. Add new pairs only if the user agrees.

## Rewrite formulas and rules

- Do not show a formula in the main text. State the result and the reason in one sentence.
- Move the formula to the detail layer.
- Do not show a threshold without its meaning. Write "en retard au-delà de 3 semaines", not "seuil = 21".
