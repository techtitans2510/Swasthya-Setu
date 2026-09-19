# SwasthyaSetu Backend Architecture Blueprint (`server/`)

This directory is reserved for the backend service layer of the SwasthyaSetu platform.

## Planned Technology Stack
- **Runtime**: Node.js (TypeScript / Express or Fastify)
- **Database**: PostgreSQL with Prisma ORM (or MongoDB for flexible health document stores)
- **Cache & Realtime**: Redis for sync queue caching; WebSockets/SSE for real-time emergency triage alerts
- **National Integrations**: ABDM (Ayushman Bharat Digital Mission) M1/M2/M3 API Gateways for ABHA verification and HIP/HIU health data exchange

## Target Folder Structure
```
server/
├── src/
│   ├── controllers/      # Request handlers for triage, referrals, patients, auth
│   ├── models/           # Data models and database schemas
│   ├── routes/           # REST endpoint definitions
│   ├── services/         # Business logic (Triage score validation, Sync queue resolver)
│   ├── middleware/       # JWT role authentication (ASHA, Doctor, Admin), error handling
│   ├── validators/       # Input schemas (Zod / Joi for vital signs and patient records)
│   ├── integrations/     # ABDM / ABHA M1-M3 Gateways, 108 Emergency dispatch webhook
│   └── prisma/           # Schema definitions and database migrations
├── package.json
├── tsconfig.json
└── README.md
```

## Core API Endpoints Specification
- `POST /api/v1/auth/login`: Role-based authentication (ASHA, Doctor, Health Admin)
- `POST /api/v1/sync/batch`: High-throughput offline-to-online batch synchronization with conflict resolution
- `POST /api/v1/patients`: Create or link patient record using ABHA ID
- `POST /api/v1/triage/assess`: Server-side verified clinical risk score evaluation
- `POST /api/v1/referrals`: Generate inter-facility referral tokens and notify destination PHC/Hospital
- `GET /api/v1/facilities/nearest`: Geographic facility lookup with real-time bed & oxygen availability
- `GET /api/v1/analytics/district`: Aggregated surveillance indicators for district health administrators
