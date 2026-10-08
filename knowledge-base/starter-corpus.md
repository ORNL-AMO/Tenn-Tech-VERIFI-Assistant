# VERIFI Assistant Starter Knowledge Corpus

This file is the customer-reviewed source of truth for the initial proof of concept. The reference PDFs provide additional context, but a reviewed record in this file takes precedence when the sources differ. General language-model knowledge is not an authoritative source for VERIFI behavior.

Every record has a stable ID so the assistant can cite the material used in an answer. `Reviewed` records may be used by the application. Future additions should preserve the same fields and must receive customer or domain review before being treated as authoritative.

## Setup and import

## KB-SETUP-01 — What VERIFI does

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What is VERIFI?”, “What can this tool help me do?”
- **Keywords:** utility tracking, energy, water, cost, emissions, analysis, reports, facilities
- **Safety:** Normal

### Customer-reviewed answer

VERIFI is a company- and facility-level utility-data tracking and analysis tool. It helps users organize and visualize utility bills, review energy, water, and cost information, evaluate data quality, create facility analyses, combine facility results at the company level, and prepare reports. It is designed to help industrial users understand performance and progress without requiring a commercial utility-tracking service.

VERIFI is available as a web application and a downloadable desktop application. Some features, especially filesystem-backed backups and connected bill files, are desktop-only.

### Limitations

Do not imply that VERIFI automatically finds or implements energy projects. It analyzes information entered or imported by the user. Do not claim that every feature is identical between the web and desktop versions.

### Sources

