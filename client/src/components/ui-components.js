/**
 * SwasthyaSetu Reusable UI Components
 * Centralized components: Brand Placeholder, Navigation, MetricTile, DoctorCard, AppointmentCard, Modals, Badges
 * Design Reference: Stitch Project 11062066934146902009
 */

class SwasthyaUI {
  /**
   * Centralized Logo & Branding Placeholder
   * When official logo is provided, it replaces the emblem centrally here.
   */
  static renderBrandLogo(subtitle = "Rural Healthcare Network") {
    return `
      <a href="index.html" class="header-brand" title="SwasthyaSetu - Rural Healthcare Continuity Platform">
        <div class="brand-logo-wrap">
          <img src="src/assets/emblem.svg" alt="SwasthyaSetu Emblem" class="brand-emblem">
        </div>
        <div class="brand-title-group">
          <span class="brand-title" data-i18n="app_title">SwasthyaSetu</span>
          <span class="brand-subtitle">${subtitle}</span>
        </div>
      </a>
    `;
  }

  /**
   * Reusable Metric Tile Component
   */
  static renderMetricTile({ label, value, subtext, icon, colorTheme = "green", badge = "", i18nKey = "" }) {
    const iconClass = `is-${colorTheme}`;
    return `
      <div class="metric-tile">
        <div class="metric-tile-top">
          <span class="metric-tile-label" ${i18nKey ? `data-i18n="${i18nKey}"` : ''}>${label}</span>
          <div class="metric-tile-icon ${iconClass}">
            <span class="material-symbols-outlined text-[18px]">${icon}</span>
          </div>
        </div>
        <div class="flex items-baseline gap-xs">
          <span class="metric-tile-value">${value}</span>
          ${badge ? `<span class="metric-badge ${iconClass}">${badge}</span>` : ''}
        </div>
        ${subtext ? `<div class="metric-tile-footer">${subtext}</div>` : ''}
      </div>
    `;
  }

