/**
 * SwasthyaSetu Application Core Controller
 * Handles Multi-Role Workflows (ASHA, Doctor, Admin), 1-Click Demo Journey, and Dynamic Views
 */

class SwasthyaApp {
  constructor() {
    this.currentRole = localStorage.getItem("swasthya_role") || "ASHA";
    this.currentView = "dashboard";
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.selectedFacility = SWASTHYA_DATA.facilities[0];
    this.registeredPatients = [...SWASTHYA_DATA.recentPatients];
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
    // Role switcher in header
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
        this.showToast("Connected to State Public Health Network (Cloud Active)", "info");
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

    // Update user display
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
      if (userNameEl) userNameEl.textContent = "Dr. Anjali Deshmukh";
      if (userRoleEl) userRoleEl.textContent = "Medical Officer (PHC Khed)";
      if (userAvatarEl) userAvatarEl.textContent = "AD";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-doctor";
        userBadgeEl.textContent = "Doctor";
      }
    } else if (role === "ADMIN") {
      if (userNameEl) userNameEl.textContent = "Dr. S. K. Patil";
      if (userRoleEl) userRoleEl.textContent = "District Health Officer (Pune)";
      if (userAvatarEl) userAvatarEl.textContent = "SP";
      if (userBadgeEl) {
        userBadgeEl.className = "badge-role badge-role-admin";
        userBadgeEl.textContent = "Admin";
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
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span data-i18n="nav_dashboard">Dashboard</span>
        </a>
        <a href="#" class="nav-item" data-view="registration">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          <span data-i18n="dash_quick_register">Register Patient</span>
        </a>
        <a href="#" class="nav-item" data-view="patients">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <span data-i18n="nav_patients">Village Patients</span>
          <span class="nav-badge-count">24</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          <span data-i18n="nav_facilities">Facility Finder</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          <span data-i18n="nav_referrals">Referrals</span>
          <span class="nav-badge-count" style="background:var(--risk-high-bg); color:var(--risk-high-fg);">2</span>
        </a>
        <a href="#" class="nav-item" data-view="timeline">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span data-i18n="nav_records">Health Timeline</span>
        </a>
      `;
    } else if (role === "DOCTOR") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          <span>Clinical Queue</span>
          <span class="nav-badge-count" style="background:var(--risk-emergency-bg); color:var(--risk-emergency-fg);">2 Urgent</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          <span>Referral Inbox</span>
        </a>
        <a href="#" class="nav-item" data-view="timeline">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <span>ABHA Longitudinal Record</span>
        </a>
      `;
    } else if (role === "ADMIN") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <span>District Analytics</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
          <span>Facility Capacity</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <svg class="nav-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          <span>Transfer Logistics</span>
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

    if (this.currentRole === "DOCTOR") {
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
     RENDERERS: ASHA DASHBOARD & JOURNEY
     ========================================================================== */
  renderAshaDashboard() {
    return `
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-title-group">
          <h1>Frontline Operational Hub</h1>
          <p>Ambegaon Sub-Centre Area • Assigned Cadre: Sunita More (ASHA ID: MH-PUN-0841)</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-secondary btn-sm" id="quickRegisterBtn">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span data-i18n="dash_quick_register">Register Patient</span>
          </button>
        </div>
      </div>

      <!-- Operational Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_handled_today">Patients Handled Today</span>
            <div class="metric-tile-icon is-green">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
          </div>
          <div class="metric-tile-value">14</div>
          <div class="metric-tile-footer text-muted">✓ 100% Home visits completed</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_high_risk">High-Risk Cases</span>
            <div class="metric-tile-icon is-orange">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
          </div>
          <div class="metric-tile-value text-bold" style="color:var(--risk-high-fg);">2</div>
          <div class="metric-tile-footer" style="color:var(--risk-high-fg);">Immediate clinical attention required</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_pending_referrals">Active Referrals</span>
            <div class="metric-tile-icon is-blue">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            </div>
          </div>
          <div class="metric-tile-value">2</div>
          <div class="metric-tile-footer text-muted">1 at PHC Khed • 1 En route District Hosp</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="dash_followups_due">Follow-ups Due</span>
            <div class="metric-tile-icon is-amber">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
          </div>
          <div class="metric-tile-value">3</div>
          <div class="metric-tile-footer text-muted">2 Post-natal • 1 Hypertension</div>
        </div>
      </div>

      <!-- Signature Reusable Patient Journey Component Showcase -->
      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="card-header">
          <div>
            <h3 class="card-title">Active Continuity Pathway: Ramesh Patil</h3>
            <p class="text-sm text-muted">ABHA: <span class="numeric-id">91-4820-1928-3341</span> • Age: 62 M • Ambegaon</p>
          </div>
          <span class="risk-chip risk-high">HIGH RISK</span>
        </div>
        
        <!-- Journey Stepper -->
        ${this.renderJourneyStepper(4)}

        <div class="flex items-center justify-between" style="margin-top:var(--space-md); padding-top:var(--space-md); border-top:1px solid var(--surface-subtle);">
          <div class="text-sm">
            <span class="text-muted">Current System Status:</span> 
            <strong>Referral Packet Dispatched to PHC Khed (Oxygen Bay Ready)</strong>
          </div>
          <button class="btn btn-referral btn-sm" id="viewActiveReferralBtn">
            Track Referral Status →
          </button>
        </div>
      </div>

      <!-- Recent Village Patients Queue -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title" data-i18n="dash_recent_patients">Recent Village Patients</h3>
          <span class="text-xs text-muted">Updated: Synced Live</span>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>ABHA Health ID</th>
                <th>Risk Classification</th>
                <th>Vitals Snapshot</th>
                <th>Continuity Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.registeredPatients.map(p => `
                <tr>
                  <td>
                    <strong>${p.name}</strong><br>
                    <span class="text-xs text-muted">${p.age}y / ${p.gender} • ${p.village}</span>
                  </td>
                  <td><span class="abha-badge">${p.abhaId}</span></td>
                  <td><span class="risk-chip ${p.riskClass}">${p.riskLevel}</span></td>
                  <td>
                    <span class="text-xs">SpO2: <strong>${p.spo2}</strong> | BP: <strong>${p.bp}</strong></span>
                  </td>
                  <td><span class="text-xs text-bold">${p.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="app.inspectPatient('${p.id}')">Open File</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderJourneyStepper(activeStep = 4) {
    const steps = [
      { id: 1, label: "Home Survey (ASHA)", i18nKey: "step_patient" },
      { id: 2, label: "Vitals Assessment", i18nKey: "step_assessment" },
      { id: 3, label: "Triage Decision", i18nKey: "step_triage" },
      { id: 4, label: "Facility Match", i18nKey: "step_facility" },
      { id: 5, label: "Referral Issued", i18nKey: "step_referral" },
      { id: 6, label: "Doctor Consult", i18nKey: "step_doctor" },
      { id: 7, label: "Follow-up", i18nKey: "step_followup" }
    ];

    return `
      <div class="patient-journey-stepper">
        ${steps.map(s => {
          let stepClass = "";
          let iconContent = s.id;
          if (s.id < activeStep) {
            stepClass = "is-completed";
            iconContent = "✓";
          } else if (s.id === activeStep) {
            stepClass = "is-active";
            iconContent = "●";
          }
          return `
            <div class="journey-step ${stepClass}">
              <div class="journey-node">${iconContent}</div>
              <div class="journey-label" data-i18n="${s.i18nKey}">${s.label}</div>
            </div>
          `;
        }).join("")}
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
            <input type="text" class="form-input" id="regName" value="${this.activePatient.name || ''}" placeholder="e.g. Ramesh Tukaram Patil">
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
              <input type="text" class="form-input numeric-id" id="regAbha" value="${this.activePatient.abhaId || ''}" placeholder="91-4820-1928-3341">
            </div>
            <span class="form-hint">National 14-digit longitudinal health identifier</span>
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="form_phone">Contact Mobile Number</label>
            <input type="tel" class="form-input tabular-nums" id="regPhone" value="${this.activePatient.phone || ''}" placeholder="+91 98220 14920">
          </div>

          <div class="alert alert-info" style="margin-top:var(--space-md);">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
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
            <span class="badge-role badge-role-anm">Active Transfer Token: REF-2026-0918</span>
            <h2 style="font-size:1.25rem; margin-top:4px;">${this.activePatient.name} (Age: 62)</h2>
          </div>
          <span class="sync-status-pill is-online">● State Network Synced</span>
        </div>

        <!-- Signature Journey Stepper (Referral Stage Active) -->
        ${this.renderJourneyStepper(5)}

        <div class="view-grid-2col" style="margin-top:var(--space-lg); background-color:var(--surface-subtle); padding:var(--space-md); border-radius:var(--radius-md);">
          <div>
            <h4 class="text-sm text-muted">Referring Cadre</h4>
            <p><strong>Sunita More (ASHA)</strong><br><span class="text-xs text-muted">Ambegaon Sub-Centre</span></p>
            <div style="margin-top:var(--space-sm);">
              <h4 class="text-sm text-muted">Reason for Referral</h4>
              <p class="text-sm text-bold" style="color:var(--risk-high-fg);">Hypoxia (SpO2 89%) + Hypertension (158/96)</p>
            </div>
          </div>
          <div>
            <h4 class="text-sm text-muted">Destination Medical Facility</h4>
            <p><strong>${this.selectedFacility ? this.selectedFacility.name : 'Primary Health Centre Khed'}</strong><br><span class="text-xs text-muted">In-Charge: Dr. Anjali Deshmukh</span></p>
            <div style="margin-top:var(--space-sm);">
              <h4 class="text-sm text-muted">Patient Transit Status</h4>
              <p class="text-sm"><strong>En route via 108 Ambulance (ETA: 12 Mins)</strong></p>
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
          <p>ABHA ID: <span class="numeric-id">91-4820-1928-3341</span> • <strong>${this.activePatient.name}</strong></p>
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
          <p>Ambegaon & Wadgaon Sub-Centre Population Records</p>
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
     RENDERERS: DOCTOR & ADMIN DASHBOARDS
     ========================================================================== */
  renderDoctorDashboard() {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1>Medical Officer Clinical Station</h1>
          <p>Primary Health Centre (PHC) Khed • Dr. Anjali Deshmukh, MBBS</p>
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
              <h2 style="font-size:1.375rem; margin-top:2px;">Ramesh Tukaram Patil (62y M)</h2>
              <span class="text-xs text-muted">ABHA: <span class="numeric-id">91-4820-1928-3341</span></span>
            </div>
            <span class="risk-chip risk-high">HIGH RISK</span>
          </div>

          <!-- Doctor View Journey Stepper (Doctor Consult Active) -->
          ${this.renderJourneyStepper(6)}

          <div class="alert alert-warning" style="margin:var(--space-md) 0;">
            <strong>Frontline Vitals at Home:</strong> SpO2: 89% (Hypoxic), BP: 158/96 mmHg, Pulse: 104 bpm, Temp: 101.4°F.<br>
            <em>Assessment: Acute exacerbation of COPD / Suspected lower respiratory tract infection.</em>
          </div>

          <div class="form-group">
            <label class="form-label">Doctor's Clinical Action & Tele-Prescription</label>
            <textarea class="form-textarea" id="docNotes" placeholder="Enter clinical orders (e.g. High-flow nasal cannula oxygen at 4L/min, Nebulization with Salbutamol + Ipratropium, IV Ceftriaxone 1g)...">High-flow O2 initiated at 4 L/min. Nebulization with Salbutamol 2.5mg given. Re-evaluating SpO2 in 30 mins. ASHA to be notified for post-discharge home monitoring.</textarea>
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
          <p>Pune District Public Health Surveillance Network • All PHCs & Sub-Centres Active</p>
        </div>
        <span class="badge-role badge-role-admin">Admin Portal</span>
      </div>

      <div class="metrics-grid">
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Total Population Registered</span>
            <div class="metric-tile-icon is-green">★</div>
          </div>
          <div class="metric-tile-value">1,248</div>
          <div class="metric-tile-footer text-muted">Across 24 Sub-Centres</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">High-Risk Escalations</span>
            <div class="metric-tile-icon is-orange">!</div>
          </div>
          <div class="metric-tile-value text-bold" style="color:var(--risk-high-fg);">7</div>
          <div class="metric-tile-footer" style="color:var(--risk-high-fg);">All linked to PHC Oxygen beds</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Active Transfer Referrals</span>
            <div class="metric-tile-icon is-blue">→</div>
          </div>
          <div class="metric-tile-value">12</div>
          <div class="metric-tile-footer text-muted">Average transit time: 18 mins</div>
        </div>
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label">Offline-to-Cloud Sync Rate</span>
            <div class="metric-tile-icon is-green">✓</div>
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
     EVENT BINDINGS & DEMO RUNNER
     ========================================================================== */
  bindDashboardEvents() {
    const startDemoBtn = document.getElementById("startDemoJourneyBtn");
    if (startDemoBtn) {
      startDemoBtn.addEventListener("click", () => this.runDemoJourney());
    }

    const quickRegBtn = document.getElementById("quickRegisterBtn");
    if (quickRegBtn) {
      quickRegBtn.addEventListener("click", () => {
        this.activePatient = {
          id: "pat_" + Date.now(),
          name: "",
          age: "",
          gender: "Male",
          village: "Ambegaon (Sub-Centre Area)",
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

    const viewActiveRefBtn = document.getElementById("viewActiveReferralBtn");
    if (viewActiveRefBtn) {
      viewActiveRefBtn.addEventListener("click", () => this.navigateTo("referrals"));
    }
  }

  bindWizardEvents() {
    const nextBtn = document.getElementById("wizardNextBtn");
    const backBtn = document.getElementById("wizardBackBtn");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.wizardStep === 1) {
          // Validate & Save step 1
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
          // Read vitals
          this.activePatient.vitals.spo2 = parseFloat(document.getElementById("inputSpo2").value) || 98;
          this.activePatient.vitals.bpSys = parseFloat(document.getElementById("inputBpSys").value) || 120;
          this.activePatient.vitals.bpDia = parseFloat(document.getElementById("inputBpDia").value) || 80;
          this.activePatient.vitals.pulse = parseFloat(document.getElementById("inputPulse").value) || 72;
          this.activePatient.vitals.temp = document.getElementById("inputTemp").value || "98.6";

          // Save to local offline store
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

    // Symptom picker tags
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
        this.showToast("Consultation record saved & Follow-up assigned to ASHA Sunita More!", "success");
        setTimeout(() => {
          this.setRole("ASHA");
          this.navigateTo("timeline");
        }, 1200);
      });
    }
  }

  runDemoJourney() {
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.selectedFacility = SWASTHYA_DATA.facilities[0]; // PHC Khed
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
        background: #101E19;
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

    let colorDot = "#34D399";
    if (type === "warning") colorDot = "#FBBF24";
    if (type === "emergency" || type === "error") colorDot = "#F87171";

    toast.innerHTML = `<span style="width:8px; height:8px; border-radius:50%; background:${colorDot};"></span> ${message}`;
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
