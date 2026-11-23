---
name: aa-project-brief
description: "Guide a structured interview and write a project brief as a Markdown file. Use it when the user starts a project: \"brief projet\", \"je démarre un projet\", \"nouveau projet\", \"new project\", \"project brief\". Also use it when the user asks for a project brief or a spec document. Do not use it for questions about a project that is already in progress. The brief is in the language of the user."
---

# Project Brief

## Purpose

Turn raw, unordered context into a structured project brief. Use a guided interview. The output is a `.md` file with fixed sections.

## Workflow

### Phase 1 - Acknowledge and extract

1. Acknowledge the project start.
2. Extract what the user already gave: stack hints, goals, constraints, deliverables.
3. Summarize what you understood in 2 or 3 lines.
4. Do not ask for information that the user already gave.

### Phase 2 - First round of questions

Ask 4 to 6 questions. Group them by axis. Do not use numbered sub-bullets. Ask about gaps only.

Use these 4 axes. Ask at least one question for each axis that has a gap:

- **Context and problem**: What problem or opportunity starts the project? Who are the stakeholders?
- **Objectives and success criteria**: What are the 2 or 3 expected results? How will we know that the project succeeded?
- **Tech stack and constraints**: Which technologies must or should the project use? Are there constraints on integration, performance or security?
- **Deliverables and milestones**: Which deliverables does the project need? Are there fixed deadlines?

Write the questions in the language of the user.

### Phase 3 - Evaluate complexity

After the answers to round 1, decide if a second round is necessary.

Start a second round if one of these is true:
- The scope has 2 or more very different readings.
- Key technical constraints are still unclear.
- Success criteria are vague or missing.
- The project involves several teams and the stakeholders are unclear.

Skip the second round if both of these are true:
- You can fill all 4 brief sections with confidence.
- The project is simple and well scoped.

In a second round, ask 3 or 4 targeted questions. Do not repeat round 1.

### Phase 4 - Generate the brief

Write a Markdown brief with these sections, always in this order. Translate the headings and the content to the language of the user. Use French if the user wrote in French.

```markdown
# Project Brief - [Project name]

## 1. Context and Problem
[Context, opportunity or problem to solve. Identified stakeholders.]

## 2. Objectives and Success Criteria
[Main objectives. Measurable or observable success criteria.]

## 3. Tech Stack and Constraints
[Chosen or required technologies. Constraints on integration, security,
performance, compliance or organization.]

## 4. Deliverables and Milestones
[List of expected deliverables. Identified milestones or deadlines.]

---
*Brief generated on [DATE] - v1.0*
```

Rules:
- Be concise and complete. Do not add filler.
- Mark each real unknown as `⚠️ To clarify` (translated to the language of the user).
- Export the brief as a `.md` file with `present_files`.
- If `present_files` is not available, write `brief-<name>.md` in the current directory.

### Phase 5 - Close

After you present the file, stop. Do not propose next actions unless the user asks. The brief is the deliverable.

## Edge cases

| Situation | Behavior |
|---|---|
| The user gives rich context at the start | Ask only 3 or 4 questions that fill gaps. |
| The user gives one line of context | Ask the full round 1. Expect a round 2. |
| The project is not technical (process, organization) | Omit or adapt the "Tech Stack and Constraints" section. |
| The user asks to regenerate or update the brief | Run Phase 4 only, with the new input. |
| The user asks for a second set of questions ("deuxième série de questions") | Go to Phase 3. |
