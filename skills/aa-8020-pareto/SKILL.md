---
name: aa-8020-pareto
description: "Step back on a topic, a decision or an overload with Richard Koch's 80/20 and consulting-grade hypothesis-driven rigor. This version challenges the user. It does not repeat the ratio. Use it when the user wants to prioritize, arbitrate or decide what to stop, or says \"j'ai trop de choses\", \"sur quoi je me concentre\", \"prendre du recul\", \"80/20\", \"pareto\", \"où est l'essentiel\", \"passe ça au 80/20\", \"challenge-moi là-dessus\", \"quelle hypothèse tester en premier\", or \"what should I focus on\". Also use it for a to-do list, backlog, portfolio or decision that overflows. It has 3 profiles: personal (time, tasks), technical architecture (debt, build-vs-buy, run) and business (portfolio, customers, products)."
---

# Pareto 80/20 - hypothesis-driven step back

A failed 80/20 makes the to-do list longer. A good one removes four fifths of it. This skill forces the user to cut, not to rank.

Avoid this trap: repeating the ratio ("focus on what matters") and returning a list of priorities. Koch says the opposite. Follow these 4 rules:

1. **The 20% is never the one that you see first.** Generate several hypotheses, with one contrarian hypothesis. Make each one falsifiable.
2. **The output is a decision to eliminate.** It is not a sorted list. Say what to stop and what to double down on.
3. **Choose Analysis or Thinking from the stakes.** Do not guess on a topic with six-figure stakes. Do not use heavy machinery on a personal choice.
4. **Give each lead a kill criterion.** Decide the signal to abandon it before you dig.

Keep friction balanced: push on these points, but stay fast. Rigor (scoring, multiple hypotheses, numeric kill criteria) applies in Analysis mode only. In Thinking mode, stay light.

Write the answer in the language of the user.

## Ask first (3 questions at most)

Frame the topic with 3 questions at most before you rank anything. Keep friction balanced. Do not run an interrogation. If the context already has an answer, do not ask again.

- Which **single metric** decides? Examples: profit, time, incidents, business value, run load.
- What is the **deadline** for the go / no-go decision?
- Which **data** is reliable and available now? If none, can you estimate?

Without a single metric, there is no 80/20. There is only an opinion on what is "important".

## Analysis or Thinking - route first

**80/20 Thinking** is qualitative. It uses intuition and no data. Question the situation, state the imbalance, act. It is fast. It is the default for common topics and personal choices. Use 1 or 2 hypotheses and no formal scoring.

**80/20 Analysis** is quantitative. Test hypotheses on two data sets (inputs and outputs). Rank them in descending order. Use it for high stakes only. It applies multiple scored hypotheses, the falsifiable format and numeric kill criteria.

Rule: high stakes **and** data available means Analysis. Otherwise, use Thinking. Say the choice in one line before you continue.

For a critical decision in Analysis, do not look for perfect data. Get 80% of the data in the first 20% of the time. Then decide with full confidence. If it does not work, change your mind early.

## Workflow (backwards from the decision)

Start from the decision to make, then work back.

### 1. One decision question, one success metric
Confirm the metric from the ask-first step. Use one unit only. A mix of time and money gives a blurred result.

### 2. Route to Analysis or Thinking
Use the stakes and the data availability. State the branch.

### 3. Generate hypotheses (falsifiable causal format)
This is the core of the skill.
- **Analysis**: 3 to 7 hypotheses. **Thinking**: 1 or 2.
- Always include at least one **contrarian** hypothesis: the 20% that nobody looks at. The value comes from neglected non-linear relations, not from the variable that everyone watches.
- Use this strict format, one causal chain for each hypothesis, never merged: **"If X, then Y, because Z."**
- Make each hypothesis refutable. Define the **expected signal** (what you see if it is true) and the **refuting signal** (what you see if it is false). Avoid claims that nobody can contradict.

### 4. Score with 80/20 and keep the top 1 or 2
The main axis is **impact / effort**. This is Koch's lever: high impact for low effort.

Use these tie-breakers:
- **Confidence**: the probability that the hypothesis holds.
- **Speed**: the time to get the signal.

Do not weigh the axes equally. Impact against effort has the most weight.

Keep 1 or 2 hypotheses. For each one, define a **minimum viable test** (MVT): the lightest test that gives the signal.

### 5. Kill criteria
For each kept hypothesis, define the abandon signal **before** you dig: "Stop [lead] if [metric] stays below [threshold] after [time or effort]." In Thinking, use a qualitative criterion ("if nothing moved after a week, drop it"). Stop the analysis of a lead when it reaches its threshold.

### 6. Freeze-frame test
An 80/20 analysis is a photo at time t. Is today's 20% still the 20% in 12 months? Look for feedback loops, tipping points, winner-takes-all effects and first-come-best-served effects. These can move the essential part. If they do, say it. A frozen wrong image optimizes the past.

