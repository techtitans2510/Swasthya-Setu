# SwasthyaSetu (स्वास्थ्यसेतू)

> **Offline-First Rural Healthcare Continuity Platform**  
> Bridging frontline ASHA workers, Primary Health Centres (PHC), Medical Officers, and District Public Health Administrators across rural India.

---

## 🏛️ Project Architecture

The codebase is organized into a clean, modular client/server hierarchy designed for scalability, offline reliability, and easy backend integration:

```
SwasthyaSetu/
├── client/
│   ├── index.html                  # Main application entry point
│   └── src/
│       ├── assets/                 # SVGs, emblems, and visual assets
│       │   └── emblem.svg
│       ├── components/             # Reusable UI components (stepper, metric tiles, badges)
│       ├── data/                   # Mock dataset (villages, facilities, sample records)
│       │   └── mock-data.js
│       ├── i18n/                   # Multilingual engine (English, Marathi, Hindi)
│       │   └── i18n.js
│       ├── pages/                  # Role-specific workflow views
│       │   ├── asha/               # Frontline intake, registration & facility referral
│       │   ├── doctor/             # Clinical station, tele-consult & e-prescriptions
│       │   ├── admin/              # District analytics & facility capacity overview
│       │   └── patient/            # ABHA longitudinal health record & timeline
│       ├── services/               # Core business & data services
│       │   ├── offline/            # Offline-first storage & synchronization engine
│       │   │   └── offline-store.js
│       │   └── triage/             # Clinical vital risk stratification engine
│       │       └── triage-engine.js
│       ├── styles/                 # Modular CSS design system
│       │   ├── tokens.css          # Design tokens & color system
│       │   ├── base.css            # Base typography & resets
│       │   ├── components.css      # Reusable UI element styles
│       │   ├── layout.css          # App scaffolding & responsive sidebar
│       │   └── views.css           # View-specific grid & queue styling
│       ├── utils/                  # Utility helpers and formatters
│       └── app.js                  # Main client application router & controller
│
├── server/                         # Future backend architecture blueprint (Node/Prisma/ABDM)
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Running the Client Application
Open `client/index.html` in any modern web browser, or serve it using any local static web server:

```bash
# Example using Python 3
cd client
python -m http.server 3000

# Example using Node npx serve
npx serve client
```

Navigate to `http://localhost:3000` to interact with the platform.

---

## 🩺 Key Features & Modules

1. **Role-Based Frontline Workflows**:
   - **ASHA Frontline Activist**: Village health registry, home vitals intake wizard, automated triage classification, and facility referral generation.
   - **Doctor (Medical Officer - PHC)**: Tele-triage queue, emergency bay alert reception, clinical e-prescriptions, and follow-up delegation.
   - **District Health Admin**: Population surveillance metrics, facility bed & oxygen capacity tracking.

2. **Offline-First Synchronization**:
   - Field operations continue uninterrupted in zero-connectivity areas using sandboxed local storage.
   - Tactile network mode toggle with queued pending sync counters and 1-click cloud sync resolution.

3. **Multilingual Decision Support**:
   - Dynamic real-time interface localization across **English**, **मराठी (Marathi)**, and **हिन्दी (Hindi)**.

4. **Longitudinal Health Records**:
   - Unified audit trail of home visits, vitals snapshots, and medical referrals anchored to Ayushman Bharat (ABHA) IDs.