- [VERIFI User Guide, PDF pages 4–8](../reference/VERIFI-user-guide.pdf#page=4)

## KB-SETUP-02 — First startup

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “I just opened VERIFI. What should I do first?”, “Can I start from a backup or sample data?”
- **Keywords:** welcome, first time, create account, backup, sample data, contact
- **Safety:** Normal

### Customer-reviewed answer

The initial VERIFI screen offers several starting points:

1. Create a new account for a company or organization.
2. Load an existing VERIFI backup when continuing prior work.
3. Load sample data to explore the application.
4. Open information about VERIFI and related tools.
5. Contact the VERIFI team for help.

For a new real-world dataset, start by creating an account, enter the account defaults, add facilities, and then choose an appropriate data-entry or import workflow.

### Limitations

Loading a backup is different from importing utility data from a spreadsheet. Ask which kind of file the user has before giving detailed instructions.

### Sources

- [VERIFI User Guide, PDF pages 14–15](../reference/VERIFI-user-guide.pdf#page=14)

## KB-SETUP-03 — Account setup

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What information is required for an account?”, “Why does VERIFI ask for account defaults?”
- **Keywords:** company, account, ZIP code, NAICS, units, defaults, goals, GHG
- **Safety:** Normal

### Customer-reviewed answer

An account represents the company or organization whose facilities and utility data will be managed together. The account name is required. Point-of-contact information and a NAICS code are optional. Location information such as a ZIP code can support weather and greenhouse-gas workflows.

Account setup also establishes defaults that facilities can inherit, including collection or reporting units and relevant reporting preferences. Goals and reporting information can also be configured at the account level. Individual facilities may later override applicable inherited settings.

### Limitations

Do not invent required fields beyond the account name. Exact options can vary with the selected utility type or reporting workflow.

### Sources

- [VERIFI User Guide, PDF page 16](../reference/VERIFI-user-guide.pdf#page=16)

## KB-SETUP-04 — Backups, restores, and data-loss warnings

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop, with desktop-only features identified below
- **User intents:** “How do I back up my account?”, “Can I restore a JSON file?”, “Will uninstalling or clearing storage remove my data?”
- **Keywords:** backup, restore, JSON, automatic backup, browser storage, uninstall, cache, delete account
- **Safety:** Destructive-action warning

### Customer-reviewed answer

VERIFI can create a manual account backup and import a VERIFI JSON backup. The desktop application can also be configured to save automatic backups to a selected filesystem location. A backup should be created before troubleshooting actions that might affect locally stored application data.

VERIFI data is stored locally. Uninstalling the desktop application may remove locally stored data, and clearing the web application’s browser storage or site data may remove web data. Deleting an account removes that account from VERIFI. Treat each of these as destructive actions.

### Required warning

Never recommend uninstalling, clearing browser/application storage, or deleting an account as routine troubleshooting. First direct the user to create and verify a backup. If the user cannot open VERIFI or create a backup, escalate to the VERIFI support team rather than guessing.

### Sources

- [VERIFI User Guide, PDF pages 12 and 17](../reference/VERIFI-user-guide.pdf#page=12)
- [VERIFI Tips & Tricks, PDF page 9](../reference/VERIFI-tips-tricks.pdf#page=9)

## KB-SETUP-05 — Facility setup

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How do facilities relate to an account?”, “Can facilities use different settings?”
- **Keywords:** facility, site, inherit, override, units, goals, color, portfolio
- **Safety:** Normal

### Customer-reviewed answer

A VERIFI account can contain one or more facilities. Facility setup is similar to account setup, and facilities inherit applicable account settings by default. A facility may use different points of contact, collection units, reporting goals, and other facility-specific settings when necessary. Facilities can also be color-coded to make them easier to identify while navigating a portfolio.

Use the facility-management workflow to create facilities and organize the sites included in the account.

### Limitations

Do not assume that every account-level setting can be overridden. Refer only to the options presented by VERIFI for the selected facility.

### Sources

- [VERIFI User Guide, PDF page 18](../reference/VERIFI-user-guide.pdf#page=18)

## KB-SETUP-06 — Choosing and completing a data-entry method

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Should I use the template, wizard, manual entry, or a backup?”, “How do I upload data?”
- **Keywords:** upload, import, Excel template, wizard, manual entry, drag and drop, VERIFI export
- **Safety:** Normal

### Customer-reviewed answer

Choose the workflow based on the source and volume of data:

- Use a VERIFI backup or export when restoring or transferring an existing VERIFI dataset.
- Use the VERIFI Excel template for first-time setup involving multiple facilities, multiple meters, long histories, predictors, or data beyond energy consumption.
- Use the data-import wizard for legacy EnPI files or other column-formatted worksheets. The wizard identifies date, meter, and predictor columns and maps them to facilities.
- Use manual entry to create individual meters and enter readings when the volume is small or when adding routine monthly updates.

To start a spreadsheet import, open **Upload Data**, choose or drag in the file, and follow the guided review steps before submitting it.

### Limitations

Ask what kind of file and how much data the user has before choosing a method. Manual entry is usually inefficient for large historical datasets.

### Sources

- [VERIFI User Guide, PDF pages 22–27](../reference/VERIFI-user-guide.pdf#page=22)

## Meters and data

## KB-DATA-01 — What a meter represents

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What does VERIFI mean by meter?”, “Do non-utility values use meters too?”
- **Keywords:** meter, bill, utility, fuel, mobile, fugitive, output, REC, group
- **Safety:** Normal

### Customer-reviewed answer

VERIFI associates usage data with a meter. For utilities, a meter may represent an individual billed meter or a pre-grouped utility data point. For non-utility sources—such as mobile fuel, other outputs, fugitive releases, or certain financial agreements—the meter represents the amount used, purchased, or released over a period.

Starting with individual meters provides flexibility. Users can monitor separate areas, group meters differently for analysis, and calendarize meters independently when their billing periods do not align.

### Limitations

A VERIFI meter is a data-model concept and does not always correspond one-to-one with a physical utility meter.

### Sources

- [VERIFI User Guide, PDF page 27](../reference/VERIFI-user-guide.pdf#page=27)

## KB-DATA-02 — Meter readings versus monthly meter data

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Why are there two meter tables?”, “Which table shows exactly what I entered?”
- **Keywords:** meter readings, monthly data, raw, processed, calendarized, converted units
- **Safety:** Normal

### Customer-reviewed answer

**Meter Readings** shows the raw data as entered or imported, including meter-read dates, bill units, consumption or loss, costs, and charges.

**Meter Monthly Data** shows processed monthly results. Depending on the meter settings, VERIFI may allocate readings into consistent monthly periods and convert values into facility units. Use the readings view to verify source entries and the monthly view to review the data that downstream visualizations and analyses use.

### Limitations

Do not describe processed monthly values as corrections to the original bill. They are derived values produced by the configured calendarization and unit settings.

### Sources

- [VERIFI User Guide, PDF page 28](../reference/VERIFI-user-guide.pdf#page=28)

## KB-DATA-03 — Calendarization

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Why should I calendarize bills?”, “Where do I choose a calendarization method?”
- **Keywords:** calendarization, billing period, monthly, annualize, meter read date
- **Safety:** Normal

### Customer-reviewed answer

Utility billing periods often begin and end on irregular read dates. Calendarization allocates the billed usage into consistent monthly periods so months and years can be compared and combined more meaningfully.

To configure it, open the meter’s **Monthly Meter Data**, choose **Select Method**, and select the method appropriate for that meter. Repeat the review for each meter that requires calendarization. For data entered quarterly or annually, an **Annualize over year** option may be appropriate when available.

### Limitations

The assistant should explain the purpose and documented options but should not choose a method without knowing the data frequency and intended analysis.

### Sources

- [VERIFI User Guide, PDF pages 27 and 36](../reference/VERIFI-user-guide.pdf#page=27)

## KB-DATA-04 — Meter grouping

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Why do I need meter groups?”, “How should I group meters for analysis?”
- **Keywords:** meter group, analysis group, process, production, office, renewable, REC, mobile
- **Safety:** Normal

### Customer-reviewed answer

Analysis groups are collections of meters evaluated together. Open **Meter Groupings** to create or edit groups and assign meters.

Groups should reflect the question being analyzed. Users might separate production energy from office energy, combine related utility meters, keep mobile-fuel meters together, or place other meters and renewable-energy certificates in separate groups. Starting with individual meters makes it possible to try different meaningful groupings later.

### Limitations

There is no single grouping that is correct for every facility. Ask what processes, utility sources, or reporting boundaries the user wants to evaluate.

### Sources

- [VERIFI User Guide, PDF page 37](../reference/VERIFI-user-guide.pdf#page=37)

## KB-DATA-05 — Data quality and MAD-based outliers

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What does the data-quality warning mean?”, “Does an outlier prevent analysis?”
- **Keywords:** data quality, outlier, MAD, median, histogram, warning, predictor
- **Safety:** Caution

### Customer-reviewed answer

The data-quality reports help users find potential problems in meter and predictor data. They provide time-series graphs, histograms, and calculated outliers. Outlier detection uses a median-based MAD approach rather than relying only on a mean.

The results are informative. A flagged value does not automatically stop an analysis and is not proof that the value is wrong. Review the source bill or record, units, dates, duplicates, facility assignment, and surrounding trend before deciding whether a change is justified.

### Required warning

Do not tell users to delete or alter a flagged value solely because VERIFI identifies it as a potential outlier.

### Sources

- [VERIFI User Guide, PDF page 29](../reference/VERIFI-user-guide.pdf#page=29)
- [VERIFI Tips & Tricks, PDF page 11](../reference/VERIFI-tips-tricks.pdf#page=11)

## KB-DATA-06 — Weather predictors

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop; internet access may be required for source data
- **User intents:** “How do I add weather data?”, “Why would an analysis use weather predictors?”
- **Keywords:** weather, station, ZIP code, city, radius, balance temperature, degree days, bulk update
- **Safety:** Normal

### Customer-reviewed answer

Weather can be a relevant variable when facility energy use changes with outdoor conditions. VERIFI can locate weather stations and generate weather predictors for analysis.

Open **Weather Data**, search by ZIP code or city or select a facility, and set a station-search radius. Select a station to review its information, configure applicable balance temperatures, review data integrity, and assign the resulting weather data to a facility. The **Bulk Update** workflow can update established weather data more quickly.

### Limitations

Weather data is not automatically relevant to every meter or analysis. The assistant should not select a station, balance temperature, or predictor without the user’s context.

### Sources

- [VERIFI User Guide, PDF page 38](../reference/VERIFI-user-guide.pdf#page=38)

## Analysis and reports

## KB-ANALYSIS-01 — Prerequisites for an analysis

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What do I need before creating an analysis?”, “Why am I not ready to run a regression?”
- **Keywords:** analysis, consumption, predictor, production, calendarization, groups, weather, correlation
- **Safety:** Normal

### Customer-reviewed answer

Before creating a useful facility analysis, the user should have consumption data and any production-related predictors needed for normalization. The data should be reviewed and prepared by:

- Calendarizing meters when billing periods are inconsistent.
- Creating meaningful meter groups.
- Generating weather predictors when weather may affect usage.
- Exploring relationships between usage and possible predictors.

Regression additionally requires suitable predictor data and enough valid observations to evaluate candidate models.

### Limitations

The assistant may identify missing preparation steps, but it should not claim that a dataset is statistically suitable without inspecting the required data and validation results.

### Sources

- [VERIFI User Guide, PDF page 35](../reference/VERIFI-user-guide.pdf#page=35)

## KB-ANALYSIS-02 — Absolute, intensity, and regression analyses

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Which analysis types does VERIFI support?”, “How do absolute, intensity, and regression differ?”
- **Keywords:** absolute, intensity, regression, normalization, baseline, savings
- **Safety:** Normal

### Customer-reviewed answer

VERIFI supports facility-level absolute, intensity, and regression analyses:

- **Absolute** analysis evaluates change in total usage without normalizing it to a separate activity variable.
- **Intensity** analysis relates usage to a selected activity or production measure.
- **Regression** analysis models usage using one or more predictor variables and supports normalized comparisons when an acceptable model is available.

The choice should match the facility’s data, operating conditions, and reporting goal. A more complex method is not automatically better.

### Limitations

Do not recommend a type without asking what data and normalization variables are available. Do not calculate savings from these descriptions.

### Sources

- [VERIFI User Guide, PDF pages 41–42](../reference/VERIFI-user-guide.pdf#page=41)

## KB-ANALYSIS-03 — Facility analysis setup and regression selection

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How do I set up a facility analysis?”, “What extra step does regression require?”
- **Keywords:** facility analysis, name, baseline year, analysis type, regression model, group
- **Safety:** Normal

### Customer-reviewed answer

To create a facility-level analysis:

1. Give the analysis a useful name and select its baseline year.
2. Choose the analysis type.
3. For regression, review the candidate models and select an appropriate valid model.
4. Complete the required setup for each included analysis group.
5. Review the resulting facility analysis before using it in reports or a company roll-up.

### Limitations

The assistant can explain validation results, but the user remains responsible for choosing a model that makes operational and statistical sense. A model should not be selected solely because it appears first.

### Sources

- [VERIFI User Guide, PDF page 42](../reference/VERIFI-user-guide.pdf#page=42)

## KB-ANALYSIS-04 — Regression model validity

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “Why is a regression model invalid?”, “What statistical checks does VERIFI use?”
- **Keywords:** regression, validity, R2, adjusted R2, p-value, coefficient, predictor range
- **Safety:** Calculation/statistical rule

### Customer-reviewed answer

For a generated regression model, VERIFI applies these core validity checks:

- Model p-value must be no greater than `0.1`.
- Predictor-variable p-values must each be no greater than `0.2`.
- At least one predictor variable must have a p-value below `0.1`.
- R² must be at least `0.5`.

VERIFI may also display informational notes, including negative coefficients or an adjusted R² below `0.5`. Separate validation compares baseline- and report-year predictor means with the model’s observed range and a range based on three standard deviations. These messages require review; they should not be silently ignored or treated as proof that the underlying data is wrong.

### Supersedes a source conflict

The model p-value threshold of `0.2` shown on page 13 of the tips deck is outdated. This customer-reviewed record supersedes that value; use `0.1`.

### Sources

- [VERIFI Tips & Tricks, PDF page 13](../reference/VERIFI-tips-tricks.pdf#page=13)

## KB-ANALYSIS-05 — Company roll-up analysis

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How do I combine facility analyses?”, “Why does a facility analysis not appear in the company analysis?”
- **Keywords:** company analysis, roll-up, facility analysis, baseline year, report year, new facility
- **Safety:** Normal

### Customer-reviewed answer

A company-level analysis rolls selected facility analyses into company-level performance. Create the company analysis, set its baseline and report years, select the eligible facility analyses, and review the combined result.

Facility analyses ordinarily need compatible baseline and report years to be included together. A facility identified as new may use its first complete reporting year as its facility baseline and can be marked as a new facility so the differing baseline can be handled in the company analysis.

### Limitations

Do not recommend marking an established facility as new merely to bypass a year mismatch. Confirm the facility’s reporting status and data history.

### Sources

- [VERIFI User Guide, PDF pages 44–45](../reference/VERIFI-user-guide.pdf#page=44)
- [VERIFI Tips & Tricks, PDF page 16](../reference/VERIFI-tips-tricks.pdf#page=16)

## KB-ANALYSIS-06 — Reports and exports

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “What reports can VERIFI create?”, “Can I export a report?”
- **Keywords:** report, Excel, PDF, Better Plants, Better Climate, water, performance, modeling, data overview
- **Safety:** Normal

### Customer-reviewed answer

VERIFI provides facility- and company-level reports based on entered data and completed analyses. Examples include analysis results and regression-quality information, data-overview reports, savings reports, Better Plants energy and water reports, Better Climate Challenge reports, energy-performance reports, and modeling reports.

Available reports can be viewed in VERIFI, and supported report screens provide export options such as Excel or PDF. Report availability depends on the required setup, data, and analysis results.

### Limitations

Creating or exporting a report does not submit it to an outside organization. The corpus does not document external submission workflows or the exact formulas behind every reported value.

### Sources

- [VERIFI User Guide, PDF pages 40, 43, and 46](../reference/VERIFI-user-guide.pdf#page=40)
- [VERIFI Tips & Tricks, PDF page 7](../reference/VERIFI-tips-tricks.pdf#page=7)

## Navigation, usability, and safety

## KB-NAV-01 — Navigation and dynamic help

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How do I move around VERIFI?”, “Where is the help for my current screen?”
- **Keywords:** navigation, sidebar, icons, search, help panel, account, facility
- **Safety:** Normal

### Customer-reviewed answer

VERIFI uses navigation panels, icons, tabs, and menus to move between account and facility workflows. Common areas include Home, Utility Data, Overview, Data Visualization, Analysis, Reports, and Settings. Users can switch accounts or facilities using the available context controls.

The help panel contains dynamic content and changes with the current page. It can be opened or closed when more workspace is needed. The navigation sidebar can also be collapsed, and search can help locate items.

### Limitations

Labels and placement vary by workflow. If the user gives the current page or task, answer with the most specific documented path instead of assuming their location.

### Sources

- [VERIFI User Guide, PDF pages 19–21](../reference/VERIFI-user-guide.pdf#page=19)
- [VERIFI Tips & Tricks, PDF page 6](../reference/VERIFI-tips-tricks.pdf#page=6)

## KB-NAV-02 — Graph controls and legends

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How do I zoom or reset a graph?”, “How do I hide one data series?”, “Can I save the graph?”
- **Keywords:** Plotly, graph, zoom, pan, autoscale, reset, legend, PNG, hover
- **Safety:** Normal

### Customer-reviewed answer

Many VERIFI graphs use a Plotly toolbar. Depending on the graph, it can save the graph as a PNG, zoom, pan, select data, draw shapes, autoscale, or reset the axes. Double-clicking the graph can also reset its axes. Hover over plotted data to see values.

Click a legend item to hide or show that series. Double-click a legend item to hide the other series and focus on the selected one.

### Limitations

Not every graph exposes every toolbar control. Describe only the controls visible on the user’s graph.

### Sources

- [VERIFI Tips & Tricks, PDF pages 3–5](../reference/VERIFI-tips-tricks.pdf#page=3)

## KB-NAV-03 — Copying tables and exporting reports

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “How can I inspect this table in Excel?”, “Can I send a report to Excel or PDF?”
- **Keywords:** copy table, clipboard, Excel, PDF, export, report
- **Safety:** Normal

### Customer-reviewed answer

When a table provides a **Copy Table** button, use it to copy the displayed table for further inspection in another application such as Excel. Supported report screens also provide Excel or PDF export buttons.

Copying a table is useful for independent review when a result appears unexpected, but the exported copy does not change the data stored in VERIFI.

### Limitations

Not every table or report has every export option. Do not promise a format unless its button is available on the current screen.

### Sources

- [VERIFI Tips & Tricks, PDF pages 7–8](../reference/VERIFI-tips-tricks.pdf#page=7)

## KB-NAV-04 — Desktop automatic backups

- **Status:** Reviewed
- **Applies to:** VERIFI v0 desktop only
- **User intents:** “What does autosave mean?”, “Can VERIFI keep an extra backup archive?”
- **Keywords:** autosave, automatic backup, desktop, archive, one-time save, shared backup
- **Safety:** Caution

### Customer-reviewed answer

The desktop application can save an automatic account backup to a selected location. It also supports a one-time manual save. When configured, the interface indicates whether the automatic backup is current. Additional checks may appear when a shared backup has changed since it was last opened, and an archive copy can provide additional history.

### Required warning

An automatic backup is not a substitute for verifying that the selected location is accessible and that a backup file can be restored. Web users should use the available manual backup workflow because filesystem-backed autosave is desktop-only.

### Sources

- [VERIFI User Guide, PDF page 17](../reference/VERIFI-user-guide.pdf#page=17)
- [VERIFI Tips & Tricks, PDF page 9](../reference/VERIFI-tips-tricks.pdf#page=9)

## KB-NAV-05 — Diagnosing incorrect units or duplicate readings

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop
- **User intents:** “My graph looks wrong. What should I check?”, “Could I have duplicate readings or incorrect units?”
- **Keywords:** troubleshooting, wrong units, duplicate, visualization, data quality, source bill
- **Safety:** Caution

### Customer-reviewed answer

When data looks wrong, begin with evidence rather than changing values immediately:

1. Review Data Visualization for unexpected jumps, scale differences, or repeated periods.
2. Open the applicable Data Quality Report and review its time-series graph, histogram, and warnings.
3. Compare suspicious records with the raw Meter Readings table and the original bill or source data.
4. Check the meter’s starting units and facility units.
5. Check for overlapping or duplicate readings for the same period.
6. Correct a record only after confirming the source of the problem.

### Required warning

The assistant cannot determine why a specific result is wrong without the relevant settings and data. It should ask for context and avoid asserting a diagnosis from a symptom alone.

### Sources

- [VERIFI Tips & Tricks, PDF pages 10–11](../reference/VERIFI-tips-tricks.pdf#page=10)

## KB-NAV-06 — Developer console, hard refresh, and storage deletion

- **Status:** Reviewed
- **Applies to:** VERIFI v0; web and desktop, with platform-specific shortcuts
- **User intents:** “Should I use developer tools?”, “Will a hard refresh fix this?”, “Can I delete application storage?”
- **Keywords:** developer console, DevTools, console, hard refresh, application storage, cache, errors
- **Safety:** Destructive-action warning

### Customer-reviewed answer

Developer tools can show console errors that help diagnose a problem. A hard refresh can force the browser to reload application resources. These are technical troubleshooting tools, not normal VERIFI workflows.

The Application or Storage area in developer tools can delete locally stored VERIFI data very quickly. Clearing browser site data, application storage, or caches that contain VERIFI data can cause permanent data loss.

### Required warning

Do not instruct a user to delete storage as a general fix. First create and verify a backup. If the problem persists, collect the error information and contact VERIFI support. Use platform-specific shortcuts only when the user explicitly asks how to open developer tools.

### Sources

- [VERIFI Tips & Tricks, PDF page 2](../reference/VERIFI-tips-tricks.pdf#page=2)
- [VERIFI User Guide, PDF page 12](../reference/VERIFI-user-guide.pdf#page=12)
