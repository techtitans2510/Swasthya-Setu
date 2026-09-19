/**
 * SwasthyaSetu Patient / Citizen Persona Module (`src/pages/patient/patient-pages.js`)
 * Strictly tailored for Healthcare Recipients / Citizens (Ramesh Patil, 62Y, ABHA ID 91-4029-1823-0192)
 * Eliminates all ASHA-specific terminology and field workflows from the patient portal.
 * Design Source of Truth: Stitch Screens fa0746731f55460b91ff17531b806b6d, 887fcd04f1fc407da16ccf256d3aee19, 7078ccfc023f4e1d8cb7bfacc82f9807
 */

class PatientPages {
  /**
   * 1. Patient Home / Dashboard (Stitch Screen fa074673)
   */
  static renderHome(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;
    const nextApt = c.upcomingAppointments && c.upcomingAppointments.length > 0 
      ? c.upcomingAppointments[0] 
      : null;

    return `
      <div class="patient-portal-layout">
        <!-- Top Welcome & ABHA Identity Bar -->
        <div class="citizen-welcome-hero">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-base">
            <div class="flex flex-col gap-space-xs">
              <div class="flex items-center gap-space-sm">
                <h1 class="font-headline-xl text-primary font-bold tracking-tight">Good morning, ${c.name}</h1>
                <span class="text-headline-lg">👋</span>
              </div>
              <p class="font-body-lg text-muted max-w-2xl">
                Welcome to your personal health portal. Here is your daily care schedule, upcoming visits, and active prescriptions.
              </p>
            </div>

            <!-- Verified ABHA ID Pill -->
            <div class="citizen-abha-pill">
              <div class="abha-icon-circle">
                <span class="material-symbols-outlined text-[24px]">badge</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-xs">
                  <span class="text-xs font-bold uppercase text-muted tracking-wider">Ayushman Bharat ID</span>
                  <span class="material-symbols-outlined text-[15px] text-primary" title="ABDM Verified">verified</span>
                  <span class="text-xs text-primary font-semibold">ABDM Verified</span>
                </div>
                <div class="flex items-center gap-sm mt-0.5">
                  <span class="numeric-id text-primary font-bold text-base tracking-wider">${c.abhaId}</span>
                  <button type="button" class="copy-btn-icon" onclick="app.copyAbhaId('${c.abhaId}')" title="Copy ABHA ID">
                    <span class="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- HERO CARD: Your Next Appointment (In 2 Days) -->
        ${nextApt ? `
          <section class="patient-hero-appointment-card">
            <div class="hero-card-accent-bar"></div>
            <div class="hero-card-content">
              <div class="hero-card-main">
                <div class="flex flex-wrap items-center gap-sm" style="margin-bottom:var(--space-sm);">
                  <span class="badge-pill badge-pill-secondary">
                    <span class="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>Your Next Appointment · ${nextApt.relativeDate || 'Upcoming'}</span>
                  </span>
                  <span class="badge-pill badge-pill-neutral">
                    ${nextApt.mode}
                  </span>
                  <span class="badge-pill badge-pill-success">
                    ${nextApt.token || 'Token #14'}
                  </span>
                </div>

                <div class="flex items-start gap-md mt-sm">
                  <div class="doctor-hero-avatar">
                    <span class="material-symbols-outlined text-[32px]">stethoscope</span>
                  </div>
                  <div>
                    <h2 class="font-headline-lg text-primary font-bold" style="font-size:1.375rem;">
                      ${nextApt.doctorName}, <span class="font-normal text-muted" style="font-size:1rem;">${nextApt.degrees || 'MD, DM'}</span>
                    </h2>
                    <p class="text-secondary font-semibold text-sm" style="margin-top:2px;">
                      ${nextApt.specialty}
                    </p>

                    <div class="flex flex-col sm:flex-row sm:items-center gap-y-xs gap-x-lg text-muted text-xs" style="margin-top:8px;">
                      <span class="flex items-center gap-xs">
                        <span class="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        <strong>${nextApt.date} · ${nextApt.time}</strong>
                      </span>
                      <span class="flex items-center gap-xs">
                        <span class="material-symbols-outlined text-[16px] text-primary">apartment</span>
                        <span>${nextApt.facility}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="hero-purpose-box">
                  <span class="material-symbols-outlined text-[18px] text-primary">info</span>
                  <span class="text-xs">
                    <strong>Purpose:</strong> ${nextApt.type || 'Post-stabilization monthly follow-up & 12-Lead ECG progression check.'}
                  </span>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="hero-card-actions">
                <button class="btn btn-primary w-full" onclick="app.openDirectionsModal('${nextApt.facility}')">
                  <span class="material-symbols-outlined text-[18px]">directions</span>
                  <span>View OPD Directions</span>
                </button>
                <button class="btn btn-secondary w-full" onclick="app.openRescheduleModal('${nextApt.id}')">
                  <span class="material-symbols-outlined text-[18px]">edit_calendar</span>
                  <span>Reschedule Visit</span>
                </button>
                <button class="btn btn-ghost w-full" onclick="app.openTokenSlipModal('${nextApt.id}')">
                  <span class="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Token Slip</span>
                </button>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 4 Citizen Quick Action Tiles -->
        <section class="citizen-action-grid">
          <div class="citizen-action-tile is-clickable" onclick="app.navigateTo('find-doctor')">
            <div class="flex items-center justify-between">
              <div class="citizen-action-icon" style="background:#E0F2FE; color:#0369A1;">
                <span class="material-symbols-outlined text-[24px]">search</span>
              </div>
              <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
            </div>
            <div style="margin-top:12px;">
              <h3 class="font-bold text-base" style="color:var(--color-neutral);">Find Doctor</h3>
              <p class="text-xs text-muted" style="margin-top:2px;">Nearby clinics, specialists & OPDs</p>
            </div>
          </div>

          <div class="citizen-action-tile is-clickable" onclick="app.navigateTo('appointments')">
            <div class="flex items-center justify-between">
              <div class="citizen-action-icon" style="background:#DCFCE7; color:#166534;">
                <span class="material-symbols-outlined text-[24px]">event_available</span>
              </div>
              <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
            </div>
            <div style="margin-top:12px;">
              <h3 class="font-bold text-base" style="color:var(--color-neutral);">Book Appointment</h3>
              <p class="text-xs text-muted" style="margin-top:2px;">Simple booking for routine checkups</p>
            </div>
          </div>

          <div class="citizen-action-tile is-clickable" onclick="app.navigateTo('prescriptions')">
            <div class="flex items-center justify-between">
              <div class="citizen-action-icon" style="background:#FEF3C7; color:#92400E;">
                <span class="material-symbols-outlined text-[24px]">medication</span>
              </div>
              <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
            </div>
            <div style="margin-top:12px;">
              <h3 class="font-bold text-base" style="color:var(--color-neutral);">My Prescriptions</h3>
              <p class="text-xs text-muted" style="margin-top:2px;">Today's doses & Jan Aushadhi refills</p>
            </div>
          </div>

          <div class="citizen-action-tile is-clickable" onclick="app.navigateTo('medical-records')">
            <div class="flex items-center justify-between">
              <div class="citizen-action-icon" style="background:#EDE9FE; color:#6B21A8;">
                <span class="material-symbols-outlined text-[24px]">receipt_long</span>
              </div>
              <span class="material-symbols-outlined text-muted text-[18px]">arrow_forward</span>
            </div>
            <div style="margin-top:12px;">
              <h3 class="font-bold text-base" style="color:var(--color-neutral);">Medical Records</h3>
              <p class="text-xs text-muted" style="margin-top:2px;">Lab results, ECGs & clinic summaries</p>
            </div>
          </div>
        </section>

        <!-- Main Bento Grid: Left Column (8 cols) & Right Column (4 cols) -->
        <div class="patient-home-bento-grid">
          <!-- LEFT COLUMN -->
          <div class="flex flex-col gap-base">
            <!-- 1. Today's Medicine Schedule -->
            <div class="card">
              <div class="card-header">
                <div>
                  <h2 class="font-headline-md font-bold" style="font-size:1.125rem;">Today's Medicine Schedule</h2>
                  <p class="text-xs text-muted">Always take prescribed medicines with or after drinking warm water.</p>
                </div>
                <span class="badge-pill badge-pill-neutral font-bold text-xs" id="medicineProgressBadge">
                  <span class="material-symbols-outlined text-[16px] text-primary">done_all</span>
                  <span>${c.prescriptions.filter(p => p.taken).length} of ${c.prescriptions.filter(p => p.frequency).length} taken</span>
                </span>
              </div>

              <!-- Doses List -->
              <div class="flex flex-col gap-sm" style="margin-top:var(--space-md);" id="medicineScheduleList">
                ${c.prescriptions.filter(p => p.frequency).map(p => `
                  <div class="medicine-dose-row ${p.taken ? 'is-taken' : (p.status === 'Due Now' ? 'is-due' : '')}">
                    <div class="flex items-center gap-md">
                      <div class="medicine-dose-icon ${p.frequency === 'Morning' ? 'is-morning' : (p.frequency === 'Afternoon' ? 'is-afternoon' : 'is-night')}">
                        <span class="material-symbols-outlined text-[22px]">
                          ${p.frequency === 'Morning' ? 'wb_sunny' : (p.frequency === 'Afternoon' ? 'sunny' : 'bedtime')}
                        </span>
                      </div>
                      <div>
                        <div class="flex items-center gap-xs">
                          <span class="text-xs font-bold text-muted uppercase">${p.frequency} · ${p.scheduleTime}</span>
                          <span class="dosage-instruction-tag">${p.instructions || 'After Meal'}</span>
                        </div>
                        <h4 class="font-bold text-base" style="color:var(--color-neutral); margin-top:2px;">${p.medicine}</h4>
                        <p class="text-xs text-muted">${p.indication || 'Prescribed medicine'} · ${p.dosage}</p>
                      </div>
                    </div>

                    <div>
                      ${p.taken ? `
                        <span class="badge-taken">
                          <span class="material-symbols-outlined text-[16px]">check_circle</span>
                          <span>Taken at ${p.takenAt || '8:15 AM'}</span>
                        </span>
                      ` : (p.status === 'Due Now' ? `
                        <button type="button" class="btn btn-primary btn-sm" onclick="app.markMedicineTaken('${p.id}')">
                          <span class="material-symbols-outlined text-[16px]">check</span>
                          <span>Mark as Taken</span>
                        </button>
                      ` : `
                        <span class="text-xs text-muted font-semibold px-2 py-1 bg-surface-container rounded-pill">
                          Upcoming tonight
                        </span>
                      `)}
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- Jan Aushadhi Refill Progress Mini Banner -->
              <div class="jan-aushadhi-refill-banner">
                <div class="flex items-center gap-md">
                  <div class="w-10 h-10 rounded-full bg-surface-card flex items-center justify-center text-primary flex-shrink-0">
                    <span class="material-symbols-outlined text-[20px]">local_pharmacy</span>
                  </div>
                  <div>
                    <strong class="text-xs font-bold" style="color:var(--color-primary);">Jan Aushadhi Kendra Refill Status</strong>
                    <p class="text-xs text-muted">You have 18 days of regular medication remaining</p>
                  </div>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="app.requestJanAushadhiRefill()">
                  <span class="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>Order Subsidized Refill</span>
                </button>
              </div>
            </div>

            <!-- 2. Recent Healthcare Activity Timeline -->
            <div class="card">
              <div class="card-header">
                <div>
                  <h2 class="font-headline-md font-bold" style="font-size:1.125rem;">Recent Healthcare Activity</h2>
                  <p class="text-xs text-muted">Records synced directly from government PHC & hospital network.</p>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="app.navigateTo('medical-records')">
                  <span>View All Records</span>
                  <span class="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>

              <div class="citizen-activity-feed">
                <!-- Activity 1 -->
                <div class="activity-feed-item">
                  <div class="activity-bullet is-primary"></div>
                  <div class="activity-content-box">
                    <div class="flex flex-wrap items-center justify-between gap-xs">
                      <span class="text-xs font-bold text-secondary uppercase">Yesterday · 11:20 AM</span>
                      <span class="text-xs text-muted">Shirur Primary Health Centre (PHC)</span>
                    </div>
                    <h4 class="font-bold text-sm" style="color:var(--color-neutral); margin-top:2px;">Routine Blood Pressure Checkup</h4>
                    <p class="text-xs text-muted" style="margin-top:2px;">
                      Recorded: <strong class="text-primary">138 / 88 mmHg</strong> (Heart Rate 74 bpm). Classified as Stable. Nurse recommended low salt intake.
                    </p>
                  </div>
                </div>

                <!-- Activity 2 -->
                <div class="activity-feed-item">
                  <div class="activity-bullet is-secondary"></div>
                  <div class="activity-content-box">
                    <div class="flex flex-wrap items-center justify-between gap-xs">
                      <span class="text-xs font-bold text-secondary uppercase">3 Days Ago · 20 Oct</span>
                      <span class="text-xs text-muted">Dr. Rajesh Kulkarni, Medical Officer</span>
                    </div>
                    <h4 class="font-bold text-sm" style="color:var(--color-neutral); margin-top:2px;">12-Lead Diagnostic ECG Record Uploaded</h4>
                    <p class="text-xs text-muted" style="margin-top:2px;">
                      Normal sinus rhythm with mild non-specific ST variations. Doctor added clinical notes for Friday's cardiology review.
                    </p>
                    <div style="margin-top:6px;">
                      <button class="btn btn-ghost btn-sm" style="padding:0; color:var(--color-primary); font-weight:700;" onclick="app.openEcgViewerModal()">
                        <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                        <span>View ECG Report (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Activity 3 -->
                <div class="activity-feed-item">
                  <div class="activity-bullet is-neutral"></div>
                  <div class="activity-content-box">
                    <div class="flex flex-wrap items-center justify-between gap-xs">
                      <span class="text-xs font-bold text-muted uppercase">Last Week · 16 Oct</span>
                      <span class="text-xs text-muted">Jan Aushadhi Counter</span>
                    </div>
                    <h4 class="font-bold text-sm" style="color:var(--color-neutral); margin-top:2px;">Chronic Care Prescription Renewed (30 Days)</h4>
                    <p class="text-xs text-muted" style="margin-top:2px;">
                      30-day course issued under the Free Medicine Distribution Scheme (Telmisartan & Atorvastatin).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="flex flex-col gap-base">
            <!-- 1. Care Reminders -->
            <div class="card">
              <div class="flex items-center justify-between" style="margin-bottom:var(--space-md);">
                <h3 class="font-headline-sm font-bold" style="font-size:1rem; color:var(--color-neutral);">Care Reminders</h3>
                <span class="status-dot-green"></span>
              </div>

              <div class="flex flex-col gap-sm">
                <div class="care-reminder-pill">
                  <div class="reminder-icon-circle is-secondary">
                    <span class="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold" style="color:var(--color-neutral);">Appointment Confirmed</p>
                    <p class="text-xs text-muted" style="margin-top:2px;">Token #TOKEN-SAS-14 booked for Dr. Thorat at Sassoon Hospital for this Friday morning.</p>
                  </div>
                </div>

                <div class="care-reminder-pill">
                  <div class="reminder-icon-circle is-primary">
                    <span class="material-symbols-outlined text-[18px]">lab_profile</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold" style="color:var(--color-neutral);">Lab Result Ready</p>
                    <p class="text-xs text-muted" style="margin-top:2px;">Serum Troponin-I test completed: Normal safe reading (&lt;0.01 ng/mL).</p>
                  </div>
                </div>

                <div class="care-reminder-pill">
                  <div class="reminder-icon-circle is-tint">
                    <span class="material-symbols-outlined text-[18px]">nature_people</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold" style="color:var(--color-neutral);">Daily Health Tip</p>
                    <p class="text-xs text-muted" style="margin-top:2px;">Drink 2 liters of warm water throughout the day. Take a gentle 20-minute walk after 5:30 PM.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. "Need Help or Advice?" Helpline Card -->
            <div class="patient-help-card">
              <div class="flex items-center gap-xs" style="margin-bottom:6px;">
                <span class="material-symbols-outlined text-[20px]">contact_phone</span>
                <h3 class="font-headline-sm font-bold text-white" style="font-size:1.0625rem;">Need Help or Advice?</h3>
              </div>
              <p class="text-xs text-emerald-100" style="margin-bottom:var(--space-md); line-height:1.4;">
                Toll-free government numbers and your primary medical center are ready 24 hours a day.
              </p>

              <div class="flex flex-col gap-sm">
                <a href="tel:104" class="helpline-link-row">
                  <div class="flex items-center gap-sm">
                    <div class="w-8 h-8 rounded-full bg-surface-card text-primary flex items-center justify-center flex-shrink-0">
                      <span class="material-symbols-outlined text-[18px]">support_agent</span>
                    </div>
                    <div>
                      <span class="text-xs font-bold block">National Health Line</span>
                      <span class="text-[11px] text-muted">24x7 Doctor Advice</span>
                    </div>
                  </div>
                  <strong class="text-primary font-bold text-base">104</strong>
                </a>

                <a href="tel:108" class="helpline-link-row is-emergency">
                  <div class="flex items-center gap-sm">
                    <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0">
                      <span class="material-symbols-outlined text-[18px]">ambulance</span>
                    </div>
                    <div>
                      <span class="text-xs font-bold block">Free Emergency Ambulance</span>
                      <span class="text-[11px] opacity-80">Immediate Dispatch</span>
                    </div>
                  </div>
                  <strong class="font-bold text-base">108</strong>
                </a>

                <!-- Registered PHC Box -->
                <div class="registered-phc-box">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-emerald-200 font-semibold">Your Registered PHC</span>
                    <span class="badge-role" style="background:#065F46; color:#D1FAE5; font-size:0.6875rem; padding:2px 6px;">Open Now</span>
                  </div>
                  <strong class="text-sm font-bold text-white block" style="margin-top:2px;">Shirur 24x7 Primary Health Centre</strong>
                  <div class="flex items-center justify-between" style="margin-top:4px;">
                    <span class="text-[11px] text-emerald-200">Sub-District Pune</span>
                    <a href="tel:+912137252100" class="text-xs font-bold text-white underline flex items-center gap-xs">
                      <span class="material-symbols-outlined text-[14px]">call</span>
                      <span>+91 2137 252100</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Decision Support Note -->
            <div class="decision-support-box">
              <span class="material-symbols-outlined text-[18px] text-muted flex-shrink-0">verified_user</span>
              <p class="text-xs text-muted italic">
                All appointments, test reports, and prescription refills displayed here are authorized by registered medical practitioners through ABDM.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 2. Patient Find Doctor & Book Appointment (Stitch Screen 887fcd04)
   */
  static renderFindDoctor(app) {
    const doctors = SWASTHYA_DATA.doctors || [];
    const selectedDoc = app.selectedDoctor || doctors[0];
    const activeCategory = app.activeDoctorCategory || "all";
    const searchQuery = (app.doctorSearchQuery || "").toLowerCase();

    const filteredDoctors = doctors.filter(doc => {
      const matchCat = activeCategory === "all" || doc.category === activeCategory;
      const matchSearch = !searchQuery || 
        doc.name.toLowerCase().includes(searchQuery) ||
        doc.specialty.toLowerCase().includes(searchQuery) ||
        doc.facility.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    return `
      <div class="patient-find-doctor-layout">
        <!-- Top Accessibility & Citizen Assist Ribbon -->
        <div class="citizen-assist-ribbon">
          <div class="flex items-center gap-md">
            <div class="assist-icon-circle">
              <span class="material-symbols-outlined text-[24px]">elderly</span>
            </div>
            <div>
              <div class="flex items-center gap-xs">
                <strong class="text-primary font-headline" style="font-size:1.0625rem;">Assisted Citizen Booking</strong>
                <span class="tag-capability" style="font-size:0.6875rem; padding:2px 6px;">Ayushman Bharat Active</span>
              </div>
              <p class="text-xs text-muted">
                Booking for <strong class="text-neutral">Ramesh Patil</strong> (62 Y) • ABHA ID: <span class="numeric-id text-primary font-bold">91-4029-1823-0192</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-xs">
            <button class="btn btn-secondary btn-sm" onclick="app.showToast('Audio Readout: Select a doctor and preferred appointment time slot.', 'info')">
              <span class="material-symbols-outlined text-[16px]">volume_up</span>
              <span>Audio Guide</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.i18n.setLanguage(window.i18n.currentLang === 'mr' ? 'en' : 'mr'); app.renderCurrentView();">
              <span class="material-symbols-outlined text-[16px]">translate</span>
              <span>मराठी / English</span>
            </button>
          </div>
        </div>

        <!-- Search Header Box -->
        <div class="doctor-search-box">
          <div class="max-w-3xl">
            <div class="flex items-center gap-xs text-secondary" style="margin-bottom:4px;">
              <span class="material-symbols-outlined text-[18px]">health_and_safety</span>
              <span class="text-xs font-bold uppercase tracking-wider">Verified Public Healthcare Network</span>
            </div>
            <h1 class="font-headline-xl text-primary font-extrabold" style="font-size:1.625rem; line-height:1.2;">
              Find a Doctor & Book Consultation
            </h1>
            <p class="text-sm text-muted" style="margin-top:4px;">
              Search verified specialists, primary health centres, and district civil hospitals. Zero out-of-pocket fees under NHM.
            </p>
          </div>

          <!-- Search Bar -->
          <div class="doctor-search-bar-row">
            <div class="doctor-search-input-wrap">
              <span class="material-symbols-outlined search-leading-icon">search</span>
              <input type="text" id="doctorSearchInput" class="doctor-search-input" 
                placeholder="Search by doctor name, specialty (e.g. Heart, General), or hospital..."
                value="${app.doctorSearchQuery || ''}"
                oninput="app.handleDoctorSearchInput(this.value)">
              <button class="search-voice-btn" title="Voice Search Assistance" onclick="app.showToast('Voice Search: Listening for doctor name or symptom...', 'info')">
                <span class="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
            <button class="btn btn-primary" onclick="app.handleDoctorSearch()">
              <span class="material-symbols-outlined text-[18px]">tune</span>
              <span>Search Network</span>
            </button>
          </div>

          <!-- Specialty Category Filter Pills -->
          <div class="specialty-filter-bar">
            <span class="text-xs text-muted font-bold uppercase" style="margin-right:4px;">Specialties:</span>
            <button class="filter-pill ${activeCategory === 'all' ? 'is-active' : ''}" onclick="app.setDoctorCategory('all')">
              All Specialists
            </button>
            <button class="filter-pill ${activeCategory === 'cardiology' ? 'is-active' : ''}" onclick="app.setDoctorCategory('cardiology')">
              Cardiology (Heart)
            </button>
            <button class="filter-pill ${activeCategory === 'general' ? 'is-active' : ''}" onclick="app.setDoctorCategory('general')">
              General Medicine / PHC
            </button>
            <button class="filter-pill ${activeCategory === 'orthopedics' ? 'is-active' : ''}" onclick="app.setDoctorCategory('orthopedics')">
              Orthopedics (Bone & Joint)
            </button>
            <button class="filter-pill ${activeCategory === 'gynecology' ? 'is-active' : ''}" onclick="app.setDoctorCategory('gynecology')">
              Gynecology / Women's Health
            </button>
            <button class="filter-pill ${activeCategory === 'pediatrics' ? 'is-active' : ''}" onclick="app.setDoctorCategory('pediatrics')">
              Pediatrics (Child Health)
            </button>
          </div>
        </div>

        <!-- Primary Dual-Pane Discovery Grid (7 Cols Left, 5 Cols Right) -->
        <div class="doctor-discovery-grid">
          <!-- LEFT PANE: Doctors List -->
          <div class="doctor-list-pane">
            <div class="flex items-center justify-between" style="margin-bottom:var(--space-md);">
              <div class="flex items-center gap-xs">
                <h2 class="font-headline-md font-bold" style="font-size:1.125rem;">Available Verified Doctors</h2>
                <span class="badge-role badge-role-patient">${filteredDoctors.length} Available</span>
              </div>
              <div class="flex items-center gap-xs text-xs text-muted">
                <span>Sort:</span>
                <select class="form-select" style="min-height:32px; padding:2px 8px; font-size:0.75rem;" onchange="app.showToast('Sorted doctors list', 'info')">
                  <option>Earliest Slot (Recommended)</option>
                  <option>Distance (Nearest First)</option>
                  <option>Experience (High to Low)</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col gap-base">
              ${filteredDoctors.length > 0 ? filteredDoctors.map(doc => `
                <div class="doctor-card ${selectedDoc && selectedDoc.id === doc.id ? 'is-selected' : ''}" id="doc-card-${doc.id}">
                  <div class="doctor-card-body">
                    <div class="doctor-avatar-box">
                      <div class="doctor-avatar-initials">
                        ${doc.name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('')}
                      </div>
                      ${doc.abdmVerified ? `
                        <div class="doctor-verified-badge" title="ABDM Verified Practitioner">
                          <span class="material-symbols-outlined text-[14px]">verified</span>
                        </div>
                      ` : ''}
                    </div>

                    <div class="doctor-info-box">
                      <div class="flex flex-wrap items-center justify-between gap-xs">
                        <div class="flex items-center gap-xs">
                          <h3 class="doctor-name">${doc.name}</h3>
                          <span class="qualification-tag">${doc.qualifications.split(',')[0]}</span>
                        </div>
                        <span class="doctor-rating-pill">
                          <span class="material-symbols-outlined text-[14px] text-amber-500" style="font-variation-settings:'FILL' 1;">star</span>
                          <strong>${doc.rating}</strong>
                          <span class="text-muted">(${doc.totalVisits})</span>
                        </span>
                      </div>

                      <p class="doctor-specialty">${doc.specialty}</p>

                      <div class="doctor-facility-location">
                        <span class="material-symbols-outlined text-[16px] text-secondary">apartment</span>
                        <span>${doc.facility}</span>
                      </div>

                      <div class="doctor-meta-tags">
                        <span class="meta-tag">
                          <span class="material-symbols-outlined text-[14px]">near_me</span>
                          <span>${doc.distance || 'Near PHC'}</span>
                        </span>
                        <span class="meta-tag">
                          <span class="material-symbols-outlined text-[14px]">work_history</span>
                          <span>${doc.experience}</span>
                        </span>
                        <span class="meta-tag empanelment">
                          <span class="material-symbols-outlined text-[14px]">health_and_safety</span>
                          <span>${doc.empanelment}</span>
                        </span>
                      </div>

                      <!-- Earliest Slot Strip -->
                      <div class="doctor-slot-strip">
                        <div class="slot-text">
                          <span class="status-dot-green"></span>
                          <span>Next Slot: <strong>${doc.earliestSlot}</strong></span>
                        </div>
                        <div class="fee-text">
                          <span class="material-symbols-outlined text-[16px]">verified</span>
                          <strong>${doc.fee}</strong>
                        </div>
                      </div>

                      <!-- Action Buttons -->
                      <div class="doctor-actions">
                        <button class="btn btn-primary btn-sm" onclick="app.selectDoctorForBooking('${doc.id}')">
                          <span class="material-symbols-outlined text-[16px]">event_available</span>
                          <span>Select & Book Slot</span>
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="app.openDoctorProfileModal('${doc.id}')">
                          <span class="material-symbols-outlined text-[16px]">person</span>
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join("") : `
                <div class="card text-center p-space-xl">
                  <span class="material-symbols-outlined text-muted text-[48px]">person_search</span>
                  <h3 class="font-bold text-base mt-sm">No doctors found for this query</h3>
                  <p class="text-xs text-muted mt-xs">Try selecting 'All Specialists' or clearing search filters.</p>
                  <button class="btn btn-secondary btn-sm mt-md mx-auto" onclick="app.setDoctorCategory('all'); document.getElementById('doctorSearchInput').value=''; app.handleDoctorSearch();">
                    Reset Filters
                  </button>
                </div>
              `}
            </div>
          </div>

          <!-- RIGHT PANE: Interactive Slot Booking Drawer -->
          <div class="booking-drawer-pane" id="bookingDrawer">
            <div class="booking-drawer-card">
              <div class="booking-drawer-header">
                <div class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-primary text-[20px]">event_available</span>
                  <h3 class="font-headline-md font-bold" style="font-size:1.125rem;">Book Consultation</h3>
                </div>
                <span class="badge-role badge-role-patient">ABDM Free Token</span>
              </div>

              <!-- Selected Doctor Summary Card -->
              <div class="selected-doctor-summary">
                <div class="flex items-center gap-sm">
                  <div class="user-avatar" style="width:36px; height:36px; font-size:0.875rem;">
                    ${selectedDoc.name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <strong style="font-size:0.9375rem; color:var(--color-primary);">${selectedDoc.name}</strong>
                    <p class="text-xs text-secondary font-semibold">${selectedDoc.specialty}</p>
                    <span class="text-xs text-muted">${selectedDoc.facility}</span>
                  </div>
                </div>
              </div>

              <!-- Consultation Mode Picker -->
              <div class="form-group" style="margin-top:var(--space-md);">
                <label class="form-label">Consultation Mode</label>
                <div class="segmented-mode-selector">
                  <button type="button" class="mode-btn ${app.consultMode === 'In-Person' ? 'is-active' : ''}" onclick="app.setConsultMode('In-Person')">
                    <span class="material-symbols-outlined text-[16px]">apartment</span>
                    <span>In-Person Visit</span>
                  </button>
                  <button type="button" class="mode-btn ${app.consultMode === 'Video Teleconsult' ? 'is-active' : ''}" onclick="app.setConsultMode('Video Teleconsult')">
                    <span class="material-symbols-outlined text-[16px]">videocam</span>
                    <span>Video Teleconsult</span>
                  </button>
                </div>
              </div>

              <!-- Date Selection -->
              <div class="form-group">
                <label class="form-label">Select Consultation Date</label>
                <div class="slot-date-chips" id="datePickerRow">
                  <button type="button" class="date-chip ${app.selectedDate === 'Tomorrow, 21 Sep 2026' ? 'is-selected' : ''}" onclick="app.setSelectedDate('Tomorrow, 21 Sep 2026')">
                    <span class="text-xs font-bold">Tomorrow</span>
                    <span class="text-xs text-muted">21 Sep</span>
                  </button>
                  <button type="button" class="date-chip ${app.selectedDate === 'Wednesday, 23 Sep 2026' ? 'is-selected' : ''}" onclick="app.setSelectedDate('Wednesday, 23 Sep 2026')">
                    <span class="text-xs font-bold">Wednesday</span>
                    <span class="text-xs text-muted">23 Sep</span>
                  </button>
                  <button type="button" class="date-chip ${app.selectedDate === 'Thursday, 24 Sep 2026' ? 'is-selected' : ''}" onclick="app.setSelectedDate('Thursday, 24 Sep 2026')">
                    <span class="text-xs font-bold">Thursday</span>
                    <span class="text-xs text-muted">24 Sep</span>
                  </button>
                </div>
              </div>

              <!-- Time Slot Selection -->
              <div class="form-group">
                <label class="form-label">Select Available Time Slot</label>
                <div class="time-slot-grid" id="timeSlotGrid">
                  ${['10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM'].map(time => `
                    <button type="button" class="time-slot-btn ${app.selectedTime === time ? 'is-selected' : ''}" onclick="app.setSelectedTime('${time}')">
                      ${time}
                    </button>
                  `).join("")}
                </div>
              </div>

              <!-- Reason for Visit -->
              <div class="form-group">
                <label class="form-label">Reason for Visit / Symptoms</label>
                <input type="text" class="form-input" id="consultReasonInput" 
                  placeholder="e.g. Chest tightness follow-up, BP review..." 
                  value="Chest tightness and breathlessness follow-up review">
              </div>

              <!-- ASHA Assistance Indicator -->
              <div class="choice-control is-selected" style="margin-bottom:var(--space-base);">
                <input type="checkbox" id="ashaAssistCheckbox" class="choice-input" checked>
                <div>
                  <span class="choice-label-text">Assisted by ASHA Sunita More</span>
                  <p class="choice-description">ASHA will receive digital token to support patient transit if required.</p>
                </div>
              </div>

              <!-- Fee & Booking CTA -->
              <div class="booking-confirm-box">
                <div class="flex items-center justify-between" style="margin-bottom:var(--space-sm);">
                  <span class="text-xs text-muted font-bold uppercase">Estimated Total Fee</span>
                  <span class="fee-free-badge">FREE (NHM Covered)</span>
                </div>

                <button class="btn btn-primary btn-lg w-full" id="confirmBookingBtn" onclick="app.bookDoctorAppointment()">
                  <span class="material-symbols-outlined text-[20px]">verified</span>
                  <span>Confirm Appointment & Issue Token</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 3. Patient Appointments List (Upcoming, Past, Cancelled)
   */
  static renderAppointments(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;
    const activeTab = app.activeAppointmentTab || "upcoming";

    const upcomingList = c.upcomingAppointments || [];
    const pastList = c.pastAppointments || [];
    const cancelledList = c.cancelledAppointments || [];

    return `
      <div class="patient-portal-layout">
        <div class="page-header">
          <div class="page-title-group">
            <h1 class="font-headline-lg font-bold" style="font-size:1.5rem; color:var(--color-primary);">My Consultations & Appointments</h1>
            <p class="text-sm text-muted">Manage your upcoming hospital visits, past clinical records, and digital tokens.</p>
          </div>
          <button class="btn btn-primary" onclick="app.navigateTo('find-doctor')">
            <span class="material-symbols-outlined text-[18px]">add</span>
            <span>Book New Appointment</span>
          </button>
        </div>

        <!-- Appointment Status Filter Tabs -->
        <div class="specialty-filter-bar" style="margin-bottom:var(--space-lg); border-bottom:1px solid var(--border-structural); padding-bottom:var(--space-sm);">
          <button class="filter-pill ${activeTab === 'upcoming' ? 'is-active' : ''}" onclick="app.setAppointmentTab('upcoming')">
            <span class="material-symbols-outlined text-[16px]">calendar_today</span>
            <span>Upcoming Consultations (${upcomingList.length})</span>
          </button>
          <button class="filter-pill ${activeTab === 'past' ? 'is-active' : ''}" onclick="app.setAppointmentTab('past')">
            <span class="material-symbols-outlined text-[16px]">history</span>
            <span>Past History (${pastList.length})</span>
          </button>
          <button class="filter-pill ${activeTab === 'cancelled' ? 'is-active' : ''}" onclick="app.setAppointmentTab('cancelled')">
            <span class="material-symbols-outlined text-[16px]">cancel</span>
            <span>Cancelled (${cancelledList.length})</span>
          </button>
        </div>

        <!-- Appointments List -->
        <div class="flex flex-col gap-base">
          ${activeTab === 'upcoming' ? (
            upcomingList.length > 0 ? upcomingList.map(apt => `
              <div class="appointment-card is-upcoming">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
                  <div class="flex items-start gap-md">
                    <div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                      <span class="material-symbols-outlined text-[26px]">stethoscope</span>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-xs">
                        <h3 class="font-bold text-base" style="color:var(--color-neutral);">${apt.doctorName}</h3>
                        <span class="badge-role badge-role-patient">${apt.token || 'TOKEN-SAS-14'}</span>
                        <span class="badge-pill badge-pill-success">${apt.status}</span>
                      </div>
                      <p class="text-xs font-semibold text-secondary" style="margin-top:2px;">${apt.specialty}</p>

                      <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-xs text-muted" style="margin-top:6px;">
                        <span class="flex items-center gap-xs">
                          <span class="material-symbols-outlined text-[15px] text-primary">calendar_month</span>
                          <strong>${apt.date} · ${apt.time}</strong>
                        </span>
                        <span class="flex items-center gap-xs">
                          <span class="material-symbols-outlined text-[15px] text-primary">apartment</span>
                          <span>${apt.facility}</span>
                        </span>
                        <span class="flex items-center gap-xs">
                          <span class="material-symbols-outlined text-[15px] text-primary">videocam</span>
                          <span>${apt.mode}</span>
                        </span>
                      </div>

                      <div class="bg-surface-container-low p-2 rounded-md mt-2 text-xs text-muted">
                        <strong>Purpose:</strong> ${apt.type}
                      </div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-wrap items-center gap-xs">
                    <button class="btn btn-secondary btn-sm" onclick="app.openDirectionsModal('${apt.facility}')">
                      <span class="material-symbols-outlined text-[16px]">directions</span>
                      <span>Directions</span>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="app.openTokenSlipModal('${apt.id}')">
                      <span class="material-symbols-outlined text-[16px]">download</span>
                      <span>Token Slip</span>
                    </button>
                    <button class="btn btn-ghost btn-sm text-red-600" onclick="app.openCancelAppointmentModal('${apt.id}')">
                      <span class="material-symbols-outlined text-[16px]">cancel</span>
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join("") : `
              <div class="card text-center p-space-xl">
                <span class="material-symbols-outlined text-muted text-[48px]">event_busy</span>
                <h3 class="font-bold text-base mt-sm">No upcoming appointments</h3>
                <p class="text-xs text-muted mt-xs">Need to consult a specialist or doctor? Search our verified public network.</p>
                <button class="btn btn-primary btn-sm mt-md mx-auto" onclick="app.navigateTo('find-doctor')">
                  Find Doctor & Book
                </button>
              </div>
            `
          ) : activeTab === 'past' ? (
            pastList.map(apt => `
              <div class="appointment-card is-past">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
                  <div class="flex items-start gap-md">
                    <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-muted flex-shrink-0">
                      <span class="material-symbols-outlined text-[26px]">history_edu</span>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-xs">
                        <h3 class="font-bold text-base" style="color:var(--color-neutral);">${apt.doctorName}</h3>
                        <span class="badge-role" style="background:#E2E8F0; color:#334155;">${apt.token || 'TOKEN-PAST'}</span>
                        <span class="badge-pill badge-pill-neutral">Completed</span>
                      </div>
                      <p class="text-xs font-semibold text-muted" style="margin-top:2px;">${apt.specialty}</p>
                      
                      <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-xs text-muted" style="margin-top:6px;">
                        <span>${apt.date} · ${apt.time}</span>
                        <span>${apt.facility}</span>
                        <span>${apt.mode}</span>
                      </div>

                      <div class="bg-surface-container-low p-2 rounded-md mt-2 text-xs text-muted">
                        <strong>Outcome:</strong> ${apt.outcome || 'Consultation completed. Digital prescription issued.'}
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-xs">
                    <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('medical-records')">
                      <span class="material-symbols-outlined text-[16px]">folder_shared</span>
                      <span>View Records</span>
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="app.navigateTo('find-doctor')">
                      <span class="material-symbols-outlined text-[16px]">repeat</span>
                      <span>Book Follow-up</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join("")
          ) : (
            cancelledList.map(apt => `
              <div class="appointment-card" style="border-left: 4px solid #EF4444; opacity:0.85;">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
                  <div class="flex items-start gap-md">
                    <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0">
                      <span class="material-symbols-outlined text-[26px]">cancel</span>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-xs">
                        <h3 class="font-bold text-base" style="color:var(--color-neutral);">${apt.doctorName}</h3>
                        <span class="badge-pill" style="background:#FEE2E2; color:#991B1B;">Cancelled</span>
                      </div>
                      <p class="text-xs font-semibold text-muted" style="margin-top:2px;">${apt.specialty} • ${apt.facility}</p>
                      <p class="text-xs text-muted" style="margin-top:4px;"><strong>Original Date:</strong> ${apt.date} at ${apt.time}</p>
                      <div class="bg-red-50 p-2 rounded-md mt-2 text-xs text-red-700">
                        <strong>Reason:</strong> ${apt.reason || 'Cancelled by patient.'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button class="btn btn-primary btn-sm" onclick="app.navigateTo('find-doctor')">
                      <span class="material-symbols-outlined text-[16px]">event_available</span>
                      <span>Rebook Appointment</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join("")
          )}
        </div>
      </div>
    `;
  }

  /**
   * 4. Patient Prescriptions View (Readable, Jan Aushadhi Refill)
   */
  static renderPrescriptions(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;

    return `
      <div class="patient-portal-layout">
        <div class="page-header">
          <div class="page-title-group">
            <h1 class="font-headline-lg font-bold" style="font-size:1.5rem; color:var(--color-primary);">My Prescriptions & Medicines</h1>
            <p class="text-sm text-muted">Active medicines dispensed under Jan Aushadhi & National Health Mission schemes.</p>
          </div>
          <button class="btn btn-primary" onclick="app.requestJanAushadhiRefill()">
            <span class="material-symbols-outlined text-[18px]">local_pharmacy</span>
            <span>Request Jan Aushadhi Refill</span>
          </button>
        </div>

        <!-- Jan Aushadhi Summary Card -->
        <div class="card" style="margin-bottom:var(--space-lg); background:linear-gradient(to right, #F0FDF4, #FFFFFF); border-color:#86EFAC;">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
            <div class="flex items-center gap-md">
              <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-[26px]">medication_liquid</span>
              </div>
              <div>
                <div class="flex items-center gap-xs">
                  <strong class="text-base text-primary">Pradhan Mantri Bhartiya Janaushadhi Pariyojana</strong>
                  <span class="badge-role badge-role-patient">Subsidized Generic Rx</span>
                </div>
                <p class="text-xs text-muted" style="margin-top:2px;">
                  Shirur Hub Kendra (Code: PMBJP-MH-2091) • Quality high-grade generics provided free of cost.
                </p>
              </div>
            </div>

            <div class="flex items-center gap-sm">
              <span class="text-xs font-bold text-primary bg-emerald-100 px-3 py-1.5 rounded-full">
                18 Days Regular Supply Remaining
              </span>
            </div>
          </div>
        </div>

        <!-- Prescriptions Detailed Table / Card List -->
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Active Prescribed Medicines (${c.prescriptions.length})</h3>
              <p class="text-xs text-muted">ABDM Verified Digital Healthcare Prescriptions</p>
            </div>
            <span class="tag-capability">Digital Rx Verified</span>
          </div>

          <div class="flex flex-col gap-base" style="margin-top:var(--space-md);">
            ${c.prescriptions.map(p => `
              <div class="prescription-detailed-card">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
                  <div class="flex items-start gap-md">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span class="material-symbols-outlined text-[22px]">pill</span>
                    </div>
                    <div>
                      <div class="flex flex-wrap items-center gap-xs">
                        <h4 class="font-bold text-base" style="color:var(--color-neutral);">${p.medicine}</h4>
                        <span class="jan-aushadhi-badge">${p.source}</span>
                        ${p.taken ? '<span class="badge-pill badge-pill-success">Taken Today</span>' : ''}
                      </div>

                      <div class="flex flex-wrap items-center gap-xs text-xs" style="margin-top:4px;">
                        <span class="font-bold text-primary">${p.dosage}</span>
                        <span class="text-muted">•</span>
                        <span class="dosage-instruction-tag">${p.instructions || 'After food with warm water'}</span>
                      </div>

                      <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-xs text-muted" style="margin-top:6px;">
                        <span><strong>Prescribed by:</strong> ${p.prescribedBy}</span>
                        <span><strong>Date:</strong> ${p.date}</span>
                        <span><strong>Course:</strong> ${p.duration}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Action / Refill -->
                  <div class="flex items-center gap-sm">
                    <button class="btn btn-secondary btn-sm" onclick="app.showToast('Subsidized Refill requested for ${p.medicine} at Shirur Jan Aushadhi Kendra', 'success')">
                      <span class="material-symbols-outlined text-[16px]">sync</span>
                      <span>Refill Order</span>
                    </button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 5. Patient Longitudinal Medical Records (ABHA EHR Locker)
   */
  static renderMedicalRecords(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;
    const records = c.clinicalRecords || [];
    const activeFilter = app.activeRecordFilter || "all";

    const filteredRecords = activeFilter === "all" 
      ? records 
      : records.filter(r => r.type === activeFilter);

    return `
      <div class="patient-portal-layout">
        <div class="page-header">
          <div class="page-title-group">
            <h1 class="font-headline-lg font-bold" style="font-size:1.5rem; color:var(--color-primary);">Longitudinal Medical Records & EHR Locker</h1>
            <p class="text-sm text-muted">ABHA ID: <strong class="numeric-id text-primary">${c.abhaId}</strong> • Verified digital health records across public clinics & hospitals.</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="app.showToast('Synchronized with ABDM National Health Grid', 'success')">
            <span class="material-symbols-outlined text-[16px]">sync</span>
            <span>Sync ABDM Records</span>
          </button>
        </div>

        <!-- 7-Stage Care Continuum Stepper (Stitch Screen 7078ccfc) -->
        <div class="card" style="margin-bottom:var(--space-lg);">
          <div class="card-header">
            <div>
              <h3 class="card-title">Continuum of Care Pathway</h3>
              <p class="text-xs text-muted">Audit trail across ASHA community visit, Triage, PHC stabilization, and specialist follow-up.</p>
            </div>
            <span class="badge-role badge-role-patient">Step 6 of 7 Active</span>
          </div>
          ${SwasthyaUI.renderJourneyStepper(6, c.name)}
        </div>

        <!-- Filter Pills Bar -->
        <div class="specialty-filter-bar" style="margin-bottom:var(--space-md);">
          <button class="filter-pill ${activeFilter === 'all' ? 'is-active' : ''}" onclick="app.setRecordFilter('all')">
            All Records (${records.length})
          </button>
          <button class="filter-pill ${activeFilter === 'consultation' ? 'is-active' : ''}" onclick="app.setRecordFilter('consultation')">
            Doctor Consultations
          </button>
          <button class="filter-pill ${activeFilter === 'diagnostic' ? 'is-active' : ''}" onclick="app.setRecordFilter('diagnostic')">
            12-Lead ECG & Diagnostics
          </button>
          <button class="filter-pill ${activeFilter === 'lab' ? 'is-active' : ''}" onclick="app.setRecordFilter('lab')">
            Lab Biochemistry
          </button>
          <button class="filter-pill ${activeFilter === 'discharge' ? 'is-active' : ''}" onclick="app.setRecordFilter('discharge')">
            Discharge Summaries
          </button>
        </div>

        <!-- Clinical Records Feed -->
        <div class="flex flex-col gap-base">
          ${filteredRecords.map(rec => `
            <div class="card clinical-record-card">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-sm pb-sm border-b border-structural">
                <div class="flex items-center gap-sm">
                  <div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined text-[20px]">
                      ${rec.type === 'diagnostic' ? 'ecg_heart' : (rec.type === 'lab' ? 'lab_profile' : 'clinical_notes')}
                    </span>
                  </div>
                  <div>
                    <h3 class="font-bold text-base" style="color:var(--color-neutral);">${rec.title}</h3>
                    <p class="text-xs text-muted">${rec.doctorName} • ${rec.facility}</p>
                  </div>
                </div>

                <div class="flex items-center gap-xs">
                  <span class="text-xs text-muted">${rec.date} · ${rec.time}</span>
                  <span class="badge-role badge-role-patient">${rec.type.toUpperCase()}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-base" style="margin-top:var(--space-md);">
                <!-- Diagnosis & Vitals (2 cols) -->
                <div class="md:col-span-2 flex flex-col gap-xs">
                  <div class="bg-surface-container-low p-2.5 rounded-lg">
                    <span class="text-xs font-bold text-secondary uppercase">Clinical Diagnosis:</span>
                    <p class="text-xs font-bold text-primary mt-0.5">${rec.diagnosis}</p>
                  </div>

                  <div class="text-xs text-muted" style="margin-top:4px;">
                    <strong>Vitals at Examination:</strong> ${rec.vitals}
                  </div>

                  <p class="text-xs text-neutral" style="margin-top:4px; line-height:1.4;">
                    <strong>Doctor Notes:</strong> ${rec.notes}
                  </p>
                </div>

                <!-- Attached Reports & PDF Actions (1 col) -->
                <div class="bg-surface-subtle p-3 rounded-lg flex flex-col justify-between gap-sm border border-structural">
                  <div>
                    <span class="text-xs font-bold text-muted uppercase">Digital Attachments</span>
                    <div class="flex flex-col gap-xs mt-1">
                      ${rec.attachments.map(att => `
                        <div class="flex items-center justify-between text-xs p-1.5 bg-surface-card rounded border border-structural">
                          <span class="truncate max-w-[140px]">${att.name}</span>
                          <button class="btn btn-ghost btn-sm" style="padding:0 4px; min-height:20px;" onclick="app.openEcgViewerModal()" title="View Document">
                            <span class="material-symbols-outlined text-[16px] text-primary">download</span>
                          </button>
                        </div>
                      `).join("")}
                    </div>
                  </div>

                  <button class="btn btn-secondary btn-sm w-full" onclick="app.openEcgViewerModal()">
                    <span class="material-symbols-outlined text-[16px]">visibility</span>
                    <span>View Full Clinical Slip</span>
                  </button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  /**
   * 6. Patient Notifications View
   */
  static renderNotifications(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;
    const notifications = c.notifications || [];

    return `
      <div class="patient-portal-layout">
        <div class="page-header">
          <div class="page-title-group">
            <h1 class="font-headline-lg font-bold" style="font-size:1.5rem; color:var(--color-primary);">Care Notifications & Alerts</h1>
            <p class="text-sm text-muted">Real-time reminders for appointments, lab test results, and Jan Aushadhi refills.</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="app.markAllNotificationsRead()">
            <span class="material-symbols-outlined text-[16px]">done_all</span>
            <span>Mark All as Read</span>
          </button>
        </div>

        <div class="flex flex-col gap-sm">
          ${notifications.map(n => `
            <div class="card notification-card ${n.unread ? 'is-unread' : ''}">
              <div class="flex items-start gap-md">
                <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <span class="material-symbols-outlined text-[20px]">${n.icon || 'notifications'}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-bold text-sm" style="color:var(--color-neutral);">${n.title}</h3>
                    <span class="text-xs text-muted">${n.time}</span>
                  </div>
                  <p class="text-xs text-muted" style="margin-top:3px; line-height:1.4;">${n.message}</p>

                  <div style="margin-top:8px;">
                    <button class="btn btn-secondary btn-sm" onclick="app.navigateTo('${n.actionView || 'home'}')">
                      <span>View Details →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  /**
   * 7. Patient Profile & ABHA Card
   */
  static renderProfile(app) {
    const c = app.citizenData || SWASTHYA_DATA.citizenUser;

    return `
      <div class="patient-portal-layout">
        <div class="page-header">
          <div class="page-title-group">
            <h1 class="font-headline-lg font-bold" style="font-size:1.5rem; color:var(--color-primary);">Citizen Profile & Ayushman Bharat Health Card</h1>
            <p class="text-sm text-muted">Digital Health Account anchored to Ayushman Bharat Digital Mission (ABDM)</p>
          </div>
          <button class="btn btn-primary" onclick="app.openAbhaModal()">
            <span class="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>Download ABHA Card (QR)</span>
          </button>
        </div>

        <div class="view-grid-2col">
          <!-- ABHA Card Graphic Preview (Stitch Screen fa074673) -->
          <div class="card abha-card-container">
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

          <!-- Linked Facilities & Caregivers -->
          <div class="flex flex-col gap-base">
            <div class="card">
              <h3 class="card-title" style="margin-bottom:var(--space-sm);">Linked Caregivers & Facility</h3>
              
              <div class="facility-readiness-row" style="margin-bottom:8px;">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-primary">volunteer_activism</span> Assigned ASHA Cadre
                </span>
                <span class="text-xs font-bold text-primary">${c.assignedAsha}</span>
              </div>

              <div class="facility-readiness-row" style="margin-bottom:8px;">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-secondary">local_hospital</span> Primary Health Centre
                </span>
                <span class="text-xs font-bold text-secondary">${c.linkagePhc}</span>
              </div>

              <div class="facility-readiness-row">
                <span class="text-xs font-bold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-[18px] text-amber-600">emergency</span> Emergency Ambulance
                </span>
                <span class="text-xs font-bold">108 National Dispatch</span>
              </div>
            </div>

            <div class="card">
              <h3 class="card-title" style="margin-bottom:var(--space-xs);">Federated ABDM Consents</h3>
              <p class="text-xs text-muted" style="margin-bottom:var(--space-sm);">Citizen consent records for inter-facility electronic health records exchange.</p>
              
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${c.consentRecords.map(cr => `
                  <div style="padding:10px; background:var(--surface-subtle); border-radius:var(--radius-md); border:1px solid var(--border-structural);">
                    <div class="flex items-center justify-between text-xs">
                      <strong>${cr.provider}</strong>
                      <span class="tag-capability" style="font-size:0.6875rem;">${cr.status}</span>
                    </div>
                    <p class="text-xs text-muted" style="margin-top:2px;">Purpose: ${cr.purpose}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.PatientPages = PatientPages;
