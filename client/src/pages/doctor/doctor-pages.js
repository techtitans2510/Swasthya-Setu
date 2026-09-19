/**
 * SwasthyaSetu Doctor / Medical Officer Persona Module (`src/pages/doctor/doctor-pages.js`)
 * Clinical Workstation, Tele-Triage Queue, E-Prescriptions & OPD Schedules
 * Design Source of Truth: Stitch Screens b823cc8fddc74d8788914356340701f1 & 0752cfe5c21142cbbbbd54922648cce6
 */

class DoctorPages {
  /**
   * 1. Doctor Clinical Station & Tele-Triage Workstation
   */
  static renderClinicalStation(app) {
    const queue = SWASTHYA_DATA.doctorQueue || [];
    const activePatient = app.activeDoctorPatient || queue[0];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="doctor_station_title">Medical Officer Clinical Workstation</h1>
          <p data-i18n="doctor_station_sub">Shirur Primary Health Centre (24x7 PHC) • Dr. A. Kulkarni (MBBS, DNB)</p>
        </div>
        <div class="flex items-center gap-xs">
          <span class="status-pill status-confirmed">● On Duty (Room 4)</span>
          <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('availability')">Manage Availability</button>
        </div>
      </div>

      <div class="doctor-consult-layout">
        <!-- LEFT: Tele-Triage & OPD Queue -->
        <div class="view-sidebar-pane">
          <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
            <h3 style="font-size:1rem; font-weight:700;">Triage & OPD Queue</h3>
            <span class="tag-capability" style="font-size:0.6875rem;">${queue.length} Patients</span>
          </div>

          <div class="patient-queue-list">
            ${queue.map(p => {
              const isSelected = activePatient && activePatient.id === p.id;
              return `
                <div class="queue-patient-item ${isSelected ? 'is-selected' : ''}" onclick="app.selectDoctorQueuePatient('${p.id}')">
                  <div class="flex items-center justify-between">
                    <strong>${p.name}</strong>
                    <span class="risk-chip ${p.riskClass}" style="font-size:0.6875rem;">${p.riskLevel}</span>
                  </div>
                  <p class="text-xs text-muted" style="margin:2px 0;">${p.age}y / ${p.gender} • ${p.village}</p>
                  <p class="text-xs text-bold" style="color:var(--color-secondary); margin-top:4px;">${p.referralReason}</p>
                  <div class="flex items-center justify-between text-xs text-muted" style="margin-top:6px;">
                    <span>${p.arrivalTime}</span>
                    <span class="text-primary font-semibold">${p.status}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- RIGHT: Active Consultation & Prescription Room -->
        <div class="clinical-notes-box">
          <div class="flex flex-wrap items-center justify-between gap-sm" style="margin-bottom:var(--space-md); padding-bottom:var(--space-sm); border-bottom:1px solid var(--border-structural);">
            <div>
              <span class="badge-role badge-role-asha">Incoming Frontline Transfer</span>
              <h2 style="font-size:1.375rem; font-weight:800; margin-top:2px;">${activePatient.name} (${activePatient.age}y ${activePatient.gender})</h2>
              <span class="text-xs text-muted">ABHA ID: <strong class="numeric-id text-primary">${activePatient.abhaId}</strong> • Bed: <strong>${activePatient.bedAllocated || 'Oxygen Bay #4'}</strong></span>
            </div>
            <span class="risk-chip ${activePatient.riskClass}">${activePatient.riskLevel} PRIORITY</span>
          </div>

          <!-- Stepper: Stage 6 Active (Doctor Care) -->
          ${SwasthyaUI.renderJourneyStepper(6, activePatient.name)}

          <!-- Vitals Snapshot Alert -->
          <div class="alert alert-warning" style="margin:var(--space-md) 0;">
            <div class="flex items-center gap-xs" style="margin-bottom:4px;">
              <span class="material-symbols-outlined text-[18px]">vital_signs</span>
              <strong>Frontline Field Vitals (Recorded at Home):</strong>
            </div>
            <p class="text-xs" style="line-height:1.5;">
              ${activePatient.vitalsSummary || 'SpO2: 92% (Hypoxic) • BP: 160/98 mmHg • Pulse: 104 bpm • Temp: 101.4°F'}<br>
              <em>Reported Symptoms: ${activePatient.symptoms || 'Shortness of breath, chest tightness, fever for 36 hours.'}</em>
            </p>
          </div>

          <!-- Doctor Diagnosis & Clinical Notes -->
          <div class="form-group">
            <label class="form-label" data-i18n="doctor_diagnosis_label">Clinical Assessment & Diagnosis</label>
            <input type="text" class="form-input" id="docDiagnosisInput" 
              value="Acute exacerbation of COPD with Stage 2 Hypertension & Borderline Hypoxemia">
          </div>

          <!-- E-Prescription Writer -->
          <div class="form-group">
            <label class="form-label" data-i18n="doctor_orders_label">Electronic Prescription & Clinical Orders</label>
            <textarea class="form-textarea" id="docNotesInput" style="min-height:110px;">1. High-flow O2 initiated at 4 L/min via nasal cannula in Oxygen Stabilization Bay #4.
2. Nebulization with Salbutamol 2.5mg + Ipratropium stat.
3. Tab Amlodipine 5mg - 1 tab once daily in the morning (Jan Aushadhi).
4. Tab Cefixime 200mg - 1 tab twice daily for 5 days.
5. Delegated follow-up to ASHA Sunita More for Day 3 home SpO2 and BP monitoring.</textarea>
          </div>

          <!-- Delegation to ASHA Checkbox -->
          <div class="choice-control is-selected" style="margin-bottom:var(--space-lg);">
            <input type="checkbox" id="delegateAshaCheck" class="choice-input" checked>
            <div>
              <span class="choice-label-text">Delegate Post-Discharge Follow-up to ASHA Sunita More</span>
              <p class="choice-description">Automated notification and task assignment sent to frontline mobile app.</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-sm" style="padding-top:var(--space-md); border-top:1px solid var(--border-structural);">
            <button class="btn btn-secondary" onclick="app.showToast('Transferring clinical summary to Sassoon Hospital...', 'info')">
              <span class="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span>Escalate to District Hospital</span>
            </button>
            <button class="btn btn-primary" id="saveDoctorConsultBtn" onclick="app.saveDoctorConsultation()">
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
              <span data-i18n="btn_issue_prescription">Save Clinical Note & Issue Prescription</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 2. Doctor OPD Appointments Schedule
   */
  static renderAppointments(app) {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="nav_opd_schedule">Doctor OPD Schedule & Appointments</h1>
          <p>Shirur Primary Health Centre • Daily Consultation Tokens</p>
        </div>
        <span class="badge-role badge-role-doctor">OPD Room 4</span>
      </div>

      <div class="card" style="margin-bottom:var(--space-xl);">
        <div class="card-header">
          <div>
            <h3 class="card-title">Today's OPD Appointment Roster (21 Sep 2026)</h3>
            <p class="text-xs text-muted">Walk-ins and pre-booked Ayushman Bharat tokens</p>
          </div>
          <span class="tag-capability">18 Total Patients</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Type / Source</th>
                <th>Reason / Specialty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong class="text-primary">TOKEN-01</strong></td>
                <td>Ramesh Patil</td>
                <td>62y / Male</td>
                <td>108 Emergency Transfer</td>
                <td>Acute Hypoxemia</td>
                <td><span class="status-pill status-pending">In Bay</span></td>
                <td><button class="btn btn-primary btn-sm" onclick="app.navigateTo('consultations')">Examine</button></td>
              </tr>
              <tr>
                <td><strong class="text-primary">TOKEN-02</strong></td>
                <td>Kavita Rahul Rathod</td>
                <td>8y / Female</td>
                <td>ANM Field Referral</td>
                <td>Pediatric Dehydration</td>
                <td><span class="status-pill status-pending">Emergency</span></td>
                <td><button class="btn btn-primary btn-sm" onclick="app.navigateTo('consultations')">Examine</button></td>
              </tr>
              <tr>
                <td><strong class="text-primary">TOKEN-03</strong></td>
                <td>Sunita Jadhav</td>
                <td>28y / Female</td>
                <td>ASHA Scheduled Visit</td>
                <td>ANC 28 Weeks Review</td>
                <td><span class="status-pill status-confirmed">Waiting</span></td>
                <td><button class="btn btn-secondary btn-sm" onclick="app.navigateTo('consultations')">Examine</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /**
   * 3. Doctor Availability Management
   */
  static renderAvailability(app) {
    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="doctor_availability_title">Doctor Duty & OPD Availability</h1>
          <p>Configure clinical hours, teleconsultation standby, and emergency room allocations</p>
        </div>
      </div>

      <div class="view-grid-2col">
        <div class="card">
          <h3 class="card-title" style="margin-bottom:var(--space-md);">Duty & Station Controls</h3>

          <div class="form-group">
            <label class="form-label" data-i18n="duty_status_label">Current Duty Status</label>
            <div class="segmented-mode-selector">
              <button type="button" class="mode-btn is-active" onclick="app.showToast('Duty status: ACTIVE ON DUTY', 'success')">
                <span class="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Active on Duty</span>
              </button>
              <button type="button" class="mode-btn" onclick="app.showToast('Duty status: AWAY / OFF DUTY', 'warning')">
                <span class="material-symbols-outlined text-[16px]">pause_circle</span>
                <span>Away / Off Duty</span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Assigned Medical Facility</label>
            <input type="text" class="form-input" value="Shirur 24x7 Primary Health Centre (PHC)" readonly>
          </div>

          <div class="form-group">
            <label class="form-label">Consultation Room / Desk</label>
            <input type="text" class="form-input" value="OPD Consultation Room #4 • Main Building">
          </div>

          <div class="form-group">
            <label class="form-label" data-i18n="opd_timings_label">Daily OPD Hours</label>
            <input type="text" class="form-input" value="Morning: 08:30 AM - 01:30 PM • Evening: 04:00 PM - 07:00 PM">
          </div>

          <button class="btn btn-primary" style="margin-top:var(--space-sm);" onclick="app.showToast('Duty schedule updated successfully!', 'success')">
            Save Availability Settings
          </button>
        </div>

        <div class="card">
          <h3 class="card-title" style="margin-bottom:var(--space-md);">Teleconsultation & Emergency Linkage</h3>
          
          <div class="alert alert-info" style="margin-bottom:var(--space-md);">
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-[18px]">videocam</span>
              <strong>Tele-Triage Active</strong>
            </div>
            <p class="text-xs" style="margin-top:4px;">Direct audio/video consultation link enabled for frontline ASHAs in Talwade and Pabal clusters.</p>
          </div>

          <div class="facility-readiness-row" style="margin-bottom:8px;">
            <span class="text-xs font-bold">Maharashtra Medical Council (MMC)</span>
            <span class="tag-capability">Verified (MMC-2012-08-2940)</span>
          </div>

          <div class="facility-readiness-row">
            <span class="text-xs font-bold">National ABDM Healthcare Provider ID</span>
            <span class="numeric-id text-primary font-bold">HPR-2710-9941</span>
          </div>
        </div>
      </div>
    `;
  }
}

window.DoctorPages = DoctorPages;
