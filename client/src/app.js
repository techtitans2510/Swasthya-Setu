/**
 * SwasthyaSetu Application Core Controller
 * Handles Multi-Role Workflows (ASHA, Doctor, Admin, Patient/Citizen),
 * 1-Click SIH Demo Journey, ABDM Citizen Portal, and Dynamic Views
 * Design Source of Truth: Stitch Project 11062066934146902009
 */

class SwasthyaApp {
  constructor() {
    this.currentRole = localStorage.getItem("swasthya_role") || "ASHA";
    this.currentView = "dashboard";
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.selectedFacility = SWASTHYA_DATA.facilities[0];
    this.registeredPatients = [...SWASTHYA_DATA.recentPatients];
    this.citizenData = JSON.parse(JSON.stringify(SWASTHYA_DATA.citizenUser));
    this.wizardStep = 1;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setRole(this.currentRole);
    this.renderCurrentView();

    // Init offline listener
    window.offlineStore.onStatusChange(state => {
      // Handled in offline store
    });

    // Language listener
    if (window.i18n) {
      window.i18n.updateDOM();
    }
  }

  bindEvents() {
    // Role switcher in header (ASHA, DOCTOR, ADMIN, PATIENT)
    document.querySelectorAll(".role-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const role = e.currentTarget.getAttribute("data-role");
        this.setRole(role);
      });
    });

    // Language selector
    const langSelect = document.getElementById("langSelector");
    if (langSelect) {
      langSelect.addEventListener("change", e => {
        window.i18n.setLanguage(e.target.value);
        this.renderCurrentView();
      });
    }

    // Network Mode Segmented Toggle Buttons
    const btnOnline = document.getElementById("btnModeOnline");
    const btnOffline = document.getElementById("btnModeOffline");
    if (btnOnline) {
      btnOnline.addEventListener("click", () => {
        window.offlineStore.setOnlineStatus(true);
        this.showToast("Connected to State Public Health Grid (Cloud Active)", "info");
      });
    }
    if (btnOffline) {
      btnOffline.addEventListener("click", () => {
        window.offlineStore.setOnlineStatus(false);
        this.showToast("Switched to Offline Field Mode (Encrypted Local Storage)", "warning");
      });
    }

    // Header Actionable Sync Button
    const headerSyncBtn = document.getElementById("headerSyncBtn");
    if (headerSyncBtn) {
      headerSyncBtn.addEventListener("click", () => {
        window.offlineStore.triggerSync(count => {
          this.showToast(`Cloud Sync Complete • ${count} record(s) synchronized with State Health Portal`, "success");
        });
      });
    }

    // Sync Now in ribbon
    const syncRibbonBtn = document.getElementById("ribbonSyncBtn");
    if (syncRibbonBtn) {
      syncRibbonBtn.addEventListener("click", () => {
        window.offlineStore.triggerSync(count => {
          this.showToast(`Successfully synced ${count} offline records with State Health Cloud!`, "success");
        });
      });
    }

    // Navigation items
    document.querySelectorAll(".nav-item, .mobile-nav-link").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        const view = e.currentTarget.getAttribute("data-view");
        if (view) {
          this.navigateTo(view);
        }
      });
    });
  }

  setRole(role) {
    this.currentRole = role;
    localStorage.setItem("swasthya_role", role);

    // Update active role buttons
    document.querySelectorAll(".role-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-role") === role);
    });

    // Update user display in sidebar
    const userRoleEl = document.getElementById("currentUserRole");
    const userNameEl = document.getElementById("currentUserName");
    const userAvatarEl = document.getElementById("currentUserAvatar");
    const userBadgeEl = document.getElementById("currentUserBadge");

    if (role === "ASHA") {
      if (userNameEl) userNameEl.textContent = "Sunita More";
      if (userRoleEl) userRoleEl.textContent = "ASHA Frontline Activist";
      if (userAvatarEl) userAvatarEl.textContent = "SM";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-asha";
        userBadgeEl.textContent = "ASHA";
      }
    } else if (role === "DOCTOR") {
      if (userNameEl) userNameEl.textContent = "Dr. A. Kulkarni";
      if (userRoleEl) userRoleEl.textContent = "Medical Officer (Shirur 24x7 PHC)";
      if (userAvatarEl) userAvatarEl.textContent = "AK";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-doctor";
        userBadgeEl.textContent = "Doctor (MO)";
      }
    } else if (role === "ADMIN") {
      if (userNameEl) userNameEl.textContent = "Dr. S. K. Patil";
      if (userRoleEl) userRoleEl.textContent = "District Health Officer (Pune Grid)";
      if (userAvatarEl) userAvatarEl.textContent = "SP";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-admin";
        userBadgeEl.textContent = "Admin";
      }
    } else if (role === "PATIENT") {
      if (userNameEl) userNameEl.textContent = "Ramesh Patil";
      if (userRoleEl) userRoleEl.textContent = "Citizen / ABHA Beneficiary";
      if (userAvatarEl) userAvatarEl.textContent = "RP";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-patient";
        userBadgeEl.textContent = "Citizen";
      }
    }

    this.updateSidebarNavForRole(role);
    this.navigateTo("dashboard");
  }

  updateSidebarNavForRole(role) {
    const navContainer = document.getElementById("sidebarNav");
    if (!navContainer) return;

    let navHtml = "";
    if (role === "ASHA") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">grid_view</span>
          <span data-i18n="nav_dashboard">Dashboard</span>
        </a>
        <a href="#" class="nav-item" data-view="registration">
          <span class="material-symbols-outlined nav-item-icon">person_add</span>
          <span data-i18n="dash_quick_register">Register Patient</span>
        </a>
        <a href="#" class="nav-item" data-view="triage">
          <span class="material-symbols-outlined nav-item-icon">vital_signs</span>
          <span data-i18n="nav_triage">Triage & Vitals</span>
        </a>
        <a href="#" class="nav-item" data-view="patients">
          <span class="material-symbols-outlined nav-item-icon">groups</span>
          <span data-i18n="nav_patients">Village Patients</span>
          <span class="nav-badge-count">28</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <span class="material-symbols-outlined nav-item-icon">local_hospital</span>
          <span data-i18n="nav_facilities">Facility Finder</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <span class="material-symbols-outlined nav-item-icon">transfer_within_a_station</span>
          <span data-i18n="nav_referrals">Active Referrals</span>
          <span class="nav-badge-count" style="background:var(--risk-high-bg); color:var(--risk-high-fg);">3</span>
        </a>
        <a href="#" class="nav-item" data-view="timeline">
          <span class="material-symbols-outlined nav-item-icon">route</span>
          <span data-i18n="nav_records">Health Timeline</span>
        </a>
      `;
    } else if (role === "DOCTOR") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">stethoscope</span>
          <span data-i18n="nav_consultations">Clinical Station</span>
          <span class="nav-badge-count" style="background:var(--risk-emergency-bg); color:var(--risk-emergency-fg);">2 Urgent</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <span class="material-symbols-outlined nav-item-icon">forward_to_inbox</span>
          <span data-i18n="nav_referrals">Referral Inbox</span>
        </a>
        <a href="#" class="nav-item" data-view="timeline">
          <span class="material-symbols-outlined nav-item-icon">clinical_notes</span>
          <span>ABHA Longitudinal Record</span>
        </a>
      `;
    } else if (role === "ADMIN") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">analytics</span>
          <span data-i18n="nav_analytics">District Overview</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <span class="material-symbols-outlined nav-item-icon">local_hospital</span>
          <span>Facility Capacity</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <span class="material-symbols-outlined nav-item-icon">swap_horiz</span>
          <span>Transfer Logistics</span>
        </a>
      `;
    } else if (role === "PATIENT") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">home_health</span>
          <span data-i18n="nav_my_health">My Health Home</span>
        </a>
        <a href="#" class="nav-item" data-view="timeline">
          <span class="material-symbols-outlined nav-item-icon">clinical_notes</span>
          <span data-i18n="nav_records">Health Records</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <span class="material-symbols-outlined nav-item-icon">local_hospital</span>
          <span data-i18n="nav_facilities">Facility Finder</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <span class="material-symbols-outlined nav-item-icon">transfer_within_a_station</span>
          <span data-i18n="nav_referrals">Referral Tracking</span>
        </a>
      `;
    }

    navContainer.innerHTML = navHtml;

    // Rebind nav items
    navContainer.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        const view = e.currentTarget.getAttribute("data-view");
        if (view) this.navigateTo(view);
      });
    });
  }

  navigateTo(viewName) {
    this.currentView = viewName;

    // Update active class in sidebar & mobile nav
    document.querySelectorAll(".nav-item, .mobile-nav-link").forEach(item => {
      item.classList.toggle("is-active", item.getAttribute("data-view") === viewName);
    });

    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCurrentView() {
    const mainContainer = document.getElementById("mainContent");
    if (!mainContainer) return;

    if (this.currentRole === "PATIENT") {
      if (this.currentView === "dashboard") {
        mainContainer.innerHTML = this.renderPatientPortal();
        this.bindPatientPortalEvents();
      } else if (this.currentView === "timeline") {
        mainContainer.innerHTML = this.renderTimelineView();
      } else if (this.currentView === "facilities") {
        mainContainer.innerHTML = this.renderFacilitiesView();
        this.bindFacilityEvents();
      } else if (this.currentView === "referrals") {
        mainContainer.innerHTML = this.renderReferralsView();
      } else {
        mainContainer.innerHTML = this.renderPatientPortal();
        this.bindPatientPortalEvents();
      }
    } else if (this.currentRole === "DOCTOR") {
      mainContainer.innerHTML = this.renderDoctorDashboard();
      this.bindDoctorEvents();
    } else if (this.currentRole === "ADMIN") {
      mainContainer.innerHTML = this.renderAdminDashboard();
    } else {
      // ASHA Workflows
      switch (this.currentView) {
        case "registration":
          mainContainer.innerHTML = this.renderRegistrationWizard();
          this.bindWizardEvents();
          break;
        case "triage":
          mainContainer.innerHTML = this.renderTriageView();
          this.bindTriageEvents();
          break;
        case "facilities":
          mainContainer.innerHTML = this.renderFacilitiesView();
          this.bindFacilityEvents();
          break;
        case "referrals":
          mainContainer.innerHTML = this.renderReferralsView();
          break;
        case "timeline":
          mainContainer.innerHTML = this.renderTimelineView();
          break;
        case "patients":
          mainContainer.innerHTML = this.renderPatientsListView();
          break;
        case "dashboard":
        default:
          mainContainer.innerHTML = this.renderAshaDashboard();
          this.bindDashboardEvents();
          break;
      }
    }

    if (window.i18n) {
      window.i18n.updateDOM();
    }
  }

  /* ==========================================================================
     RENDERERS: ASHA DASHBOARD & 7-STAGE STEPPER (Stitch Screen 897d27b1)
     ========================================================================== */
  renderAshaDashboard() {
    return `
      <!-- TOP BANNERS CONTAINER: Offline Synchronization & SIH Active Demonstration Flow -->
      <div style="display:flex; flex-direction:column; gap:var(--space-sm); margin-bottom:var(--space-lg);">
        <!-- Offline Sync Banner -->
        <div class="alert alert-warning" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:var(--space-sm);">
          <div class="flex items-center gap-sm">
            <span class="material-symbols-outlined" style="font-size:24px; color:var(--sync-offline-fg);">wifi_off</span>
            <div>
              <strong style="color:var(--sync-offline-fg);">Local Offline Storage Active:</strong>
              <span class="text-sm">2 vitals logs queued for sync. All records cached securely in device sandbox.</span>
            </div>
          </div>
          <div class="flex items-center gap-xs">
            <span class="text-xs text-muted font-bold uppercase hidden md:inline">SQLite Local DB</span>
            <button class="btn btn-primary btn-sm" style="background:#92400E; border-color:#92400E;" id="syncNowAshaBtn" onclick="app.triggerSyncSimulation()">
              <span class="material-symbols-outlined text-[16px]">sync</span>
              <span>Sync Now</span>
            </button>
          </div>
        </div>

        <!-- Active Demo Hero Journey Header -->
        <div class="demo-hero-banner">
          <div style="max-width:780px;">
            <div class="flex items-center gap-xs" style="margin-bottom:var(--space-xs);">
              <span class="demo-hero-pill">
                <span class="material-symbols-outlined text-[14px]">bolt</span> SIH Demonstration Flow
              </span>
              <span class="text-xs" style="color:var(--color-primary-fixed-dim);">• Case ID: SH-2024-0982</span>
            </div>
            <h2 style="color:#FFFFFF; font-size:1.375rem; margin-bottom:4px;">
              Patient: Ramesh Patil, 62 Y — High Risk Detected
            </h2>
            <p class="text-sm" style="color:var(--color-primary-fixed-dim); line-height:1.4;">
              Follow uninterrupted continuum of care: ASHA Village Survey → Digital Triage & Vitals → Cluster PHC Shirur Referral → Medical Officer Tele-Triage → Continuity Log.
            </p>
          </div>
          <button class="btn btn-secondary btn-sm font-bold" id="startDemoJourneyBtn" onclick="app.runDemoJourney()" style="background:var(--color-tertiary-light); color:var(--color-tertiary-container); border:none;">
            <span class="material-symbols-outlined text-[18px]">explore</span>
            <span>Inspect Active Journey</span>
          </button>
        </div>
      </div>

      <!-- SIGNATURE UX COMPONENT: THE 7-STAGE PATIENT JOURNEY STEPPER -->
      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm); padding-bottom:var(--space-xs); border-bottom:1px solid var(--surface-subtle);">
          <div>
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-primary text-[22px]">route</span>
              <h3 class="card-title">Patient Journey Stepper</h3>
            </div>
            <p class="text-xs text-muted">End-to-End ABDM Integrated Continuum for Ramesh Patil (ABHA: 91-4029-1823-0192)</p>
          </div>
          <div class="flex items-center gap-xs">
            <span class="badge-role badge-role-asha">Facility: Shirur 24x7 PHC</span>
            <span class="risk-chip risk-high flex items-center gap-xs">
              <span class="sync-dot-live"></span> Stage 4/7 Active
            </span>
          </div>
        </div>

        <!-- Stepper Graphic Flow -->
        ${this.renderJourneyStepper(4)}

        <!-- Clinical Disclaimer & Guardrail Note -->
        <div class="clinical-disclaimer" style="margin-top:var(--space-md);">
          <span class="material-symbols-outlined text-primary text-[20px]">policy</span>
          <div>
            <strong style="color:var(--color-neutral);">Decision Support & Clinical Guardrail:</strong>
            <span data-i18n="triage_disclaimer">
              Algorithm calculates predictive severity indices based on frontline vitals (SpO2, Pulse, SBP). Definitive diagnostic confirmation is strictly authorized by registered PHC Medical Officers under MoHFW Indian Public Health Standards (IPHS).
            </span>
          </div>
        </div>
      </div>

      <!-- Operational Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_handled_today">Daily Census</span>
            <div class="metric-tile-icon is-green">
              <span class="material-symbols-outlined text-[18px]">groups</span>
            </div>
          </div>
          <div class="flex items-baseline gap-xs">
            <span class="metric-tile-value">14</span>
            <span class="text-xs font-bold" style="background:var(--color-tertiary-light); color:var(--color-tertiary-container); padding:2px 6px; border-radius:12px;">+3 pending</span>
          </div>
          <div class="metric-tile-footer text-muted">Talwade Sector 4</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_high_risk">High Risk Cases</span>
            <div class="metric-tile-icon is-orange">
              <span class="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div class="flex items-baseline gap-xs">
            <span class="metric-tile-value text-bold" style="color:var(--risk-high-fg);">3</span>
            <span class="text-xs font-bold" style="background:var(--risk-emergency-bg); color:var(--risk-emergency-fg); padding:2px 6px; border-radius:12px;">Action Req.</span>
          </div>
          <div class="metric-tile-footer" style="color:var(--risk-high-fg);">1 Transport En Route</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_pending_referrals">Pending PHC Referrals</span>
            <div class="metric-tile-icon is-blue">
              <span class="material-symbols-outlined text-[18px]">transfer_within_a_station</span>
            </div>
          </div>
          <div class="flex items-baseline gap-xs">
            <span class="metric-tile-value">4</span>
            <span class="text-xs font-bold" style="background:var(--color-secondary-light); color:var(--color-secondary); padding:2px 6px; border-radius:12px;">2 Accepted</span>
          </div>
          <div class="metric-tile-footer text-muted">2 En Route to Shirur</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_followups_due">Follow-ups Due</span>
            <div class="metric-tile-icon is-amber">
              <span class="material-symbols-outlined text-[18px]">event_repeat</span>
            </div>
          </div>
          <div class="flex items-baseline gap-xs">
            <span class="metric-tile-value">8</span>
            <span class="text-xs font-bold" style="background:var(--color-primary-fixed); color:var(--color-primary); padding:2px 6px; border-radius:12px;">HTN & ANC</span>
          </div>
          <div class="metric-tile-footer text-muted">Next visit: Tomorrow</div>
        </div>
      </div>

      <!-- Primary Quick Actions Bar -->
      <div class="quick-action-strip">
        <div class="flex items-center gap-xs">
          <span class="material-symbols-outlined text-primary text-[20px]">touch_app</span>
          <strong class="text-primary font-headline" style="font-size:1.0625rem;">Field Actions</strong>
        </div>
        <div class="flex flex-wrap items-center gap-sm">
          <button class="btn btn-primary" id="quickRegisterBtn">
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            <span data-i18n="dash_quick_register">+ Register New Patient</span>
          </button>
          <button class="btn btn-secondary" onclick="app.navigateTo('triage')">
            <span class="material-symbols-outlined text-[18px] text-amber-600">vital_signs</span>
            <span data-i18n="dash_record_vitals">Record Vitals & Triage</span>
          </button>
          <button class="btn btn-referral" onclick="app.navigateTo('facilities')">
            <span class="material-symbols-outlined text-[18px]">local_hospital</span>
            <span data-i18n="dash_facility_finder">Nearest Facility Finder</span>
          </button>
        </div>
      </div>

      <!-- Active Patient Priority Table & Live Facility Snapshot (Split Bento) -->
      <div class="asha-split-bento">
        <!-- Active Clinical Referrals Queue (8 Columns) -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-header">
              <div>
                <h3 class="card-title" data-i18n="dash_recent_patients">Active Referral & Triage Queue</h3>
                <p class="text-xs text-muted">Live cluster queue verified with ABDM Health ID stack</p>
              </div>
              <span class="sync-status-pill is-online">● 3 Cases Monitored</span>
            </div>

            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient / ABHA ID</th>
                    <th>Village / Age</th>
                    <th>Vitals Snapshot</th>
                    <th>Risk Tier</th>
                    <th>Transit Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.registeredPatients.map(p => `
                    <tr>
                      <td>
                        <strong>${p.name}</strong><br>
                        <span class="font-numeric text-xs text-muted flex items-center gap-xs">
                          <span class="material-symbols-outlined text-[14px]">badge</span>${p.abhaId}
                        </span>
                      </td>
                      <td>
                        <strong>${p.village}</strong><br>
                        <span class="text-xs text-muted">${p.age}y / ${p.gender}</span>
                      </td>
                      <td>
                        <span class="text-xs font-bold ${p.riskLevel === 'HIGH' || p.riskLevel === 'EMERGENCY' ? 'text-danger' : ''}">
                          SpO2: ${p.spo2} • BP: ${p.bp}
                        </span>
                      </td>
                      <td>
                        <span class="risk-chip ${p.riskClass}">${p.riskLevel}</span>
                      </td>
                      <td>
                        <span class="text-xs font-bold text-primary">${p.status}</span>
                      </td>
                      <td>
                        <button class="btn btn-secondary btn-sm" onclick="app.inspectPatient('${p.id}')">
                          View File →
                        </button>
                      </td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <div style="margin-top:var(--space-md); padding-top:var(--space-sm); border-top:1px solid var(--surface-subtle); display:flex; align-items:center; justify-content:space-between;">
            <span class="text-xs text-muted flex items-center gap-xs">
              <span class="material-symbols-outlined text-[16px] text-primary">security</span> All records signed by ASHA Sunita Tai • Verified via Shirur PHC Gateway
            </span>
            <a href="#" onclick="app.navigateTo('patients')" class="text-xs text-primary font-bold">View Full Register (28 Patients) →</a>
          </div>
        </div>

        <!-- Live Facility Capability & Ready Bed Snapshot (4 Columns) -->
        <div style="display:flex; flex-direction:column; gap:var(--space-md);">
          <!-- Live Facility Card -->
          <div class="facility-live-card">
            <div class="flex items-center justify-between">
              <span class="badge-role badge-role-asha">PHC Facility</span>
              <span class="text-xs text-muted font-bold flex items-center gap-xs">
                <span class="material-symbols-outlined text-[15px]">distance</span> 4.2 km
              </span>
            </div>
            <div>
              <h4 style="font-size:1.0625rem; font-weight:700;">Shirur Primary Health Centre</h4>
              <p class="text-xs text-muted">Shirur 24x7 Government Primary Health Centre</p>
            </div>

            <!-- Readiness Indicators -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div class="facility-readiness-row">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-primary">medical_services</span> 24x7 Emergency Services
                </span>
                <span class="tag-capability">Active</span>
              </div>
              <div class="facility-readiness-row">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-secondary">air</span> Oxygen Beds
                </span>
                <span class="text-xs font-bold text-secondary">4 / 6 Free</span>
              </div>
              <div class="facility-readiness-row">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-primary">person_check</span> Medical Officer on Duty
                </span>
                <span class="text-xs font-bold text-primary">Dr. A. Kulkarni</span>
              </div>
            </div>

            <button class="btn btn-referral btn-sm" style="width:100%;" onclick="app.showToast('Calling Shirur PHC Emergency Desk: 02138-222104', 'info')">
              <span class="material-symbols-outlined text-[16px]">call</span>
              <span>Call PHC Emergency Desk</span>
            </button>
          </div>

          <!-- Demographic Triage Distribution Card with SVG Donut Chart -->
          <div class="card" style="padding:var(--space-base);">
            <div class="flex items-center justify-between" style="margin-bottom:var(--space-xs);">
              <h4 style="font-size:0.9375rem; font-weight:700;">Triage Distribution</h4>
              <span class="text-xs text-muted font-bold">Shirur Block</span>
            </div>

            <div class="flex items-center gap-md" style="margin:var(--space-sm) 0;">
              <div class="donut-chart-container">
                <svg class="w-full h-full" viewBox="0 0 36 36" style="transform: rotate(-90deg);">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e0f2e9" stroke-width="3.8"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0e4834" stroke-width="3.8" stroke-dasharray="60 40" stroke-dashoffset="0"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" stroke-width="3.8" stroke-dasharray="25 75" stroke-dashoffset="-60"></circle>
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#b91c1c" stroke-width="3.8" stroke-dasharray="15 85" stroke-dashoffset="-85"></circle>
                </svg>
                <div class="donut-chart-text">
                  <span style="font-size:1.125rem; font-weight:700; line-height:1;">148</span>
                  <span class="text-xs text-muted" style="font-size:0.625rem;">Total</span>
                </div>
              </div>

              <div style="flex:1; display:flex; flex-direction:column; gap:4px;">
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-xs"><span style="width:8px; height:8px; border-radius:50%; background:var(--color-primary);"></span> Low Risk</span>
                  <strong>60%</strong>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-xs"><span style="width:8px; height:8px; border-radius:50%; background:var(--risk-moderate-fg);"></span> Moderate Risk</span>
                  <strong style="color:var(--risk-moderate-fg);">25%</strong>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-xs"><span style="width:8px; height:8px; border-radius:50%; background:var(--risk-emergency-fg);"></span> High / Urgent</span>
                  <strong style="color:var(--risk-emergency-fg);">15%</strong>
                </div>
              </div>
            </div>

            <div class="alert alert-info" style="padding:6px 10px; font-size:0.75rem; margin-top:4px;">
              <strong>NCD Screening Coverage:</strong> 82% Completed across Sub-Centres
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderJourneyStepper(activeStep = 4) {
    const steps = [
      { id: 1, label: "1. Profile", desc: "Done (Talwade)", time: "09:14 AM", i18nKey: "step_patient" },
      { id: 2, label: "2. Assessment", desc: "Vitals Stored", time: "09:22 AM", i18nKey: "step_assessment" },
      { id: 3, label: "3. Triage", desc: "High Flagged", time: "09:24 AM", i18nKey: "step_triage" },
      { id: 4, label: "4. Facility", desc: "PHC Shirur Sel.", time: "Bed Reserved", i18nKey: "step_facility" },
      { id: 5, label: "5. Referral Slip", desc: "Dispatched", time: "In Transit", i18nKey: "step_referral" },
      { id: 6, label: "6. Doctor Care", desc: "Waiting MO", time: "Dr. Kulkarni", i18nKey: "step_doctor" },
      { id: 7, label: "7. Follow-up", desc: "7 Day Target", time: "Village Visit", i18nKey: "step_followup" }
    ];

    const progressPct = ((activeStep - 1) / (steps.length - 1)) * 100;

    return `
      <div class="stepper-container">
        <div class="stepper-rail">
          <div class="stepper-rail-progress" style="width:${progressPct}%;"></div>
        </div>

        <div class="patient-journey-stepper">
          ${steps.map(s => {
            let stepClass = "";
            let iconContent = s.id;
            if (s.id < activeStep) {
              stepClass = "is-completed";
              iconContent = '<span class="material-symbols-outlined text-[18px]">check</span>';
            } else if (s.id === activeStep) {
              stepClass = "is-active";
              iconContent = '<span class="material-symbols-outlined text-[18px]">apartment</span>';
            }
            return `
              <div class="journey-step ${stepClass}">
                <div class="journey-node">${iconContent}</div>
                <div class="journey-label" data-i18n="${s.i18nKey}">${s.label}</div>
                <div class="journey-subtext">${s.desc}</div>
                <div class="text-xs text-muted" style="font-size:0.625rem;">${s.time}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: CITIZEN ABHA PORTAL (Stitch Screen 2431b0db)
     ========================================================================== */
  renderPatientPortal() {
    const c = this.citizenData;

    return `
      <div class="patient-portal-layout">
        <!-- Citizen Verified Profile Card -->
        <div class="citizen-profile-card">
          <div class="flex items-center gap-md">
            <div class="citizen-avatar-wrap">
              RP
              <div class="citizen-avatar-verified">
                <span class="material-symbols-outlined text-[14px]">verified</span>
              </div>
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-xs" style="margin-bottom:4px;">
                <h1 style="font-size:1.5rem; font-weight:700; color:var(--color-primary);">${c.name}</h1>
                <span class="badge-role badge-role-patient">${c.age} Y • ${c.gender}</span>
                <span class="abdm-badge">
                  <span class="material-symbols-outlined text-[14px]">health_and_safety</span> ${c.statusBadge}
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-md text-xs text-muted">
                <span class="flex items-center gap-xs">
                  ABHA ID: <strong class="numeric-id text-primary">${c.abhaId}</strong>
                  <button class="btn btn-ghost btn-sm" style="min-height:24px; padding:0 4px;" onclick="app.copyAbhaId('${c.abhaId}')" title="Copy ABHA ID">
                    <span class="material-symbols-outlined text-[16px] text-secondary">content_copy</span>
                  </button>
                </span>
                <span class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[15px] text-secondary">alternate_email</span> ${c.abhaAddress}
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-md text-xs" style="margin-top:6px;">
                <span class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[16px] text-primary">volunteer_activism</span>
                  <strong>ASHA Cadre:</strong> ${c.assignedAsha}
                </span>
                <span class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[16px] text-secondary">local_hospital</span>
                  <strong>Linkage PHC:</strong> ${c.linkagePhc}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-sm">
            <button class="btn btn-primary btn-sm" onclick="app.openAbhaModal()">
              <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span data-i18n="btn_download_qr">Download ABHA Card (QR)</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="app.requestPatientSync()">
              <span class="material-symbols-outlined text-[18px]">sync</span>
              <span data-i18n="btn_request_sync">Request Record Sync</span>
            </button>
          </div>
        </div>

        <!-- Active Continuum Phase Card (Stage 6 Active) -->
        <div class="card">
          <div class="flex flex-wrap items-center justify-between gap-sm">
            <div class="flex items-center gap-sm">
              <span class="sync-dot-live" style="width:12px; height:12px;"></span>
              <div>
                <span class="text-xs font-bold text-secondary uppercase tracking-wider" data-i18n="active_continuum">Active Continuum Phase</span>
                <h3 style="font-size:1.125rem; font-weight:700; color:var(--color-primary);">${c.activePhase}</h3>
              </div>
            </div>
            <div class="tag-capability" style="font-size:0.8125rem; padding:4px 10px;">
              <span class="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Protocol Compliance: ${c.protocolCompliance}</span>
            </div>
          </div>

          <!-- Continuum Progress Mini Bar -->
          <div class="continuum-progress-bar">
            <div class="continuum-grid">
              <div class="continuum-node is-done"><span>✓ 1. Sxn Triage</span></div>
              <div class="continuum-node is-done"><span>✓ 2. ANM Lab</span></div>
              <div class="continuum-node is-done"><span>✓ 3. PHC Visit</span></div>
              <div class="continuum-node is-done"><span>✓ 4. ECG Rx</span></div>
              <div class="continuum-node is-done"><span>✓ 5. Med Issuance</span></div>
              <div class="continuum-node is-active"><span>● 6. Home Protocol</span></div>
            </div>
          </div>
        </div>

        <!-- 4 Citizen Quick Action Tiles -->
        <div class="citizen-action-grid">
          <div class="citizen-action-tile" onclick="app.requestJanAushadhiRefill()">
            <div class="flex items-center gap-md">
              <div class="citizen-action-icon" style="background:#DCFCE7; color:#166534;">
                <span class="material-symbols-outlined text-[24px]">local_pharmacy</span>
              </div>
              <div>
                <strong data-i18n="jan_aushadhi_title">Jan Aushadhi Refill</strong>
                <p class="text-xs text-muted" data-i18n="jan_aushadhi_desc">Shirur Hub • Free Subsidized</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
          </div>

          <div class="citizen-action-tile" onclick="app.notifyAsha()">
            <div class="flex items-center gap-md">
              <div class="citizen-action-icon" style="background:#E0F2FE; color:#0369A1;">
                <span class="material-symbols-outlined text-[24px]">calendar_add_on</span>
              </div>
              <div>
                <strong data-i18n="notify_asha_title">Notify ASHA Sunita</strong>
                <p class="text-xs text-muted" data-i18n="notify_asha_desc">Request early visit or call</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
          </div>

          <div class="citizen-action-tile" onclick="app.navigateTo('timeline')">
            <div class="flex items-center gap-md">
              <div class="citizen-action-icon" style="background:#EDE9FE; color:#6B21A8;">
                <span class="material-symbols-outlined text-[24px]">folder_shared</span>
              </div>
              <div>
                <strong>Health Records Locker</strong>
                <p class="text-xs text-muted">ABDM Verified Timeline</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
          </div>

          <div class="citizen-action-tile" onclick="app.showToast('Connecting to Tele-MANAS Helpline 14416 (Toll-Free 24x7)...', 'info')">
            <div class="flex items-center gap-md">
              <div class="citizen-action-icon" style="background:#FEF3C7; color:#92400E;">
                <span class="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <strong data-i18n="tele_manas_title">Tele-MANAS & Support</strong>
                <p class="text-xs text-muted" data-i18n="tele_manas_desc">14416 (Toll-Free Helpline)</p>
              </div>
            </div>
            <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
          </div>
        </div>

        <!-- Bento Split: Active Prescriptions Locker (8 cols) & Upcoming Appointments / Consent (4 cols) -->
        <div class="citizen-bento-grid">
          <!-- Active Prescriptions Locker -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title" data-i18n="nav_prescriptions">Prescriptions & Active Medicines</h3>
                <p class="text-xs text-muted">Dispensed by Shirur PHC & Jan Aushadhi Kendra</p>
              </div>
              <span class="tag-capability">3 Active Prescriptions</span>
            </div>

            <table class="prescription-list-table">
              <thead>
                <tr>
                  <th>Medicine & Dosage</th>
                  <th>Duration</th>
                  <th>Scheme / Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${c.prescriptions.map(p => `
                  <tr>
                    <td>
                      <strong>${p.medicine}</strong><br>
                      <span class="text-xs text-muted">${p.dosage}</span>
                    </td>
                    <td><span class="text-xs">${p.duration}</span></td>
                    <td>
                      <span class="jan-aushadhi-badge">${p.source}</span>
                    </td>
                    <td>
                      <span class="text-xs font-bold text-primary">${p.status}</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Upcoming Appointments & ABDM Consent -->
          <div style="display:flex; flex-direction:column; gap:var(--space-md);">
            <!-- Upcoming Schedule -->
            <div class="card">
              <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
                <h4 style="font-size:0.9375rem; font-weight:700;">Upcoming Care Schedule</h4>
                <span class="text-xs text-muted">Next 7 Days</span>
              </div>

              <div style="display:flex; flex-direction:column; gap:8px;">
                ${c.upcomingAppointments.map(a => `
                  <div style="padding:10px; background:var(--surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-structural);">
                    <div class="flex items-center justify-between text-xs text-muted">
                      <span>${a.date}</span>
                      <span class="tag-capability" style="font-size:0.6875rem; padding:2px 6px;">${a.type}</span>
                    </div>
                    <strong style="font-size:0.875rem; margin-top:2px; display:block;">${a.title}</strong>
                    <span class="text-xs text-muted">${a.location}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- ABDM Consent -->
            <div class="card">
              <div class="flex items-center justify-between" style="margin-bottom:var(--space-xs);">
                <h4 style="font-size:0.9375rem; font-weight:700;">ABDM Consent Management</h4>
                <span class="abdm-badge">Active</span>
              </div>
              <p class="text-xs text-muted" style="margin-bottom:var(--space-sm);">Federated citizen consent granted to Shirur PHC cluster under ABDM M1-M3 framework.</p>
              <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="app.showToast('ABDM Consent Audit Trail: 2 active provider links verified.', 'info')">
                <span class="material-symbols-outlined text-[16px]">shield_person</span>
                <span>Manage Linked Health Records</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: PATIENT REGISTRATION & VITALS WIZARD
     ========================================================================== */
  renderRegistrationWizard() {
    return `
      <div class="form-step-wizard">
        <div class="wizard-header">
          <div>
            <h2 style="font-size:1.25rem;">Frontline Patient Registration & Clinical Intake</h2>
            <p class="text-xs text-muted">Offline-capable digital registry with automatic ABHA number formatting</p>
          </div>
          <div class="wizard-step-pills">
            <span class="wizard-pill ${this.wizardStep === 1 ? 'is-active' : ''}">1. Demographics</span>
            <span class="wizard-pill ${this.wizardStep === 2 ? 'is-active' : ''}">2. Symptoms & Vitals</span>
            <span class="wizard-pill ${this.wizardStep === 3 ? 'is-active' : ''}">3. Triage & Match</span>
          </div>
        </div>

        <div class="wizard-body">
          ${this.wizardStep === 1 ? this.renderWizardStep1() : ''}
          ${this.wizardStep === 2 ? this.renderWizardStep2() : ''}
        </div>

        <div class="wizard-footer">
          <button class="btn btn-ghost" id="wizardBackBtn" ${this.wizardStep === 1 ? 'disabled' : ''}>
            ← Back
          </button>
          <button class="btn btn-primary" id="wizardNextBtn">
            ${this.wizardStep === 1 ? 'Continue to Vitals & Symptoms →' : 'Evaluate Clinical Triage →'}
          </button>
        </div>
      </div>
    `;
  }

  renderWizardStep1() {
    return `
      <div class="view-grid-2col">
        <div>
          <div class="form-group">
            <label class="form-label" data-i18n="form_fullname">Full Patient Name <span class="required-star">*</span></label>
            <input type="text" class="form-input" id="regName" value="${this.activePatient.name || ''}" placeholder="e.g. Ramesh Patil">
          </div>

          <div class="flex gap-base">
            <div class="form-group" style="flex:1;">
              <label class="form-label" data-i18n="form_age">Age (Years) <span class="required-star">*</span></label>
              <input type="number" class="form-input tabular-nums" id="regAge" value="${this.activePatient.age || ''}" placeholder="e.g. 62">
            </div>
            <div class="form-group" style="flex:1;">
              <label class="form-label" data-i18n="form_gender">Gender <span class="required-star">*</span></label>
              <select class="form-select" id="regGender">
                <option value="Male" ${this.activePatient.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Female" ${this.activePatient.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="form_village">Village / Sub-Centre Locality <span class="required-star">*</span></label>
            <select class="form-select" id="regVillage">
              ${SWASTHYA_DATA.villages.map(v => `
                <option value="${v}" ${this.activePatient.village && this.activePatient.village.includes(v.split(" ")[0]) ? 'selected' : ''}>${v}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <div>
          <div class="form-group">
            <label class="form-label" data-i18n="form_abha">ABHA Health ID (Ayushman Bharat)</label>
            <div class="input-with-addon">
              <span class="input-addon-prefix">ABHA</span>
              <input type="text" class="form-input numeric-id" id="regAbha" value="${this.activePatient.abhaId || ''}" placeholder="91-4029-1823-0192">
            </div>
            <span class="form-hint">National 14-digit longitudinal health identifier</span>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="form_phone">Contact Mobile Number</label>
            <input type="tel" class="form-input tabular-nums" id="regPhone" value="${this.activePatient.phone || ''}" placeholder="+91 98220 14920">
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

  renderWizardStep2() {
    return `
      <div>
        <h3 style="font-size:1.0625rem; margin-bottom:var(--space-xs);" data-i18n="vitals_title">Clinical Symptoms & Vitals</h3>
        <p class="text-xs text-muted" style="margin-bottom:var(--space-md);">Select all applicable symptoms reported during the frontline visit:</p>

        <!-- Symptoms Selection -->
        <div class="symptom-tag-grid" id="symptomPicker">
          ${SWASTHYA_DATA.symptomOptions.map(s => {
            const isSelected = this.activePatient.symptoms.some(ps => ps.toLowerCase().includes(s.id));
            return `
              <button type="button" class="symptom-tag-btn ${isSelected ? 'is-selected' : ''}" data-symptom-id="${s.id}">
                ${isSelected ? '✓ ' : '+ '}${s.label}
              </button>
            `;
          }).join("")}
        </div>

        <!-- Vitals Input Grid -->
        <div class="vitals-input-grid">
          <div class="vital-input-card ${this.activePatient.vitals.spo2 < 92 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label" data-i18n="vitals_spo2">SpO2 (%)</label>
              <span class="vital-status-tag ${this.activePatient.vitals.spo2 < 92 ? 'high' : 'normal'}">
                ${this.activePatient.vitals.spo2 < 92 ? 'Low (<92%)' : 'Normal'}
              </span>
            </div>
            <input type="number" class="form-input tabular-nums" id="inputSpo2" value="${this.activePatient.vitals.spo2 || 98}" min="60" max="100">
            <span class="text-xs text-muted">Pulse Oximeter</span>
          </div>

          <div class="vital-input-card ${this.activePatient.vitals.bpSys >= 140 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label" data-i18n="vitals_bp">Blood Pressure (Sys/Dia)</label>
              <span class="vital-status-tag ${this.activePatient.vitals.bpSys >= 140 ? 'high' : 'normal'}">
                ${this.activePatient.vitals.bpSys >= 140 ? 'Elevated' : 'Normal'}
              </span>
            </div>
            <div class="flex gap-xs">
              <input type="number" class="form-input tabular-nums" id="inputBpSys" value="${this.activePatient.vitals.bpSys || 120}" placeholder="Sys">
              <span style="align-self:center; font-weight:700;">/</span>
              <input type="number" class="form-input tabular-nums" id="inputBpDia" value="${this.activePatient.vitals.bpDia || 80}" placeholder="Dia">
            </div>
            <span class="text-xs text-muted">mmHg</span>
          </div>

          <div class="vital-input-card ${this.activePatient.vitals.pulse > 100 ? 'is-abnormal' : ''}">
            <div class="vital-label-row">
              <label class="form-label" data-i18n="vitals_pulse">Pulse Rate (bpm)</label>
              <span class="vital-status-tag ${this.activePatient.vitals.pulse > 100 ? 'high' : 'normal'}">
                ${this.activePatient.vitals.pulse > 100 ? 'High' : 'Normal'}
              </span>
            </div>
            <input type="number" class="form-input tabular-nums" id="inputPulse" value="${this.activePatient.vitals.pulse || 72}">
            <span class="text-xs text-muted">Beats per min</span>
          </div>

          <div class="vital-input-card">
            <div class="vital-label-row">
              <label class="form-label" data-i18n="vitals_temp">Temperature (°F)</label>
              <span class="vital-status-tag normal">Clinical</span>
            </div>
            <input type="text" class="form-input tabular-nums" id="inputTemp" value="${this.activePatient.vitals.temp || '98.6'}">
            <span class="text-xs text-muted">Digital thermometer</span>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: TRIAGE EVALUATION VIEW
     ========================================================================== */
  renderTriageView() {
    const triageResult = TriageEngine.evaluateVitals(this.activePatient.vitals, this.activePatient.symptoms);

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Clinical Triage & Risk Evaluation</h1>
          <p>Frontline decision support for: <strong>${this.activePatient.name}</strong> (${this.activePatient.age}y / ${this.activePatient.gender})</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('registration')">Edit Vitals</button>
      </div>

      <!-- Triage Card with Color-Coded Left Border -->
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
            <h4 style="font-size:0.9375rem; margin-bottom:var(--space-sm);" data-i18n="triage_indicators_detected">Risk Indicators Detected</h4>
            <ul style="padding-left:20px; font-size:0.875rem; line-height:1.5; color:var(--color-neutral);">
              ${triageResult.indicators.map(ind => `<li><strong>${ind}</strong></li>`).join("")}
            </ul>
          </div>

          <div>
            <h4 style="font-size:0.9375rem; margin-bottom:var(--space-sm);" data-i18n="triage_recommended_action">Recommended Continuity Action</h4>
            <div class="alert alert-warning" style="font-size:0.875rem;">
              ${triageResult.recommendedAction}
            </div>
          </div>
        </div>

        <!-- Mandatory Civic Medical Disclaimer -->
        <div class="clinical-disclaimer">
          <span class="material-symbols-outlined text-primary text-[20px]">policy</span>
          <span data-i18n="triage_disclaimer">${triageResult.disclaimer}</span>
        </div>
      </div>

      <!-- Action Panel: Move to Facility Match -->
      <div class="card flex items-center justify-between">
        <div>
          <h4>Ready for Inter-Facility Referral</h4>
          <p class="text-xs text-muted">Locate suitable public healthcare centers matching oxygen and emergency requirements.</p>
        </div>
        <button class="btn btn-primary" id="proceedToFacilityBtn">
          Find Matching Healthcare Facility →
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: FACILITY FINDER
     ========================================================================== */
  renderFacilitiesView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="nav_facilities">Public Healthcare Facility Finder</h1>
          <p>Sorted by distance and specialized clinical capabilities (Oxygen, Lab, ICU)</p>
        </div>
        <span class="badge-role badge-role-asha">Frontline Referral Mode</span>
      </div>

      <div class="facility-list">
        ${SWASTHYA_DATA.facilities.map(f => {
          const isSelected = this.selectedFacility && this.selectedFacility.id === f.id;
          return `
            <div class="facility-card ${isSelected ? 'is-selected' : ''}" data-facility-id="${f.id}">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="facility-name">${f.name}</h3>
                  <div class="facility-meta">
                    <span>${f.type}</span> • 
                    <span>Distance: <strong>${f.distance}</strong></span> • 
                    <span>MO: ${f.doctorInCharge}</span>
                  </div>
                </div>
                <span class="facility-status-pill ${f.statusClass}">
                  ● ${f.availability} (${f.bedCapacity})
                </span>
              </div>

              <div>
                <span class="text-xs text-muted" style="margin-bottom:4px; display:block;">Operational Capabilities:</span>
                <div class="capability-tags">
                  ${f.capabilities.map(c => `
                    <span class="tag-capability ${c.active ? '' : 'is-unavailable'}">
                      ${c.active ? '✓' : '✗'} ${c.name}
                    </span>
                  `).join("")}
                </div>
              </div>

              <div class="flex items-center justify-between" style="margin-top:var(--space-xs); padding-top:var(--space-sm); border-top:1px solid var(--surface-subtle);">
                <span class="text-xs text-muted">Emergency Dispatch: <strong>${f.contact}</strong></span>
                <button class="btn ${isSelected ? 'btn-primary' : 'btn-secondary'} btn-sm select-facility-btn" data-facility-id="${f.id}">
                  ${isSelected ? '✓ Facility Selected' : 'Select Facility for Referral'}
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="card flex items-center justify-between" style="margin-top:var(--space-xl);">
        <div>
          <h4>Generate Digital Referral Token</h4>
          <p class="text-xs text-muted">Selected Destination: <strong>${this.selectedFacility ? this.selectedFacility.name : 'None'}</strong></p>
        </div>
        <button class="btn btn-referral btn-lg" id="generateReferralBtn">
          Confirm & Issue Referral Token →
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: REFERRAL TRACKER & TIMELINE
     ========================================================================== */
  renderReferralsView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="nav_referrals">Referral Tracking & Inter-Facility Transfer</h1>
          <p>Real-time chain of custody from Sub-Centre to Primary Health Centre & District Hospital</p>
        </div>
        <span class="risk-chip risk-high">HIGH RISK ESCALATION</span>
      </div>

      <!-- Referral Packet Card -->
      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="card-header">
          <div>
            <span class="badge-role badge-role-anm">Active Transfer Token: REF-2026-SHIRUR-0982</span>
            <h2 style="font-size:1.25rem; margin-top:4px;">${this.activePatient.name} (Age: 62)</h2>
          </div>
          <span class="sync-status-pill is-online">● State Network Synced</span>
        </div>

        <!-- Signature Journey Stepper (Referral Stage Active) -->
        ${this.renderJourneyStepper(5)}

        <div class="view-grid-2col" style="margin-top:var(--space-lg); background-color:var(--surface-subtle); padding:var(--space-md); border-radius:var(--radius-md);">
          <div>
            <h4 class="text-sm text-muted">Referring Cadre</h4>
            <p><strong>Sunita More (ASHA)</strong><br><span class="text-xs text-muted">Talwade Sub-Centre</span></p>
            <div style="margin-top:var(--space-sm);">
              <h4 class="text-sm text-muted">Reason for Referral</h4>
              <p class="text-sm text-bold" style="color:var(--risk-high-fg);">Hypoxia (SpO2 92%) + Hypertension (160/98 mmHg)</p>
            </div>
          </div>
          <div>
            <h4 class="text-sm text-muted">Destination Medical Facility</h4>
            <p><strong>${this.selectedFacility ? this.selectedFacility.name : 'Shirur Primary Health Centre'}</strong><br><span class="text-xs text-muted">In-Charge: Dr. A. Kulkarni</span></p>
            <div style="margin-top:var(--space-sm);">
              <h4 class="text-sm text-muted">Patient Transit Status</h4>
              <p class="text-sm"><strong>En route via 108 Ambulance (ETA: 10 Mins)</strong></p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between" style="margin-top:var(--space-lg);">
          <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('timeline')">
            View Longitudinal Record (ABHA)
          </button>
          <button class="btn btn-primary btn-sm" onclick="app.simulateDoctorConsult()">
            Simulate Doctor Reception at PHC →
          </button>
        </div>
      </div>
    `;
  }

  renderTimelineView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Longitudinal Patient Health Record</h1>
          <p>ABHA ID: <span class="numeric-id">91-4029-1823-0192</span> • <strong>${this.activePatient.name}</strong></p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('dashboard')">Back to Dashboard</button>
      </div>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="health-timeline">
          ${this.activePatient.timeline.map(entry => `
            <div class="timeline-entry ${entry.role === 'Doctor' ? 'is-doctor' : ''}">
              <div class="timeline-bullet"></div>
              <div class="timeline-content">
                <div class="flex items-center justify-between" style="margin-bottom:4px;">
                  <span class="timeline-date">${entry.date}</span>
                  <span class="badge-role ${entry.badge}">${entry.role}</span>
                </div>
                <h4>${entry.stage}</h4>
                <p class="text-xs text-muted" style="margin-bottom:6px;">Provider: ${entry.provider}</p>
                <p class="text-sm">${entry.notes}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  renderPatientsListView() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="nav_patients">Village Health Registry</h1>
          <p>Talwade, Pabal & Shirur Cluster Population Records</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.navigateTo('registration')">
          + Register New Patient
        </button>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>ABHA Health ID</th>
                <th>Risk Status</th>
                <th>Last Vitals</th>
                <th>Assigned Village</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.registeredPatients.map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.age}y / ${p.gender}</td>
                  <td><span class="abha-badge">${p.abhaId}</span></td>
                  <td><span class="risk-chip ${p.riskClass}">${p.riskLevel}</span></td>
                  <td><span class="text-xs">SpO2: ${p.spo2} • BP: ${p.bp}</span></td>
                  <td>${p.village}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="app.inspectPatient('${p.id}')">View Journey</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     RENDERERS: DOCTOR & ADMIN DASHBOARDS (Stitch Screen 0752cfe5)
     ========================================================================== */
  renderDoctorDashboard() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Medical Officer Clinical Station</h1>
          <p>Shirur Primary Health Centre (PHC) • Dr. A. Kulkarni, MBBS</p>
        </div>
        <span class="badge-role badge-role-doctor">PHC Consultation Mode</span>
      </div>

      <div class="doctor-consult-layout">
        <!-- Patient Queue -->
        <div class="view-sidebar-pane">
          <h3 style="font-size:1rem; margin-bottom:var(--space-sm);">Tele-Triage Queue</h3>
          <div class="patient-queue-list">
            ${SWASTHYA_DATA.doctorQueue.map((p, idx) => `
              <div class="queue-patient-item ${idx === 0 ? 'is-selected' : ''}">
                <div class="flex items-center justify-between">
                  <strong>${p.name}</strong>
                  <span class="risk-chip ${p.riskClass}" style="font-size:0.6875rem;">${p.riskLevel}</span>
                </div>
                <p class="text-xs text-muted">${p.age}y / ${p.gender} • ${p.village}</p>
                <p class="text-xs text-bold" style="color:var(--color-secondary); margin-top:4px;">${p.referralReason}</p>
                <span class="text-xs text-muted" style="margin-top:4px; display:block;">Referred by: ${p.referredBy}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Clinical Action Pane -->
        <div class="clinical-notes-box">
          <div class="flex items-center justify-between" style="margin-bottom:var(--space-md); padding-bottom:var(--space-sm); border-bottom:1px solid var(--border-structural);">
            <div>
              <span class="badge-role badge-role-asha">Incoming Frontline Transfer</span>
              <h2 style="font-size:1.375rem; margin-top:2px;">Ramesh Patil (62y M)</h2>
              <span class="text-xs text-muted">ABHA: <span class="numeric-id">91-4029-1823-0192</span></span>
            </div>
            <span class="risk-chip risk-high">HIGH RISK</span>
          </div>

          <!-- Doctor View Journey Stepper (Doctor Consult Active) -->
          ${this.renderJourneyStepper(6)}

          <div class="alert alert-warning" style="margin:var(--space-md) 0;">
            <strong>Frontline Vitals at Home:</strong> SpO2: 92% (Hypoxic), BP: 160/98 mmHg, Pulse: 104 bpm, Temp: 101.4°F.<br>
            <em>Assessment: Acute exacerbation of COPD / Suspected lower respiratory tract infection.</em>
          </div>

          <div class="form-group">
            <label class="form-label">Doctor's Clinical Action & Tele-Prescription</label>
            <textarea class="form-textarea" id="docNotes" placeholder="Enter clinical orders...">High-flow O2 initiated at 4 L/min in Oxygen Bay #4. Nebulization with Salbutamol 2.5mg given. Re-evaluating SpO2 in 30 mins. ASHA Sunita More notified for post-discharge home monitoring.</textarea>
          </div>

          <div class="flex items-center justify-between" style="margin-top:var(--space-lg);">
            <button class="btn btn-secondary" onclick="app.setRole('ASHA')">
              ← Switch back to ASHA Cadre
            </button>
            <button class="btn btn-primary" id="confirmConsultBtn">
              Save Clinical Note & Schedule ASHA Follow-up
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderAdminDashboard() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>District Healthcare Administration Overview</h1>
          <p>Pune District Public Health Surveillance Network • Shirur & Junnar Clusters</p>
        </div>
        <span class="badge-role badge-role-admin">Admin Portal</span>
      </div>

      <div class="metrics-grid">
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Total Population Registered</span>
            <div class="metric-tile-icon is-green"><span class="material-symbols-outlined text-[18px]">groups</span></div>
          </div>
          <div class="metric-tile-value">1,248</div>
          <div class="metric-tile-footer text-muted">Across 24 Sub-Centres</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">High-Risk Escalations</span>
            <div class="metric-tile-icon is-orange"><span class="material-symbols-outlined text-[18px]">warning</span></div>
          </div>
          <div class="metric-tile-value text-bold" style="color:var(--risk-high-fg);">7</div>
          <div class="metric-tile-footer" style="color:var(--risk-high-fg);">All linked to PHC Oxygen beds</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Active Transfer Referrals</span>
            <div class="metric-tile-icon is-blue"><span class="material-symbols-outlined text-[18px]">swap_horiz</span></div>
          </div>
          <div class="metric-tile-value">12</div>
          <div class="metric-tile-footer text-muted">Average transit time: 14 mins</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Offline-to-Cloud Sync Rate</span>
            <div class="metric-tile-icon is-green"><span class="material-symbols-outlined text-[18px]">cloud_done</span></div>
          </div>
          <div class="metric-tile-value">99.4%</div>
          <div class="metric-tile-footer text-muted">Zero record loss</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Facility Readiness & Oxygen Capacity</h3>
          <span class="badge-role badge-role-admin">District Civil Network</span>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Type</th>
                <th>Staffing Status</th>
                <th>Oxygen Concentrators</th>
                <th>Available Beds</th>
                <th>Referral Load</th>
              </tr>
            </thead>
            <tbody>
              ${SWASTHYA_DATA.facilities.map(f => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.type}</td>
                  <td>MO On Duty: ${f.doctorInCharge}</td>
                  <td><span class="tag-capability">✓ Active</span></td>
                  <td><strong>${f.bedCapacity}</strong></td>
                  <td><span class="facility-status-pill ${f.statusClass}">${f.availability}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     EVENT BINDINGS & DEMO RUNNERS
     ========================================================================== */
  bindDashboardEvents() {
    const quickRegBtn = document.getElementById("quickRegisterBtn");
    if (quickRegBtn) {
      quickRegBtn.addEventListener("click", () => {
        this.activePatient = {
          id: "pat_" + Date.now(),
          name: "",
          age: "",
          gender: "Male",
          village: "Talwade (Sector 4)",
          abhaId: "91-" + Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000) + "-4021",
          phone: "+91 9",
          symptoms: [],
          vitals: { spo2: 98, bpSys: 120, bpDia: 80, pulse: 72, temp: "98.6" },
          timeline: []
        };
        this.wizardStep = 1;
        this.navigateTo("registration");
      });
    }
  }

  bindWizardEvents() {
    const nextBtn = document.getElementById("wizardNextBtn");
    const backBtn = document.getElementById("wizardBackBtn");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.wizardStep === 1) {
          const nameInput = document.getElementById("regName");
          const ageInput = document.getElementById("regAge");
          if (!nameInput.value.trim()) {
            this.showToast("Please enter the patient's full name", "warning");
            return;
          }
          this.activePatient.name = nameInput.value.trim();
          this.activePatient.age = ageInput.value.trim() || 40;
          this.activePatient.gender = document.getElementById("regGender").value;
          this.activePatient.village = document.getElementById("regVillage").value;
          this.activePatient.abhaId = document.getElementById("regAbha").value;
          this.activePatient.phone = document.getElementById("regPhone").value;

          this.wizardStep = 2;
          this.renderCurrentView();
        } else if (this.wizardStep === 2) {
          this.activePatient.vitals.spo2 = parseFloat(document.getElementById("inputSpo2").value) || 98;
          this.activePatient.vitals.bpSys = parseFloat(document.getElementById("inputBpSys").value) || 120;
          this.activePatient.vitals.bpDia = parseFloat(document.getElementById("inputBpDia").value) || 80;
          this.activePatient.vitals.pulse = parseFloat(document.getElementById("inputPulse").value) || 72;
          this.activePatient.vitals.temp = document.getElementById("inputTemp").value || "98.6";

          window.offlineStore.saveRecord("patient_assessment", this.activePatient);
          this.navigateTo("triage");
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        if (this.wizardStep > 1) {
          this.wizardStep--;
          this.renderCurrentView();
        }
      });
    }

    document.querySelectorAll(".symptom-tag-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const symptomId = e.currentTarget.getAttribute("data-symptom-id");
        const idx = this.activePatient.symptoms.indexOf(symptomId);
        if (idx > -1) {
          this.activePatient.symptoms.splice(idx, 1);
        } else {
          this.activePatient.symptoms.push(symptomId);
        }
        this.renderCurrentView();
      });
    });
  }

  bindTriageEvents() {
    const proceedBtn = document.getElementById("proceedToFacilityBtn");
    if (proceedBtn) {
      proceedBtn.addEventListener("click", () => this.navigateTo("facilities"));
    }
  }

  bindFacilityEvents() {
    document.querySelectorAll(".select-facility-btn, .facility-card").forEach(el => {
      el.addEventListener("click", e => {
        const facId = e.currentTarget.getAttribute("data-facility-id");
        const fac = SWASTHYA_DATA.facilities.find(f => f.id === facId);
        if (fac) {
          this.selectedFacility = fac;
          this.renderCurrentView();
          this.showToast(`Selected: ${fac.name}`, "info");
        }
      });
    });

    const genRefBtn = document.getElementById("generateReferralBtn");
    if (genRefBtn) {
      genRefBtn.addEventListener("click", () => {
        window.offlineStore.saveRecord("facility_referral", {
          patient: this.activePatient,
          facility: this.selectedFacility
        });
        this.showToast("Referral Token Generated and Sent to PHC!", "success");
        this.navigateTo("referrals");
      });
    }
  }

  bindDoctorEvents() {
    const confirmBtn = document.getElementById("confirmConsultBtn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        this.showToast("Consultation saved & Follow-up assigned to ASHA Sunita More!", "success");
        setTimeout(() => {
          this.setRole("ASHA");
          this.navigateTo("timeline");
        }, 1200);
      });
    }
  }

  bindPatientPortalEvents() {
    // Specific patient actions handled via instance methods
  }

  copyAbhaId(id) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id).then(() => {
        this.showToast(`ABHA ID copied: ${id}`, "success");
      });
    } else {
      this.showToast(`ABHA ID: ${id}`, "info");
    }
  }

  openAbhaModal() {
    this.showToast("Downloading verified Ayushman Bharat (ABHA) QR Card PDF...", "success");
  }

  requestPatientSync() {
    this.showToast("Requesting record sync with ABDM National Health Grid...", "info");
    setTimeout(() => {
      this.showToast("Citizen health records synchronized with Shirur PHC!", "success");
    }, 1000);
  }

  requestJanAushadhiRefill() {
    this.showToast("Jan Aushadhi Subsidized Refill Requested for Amlodipine 5mg at Shirur Hub!", "success");
  }

  notifyAsha() {
    this.showToast("Direct notification sent to ASHA Sunita More for home follow-up visit!", "success");
  }

  triggerSyncSimulation() {
    window.offlineStore.triggerSync(count => {
      this.showToast(`Cloud Sync Complete • ${count} record(s) synchronized with State Health Portal`, "success");
    });
  }

  runDemoJourney() {
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.selectedFacility = SWASTHYA_DATA.facilities[0]; // Shirur PHC
    this.showToast("Loaded Patient File: Ramesh Patil (62y, High Risk)", "info");
    this.navigateTo("triage");
  }

  inspectPatient(patientId) {
    if (patientId === "pat-ramesh-patil") {
      this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    } else {
      const p = this.registeredPatients.find(item => item.id === patientId);
      if (p) {
        this.activePatient = {
          ...p,
          symptoms: ["Routine screening"],
          vitals: { spo2: 98, bpSys: 120, bpDia: 80, pulse: 72, temp: "98.6" },
          timeline: [
            {
              date: "3 Days Ago",
              stage: "Routine Screening Completed",
              provider: "Sunita More (ASHA)",
              badge: "badge-role-asha",
              role: "ASHA",
              notes: "All vitals stable. Routine follow-up scheduled."
            }
          ]
        };
      }
    }
    this.navigateTo("timeline");
  }

  showToast(message, type = "info") {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #003021;
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.2s, opacity 0.2s;
      `;
      document.body.appendChild(toast);
    }

    let iconName = "info";
    let colorDot = "#34D399";
    if (type === "warning") {
      colorDot = "#FBBF24";
      iconName = "warning";
    }
    if (type === "emergency" || type === "error" || type === "danger") {
      colorDot = "#F87171";
      iconName = "error";
    }
    if (type === "success") {
      colorDot = "#34D399";
      iconName = "check_circle";
    }

    toast.innerHTML = `<span class="material-symbols-outlined text-[18px]" style="color:${colorDot};">${iconName}</span> ${message}`;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 3500);
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new SwasthyaApp();
});
