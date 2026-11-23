---
name: aa-project-brief
description: "Guide Claude through a structured project brief elicitation workflow. Trigger this skill whenever the user says \"brief projet\", \"je démarre un projet\", \"nouveau projet\", or any equivalent phrase signaling the start of a new project. Also trigger when the user explicitly asks to generate a project brief or spec document. Do NOT trigger on general questions about a project already in progress. This skill drives a multi-round Q&A interview before generating a structured Markdown brief."
---

# Project Brief Skill

## Purpose

Turn raw, unordered context elements into a structured, exportable project brief via
a guided interview. The output is a `.md` file with fixed sections.

---

## Workflow

### Phase 1 — Acknowledge & Extract

When triggered, immediately acknowledge the project start and extract what the user
has already shared (stack hints, goals, constraints, deliverables). Do not ask for
anything already provided.

Briefly summarize what you understood in 2–3 lines, then move to Phase 2.

---

### Phase 2 — First Round of Questions

Ask **5 to 7 questions maximum**, mixing strategic and technical dimensions from the
start. Group them clearly. Do not number them with sub-bullets — keep it readable.

Cover gaps across these axes (adapt to what's missing, don't repeat what's known):

- **Contexte & problématique** : Quel est le problème ou l'opportunité à l'origine du projet ? Qui sont les parties prenantes ?
- **Objectifs & critères de succès** : Quels sont les 2-3 résultats attendus ? Comment saura-t-on que c'est réussi ?
- **Stack technique & contraintes** : Quelles technologies sont imposées ou souhaitées ? Y a-t-il des contraintes d'intégration, de performance, de sécurité ?
- **Livrables & jalons** : Quels sont les livrables attendus ? Y a-t-il des échéances fixes ?

---

### Phase 3 — Evaluate Complexity

After receiving answers to Round 1, evaluate whether a second round is needed.

**Trigger a second round if:**
- Scope is ambiguous (could be interpreted in 2+ significantly different ways)
- Key technical constraints are still unclear
- Success criteria are vague or missing
- Stakeholder landscape is unclear for a multi-team project

**Skip second round if:**
- All 4 brief sections can be filled with confidence
- Project is straightforward and well-scoped

If a second round is needed, ask **3 to 4 targeted follow-up questions only** — no
repetition of Round 1 territory.

---

### Phase 4 — Generate the Brief

Generate a structured Markdown brief with these **exact sections**, always in this order:

```markdown
# Brief Projet — [Nom du projet]

## 1. Contexte & Problématique
[Description du contexte, de l'opportunité ou du problème à résoudre.
Parties prenantes identifiées.]

## 2. Objectifs & Critères de Succès
[Objectifs principaux du projet. Critères mesurables ou observables de succès.]

## 3. Stack Technique & Contraintes
[Technologies retenues ou imposées. Contraintes d'intégration, de sécurité,
de performance, de compliance, ou organisationnelles.]

## 4. Livrables & Jalons
[Liste des livrables attendus. Jalons ou échéances identifiées.]

---
*Brief généré le [DATE] — v1.0*
```

**Rules:**
- Write in the language the user used throughout the interview (French by default)
- Be concise but complete — no padding, no vague filler
- If a section has genuine unknowns, state them explicitly as `⚠️ À préciser`
- Always export as a `.md` file using `present_files`

---

### Phase 5 — Close

After presenting the file, stop. Do **not** propose next actions unless the user
explicitly asks. The brief is the deliverable.

---

## Edge Cases

| Situation | Behavior |
|---|---|
| User provides very rich context upfront | Reduce Round 1 to 3–4 gap-filling questions only |
| User gives one-line context | Ask full Round 1, likely trigger Round 2 |
| Project is non-technical (process, org) | Omit or adapt "Stack technique" section accordingly |
| User asks to regenerate or update the brief | Re-run Phase 4 only, incorporating new inputs |
| User says "deuxième série de questions" | Jump directly to Phase 3 re-evaluation |