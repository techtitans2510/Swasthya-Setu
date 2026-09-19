/**
 * SwasthyaSetu Application Core Controller
 * Orchestrates 4 Separate Roles: Patient (Citizen), ASHA Worker, Doctor (MO), Health Admin
 * Design Source of Truth: Stitch Project 11062066934146902009
 */

class SwasthyaApp {
  constructor() {
    this.currentRole = localStorage.getItem("swasthya_role") || "PATIENT";
    this.currentView = this.currentRole === "PATIENT" ? "home" : "dashboard";
    
    // In-memory application state
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.citizenData = JSON.parse(JSON.stringify(SWASTHYA_DATA.citizenUser));
    this.registeredPatients = [...SWASTHYA_DATA.recentPatients];
    this.selectedFacility = SWASTHYA_DATA.facilities[0];
    this.selectedDoctor = SWASTHYA_DATA.doctors[0];
    this.activeDoctorPatient = SWASTHYA_DATA.doctorQueue[0];
    this.activeDoctorCategory = "all";
    this.doctorSearchQuery = "";
    this.consultMode = "In-Person";
    this.selectedDate = "Tomorrow, 21 Sep 2026";
    this.selectedTime = "10:30 AM";
    this.wizardStep = 1;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setRole(this.currentRole);

    // Init offline listener
    if (window.offlineStore) {
      window.offlineStore.onStatusChange(state => {
        // Handled in offline store
      });
    }

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
        if (window.i18n) {
          window.i18n.setLanguage(e.target.value);
        }
        this.renderCurrentView();
      });
    }

    // Network Mode Segmented Toggle Buttons
    const btnOnline = document.getElementById("btnModeOnline");
    const btnOffline = document.getElementById("btnModeOffline");
    if (btnOnline) {
      btnOnline.addEventListener("click", () => {
        if (window.offlineStore) {
          window.offlineStore.setOnlineStatus(true);
          this.showToast("Connected to State Public Health Grid (Cloud Active)", "info");
        }
      });
    }
    if (btnOffline) {
      btnOffline.addEventListener("click", () => {
        if (window.offlineStore) {
          window.offlineStore.setOnlineStatus(false);
          this.showToast("Switched to Offline Field Mode (Encrypted Local Storage)", "warning");
        }
      });
    }

    // Header Actionable Sync Button
    const headerSyncBtn = document.getElementById("headerSyncBtn");
    if (headerSyncBtn) {
      headerSyncBtn.addEventListener("click", () => {
        if (window.offlineStore) {
          window.offlineStore.triggerSync(count => {
            this.showToast(`Cloud Sync Complete • ${count} record(s) synchronized with State Health Portal`, "success");
          });
        }
      });
    }

    // Ribbon Sync Button
    const syncRibbonBtn = document.getElementById("ribbonSyncBtn");
    if (syncRibbonBtn) {
      syncRibbonBtn.addEventListener("click", () => {
        if (window.offlineStore) {
          window.offlineStore.triggerSync(count => {
            this.showToast(`Successfully synced ${count} offline records with State Health Cloud!`, "success");
          });
        }
      });
    }
  }

  setRole(role) {
    this.currentRole = role;
    localStorage.setItem("swasthya_role", role);

    // Update active role buttons in header
    document.querySelectorAll(".role-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.getAttribute("data-role") === role);
    });

    // Update user display in sidebar
    const profile = SWASTHYA_DATA.roles[role] || SWASTHYA_DATA.roles.PATIENT;
    const userRoleEl = document.getElementById("currentUserRole");
    const userNameEl = document.getElementById("currentUserName");
    const userAvatarEl = document.getElementById("currentUserAvatar");
    const userBadgeEl = document.getElementById("currentUserBadge");

    if (userNameEl) userNameEl.textContent = profile.name;
    if (userRoleEl) userRoleEl.textContent = profile.roleTitle;
    if (userAvatarEl) userAvatarEl.textContent = profile.avatar;
    if (userBadgeEl) {
      userBadgeEl.className = `badge-role ${profile.badgeClass || 'badge-role-patient'}`;
      userBadgeEl.textContent = profile.badgeText || role;
    }

    // Update dynamic navigation for desktop & mobile
    this.updateSidebarNavForRole(role);
    this.updateMobileBottomNavForRole(role);
    this.updateSidebarFooterForRole(role);

    // Default starting view per role
    if (role === "AUTH") {
      this.navigateTo("login");
    } else if (role === "PATIENT") {
      this.navigateTo("home");
    } else if (role === "DOCTOR") {
      this.navigateTo("consultations");
    } else {
      this.navigateTo("dashboard");
    }
  }

  updateSidebarNavForRole(role) {
    const navContainer = document.getElementById("sidebarNav");
    if (!navContainer) return;

    let navHtml = "";
    if (role === "AUTH") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="login">
          <span class="material-symbols-outlined nav-item-icon">lock_person</span>
          <span>Unified Login Hub</span>
        </a>
        <a href="#" class="nav-item" onclick="app.selectCadre('PATIENT', '91-4029-1823-0192'); return false;">
          <span class="material-symbols-outlined nav-item-icon">person</span>
          <span>Citizen (ABHA)</span>
        </a>
        <a href="#" class="nav-item" onclick="app.selectCadre('ASHA', 'ASHA-2409'); return false;">
          <span class="material-symbols-outlined nav-item-icon">diversity_1</span>
          <span>ASHA Frontline</span>
        </a>
        <a href="#" class="nav-item" onclick="app.selectCadre('DOCTOR', 'MMC-2012-08-2940'); return false;">
          <span class="material-symbols-outlined nav-item-icon">stethoscope</span>
          <span>Doctor (MO)</span>
        </a>
        <a href="#" class="nav-item" onclick="app.selectCadre('ADMIN', 'admin.mohfw@gov.in'); return false;">
          <span class="material-symbols-outlined nav-item-icon">shield_person</span>
          <span>Health Admin</span>
        </a>
      `;
    } else if (role === "PATIENT") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="home">
          <span class="material-symbols-outlined nav-item-icon">home</span>
          <span data-i18n="nav_home">Home</span>
        </a>
        <a href="#" class="nav-item" data-view="find-doctor">
          <span class="material-symbols-outlined nav-item-icon">person_search</span>
          <span data-i18n="nav_find_doctor">Find Doctor</span>
        </a>
        <a href="#" class="nav-item" data-view="appointments">
          <span class="material-symbols-outlined nav-item-icon">event_available</span>
          <span data-i18n="nav_appointments">Appointments</span>
          <span class="nav-badge-count">2</span>
        </a>
        <a href="#" class="nav-item" data-view="prescriptions">
          <span class="material-symbols-outlined nav-item-icon">medication</span>
          <span data-i18n="nav_prescriptions">Prescriptions</span>
          <span class="nav-badge-count">4</span>
        </a>
        <a href="#" class="nav-item" data-view="medical-records">
          <span class="material-symbols-outlined nav-item-icon">description</span>
          <span data-i18n="nav_medical_records">Medical Records</span>
        </a>
        <a href="#" class="nav-item" data-view="notifications">
          <span class="material-symbols-outlined nav-item-icon">notifications</span>
          <span>Notifications</span>
          <span class="nav-badge-count" style="background:#EF4444; color:#FFFFFF;">2</span>
        </a>
        <a href="#" class="nav-item" data-view="profile">
          <span class="material-symbols-outlined nav-item-icon">badge</span>
          <span data-i18n="nav_profile_abha">Profile & ABHA</span>
        </a>
      `;
    } else if (role === "ASHA") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">grid_view</span>
          <span data-i18n="nav_dashboard">Dashboard</span>
        </a>
        <a href="#" class="nav-item" data-view="patients">
          <span class="material-symbols-outlined nav-item-icon">groups</span>
          <span data-i18n="nav_patients">My Patients</span>
          <span class="nav-badge-count">${this.registeredPatients.length}</span>
        </a>
        <a href="#" class="nav-item" data-view="registration">
          <span class="material-symbols-outlined nav-item-icon">how_to_reg</span>
          <span data-i18n="dash_quick_register">Register Patient</span>
        </a>
        <a href="#" class="nav-item" data-view="referrals">
          <span class="material-symbols-outlined nav-item-icon">sync_alt</span>
          <span>Referrals</span>
          <span class="nav-badge-count" style="background:var(--color-secondary); color:#FFFFFF;">4</span>
        </a>
        <a href="#" class="nav-item" data-view="followups">
          <span class="material-symbols-outlined nav-item-icon">assignment_turned_in</span>
          <span>Follow-ups</span>
          <span class="nav-badge-count" style="background:var(--risk-emergency-bg); color:var(--risk-emergency-fg);">6</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <span class="material-symbols-outlined nav-item-icon">local_hospital</span>
          <span data-i18n="nav_facilities">Facilities</span>
        </a>
        <a href="#" class="nav-item" data-view="tasks">
          <span class="material-symbols-outlined nav-item-icon">checklist</span>
          <span data-i18n="nav_tasks">Tasks</span>
          <span class="nav-badge-count" style="background:var(--risk-high-bg); color:var(--risk-high-fg);">3</span>
        </a>
        <a href="#" class="nav-item" data-view="notifications">
          <span class="material-symbols-outlined nav-item-icon">notifications</span>
          <span>Notifications</span>
          <span class="nav-badge-count" style="background:#EF4444; color:#FFFFFF;">3</span>
        </a>
        <a href="#" class="nav-item" data-view="profile">
          <span class="material-symbols-outlined nav-item-icon">badge</span>
          <span>Profile</span>
        </a>
      `;
    } else if (role === "DOCTOR") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="consultations">
          <span class="material-symbols-outlined nav-item-icon">stethoscope</span>
          <span data-i18n="nav_consultations">Clinical Station</span>
          <span class="nav-badge-count" style="background:var(--risk-emergency-bg); color:var(--risk-emergency-fg);">2 Urgent</span>
        </a>
        <a href="#" class="nav-item" data-view="appointments">
          <span class="material-symbols-outlined nav-item-icon">event_available</span>
          <span data-i18n="nav_opd_schedule">OPD Schedule</span>
        </a>
        <a href="#" class="nav-item" data-view="patients">
          <span class="material-symbols-outlined nav-item-icon">clinical_notes</span>
          <span data-i18n="nav_medical_records">Patient Records</span>
        </a>
        <a href="#" class="nav-item" data-view="availability">
          <span class="material-symbols-outlined nav-item-icon">event_seat</span>
          <span data-i18n="nav_availability">Duty & Availability</span>
        </a>
      `;
    } else if (role === "ADMIN") {
      navHtml = `
        <a href="#" class="nav-item is-active" data-view="dashboard">
          <span class="material-symbols-outlined nav-item-icon">analytics</span>
          <span data-i18n="nav_district_overview">District Overview</span>
        </a>
        <a href="#" class="nav-item" data-view="doctor-verification">
          <span class="material-symbols-outlined nav-item-icon">verified_user</span>
          <span data-i18n="nav_doctor_verification">Doctor Verification</span>
          <span class="nav-badge-count" style="background:var(--risk-moderate-bg); color:var(--risk-moderate-fg);">2</span>
        </a>
        <a href="#" class="nav-item" data-view="asha-management">
          <span class="material-symbols-outlined nav-item-icon">groups</span>
          <span data-i18n="nav_asha_management">ASHA Management</span>
        </a>
        <a href="#" class="nav-item" data-view="facilities">
          <span class="material-symbols-outlined nav-item-icon">local_hospital</span>
          <span data-i18n="nav_facility_capacity">Facility Capacity</span>
        </a>
      `;
    }

    navContainer.innerHTML = navHtml;

    // Bind click events on sidebar items
    navContainer.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        const view = e.currentTarget.getAttribute("data-view");
        if (view) this.navigateTo(view);
      });
    });
  }

  updateMobileBottomNavForRole(role) {
    const bottomNav = document.getElementById("mobileBottomNav");
    if (!bottomNav) return;

    let mobileHtml = "";
    if (role === "AUTH") {
      mobileHtml = `
        <a href="#" class="mobile-nav-link is-active" data-view="login">
          <span class="material-symbols-outlined mobile-nav-icon">lock_person</span>
          <span>Login</span>
        </a>
        <a href="#" class="mobile-nav-link" onclick="app.selectCadre('PATIENT', '91-4029-1823-0192'); return false;">
          <span class="material-symbols-outlined mobile-nav-icon">person</span>
          <span>Citizen</span>
        </a>
        <a href="#" class="mobile-nav-link" onclick="app.selectCadre('ASHA', 'ASHA-2409'); return false;">
          <span class="material-symbols-outlined mobile-nav-icon">diversity_1</span>
          <span>ASHA</span>
        </a>
        <a href="#" class="mobile-nav-link" onclick="app.selectCadre('DOCTOR', 'MMC-2012-08-2940'); return false;">
          <span class="material-symbols-outlined mobile-nav-icon">stethoscope</span>
          <span>Doctor</span>
        </a>
      `;
    } else if (role === "PATIENT") {
      mobileHtml = `
        <a href="#" class="mobile-nav-link is-active" data-view="home">
          <span class="material-symbols-outlined mobile-nav-icon">home</span>
          <span>Home</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="find-doctor">
          <span class="material-symbols-outlined mobile-nav-icon">search</span>
          <span>Find Doctor</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="appointments">
          <span class="material-symbols-outlined mobile-nav-icon">event</span>
          <span>Visits</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="prescriptions">
          <span class="material-symbols-outlined mobile-nav-icon">medication</span>
          <span>Medicines</span>
        </a>
      `;
    } else if (role === "ASHA") {
      mobileHtml = `
        <a href="#" class="mobile-nav-link is-active" data-view="dashboard">
          <span class="material-symbols-outlined mobile-nav-icon">grid_view</span>
          <span>Home</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="patients">
          <span class="material-symbols-outlined mobile-nav-icon">groups</span>
          <span>Patients</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="registration">
          <span class="material-symbols-outlined mobile-nav-icon">person_add</span>
          <span>Register</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="referrals">
          <span class="material-symbols-outlined mobile-nav-icon">sync_alt</span>
          <span>Referrals</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="followups">
          <span class="material-symbols-outlined mobile-nav-icon">assignment_turned_in</span>
          <span>Follow-ups</span>
        </a>
      `;
    } else if (role === "DOCTOR") {
      mobileHtml = `
        <a href="#" class="mobile-nav-link is-active" data-view="consultations">
          <span class="material-symbols-outlined mobile-nav-icon">stethoscope</span>
          <span>Station</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="appointments">
          <span class="material-symbols-outlined mobile-nav-icon">event_available</span>
          <span>OPD</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="patients">
          <span class="material-symbols-outlined mobile-nav-icon">clinical_notes</span>
          <span>Records</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="availability">
          <span class="material-symbols-outlined mobile-nav-icon">event_seat</span>
          <span>Duty</span>
        </a>
      `;
    } else if (role === "ADMIN") {
      mobileHtml = `
        <a href="#" class="mobile-nav-link is-active" data-view="dashboard">
          <span class="material-symbols-outlined mobile-nav-icon">analytics</span>
          <span>Overview</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="doctor-verification">
          <span class="material-symbols-outlined mobile-nav-icon">verified_user</span>
          <span>Verify</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="asha-management">
          <span class="material-symbols-outlined mobile-nav-icon">groups</span>
          <span>ASHAs</span>
        </a>
        <a href="#" class="mobile-nav-link" data-view="facilities">
          <span class="material-symbols-outlined mobile-nav-icon">local_hospital</span>
          <span>Beds</span>
        </a>
      `;
    }

    bottomNav.innerHTML = mobileHtml;

    bottomNav.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const view = e.currentTarget.getAttribute("data-view");
        if (view) this.navigateTo(view);
      });
    });
  }

  updateSidebarFooterForRole(role) {
    const footerEl = document.getElementById("sidebarOrgFooter");
    if (!footerEl) return;

    if (role === "AUTH") {
      footerEl.innerHTML = `
        <strong>ABDM Gateway Node #2841</strong><br>
        MoHFW Institutional Portal<br>
        <span style="color:var(--color-primary); font-weight:600;">Secure 2FA / Iris Auth</span>
      `;
    } else if (role === "PATIENT") {
      footerEl.innerHTML = `
        <strong>Village: Talwade (Sector 4)</strong><br>
        Block: Shirur • Dist: Pune<br>
        <span style="color:var(--color-primary); font-weight:600;">ABHA ID: 91-4029-1823-0192</span>
      `;
    } else if (role === "ASHA") {
      footerEl.innerHTML = `
        <strong>Sub-Centre Ambegaon</strong><br>
        Block: Shirur / Junnar • Dist: Pune<br>
        <span style="color:var(--color-primary); font-weight:600;">ASHA Cadre: #2409 • NHM</span>
      `;
    } else if (role === "DOCTOR") {
      footerEl.innerHTML = `
        <strong>Shirur 24x7 Primary Health Centre</strong><br>
        Room #4 Consultation Desk<br>
        <span style="color:var(--color-secondary); font-weight:600;">Dr. A. Kulkarni (MMC-2012-08-2940)</span>
      `;
    } else if (role === "ADMIN") {
      footerEl.innerHTML = `
        <strong>District Public Health Office</strong><br>
        Pune Zilla Parishad Grid<br>
        <span style="color:var(--color-primary); font-weight:600;">Surveillance Directorate</span>
      `;
    }
  }

  navigateTo(viewName) {
    this.currentView = viewName;

    // Update active class in sidebar & mobile nav
    document.querySelectorAll(".nav-item, .mobile-nav-link").forEach(item => {
      item.classList.toggle("is-active", item.getAttribute("data-view") === viewName);
    });

    this.renderCurrentView();
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  renderCurrentView() {
    const mainContainer = document.getElementById("mainContent");
    if (!mainContainer) return;

    if (this.currentRole === "AUTH" || this.currentView === "login") {
      mainContainer.innerHTML = AuthPages.renderLogin(this);
      this.initAuthPage();
      if (window.i18n) window.i18n.updateDOM();
      return;
    }

    if (this.currentRole === "PATIENT") {
      switch (this.currentView) {
        case "find-doctor":
        case "doctors":
          mainContainer.innerHTML = PatientPages.renderFindDoctor(this);
          this.bindPatientFindDoctorEvents();
          break;
        case "appointments":
          mainContainer.innerHTML = PatientPages.renderAppointments(this);
          break;
        case "prescriptions":
          mainContainer.innerHTML = PatientPages.renderPrescriptions(this);
          break;
        case "medical-records":
        case "records":
        case "health-history":
          mainContainer.innerHTML = PatientPages.renderMedicalRecords(this);
          break;
        case "notifications":
          mainContainer.innerHTML = PatientPages.renderNotifications(this);
          break;
        case "profile":
        case "profile-abha-card":
          mainContainer.innerHTML = PatientPages.renderProfile(this);
          break;
        case "home":
        case "dashboard":
        default:
          mainContainer.innerHTML = PatientPages.renderHome(this);
          break;
      }
    } else if (this.currentRole === "DOCTOR") {
      switch (this.currentView) {
        case "appointments":
          mainContainer.innerHTML = DoctorPages.renderAppointments(this);
          break;
        case "availability":
          mainContainer.innerHTML = DoctorPages.renderAvailability(this);
          break;
        case "patients":
          mainContainer.innerHTML = PatientPages.renderMedicalRecords(this);
          break;
        case "consultations":
        default:
          mainContainer.innerHTML = DoctorPages.renderClinicalStation(this);
          break;
      }
    } else if (this.currentRole === "ADMIN") {
      switch (this.currentView) {
        case "doctor-verification":
          mainContainer.innerHTML = AdminPages.renderDoctorVerification(this);
          break;
        case "asha-management":
          mainContainer.innerHTML = AdminPages.renderAshaManagement(this);
          break;
        case "facilities":
          mainContainer.innerHTML = this.renderFacilitiesView();
          this.bindFacilityEvents();
          break;
        case "dashboard":
        default:
          mainContainer.innerHTML = AdminPages.renderDashboard(this);
          break;
      }
    } else {
      // ASHA Persona Views
      switch (this.currentView) {
        case "registration":
        case "register-patient":
          mainContainer.innerHTML = AshaPages.renderRegistrationWizard(this);
          this.bindWizardEvents();
          break;
        case "triage":
        case "triage-vitals":
          mainContainer.innerHTML = AshaPages.renderTriage(this);
          break;
        case "patients":
        case "my-patients":
          mainContainer.innerHTML = AshaPages.renderPatientsList(this);
          break;
        case "referrals":
        case "active-referrals":
          mainContainer.innerHTML = AshaPages.renderReferrals(this);
          break;
        case "followups":
        case "follow-ups":
          mainContainer.innerHTML = AshaPages.renderFollowUps(this);
          break;
        case "facilities":
        case "facility-finder":
          mainContainer.innerHTML = AshaPages.renderFacilities(this);
          this.bindFacilityEvents();
          break;
        case "tasks":
        case "field-tasks":
          mainContainer.innerHTML = AshaPages.renderTasks(this);
          break;
        case "notifications":
          mainContainer.innerHTML = AshaPages.renderNotifications(this);
          break;
        case "profile":
          mainContainer.innerHTML = AshaPages.renderProfile(this);
          break;
        case "timeline":
          mainContainer.innerHTML = PatientPages.renderMedicalRecords(this);
          break;
        case "dashboard":
        default:
          mainContainer.innerHTML = AshaPages.renderDashboard(this);
          break;
      }
    }

    if (window.i18n) {
      window.i18n.updateDOM();
    }
  }

  /* ==========================================================================
     PATIENT INTERACTIVE HANDLERS & MODALS
     ========================================================================== */
  bindPatientFindDoctorEvents() {
    const searchInput = document.getElementById("doctorSearchInput");
    if (searchInput) {
      searchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") this.handleDoctorSearch();
      });
    }
  }

  handleDoctorSearchInput(query) {
    this.doctorSearchQuery = (query || "").trim().toLowerCase();
    this.renderCurrentView();
  }

  setDoctorCategory(cat) {
    this.activeDoctorCategory = cat;
    this.renderCurrentView();
  }

  handleDoctorSearch() {
    const input = document.getElementById("doctorSearchInput");
    if (input) {
      this.doctorSearchQuery = input.value.trim().toLowerCase();
    }
    this.showToast(`Filtered doctors matching "${this.doctorSearchQuery || 'All'}"`, "info");
    this.renderCurrentView();
  }

  selectDoctor(docId) {
    const doc = SWASTHYA_DATA.doctors.find(d => d.id === docId);
    if (doc) {
      this.selectedDoctor = doc;
      this.renderCurrentView();
      const drawer = document.getElementById("bookingDrawer");
      if (drawer) {
        drawer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  selectDoctorForBooking(docId) {
    this.selectDoctor(docId);
  }

  setConsultMode(mode) {
    this.consultMode = mode;
    this.renderCurrentView();
  }

  setSelectedDate(date) {
    this.selectedDate = date;
    this.renderCurrentView();
  }

  setSelectedTime(time) {
    this.selectedTime = time;
    this.renderCurrentView();
  }

  setAppointmentTab(tab) {
    this.activeAppointmentTab = tab;
    this.renderCurrentView();
  }

  setRecordFilter(filter) {
    this.activeRecordFilter = filter;
    this.renderCurrentView();
  }

  markMedicineTaken(medicineId) {
    const med = this.citizenData.prescriptions.find(p => p.id === medicineId);
    if (med) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      med.taken = true;
      med.takenAt = timeStr;
      med.status = `Taken at ${timeStr}`;

      this.showToast(`Marked ${med.medicine} as taken at ${timeStr}!`, "success");
      this.renderCurrentView();
    }
  }

  markAllNotificationsRead() {
    if (this.citizenData.notifications) {
      this.citizenData.notifications.forEach(n => n.unread = false);
      this.showToast("All notifications marked as read.", "info");
      this.renderCurrentView();
    }
  }

  bookDoctorAppointment() {
    const doc = this.selectedDoctor || SWASTHYA_DATA.doctors[0];
    const reasonInput = document.getElementById("consultReasonInput");
    const reason = reasonInput ? reasonInput.value : "Follow-up consultation";

    const tokenNumber = "TOKEN-SAS-" + Math.floor(10 + Math.random() * 90);
    const newApt = {
      id: "apt-" + Date.now(),
      doctorName: doc.name,
      specialty: doc.specialty,
      degrees: doc.qualifications ? doc.qualifications.split(',')[0] : "MD",
      facility: doc.facility,
      date: this.selectedDate,
      relativeDate: "Confirmed",
      time: this.selectedTime,
      mode: this.consultMode,
      status: "Confirmed",
      statusClass: "status-confirmed",
      type: reason,
      token: tokenNumber,
      fee: "FREE (Ayushman Bharat / NHM)"
    };

    this.citizenData.upcomingAppointments.unshift(newApt);
    if (window.offlineStore) {
      window.offlineStore.saveRecord("patient_appointment", newApt);
    }

    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">check_circle</span> Appointment Confirmed!`,
      `
        <div class="text-center p-space-md">
          <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-md">
            <span class="material-symbols-outlined text-[36px]">verified</span>
          </div>
          <h3 class="font-headline-lg font-bold text-primary" style="font-size:1.25rem;">Token Issued: ${tokenNumber}</h3>
          <p class="text-sm text-muted mt-xs">Your consultation has been registered under Ayushman Bharat Digital Mission (ABDM).</p>
          
          <div class="bg-surface-container-low p-space-md rounded-xl text-left mt-base flex flex-col gap-xs text-xs">
            <div class="flex justify-between"><strong>Doctor:</strong> <span>${doc.name}</span></div>
            <div class="flex justify-between"><strong>Specialty:</strong> <span>${doc.specialty}</span></div>
            <div class="flex justify-between"><strong>Date & Time:</strong> <span>${this.selectedDate} at ${this.selectedTime}</span></div>
            <div class="flex justify-between"><strong>Facility:</strong> <span>${doc.facility}</span></div>
            <div class="flex justify-between"><strong>Fee:</strong> <span class="font-bold text-primary">FREE (NHM Covered)</span></div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal(); app.openTokenSlipModal('${newApt.id}')">
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Download Token Slip</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal(); app.navigateTo('appointments')">
          <span>View My Appointments</span>
        </button>
      `
    );
  }

  cancelAppointment(aptId) {
    const idx = this.citizenData.upcomingAppointments.findIndex(a => a.id === aptId);
    if (idx > -1) {
      const removed = this.citizenData.upcomingAppointments.splice(idx, 1)[0];
      removed.status = "Cancelled";
      removed.reason = "Cancelled by citizen via health portal";
      if (!this.citizenData.cancelledAppointments) this.citizenData.cancelledAppointments = [];
      this.citizenData.cancelledAppointments.unshift(removed);

      this.closeModal();
      this.showToast(`Appointment with ${removed.doctorName} cancelled.`, "warning");
      this.renderCurrentView();
    }
  }

  openDoctorProfileModal(doctorId) {
    const doc = SWASTHYA_DATA.doctors.find(d => d.id === doctorId) || SWASTHYA_DATA.doctors[0];
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">badge</span> Doctor Credentials & Schedule`,
      `
        <div class="flex flex-col gap-base">
          <div class="flex items-start gap-md">
            <div class="doctor-avatar-initials" style="width:64px; height:64px; font-size:1.375rem;">
              ${doc.name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div class="flex items-center gap-xs">
                <h3 class="font-bold text-lg text-primary">${doc.name}</h3>
                <span class="abdm-badge"><span class="material-symbols-outlined text-[14px]">verified</span> ABDM Verified</span>
              </div>
              <p class="text-xs font-bold text-secondary">${doc.specialty}</p>
              <p class="text-xs text-muted">${doc.qualifications}</p>
              <p class="text-xs text-muted mt-1"><span class="material-symbols-outlined text-[14px]">apartment</span> ${doc.facility}</p>
            </div>
          </div>

          <div class="bg-surface-container-low p-space-md rounded-xl text-xs flex flex-col gap-xs">
            <div><strong>Clinical Experience:</strong> ${doc.experience}</div>
            <div><strong>Languages Spoken:</strong> ${doc.languages || 'Marathi, Hindi, English'}</div>
            <div><strong>OPD Timings:</strong> ${doc.timings || 'Mon-Sat: 09:00 AM - 02:00 PM'}</div>
            <div><strong>Consultation Fee:</strong> <span class="text-primary font-bold">${doc.fee}</span></div>
          </div>

          <div>
            <strong class="text-xs text-neutral block mb-1">Clinical Biography & Specialization:</strong>
            <p class="text-xs text-muted leading-relaxed">${doc.bio}</p>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Close</button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal(); app.selectDoctorForBooking('${doc.id}'); app.navigateTo('find-doctor');">
          <span class="material-symbols-outlined text-[16px]">event_available</span>
          <span>Book Consultation</span>
        </button>
      `
    );
  }

  openDirectionsModal(facility) {
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">directions</span> OPD Directions & Transit Info`,
      `
        <div class="flex flex-col gap-base">
          <div class="bg-surface-container-low p-space-md rounded-xl text-xs flex flex-col gap-xs">
            <strong class="text-sm font-bold text-primary">${facility}</strong>
            <p class="text-muted">Origin: Talwade Village (Sector 4), Shirur Block</p>
            <p class="text-muted">Assigned Transit Guide: ASHA Sunita More (Phone: +91 94230 01928)</p>
          </div>

          <div class="flex flex-col gap-sm text-xs">
            <div class="flex items-start gap-sm p-2 rounded bg-surface-subtle border border-structural">
              <span class="material-symbols-outlined text-[18px] text-primary">directions_bus</span>
              <div>
                <strong>MSRTC State Transport Bus:</strong>
                <p class="text-muted">Bus every 30 mins from Shirur ST Stand to Pune Swargate / Station.</p>
              </div>
            </div>

            <div class="flex items-start gap-sm p-2 rounded bg-surface-subtle border border-structural">
              <span class="material-symbols-outlined text-[18px] text-red-600">ambulance</span>
              <div>
                <strong>Emergency Transport:</strong>
                <p class="text-muted">Free 108 ALS Ambulance available 24x7 for assisted citizen transfers.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      `<button class="btn btn-primary btn-sm" onclick="app.closeModal()">Got it</button>`
    );
  }

  openRescheduleModal(aptId) {
    const apt = this.citizenData.upcomingAppointments.find(a => a.id === aptId) || this.citizenData.upcomingAppointments[0];
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">edit_calendar</span> Reschedule Consultation`,
      `
        <div class="flex flex-col gap-base">
          <p class="text-xs text-muted">Select your new preferred date and time for consultation with <strong>${apt ? apt.doctorName : 'Doctor'}</strong>:</p>
          
          <div class="form-group">
            <label class="form-label">Select New Date</label>
            <select class="form-select text-xs" id="rescheduleDateSelect">
              <option>Monday, 27 Oct 2026 (10:30 AM)</option>
              <option>Wednesday, 29 Oct 2026 (11:00 AM)</option>
              <option>Friday, 31 Oct 2026 (10:00 AM)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Reason for Rescheduling</label>
            <input type="text" class="form-input text-xs" id="rescheduleReasonInput" placeholder="e.g. Family commitment, transit delay...">
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="
          const newDate = document.getElementById('rescheduleDateSelect').value;
          if (app.citizenData.upcomingAppointments[0]) {
            app.citizenData.upcomingAppointments[0].date = newDate.split(' (')[0];
            app.citizenData.upcomingAppointments[0].time = newDate.split(' (')[1].replace(')', '');
          }
          app.closeModal();
          app.showToast('Appointment successfully rescheduled!', 'success');
          app.renderCurrentView();
        ">
          Confirm Reschedule
        </button>
      `
    );
  }

  openCancelAppointmentModal(aptId) {
    const apt = this.citizenData.upcomingAppointments.find(a => a.id === aptId) || this.citizenData.upcomingAppointments[0];
    this.openModal(
      `<span class="material-symbols-outlined text-red-600 text-[22px]">warning</span> Cancel Consultation`,
      `
        <div class="flex flex-col gap-base text-center">
          <p class="text-sm">Are you sure you want to cancel your appointment with <strong>${apt ? apt.doctorName : 'the doctor'}</strong>?</p>
          <div class="bg-red-50 p-space-md rounded-xl text-xs text-red-800 text-left">
            <strong>Note:</strong> Your issued token will be released. You can rebook anytime free of charge under NHM.
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Keep Appointment</button>
        <button class="btn btn-destructive btn-sm" onclick="app.cancelAppointment('${aptId}')">
          Yes, Cancel Appointment
        </button>
      `
    );
  }

  openTokenSlipModal(aptId) {
    const apt = this.citizenData.upcomingAppointments.find(a => a.id === aptId) || this.citizenData.upcomingAppointments[0];
    const c = this.citizenData;
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">receipt</span> ABDM Public Health Token Slip`,
      `
        <div class="p-space-md bg-surface-card border border-structural rounded-xl text-xs flex flex-col gap-sm">
          <div class="flex items-center justify-between border-b pb-2">
            <div class="flex items-center gap-xs">
              <img src="src/assets/emblem.svg" class="w-6 h-6" alt="Emblem">
              <div>
                <strong class="text-xs text-primary block">NATIONAL HEALTH AUTHORITY</strong>
                <span class="text-[10px] text-muted">Ayushman Bharat Digital Mission (ABDM)</span>
              </div>
            </div>
            <span class="abdm-badge font-bold">DIGITAL TOKEN</span>
          </div>

          <div class="text-center py-sm">
            <h2 class="font-numeric-id font-bold text-2xl text-primary">${apt ? apt.token : 'TOKEN-SAS-14'}</h2>
            <p class="text-xs text-muted">Show this token at OPD Registration Desk</p>
          </div>

          <div class="grid grid-cols-2 gap-xs bg-surface-subtle p-2 rounded">
            <div><strong>Patient:</strong> ${c.name} (${c.age} Y)</div>
            <div><strong>ABHA ID:</strong> <span class="numeric-id text-primary font-bold">${c.abhaId}</span></div>
            <div><strong>Doctor:</strong> ${apt ? apt.doctorName : 'Dr. Sanjeev Thorat'}</div>
            <div><strong>Facility:</strong> ${apt ? apt.facility : 'Sassoon Hospital'}</div>
            <div><strong>Date & Time:</strong> ${apt ? apt.date + ' ' + apt.time : 'Friday 10:30 AM'}</div>
            <div><strong>Fee:</strong> <span class="text-emerald-700 font-bold">FREE (NHM)</span></div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="window.print()">
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Print Slip</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal()">Close</button>
      `
    );
  }

  openEcgViewerModal() {
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">ecg_heart</span> 12-Lead Diagnostic ECG Examination`,
      `
        <div class="flex flex-col gap-base">
          <div class="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg text-xs">
            <div>
              <strong>Patient: Ramesh Patil (62 Y)</strong> • ABHA: <span class="numeric-id font-bold text-primary">91-4029-1823-0192</span>
            </div>
            <span class="tag-capability">Validated Tele-ECG</span>
          </div>

          <!-- ECG Waveform Graphical Simulation -->
          <div style="background:#0F172A; border-radius:8px; padding:16px; color:#38BDF8; font-family:monospace; position:relative; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:8px; opacity:0.8;">
              <span>LEAD II (Standard) • 25mm/s • 10mm/mV</span>
              <span>HR: 74 bpm • Sinus Rhythm</span>
            </div>
            
            <!-- Simulated Crisp SVG Waveform -->
            <svg viewBox="0 0 500 80" style="width:100%; height:80px; stroke:#10B981; fill:none; stroke-width:2;">
              <path d="M0,40 L30,40 L35,36 L40,40 L50,40 L55,42 L60,10 L65,70 L70,36 L75,40 L90,40 L100,32 L115,40 L150,40 L155,36 L160,40 L170,40 L175,42 L180,10 L185,70 L190,36 L195,40 L210,40 L220,32 L235,40 L270,40 L275,36 L280,40 L290,40 L295,42 L300,10 L305,70 L310,36 L315,40 L330,40 L340,32 L355,40 L390,40 L395,36 L400,40 L410,40 L415,42 L420,10 L425,70 L430,36 L435,40 L450,40 L460,32 L475,40 L500,40" />
            </svg>
          </div>

          <div class="bg-surface-subtle p-3 rounded-lg text-xs">
            <strong class="text-primary block mb-1">Clinical Interpretation (Dr. Rajesh Kulkarni):</strong>
            <p class="text-muted">Normal sinus rhythm with mild non-specific ST variations. Stable progression compared to acute emergency baseline on 18 Sep 2026.</p>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.showToast('Downloaded 12_Lead_ECG_Report_Shirur.pdf', 'success')">
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Download PDF</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal()">Close</button>
      `
    );
  }

  openAbhaModal() {
    const c = this.citizenData;
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">badge</span> Official ABHA Health Card`,
      `
        <div class="abha-card-container">
          <div class="abha-card-inner">
            <div class="abha-card-header">
              <div class="flex items-center gap-xs">
                <img src="src/assets/emblem.svg" class="w-8 h-8" alt="ABDM Emblem">
                <div>
                  <strong style="color:#FFFFFF; font-size:0.9375rem; display:block; line-height:1.2;">राष्ट्रीय आरोग्य प्राधिकरण</strong>
                  <span style="color:#A8DAB5; font-size:0.6875rem; letter-spacing:0.04em;">NATIONAL HEALTH AUTHORITY</span>
                </div>
              </div>
              <span class="abdm-pill-white">ABHA CARD</span>
            </div>

            <div class="abha-card-body">
              <div class="flex items-center gap-md">
                <div class="abha-qr-box">
                  <span class="material-symbols-outlined text-[64px] text-primary">qr_code_2</span>
                </div>

                <div class="abha-card-details">
                  <h2 style="font-size:1.25rem; font-weight:800; color:#FFFFFF; margin-bottom:2px;">${c.name}</h2>
                  <p style="color:#D1FAE5; font-size:0.8125rem;">DOB / Age: 1964 (${c.age} Y) • ${c.gender}</p>
                  <p style="color:#D1FAE5; font-size:0.8125rem;">Blood Group: ${c.bloodGroup || 'B +ve'}</p>

                  <div style="margin-top:10px;">
                    <span style="color:#A8DAB5; font-size:0.6875rem; font-weight:700; text-transform:uppercase;">ABHA Number</span>
                    <strong style="color:#FFFFFF; font-size:1.125rem; letter-spacing:0.08em; display:block; font-family:var(--font-numeric);">${c.abhaId}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="abha-card-footer">
              <span>Ayushman Bharat Digital Mission (ABDM)</span>
              <span>14416 / 104 Toll-Free</span>
            </div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.showToast('Downloaded ABHA_Card_${c.name.replace(' ', '_')}.pdf', 'success')">
          <span class="material-symbols-outlined text-[16px]">download</span>
          <span>Download PDF</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal()">Close</button>
      `
    );
  }

  openModal(title, bodyHtml, footerHtml = "") {
    this.closeModal();

    const backdrop = document.createElement("div");
    backdrop.className = "swasthya-modal-backdrop";
    backdrop.id = "globalModalBackdrop";
    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.closeModal();
    };

    backdrop.innerHTML = `
      <div class="swasthya-modal-dialog" onclick="event.stopPropagation()">
        <div class="swasthya-modal-header">
          <h3 class="swasthya-modal-title">${title}</h3>
          <button class="btn btn-ghost btn-sm" style="min-height:30px; padding:0 6px;" onclick="app.closeModal()">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div class="swasthya-modal-body">
          ${bodyHtml}
        </div>
        ${footerHtml ? `<div class="swasthya-modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    document.body.appendChild(backdrop);
  }

  closeModal() {
    const existing = document.getElementById("globalModalBackdrop");
    if (existing) existing.remove();
  }

  /* ==========================================================================
     DOCTOR ACTIONS (STAYS IN DOCTOR ROLE)
     ========================================================================== */
  selectDoctorQueuePatient(patientId) {
    const p = SWASTHYA_DATA.doctorQueue.find(item => item.id === patientId);
    if (p) {
      this.activeDoctorPatient = p;
      this.renderCurrentView();
    }
  }

  saveDoctorConsultation() {
    const diagInput = document.getElementById("docDiagnosisInput");
    const notesInput = document.getElementById("docNotesInput");
    const delegateCheck = document.getElementById("delegateAshaCheck");

    const diag = diagInput ? diagInput.value : "Acute respiratory stabilization";
    const notes = notesInput ? notesInput.value : "Treatment orders logged.";

    if (window.offlineStore) {
      window.offlineStore.saveRecord("clinical_consultation", {
        patientId: this.activeDoctorPatient.id,
        diagnosis: diag,
        orders: notes,
        delegatedAsha: delegateCheck ? delegateCheck.checked : true,
        timestamp: new Date().toISOString()
      });
    }

    this.showToast("Clinical notes saved & e-Prescription issued! Follow-up assigned to ASHA Sunita More.", "success");
    // Remains strictly in Doctor role
    setTimeout(() => {
      this.navigateTo("appointments");
    }, 1000);
  }

  /* ==========================================================================
     ADMIN VERIFICATION ACTIONS
     ========================================================================== */
  verifyDoctor(verId) {
    const item = SWASTHYA_DATA.adminDoctorVerifications.find(v => v.id === verId);
    if (item) {
      item.status = "Approved & Active";
      item.statusClass = "status-approved";
      this.showToast(`Credential Verified: ${item.doctorName} approved for tele-triage!`, "success");
      this.renderCurrentView();
    }
  }

  rejectDoctor(verId) {
    const item = SWASTHYA_DATA.adminDoctorVerifications.find(v => v.id === verId);
    if (item) {
      item.status = "Rejected";
      item.statusClass = "status-rejected";
      this.showToast(`Application for ${item.doctorName} rejected.`, "warning");
      this.renderCurrentView();
    }
  }

  /* ==========================================================================
     ASHA REGISTRATION & TRIAGE WIZARD
     ========================================================================== */
  startNewRegistration() {
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

          if (window.offlineStore) {
            window.offlineStore.saveRecord("patient_assessment", this.activePatient);
          }
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

  /* ==========================================================================
     ASHA FIELD WORKER INTERACTIVE HANDLERS & MODALS
     ========================================================================== */
  handleAshaPatientSearch(query) {
    this.ashaPatientSearch = query || "";
    this.renderCurrentView();
  }

  setAshaVillageFilter(village) {
    this.ashaVillageFilter = village;
    this.renderCurrentView();
  }

  setAshaPatientCategory(cat) {
    this.ashaPatientFilter = cat;
    this.renderCurrentView();
  }

  setAshaReferralFilter(filter) {
    this.ashaReferralFilter = filter;
    this.renderCurrentView();
  }

  setAshaFollowUpTab(tab) {
    this.ashaFollowUpTab = tab;
    this.renderCurrentView();
  }

  completeFollowUp(fuId) {
    const fu = (SWASTHYA_DATA.ashaFollowUps || []).find(f => f.id === fuId);
    if (fu) {
      fu.completed = true;
      fu.dueStatus = "Completed";
      if (window.offlineStore) {
        window.offlineStore.saveRecord("follow_up_completed", fu);
      }
      this.showToast(`Follow-up completed for ${fu.patientName}! Post-care log recorded.`, "success");
      this.renderCurrentView();
    }
  }

  recordPatientVitals(patientName) {
    this.openVitalsModal(patientName);
  }

  markImmunizationDone(childName) {
    this.showToast(`Home pre-counselling verified for ${childName}. Added to Friday VHSND cohort roster.`, "success");
  }

  showAmbulanceTracker() {
    this.openModal(
      `<span class="material-symbols-outlined text-danger text-[22px]">airport_shuttle</span> 108 Emergency Ambulance GPS Tracker`,
      `
        <div class="flex flex-col gap-base">
          <div class="p-3 rounded-lg bg-surface-container-low text-xs flex flex-col gap-1 border border-structural">
            <div class="flex justify-between"><strong>Ambulance Unit:</strong> <span class="font-bold text-danger">MH-12-CZ-9812 (ALS Equipped)</span></div>
            <div class="flex justify-between"><strong>Driver / EMT:</strong> <span>Santosh Waghmare (+91 98220 88102)</span></div>
            <div class="flex justify-between"><strong>Origin Base:</strong> <span>Shirur Cluster Hub</span></div>
            <div class="flex justify-between"><strong>Patient En Route:</strong> <strong class="text-primary">Kavita Jadhav (28 Y)</strong></div>
            <div class="flex justify-between"><strong>Destination:</strong> <strong class="text-secondary">Shirur 24x7 PHC (Oxygen Bay Reserved)</strong></div>
          </div>

          <!-- GPS Telemetry Simulated Screen -->
          <div style="background:#0F172A; border-radius:10px; padding:16px; color:#38BDF8; font-family:monospace; position:relative;">
            <div class="flex justify-between text-xs mb-2 opacity-80">
              <span>GPS FIX: LOCK (14 Satellites) • 4G Telemetry</span>
              <span class="text-emerald-400 font-bold">SPEED: 58 km/h</span>
            </div>
            
            <div class="py-4 text-center">
              <span class="material-symbols-outlined text-[42px] text-amber-400 block animate-bounce">near_me</span>
              <h3 class="text-lg font-bold text-white mt-1">ETA: 12 Minutes</h3>
              <p class="text-xs text-slate-400">Current Location: Near Shirur Bypass Junction (4.1 km remaining)</p>
            </div>

            <div class="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div class="bg-amber-400 h-full w-3/4 animate-pulse"></div>
            </div>
          </div>

          <div class="alert alert-info text-xs">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            <span>Dr. A. Kulkarni at Shirur PHC has accepted live inbound telemetry. Emergency triage bay #4 is prepared.</span>
          </div>
        </div>
      `,
      `
        <a class="btn btn-destructive btn-sm" href="tel:108">
          <span class="material-symbols-outlined text-[16px]">call</span>
          <span>Call 108 Dispatcher</span>
        </a>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal()">Close Tracker</button>
      `
    );
  }

  shareReferralSlip(patientName) {
    const patient = (SWASTHYA_DATA.ashaReferrals || []).find(r => r.patientName.includes(patientName)) || SWASTHYA_DATA.ashaReferrals[0];
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">receipt_long</span> Digital Referral Authorization Slip`,
      `
        <div class="p-space-md bg-surface-card border border-structural rounded-xl text-xs flex flex-col gap-sm">
          <div class="flex items-center justify-between border-b pb-2">
            <div class="flex items-center gap-xs">
              <img src="src/assets/emblem.svg" class="w-6 h-6" alt="Emblem">
              <div>
                <strong class="text-xs text-primary block">PUBLIC HEALTH REFERRAL SLIP</strong>
                <span class="text-[10px] text-muted">Government of Maharashtra • NHM Grid</span>
              </div>
            </div>
            <span class="abdm-badge font-bold">ABDM VERIFIED</span>
          </div>

          <div class="text-center py-2 bg-surface-container rounded-lg">
            <span class="text-[10px] text-muted uppercase font-bold tracking-wider">Referral Token ID</span>
            <h2 class="font-numeric-id font-bold text-xl text-primary">${patient ? patient.slipToken : 'REF-2026-PHC-9021'}</h2>
          </div>

          <div class="grid grid-cols-2 gap-xs bg-surface-subtle p-2 rounded">
            <div><strong>Patient:</strong> ${patient ? patient.patientName : patientName} (${patient ? patient.age : '58'} Y)</div>
            <div><strong>ABHA ID:</strong> <span class="numeric-id text-primary font-bold">${patient ? patient.abhaId : '91-3319-7721-0094'}</span></div>
            <div><strong>Referred To:</strong> ${patient ? patient.facilityName : 'Shirur PHC'}</div>
            <div><strong>Assigned MO:</strong> ${patient ? patient.doctorAssigned : 'Dr. A. Kulkarni'}</div>
            <div><strong>Clinical Reason:</strong> <span class="text-danger font-semibold">${patient ? patient.clinicalNeed : 'Diabetic Retinopathy'}</span></div>
            <div><strong>Transport:</strong> ${patient ? patient.transportMode : 'Family Transit'}</div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.showToast('SMS Referral Link sent to patient mobile number!', 'success')">
          <span class="material-symbols-outlined text-[16px]">sms</span>
          <span>Send SMS</span>
        </button>
        <button class="btn btn-secondary btn-sm" onclick="window.print()">
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Print Slip</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="app.closeModal()">Done</button>
      `
    );
  }

  requestReplenishment() {
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">inventory</span> ASHA Kit Replenishment Indent`,
      `
        <div class="flex flex-col gap-base text-xs">
          <p class="text-muted">Submit an automated sub-centre supply indent to the Shirur Central Medical Store:</p>

          <div class="flex flex-col gap-xs">
            <label class="flex items-center gap-xs p-2 rounded bg-surface-subtle cursor-pointer">
              <input type="checkbox" checked id="reqIFA">
              <div><strong>Iron Folic Acid (IFA) Tablets:</strong> <span class="text-muted">Request 200 Foil Packs</span></div>
            </label>
            <label class="flex items-center gap-xs p-2 rounded bg-surface-subtle cursor-pointer">
              <input type="checkbox" checked id="reqHb">
              <div><strong>Hb Color Scale Strips:</strong> <span class="text-muted">Request 50 Strips Refill</span></div>
            </label>
            <label class="flex items-center gap-xs p-2 rounded bg-red-50 text-red-900 cursor-pointer">
              <input type="checkbox" checked id="reqNishchay">
              <div><strong>Pregnancy Test Strips (Nishchay):</strong> <span class="font-bold text-red-800">URGENT RESTOCK (25 Strips)</span></div>
            </label>
            <label class="flex items-center gap-xs p-2 rounded bg-surface-subtle cursor-pointer">
              <input type="checkbox" id="reqCuff">
              <div><strong>Omron Digital BP Cuff:</strong> <span class="text-muted">Calibration / Replacement Request</span></div>
            </label>
          </div>

          <div class="form-group">
            <label class="form-label">Special Indent Remarks</label>
            <input type="text" class="form-input text-xs" id="indentRemarks" placeholder="e.g. Expedite for Friday VHSND immunization session...">
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="
          app.closeModal();
          app.showToast('ASHA Kit Indent #IND-2026-9921 submitted to Shirur Central Medical Store!', 'success');
        ">
          Submit Indent Order
        </button>
      `
    );
  }

  openVitalsModal(patientName = "") {
    const defaultPatient = patientName ? (this.registeredPatients.find(p=>p.name.includes(patientName)) || this.activePatient) : this.activePatient;
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">vital_signs</span> Quick Vitals Capture & Triage`,
      `
        <div class="flex flex-col gap-base">
          <div class="form-group">
            <label class="form-label">Select Patient from Cohort</label>
            <select class="form-select text-xs" id="quickVitalPatientSelect">
              ${this.registeredPatients.map(p => `
                <option value="${p.id}" ${p.name === defaultPatient.name ? 'selected' : ''}>
                  ${p.name} (${p.age}y / ${p.gender}) • ${p.village}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-xs">
            <div class="vital-input-card">
              <label class="form-label text-xs">SpO2 (%)</label>
              <input type="number" class="form-input text-sm font-bold" id="qSpo2" value="98" min="60" max="100">
            </div>
            <div class="vital-input-card">
              <label class="form-label text-xs">Sys BP (mmHg)</label>
              <input type="number" class="form-input text-sm font-bold" id="qBpSys" value="120">
            </div>
            <div class="vital-input-card">
              <label class="form-label text-xs">Dia BP (mmHg)</label>
              <input type="number" class="form-input text-sm font-bold" id="qBpDia" value="80">
            </div>
            <div class="vital-input-card">
              <label class="form-label text-xs">Pulse (bpm)</label>
              <input type="number" class="form-input text-sm font-bold" id="qPulse" value="76">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-xs">
            <div class="vital-input-card">
              <label class="form-label text-xs">Temp (°F)</label>
              <input type="text" class="form-input text-xs" id="qTemp" value="98.6">
            </div>
            <div class="vital-input-card">
              <label class="form-label text-xs">Blood Sugar (mg/dL)</label>
              <input type="number" class="form-input text-xs" id="qSugar" value="120">
            </div>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="
          const patId = document.getElementById('quickVitalPatientSelect').value;
          const targetP = app.registeredPatients.find(p => p.id === patId);
          if (targetP) {
            targetP.spo2 = document.getElementById('qSpo2').value + '%';
            targetP.bp = document.getElementById('qBpSys').value + '/' + document.getElementById('qBpDia').value;
            targetP.pulse = document.getElementById('qPulse').value + ' bpm';
            targetP.sugar = document.getElementById('qSugar').value + ' mg/dL';
            targetP.lastVisit = 'Just now';
            if (parseFloat(document.getElementById('qSpo2').value) < 92 || parseFloat(document.getElementById('qBpSys').value) >= 160) {
              targetP.riskLevel = 'HIGH';
              targetP.riskClass = 'risk-high';
            }
          }
          app.closeModal();
          app.showToast('Vitals logged to encrypted local storage & synchronized with cohort roster.', 'success');
          app.renderCurrentView();
        ">
          Save & Stratify Triage
        </button>
      `
    );
  }

  openCreateReferralModal(patientId = "") {
    const patient = patientId ? (this.registeredPatients.find(p=>p.id===patientId) || this.registeredPatients[0]) : this.registeredPatients[0];
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">add_circle</span> Initiate Frontline Referral`,
      `
        <div class="flex flex-col gap-base text-xs">
          <div class="form-group">
            <label class="form-label">Patient</label>
            <select class="form-select text-xs" id="refModalPatient">
              ${this.registeredPatients.map(p => `
                <option value="${p.id}" ${p.id === patient.id ? 'selected' : ''}>
                  ${p.name} (${p.age}y / ${p.gender}) • ABHA: ${p.abhaId}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Clinical Healthcare Need / Symptoms</label>
            <input type="text" class="form-input text-xs" id="refModalNeed" placeholder="e.g. Acute breathlessness, chest tightness, elevated BP 160/98" value="${patient.condition || ''}">
          </div>

          <div class="grid grid-cols-2 gap-xs">
            <div class="form-group">
              <label class="form-label">Urgency Tier</label>
              <select class="form-select text-xs" id="refModalUrgency">
                <option value="EMERGENCY">EMERGENCY (Immediate Transfer)</option>
                <option value="HIGH" selected>HIGH RISK (Oxygen / Triage)</option>
                <option value="MODERATE">MODERATE (Specialist OPD)</option>
                <option value="ROUTINE">ROUTINE (Follow-up Check)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Target Facility</label>
              <select class="form-select text-xs" id="refModalFacility">
                <option value="phc-shirur">Shirur 24x7 PHC (4.2 km)</option>
                <option value="sdh-junnar">SDH Junnar (18.2 km)</option>
                <option value="dh-pune">Sassoon District Hospital (42 km)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Transport Mode</label>
            <select class="form-select text-xs" id="refModalTransport">
              <option value="108">108 ALS Ambulance (Dispatch Required)</option>
              <option value="Family">Family Transport / MSRTC Bus</option>
              <option value="Self">Self Transit</option>
            </select>
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="
          const patId = document.getElementById('refModalPatient').value;
          const p = app.registeredPatients.find(item => item.id === patId) || app.registeredPatients[0];
          const newRef = {
            id: 'ref-' + Date.now(),
            patientId: p.id,
            patientName: p.name,
            age: p.age,
            gender: p.gender,
            village: p.village,
            abhaId: p.abhaId,
            phone: p.phone,
            referralType: 'Clinical Referral',
            referralCategory: 'general',
            urgency: document.getElementById('refModalUrgency').value,
            urgencyClass: document.getElementById('refModalUrgency').value === 'EMERGENCY' ? 'risk-emergency' : (document.getElementById('refModalUrgency').value === 'HIGH' ? 'risk-high' : 'risk-moderate'),
            clinicalNeed: document.getElementById('refModalNeed').value || 'Referred for specialist evaluation',
            facilityId: document.getElementById('refModalFacility').value,
            facilityName: document.getElementById('refModalFacility').options[document.getElementById('refModalFacility').selectedIndex].text.split(' (')[0],
            doctorAssigned: 'Dr. A. Kulkarni',
            transportMode: document.getElementById('refModalTransport').value === '108' ? '108 ALS Ambulance' : 'Family Assisted',
            ambulanceReg: document.getElementById('refModalTransport').value === '108' ? 'MH-12-CZ-9812' : null,
            ambulanceEta: '15 mins',
            status: document.getElementById('refModalTransport').value === '108' ? 'In Transit (108 Dispatched)' : 'Appointment Confirmed',
            statusStep: 4,
            statusClass: 'status-pending',
            slipToken: 'REF-2026-PHC-' + Math.floor(1000 + Math.random() * 9000),
            createdAt: 'Just now',
            notes: 'Created by ASHA Sunita More via frontline mobile workstation.'
          };
          if (!SWASTHYA_DATA.ashaReferrals) SWASTHYA_DATA.ashaReferrals = [];
          SWASTHYA_DATA.ashaReferrals.unshift(newRef);
          if (window.offlineStore) {
            window.offlineStore.saveRecord('asha_referral', newRef);
          }
          app.closeModal();
          app.showToast('Referral created for ' + p.name + '! Token issued: ' + newRef.slipToken, 'success');
          app.navigateTo('referrals');
        ">
          Confirm & Issue Referral Slip
        </button>
      `
    );
  }

  openAddTaskModal() {
    this.openModal(
      `<span class="material-symbols-outlined text-primary text-[22px]">add_task</span> Add Daily Field Task`,
      `
        <div class="flex flex-col gap-base text-xs">
          <div class="form-group">
            <label class="form-label">Task Title</label>
            <input type="text" class="form-input text-xs" id="taskTitleInput" placeholder="e.g. Post-Discharge BP check for Maruti Chavan">
          </div>
          <div class="grid grid-cols-2 gap-xs">
            <div class="form-group">
              <label class="form-label">Task Type</label>
              <select class="form-select text-xs" id="taskTypeSelect">
                <option>Home Visit (Follow-up)</option>
                <option>Maternal ANC Visit</option>
                <option>Village Screening Camp</option>
                <option>IFA / Jan Aushadhi Dispensing</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Priority</label>
              <select class="form-select text-xs" id="taskPrioritySelect">
                <option value="High Priority">High Priority</option>
                <option value="Routine" selected>Routine</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Village / Locality</label>
            <input type="text" class="form-input text-xs" id="taskVillageInput" value="Talwade (Sector 4)">
          </div>
        </div>
      `,
      `
        <button class="btn btn-secondary btn-sm" onclick="app.closeModal()">Cancel</button>
        <button class="btn btn-primary btn-sm" onclick="
          const title = document.getElementById('taskTitleInput').value;
          if (title) {
            const newTask = {
              id: 'task-' + Date.now(),
              title: title,
              type: document.getElementById('taskTypeSelect').value,
              village: document.getElementById('taskVillageInput').value,
              priority: document.getElementById('taskPrioritySelect').value,
              priorityClass: document.getElementById('taskPrioritySelect').value === 'High Priority' ? 'risk-high' : 'risk-moderate',
              dueDate: 'Today, 04:00 PM',
              status: 'Pending'
            };
            if (!SWASTHYA_DATA.ashaTasks) SWASTHYA_DATA.ashaTasks = [];
            SWASTHYA_DATA.ashaTasks.unshift(newTask);
            app.closeModal();
            app.showToast('Field task added to schedule!', 'success');
            app.renderCurrentView();
          }
        ">
          Add Task
        </button>
      `
    );
  }

  /* ==========================================================================
     SHARED FACILITY FINDER & DEMO HELPERS
     ========================================================================== */
  renderFacilitiesView() {
    const isPatient = this.currentRole === "PATIENT";
    const isAdmin = this.currentRole === "ADMIN";

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="nav_facilities">Public Healthcare Facilities Directory</h1>
          <p>Sorted by distance and specialized clinical capabilities (Oxygen, ICU, Emergency)</p>
        </div>
        <span class="badge-role ${isPatient ? 'badge-role-patient' : (isAdmin ? 'badge-role-admin' : 'badge-role-asha')}">
          ${isPatient ? 'Citizen Facility View' : (isAdmin ? 'Admin Resource Grid' : 'Frontline Referral Mode')}
        </span>
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
                  ${isSelected ? '✓ Selected' : (isPatient ? 'View Doctors at Facility' : 'Select Facility')}
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  bindFacilityEvents() {
    document.querySelectorAll(".select-facility-btn, .facility-card").forEach(el => {
      el.addEventListener("click", e => {
        const facId = e.currentTarget.getAttribute("data-facility-id");
        const fac = SWASTHYA_DATA.facilities.find(f => f.id === facId);
        if (fac) {
          this.selectedFacility = fac;
          if (this.currentRole === "PATIENT") {
            this.showToast(`Selected ${fac.name}. Viewing available doctors...`, "info");
            this.navigateTo("find-doctor");
          } else {
            this.renderCurrentView();
            this.showToast(`Selected: ${fac.name}`, "info");
          }
        }
      });
    });
  }

  runDemoJourney() {
    this.activePatient = JSON.parse(JSON.stringify(SWASTHYA_DATA.demoPatient));
    this.selectedFacility = SWASTHYA_DATA.facilities[0];
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

  requestJanAushadhiRefill() {
    this.showToast("Jan Aushadhi Subsidized Refill Requested for Amlodipine 5mg at Shirur Hub!", "success");
  }

  triggerSyncSimulation() {
    if (window.offlineStore) {
      window.offlineStore.triggerSync(count => {
        this.showToast(`Cloud Sync Complete • ${count} record(s) synchronized with State Health Portal`, "success");
      });
    }
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

  /* ==========================================================================
     UNIFIED ROLE-DETECTION LOGIN & AUTHENTICATION HANDLERS
     ========================================================================== */
  initAuthPage() {
    this.detectedAuthRole = "PATIENT";
    this.currentAuthMode = "otp";
    const input = document.getElementById("identifier-input");
    if (input && input.value) {
      this.handleIdentifierInput(input.value);
    }
  }

  detectRole(rawVal) {
    const val = (rawVal || "").trim();
    if (!val) {
      return {
        role: null,
        label: "Awaiting ID",
        icon: "search",
        pillClass: "",
        cardId: null,
        helper: "Type an identifier to auto-match your cadence profile",
        ctaText: "Authenticate & Enter Workspace"
      };
    }

    const lower = val.toLowerCase();

    // 1. Doctor / Medical Officer: MMC/NMC/SMC Registration Number or 'Dr.' prefix
    if (/^(nmc|smc|mci|dr\b|mmc|doc)/i.test(lower) || lower.startsWith("dr.") || lower.includes("2012-08-2940") || lower.startsWith("dr ")) {
      return {
        role: "DOCTOR",
        label: "Doctor (NMC/MMC)",
        icon: "stethoscope",
        pillClass: "is-doctor",
        cardId: "card-doctor",
        helper: "Matched Medical Officer / Physician (e.g. MMC-2012-08-2940)",
        ctaText: "Enter Doctor Clinical Station"
      };
    }

    // 2. ASHA / ANM Frontline Worker ID
    if (/^(asha|anm)/i.test(lower) || lower.includes("asha-") || lower.includes("anm-") || lower.includes("2409")) {
      return {
        role: "ASHA",
        label: "ASHA Worker (NHM)",
        icon: "diversity_1",
        pillClass: "is-asha",
        cardId: "card-asha",
        helper: "Matched ASHA / ANM Frontline Healthcare Worker (e.g. ASHA-2409)",
        ctaText: "Access ASHA Field Workspace"
      };
    }

    // 3. Health Admin / CMO: Govt or NIC Email or Admin keyword
    if (lower.includes("@") || lower.includes("gov.in") || lower.includes("nic.in") || lower.includes("admin") || lower.includes("cmo") || lower.includes("dho") || lower.includes("mohfw")) {
      return {
        role: "ADMIN",
        label: "Health Admin (MoHFW)",
        icon: "shield_person",
        pillClass: "is-admin",
        cardId: "card-admin",
        helper: "Matched District / State Public Health Administrator",
        ctaText: "Access Health Admin Console"
      };
    }

    // 4. Citizen / Patient: ABHA ID (14 digits with or without hyphens) or 10-digit mobile number or standard digits
    if (/^(\d{2}-?\d{4}-?\d{4}-?\d{4}|\d{10}|\d{6,})$/.test(val.replace(/\s+/g, '')) || lower.startsWith("abha") || lower.includes("patil")) {
      return {
        role: "PATIENT",
        label: "Citizen / ABHA Patient",
        icon: "person",
        pillClass: "is-patient",
        cardId: "card-citizen",
        helper: "Matched Citizen / ABHA Beneficiary Profile",
        ctaText: "Enter Citizen Health Portal"
      };
    }

    // Default fallback to Citizen / Patient
    return {
      role: "PATIENT",
      label: "Citizen Access",
      icon: "person",
      pillClass: "is-patient",
      cardId: "card-citizen",
      helper: "Resolving as Citizen ABHA / Mobile access",
      ctaText: "Authenticate as Citizen"
    };
  }

  handleIdentifierInput(val) {
    const detection = this.detectRole(val);
    this.detectedAuthRole = detection.role || "PATIENT";

    // Update pill
    const rolePill = document.getElementById("role-pill");
    if (rolePill) {
      rolePill.className = `role-pill-detector ${detection.pillClass || ''}`;
      rolePill.innerHTML = `
        <span class="material-symbols-outlined text-[14px]">${detection.icon}</span>
        <span id="role-pill-text">${detection.label}</span>
      `;
    }

    // Update clear button
    const clearBtn = document.getElementById("input-clear-btn");
    if (clearBtn) {
      clearBtn.classList.toggle("hidden", !(val && val.length > 0));
    }

    // Update helper detector text
    const helperEl = document.getElementById("helper-detector");
    if (helperEl) {
      helperEl.textContent = detection.helper;
    }

    // Update submit button text
    const ctaText = document.getElementById("login-cta-text");
    if (ctaText) {
      ctaText.textContent = detection.ctaText;
    }

    // Highlight matching cadre card
    document.querySelectorAll(".cadre-card").forEach(card => {
      card.classList.remove("is-selected");
    });
    if (detection.cardId) {
      const card = document.getElementById(detection.cardId);
      if (card) {
        card.classList.add("is-selected");
      }
    }
  }

  clearIdentifierInput() {
    const input = document.getElementById("identifier-input");
    if (input) {
      input.value = "";
      input.focus();
    }
    this.handleIdentifierInput("");
  }

  setAuthMode(mode) {
    this.currentAuthMode = mode;

    // Update tab active classes
    document.querySelectorAll(".auth-mode-tab").forEach(tab => {
      tab.classList.toggle("is-active", tab.getAttribute("data-mode") === mode);
    });

    const area = document.getElementById("credential-payload-area");
    if (!area) return;

    if (mode === "otp") {
      area.innerHTML = `
        <label class="block text-xs font-bold text-neutral" for="credential-input" id="credential-label">
          Enter 6-digit OTP Code
        </label>
        <div class="relative">
          <input class="form-input text-sm w-full font-numeric tracking-widest text-center" id="credential-input" maxlength="6" placeholder="••••••" type="text" value="940128">
          <button class="absolute right-3 top-2.5 text-primary text-xs font-bold hover:underline" id="resend-btn" type="button" onclick="app.triggerAuthResend()">
            Get OTP
          </button>
        </div>
      `;
    } else if (mode === "pin") {
      area.innerHTML = `
        <label class="block text-xs font-bold text-neutral" for="credential-input" id="credential-label">
          Enter 4-digit Security MPIN
        </label>
        <div class="relative">
          <input class="form-input text-sm w-full font-numeric tracking-widest text-center" id="credential-input" maxlength="4" placeholder="••••" type="password" value="2409">
          <button class="absolute right-3 top-2.5 text-secondary text-xs font-bold hover:underline" type="button" onclick="app.showToast('Reset link sent to registered mobile', 'info')">
            Forgot MPIN?
          </button>
        </div>
      `;
    } else if (mode === "bio") {
      area.innerHTML = `
        <div class="bg-surface-container-low p-4 rounded-xl border border-dashed border-primary text-center flex flex-col items-center justify-center gap-1 cursor-pointer" onclick="app.showToast('Biometric scanner initialized. Fingerprint matched (ABDM RD-Service v2)', 'success')">
          <span class="material-symbols-outlined text-[40px] text-primary" style="animation: pulse 1.5s infinite;">fingerprint</span>
          <strong class="text-xs font-bold text-primary">ABDM RD-Service Sensor Active</strong>
          <span class="text-[11px] text-muted">Touch connected biometric scanner / Iris sensor to verify</span>
          <span class="badge-role badge-role-patient text-[10px] mt-1">L1 Hardware Biometric Certified</span>
        </div>
      `;
    }
  }

  fillQuick(val) {
    const input = document.getElementById("identifier-input");
    if (input) {
      input.value = val;
      input.focus();
    }
    this.handleIdentifierInput(val);
    this.showToast(`Populated identifier: "${val}"`, "info");
  }

  selectCadre(cadreType, sampleVal) {
    this.detectedAuthRole = cadreType;
    const input = document.getElementById("identifier-input");
    if (input) {
      input.value = sampleVal;
    }
    this.handleIdentifierInput(sampleVal);
    this.showToast(`Selected cadre: ${cadreType}. Credentials pre-filled.`, "info");
  }

  triggerAuthResend() {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const credInput = document.getElementById("credential-input");
    if (credInput) {
      credInput.value = newOtp;
    }
    this.showToast(`ABDM OTP dispatched: ${newOtp} (Expires in 5 mins)`, "success");
  }

  handleAuthSubmit() {
    const consent = document.getElementById("consent-check");
    if (consent && !consent.checked) {
      this.showToast("Please consent to ABDM authentication guidelines to proceed.", "warning");
      return;
    }

    const input = document.getElementById("identifier-input");
    const val = input ? input.value : "";
    const detection = this.detectRole(val);
    const targetRole = detection.role || this.detectedAuthRole || "PATIENT";

    this.showToast(`Authentication successful for ${targetRole}. Loading workspace...`, "success");

    setTimeout(() => {
      this.setRole(targetRole);
    }, 400);
  }
}

window.SwasthyaApp = SwasthyaApp;

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new SwasthyaApp();
});


