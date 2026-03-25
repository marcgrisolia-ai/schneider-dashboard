Create a high-fidelity, presentation-ready dashboard UI that looks like a premium Illustrator-designed slide, inspired by Power BI aesthetics but cleaner and more editorial.

Project goal:
Design an animated data dashboard for certification coverage, with crystal-clear hierarchy, strong visual polish, and executive readability.

Data (use exactly this):
UL = 23
Bureau Veritas = 15
DEKRA = 13
BV Marine = 8
DNV = 4
LCIE = 2
TÜV = 2
ASEFA = 1
Total = 68
Top certifier = UL (23)
Top 3 share = 75%

Deliverables:
Create 2 desktop artboards and 1 mobile adaptation.
Desktop 1: Static final state.
Desktop 2: Animation-ready state sequence (or component variants).
Mobile: Responsive adaptation preserving hierarchy and visual quality.

Frame setup:
Desktop size 1600x1000.
Mobile size 390x844.
Use 12-column grid on desktop, 24 px margins, 24 px gutters.
Use 4-column grid on mobile, 16 px margins, 12 px gutters.
Use 8-pt spacing system.

Visual direction:
Corporate premium, minimalist, bright, and elegant.
Avoid generic dashboard templates.
Use soft depth, precise spacing, and refined typography rhythm.
Background should be light with subtle radial gradients and no clutter.

Color system:
Primary accent green: #3DCD58
Accent dark: #2FB349
Background: #EEF4EF
Panels: #FFFFFF
Primary text: #1F2A24
Secondary text: #5E6B63
Borders/dividers: #DDE7DE
Chart grid lines: #E8EEE9

Typography:
Headings: Sora (or Manrope if unavailable), bold.
Body/UI: Manrope (or DM Sans if unavailable), regular/medium.
Title size 42, KPI value size 32, section headers 16, labels 11-12.
Use tight but readable line-height and slightly negative tracking on major headlines.

Main composition:
Top header with title, subtitle, and two pill buttons (Play Animation, Replay).
Title text: “Certified Enclosure Ranges by Certification”
Subtitle text: “Executive view designed for presentation: animated distribution and ranking clarity.”

KPI row (4 cards):
Card 1 label: TOTAL CERTIFICATIONS, value: 68, subtext: Across all bodies.
Card 2 label: TOP CERTIFIER, value: 23, subtext: UL.
Card 3 label: TOP 3 SHARE, value: 75.0%, subtext: Portfolio concentration.
Card 4 label: CERTIFICATION BODIES, value: 8, subtext: Distinct organizations.
Cards should have 16 px radius, subtle border, soft shadow, and strong alignment.

Chart area:
Two large side-by-side panels with equal visual weight.
Left panel: Donut chart with center total number.
Right panel: Horizontal bar chart sorted descending.
Keep labels legible and aligned.
Use green tonal palette for chart categories, with UL visually emphasized.
Bar chart order must be:
UL, Bureau Veritas, DEKRA, BV Marine, DNV, LCIE, TÜV, ASEFA.

Donut details:
Inner hole around 68-72%.
Center text large: 68
Center caption: TOTAL CERTIFICATIONS
Optional legend aligned neatly with category names and percentages.

Bar chart details:
Horizontal bars with rounded ends.
UL bar in darker green, others in lighter green shades.
Numeric labels at bar ends.
Axis clean and minimal, no heavy ticks.
No visual noise.

Narrative callout:
At the bottom, include final insight text:
“UL covers the widest range”
Style it as a premium presentation statement with subtle emphasis and enough whitespace.

Animation/prototype requirements:
Create a polished prototype flow with Smart Animate.
Scene 1: Values start at 0 (bars and donut).
Scene 2: Values count up smoothly to final data (ease-out).
Scene 3: Insight text fades in.
Total perceived duration around 5-6 seconds.
Use easing curves, no abrupt jumps.
Buttons:
Play Animation starts sequence.
Replay returns to initial state and replays.

Component/system requirements:
Use Auto Layout everywhere practical.
Create reusable components for KPI cards, buttons, and chart panels.
Define color and text styles as reusable tokens.
Name layers cleanly for handoff.

Quality bar:
The result should look like a boardroom presentation visual, not a default BI screenshot.
Prioritize clarity, spacing precision, and visual storytelling.
Ensure final output is both aesthetically striking and immediately understandable.