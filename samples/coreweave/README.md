# Credit Analysis Static Template & Demo

This directory contains the **design template and static, offline snapshot** for the agent-powered credit analysis solution. Any company entered into the agent system and analyzed will be rendered in this format. Use these files as a safe fallback during presentations, for illustration, or as the canonical reference for the intended user experience and UI/UX standards.

## Contents

- `index.html` — The fully rendered credit analysis report. Open directly in your browser (no server needed). All navigation links in the sidebar map to visible sections, ensuring robust navigation for demos and for any generated company report.
- `styles.css` — CSS for the static template (copied from the main project root for demo safety and maintainability). Implements fixed sidebar, responsive layout, and all audit-ready visual styles.
- `script.js` — JS for collapsible panels and robust sidebar navigation (copied from the main project root for demo safety). All navigation logic is centralized here for auditability.
- `analysis.md` — The markdown source for the demo credit analysis (replace with new company analysis as needed).
- `ux_notes.md` — (Optional) UX/design notes or screenshots.

## Usage

- Open `index.html` in your browser to show the working credit analysis website—this is the canonical design for all agent-generated reports.
- All dependencies are relative and self-contained in this directory.
- Use this as a demo fallback or to illustrate the intended user experience and design for any generated company.
- **Navigation:** All sidebar links now work. Each section is visible and robust to repeated navigation. If a section is not yet written, a visible placeholder with a `[DEBUG]` marker will appear (replace with generated content for new companies).
- **Title:** The visible page title and browser tab are dynamically updated per company ("[Company Name] Credit Assessment – [Month Year]").
- **Sidebar:** The left sidebar is fixed and never moves during scrolling, providing a consistent navigation experience for long reports.

## Template/Agent Integration

- This static snapshot is the reference design for the agent-powered credit analysis solution. When the agent generates a new company report, it should render the output in this exact HTML/CSS/JS template.
- To update the template for all future reports, edit these files and propagate changes to the agent rendering pipeline.
- All navigation, layout, and audit/debug features are standardized here for maintainability and demo reliability.

## Visual & UX Standards for Agent-Generated Credit Analysis

This template is now locked as the canonical design for all agent-generated credit analyses. All future company reports rendered by the agent should strictly follow these standards for a professional, audit-ready, and visually compelling experience.

### Table & Chart Visual Standards

- **Financial Summary Table:**
  - Card-like appearance with shadow and rounded corners.
  - Blue gradient header with clear, bold column labels and tasteful icons (e.g., 💰 Revenue, 🏦 Debt).
  - Zebra striping for rows; subtle row and column highlight on hover for easy cross-referencing.
  - Tooltips on headers for clarity (hover to see explanations).
  - Fully accessible and mobile-friendly.
- **Charts:**
  - All charts use Chart.js via CDN (no build step required).
  - Each chart has a clear, prominent label (e.g., "Revenue Growth (2022–2024)").
  - Bar and pie charts feature subtle animation, visible legends, and axis labels (e.g., y-axis: "$ Millions").
  - Chart containers have card-like shadow and padding for separation.
  - All data and visuals are annotated for agent/template maintainers.

### Template Integration for Agent Developers

- **Data Swapping:**
  - All tables and charts are annotated in the HTML for easy replacement by the agent pipeline. Simply swap the table rows or chart data arrays with new company data.
  - Use the provided icons and tooltips for consistency across all reports.
- **Responsiveness:**
  - All visuals are tested for mobile and desktop. Avoid changing table/chart structure unless updating all responsive rules.
- **Accessibility:**
  - Use semantic HTML and ARIA labels as in the template for maximum accessibility.

### Audit & Maintenance Notes

- All code is heavily commented for auditability.
- If you update the template, document changes in this README and propagate to the agent rendering pipeline.
- For any new visual elements, follow the same design language: subtle, modern, and professional.

## Troubleshooting Sidebar Navigation

- If a sidebar link does not scroll to a section, check the browser console for `[NAV DEBUG]` errors. All links should map to a visible section.
- Placeholders are clearly marked for easy audit and future content updates.

---

*For questions on how this template is used by the agent, or how to update it for new companies, see the main project README or contact the maintainer.*

---

### [2025-05-03] Template & Navigation Robustness Update
- Sidebar is now fixed (position: fixed) for all reports, never moves during scrolling.
- All navigation logic is centralized in `script.js` for auditability and maintainability.
- Removed all inline navigation scripts from `index.html`.
- Updated documentation to clarify this is the canonical template for all agent-generated credit analyses.
- Improved JS error logging for navigation issues.
- Updated documentation for demo reliability and auditability.

### [2025-05-03] Visual Polish & Lockdown
- Locked table and chart design as template standard.
- Added icons, gradient header, row/column highlighting, and tooltips to financial summary table.
- Enhanced chart visuals: legend, axis label, animation, card effect.
- Updated documentation for agent/template maintainers.
