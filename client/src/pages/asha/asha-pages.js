/**
 * SwasthyaSetu ASHA Worker Persona Module (`src/pages/asha/asha-pages.js`)
 * Frontline community healthcare worker workflows & field operations
 * Primary Workflows: Dashboard, My Patients, Register Patient, Referrals, Follow-ups, Facilities, Tasks, Notifications, Profile
 * Design Source of Truth: Stitch Screens 1ff47252d27045609856c778263b3ff3 & dad93657b8ac4d7d9598e1e19f50fc8b
 */

class AshaPages {
  /**
   * 1. ASHA Operational Dashboard (Stitch Screen 1ff47252d27045609856c778263b3ff3)
   */
  static renderDashboard(app) {
    const referrals = SWASTHYA_DATA.ashaReferrals || [];
    const followups = SWASTHYA_DATA.ashaFollowUps || [];
    const supplies = SWASTHYA_DATA.ashaSupplies || [];
    const outreach = SWASTHYA_DATA.ashaOutreach || [];
    const ashaInfo = SWASTHYA_DATA.roles.ASHA;

    return `
      <!-- TOP OFFLINE SYNC RIBBON -->
      <div class="alert alert-warning" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:var(--space-sm); margin-bottom:var(--space-base); padding:var(--space-sm) var(--space-md);">
        <div class="flex items-center gap-sm">
          <span class="material-symbols-outlined" style="font-size:22px; color:var(--sync-offline-fg);">cloud_sync</span>
          <div>
            <strong style="color:var(--sync-offline-fg);">Local Handset Database: Active</strong>
            <span class="text-xs text-muted" style="margin-left:6px;">• 2 records cached in device storage • Auto-Sync Ready</span>
          </div>
        </div>
        <div class="flex items-center gap-xs">
          <button class="btn btn-secondary btn-sm" id="syncHandsetQueueBtn" onclick="app.triggerSyncSimulation()" style="min-height:30px; padding:0 10px; font-size:0.75rem;">
            <span class="material-symbols-outlined text-[15px]">sync</span>
            <span>Sync Handset Queue</span>
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-base">
        <!-- 1. HERO FIELD WORKER ORIENTATION BANNER -->
        <div class="hero-asha-banner">
          <div style="max-width:720px; z-index:2; position:relative;">
            <div class="flex flex-wrap items-center gap-xs" style="margin-bottom:var(--space-xs);">
              <span class="demo-hero-pill">
                <span class="material-symbols-outlined text-[14px]">pin_drop</span> ${ashaInfo.sector || 'Shirur Sector #04'}
              </span>
              <span class="text-xs" style="color:var(--color-primary-fixed-dim);">• 480 Registered Households</span>
              <span class="text-xs" style="color:var(--color-primary-fixed-dim);">• 2,140 Village Cohort</span>
            </div>
            <h1 style="color:#FFFFFF; font-size:1.5rem; font-weight:800; margin-bottom:6px; font-family:var(--font-headline);">
              Good morning, Sunita 👋
            </h1>
            <p class="text-sm" style="color:var(--color-primary-fixed-dim); line-height:1.45;">
              You have <strong style="color:#FFFFFF; text-decoration:underline;">4 home visits</strong>, <strong style="color:#FECACA;">2 urgent follow-ups</strong>, and <strong style="color:#BAE6FD;">1 referral admission confirmation</strong> pending for today's field run.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-sm" style="z-index:2; position:relative;">
            <button class="btn btn-primary" onclick="app.startNewRegistration()" style="background:#FFFFFF; color:var(--color-primary); border-color:#FFFFFF; font-weight:700;">
              <span class="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Register Patient</span>
            </button>
            <button class="btn btn-secondary" onclick="app.openVitalsModal()" style="background:rgba(255,255,255,0.15); color:#FFFFFF; border:1px solid rgba(255,255,255,0.3);">
              <span class="material-symbols-outlined text-[18px]">vital_signs</span>
              <span>Record Field Vitals</span>
            </button>
          </div>
        </div>

        <!-- 2. PRIMARY CARE & REFERRAL CONTINUITY RAIL (8 NODES) -->
        <div class="card" style="padding:var(--space-base);">
          <div class="flex flex-wrap items-center justify-between gap-xs" style="margin-bottom:var(--space-sm); padding-bottom:var(--space-xs); border-bottom:1px solid var(--surface-subtle);">
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-primary text-[20px]">route</span>
              <h3 class="card-title" style="font-size:0.9375rem;">Primary Care & Referral Continuity Rail</h3>
              <span class="tag-capability" style="background:var(--surface-container); color:var(--color-primary-container);">ASHA Protocol v3.2</span>
            </div>
            <div class="flex items-center gap-sm text-xs text-muted font-bold">
              <span class="flex items-center gap-xs"><span class="w-2.5 h-2.5 rounded-full" style="background:var(--color-primary-container);"></span> Completed</span>
              <span class="flex items-center gap-xs"><span class="w-2.5 h-2.5 rounded-full" style="background:var(--color-secondary);"></span> Active Focus</span>
            </div>
          </div>

          <div class="asha-continuity-rail">
            <div class="continuity-node is-completed" onclick="app.navigateTo('patients')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">how_to_reg</span></div>
              <span class="node-title">1. ABHA Lookup</span>
              <span class="node-sub">Verified</span>
            </div>
            <div class="continuity-node is-completed" onclick="app.navigateTo('registration')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">badge</span></div>
              <span class="node-title">2. Baseline Info</span>
              <span class="node-sub">Household Card</span>
            </div>
            <div class="continuity-node is-active" onclick="app.openVitalsModal()">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">monitor_heart</span></div>
              <span class="node-title">3. Screenings</span>
              <span class="node-sub">18 Done</span>
            </div>
            <div class="continuity-node" onclick="app.navigateTo('triage')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">assignment_add</span></div>
              <span class="node-title">4. Triage Flag</span>
              <span class="node-sub">Clinical Rules</span>
            </div>
            <div class="continuity-node" onclick="app.navigateTo('facilities')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">local_hospital</span></div>
              <span class="node-title">5. Facility Match</span>
              <span class="node-sub">Shirur PHC</span>
            </div>
            <div class="continuity-node is-active-focus" onclick="app.navigateTo('referrals')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">sync_alt</span></div>
              <span class="node-title">6. Referral Status</span>
              <span class="node-sub">4 In Transit</span>
            </div>
            <div class="continuity-node is-urgent" onclick="app.navigateTo('followups')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">assignment_turned_in</span></div>
              <span class="node-title">7. Follow-up</span>
              <span class="node-sub">6 Due Today</span>
            </div>
            <div class="continuity-node" onclick="app.showToast('All 48 completed continuum cases archived to District Repository.', 'info')">
              <div class="node-circle"><span class="material-symbols-outlined text-[16px]">check_circle</span></div>
              <span class="node-title">8. Completion</span>
              <span class="node-sub">Closed Cases</span>
            </div>
          </div>
        </div>

        <!-- 3. FIELD OPERATIONS KEY METRICS -->
        <div class="metrics-grid">
          <!-- Metric 1: Cohort Roster -->
          <div class="metric-tile" style="cursor:pointer;" onclick="app.navigateTo('patients')">
            <div class="metric-tile-top">
              <span class="metric-tile-label">Cohort Roster</span>
              <div class="metric-tile-icon is-green">
                <span class="material-symbols-outlined text-[18px]">groups</span>
              </div>
            </div>
            <div class="flex items-baseline gap-xs">
              <span class="metric-tile-value">342 Active</span>
            </div>
            <div style="margin-top:var(--space-xs);">
              <div class="flex items-center justify-between text-xs text-muted font-bold mb-1">
                <span style="color:var(--risk-high-fg);">High-Risk (14)</span>
                <span style="color:var(--color-primary);">ANC/PNC (28)</span>
                <span style="color:var(--color-secondary);">NCD (96)</span>
              </div>
              <div style="height:6px; width:100%; background:var(--surface-container); border-radius:4px; overflow:hidden; display:flex;">
                <div style="background:var(--risk-high-fg); width:14%; height:100%;"></div>
                <div style="background:var(--color-primary); width:28%; height:100%;"></div>
                <div style="background:var(--color-secondary); width:58%; height:100%;"></div>
              </div>
            </div>
          </div>

          <!-- Metric 2: Pending Referrals -->
          <div class="metric-tile" style="cursor:pointer;" onclick="app.navigateTo('referrals')">
            <div class="metric-tile-top">
              <span class="metric-tile-label">Pending Referrals</span>
              <div class="metric-tile-icon is-blue">
                <span class="material-symbols-outlined text-[18px]">emergency_share</span>
              </div>
            </div>
            <div class="flex items-baseline gap-xs">
              <span class="metric-tile-value" style="color:var(--color-secondary);">4 Active</span>
            </div>
            <div class="flex items-center gap-xs text-xs text-muted" style="margin-top:var(--space-xs);">
              <span class="status-dot-live"></span>
              <strong style="color:var(--risk-emergency-fg);">1 Emergency PHC</strong> • 3 Specialist
            </div>
          </div>

          <!-- Metric 3: Home Follow-ups -->
          <div class="metric-tile" style="cursor:pointer;" onclick="app.navigateTo('followups')">
            <div class="metric-tile-top">
              <span class="metric-tile-label">Home Follow-Ups</span>
              <div class="metric-tile-icon is-amber">
                <span class="material-symbols-outlined text-[18px]">event_available</span>
              </div>
            </div>
            <div class="flex items-baseline gap-xs">
              <span class="metric-tile-value" style="color:var(--color-primary);">6 Scheduled</span>
            </div>
            <div class="text-xs text-muted" style="margin-top:var(--space-xs);">
              3 Post-Discharge, 2 Antenatal Hb, 1 Infant Booster
            </div>
          </div>

          <!-- Metric 4: Offline Buffer -->
          <div class="metric-tile" style="cursor:pointer;" onclick="app.triggerSyncSimulation()">
            <div class="metric-tile-top">
              <span class="metric-tile-label">Offline Buffer</span>
              <div class="metric-tile-icon is-green">
                <span class="material-symbols-outlined text-[18px]">offline_pin</span>
              </div>
            </div>
            <div class="flex items-baseline gap-xs">
              <span class="metric-tile-value">2 Cached</span>
            </div>
            <div class="flex items-center justify-between text-xs text-muted" style="margin-top:var(--space-xs);">
              <span>Ready for GSM push</span>
              <span class="text-primary font-bold">100% Encrypted</span>
            </div>
          </div>
        </div>

        <!-- 4. PRIORITY ACTION QUEUE (2 COLUMNS: 7 COLS / 5 COLS) -->
        <div class="view-grid-2col">
          <!-- LEFT COLUMN: TODAY'S HOME VISITS (7 COLS) -->
          <div style="display:flex; flex-direction:column; gap:var(--space-base);">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-xs">
                <span class="w-2.5 h-2.5 rounded-full" style="background:var(--color-primary-container);"></span>
                <h3 class="card-title" style="font-size:1.125rem;">Today's Home Visits</h3>
              </div>
              <span class="text-xs text-muted font-bold" style="background:var(--surface-container); padding:2px 8px; border-radius:12px;">Sorted by Clinical Urgency</span>
            </div>

            <!-- Follow-up Card 1: Chronic HTN Recovery -->
            <div class="card asha-field-card is-urgent">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-xs">
                <div>
                  <div class="flex flex-wrap items-center gap-xs">
                    <h4 style="font-size:1rem; font-weight:700;">Ramesh Patil</h4>
                    <span class="text-xs text-muted">62 Y • Male</span>
                    <span class="risk-chip risk-emergency" style="font-size:0.6875rem;">Post-PHC Discharge</span>
                  </div>
                  <p class="numeric-id text-xs text-muted" style="margin-top:2px;">ABHA: 91-4029-1823-0192</p>
                </div>
                <div class="badge-overdue-time">
                  <span class="material-symbols-outlined text-[15px]">schedule</span>
                  <span>09:30 AM (Overdue)</span>
                </div>
              </div>

              <div class="asha-vitals-pill-grid">
                <div>
                  <span class="text-xs text-muted block">Primary Concern:</span>
                  <strong>Stent Placed (Day 14)</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">Last Sub-Centre BP:</span>
                  <strong class="text-danger font-bold">158/94 mmHg</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">Medication Status:</span>
                  <strong>Jan Aushadhi Amlodipine</strong>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-top:var(--space-xs); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
                <span class="text-xs text-muted flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[16px] text-primary">home</span> House #114, Wadgaon Road
                </span>
                <div class="flex items-center gap-xs">
                  <button class="btn btn-primary btn-sm" onclick="app.recordPatientVitals('Ramesh Patil')">
                    <span class="material-symbols-outlined text-[15px]">stylus</span>
                    <span>Record Vitals</span>
                  </button>
                  <a class="btn btn-secondary btn-sm" href="tel:+919822014920" title="Call Ramesh Patil">
                    <span class="material-symbols-outlined text-[16px]">phone</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Follow-up Card 2: ANC Maternal Check -->
            <div class="card asha-field-card is-maternal">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-xs">
                <div>
                  <div class="flex flex-wrap items-center gap-xs">
                    <h4 style="font-size:1rem; font-weight:700;">Meena Kamble</h4>
                    <span class="text-xs text-muted">24 Y • Female</span>
                    <span class="risk-chip risk-moderate" style="font-size:0.6875rem;">ANC 32 Weeks</span>
                  </div>
                  <p class="numeric-id text-xs text-muted" style="margin-top:2px;">ABHA: 22-9014-4318-7712</p>
                </div>
                <span class="badge-scheduled-time">
                  <span class="material-symbols-outlined text-[15px]">schedule</span>
                  <span>11:00 AM Today</span>
                </span>
              </div>

              <div class="asha-vitals-pill-grid">
                <div>
                  <span class="text-xs text-muted block">Key Concern:</span>
                  <strong>Mild Pedal Edema</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">Baseline Hb Strip:</span>
                  <strong class="text-primary font-bold">9.8 g/dL (Moderate)</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">IFA Tablets Stock:</span>
                  <strong>18 Remaining</strong>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-top:var(--space-xs); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
                <span class="text-xs text-muted flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[16px] text-primary">location_on</span> Shinde Wasti, Farm House #3
                </span>
                <div class="flex items-center gap-xs">
                  <button class="btn btn-primary btn-sm" onclick="app.recordPatientVitals('Meena Kamble')">
                    <span class="material-symbols-outlined text-[15px]">pregnant_woman</span>
                    <span>Record ANC Visit</span>
                  </button>
                  <a class="btn btn-secondary btn-sm" href="tel:+919800000002" title="Call Meena Kamble">
                    <span class="material-symbols-outlined text-[16px]">phone</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Follow-up Card 3: Infant Immunization -->
            <div class="card asha-field-card is-pediatric">
              <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-xs">
                <div>
                  <div class="flex flex-wrap items-center gap-xs">
                    <h4 style="font-size:1rem; font-weight:700;">Aarav Shinde</h4>
                    <span class="text-xs text-muted">1.5 Y • Child (Male)</span>
                    <span class="risk-chip risk-low" style="font-size:0.6875rem;">Immunization</span>
                  </div>
                  <p class="text-xs text-muted" style="margin-top:2px;">Guardian: Pooja Shinde (Mother)</p>
                </div>
                <span class="badge-scheduled-time">
                  <span class="material-symbols-outlined text-[15px]">schedule</span>
                  <span>02:30 PM Today</span>
                </span>
              </div>

              <div class="asha-vitals-pill-grid">
                <div>
                  <span class="text-xs text-muted block">Due Vaccine Dose:</span>
                  <strong>Pentavalent-3 & bOPV-3</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">Target VHSND Camp:</span>
                  <strong class="text-secondary">Friday @ Panchayat</strong>
                </div>
                <div>
                  <span class="text-xs text-muted block">Nutrition Status:</span>
                  <strong>Normal SAM/MAM</strong>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-top:var(--space-xs); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
                <span class="text-xs text-muted flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[16px] text-secondary">pin_drop</span> Near Gram Panchayat Well
                </span>
                <button class="btn btn-secondary btn-sm" onclick="app.markImmunizationDone('Aarav Shinde')">
                  <span class="material-symbols-outlined text-[15px]">vaccines</span>
                  <span>Mark Pre-Counselled</span>
                </button>
              </div>
            </div>

            <!-- Decision Support Notice -->
            <div class="alert alert-info" style="font-size:0.75rem; line-height:1.4;">
              <span class="material-symbols-outlined text-[18px]">verified_user</span>
              <div>
                <strong>Decision Support Protocol:</strong> Triage algorithms suggest classification only. The qualified healthcare professional decides the final diagnosis and treatment orders under MoHFW IPHS guidelines.
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: ACTIVE REFERRAL TRACKING + FACILITY STATUS (5 COLS) -->
          <div style="display:flex; flex-direction:column; gap:var(--space-base);">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-xs">
                <span class="w-2.5 h-2.5 rounded-full" style="background:var(--color-secondary);"></span>
                <h3 class="card-title" style="font-size:1.125rem;">Active Referral Tracking</h3>
              </div>
              <a href="#" onclick="app.navigateTo('referrals')" class="text-xs text-secondary font-bold">View All (4) →</a>
            </div>

            <!-- Active Referral 1: Urgent Admission -->
            <div class="card asha-field-card is-urgent">
              <div class="flex items-center justify-between">
                <span class="risk-chip risk-emergency">Urgent PHC Transfer</span>
                <span class="text-xs text-muted font-bold">Referral #REF-9021</span>
              </div>

              <div style="margin-top:var(--space-xs);">
                <h4 style="font-size:1rem; font-weight:700;">Kavita Jadhav (28 Y)</h4>
                <p class="text-xs font-bold text-danger">Suspected Pre-eclampsia • BP 162/104 mmHg</p>
              </div>

              <div class="bg-surface-container p-2 rounded-lg text-xs flex flex-col gap-1" style="margin-top:var(--space-xs);">
                <div class="flex justify-between">
                  <span class="text-muted">Destination:</span>
                  <strong>Shirur 24x7 PHC</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">Escort MO:</span>
                  <strong class="text-primary font-bold">Dr. A. Kulkarni (Accepted)</strong>
                </div>
                <div class="flex items-center gap-xs text-primary font-bold pt-1">
                  <span class="material-symbols-outlined text-[16px]">airport_shuttle</span>
                  <span>108 Ambulance En Route (ETA 12 mins)</span>
                </div>
              </div>

              <div class="flex items-center justify-between" style="margin-top:var(--space-sm); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
                <button class="btn btn-secondary btn-sm" onclick="app.showAmbulanceTracker()">
                  <span class="material-symbols-outlined text-[15px]">navigation</span>
                  <span>Track 108 GPS</span>
                </button>
                <a class="btn btn-destructive btn-sm" href="tel:108" style="font-size:0.75rem; padding:0 10px;">
                  <span class="material-symbols-outlined text-[15px]">call</span>
                  <span>Direct 108</span>
                </a>
              </div>
            </div>

            <!-- Active Referral 2: Specialist Review -->
            <div class="card asha-field-card is-secondary-ref">
              <div class="flex items-center justify-between">
                <span class="risk-chip risk-moderate">Specialist Tele-Consult</span>
                <span class="text-xs text-muted font-bold">Referral #REF-8842</span>
              </div>

              <div style="margin-top:var(--space-xs);">
                <h4 style="font-size:1rem; font-weight:700;">Babanrao Gaikwad (58 Y)</h4>
                <p class="text-xs text-muted">Diabetic Retinopathy • Annual Screening</p>
              </div>

              <div class="bg-surface-subtle p-2 rounded-lg text-xs flex flex-col gap-1" style="margin-top:var(--space-xs);">
                <div class="flex justify-between">
                  <span class="text-muted">Facility:</span>
                  <strong>Sassoon General Hospital</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">Appointment:</span>
                  <strong class="text-secondary font-bold">Tomorrow, 10:30 AM Slot #4</strong>
                </div>
              </div>

              <div class="flex items-center justify-between" style="margin-top:var(--space-sm); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
                <button class="btn btn-primary btn-sm" onclick="app.shareReferralSlip('Babanrao Gaikwad')">
                  <span class="material-symbols-outlined text-[15px]">share</span>
                  <span>Share Slip (SMS)</span>
                </button>
                <span class="text-xs text-muted">Self-transit</span>
              </div>
            </div>

            <!-- Sub-Centre Network Status Widget -->
            <div class="card" style="padding:var(--space-base);">
              <div class="flex items-center justify-between" style="margin-bottom:var(--space-xs);">
                <h4 style="font-size:0.9375rem; font-weight:700;">Sub-Centre Network Status</h4>
                <span class="status-dot-live"></span>
              </div>

              <div style="display:flex; flex-direction:column; gap:8px;">
                <!-- PHC Shirur -->
                <div class="p-2 rounded bg-surface-container flex items-center justify-between text-xs">
                  <div>
                    <strong>Shirur 24x7 PHC</strong>
                    <div class="text-muted">4.2 km • 8 Beds Free</div>
                  </div>
                  <div class="text-right">
                    <span class="tag-capability">Dr. Kulkarni (Duty)</span>
                    <a href="tel:02138222104" class="text-secondary font-bold block mt-0.5">Call Desk</a>
                  </div>
                </div>

                <!-- Sassoon Hospital -->
                <div class="p-2 rounded bg-surface-subtle flex items-center justify-between text-xs">
                  <div>
                    <strong>Sassoon District Hospital</strong>
                    <div class="text-muted">42 km • Emergency Triage Open</div>
                  </div>
                  <div class="text-right">
                    <span class="tag-capability" style="background:#E2E8F0; color:#334155;">NICU Available</span>
                    <a href="tel:02026123456" class="text-secondary font-bold block mt-0.5">Exchange</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. WEEKLY OUTREACH & ASHA KIT SUPPLIES (2 COLUMNS) -->
        <div class="view-grid-2col">
          <!-- Community Outreach & NCD Drive -->
          <div class="card" style="padding:var(--space-base);">
            <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
              <div>
                <h3 class="card-title" style="font-size:1.0625rem;">Community Outreach & NCD Drive</h3>
                <p class="text-xs text-muted">Field schedules coordinated with ANM Sarita Jagtap</p>
              </div>
              <span class="tag-capability" style="background:var(--surface-container); color:var(--color-primary-container);">Week 43</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${outreach.map(o => `
                <div class="p-2.5 rounded-lg bg-surface-container flex items-start gap-md text-xs">
                  <div class="w-12 text-center shrink-0" style="background:var(--surface-card); padding:4px 6px; border-radius:6px; border:1px solid var(--border-structural);">
                    <span class="block text-muted font-bold text-[10px]">${o.day}</span>
                    <strong class="block font-headline text-lg text-primary">${o.dateNum}</strong>
                  </div>
                  <div style="flex:1;">
                    <div class="flex items-center justify-between">
                      <strong class="text-sm font-bold text-neutral">${o.title}</strong>
                      <span class="${o.statusClass} text-xs">${o.status}</span>
                    </div>
                    <p class="text-muted mt-0.5 leading-relaxed">${o.target}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- ASHA Kit Supplies -->
          <div class="card" style="padding:var(--space-base);">
            <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
              <div>
                <h3 class="card-title" style="font-size:1.0625rem;">ASHA Kit Supplies</h3>
                <p class="text-xs text-muted">Current field bag replenishment status</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="app.requestReplenishment()" style="font-size:0.75rem;">
                <span class="material-symbols-outlined text-[15px]">inventory</span>
                <span>Order Kits</span>
              </button>
            </div>

            <div style="display:flex; flex-direction:column; gap:6px;">
              ${supplies.map(s => `
                <div class="p-2 rounded flex items-center justify-between text-xs ${s.restockNeeded ? 'bg-red-50 border border-red-200' : 'bg-surface-subtle'}">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-[18px] ${s.iconColor}">${s.icon}</span>
                    <div>
                      <strong>${s.name}</strong>
                      <span class="text-muted block text-[11px]">${s.type}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="${s.statusClass}">${s.status}</span>
                    <span class="text-muted block text-[11px]">${s.stockQuantity}</span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 2. My Patients (Village Population Cohort Directory)
   */
  static renderPatientsList(app) {
    const patients = app.registeredPatients || SWASTHYA_DATA.recentPatients;
    const filterCat = app.ashaPatientFilter || 'all';
    const filterVillage = app.ashaVillageFilter || 'all';
    const searchQuery = (app.ashaPatientSearch || '').toLowerCase();

    let filtered = patients.filter(p => {
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.abhaId.includes(searchQuery) || (p.village && p.village.toLowerCase().includes(searchQuery));
      const matchVillage = filterVillage === 'all' || (p.village && p.village.includes(filterVillage));
      const matchCategory = filterCat === 'all' || 
        (filterCat === 'high-risk' && (p.riskLevel === 'HIGH' || p.riskLevel === 'EMERGENCY')) ||
        (filterCat === 'maternal' && p.category === 'maternal') ||
        (filterCat === 'ncd' && p.category === 'ncd') ||
        (filterCat === 'pediatric' && (p.category === 'pediatric' || p.category === 'geriatric'));
      return matchSearch && matchVillage && matchCategory;
    });

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>My Patients (Village Cohort)</h1>
          <p>Frontline community health roster for <strong>Sub-Centre Ambegaon & Shirur Sector #04</strong></p>
        </div>
        <div class="flex items-center gap-xs">
          <button class="btn btn-secondary btn-sm" onclick="app.openVitalsModal()">
            <span class="material-symbols-outlined text-[16px]">vital_signs</span>
            <span>Record Vitals</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="app.startNewRegistration()">
            <span class="material-symbols-outlined text-[16px]">person_add</span>
            <span>+ Register Patient</span>
          </button>
        </div>
      </div>

      <!-- Cohort Summary Metric Strip -->
      <div class="metrics-grid" style="margin-bottom:var(--space-md);">
        <div class="metric-tile" style="padding:var(--space-md);">
          <span class="metric-tile-label">Total Cohort</span>
          <span class="metric-tile-value" style="font-size:1.5rem;">${patients.length} Active</span>
          <span class="text-xs text-muted">480 Households</span>
        </div>
        <div class="metric-tile" style="padding:var(--space-md);">
          <span class="metric-tile-label" style="color:var(--risk-high-fg);">High Risk Cases</span>
          <span class="metric-tile-value text-danger" style="font-size:1.5rem;">${patients.filter(p=>p.riskLevel==='HIGH'||p.riskLevel==='EMERGENCY').length}</span>
          <span class="text-xs text-danger font-bold">Action Required</span>
        </div>
        <div class="metric-tile" style="padding:var(--space-md);">
          <span class="metric-tile-label" style="color:var(--color-primary);">Maternal ANC/PNC</span>
          <span class="metric-tile-value" style="font-size:1.5rem; color:var(--color-primary);">${patients.filter(p=>p.category==='maternal').length}</span>
          <span class="text-xs text-muted">Hb & IFA tracking</span>
        </div>
        <div class="metric-tile" style="padding:var(--space-md);">
          <span class="metric-tile-label" style="color:var(--color-secondary);">Chronic NCD Cases</span>
          <span class="metric-tile-value" style="font-size:1.5rem; color:var(--color-secondary);">${patients.filter(p=>p.category==='ncd').length}</span>
          <span class="text-xs text-muted">HTN & Diabetes</span>
        </div>
      </div>

      <!-- Search & Filtering Toolbar -->
      <div class="card" style="padding:var(--space-base); margin-bottom:var(--space-md);">
        <div class="flex flex-wrap items-center justify-between gap-base">
          <div class="search-box-wrap" style="flex:1; min-width:240px;">
            <span class="material-symbols-outlined search-icon">search</span>
            <input type="text" class="form-input search-input" id="ashaPatientSearchInput" placeholder="Search by patient name, ABHA ID, or village..." value="${app.ashaPatientSearch || ''}" oninput="app.handleAshaPatientSearch(this.value)">
          </div>

          <div class="flex flex-wrap items-center gap-xs">
            <select class="form-select text-xs" style="width:auto; padding:6px 10px;" onchange="app.setAshaVillageFilter(this.value)">
              <option value="all" ${filterVillage==='all'?'selected':''}>All Localities</option>
              <option value="Talwade" ${filterVillage==='Talwade'?'selected':''}>Talwade (Sector 4)</option>
              <option value="Shinde" ${filterVillage==='Shinde'?'selected':''}>Shinde Wasti</option>
              <option value="Wadgaon" ${filterVillage==='Wadgaon'?'selected':''}>Wadgaon Hamlet</option>
              <option value="Pabal" ${filterVillage==='Pabal'?'selected':''}>Pabal Wadi</option>
              <option value="Shikrapur" ${filterVillage==='Shikrapur'?'selected':''}>Shikrapur Khurd</option>
              <option value="Shirur" ${filterVillage==='Shirur'?'selected':''}>Shirur Rural</option>
            </select>

            <div class="tab-pill-group">
              <button class="tab-pill-btn ${filterCat==='all'?'is-active':''}" onclick="app.setAshaPatientCategory('all')">All</button>
              <button class="tab-pill-btn ${filterCat==='high-risk'?'is-active':''}" onclick="app.setAshaPatientCategory('high-risk')">High Risk</button>
              <button class="tab-pill-btn ${filterCat==='maternal'?'is-active':''}" onclick="app.setAshaPatientCategory('maternal')">Maternal ANC</button>
              <button class="tab-pill-btn ${filterCat==='ncd'?'is-active':''}" onclick="app.setAshaPatientCategory('ncd')">Chronic NCD</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Patients Data Table & Cards -->
      <div class="card" style="padding:0; overflow:hidden;">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Patient Name & ABHA ID</th>
                <th>Age / Gender</th>
                <th>Locality & Address</th>
                <th>Risk Tier</th>
                <th>Last Recorded Vitals</th>
                <th>Care Condition</th>
                <th>Frontline Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="7" class="text-center p-space-xl text-muted">
                    <span class="material-symbols-outlined text-[36px] text-muted block mb-1">person_search</span>
                    No patients match the selected search or filter criteria.
                  </td>
                </tr>
              ` : filtered.map(p => `
                <tr>
                  <td>
                    <strong>${p.name}</strong>
                    <div class="flex items-center gap-xs text-xs text-muted" style="margin-top:2px;">
                      <span class="numeric-id text-primary font-semibold">${p.abhaId}</span>
                      <button class="btn btn-ghost btn-sm" style="min-height:20px; padding:0 4px;" onclick="app.copyAbhaId('${p.abhaId}')" title="Copy ABHA ID">
                        <span class="material-symbols-outlined text-[13px]">content_copy</span>
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>${p.age} Y</strong><br>
                    <span class="text-xs text-muted">${p.gender}</span>
                  </td>
                  <td>
                    <strong>${p.village}</strong>
                    <span class="text-xs text-muted block">${p.address || 'Village Sector'}</span>
                  </td>
                  <td>
                    <span class="risk-chip ${p.riskClass}">${p.riskLevel}</span>
                  </td>
                  <td>
                    <div class="text-xs">
                      <span class="font-bold ${p.riskLevel==='HIGH'||p.riskLevel==='EMERGENCY'?'text-danger':''}">BP: ${p.bp} • SpO2: ${p.spo2}</span>
                      <span class="text-muted block text-[11px]">Pulse: ${p.pulse} • Sugar: ${p.sugar || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <span class="text-xs font-semibold text-neutral block">${p.condition}</span>
                    <span class="text-[11px] text-muted">${p.status}</span>
                  </td>
                  <td>
                    <div class="flex items-center gap-xs">
                      <button class="btn btn-primary btn-sm" onclick="app.recordPatientVitals('${p.name}')" title="Record Field Vitals">
                        <span class="material-symbols-outlined text-[14px]">stylus</span>
                        <span>Vitals</span>
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="app.openCreateReferralModal('${p.id}')" title="Support Referral">
                        <span class="material-symbols-outlined text-[14px]">sync_alt</span>
                        <span>Refer</span>
                      </button>
                      <a class="btn btn-ghost btn-sm" href="tel:${p.phone || '+919800000000'}" title="Call Patient">
                        <span class="material-symbols-outlined text-[15px]">phone</span>
                      </a>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * 3. Patient Registration Wizard (Offline-capable)
   */
  static renderRegistrationWizard(app) {
    return `
      <div class="form-step-wizard">
        <div class="wizard-header">
          <div>
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-primary text-[22px]">how_to_reg</span>
              <h2 style="font-size:1.25rem; font-weight:800; font-family:var(--font-headline);">Frontline Patient Registration & Clinical Intake</h2>
            </div>
            <p class="text-xs text-muted">Offline-capable digital registry with automatic ABHA number formatting</p>
          </div>
          <div class="wizard-step-pills">
            <span class="wizard-pill ${app.wizardStep === 1 ? 'is-active' : ''}">1. Demographics</span>
            <span class="wizard-pill ${app.wizardStep === 2 ? 'is-active' : ''}">2. Symptoms & Vitals</span>
            <span class="wizard-pill ${app.wizardStep === 3 ? 'is-active' : ''}">3. Triage & Match</span>
          </div>
        </div>

        <div class="wizard-body">
          ${app.wizardStep === 1 ? this.renderWizardStep1(app) : ''}
          ${app.wizardStep === 2 ? this.renderWizardStep2(app) : ''}
        </div>

        <div class="wizard-footer">
          <button class="btn btn-ghost" id="wizardBackBtn" ${app.wizardStep === 1 ? 'disabled' : ''}>
            ← Back
          </button>
          <button class="btn btn-primary" id="wizardNextBtn">
            ${app.wizardStep === 1 ? 'Continue to Vitals & Symptoms →' : 'Evaluate Clinical Triage →'}
          </button>
        </div>
      </div>
    `;
  }

  static renderWizardStep1(app) {
    const p = app.activePatient || {};
    return `
      <div class="view-grid-2col">
        <div>
          <div class="form-group">
            <label class="form-label">Full Patient Name <span class="required-star">*</span></label>
            <input type="text" class="form-input" id="regName" value="${p.name || ''}" placeholder="e.g. Ramesh Patil">
          </div>

          <div class="flex gap-base">
            <div class="form-group" style="flex:1;">
              <label class="form-label">Age (Years) <span class="required-star">*</span></label>
              <input type="number" class="form-input tabular-nums" id="regAge" value="${p.age || ''}" placeholder="e.g. 62">
            </div>
            <div class="form-group" style="flex:1;">
              <label class="form-label">Gender <span class="required-star">*</span></label>
              <select class="form-select" id="regGender">
                <option value="Male" ${p.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Female" ${p.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Village / Sub-Centre Locality <span class="required-star">*</span></label>
            <select class="form-select" id="regVillage">
              ${SWASTHYA_DATA.villages.map(v => `
                <option value="${v}" ${p.village && p.village.includes(v.split(" ")[0]) ? 'selected' : ''}>${v}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <div>
          <div class="form-group">
            <label class="form-label">ABHA Health ID (Ayushman Bharat)</label>
            <div class="input-with-addon">
              <span class="input-addon-prefix">ABHA</span>
              <input type="text" class="form-input numeric-id" id="regAbha" value="${p.abhaId || ''}" placeholder="91-4029-1823-0192">
            </div>
            <span class="form-hint">National 14-digit longitudinal health identifier</span>
          </div>

          <div class="form-group">
            <label class="form-label">Contact Mobile Number</label>
            <input type="tel" class="form-input tabular-nums" id="regPhone" value="${p.phone || ''}" placeholder="+91 98220 14920">
          </div>

          <div class="alert alert-info" style="margin-top:var(--space-md);">
            <span class="material-symbols-outlined text-[18px]">verified_user</span>
            <div>
              <strong>Frontline Data Protection:</strong> Patient records are encrypted and stored in device sandbox until secure synchronization with State Health Portal.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static renderWizardStep2(app) {
    const p = app.activePatient || { vitals: {} };
    return `
      <div>
        <h3 style="font-size:1.0625rem; margin-bottom:var(--space-xs);">Clinical Symptoms & Vitals</h3>
        <p class="text-xs text-muted" style="margin-bottom:var(--space-md);">Select all applicable symptoms reported during the frontline visit:</p>

        <div class="symptom-tag-grid" id="symptomPicker">
          ${SWASTHYA_DATA.symptomOptions.map(s => {
            const isSelected = p.symptoms && p.symptoms.some(ps => ps.toLowerCase().includes(s.id));
            return `
              <button type="button" class="symptom-tag-btn ${isSelected ? 'is-selected' : ''}" data-symptom-id="${s.id}">
                ${isSelected ? '✓ ' : '+ '}${s.label}
              </button>
            `;
          }).join("")}
        </div>

        <div class="vitals-input-grid">
          <div class="vital-input-card ${p.vitals && p.vitals.spo2 < 92 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label">SpO2 (%)</label>
              <span class="vital-status-tag ${p.vitals && p.vitals.spo2 < 92 ? 'high' : 'normal'}">
                ${p.vitals && p.vitals.spo2 < 92 ? 'Low (<92%)' : 'Normal'}
              </span>
            </div>
            <input type="number" class="form-input tabular-nums" id="inputSpo2" value="${(p.vitals && p.vitals.spo2) || 98}" min="60" max="100">
            <span class="text-xs text-muted">Pulse Oximeter</span>
          </div>

          <div class="vital-input-card ${p.vitals && p.vitals.bpSys >= 140 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label">Blood Pressure (Sys/Dia)</label>
              <span class="vital-status-tag ${p.vitals && p.vitals.bpSys >= 140 ? 'high' : 'normal'}">
                ${p.vitals && p.vitals.bpSys >= 140 ? 'Elevated' : 'Normal'}
              </span>
            </div>
            <div class="flex gap-xs">
              <input type="number" class="form-input tabular-nums" id="inputBpSys" value="${(p.vitals && p.vitals.bpSys) || 120}" placeholder="Sys">
              <span style="align-self:center; font-weight:700;">/</span>
              <input type="number" class="form-input tabular-nums" id="inputBpDia" value="${(p.vitals && p.vitals.bpDia) || 80}" placeholder="Dia">
            </div>
            <span class="text-xs text-muted">mmHg</span>
          </div>

          <div class="vital-input-card ${p.vitals && p.vitals.pulse > 100 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label">Pulse Rate (bpm)</label>
              <span class="vital-status-tag ${p.vitals && p.vitals.pulse > 100 ? 'high' : 'normal'}">
                ${p.vitals && p.vitals.pulse > 100 ? 'High' : 'Normal'}
              </span>
            </div>
            <input type="number" class="form-input tabular-nums" id="inputPulse" value="${(p.vitals && p.vitals.pulse) || 72}">
            <span class="text-xs text-muted">Beats per min</span>
          </div>

          <div class="vital-input-card">
            <div class="vital-label-row">
              <label class="form-label">Temperature (°F)</label>
              <span class="vital-status-tag normal">Clinical</span>
            </div>
            <input type="text" class="form-input tabular-nums" id="inputTemp" value="${(p.vitals && p.vitals.temp) || '98.6'}">
            <span class="text-xs text-muted">Digital thermometer</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 4. ASHA Clinical Triage & Risk Evaluation
   */
  static renderTriage(app) {
    const p = app.activePatient || SWASTHYA_DATA.demoPatient;
    const triageResult = TriageEngine.evaluateVitals(p.vitals || {}, p.symptoms || []);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Clinical Triage & Risk Evaluation</h1>
          <p>Frontline decision support for: <strong>${p.name}</strong> (${p.age}y / ${p.gender})</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('registration')">Edit Vitals</button>
      </div>

      <div class="triage-card ${triageResult.borderClass}" style="margin-bottom:var(--space-xl);">
        <div class="flex items-center justify-between" style="margin-bottom:var(--space-md);">
          <div>
            <span class="text-xs text-muted uppercase font-bold">Evaluated Clinical Stratification</span>
            <h2 style="font-size:1.5rem; margin-top:2px;">${triageResult.level} RISK</h2>
          </div>
          <span class="risk-chip ${triageResult.riskClass}">${triageResult.level} RISK</span>
        </div>

        <div class="view-grid-2col" style="margin-bottom:var(--space-lg);">
          <div>
            <h4 style="font-size:0.9375rem; margin-bottom:var(--space-sm);">Risk Indicators Detected</h4>
            <ul style="padding-left:20px; font-size:0.875rem; line-height:1.5; color:var(--color-neutral);">
              ${triageResult.indicators.map(ind => `<li><strong>${ind}</strong></li>`).join("")}
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9375rem; margin-bottom:var(--space-sm);">Recommended Continuity Action</h4>
            <div class="alert alert-warning" style="font-size:0.875rem;">
              ${triageResult.recommendedAction}
            </div>
          </div>
        </div>

        <div class="clinical-disclaimer">
          <span class="material-symbols-outlined text-primary text-[20px]">policy</span>
          <span>${triageResult.disclaimer}</span>
        </div>
      </div>

      <div class="card flex flex-wrap items-center justify-between gap-base">
        <div>
          <h4>Ready for Inter-Facility Referral</h4>
          <p class="text-xs text-muted">Locate suitable public healthcare centers matching oxygen and emergency requirements.</p>
        </div>
        <div class="flex items-center gap-xs">
          <button class="btn btn-secondary" onclick="app.openCreateReferralModal('${p.id}')">
            <span class="material-symbols-outlined text-[16px]">emergency_share</span>
            <span>Create Immediate Referral</span>
          </button>
          <button class="btn btn-primary" onclick="app.navigateTo('facilities')">
            <span>Find Matching Facility →</span>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * 5. ASHA Referrals Management & Continuum Lifecycle
   */
  static renderReferrals(app) {
    const referrals = SWASTHYA_DATA.ashaReferrals || [];
    const filter = app.ashaReferralFilter || 'all';

    let filtered = referrals.filter(r => {
      if (filter === 'all') return true;
      if (filter === 'transit') return r.statusStep === 4;
      if (filter === 'accepted') return r.statusStep === 5;
      if (filter === 'completed') return r.statusStep >= 6;
      return true;
    });

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Frontline Referral Management</h1>
          <p>End-to-end continuum tracking: Patient Intake → Need Identification → Facility Matching → Referral Status → Follow-up</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.openCreateReferralModal()">
          <span class="material-symbols-outlined text-[16px]">add_circle</span>
          <span>+ Create New Referral</span>
        </button>
      </div>

      <!-- VISUAL REFERRAL WORKFLOW CONTINUUM PIPELINE -->
      <div class="card" style="padding:var(--space-base); margin-bottom:var(--space-md);">
        <span class="text-xs text-muted uppercase font-bold block mb-2">Standard Public Health Referral Pipeline</span>
        <div class="referral-workflow-rail">
          <div class="ref-flow-step is-done">
            <span class="material-symbols-outlined text-[16px]">person</span>
            <span>1. Patient</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step is-done">
            <span class="material-symbols-outlined text-[16px]">troubleshoot</span>
            <span>2. Identify Need</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step is-done">
            <span class="material-symbols-outlined text-[16px]">assignment_add</span>
            <span>3. Create Referral</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step is-done">
            <span class="material-symbols-outlined text-[16px]">local_hospital</span>
            <span>4. Match Facility</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step is-active">
            <span class="material-symbols-outlined text-[16px]">sync_alt</span>
            <span>5. Referral Status</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step">
            <span class="material-symbols-outlined text-[16px]">event_repeat</span>
            <span>6. Follow-up</span>
          </div>
          <span class="ref-flow-arrow">→</span>
          <div class="ref-flow-step">
            <span class="material-symbols-outlined text-[16px]">check_circle</span>
            <span>7. Completed</span>
          </div>
        </div>
      </div>

      <!-- Referral Filter Tabs -->
      <div class="flex flex-wrap items-center justify-between gap-base" style="margin-bottom:var(--space-md);">
        <div class="tab-pill-group">
          <button class="tab-pill-btn ${filter==='all'?'is-active':''}" onclick="app.setAshaReferralFilter('all')">All Referrals (${referrals.length})</button>
          <button class="tab-pill-btn ${filter==='transit'?'is-active':''}" onclick="app.setAshaReferralFilter('transit')">In Transit / 108 Dispatched (1)</button>
          <button class="tab-pill-btn ${filter==='accepted'?'is-active':''}" onclick="app.setAshaReferralFilter('accepted')">Facility Accepted (1)</button>
          <button class="tab-pill-btn ${filter==='completed'?'is-active':''}" onclick="app.setAshaReferralFilter('completed')">Follow-up / Closed (2)</button>
        </div>
      </div>

      <!-- Referral Cards Grid -->
      <div class="flex flex-col gap-base">
        ${filtered.map(r => `
          <div class="card asha-field-card ${r.urgencyClass === 'risk-emergency' ? 'is-urgent' : (r.urgencyClass === 'risk-high' ? 'is-high' : 'is-secondary-ref')}" style="padding:var(--space-base);">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-xs">
              <div>
                <div class="flex flex-wrap items-center gap-xs">
                  <h3 style="font-size:1.125rem; font-weight:800; font-family:var(--font-headline);">${r.patientName}</h3>
                  <span class="text-xs text-muted">${r.age} Y • ${r.gender} • ${r.village}</span>
                  <span class="risk-chip ${r.urgencyClass}">${r.urgency}</span>
                </div>
                <div class="flex items-center gap-xs text-xs text-muted" style="margin-top:2px;">
                  <span>ABHA: <strong class="numeric-id text-primary">${r.abhaId}</strong></span>
                  <span>• Token: <strong class="numeric-id text-neutral font-bold">${r.slipToken}</strong></span>
                </div>
              </div>

              <div class="flex items-center gap-xs">
                <span class="tag-capability ${r.statusClass}">● ${r.status}</span>
              </div>
            </div>

            <div class="bg-surface-subtle p-3 rounded-lg text-xs flex flex-col gap-1.5" style="margin-top:var(--space-sm);">
              <div class="flex flex-wrap items-center justify-between">
                <div><strong>Clinical Healthcare Need:</strong> <span class="text-neutral font-medium">${r.clinicalNeed}</span></div>
                <span class="text-muted">${r.createdAt}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-xs pt-1 border-t border-structural">
                <div><span class="text-muted">Target Facility:</span> <strong>${r.facilityName}</strong></div>
                <div><span class="text-muted">Assigned Doctor:</span> <strong>${r.doctorAssigned}</strong></div>
                <div><span class="text-muted">Transport Mode:</span> <strong class="${r.ambulanceReg ? 'text-danger' : 'text-neutral'}">${r.transportMode}</strong></div>
              </div>
              ${r.notes ? `<p class="text-muted italic pt-1">"${r.notes}"</p>` : ''}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-top:var(--space-sm); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
              <div class="flex items-center gap-xs">
                ${r.ambulanceReg ? `
                  <button class="btn btn-secondary btn-sm" onclick="app.showAmbulanceTracker()">
                    <span class="material-symbols-outlined text-[15px]">airport_shuttle</span>
                    <span>Track Ambulance GPS (${r.ambulanceEta})</span>
                  </button>
                ` : `
                  <span class="text-xs text-muted flex items-center gap-xs">
                    <span class="material-symbols-outlined text-[15px] text-primary">directions_bus</span> MSRTC / Family Assisted Transit
                  </span>
                `}
              </div>

              <div class="flex items-center gap-xs">
                <button class="btn btn-secondary btn-sm" onclick="app.shareReferralSlip('${r.patientName}')">
                  <span class="material-symbols-outlined text-[15px]">share</span>
                  <span>Share Referral Slip</span>
                </button>
                <button class="btn btn-primary btn-sm" onclick="app.showToast('Referral updated: Follow-up visit logged for ${r.patientName}', 'success')">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Update Status</span>
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /**
   * 6. ASHA Follow-ups Tracker
   */
  static renderFollowUps(app) {
    const followups = SWASTHYA_DATA.ashaFollowUps || [];
    const tab = app.ashaFollowUpTab || 'today';

    let filtered = followups.filter(f => {
      if (tab === 'today') return f.dueStatus === 'Due Today';
      if (tab === 'week') return f.dueStatus === 'Upcoming This Week';
      if (tab === 'completed') return f.completed === true;
      return true;
    });

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Home Follow-ups & Post-Care Tracker</h1>
          <p>Frontline field visits, post-discharge stent checks, maternal ANC progression, and child immunization</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.showToast('Scheduled new follow-up visit for village cohort.', 'info')">
          + Schedule Home Visit
        </button>
      </div>

      <!-- Follow-up Tabs -->
      <div class="tab-pill-group" style="margin-bottom:var(--space-md);">
        <button class="tab-pill-btn ${tab==='today'?'is-active':''}" onclick="app.setAshaFollowUpTab('today')">Due Today (${followups.filter(f=>f.dueStatus==='Due Today').length})</button>
        <button class="tab-pill-btn ${tab==='week'?'is-active':''}" onclick="app.setAshaFollowUpTab('week')">Upcoming This Week (${followups.filter(f=>f.dueStatus==='Upcoming This Week').length})</button>
        <button class="tab-pill-btn ${tab==='completed'?'is-active':''}" onclick="app.setAshaFollowUpTab('completed')">Completed Log</button>
      </div>

      <div class="flex flex-col gap-base">
        ${filtered.map(f => `
          <div class="card asha-field-card ${f.dueClass === 'risk-emergency' ? 'is-urgent' : (f.dueClass === 'risk-high' ? 'is-maternal' : '')}" style="padding:var(--space-base);">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-xs">
              <div>
                <div class="flex flex-wrap items-center gap-xs">
                  <h3 style="font-size:1.125rem; font-weight:800; font-family:var(--font-headline);">${f.patientName}</h3>
                  <span class="text-xs text-muted">${f.age} Y • ${f.gender} • ${f.village}</span>
                  <span class="tag-capability">${f.category}</span>
                </div>
                <p class="numeric-id text-xs text-muted" style="margin-top:2px;">ABHA: ${f.abhaId}</p>
              </div>

              <span class="badge-overdue-time ${f.dueClass === 'risk-emergency' ? '' : 'bg-surface-container text-primary'}">
                <span class="material-symbols-outlined text-[15px]">schedule</span>
                <span>${f.scheduledTime}</span>
              </span>
            </div>

            <div class="bg-surface-subtle p-3 rounded-lg text-xs flex flex-col gap-1" style="margin-top:var(--space-sm);">
              <div><strong>Reason for Follow-up:</strong> <span>${f.reason}</span></div>
              <div><strong>Target Clinical Protocol:</strong> <span class="text-primary font-bold">${f.targetAction}</span></div>
              ${f.currentMedication ? `<div><strong>Current Medicine:</strong> <span>${f.currentMedication}</span></div>` : ''}
              ${f.lastRecordedBp ? `<div><strong>Last Recorded BP:</strong> <span class="text-danger font-bold">${f.lastRecordedBp}</span></div>` : ''}
              ${f.lastRecordedHb ? `<div><strong>Last Recorded Hb:</strong> <span class="text-primary font-bold">${f.lastRecordedHb}</span></div>` : ''}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-top:var(--space-sm); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
              <span class="text-xs text-muted flex items-center gap-xs">
                <span class="material-symbols-outlined text-[16px] text-primary">pin_drop</span> ${f.address}
              </span>

              <div class="flex items-center gap-xs">
                <a class="btn btn-secondary btn-sm" href="tel:${f.phone}" title="Call Patient">
                  <span class="material-symbols-outlined text-[15px]">phone</span>
                  <span>Call</span>
                </a>
                <button class="btn btn-secondary btn-sm" onclick="app.recordPatientVitals('${f.patientName}')">
                  <span class="material-symbols-outlined text-[15px]">stylus</span>
                  <span>Record Vitals</span>
                </button>
                <button class="btn btn-primary btn-sm" onclick="app.completeFollowUp('${f.id}')">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Mark Complete</span>
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /**
   * 7. ASHA Facilities Directory
   */
  static renderFacilities(app) {
    return app.renderFacilitiesView();
  }

  /**
   * 8. ASHA Field Tasks
   */
  static renderTasks(app) {
    const tasks = SWASTHYA_DATA.ashaTasks || [];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Daily Field Tasks & Outreach Schedule</h1>
          <p>Village health visits, maternal ANC checkups, NCD screening camps, and IFA replenishment</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.openAddTaskModal()">
          <span class="material-symbols-outlined text-[16px]">add_task</span>
          <span>+ Add Field Task</span>
        </button>
      </div>

      <div class="flex flex-col gap-base">
        ${tasks.map(t => `
          <div class="card" style="display:flex; flex-direction:column; gap:var(--space-xs); padding:var(--space-base);">
            <div class="flex items-center justify-between">
              <span class="risk-chip ${t.priorityClass}">${t.priority}</span>
              <span class="text-xs text-muted font-bold">${t.dueDate}</span>
            </div>
            <h3 style="font-size:1.0625rem; font-weight:700;">${t.title}</h3>
            <p class="text-xs text-muted">Type: <strong>${t.type}</strong> • Locality: <strong>${t.village}</strong></p>
            <div class="flex items-center justify-between" style="margin-top:var(--space-sm); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle);">
              <span class="tag-capability">${t.status}</span>
              <button class="btn btn-secondary btn-sm" onclick="app.showToast('Completed task: ${t.title}', 'success')">
                <span class="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Mark Complete</span>
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /**
   * 9. ASHA Frontline Notifications
   */
  static renderNotifications(app) {
    const notifs = SWASTHYA_DATA.ashaNotifications || [];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Frontline Field Notifications</h1>
          <p>Ambulance dispatch alerts, PHC referral confirmations, and medical supply approvals</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="app.showToast('All field alerts marked as read.', 'info')">
          Mark All Read
        </button>
      </div>

      <div class="flex flex-col gap-sm">
        ${notifs.map(n => `
          <div class="notification-card ${n.unread ? 'is-unread' : ''}" style="cursor:pointer;" onclick="app.navigateTo('${n.actionView}')">
            <div class="flex items-start gap-md">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type==='emergency'?'bg-red-100 text-red-800':(n.type==='referral'?'bg-emerald-100 text-emerald-800':'bg-amber-100 text-amber-800')}">
                <span class="material-symbols-outlined text-[20px]">${n.icon}</span>
              </div>
              <div style="flex:1;">
                <div class="flex items-center justify-between">
                  <h4 style="font-size:0.9375rem; font-weight:700;">${n.title}</h4>
                  <span class="text-xs text-muted">${n.time}</span>
                </div>
                <p class="text-xs text-muted mt-1 leading-relaxed">${n.message}</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  /**
   * 10. ASHA Profile & Field Credentials
   */
  static renderProfile(app) {
    const prof = SWASTHYA_DATA.ashaProfile;
    const asha = SWASTHYA_DATA.roles.ASHA;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>ASHA Field Worker Profile & Credentials</h1>
          <p>National Health Mission (NHM) Accredited Frontline Health Activist</p>
        </div>
      </div>

      <div class="view-grid-2col">
        <!-- Left: ASHA ID Card -->
        <div class="card" style="padding:var(--space-base);">
          <div class="flex items-start gap-md" style="margin-bottom:var(--space-md);">
            <div class="w-16 h-16 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xl font-bold">
              SM
            </div>
            <div>
              <div class="flex items-center gap-xs">
                <h3 style="font-size:1.25rem; font-weight:800; color:var(--color-primary);">${prof.workerName}</h3>
                <span class="tag-capability" style="background:var(--color-primary-light); color:var(--color-primary);">Active Cadre</span>
              </div>
              <p class="text-xs font-bold text-secondary">${prof.workerId} • NHM Cadre ID: ${prof.nhmCadreId}</p>
              <p class="text-xs text-muted mt-1">${prof.subCentre} • ${prof.block}</p>
            </div>
          </div>

          <div class="bg-surface-subtle p-3 rounded-lg text-xs flex flex-col gap-1.5">
            <div class="flex justify-between"><strong>District:</strong> <span>${prof.district}</span></div>
            <div class="flex justify-between"><strong>Linked Facility:</strong> <span>${prof.phcLinkage}</span></div>
            <div class="flex justify-between"><strong>Service Tenure:</strong> <span>${prof.joiningYear}</span></div>
            <div class="flex justify-between"><strong>Population Covered:</strong> <span>${prof.populationCohort} Citizens (${prof.registeredHouseholds} HH)</span></div>
            <div class="flex justify-between"><strong>Handset Device:</strong> <span class="text-primary font-bold">${prof.deviceStatus}</span></div>
          </div>

          <div style="margin-top:var(--space-md); padding-top:var(--space-xs); border-top:1px solid var(--surface-subtle); display:flex; justify-content:space-between; align-items:center;">
            <span class="text-xs text-muted">Ministry of Health & Family Welfare</span>
            <button class="btn btn-secondary btn-sm" onclick="app.showToast('Downloaded ASHA Official Identity Badge (PDF)', 'success')">
              <span class="material-symbols-outlined text-[15px]">download</span>
              <span>Download ID Card</span>
            </button>
          </div>
        </div>

        <!-- Right: Monthly NHM Incentives Ledger -->
        <div class="card" style="padding:var(--space-base);">
          <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
            <div>
              <h3 class="card-title" style="font-size:1rem;">NHM Monthly Incentive Ledger</h3>
              <p class="text-xs text-muted">Performance-linked incentives verified by PHC Shirur</p>
            </div>
            <span class="font-headline font-bold text-lg text-primary">${prof.monthlyIncentiveDue}</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            ${prof.incentivesBreakdown.map(ib => `
              <div class="p-2 rounded bg-surface-subtle flex items-center justify-between text-xs">
                <span>${ib.item}</span>
                <strong class="text-primary">${ib.amount}</strong>
              </div>
            `).join("")}
          </div>

          <div class="alert alert-info" style="font-size:0.75rem; margin-top:var(--space-md);">
            <strong>DBT Account:</strong> Direct Benefit Transfer linked to Bank of Maharashtra (A/C: ****4920).
          </div>
        </div>
      </div>
    `;
  }
}

window.AshaPages = AshaPages;
