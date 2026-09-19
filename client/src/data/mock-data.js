/**
 * SwasthyaSetu Realistic Rural Healthcare Mock Dataset
 * Geographies: Rural Maharashtra / India Public Health Network
 */

const SWASTHYA_DATA = {
  currentUser: {
    name: "Sunita More",
    role: "ASHA", // 'ASHA', 'DOCTOR', 'ADMIN', 'PATIENT'
    roleName: "Frontline Health Activist",
    location: "Shirur PHC Cluster • Talwade SC",
    badgeClass: "badge-role-asha",
    assignedVillages: ["Talwade (Sector 4)", "Pabal", "Shikrapur", "Shirur Rural"]
  },

  // Citizen / Patient ABHA Portal Data (from Stitch screen 2431b0db & 5770725d)
  citizenUser: {
    name: "Ramesh Patil",
    age: 62,
    gender: "Male",
    abhaId: "91-4029-1823-0192",
    abhaAddress: "ramesh.patil@abdm",
    phone: "+91 98220 14920",
    village: "Talwade (Sector 4), Shirur Block",
    assignedAsha: "Sunita More (Talwade Sub-Centre)",
    linkagePhc: "Shirur 24x7 PHC • Dr. A. Kulkarni",
    activePhase: "Stage 6: Post-PHC Stabilization & Home Care Protocol",
    protocolCompliance: "94% on Track",
    statusBadge: "ABDM Verified",
    recentVitals: {
      spo2: "94% (Stable Post-O2)",
      bp: "138/86 mmHg",
      pulse: "78 bpm",
      temp: "98.6 °F",
      lastRecorded: "Today, 09:22 AM by ASHA Sunita"
    },
    prescriptions: [
      {
        medicine: "Amlodipine 5mg",
        dosage: "1 tab daily (Morning)",
        duration: "30 Days",
        source: "Jan Aushadhi Scheme",
        isSubsidized: true,
        status: "Active Refill Available"
      },
      {
        medicine: "Salbutamol Inhaler 100mcg",
        dosage: "2 puffs SOS (Breathlessness)",
        duration: "PRN (As Needed)",
        source: "PHC Shirur Emergency Bay",
        isSubsidized: true,
        status: "In Use"
      },
      {
        medicine: "Cefixime 200mg",
        dosage: "1 tab twice daily after food",
        duration: "5 Days (Day 3/5)",
        source: "PHC OPD Dispensed",
        isSubsidized: false,
        status: "Ongoing Course"
      }
    ],
    upcomingAppointments: [
      {
        date: "Tomorrow, 10:00 AM",
        title: "ASHA Post-Discharge Home Vitals Check",
        provider: "Sunita More (ASHA)",
        location: "Home Visit (Talwade)",
        type: "Home Visit"
      },
      {
        date: "24 Sep 2026",
        title: "PHC Shirur NCD & Spirometry Review",
        provider: "Dr. A. Kulkarni (Medical Officer)",
        location: "Shirur PHC Room 4",
        type: "Clinical Review"
      }
    ],
    consentRecords: [
      {
        provider: "Primary Health Centre (PHC) Shirur",
        purpose: "Care Continuum & Emergency Tele-Consult",
        grantedDate: "Today, 09:40 AM",
        expiry: "Valid for 6 Months",
        status: "Active Consent"
      },
      {
        provider: "National Health Authority (ABDM Grid)",
        purpose: "Longitudinal Electronic Health Record (EHR)",
        grantedDate: "15 Jan 2026",
        expiry: "Perpetual Citizen Consent",
        status: "Active Consent"
      }
    ]
  },

  villages: [
    "Talwade (Sector 4)",
    "Pabal Wadi",
    "Shikrapur Khurd",
    "Shirur Rural",
    "Ambegaon SC"
  ],

  symptomOptions: [
    { id: "breathlessness", label: "Shortness of Breath / Breathlessness", highRisk: true },
    { id: "chest_pain", label: "Chest Tightness / Pain", highRisk: true },
    { id: "high_fever", label: "Persistent High Fever (>3 days)", moderateRisk: true },
    { id: "dizziness", label: "Severe Dizziness / Fainting", moderateRisk: true },
    { id: "cough", label: "Chronic Cough (>2 weeks)", moderateRisk: true },
    { id: "swelling", label: "Bilateral Leg Swelling", moderateRisk: true },
    { id: "fatigue", label: "Extreme Fatigue / Pallor", lowRisk: true },
    { id: "routine", label: "Routine Non-Communicable Screening", lowRisk: true }
  ],

  facilities: [
    {
      id: "phc-shirur",
      name: "Shirur Primary Health Centre (PHC)",
      type: "Primary Health Centre (24x7)",
      distance: "4.2 km",
      doctorInCharge: "Dr. A. Kulkarni, MBBS",
      availability: "Active / Available",
      statusClass: "available",
      capabilities: [
        { name: "24x7 Emergency Desk", active: true },
        { name: "Oxygen Support (4/6 Free)", active: true },
        { name: "Basic Blood Lab & ECG", active: true },
        { name: "108 Ambulance Standby", active: true },
        { name: "ICU Beds", active: false }
      ],
      bedCapacity: "4 / 6 Oxygen Beds Free",
      contact: "02138-222104"
    },
    {
      id: "sdh-junnar",
      name: "Sub-District Hospital (SDH) Junnar",
      type: "Sub-District Hospital",
      distance: "18.2 km",
      doctorInCharge: "Dr. Rajesh Shirole, MD (Medicine)",
      availability: "Available",
      statusClass: "available",
      capabilities: [
        { name: "Emergency Triage", active: true },
        { name: "Oxygen Support", active: true },
        { name: "Advanced Biochemistry", active: true },
        { name: "24x7 Ambulance", active: true },
        { name: "ICU Stabilization", active: true }
      ],
      bedCapacity: "14 / 30 Beds Free",
      contact: "+91 2132 242200"
    },
    {
      id: "sc-talwade",
      name: "Talwade Sub-Centre Health Post",
      type: "Sub-Centre / HWC",
      distance: "1.2 km",
      doctorInCharge: "Sunita More (ASHA) / Geeta ANM",
      availability: "Available",
      statusClass: "available",
      capabilities: [
        { name: "First Aid & Triage", active: true },
        { name: "NCD Screening", active: true },
        { name: "Oral Rehydration", active: true },
        { name: "Oxygen Support", active: false },
        { name: "24x7 Ambulance", active: false }
      ],
      bedCapacity: "Day Care Only",
      contact: "+91 9423 001928"
    },
    {
      id: "dh-pune",
      name: "District Civil Hospital Aundh, Pune",
      type: "District Hospital / Tertiary",
      distance: "42.0 km",
      doctorInCharge: "Dr. S. K. Patil, Chief Medical Officer",
      availability: "High Traffic",
      statusClass: "busy",
      capabilities: [
        { name: "Specialized Cardiology", active: true },
        { name: "Full ICU / Ventilator", active: true },
        { name: "Blood Bank", active: true },
        { name: "CT Scan & Radiography", active: true },
        { name: "24x7 Ambulance Fleet", active: true }
      ],
      bedCapacity: "3 / 60 ICU Free",
      contact: "+91 20 2710 4000"
    }
  ],

  demoPatient: {
    id: "pat-ramesh-patil",
    name: "Ramesh Patil",
    age: 62,
    gender: "Male",
    village: "Talwade (Sector 4)",
    abhaId: "91-4029-1823-0192",
    phone: "+91 98220 14920",
    riskLevel: "HIGH",
    riskClass: "risk-high",
    riskBorderClass: "border-risk-high",
    symptoms: ["Shortness of Breath / Breathlessness", "Chest Tightness / Pain", "Persistent Fever"],
    vitals: {
      spo2: 92,
      spo2Status: "Borderline Hypoxia (SpO2 92%)",
      bpSys: 160,
      bpDia: 98,
      bpStatus: "Stage 2 Hypertension",
      pulse: 104,
      pulseStatus: "Elevated Pulse (Tachycardia)",
      temp: "101.4 °F",
      tempStatus: "Febrile",
      bloodSugar: "186 mg/dL",
      sugarStatus: "Elevated"
    },
    riskIndicators: [
      "Oxygen Saturation (SpO2 92% < 95%)",
      "Elevated Blood Pressure (160/98 mmHg)",
      "Elevated Pulse (104 bpm > 100 bpm)",
      "Reported Acute Chest Tightness & Breathlessness"
    ],
    recommendedAction: "Priority transfer to Shirur PHC Oxygen Stabilization Bay. 108 Ambulance Notified.",
    journeyStep: 4, // 1: Profile, 2: Assessment, 3: Triage, 4: Facility, 5: Referral, 6: Doctor, 7: Follow-up
    currentFacility: "Shirur Primary Health Centre (PHC)",
    assignedAsha: "Sunita More (Talwade SC)",
    timeline: [
      {
        date: "Today, 09:14 AM",
        stage: "1. Profile & Home Visit",
        provider: "Sunita More (ASHA)",
        badge: "badge-role-asha",
        role: "ASHA",
        notes: "Home survey completed in Talwade Sector 4. Patient complained of 36h chest tightness and breathlessness."
      },
      {
        date: "Today, 09:22 AM",
        stage: "2. Clinical Vitals Assessment",
        provider: "Sunita More (ASHA)",
        badge: "badge-role-asha",
        role: "ASHA",
        notes: "SpO2 recorded at 92%, BP: 160/98 mmHg, Pulse: 104 bpm. Saved securely to offline SQLite store."
      },
      {
        date: "Today, 09:24 AM",
        stage: "3. Triage Risk Stratification",
        provider: "Decision Support Algorithm",
        badge: "badge-role-anm",
        role: "Triage Engine",
        notes: "HIGH RISK stratification flagged. Automated alert sent to Shirur Cluster Facility Locator."
      },
      {
        date: "Today, 09:40 AM",
        stage: "4. Facility Match & Bed Reservation",
        provider: "Shirur 24x7 PHC",
        badge: "badge-role-doctor",
        role: "PHC Desk",
        notes: "Oxygen bed reserved (Bed #4). Emergency dispatch token issued: REF-2026-SHIRUR-0982."
      }
    ]
  },

  recentPatients: [
    {
      id: "pat-ramesh-patil",
      name: "Ramesh Patil",
      age: 62,
      gender: "Male",
      village: "Talwade",
      abhaId: "91-4029-1823-0192",
      riskLevel: "HIGH",
      riskClass: "risk-high",
      spo2: "92%",
      bp: "160/98",
      pulse: "104 bpm",
      status: "Referred to Shirur PHC",
      lastVisit: "Today, 09:22 AM",
      journeyStep: 4
    },
    {
      id: "pat-sunita-jadhav",
      name: "Sunita Jadhav",
      age: 28,
      gender: "Female",
      village: "Pabal",
      abhaId: "91-8831-4491-3820",
      riskLevel: "MODERATE",
      riskClass: "risk-moderate",
      spo2: "98%",
      bp: "132/86",
      pulse: "80 bpm",
      status: "ANC 28w • Hb 9.2 g/dL",
      lastVisit: "Yesterday",
      journeyStep: 2
    },
    {
      id: "pat-ananda-shinde",
      name: "Ananda Shinde",
      age: 45,
      gender: "Male",
      village: "Shikrapur",
      abhaId: "91-2291-7712-4411",
      riskLevel: "LOW",
      riskClass: "risk-low",
      spo2: "99%",
      bp: "122/80",
      pulse: "74 bpm",
      status: "Amlodipine 5mg Refilled",
      lastVisit: "3 days ago",
      journeyStep: 7
    },
    {
      id: "pat-kavita-rathod",
      name: "Kavita Rahul Rathod",
      age: 8,
      gender: "Female",
      village: "Shirur Rural",
      abhaId: "91-5541-9023-7710",
      riskLevel: "EMERGENCY",
      riskClass: "risk-emergency",
      spo2: "84%",
      bp: "90/58",
      pulse: "132 bpm",
      status: "District Transfer En Route",
      lastVisit: "Today, 07:45 AM",
      journeyStep: 5
    }
  ],

  doctorQueue: [
    {
      id: "pat-ramesh-patil",
      name: "Ramesh Patil",
      age: 62,
      gender: "Male",
      village: "Talwade",
      abhaId: "91-4029-1823-0192",
      riskLevel: "HIGH",
      riskClass: "risk-high",
      referralReason: "Acute Breathlessness + SpO2 92% + SBP 160 mmHg",
      referredBy: "Sunita More (ASHA, Talwade)",
      arrivalTime: "En route 108 Ambulance (ETA: 10 mins)",
      vitalsSummary: "SpO2: 92% • BP: 160/98 • Pulse: 104 • Temp: 101.4°F"
    },
    {
      id: "pat-kavita-rathod",
      name: "Kavita Rahul Rathod",
      age: 8,
      gender: "Female",
      village: "Shirur Rural",
      abhaId: "91-5541-9023-7710",
      riskLevel: "EMERGENCY",
      riskClass: "risk-emergency",
      referralReason: "Severe Pediatric Dehydration + Hypoxemia",
      referredBy: "Geeta Devi (ANM)",
      arrivalTime: "Arrived at Emergency Bay",
      vitalsSummary: "SpO2: 84% • Pulse: 132 • Temp: 103.8°F"
    }
  ],

  adminStats: {
    totalPatientsRegistered: 1248,
    handledToday: 38,
    highRiskCases: 7,
    activeReferrals: 12,
    followUpsPending: 19,
    syncRate: "99.4%",
    facilitiesOperational: "24 / 24"
  },

  triageDistribution: {
    total: 148,
    lowPct: 60,
    modPct: 25,
    highPct: 15,
    ncdCompletion: "82% Completed"
  }
};

if (typeof window !== 'undefined') {
  window.SWASTHYA_DATA = SWASTHYA_DATA;
  window.mockData = SWASTHYA_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SWASTHYA_DATA;
}

