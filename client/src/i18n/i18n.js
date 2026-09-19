/**
 * SwasthyaSetu Multilingual Internationalization (i18n) Engine
 * Supported Languages: English (en), Marathi (mr), Hindi (hi)
 * Design Movement: Civic Functionalism & ABDM Health Grid Compatibility
 * 4 Distinct Role Domains: Patient, ASHA Worker, Doctor / Medical Officer, Health Admin
 */

const I18N_DATA = {
  en: {
    app_title: "SwasthyaSetu",
    app_subtitle: "Rural Healthcare Continuity Network",
    
    // Roles
    role_asha: "ASHA Worker",
    role_doctor: "Doctor (MO)",
    role_admin: "Health Admin",
    role_patient: "Patient (ABHA)",
    
    // Global Navigation & Header
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_find_doctor: "Find Doctor",
    nav_appointments: "Appointments",
    nav_medical_records: "Medical Records",
    nav_prescriptions: "Prescriptions",
    nav_health_history: "Health History",
    nav_notifications: "Notifications",
    nav_profile_abha: "Profile & ABHA Card",
    nav_triage: "Triage & Vitals",
    nav_patients: "Village Patients",
    nav_facilities: "Facility Finder",
    nav_referrals: "Active Referrals",
    nav_tasks: "Field Tasks",
    nav_consultations: "Clinical Station",
    nav_opd_schedule: "OPD Schedule",
    nav_availability: "Duty & Availability",
    nav_district_overview: "District Overview",
    nav_doctor_verification: "Doctor Verification",
    nav_asha_management: "ASHA Management",
    nav_facility_capacity: "Facility Capacity",
    nav_transfer_logistics: "Transfer Logistics",
    nav_reports_analytics: "Reports & Analytics",
    nav_system_settings: "System Settings",

    // Network & Sync Status
    status_online: "Online · Synced 2m ago",
    status_offline: "Offline · Working locally",
    status_synced_now: "Synced just now",
    status_pending_sync: "records waiting to sync",
    btn_sync_now: "Sync Now",
    offline_banner_text: "Offline Mode Active • Your records are stored securely on this device and will sync automatically once connected.",
    emergency_108: "108 Emergency",
    helpline_104: "104 / 14416 (24x7 Tele-MANAS)",

    // Patient Persona Specific
    patient_welcome_title: "Welcome back, Ramesh",
    patient_welcome_sub: "Your Ayushman Bharat longitudinal health account is active & verified.",
    find_doctor_title: "Find a Doctor & Book Consultation",
    find_doctor_sub: "Search verified doctors, primary health centres, and district hospital specialists. Zero out-of-pocket fees.",
    search_doctor_placeholder: "Search by doctor name, specialty (e.g. Heart, Eye, General), or hospital...",
    filter_all_specialists: "All Specialists",
    filter_cardiology: "Cardiology (Heart)",
    filter_general: "General Medicine / PHC",
    filter_orthopedics: "Orthopedics (Bone & Joint)",
    filter_gynecology: "Gynecology & Women's Health",
    filter_pediatrics: "Pediatrics (Child Health)",
    filter_near_me: "Near Me (Shirur / Pune Rural)",
    filter_available_today: "Available Today",
    filter_teleconsult: "Teleconsultation Available",
    earliest_slot: "Earliest Slot",
    consultation_fee: "Consultation Fee",
    fee_free_ayushman: "FREE (Ayushman Bharat / NHM)",
    btn_book_slot: "Select & Book Slot",
    btn_view_doctor_profile: "View Profile & Timings",
    book_drawer_title: "Book Consultation Slot",
    select_consult_mode: "Consultation Mode",
    mode_in_person: "In-Person Clinic Visit",
    mode_video: "Video Teleconsultation",
    select_date_label: "Select Date",
    select_time_label: "Select Time Slot",
    reason_label: "Reason for Consultation / Symptoms",
    assisted_by_asha: "Assisted by ASHA Sunita More (Talwade SC)",
    btn_confirm_appointment: "Confirm Appointment & Generate Token",
    my_appointments_title: "My Consultations & Appointments",
    tab_upcoming: "Upcoming Visits",
    tab_past: "Past History",
    token_number: "Token No",
    btn_cancel: "Cancel",
    btn_reschedule: "Reschedule",
    btn_download_slip: "Download Slip",
    prescriptions_title: "My Prescriptions & Medicines",
    prescriptions_sub: "Verified digital prescriptions dispensed under Jan Aushadhi & NHM schemes.",
    btn_request_refill: "Request Jan Aushadhi Refill",
    records_title: "Longitudinal Medical Records",
    records_sub: "Unified ABDM audit trail of consultations, vitals snapshots, and lab reports.",
    health_history_title: "Health History & Chronic Conditions",
    profile_title: "Citizen Profile & ABHA Card",
    btn_download_abha_card: "Download ABHA Card (QR)",

    // Doctor Persona Specific
    doctor_station_title: "Medical Officer Clinical Workstation",
    doctor_station_sub: "Shirur Primary Health Centre (24x7 PHC) • Dr. A. Kulkarni (MBBS, DNB)",
    tele_triage_queue: "Emergency & Priority Queue",
    opd_waiting_queue: "Routine OPD Queue",
    clinical_notes_title: "Clinical Consultation & E-Prescription",
    vitals_snapshot: "Recorded Frontline Vitals",
    doctor_diagnosis_label: "Clinical Diagnosis & Findings",
    doctor_orders_label: "Doctor's Treatment Orders & Tele-Prescription",
    btn_issue_prescription: "Save Clinical Note & Issue Prescription",
    doctor_availability_title: "Doctor Duty & OPD Availability",
    duty_status_label: "On Duty Status",
    on_duty_active: "Active on Duty",
    on_duty_away: "Away / Off Duty",
    opd_timings_label: "Daily OPD Consultation Hours",

    // Admin Persona Specific
    admin_overview_title: "District Healthcare Administration Overview",
    admin_overview_sub: "Pune District Public Health Surveillance Network • Shirur & Junnar Clusters",
    kpi_total_population: "Total Population Registered",
    kpi_high_risk: "High-Risk Escalations",
    kpi_active_referrals: "Active Transfer Referrals",
    kpi_sync_rate: "Offline-to-Cloud Sync Rate",
    doctor_verifications_title: "Doctor Credential Verification Queue",
    doctor_verifications_sub: "Review medical licenses and council registrations against State Medical Council (MMC) records.",
    btn_verify_doctor: "Verify & Approve Credential",
    btn_reject_doctor: "Reject Application",
    asha_management_title: "ASHA Cadre & Village Coverage Directory",
    asha_management_sub: "Monitor frontline performance, population screening coverage, and device sync status.",
    facility_readiness_title: "Facility Readiness & Oxygen Capacity",
    facility_readiness_sub: "District-wide real-time inventory of oxygen concentrators, ICU beds, and ambulance readiness.",

    // ASHA Persona Specific
    asha_dashboard_title: "ASHA Frontline Community Dashboard",
    asha_dashboard_sub: "Sub-Centre Ambegaon • Talwade & Pabal Clusters",
    dash_handled_today: "Daily Census",
    dash_high_risk: "High Risk Cases",
    dash_pending_referrals: "Pending Referrals",
    dash_followups_due: "Follow-ups Due",
    dash_quick_register: "+ Register New Patient",
    dash_record_vitals: "Record Vitals & Triage",
    dash_facility_finder: "Nearest Facility Finder",
    village_patients_title: "Village Health Registry",
    field_tasks_title: "Daily Field Work & Home Visits",

    // Vitals & Triage
    vitals_title: "Clinical Symptoms & Vitals Assessment",
    vitals_bp: "Blood Pressure (Sys/Dia mmHg)",
    vitals_spo2: "Oxygen Saturation SpO2 (%)",
    vitals_pulse: "Pulse Rate (bpm)",
    vitals_temp: "Body Temperature (°F)",
    vitals_sugar: "Blood Sugar (mg/dL)",
    risk_low: "LOW RISK",
    risk_moderate: "MODERATE RISK",
    risk_high: "HIGH RISK",
    risk_emergency: "EMERGENCY",
    triage_disclaimer: "Clinical Guardrail: Algorithmic decision support only. Final diagnosis and care plan is confirmed by authorized Medical Officers under MoHFW IPHS standards.",

    // Common Buttons
    btn_continue: "Continue",
    btn_back: "Back",
    btn_save: "Save",
    btn_submit: "Submit",
    btn_close: "Close"
  },

  mr: {
    app_title: "स्वास्थ्यसेतू",
    app_subtitle: "ग्रामीण आरोग्य सातत्य प्रणाली",
    
    // Roles
    role_asha: "आशा कार्यकर्ती",
    role_doctor: "वैद्यकीय अधिकारी",
    role_admin: "आरोग्य प्रशासन",
    role_patient: "रुग्ण / नागरिक (आभा)",
    
    // Global Navigation & Header
    nav_home: "मुख्यपृष्ठ",
    nav_dashboard: "डॅशबोर्ड",
    nav_find_doctor: "डॉक्टर शोधा",
    nav_appointments: "तपासणी भेटी",
    nav_medical_records: "आरोग्य नोंदी",
    nav_prescriptions: "औषधोपचार (प्रिस्क्रिप्शन)",
    nav_health_history: "आरोग्य इतिहास",
    nav_notifications: "सूचना",
    nav_profile_abha: "माझे प्रोफाईल व आभा",
    nav_triage: "तपासणी व ट्रियाज",
    nav_patients: "गाव रुग्ण यादी",
    nav_facilities: "आरोग्य केंद्र शोध",
    nav_referrals: "सक्रिय संदर्भ सेवा",
    nav_tasks: "क्षेत्रीय कामे",
    nav_consultations: "तपासणी कक्ष",
    nav_opd_schedule: "ओपीडी वेळापत्रक",
    nav_availability: "उपलब्धता स्थिती",
    nav_district_overview: "जिल्हा विहंगावलोकन",
    nav_doctor_verification: "डॉक्टर पडताळणी",
    nav_asha_management: "आशा व्यवस्थापन",
    nav_facility_capacity: "केंद्र क्षमता व बेड्स",
    nav_transfer_logistics: "रेफरल व वाहतूक",
    nav_reports_analytics: "अहवाल व विश्लेषण",
    nav_system_settings: "प्रणाली सेटिंग्ज",

    // Network & Sync Status
    status_online: "ऑनलाइन · आत्ताच सिंक झाले",
    status_offline: "ऑफलाइन · डिव्हाइसवर कार्यरत",
    status_synced_now: "नुकतेच सिंक झाले",
    status_pending_sync: "नोंदी सिंक होणे बाकी",
    btn_sync_now: "आता सिंक करा",
    offline_banner_text: "ऑफलाइन मोड सक्रिय • तुमची माहिती डिव्हाइसवर सुरक्षित आहे आणि इंटरनेट उपलब्ध झाल्यावर आपोआप सिंक होईल.",
    emergency_108: "१०८ रुग्णवाहिका आणीबाणी",
    helpline_104: "१०४ / १४४१६ (२४/७ टेलि-मानस)",

    // Patient Persona Specific
    patient_welcome_title: "स्वागत आहे, रमेशजी",
    patient_welcome_sub: "तुमचे आयुष्मान भारत (आभा) खाते सक्रिय आणि सत्यापित आहे.",
    find_doctor_title: "डॉक्टर शोधा आणि भेट निश्चित करा",
    find_doctor_sub: "तज्ज्ञ डॉक्टर, प्राथमिक आरोग्य केंद्र आणि जिल्हा रुग्णालय सेवा. सरकारी योजनेअंतर्गत मोफत.",
    search_doctor_placeholder: "डॉक्टरांचे नाव, विशेषतज्ज्ञ (हृदयरोग, नेत्र, बालरोग) किंवा रुग्णालय शोधा...",
    filter_all_specialists: "सर्व तज्ज्ञ",
    filter_cardiology: "हृदयरोग (Cardiology)",
    filter_general: "सामान्य तपासणी / PHC",
    filter_orthopedics: "हाडे व सांधे (Orthopedics)",
    filter_gynecology: "महिला आरोग्य व प्रसूती",
    filter_pediatrics: "बालरोग (Pediatrics)",
    filter_near_me: "जवळचे केंद्र (शिरूर / पुणे ग्रामीण)",
    filter_available_today: "आज उपलब्ध",
    filter_teleconsult: "व्हिडिओ तपासणी उपलब्ध",
    earliest_slot: "लवकरात लवकर वेळ",
    consultation_fee: "तपासणी शुल्क",
    fee_free_ayushman: "मोफत (आयुष्मान भारत / NHM)",
    btn_book_slot: "वेळ निवडा व बुक करा",
    btn_view_doctor_profile: "माहिती व वेळा पहा",
    book_drawer_title: "तपासणी वेळ निश्चित करा",
    select_consult_mode: "तपासणी प्रकार",
    mode_in_person: "दवाखान्यात प्रत्यक्ष भेट",
    mode_video: "व्हिडिओ तपासणी (Teleconsult)",
    select_date_label: "तारीख निवडा",
    select_time_label: "वेळ निवडा",
    reason_label: "तपासणीचे कारण / लक्षणे",
    assisted_by_asha: "आशा कार्यकर्ती सुनिता मोरे (तळवडे) यांच्या सहाय्याने",
    btn_confirm_appointment: "अपॉइंटमेंट निश्चित करा व टोकन मिळवा",
    my_appointments_title: "माझ्या तपासणी भेटी",
    tab_upcoming: "आगामी भेटी",
    tab_past: "मागील इतिहास",
    token_number: "टोकन क्रमांक",
    btn_cancel: "रद्द करा",
    btn_reschedule: "वेळ बदला",
    btn_download_slip: "पावती डाऊनलोड",
    prescriptions_title: "माझी औषधे व प्रिस्क्रिप्शन",
    prescriptions_sub: "जन औषधी व सरकारी योजनेअंतर्गत मंजूर झालेली डिजिटल औषध पावती.",
    btn_request_refill: "जन औषधी रिफिल विनंती",
    records_title: "माझे आरोग्य दस्तऐवज",
    records_sub: "तपासणी नोंदी, प्रयोगशाळा अहवाल आणि डिस्चार्ज सारांशाचा कायमस्वरूपी इतिहास.",
    health_history_title: "आरोग्य इतिहास व जुने आजार",
    profile_title: "नागरिक प्रोफाईल व आभा कार्ड",
    btn_download_abha_card: "आभा कार्ड (QR) डाऊनलोड",

    // Doctor Persona Specific
    doctor_station_title: "वैद्यकीय अधिकारी क्लिनिकल कक्ष",
    doctor_station_sub: "शिरूर २४x७ प्राथमिक आरोग्य केंद्र (PHC) • डॉ. ए. कुलकर्णी (MBBS, DNB)",
    tele_triage_queue: "तातडीची व प्राधान्य रांग",
    opd_waiting_queue: "नियमित ओपीडी रांग",
    clinical_notes_title: "रुग्ण तपासणी व ई-प्रिस्क्रिप्शन",
    vitals_snapshot: "घरी नोंदवलेली शारीरिक लक्षणे",
    doctor_diagnosis_label: "क्लिनिकल निदान व निरीक्षणे",
    doctor_orders_label: "औषधोपचार व वैद्यकीय सूचना",
    btn_issue_prescription: "प्रिस्क्रिप्शन जतन करा व औषधे द्या",
    doctor_availability_title: "डॉक्टर कर्तव्य व उपलब्धता स्थिती",
    duty_status_label: "कर्तव्य स्थिती",
    on_duty_active: "कर्तव्यावर उपस्थित",
    on_duty_away: "सध्या अनुपलब्ध",
    opd_timings_label: "दैनिक ओपीडी वेळापत्रक",

    // Admin Persona Specific
    admin_overview_title: "जिल्हा सार्वजनिक आरोग्य प्रशासन विहंगावलोकन",
    admin_overview_sub: "पुणे जिल्हा सार्वजनिक आरोग्य देखरेख यंत्रणा • शिरूर व जुन्नर विभाग",
    kpi_total_population: "एकूण नोंदणीकृत लोकसंख्या",
    kpi_high_risk: "अतिजोखमीचे रुग्ण",
    kpi_active_referrals: "सक्रिय रेफरल्स",
    kpi_sync_rate: "ऑफलाइन सिंक प्रमाण",
    doctor_verifications_title: "डॉक्टर नोंदणी व परवाना पडताळणी",
    doctor_verifications_sub: "महाराष्ट्र मेडिकल कौन्सिल (MMC) नोंदींनुसार डॉक्टरांच्या अर्जांची तपासणी करा.",
    btn_verify_doctor: "मंजूर व सक्रिय करा",
    btn_reject_doctor: "अर्ज नाकारा",
    asha_management_title: "आशा कार्यकर्ती व गाव वाटप यादी",
    asha_management_sub: "कार्यकर्तींची कामगिरी, लोकसंख्या तपासणी प्रमाण आणि सिंक स्थिती पहा.",
    facility_readiness_title: "आरोग्य केंद्र सज्जता व ऑक्सिजन क्षमता",
    facility_readiness_sub: "जिल्ह्यातील ऑक्सिजन बेड्स, आयसीयू आणि रुग्णवाहिकांची सद्यस्थिती.",

    // ASHA Persona Specific
    asha_dashboard_title: "आशा कार्यकर्ती मुख्य दालन",
    asha_dashboard_sub: "उपकेंद्र आंबेगाव • तळवडे व पाबळ कार्यक्षेत्र",
    dash_handled_today: "आजची रुग्णसंख्या",
    dash_high_risk: "अतिजोखमीचे रुग्ण",
    dash_pending_referrals: "प्रलंबित रेफरल्स",
    dash_followups_due: "पाठपुरावा बाकी",
    dash_quick_register: "+ नवीन रुग्ण नोंदवा",
    dash_record_vitals: "तपासणी व ट्रियाज",
    dash_facility_finder: "जवळचे आरोग्य केंद्र",
    village_patients_title: "गाव रुग्ण नोंदवही",
    field_tasks_title: "दैनंदिन क्षेत्रीय कामे व घरभेटी",

    // Vitals & Triage
    vitals_title: "शारीरिक तपासणी व लक्षणे",
    vitals_bp: "रक्तदाब (BP mmHg)",
    vitals_spo2: "ऑक्सिजन पातळी SpO2 (%)",
    vitals_pulse: "नाडीचे ठोके (bpm)",
    vitals_temp: "शरीराचे तापमान (°F)",
    vitals_sugar: "रक्तातील साखर (mg/dL)",
    risk_low: "कमी जोखीम",
    risk_moderate: "मध्यम जोखीम",
    risk_high: "उच्च जोखीम",
    risk_emergency: "आणीबाणी / तातडीची",
    triage_disclaimer: "क्लिनिकल मार्गदर्शक: प्रणाली केवळ लक्षणांवरून जोखीम वर्गीकरण सुचवते. अंतिम निदान प्राथमिक आरोग्य केंद्राचे अधिकृत वैद्यकीय अधिकारीच निश्चित करतील.",

    // Common Buttons
    btn_continue: "पुढे जा",
    btn_back: "मागे",
    btn_save: "जतन करा",
    btn_submit: "सादर करा",
    btn_close: "बंद करा"
  },

  hi: {
    app_title: "स्वास्थ्यसेतु",
    app_subtitle: "ग्रामीण स्वास्थ्य निरंतरता मंच",
    
    // Roles
    role_asha: "आशा कार्यकर्ता",
    role_doctor: "चिकित्सा अधिकारी",
    role_admin: "स्वास्थ्य प्रशासन",
    role_patient: "मरीज / नागरिक (आभा)",
    
    // Global Navigation & Header
    nav_home: "होम",
    nav_dashboard: "डैशबोर्ड",
    nav_find_doctor: "डॉक्टर खोजें",
    nav_appointments: "परामर्श अपॉइंटमेंट",
    nav_medical_records: "स्वास्थ्य रिकॉर्ड",
    nav_prescriptions: "दवाइयां (नुस्खे)",
    nav_health_history: "स्वास्थ्य इतिहास",
    nav_notifications: "सूचनाएं",
    nav_profile_abha: "प्रोफाइल एवं आभा कार्ड",
    nav_triage: "जांच एवं ट्राइएज",
    nav_patients: "गांव मरीज सूची",
    nav_facilities: "अस्पताल खोज",
    nav_referrals: "सक्रिय रेफरल",
    nav_tasks: "दैनिक कार्य",
    nav_consultations: "परामर्श कक्ष",
    nav_opd_schedule: "ओपीडी समय सारणी",
    nav_availability: "उपलब्धता स्थिति",
    nav_district_overview: "जिला समीक्षा",
    nav_doctor_verification: "डॉक्टर सत्यापन",
    nav_asha_management: "आशा प्रबंधन",
    nav_facility_capacity: "अस्पताल क्षमता व बेड्स",
    nav_transfer_logistics: "रेफरल व एम्बुलेंस",
    nav_reports_analytics: "रिपोर्ट्स व विश्लेषण",
    nav_system_settings: "सिस्टम सेटिंग्स",

    // Network & Sync Status
    status_online: "ऑनलाइन · अभी सिंक हुआ",
    status_offline: "ऑफ़लाइन मोड · सुरक्षित सहेजा",
    status_synced_now: "अभी सिंक हुआ",
    status_pending_sync: "रिकॉर्ड सिंक होना बाकी",
    btn_sync_now: "अभी सिंक करें",
    offline_banner_text: "ऑफ़लाइन मोड सक्रिय • आपकी प्रविष्टियां डिवाइस पर सुरक्षित हैं और इंटरनेट आने पर स्वतः सिंक हो जाएंगी।",
    emergency_108: "108 आपातकालीन एम्बुलेंस",
    helpline_104: "104 / 14416 (24x7 टेली-मानस)",

    // Patient Persona Specific
    patient_welcome_title: "स्वागत है, रमेश जी",
    patient_welcome_sub: "आपका आयुष्मान भारत (आभा) खाता सक्रिय एवं सत्यापित है।",
    find_doctor_title: "डॉक्टर खोजें एवं परामर्श बुक करें",
    find_doctor_sub: "सत्यापित विशेषज्ञ डॉक्टर, प्राथमिक स्वास्थ्य केंद्र एवं जिला अस्पताल। सरकारी योजनांतर्गत निःशुल्क।",
    search_doctor_placeholder: "डॉक्टर का नाम, विशेषता (हृदय, आंख, बालरोग) या अस्पताल खोजें...",
    filter_all_specialists: "सभी विशेषज्ञ",
    filter_cardiology: "हृदय रोग (Cardiology)",
    filter_general: "सामान्य चिकित्सा / PHC",
    filter_orthopedics: "हड्डी व जोड़ (Orthopedics)",
    filter_gynecology: "महिला स्वास्थ्य व प्रसूति",
    filter_pediatrics: "बाल रोग (Pediatrics)",
    filter_near_me: "निकटतम (शिरूर / पुणे ग्रामीण)",
    filter_available_today: "आज उपलब्ध",
    filter_teleconsult: "वीडियो परामर्श उपलब्ध",
    earliest_slot: "शीघ्रतम उपलब्ध समय",
    consultation_fee: "परामर्श शुल्क",
    fee_free_ayushman: "निःशुल्क (आयुष्मान भारत / NHM)",
    btn_book_slot: "समय चुनें व बुक करें",
    btn_view_doctor_profile: "प्रोफाइल व समय देखें",
    book_drawer_title: "परामर्श समय निर्धारित करें",
    select_consult_mode: "परामर्श प्रकार",
    mode_in_person: "अस्पताल में व्यक्तिगत परामर्श",
    mode_video: "वीडियो टेली-परामर्श",
    select_date_label: "दिनांक चुनें",
    select_time_label: "समय चुनें",
    reason_label: "परामर्श का कारण / लक्षण",
    assisted_by_asha: "आशा कार्यकर्ता सुनीता मोरे (तलवाड़े) की सहायता से",
    btn_confirm_appointment: "अपॉइंटमेंट पक्की करें एवं टोकन पाएं",
    my_appointments_title: "मेरे परामर्श एवं अपॉइंटमेंट",
    tab_upcoming: "आगामी परामर्श",
    tab_past: "पिछला इतिहास",
    token_number: "टोकन संख्या",
    btn_cancel: "रद्द करें",
    btn_reschedule: "समय बदलें",
    btn_download_slip: "पर्ची डाउनलोड करें",
    prescriptions_title: "मेरी दवाइयां एवं पर्चे",
    prescriptions_sub: "जन औषधि व सरकारी योजना के तहत स्वीकृत डिजिटल पर्चे।",
    btn_request_refill: "जन औषधि रिफिल अनुरोध",
    records_title: "दीर्घकालिक स्वास्थ्य रिकॉर्ड",
    records_sub: "परामर्श, जांच रिपोर्ट और डिस्चार्ज सारांश का सुरक्षित लेखा-जोखा।",
    health_history_title: "स्वास्थ्य इतिहास एवं पुरानी बीमारियां",
    profile_title: "नागरिक प्रोफाइल एवं आभा कार्ड",
    btn_download_abha_card: "आभा कार्ड (QR) डाउनलोड",

    // Doctor Persona Specific
    doctor_station_title: "चिकित्सा अधिकारी क्लिनिकल कक्ष",
    doctor_station_sub: "शिरूर 24x7 प्राथमिक स्वास्थ्य केंद्र (PHC) • डॉ. ए. कुलकर्णी (MBBS, DNB)",
    tele_triage_queue: "आपातकालीन एवं प्राथमिकता कतार",
    opd_waiting_queue: "नियमित ओपीडी कतार",
    clinical_notes_title: "मरीज जांच एवं ई-प्रिस्क्रिप्शन",
    vitals_snapshot: "घर पर दर्ज शारीरिक लक्षण",
    doctor_diagnosis_label: "क्लिनिकल निदान एवं अवलोकन",
    doctor_orders_label: "दवाएं एवं चिकित्सकीय निर्देश",
    btn_issue_prescription: "प्रिस्क्रिप्शन सहेजें एवं जारी करें",
    doctor_availability_title: "डॉक्टर ड्यूटी एवं उपलब्धता स्थिति",
    duty_status_label: "ड्यूटी स्थिति",
    on_duty_active: "ड्यूटी पर उपस्थित",
    on_duty_away: "अनुपस्थित / अवकाश",
    opd_timings_label: "दैनिक ओपीडी परामर्श समय",

    // Admin Persona Specific
    admin_overview_title: "जिला जन स्वास्थ्य प्रशासन समीक्षा",
    admin_overview_sub: "पुणे जिला सार्वजनिक स्वास्थ्य निगरानी नेटवर्क • शिरूर एवं जुन्नर ब्लॉक",
    kpi_total_population: "कुल पंजीकृत जनसंख्या",
    kpi_high_risk: "उच्च जोखिम मरीज",
    kpi_active_referrals: "सक्रिय रेफरल",
    kpi_sync_rate: "ऑफ़लाइन सिंक दर",
    doctor_verifications_title: "डॉक्टर पंजीकरण एवं प्रमाण-पत्र सत्यापन",
    doctor_verifications_sub: "महाराष्ट्र मेडिकल काउंसिल (MMC) रिकॉर्ड के आधार पर डॉक्टर आवेदनों की जांच करें।",
    btn_verify_doctor: "सत्यापित एवं स्वीकृत करें",
    btn_reject_doctor: "आवेदन अस्वीकार करें",
    asha_management_title: "आशा कार्यकर्ता एवं गांव आवंटन डायरेक्टरी",
    asha_management_sub: "कार्यकर्ताओं का प्रदर्शन, जनसंख्या स्क्रीनिंग कवरेज और सिंक स्थिति देखें।",
    facility_readiness_title: "अस्पताल तैयारी एवं ऑक्सीजन क्षमता",
    facility_readiness_sub: "जिले के ऑक्सीजन बेड्स, आईसीयू एवं एम्बुलेंस की वास्तविक स्थिति।",

    // ASHA Persona Specific
    asha_dashboard_title: "आशा कार्यकर्ता मुख्य डैशबोर्ड",
    asha_dashboard_sub: "उपकेंद्र आंबेगाव • तलवाड़े एवं पाबल क्लस्टर",
    dash_handled_today: "आज की मरीज गणना",
    dash_high_risk: "उच्च जोखिम मरीज",
    dash_pending_referrals: "लंबित रेफरल",
    dash_followups_due: "लंबित फॉलो-अप",
    dash_quick_register: "+ नया मरीज पंजीकृत करें",
    dash_record_vitals: "जांच एवं ट्राइएज",
    dash_facility_finder: "निकटतम स्वास्थ्य केंद्र",
    village_patients_title: "गांव मरीज रजिस्टर",
    field_tasks_title: "दैनिक कार्य एवं घर का दौरा",

    // Vitals & Triage
    vitals_title: "शारीरिक जांच एवं लक्षण",
    vitals_bp: "रक्तचाप (BP mmHg)",
    vitals_spo2: "ऑक्सीजन स्तर SpO2 (%)",
    vitals_pulse: "नाड़ी गति (bpm)",
    vitals_temp: "शरीर का तापमान (°F)",
    vitals_sugar: "रक्त शर्करा (mg/dL)",
    risk_low: "कम जोखिम",
    risk_moderate: "मध्यम जोखिम",
    risk_high: "उच्च जोखिम",
    risk_emergency: "आपातकालीन स्थिति",
    triage_disclaimer: "क्लिनिकल दिशानिर्देश: यह प्रणाली केवल लक्षणों के आधार पर जोखिम स्तर दर्शाती है। अंतिम निदान और उपचार अधिकृत चिकित्सा अधिकारी ही निश्चित करेंगे।",

    // Common Buttons
    btn_continue: "आगे बढ़ें",
    btn_back: "पीछे जाएं",
    btn_save: "सहेजें",
    btn_submit: "जमा करें",
    btn_close: "बंद करें"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem("swasthya_lang") || "en";
  }

  setLanguage(lang) {
    if (I18N_DATA[lang]) {
      this.currentLang = lang;
      localStorage.setItem("swasthya_lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
      this.updateDOM();
    }
  }

  t(key) {
    const dict = I18N_DATA[this.currentLang] || I18N_DATA.en;
    return dict[key] || I18N_DATA.en[key] || key;
  }

  updateDOM() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    const langSelect = document.getElementById("langSelector");
    if (langSelect) {
      langSelect.value = this.currentLang;
    }
  }
}

window.i18n = new I18nManager();
