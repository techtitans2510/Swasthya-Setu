/**
 * SwasthyaSetu Unified Role-Detection Healthcare Login Module (`src/pages/auth/auth-pages.js`)
 * Implements Stitch Screen 4dfc23955a704935aa9a0a09a7613703 & 5770725dc8c740ceac85f5f50feefe56
 * Features: Automatic Cadre Detection (Patient, ASHA, Doctor, Admin),
 * Multi-Mode Auth (OTP, PIN, Biometric), Quick Sample Logins, and 4-Role Continuum Pipeline
 */

class AuthPages {
  static renderLogin(app) {
    return `
      <div class="unified-auth-page">
        <!-- 1. Offline / Sync Status Ribbon -->
        <div class="auth-sync-ribbon">
          <div class="flex items-center gap-sm">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-label-md text-xs font-semibold text-primary">Edge Node Active · Local authentication token cached for offline resilience</span>
          </div>
          <div class="hidden sm:flex items-center gap-lg text-xs text-muted">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-primary">security</span>
              ABDM Standard v2.4 Compliant
            </span>
            <span class="flex items-center gap-1 font-bold text-danger">
              <span class="material-symbols-outlined text-[16px] text-danger">emergency</span>
              Helpline: 108 / 104
            </span>
          </div>
        </div>

        <!-- 2. Civic / Institutional Identity Bar -->
        <div class="auth-identity-bar">
          <div class="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-base w-full">
            <div class="flex items-center gap-md">
              <div class="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                <img src="src/assets/emblem.svg" alt="Emblem" style="width:28px; height:28px; filter:brightness(0) invert(1);">
              </div>
              <div>
                <span class="text-[11px] text-muted uppercase tracking-wider font-bold block">National Health Authority • MoHFW Govt of India</span>
                <span class="font-headline-lg font-bold text-primary tracking-tight" style="font-size:1.375rem;">SwasthyaSetu</span>
              </div>
            </div>

            <div class="flex items-center gap-md">
              <div class="auth-badge-certified">
                <span class="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                <span>Certified Institutional Portal</span>
              </div>
              <div class="lang-selector-wrap">
                <select id="authLangSelector" class="lang-select" onchange="if(window.i18n) { window.i18n.setLanguage(this.value); app.renderCurrentView(); }">
                  <option value="en">English</option>
                  <option value="mr">मराठी</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Hero Anchor Section -->
        <div class="max-w-[1360px] mx-auto pt-lg pb-md px-base w-full">
          <div class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-lg">
            <div style="max-width:720px;">
              <span class="auth-tag-federated">
                <span class="material-symbols-outlined text-[14px]">hub</span>
                Federated Identity Provider
              </span>
              <h1 class="font-headline font-bold text-primary" style="font-size:1.75rem; margin-top:6px; margin-bottom:6px;">
                SwasthyaSetu Unified Healthcare Access
              </h1>
              <p class="text-sm text-muted leading-relaxed">
                Public Health Continuity Platform • National Health Authority & ABDM Compliant. Seamless continuum of care bridging rural citizen outreach to multi-specialty clinical infrastructure.
              </p>
            </div>

            <div class="flex items-center gap-md">
              <div class="bg-surface-card p-3 rounded-xl shadow-sm border border-structural">
                <div class="text-[11px] text-muted">Active PHC Network</div>
                <strong class="text-primary font-headline text-lg">31,420 Nodes</strong>
              </div>
              <div class="bg-surface-card p-3 rounded-xl shadow-sm border border-structural">
                <div class="text-[11px] text-muted">ABHA Identities Bound</div>
                <strong class="text-primary font-headline text-lg">14.2M Live</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Primary Interactive Split Section -->
        <div class="max-w-[1360px] mx-auto pb-xl px-base w-full">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
            
            <!-- LEFT COLUMN: UNIFIED AUTHENTICATION GATEWAY CARD (5 COLS) -->
            <div class="lg:col-span-5 bg-surface-card rounded-xl p-base md:p-lg shadow-md border border-structural">
              <div class="flex items-center justify-between pb-sm mb-base bg-surface-container-low p-3 rounded-lg">
                <div>
                  <div class="font-headline font-bold text-primary text-base">Direct Access Hub</div>
                  <div class="text-xs text-muted">Instant unified role resolution</div>
                </div>
                <div class="role-pill-detector" id="role-pill">
                  <span class="material-symbols-outlined text-[14px]">search</span>
                  <span id="role-pill-text">Awaiting ID</span>
                </div>
              </div>

              <form class="flex flex-col gap-base" id="auth-form" onsubmit="event.preventDefault(); app.handleAuthSubmit();">
                <!-- Universal Identifier Input -->
                <div>
                  <label class="block text-xs font-bold text-neutral mb-1" for="identifier-input">
                    Universal Identifier
                  </label>
                  <div class="relative">
                    <input class="form-input text-sm w-full pr-10 font-medium" id="identifier-input" placeholder="ABHA ID, Mobile, ASHA ID, Reg No, or Govt Mail" type="text" autocomplete="off" oninput="app.handleIdentifierInput(this.value)">
                    <span class="material-symbols-outlined absolute right-3 top-3 text-muted cursor-pointer hidden text-[18px]" id="input-clear-btn" onclick="app.clearIdentifierInput()">
                      close
                    </span>
                  </div>
                  <div class="flex items-center justify-between mt-1 text-[11px]">
                    <span class="text-muted" id="helper-detector">
                      Type an identifier to auto-match your cadence profile
                    </span>
                    <span class="text-secondary font-bold flex items-center gap-0.5" id="token-status">
                      <span class="material-symbols-outlined text-[13px]">offline_pin</span>
                      Offline Ready
                    </span>
                  </div>
                </div>

                <!-- Verification Mode Selector -->
                <div>
                  <span class="block text-xs font-bold text-neutral mb-1">Verification Mode</span>
                  <div class="grid grid-cols-3 gap-xs" id="auth-modes">
                    <button class="auth-mode-tab is-active" data-mode="otp" type="button" onclick="app.setAuthMode('otp')">
                      <span class="material-symbols-outlined text-[18px]">sms</span>
                      <span>Mobile OTP</span>
                    </button>
                    <button class="auth-mode-tab" data-mode="pin" type="button" onclick="app.setAuthMode('pin')">
                      <span class="material-symbols-outlined text-[18px]">lock</span>
                      <span>Security PIN</span>
                    </button>
                    <button class="auth-mode-tab" data-mode="bio" type="button" onclick="app.setAuthMode('bio')">
                      <span class="material-symbols-outlined text-[18px]">fingerprint</span>
                      <span>Biometric</span>
                    </button>
                  </div>
                </div>

                <!-- Dynamic Input Credential Payload Area -->
                <div class="flex flex-col gap-xs" id="credential-payload-area">
                  <label class="block text-xs font-bold text-neutral" for="credential-input" id="credential-label">
                    Enter 6-digit OTP Code
                  </label>
                  <div class="relative">
                    <input class="form-input text-sm w-full font-numeric tracking-widest text-center" id="credential-input" maxlength="6" placeholder="••••••" type="text" value="940128">
                    <button class="absolute right-3 top-2.5 text-primary text-xs font-bold hover:underline" id="resend-btn" type="button" onclick="app.triggerAuthResend()">
                      Get OTP
                    </button>
                  </div>
                </div>

                <!-- Security and Consent Agreement -->
                <div class="bg-surface-container p-2.5 rounded-lg flex items-start gap-sm">
                  <input checked class="mt-0.5 rounded text-primary focus:ring-primary accent-emerald-700 cursor-pointer" id="consent-check" type="checkbox">
                  <label class="text-xs text-neutral leading-tight cursor-pointer" for="consent-check">
                    I consent to authentication under MoHFW ABDM guidelines & institutional auditing norms. My credentials will follow state cryptographic trust chains.
                  </label>
                </div>

                <!-- Primary Submit Action -->
                <button class="btn btn-primary w-full h-12 flex items-center justify-center gap-xs font-bold text-sm shadow-md" id="login-cta" type="submit">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                  <span id="login-cta-text">Authenticate & Enter Workspace</span>
                </button>

                <!-- Emergency Links & Citizen Guidance -->
                <div class="pt-xs flex flex-wrap items-center justify-between gap-xs text-xs text-muted">
                  <a class="text-secondary font-bold hover:underline flex items-center gap-0.5" href="#" onclick="app.fillQuick('91-4029-1823-0192'); return false;">
                    <span class="material-symbols-outlined text-[15px]">person_add</span>
                    Create ABHA ID
                  </a>
                  <a class="hover:underline flex items-center gap-0.5" href="tel:104">
                    <span class="material-symbols-outlined text-[15px]">support_agent</span>
                    Citizen Desk 104
                  </a>
                  <a class="hover:underline flex items-center gap-0.5" href="#" onclick="app.showToast('Opening Frontline Field Health Manual (PDF)...', 'info'); return false;">
                    <span class="material-symbols-outlined text-[15px]">menu_book</span>
                    Field Manual
                  </a>
                </div>
              </form>

              <!-- Quick Sample Logins Bar -->
              <div class="mt-base p-3 bg-surface-container rounded-lg">
                <div class="text-[11px] text-neutral uppercase tracking-wider font-bold mb-1.5">⚡ Instant Demo Cadre Logins:</div>
                <div class="flex flex-wrap gap-1">
                  <button class="sample-login-pill" onclick="app.fillQuick('98220 14920')" type="button">
                    <span class="material-symbols-outlined text-[13px] text-secondary">phone_iphone</span> Citizen (Mobile)
                  </button>
                  <button class="sample-login-pill" onclick="app.fillQuick('91-4029-1823-0192')" type="button">
                    <span class="material-symbols-outlined text-[13px] text-secondary">badge</span> Patient (ABHA)
                  </button>
                  <button class="sample-login-pill" onclick="app.fillQuick('ASHA-2409')" type="button">
                    <span class="material-symbols-outlined text-[13px] text-emerald-700">diversity_1</span> ASHA Cadre
                  </button>
                  <button class="sample-login-pill" onclick="app.fillQuick('MMC-2012-08-2940')" type="button">
                    <span class="material-symbols-outlined text-[13px] text-teal-800">stethoscope</span> Doctor (MO)
                  </button>
                  <button class="sample-login-pill" onclick="app.fillQuick('admin.mohfw@gov.in')" type="button">
                    <span class="material-symbols-outlined text-[13px] text-amber-700">shield_person</span> Health Admin
                  </button>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: CADRE SELECTION & OPERATIONAL SCOPE MATRIX (7 COLS) -->
            <div class="lg:col-span-7 flex flex-col gap-base">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="font-headline font-bold text-primary text-lg">Select Cadre Role & Operational Scope</h2>
                  <p class="text-xs text-muted">Tap role card to auto-configure access credentials</p>
                </div>
                <span class="tag-capability">4 Distinct Personas</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-base">
                <!-- Role 1: Citizen / Patient -->
                <div class="cadre-card is-citizen" id="card-citizen" onclick="app.selectCadre('PATIENT', '91-4029-1823-0192')">
                  <div class="flex items-start justify-between">
                    <div class="cadre-icon-box bg-secondary-light text-secondary">
                      <span class="material-symbols-outlined text-[22px]">person</span>
                    </div>
                    <span class="cadre-tier-badge text-secondary bg-surface-container">Public Tier</span>
                  </div>
                  <div class="mt-base">
                    <h3 class="font-bold text-primary text-base">Citizen / Patient</h3>
                    <p class="text-xs text-muted mt-1 leading-relaxed">
                      Access your ABHA longitudinal records, track prescriptions, book PHC/teleconsult appointments, and monitor family care trees.
                    </p>
                  </div>
                  <div class="mt-base pt-xs bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1 font-semibold text-primary">
                      <span class="material-symbols-outlined text-[15px]">key</span>
                      ABHA ID / Mobile OTP
                    </span>
                    <span class="text-secondary font-bold">Direct Access →</span>
                  </div>
                </div>

                <!-- Role 2: ASHA / ANM Frontline -->
                <div class="cadre-card is-asha" id="card-asha" onclick="app.selectCadre('ASHA', 'ASHA-2409')">
                  <div class="flex items-start justify-between">
                    <div class="cadre-icon-box bg-emerald-100 text-emerald-800">
                      <span class="material-symbols-outlined text-[22px]">diversity_1</span>
                    </div>
                    <span class="cadre-tier-badge text-primary bg-surface-container">Field Cadre</span>
                  </div>
                  <div class="mt-base">
                    <h3 class="font-bold text-primary text-base">ASHA / ANM Frontline</h3>
                    <p class="text-xs text-muted mt-1 leading-relaxed">
                      Frontline village roster, patient domiciliary registration, triage & field vitals collection, and sub-centre referral continuity.
                    </p>
                  </div>
                  <div class="mt-base pt-xs bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1 font-semibold text-primary">
                      <span class="material-symbols-outlined text-[15px]">badge</span>
                      ASHA ID / Token Key
                    </span>
                    <span class="text-primary font-bold">Offline Enabled →</span>
                  </div>
                </div>

                <!-- Role 3: Doctor / Medical Officer -->
                <div class="cadre-card is-doctor" id="card-doctor" onclick="app.selectCadre('DOCTOR', 'MMC-2012-08-2940')">
                  <div class="flex items-start justify-between">
                    <div class="cadre-icon-box bg-teal-100 text-teal-800">
                      <span class="material-symbols-outlined text-[22px]">stethoscope</span>
                    </div>
                    <span class="cadre-tier-badge text-teal-800 bg-surface-container">Clinical Care</span>
                  </div>
                  <div class="mt-base">
                    <h3 class="font-bold text-primary text-base">Medical Officer / Doctor</h3>
                    <p class="text-xs text-muted mt-1 leading-relaxed">
                      OPD consultations, clinical tele-triage queues, digital e-Prescriptions, lab diagnostics evaluation, and secondary hospital transfer.
                    </p>
                  </div>
                  <div class="mt-base pt-xs bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1 font-semibold text-primary">
                      <span class="material-symbols-outlined text-[15px]">medical_services</span>
                      MMC Reg + 2FA
                    </span>
                    <span class="text-primary font-bold">Consult Station →</span>
                  </div>
                </div>

                <!-- Role 4: Health Administrator / CMO -->
                <div class="cadre-card is-admin" id="card-admin" onclick="app.selectCadre('ADMIN', 'admin.mohfw@gov.in')">
                  <div class="flex items-start justify-between">
                    <div class="cadre-icon-box bg-amber-100 text-amber-800">
                      <span class="material-symbols-outlined text-[22px]">shield_person</span>
                    </div>
                    <span class="cadre-tier-badge text-amber-800 bg-surface-container">Governance</span>
                  </div>
                  <div class="mt-base">
                    <h3 class="font-bold text-primary text-base">Health Administrator / CMO</h3>
                    <p class="text-xs text-muted mt-1 leading-relaxed">
                      District/Block monitoring, physician credential verification, frontline deployment, cold-chain logistics, and bed utilization audits.
                    </p>
                  </div>
                  <div class="mt-base pt-xs bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-xs">
                    <span class="flex items-center gap-1 font-semibold text-primary">
                      <span class="material-symbols-outlined text-[15px]">assured_workload</span>
                      NIC Gov SSO
                    </span>
                    <span class="text-primary font-bold">Portal Direct →</span>
                  </div>
                </div>
              </div>

              <!-- Real-Time Field Operations Banner -->
              <div class="bg-surface-container p-3 rounded-xl flex items-center justify-between flex-wrap gap-base shadow-sm">
                <div class="flex items-center gap-md">
                  <div class="w-9 h-9 rounded-full bg-surface-card flex items-center justify-center text-primary shadow-sm">
                    <span class="material-symbols-outlined text-[18px]">cell_tower</span>
                  </div>
                  <div>
                    <strong class="text-xs text-primary block font-bold">Low Connectivity Fallback Active</strong>
                    <span class="text-[11px] text-muted">Frontline tablets retain local cryptographic validation when GSM networks lapse.</span>
                  </div>
                </div>
                <div class="flex items-center gap-xs">
                  <strong class="numeric-id text-primary text-sm">99.98%</strong>
                  <span class="text-[11px] text-muted">Uptime across 742 districts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Systematic 4-Role Continuum Workflow Banner -->
        <div class="w-full bg-surface-card py-xl px-base border-t border-structural">
          <div class="max-w-[1360px] mx-auto">
            <div class="mb-base flex flex-col md:flex-row md:items-end justify-between gap-xs">
              <div>
                <span class="text-[11px] text-muted uppercase tracking-widest font-bold">Continuum of Care Protocol</span>
                <h2 class="font-headline font-bold text-primary text-xl">Zero-Overlap Cross-Cadre Architectural Pipeline</h2>
              </div>
              <p class="text-xs text-muted max-w-md">
                Strict role demarcation ensures absolute patient privacy, transparent chain of custody, and auditable referral escalation across Indian public health tiers.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-base">
              <!-- Stage 1 -->
              <div class="bg-surface-container-low rounded-xl p-base relative overflow-hidden border border-structural">
                <div class="flex items-center justify-between mb-xs">
                  <span class="text-[11px] uppercase font-bold text-secondary bg-surface-card px-2 py-0.5 rounded">01 • Origination</span>
                  <span class="material-symbols-outlined text-secondary text-[18px]">person_pin</span>
                </div>
                <strong class="font-headline text-primary text-sm block">Citizen Profile</strong>
                <p class="text-xs text-muted mt-1 mb-base">
                  Individual generates ABHA ID, assigns consent policies, checks screening records, and authorizes history transfers.
                </p>
                <div class="text-[11px] text-primary font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span> Data Sovereign Citizen
                </div>
              </div>

              <!-- Stage 2 -->
              <div class="bg-surface-container-low rounded-xl p-base relative overflow-hidden border border-structural">
                <div class="flex items-center justify-between mb-xs">
                  <span class="text-[11px] uppercase font-bold text-primary bg-surface-card px-2 py-0.5 rounded">02 • Domiciliary</span>
                  <span class="material-symbols-outlined text-primary text-[18px]">home_health</span>
                </div>
                <strong class="font-headline text-primary text-sm block">ASHA Field Entry</strong>
                <p class="text-xs text-muted mt-1 mb-base">
                  Door-to-door NCD checks, maternal monitoring, digital vitals syncing via Bluetooth IoT sensors, and Sub-Centre escalations.
                </p>
                <div class="text-[11px] text-primary font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span> Offline Synced Records
                </div>
              </div>

              <!-- Stage 3 -->
              <div class="bg-surface-container-low rounded-xl p-base relative overflow-hidden border border-structural">
                <div class="flex items-center justify-between mb-xs">
                  <span class="text-[11px] uppercase font-bold text-primary bg-surface-card px-2 py-0.5 rounded">03 • Clinical Care</span>
                  <span class="material-symbols-outlined text-primary text-[18px]">clinical_notes</span>
                </div>
                <strong class="font-headline text-primary text-sm block">Doctor Consult</strong>
                <p class="text-xs text-muted mt-1 mb-base">
                  PHC / Teleconsult physician evaluates longitudinal vitals, prescribes digital medications, and orders institutional tests.
                </p>
                <div class="text-[11px] text-primary font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span> NMC Legally Signed Rx
                </div>
              </div>

              <!-- Stage 4 -->
              <div class="bg-surface-container-low rounded-xl p-base relative overflow-hidden border border-structural">
                <div class="flex items-center justify-between mb-xs">
                  <span class="text-[11px] uppercase font-bold text-amber-800 bg-surface-card px-2 py-0.5 rounded">04 • Governance</span>
                  <span class="material-symbols-outlined text-amber-800 text-[18px]">monitoring</span>
                </div>
                <strong class="font-headline text-primary text-sm block">Admin Audit</strong>
                <p class="text-xs text-muted mt-1 mb-base">
                  CMO and state directors audit epidemiological trends, trace epidemic outbreaks, verify physician quotas, and direct supply stocks.
                </p>
                <div class="text-[11px] text-primary font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">check_circle</span> Institutional Governance
                </div>
              </div>
            </div>

            <!-- Legal & CERT-In Note -->
            <div class="mt-base p-3 bg-surface-container rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-xs text-xs">
              <div class="flex items-center gap-xs">
                <span class="material-symbols-outlined text-muted text-[18px]">info</span>
                <p class="text-muted italic">
                  Decision Support Note: Triage algorithms suggest classification only. Qualified healthcare professionals execute all clinical interventions and drug dispensation.
                </p>
              </div>
              <span class="numeric-id text-muted text-[11px] font-bold">CERT-In ID: SEC-7741-GOV</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.AuthPages = AuthPages;
