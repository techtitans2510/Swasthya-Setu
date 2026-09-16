/**
 * SwasthyaSetu Realistic Rural Healthcare Mock Dataset
 * Geographies: Rural Maharashtra / India Public Health Network
 */

const SWASTHYA_DATA = {
  currentUser: {
    name: "Sunita More",
    role: "ASHA", // 'ASHA', 'DOCTOR', 'ADMIN'
    roleName: "Frontline Health Activist",
    location: "Sub-Centre Ambegaon, Block Junnar",
    badgeClass: "badge-role-asha",
    assignedVillages: ["Ambegaon", "Pimpalgaon", "Wadgaon"]
  },

  villages: [
    "Ambegaon (Sub-Centre Area)",
    "Pimpalgaon (Wadi 1-3)",
    "Wadgaon Khurd",
    "Ghoti Phata",
    "Khed Rural"
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
      id: "phc-khed",
      name: "Primary Health Centre (PHC) Khed",
      type: "Primary Health Centre",
      distance: "6.4 km",
      doctorInCharge: "Dr. Anjali Deshmukh, MBBS",
      availability: "Available",
      statusClass: "available",
      capabilities: [
        { name: "Emergency Triage", active: true },
        { name: "Oxygen Concentrator", active: true },
        { name: "Basic Blood Lab", active: true },
        { name: "24x7 Ambulance", active: true },
        { name: "ICU Beds", active: false }
      ],
      bedCapacity: "6 / 10 Beds Free",
      contact: "+91 2135 224100"
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
      id: "sc-ambegaon",
      name: "Sub-Centre Health Post Ambegaon",
      type: "Sub-Centre / HWC",
      distance: "1.2 km",
      doctorInCharge: "Geeta Devi (ANM Senior)",
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
    name: "Ramesh Tukaram Patil",
    age: 62,
    gender: "Male",
    village: "Ambegaon (Wadi 2)",
    abhaId: "91-4820-1928-3341",
    phone: "+91 98220 14920",
    riskLevel: "HIGH",
    riskClass: "risk-high",
    riskBorderClass: "border-risk-high",
    symptoms: ["Shortness of Breath / Breathlessness", "Chest Tightness / Pain", "Persistent Fever"],
    vitals: {
      spo2: 89,
      spo2Status: "Abnormal (Hypoxia)",
      bpSys: 158,
      bpDia: 96,
      bpStatus: "Stage 2 Hypertension",
      pulse: 104,
      pulseStatus: "Elevated (Tachycardia)",
      temp: "101.4 °F",
      tempStatus: "Febrile",
      bloodSugar: "186 mg/dL (Random)",
      sugarStatus: "Elevated"
    },
    riskIndicators: [
      "Low Oxygen Saturation (SpO2 89% < 92%)",
      "Elevated Blood Pressure (158/96 mmHg)",
      "Tachycardia (Pulse 104 bpm > 100 bpm)",
      "High-risk acute respiratory distress flag"
    ],
    recommendedAction: "Urgent transfer referral to PHC Khed or SDH Junnar with continuous oxygen monitoring.",
    journeyStep: 4, // 1: Patient, 2: Assessment, 3: Triage, 4: Facility Selected, 5: Referral, 6: Doctor, 7: Follow-up
    currentFacility: "Primary Health Centre (PHC) Khed",
    assignedAsha: "Sunita More (Ambegaon)",
    timeline: [
      {
        date: "Today, 09:15 AM",
        stage: "Home Visit & Vitals Triage",
        provider: "Sunita More (ASHA)",
        badge: "badge-role-asha",
        role: "ASHA",
        notes: "Patient reported acute breathlessness for 36 hours. SpO2 recorded at 89%. Triage classified as HIGH RISK. Facility locator triggered."
      },
      {
        date: "Today, 09:40 AM",
        stage: "PHC Referral Escalated",
        provider: "Sub-Centre Ambegaon",
        badge: "badge-role-anm",
        role: "ANM / Tele-Link",
        notes: "Emergency referral token generated (REF-2026-0918). PHC Khed notified for oxygen bay readiness."
      },
      {
        date: "14 Days Ago",
        stage: "Routine NCD Screening",
        provider: "Sunita More (ASHA)",
        badge: "badge-role-asha",
        role: "ASHA",
        notes: "BP: 142/88. Patient advised to continue daily Amlodipine 5mg and salt reduction."
      }
    ]
  },

  recentPatients: [
    {
      id: "pat-ramesh-patil",
      name: "Ramesh Tukaram Patil",
      age: 62,
      gender: "Male",
      village: "Ambegaon",
      abhaId: "91-4820-1928-3341",
      riskLevel: "HIGH",
      riskClass: "risk-high",
      spo2: "89%",
      bp: "158/96",
      pulse: "104 bpm",
      status: "Facility Referral Active",
      lastVisit: "Today, 09:15 AM",
      journeyStep: 4
    },
    {
      id: "pat-sunita-kamble",
      name: "Sunita Ashok Kamble",
      age: 28,
      gender: "Female",
      village: "Pimpalgaon",
      abhaId: "91-2309-8812-4091",
      riskLevel: "MODERATE",
      riskClass: "risk-moderate",
      spo2: "97%",
      bp: "138/88",
      pulse: "82 bpm",
      status: "ANC 2nd Trimester Check",
      lastVisit: "Yesterday",
      journeyStep: 2
    },
    {
      id: "pat-ganesh-shinde",
      name: "Ganesh Maruti Shinde",
      age: 45,
      gender: "Male",
      village: "Wadgaon",
      abhaId: "91-7712-4509-1288",
      riskLevel: "LOW",
      riskClass: "risk-low",
      spo2: "99%",
      bp: "122/80",
      pulse: "72 bpm",
      status: "Follow-up Complete",
      lastVisit: "3 days ago",
      journeyStep: 7
    },
    {
      id: "pat-kavita-rathod",
      name: "Kavita Rahul Rathod",
      age: 8,
      gender: "Female",
      village: "Khed Rural",
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
      name: "Ramesh Tukaram Patil",
      age: 62,
      gender: "Male",
      village: "Ambegaon",
      abhaId: "91-4820-1928-3341",
      riskLevel: "HIGH",
      riskClass: "risk-high",
      referralReason: "Acute Hypoxia (SpO2 89%) + Tachycardia + Breathlessness",
      referredBy: "Sunita More (ASHA, Ambegaon)",
      arrivalTime: "En route (15 mins away)",
      vitalsSummary: "SpO2: 89% • BP: 158/96 • Pulse: 104 • Temp: 101.4°F"
    },
    {
      id: "pat-kavita-rathod",
      name: "Kavita Rahul Rathod",
      age: 8,
      gender: "Female",
      village: "Khed Rural",
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
  }
};
