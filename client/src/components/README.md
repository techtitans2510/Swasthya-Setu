# Client UI Components (`client/src/components`)

This directory houses reusable, presentation-only UI components shared across role-specific views and pages.

## Architecture Guidelines
- **Modularity**: Components should encapsulate HTML rendering and pure UI state.
- **Styling**: Component styles are centralized in `src/styles/components.css` using design tokens from `src/styles/tokens.css`.
- **Internationalization**: All user-facing strings must use `data-i18n` attributes or reference the `i18n` service.

## Core Component Inventory
- `JourneyStepper`: 7-stage patient continuity tracker (Home Survey → Vitals → Triage → Facility → Referral → Doctor Consult → Follow-up).
- `MetricTile`: Standardized summary cards for operational KPIs (Handled Today, High Risk, Referrals, Follow-ups).
- `SyncModule`: Tactile segmented network switch and actionable cloud synchronization trigger.
- `PatientTable`: Standardized data table for village registry and queue displays.