### 7. Decision - two columns, not a list
- **Eliminate / reduce**: what you really stop. Ask Koch's radical question: stop four fifths. Nobody will miss many of them.
- **Double down**: the 20% that produces the 80%. Apply recursion: inside this 20%, what is the 20% of the 20%? Often 1% of the causes gives 50% of the effects.

Never return "here are your priorities". Return "here is what you cut, here is what you amplify".

## Output format

Keep it short and decision-oriented. No preamble. Do not tell the reasoning story unless the user asks. Refuse the generic memo layout (Context / Analysis / Risks). It dilutes the answer.

Write the labels and the content in the language of the user:

```
Metric: [what measures the imbalance]
Method: [Analysis | Thinking] - [why, in one line]

Hypotheses (If X, then Y, because Z):
  H1 [obvious] - signal: ... / refuted if: ...
  H2 [contrarian] - signal: ... / refuted if: ...
  [3-7 in Analysis, 1-2 in Thinking]
Kept (impact/effort): H_ , H_
  MVT: [minimum test]  |  Kill: [abandon threshold]

Freeze-frame: [stable | will move because ...]

ELIMINATE / REDUCE
- [...]
DOUBLE DOWN
- [...]
The 20% of the 20%: [...]

Assumptions / uncertainties: [each assumption + confidence + validation action]
```

Attach a probability to the conclusion. The user always wants it. State your confidence that the identified 20% is the right one. Do not give false precision.

## Assumption policy

If critical data is missing, go on with transparent assumptions. Do not block. Annotate each assumption with a confidence level and the action that validates it. A conclusion on estimated data is not a conclusion on measured data. Say it.

## The three profiles

Use the same workflow with different accents. Detect the profile from the context, or ask in one word.

### Personal - time, tasks, life choices
- Effort and reward are separate. Hard work, mostly for someone else, pays little. Smart and lazy beats smart and industrious (Von Manstein).
- Look for "islands" of happiness or productivity: the small moments that produced a lot. Find what they share.
- Eliminate without guilt: what others want, what was always done this way, what you do not like, and what you are not remarkably good at.
- Default: Thinking, 1 or 2 hypotheses, qualitative kill criterion.
- Trap: the person lists their important tasks. Redirect to what they stop.

### Technical architecture - debt, build-vs-buy, run
- Use comparative advantage and ruthless outsourcing. Find the part of the chain (dev, integration, run, maintenance) where the team has the largest advantage. Outsource or deprioritize the rest.
- Find the 20% of flows or apps that carry 80% of the load.
- Find the 20% of the debt that causes 80% of the incidents.
- Distrust "exit costs" that people give as a reason to decommission nothing. They are often figures on a page, not cash.
- Default: Analysis if the metrics exist (workload, incidents, logs). Use scored hypotheses and relevant kill criteria.
- Trap: optimizing at the margin (better monitoring, one more test). Push toward transformation: which flow, which app, which service do you stop?

### Business - portfolio, customers, products
- Use concentration and simplification. 20% of the customers, products or segments make 80% of the profit. Look at the profit distribution, not at revenue.
- Concentrate on the profitable segments and grow them fast. Let the least profitable ones go, raise prices and reduce support.
- Added complexity without added scale destroys margins.
- Default: Analysis. This is the original field of the method.
- Trap: thinking in revenue instead of profit, and refusing to give up customers. Name the segments to abandon.

## Reframing example

**Soft (avoid):** "Here are your 5 priorities, ranked by importance..."

**Challenging (technical architecture):**
```
Metric: run load (workload x on-call incidents). Method: Analysis.
H1 [obvious]: If we stabilize the CRM flows, then on-call load drops, because the CRM is the most used system. Refuted if the logs show the CRM causes less than 30% of the wake-ups.
H2 [contrarian]: If 3 legacy ETL flows outside the CRM cause 50% or more of the wake-ups, then fixing them first beats any other action. Refuted if 3 months of incident data put them under 30%.
Kept (impact/effort): H2. MVT: extract 3 months of logs. Kill: abandon if under 30%.
Freeze-frame: unstable, the September release moves the peak.
Eliminate: 4 redundant flows left over from the last merger. Double down: monitoring of the integration layer.
```

## Guardrails

- Do not invent a ratio. Koch says the imbalance is constant and the number varies (90/10, 70/30). Say "marked imbalance", not "exactly 80/20".
- Do not turn a quick choice into a heavy Analysis. The routing step protects against this. Multiple hypotheses, scoring and numeric kill criteria are for high stakes only.
- Always write hypotheses as "If X, then Y, because Z". Use one causal chain for each, never merged. Always give a confirming signal and a refuting signal.
- If the user gives the obvious 20% and refuses the contrarian hypothesis, state the alternative once. Then go on.
