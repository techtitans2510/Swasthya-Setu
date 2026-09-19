/**
 * SwasthyaSetu Health Admin Persona Module (`src/pages/admin/admin-pages.js`)
 * District Public Health Surveillance, Doctor Credential Verification, ASHA Cadre Management & Capacity Planning
 * Design Source of Truth: Stitch Screens 11611133625d4358bca489a584adea66 & 50e431e7ba4f4ec7983aaddbf4311869
 */

class AdminPages {
  /**
   * 1. District Surveillance Overview Dashboard
   */
  static renderDashboard(app) {
    const stats = SWASTHYA_DATA.adminStats;

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="admin_overview_title">District Healthcare Administration Overview</h1>
          <p data-i18n="admin_overview_sub">Pune District Public Health Surveillance Network • Shirur & Junnar Clusters</p>
        </div>
        <div class="flex items-center gap-xs">
          <span class="badge-role badge-role-admin">District Civil Grid</span>
          <button class="btn btn-secondary btn-sm" onclick="app.showToast('Generating District Health Surveillance Report (PDF)...', 'success')">
            <span class="material-symbols-outlined text-[16px]">file_download</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <!-- 4 District Surveillance KPI Tiles -->
      <div class="metrics-grid">
        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="kpi_total_population">Total Population Registered</span>
            <div class="metric-tile-icon is-green"><span class="material-symbols-outlined text-[18px]">groups</span></div>
          </div>
          <div class="metric-tile-value">${stats.totalPatientsRegistered.toLocaleString()}</div>
          <div class="metric-tile-footer text-muted">Across 24 Sub-Centres & 142 Villages</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="kpi_high_risk">High-Risk Escalations</span>
            <div class="metric-tile-icon is-orange"><span class="material-symbols-outlined text-[18px]">warning</span></div>
          </div>
          <div class="metric-tile-value text-bold" style="color:var(--risk-high-fg);">${stats.highRiskCases}</div>
          <div class="metric-tile-footer" style="color:var(--risk-high-fg);">All linked to PHC Oxygen Beds</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="kpi_active_referrals">Active Transfer Referrals</span>
            <div class="metric-tile-icon is-blue"><span class="material-symbols-outlined text-[18px]">swap_horiz</span></div>
          </div>
          <div class="metric-tile-value">${stats.activeReferrals}</div>
          <div class="metric-tile-footer text-muted">Average transit time: 14 mins (108 Fleet)</div>
        </div>

        <div class="metric-tile">
          <div class="metric-tile-top">
            <span class="metric-tile-label" data-i18n="kpi_sync_rate">Offline Sync Rate</span>
            <div class="metric-tile-icon is-green"><span class="material-symbols-outlined text-[18px]">cloud_done</span></div>
          </div>
          <div class="metric-tile-value">${stats.syncRate}</div>
          <div class="metric-tile-footer text-muted">Zero frontline data loss recorded</div>
        </div>
      </div>

      <!-- Quick Links Strip -->
      <div class="quick-action-strip" style="margin-bottom:var(--space-xl);">
        <div class="flex items-center gap-xs">
          <span class="material-symbols-outlined text-primary text-[20px]">admin_panel_settings</span>
          <strong class="text-primary font-headline" style="font-size:1.0625rem;">Governance Portals</strong>
        </div>
        <div class="flex flex-wrap items-center gap-sm">
          <button class="btn btn-primary" onclick="app.navigateTo('doctor-verification')">
            <span class="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Doctor Verification (${SWASTHYA_DATA.adminDoctorVerifications.filter(v=>v.status.includes('Pending')).length} Pending)</span>
          </button>
          <button class="btn btn-secondary" onclick="app.navigateTo('asha-management')">
            <span class="material-symbols-outlined text-[18px]">groups</span>
            <span>ASHA Cadre Directory</span>
          </button>
          <button class="btn btn-secondary" onclick="app.navigateTo('facilities')">
            <span class="material-symbols-outlined text-[18px]">local_hospital</span>
            <span>Bed & Oxygen Infrastructure</span>
          </button>
        </div>
      </div>

      <!-- Facility Readiness & Bed Capacity Overview Table -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title" data-i18n="facility_readiness_title">Facility Readiness & Oxygen Capacity</h3>
            <p class="text-xs text-muted">Real-time status of beds, oxygen concentrators, and medical officers on duty</p>
          </div>
          <span class="tag-capability">${stats.facilitiesOperational} Operational Facilities</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Type</th>
                <th>MO On Duty</th>
                <th>Oxygen Beds</th>
                <th>Capacity</th>
                <th>Traffic Status</th>
              </tr>
            </thead>
            <tbody>
              ${SWASTHYA_DATA.facilities.map(f => `
                <tr>
                  <td><strong>${f.name}</strong></td>
                  <td>${f.type}</td>
                  <td>${f.doctorInCharge}</td>
                  <td><span class="tag-capability">✓ Active Support</span></td>
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

  /**
   * 2. Doctor Credential Verification Queue
   */
  static renderDoctorVerification(app) {
    const verifications = SWASTHYA_DATA.adminDoctorVerifications || [];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="doctor_verifications_title">Doctor Credential Verification Queue</h1>
          <p data-i18n="doctor_verifications_sub">Review medical licenses and council registrations against State Medical Council (MMC) records.</p>
        </div>
        <span class="badge-role badge-role-admin">Medical Council Desk</span>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Registration Applications</h3>
            <p class="text-xs text-muted">Doctors and Clinical Specialists requesting public health tele-triage access</p>
          </div>
          <span class="tag-capability">${verifications.length} Applications</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Doctor Name & Degree</th>
                <th>MMC Reg. Number</th>
                <th>Assigned Facility</th>
                <th>Requested Role</th>
                <th>Verification Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${verifications.map(v => `
                <tr>
                  <td>
                    <strong>${v.doctorName}</strong><br>
                    <span class="text-xs text-muted">${v.degree}</span>
                  </td>
                  <td>
                    <strong class="numeric-id text-primary">${v.mmcNumber}</strong><br>
                    <span class="text-xs text-muted">${v.stateCouncil}</span>
                  </td>
                  <td>${v.facility}</td>
                  <td><span class="badge-role badge-role-doctor">${v.requestedRole}</span></td>
                  <td><span class="status-pill ${v.statusClass}">${v.status}</span></td>
                  <td>
                    ${v.status.includes('Pending') ? `
                      <div class="flex items-center gap-xs">
                        <button class="btn btn-primary btn-sm" onclick="app.verifyDoctor('${v.id}')">
                          <span class="material-symbols-outlined text-[16px]">check</span> Approve
                        </button>
                        <button class="btn btn-ghost btn-sm text-danger" onclick="app.rejectDoctor('${v.id}')">
                          Reject
                        </button>
                      </div>
                    ` : `
                      <span class="text-xs font-bold text-primary">✓ Verified</span>
                    `}
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
   * 3. ASHA Cadre & Village Coverage Management
   */
  static renderAshaManagement(app) {
    const ashsaList = SWASTHYA_DATA.adminAshaList || [];

    return `
      <div class="page-header">
        <div class="page-title-group">
          <h1 data-i18n="asha_management_title">ASHA Cadre & Village Coverage Directory</h1>
          <p data-i18n="asha_management_sub">Monitor frontline performance, population screening coverage, and device sync status.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.showToast('ASHA Allocation Wizard: Select Sub-Centre...', 'info')">
          + Onboard ASHA Worker
        </button>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ASHA Worker</th>
                <th>Sub-Centre / Block</th>
                <th>Assigned Villages</th>
                <th>Pop. Covered</th>
                <th>High Risk Flagged</th>
                <th>Screenings</th>
                <th>Sync Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${ashsaList.map(a => `
                <tr>
                  <td>
                    <strong>${a.name}</strong><br>
                    <span class="text-xs text-muted">${a.status}</span>
                  </td>
                  <td>
                    <strong>${a.subCentre}</strong><br>
                    <span class="text-xs text-muted">Block: ${a.block}</span>
                  </td>
                  <td><span class="text-xs">${a.assignedVillages}</span></td>
                  <td><strong>${a.populationCovered.toLocaleString()}</strong></td>
                  <td>
                    <span class="risk-chip ${a.activeHighRisk > 2 ? 'risk-high' : 'risk-low'}">
                      ${a.activeHighRisk} Cases
                    </span>
                  </td>
                  <td><span class="text-xs font-bold">${a.screeningsThisMonth}</span></td>
                  <td>
                    <span class="text-xs font-bold text-primary">${a.syncRate}</span><br>
                    <span class="text-xs text-muted">${a.lastSyncTime}</span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="app.showToast('Inspecting ASHA cadre: ${a.name}', 'info')">
                      View Log →
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

window.AdminPages = AdminPages;
