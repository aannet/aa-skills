# Numbers

Use these rules for each figure in a deliverable. A request from the user can cancel any rule. Then apply the new choice everywhere.

## Percentages

- Round to a whole number.
- Write "moins de 1 %" for a value between 0 and 1.
- Write "0 %" only when the value is exactly zero.
- Round shares that appear together so that they add up to 100. Use the largest remainder method.
- Group shares under 1 % in one line, "autres". Do not force them into the sum.
- If the base is small (under 20), show counts and not percentages. This is the one allowed exception to the single-format rule.

Examples:

| Before | After |
|---|---|
| 47,6 % des commandes | 48 % des commandes |
| 0,4 % de départs | moins de 1 % de départs |
| 3 sur 8 (37,5 %) | 3 sur 8 |

## Do not round away the message

When two values differ by less than the rounding step, follow this order:

1. If the gap is the message (a change, or a gap to a target), show it. Use a word ("en hausse", "un peu au-dessus") or keep one decimal in that one place. Tell the user why.
2. If the gap is not the message, say that the values are level. Do not rank them.
3. In a sorted list or table, keep the order. Do not claim that rank gaps are real.

A target or a limit stays exact, whoever fixes it: a contract, a rule or the team. Round a measured value. Keep the measure and its target in the same unit, so that the gap stays visible.

Examples:

| Before | After |
|---|---|
| objectif 21 jours, réalisé 23,4 jours | objectif 21 jours, réalisé 23 jours |
| absentéisme 3,71 % puis 4,18 % | absentéisme stable, autour de 4 % |

## Ratios and changes

- Replace a ratio with words: "environ 2 sur 3", "presque 2 fois plus".
- Write a change in points as a whole number: "+3 points".
- If the direction is the message, use a word: "en hausse", "en baisse", "stable".

Examples:

| Before | After |
|---|---|
| ratio 0,63 | environ 2 sur 3 |
| 1,87 fois la moyenne | presque 2 fois la moyenne |
| +3,2 pt | +3 points |

## Durations

- Use the unit that a person thinks in:
  - under 1 day: hours;
  - 1 to 13 days: days;
  - 14 days to 11 weeks (84 days): weeks;
  - 12 weeks to 23 months: months;
  - 2 years or more: years.
- Add "environ" when you round. Do not add it to an exact value, such as exactly 14 days or 2 months.
- Do not show hours, minutes and seconds unless the process is that short.

Examples:

| Before | After |
|---|---|
| 94 jours | environ 3 mois |
| 17 jours | environ 2 semaines |
| 5 h 47 min | environ 6 h |

## Large numbers and money

- Round a number of 10 000 or more to two significant figures: "environ 2 millions".
- Keep a count under 10 000 exact, if the reader can count the items: people, orders, sites.
- Keep an exact count when the reader must process each item, such as a work list.
- Use a short money form: "1,2 M€", "850 k€".
- Use a thin space as the thousands separator.

## Small values and rates

- Round to two significant figures. Never round a value to zero.
- Keep the cents of a unit price: "2,18 € par colis".
- Write a rate with its base: "pour 1 000", "par tonne". Never invent a base. If you do not know it, ask the user, or keep the term and define it.
- Write a percentile as a count: "9 sur 10" (p90), "19 sur 20" (p95). Never present a percentile as a typical value.

## Dates

- Write "18 novembre". Do not write a full timestamp.
- Add the year only if it is not clear.
- Add a time only if the reader needs it.

## French typography

- Use a comma as the decimal mark.
- Put a non-breaking space before %, € and units.
- Use the same form for each kind of value in the whole deliverable.

## Where to show an exact value

Show an exact value in the main view in two cases only. The reader must process each item, such as a work list. Or the reader must compare a value to a fixed limit. Round all other values.

## Number budget

These values are a starting point. The user can change them.

- 3 to 5 KPIs on one screen.
- 1 key figure for each block.
- 1 figure in each sentence of running text, bullets included. A comparison to a target may carry two figures. Tables, tooltips and annexes are not under this limit.
- If an important signal needs more figures than the budget allows, keep it. Name it in the report.
- A table has 7 columns or fewer (manager) or 5 columns or fewer (direction).

Move the other figures to a detail layer: a tooltip, a detail page, an annex or an export. Keep the annex short: only the values that a reader may need, grouped by topic. It must not be longer than the main text.

## Axes and scales

- A bar chart starts at zero.
- If a line chart does not start at zero, say it in the chart title or caption.
- Label axes in words, with a short unit.
- For chart mechanics, use the `dataviz` skill.
