# Formats

Read the part that matches the deliverable.

## Generated deliverables (code, templates)

Many deliverables come from a script or a template. A fix in the output file is lost at the next build.

1. Find the generator. Look for scripts, templates and data files that write the output.
2. Edit the generator. Build the deliverable again.
3. Find each place that formats a number. Search for decimal formatting in the language of the code: fixed-decimal calls, format strings with decimals, rounding calls, locale formatters.
4. Create one formatter for each kind of value: percentage, duration, large number, date, money.
5. Send each output through these formatters. Do not format a value in line.
6. If a deliverable has several pages or views, share the formatters between them.
7. Cover text that the pipeline writes into data files, such as labels or messages. Use one rule for each kind of value. If two languages need the rule, test both against the same cases.
8. Check if the output depends on today's date. If it does, build again with the original reference date. Use an argument or an environment variable, in a temporary copy if needed. If you cannot fix the date, report the drift. Then compare only the facts that do not depend on the date.
9. Build again. Check that each kind of value has one format on every page.
10. Compare the facts before and after: counts, lists, rankings. Only the wording and the format can change.

Work with large generated files:

- Read the generator, not the output. Output files can be very large.
- Find formatting by pattern search, not by reading line by line.
- Long template lines: patch with an exact string replacement in a script.
- If the project has rules for changes (a changelog, a version file, a notes file), follow them.

Example of a formatter, in JavaScript:

```js
const pct = (x) => `${Math.round(100 * x)} %`;
```

## Dashboards

For chart mechanics (axes, colors, legends, KPI tiles), use the `dataviz` skill. This section covers only the information load.

- Keep 3 to 5 KPIs on the first screen.
- Give each KPI a plain label and one short line of context.
- Write each view title as a message.
- Reduce table columns to the budget. Merge related columns.
- Replace a stack of counts and bars with one split that the reader can see.
- Put short definitions in a tooltip. Put long definitions, thresholds and exact values in a detail view, an expandable section, a footer note or an export.
- A tooltip does not work with a keyboard or on a phone. Do not hide required information there.
- Show a zero as "0" when zero is information. Show a dash only for "not applicable", and explain it in a legend. Never leave a cell blank without a reason.
- State the scale if an axis does not start at zero.
- Look for empty values, placeholders and raw identifiers in labels. Fix the data path, not only the text.

Check the result:

- If you have a browser, open each page and check the table widths and the line breaks.
- If you have no browser, run a script check that renders each view and finds "undefined" and "NaN". Tell the user that you did not check the look.

## Reports and notes

- Open with a summary of 3 to 5 lines: the answer, the figure that matters, the action.
- Keep each section short and able to stand alone.
- Put method, sources and exceptions in an annex.
- One page is the target for the manager level.

## E-mails

- Write the subject as the request or the message.
- Put the action and the deadline in the first two lines.
- Use bullets for options or items.
- Remove greetings and closing phrases that carry no meaning.
- Put the exact figures in a short block at the bottom, 10 lines or fewer, or in an attachment.
- If the e-mail goes to a list, write for the reader who knows the least.
- If "who" or "by when" is missing, write "à préciser" and list it as an open question. Do not invent it.

## Slides

- Put one message on each slide. The title is the message.
- Show one figure or one chart on each slide.
- Move the detail to the speaker notes or an annex.