  /**
   * Reusable Doctor Card Component (Patient Find Doctor / Booking)
   */
  static renderDoctorCard(doctor, isSelected = false) {
    const isAvailable = doctor.availableToday || doctor.availableTomorrow;
    return `
      <article class="doctor-card ${isSelected ? 'is-selected' : ''}" id="doc-card-${doctor.id}" data-doctor-id="${doctor.id}">
        <div class="doctor-card-body">
          <div class="doctor-avatar-box">
            <div class="doctor-avatar-initials">${doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}</div>
            <span class="doctor-verified-badge" title="ABDM & MMC Registered Doctor">
              <span class="material-symbols-outlined text-[14px]">verified</span>
            </span>
          </div>

          <div class="doctor-info-box">
            <div class="flex flex-wrap items-center justify-between gap-xs">
              <div class="flex items-center gap-xs">
                <h3 class="doctor-name">${doctor.name}</h3>
                <span class="qualification-tag">${doctor.qualifications}</span>
              </div>
              <div class="doctor-rating-pill">
                <span class="material-symbols-outlined text-[15px] text-amber-500" style="font-variation-settings:'FILL' 1;">star</span>
                <strong>${doctor.rating}</strong>
                <span class="text-xs text-muted">(${doctor.totalVisits})</span>
              </div>
            </div>

            <p class="doctor-specialty">${doctor.specialty}</p>

            <p class="doctor-facility-location">
              <span class="material-symbols-outlined text-[16px] text-muted">location_on</span>
              <span>${doctor.facility} • <strong class="text-neutral font-semibold">${doctor.distance}</strong></span>
            </p>

            <div class="doctor-meta-tags">
              <span class="meta-tag">
                <span class="material-symbols-outlined text-[15px]">work_history</span>
                <span>${doctor.experience}</span>
              </span>
              <span class="meta-tag">
                <span class="material-symbols-outlined text-[15px]">translate</span>
                <span>${doctor.languages}</span>
              </span>
              <span class="meta-tag empanelment">
                <span class="material-symbols-outlined text-[15px]">health_and_safety</span>
                <span>${doctor.empanelment}</span>
              </span>
            </div>

            <!-- Slot and Fee Strip -->
            <div class="doctor-slot-strip">
              <div class="flex flex-col">
                <span class="text-xs text-muted font-bold uppercase">Earliest Available Slot</span>
                <span class="slot-text">
                  <span class="status-dot-green"></span>
                  <strong>${doctor.earliestSlot}</strong>
                </span>
              </div>

              <div class="flex flex-col sm:items-end">
                <span class="text-xs text-muted font-bold uppercase">Consultation Fee</span>
                <span class="fee-text">
                  <span class="material-symbols-outlined text-[16px] text-green-700">verified_user</span>
                  <strong>${doctor.fee}</strong>
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="doctor-actions">
              <button class="btn btn-primary btn-sm flex-1 book-doctor-btn" data-doctor-id="${doctor.id}">
                <span class="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>Select & Book Slot</span>
              </button>
              <button class="btn btn-secondary btn-sm view-doctor-profile-btn" data-doctor-id="${doctor.id}">
                <span class="material-symbols-outlined text-[18px]">badge</span>
                <span>View Details & Timings</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Reusable Appointment Card Component (Patient & Doctor)
   */
  static renderAppointmentCard(apt, isPast = false) {
    return `
      <div class="appointment-card ${isPast ? 'is-past' : 'is-upcoming'}">
        <div class="appointment-card-header">
          <div>
            <span class="badge-role ${isPast ? 'badge-role-admin' : 'badge-role-doctor'}">${apt.type}</span>
            <h3 class="appointment-doctor-name">${apt.doctorName}</h3>
            <p class="text-xs text-muted">${apt.specialty} • ${apt.facility}</p>
          </div>
          <div class="text-right">
            <span class="status-pill ${apt.statusClass || 'status-confirmed'}">${apt.status}</span>
            ${apt.token ? `<div class="token-pill">${apt.token}</div>` : ''}
          </div>
        </div>

        <div class="appointment-card-body">
          <div class="appointment-detail-row">
            <span class="flex items-center gap-xs text-xs text-muted">
              <span class="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <strong>${apt.date}</strong>
            </span>
            <span class="flex items-center gap-xs text-xs text-muted">
              <span class="material-symbols-outlined text-[16px] text-primary">schedule</span>
              <strong>${apt.time}</strong>
            </span>
            <span class="flex items-center gap-xs text-xs text-muted">
              <span class="material-symbols-outlined text-[16px] text-secondary">videocam</span>
              <span>${apt.mode}</span>
            </span>
          </div>

          ${apt.outcome ? `
            <div class="appointment-outcome-box">
              <strong>Clinical Outcome:</strong> ${apt.outcome}
            </div>
          ` : ''}
        </div>

        <div class="appointment-card-footer">
          <span class="text-xs text-muted font-bold">${apt.fee || 'FREE (Govt / NHM)'}</span>
          <div class="flex items-center gap-xs">
            ${!isPast ? `
              <button class="btn btn-ghost btn-sm" onclick="app.cancelAppointment('${apt.id}')">Cancel</button>
              <button class="btn btn-secondary btn-sm" onclick="app.showToast('Downloading Appointment Slip & Token (PDF)...', 'success')">
                <span class="material-symbols-outlined text-[16px]">receipt_long</span> Slip
              </button>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('prescriptions')">View Prescriptions</button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Reusable 7-Stage Patient Continuity Stepper
   */
  static renderJourneyStepper(activeStep = 4, patientName = "Ramesh Patil") {
    const steps = [
      { id: 1, label: "1. Profile", desc: "Talwade Home Survey", time: "09:14 AM" },
      { id: 2, label: "2. Vitals", desc: "SpO2 & BP Recorded", time: "09:22 AM" },
      { id: 3, label: "3. Triage", desc: "High Risk Flagged", time: "09:24 AM" },
      { id: 4, label: "4. Facility", desc: "PHC Shirur Bed Reserved", time: "09:40 AM" },
      { id: 5, label: "5. Referral", desc: "108 Transit Dispatched", time: "En Route" },
      { id: 6, label: "6. Doctor Care", desc: "Dr. Kulkarni Tele-Rx", time: "Consult Desk" },
      { id: 7, label: "7. Follow-up", desc: "ASHA Post-Care Check", time: "7-Day Target" }
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
              iconContent = '<span class="material-symbols-outlined text-[16px]">check</span>';
            } else if (s.id === activeStep) {
              stepClass = "is-active";
              iconContent = '<span class="material-symbols-outlined text-[16px]">apartment</span>';
            }
            return `
              <div class="journey-step ${stepClass}">
                <div class="journey-node">${iconContent}</div>
                <div class="journey-label">${s.label}</div>
                <div class="journey-subtext">${s.desc}</div>
                <div class="journey-time">${s.time}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }
}

window.SwasthyaUI = SwasthyaUI;
