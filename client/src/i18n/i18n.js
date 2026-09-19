/**
 * SwasthyaSetu Multilingual Internationalization (i18n) Engine
 * Supported Languages: English (en), Marathi (mr), Hindi (hi)
 */

const I18N_DATA = {
  en: {
    app_title: "SwasthyaSetu",
    app_subtitle: "Rural Healthcare Continuity Network",
    
    // Roles
    role_asha: "ASHA Worker",
    role_doctor: "Medical Officer",
    role_admin: "Health Admin",
    
    // Navigation
    nav_dashboard: "Dashboard",
    nav_patients: "Patients",
    nav_triage: "Triage & Vitals",
    nav_facilities: "Facility Finder",
    nav_referrals: "Referral Tracking",
    nav_followups: "Follow-ups",
    nav_consultations: "Consultations",
    nav_records: "Health Records",
    nav_analytics: "District Overview",
    
    // Status & Offline
    status_online: "Online",
    status_offline: "Working offline",
    status_synced_now: "Synced just now",
    status_pending_sync: "records waiting to sync",
    btn_sync_now: "Sync Now",
    offline_banner_text: "Working offline • Your records are stored locally and will sync once connectivity returns.",
    
    // Dashboard
    dash_handled_today: "Patients Handled Today",
    dash_high_risk: "High-Risk Cases",
    dash_pending_referrals: "Active Referrals",
    dash_followups_due: "Follow-ups Due",
    dash_recent_patients: "Recent Village Patients",
    dash_quick_register: "Register Patient",
    dash_active_case: "Active Longitudinal Case",
    
    // Stepper Labels
    step_patient: "Patient",
    step_assessment: "Assessment",
    step_triage: "Triage",
    step_facility: "Facility",
    step_referral: "Referral",
    step_doctor: "Doctor",
    step_followup: "Follow-up",
    
    // Vitals & Triage
    vitals_title: "Clinical Vitals & Symptoms",
    vitals_bp: "Blood Pressure (mmHg)",
    vitals_spo2: "Oxygen Saturation SpO2 (%)",
    vitals_pulse: "Pulse Rate (bpm)",
    vitals_temp: "Body Temperature (°F)",
    vitals_sugar: "Blood Sugar (mg/dL)",
    
    risk_low: "LOW RISK",
    risk_moderate: "MODERATE RISK",
    risk_high: "HIGH RISK",
    risk_emergency: "EMERGENCY",
    
    triage_indicators_detected: "Risk Indicators Detected",
    triage_recommended_action: "Recommended Continuity Action",
    triage_disclaimer: "Decision Support Note: Triage algorithms suggest classification only. The qualified healthcare professional decides the final diagnosis and next step.",
    
    // Buttons & Actions
    btn_continue: "Continue to Next Step",
    btn_back: "Back",
    btn_submit: "Save & Generate Referral",
    btn_select_facility: "Select This Facility",
    btn_view_timeline: "View Longitudinal Health Record",
    btn_confirm_transfer: "Confirm & Track Referral",
    btn_complete_followup: "Mark Follow-up Complete",
    
    // Facilities
    facility_available: "Available",
    facility_busy: "High Traffic",
    facility_services: "Operational Capabilities",
    facility_distance: "Distance",
    
    // Patient Form
    form_fullname: "Full Patient Name",
    form_age: "Age",
    form_gender: "Gender",
    form_village: "Village / Sub-Centre",
    form_abha: "ABHA Health ID",
    form_phone: "Mobile Number",
    form_symptoms: "Reported Symptoms"
  },

  mr: {
    app_title: "स्वास्थ्यसेतू",
    app_subtitle: "ग्रामीण आरोग्य सातत्य प्रणाली",
    
    // Roles
    role_asha: "आशा कार्यकर्ती",
    role_doctor: "वैद्यकीय अधिकारी",
    role_admin: "आरोग्य प्रशासन",
    
    // Navigation
    nav_dashboard: "मुख्यपृष्ठ",
    nav_patients: "रुग्ण यादी",
    nav_triage: "तपासणी व ट्रियाज",
    nav_facilities: "आरोग्य केंद्र शोध",
    nav_referrals: "संदर्भ सेवा (Referral)",
    nav_followups: "पाठपुरावा",
    nav_consultations: "तपासणी कक्ष",
    nav_records: "आरोग्य नोंदी",
    nav_analytics: "जिल्हा विहंगावलोकन",
    
    // Status & Offline
    status_online: "ऑनलाइन",
    status_offline: "ऑफलाइन कार्यरत",
    status_synced_now: "नुकतेच सिंक झाले",
    status_pending_sync: "नोंदी सिंक होणे बाकी",
    btn_sync_now: "आता सिंक करा",
    offline_banner_text: "ऑफलाइन कार्यरत • आपल्या नोंदी डिव्हाइसवर सुरक्षित आहेत. नेटवर्क आल्यावर आपोआप सिंक होतील.",
    
    // Dashboard
    dash_handled_today: "आज तपासलेले रुग्ण",
    dash_high_risk: "अतिजोखमीचे रुग्ण",
    dash_pending_referrals: "सक्रिय रेफरल्स",
    dash_followups_due: "बाकी असलेला पाठपुरावा",
    dash_recent_patients: "अलीकडील ग्राम रुग्ण",
    dash_quick_register: "नवीन रुग्ण नोंदवा",
    dash_active_case: "सक्रिय रुग्ण प्रकरण",
    
    // Stepper Labels
    step_patient: "रुग्ण",
    step_assessment: "तपासणी",
    step_triage: "ट्रियाज",
    step_facility: "आरोग्य केंद्र",
    step_referral: "रेफरल",
    step_doctor: "डॉक्टर",
    step_followup: "पाठपुरावा",
    
    // Vitals & Triage
    vitals_title: "शारीरिक तपासणी व लक्षणे",
    vitals_bp: "रक्तदाब (BP)",
    vitals_spo2: "ऑक्सिजन प्रमाण (SpO2)",
    vitals_pulse: "नाडीचे ठोके (Pulse)",
    vitals_temp: "तापमान (Temperature)",
    vitals_sugar: "रक्तातील साखर (Sugar)",
    
    risk_low: "कमी जोखीम",
    risk_moderate: "मध्यम जोखीम",
    risk_high: "उच्च जोखीम",
    risk_emergency: "तातडीची आणीबाणी",
    
    triage_indicators_detected: "आढळलेले जोखीम निकष",
    triage_recommended_action: "पुढील शिफारस केलेली कृती",
    triage_disclaimer: "निर्णय सहाय्य सूचना: ही प्रणाली केवळ जोखीम वर्गीकरण सुचवते. पुढील उपचार आणि अंतिम निर्णय अधिकृत आरोग्य अधिकारी घेतील.",
    
    // Buttons & Actions
    btn_continue: "पुढील पायरी",
    btn_back: "मागे",
    btn_submit: "जतन करा व रेफर करा",
    btn_select_facility: "हे केंद्र निवडा",
    btn_view_timeline: "आरोग्य इतिहास पहा",
    btn_confirm_transfer: "रेफरल निश्चित करा",
    btn_complete_followup: "पाठपुरावा पूर्ण झाला",
    
    // Facilities
    facility_available: "उपलब्ध",
    facility_busy: "गर्दी आहे",
    facility_services: "उपलब्ध सेवा व सुविधा",
    facility_distance: "अंतर",
    
    // Patient Form
    form_fullname: "रुग्णाचे पूर्ण नाव",
    form_age: "वय",
    form_gender: "लिंग",
    form_village: "गाव / उपकेंद्र",
    form_abha: "आभा (ABHA) क्रमांक",
    form_phone: "मोबाईल क्रमांक",
    form_symptoms: "दिसणारी लक्षणे"
  },

  hi: {
    app_title: "स्वास्थ्यसेतु",
    app_subtitle: "ग्रामीण स्वास्थ्य निरंतरता मंच",
    
    // Roles
    role_asha: "आशा कार्यकर्ता",
    role_doctor: "चिकित्सा अधिकारी",
    role_admin: "स्वास्थ्य प्रशासन",
    
    // Navigation
    nav_dashboard: "डैशबोर्ड",
    nav_patients: "मरीज सूची",
    nav_triage: "जांच एवं ट्राइएज",
    nav_facilities: "अस्पताल खोज",
    nav_referrals: "रेफरल ट्रैकिंग",
    nav_followups: "फॉलो-अप",
    nav_consultations: "परामर्श कक्ष",
    nav_records: "स्वास्थ्य रिकॉर्ड",
    nav_analytics: "जिला समीक्षा",
    
    // Status & Offline
    status_online: "ऑनलाइन",
    status_offline: "ऑफ़लाइन मोड",
    status_synced_now: "अभी सिंक हुआ",
    status_pending_sync: "रिकॉर्ड सिंक होना बाकी",
    btn_sync_now: "अभी सिंक करें",
    offline_banner_text: "ऑफ़लाइन मोड • आपकी प्रविष्टियां स्थानीय रूप से सुरक्षित हैं। इंटरनेट आने पर सिंक हो जाएंगी।",
    
    // Dashboard
    dash_handled_today: "आज देखे गए मरीज",
    dash_high_risk: "उच्च जोखिम मरीज",
    dash_pending_referrals: "सक्रिय रेफरल",
    dash_followups_due: "लंबित फॉलो-अप",
    dash_recent_patients: "हाल के ग्रामीण मरीज",
    dash_quick_register: "नया मरीज पंजीकृत करें",
    dash_active_case: "सक्रिय मरीज मामला",
    
    // Stepper Labels
    step_patient: "मरीज",
    step_assessment: "जांच",
    step_triage: "ट्राइएज",
    step_facility: "अस्पताल",
    step_referral: "रेफरल",
    step_doctor: "डॉक्टर",
    step_followup: "फॉलो-अप",
    
    // Vitals & Triage
    vitals_title: "महत्वपूर्ण लक्षण एवं जांच",
    vitals_bp: "रक्तचाप (BP)",
    vitals_spo2: "ऑक्सीजन स्तर SpO2 (%)",
    vitals_pulse: "नाड़ी गति (Pulse)",
    vitals_temp: "तापमान (Temperature)",
    vitals_sugar: "रक्त शर्करा (Sugar)",
    
    risk_low: "कम जोखिम",
    risk_moderate: "मध्यम जोखिम",
    risk_high: "उच्च जोखिम",
    risk_emergency: "आपातकालीन स्थिति",
    
    triage_indicators_detected: "पहचाने गए जोखिम संकेत",
    triage_recommended_action: "अनुशंसित स्वास्थ्य कदम",
    triage_disclaimer: "निर्णय सहायता नोट: यह प्रणाली केवल जोखिम स्तर दर्शाती है। अंतिम निदान और उपचार का निर्णय योग्य चिकित्सक ही करेंगे।",
    
    // Buttons & Actions
    btn_continue: "आगे बढ़ें",
    btn_back: "पीछे जाएं",
    btn_submit: "सुरक्षित करें और रेफर करें",
    btn_select_facility: "यह अस्पताल चुनें",
    btn_view_timeline: "स्वास्थ्य इतिहास देखें",
    btn_confirm_transfer: "रेफरल ट्रैक करें",
    btn_complete_followup: "फॉलो-अप पूर्ण चिन्हित करें",
    
    // Facilities
    facility_available: "उपलब्ध",
    facility_busy: "अधिक व्यस्त",
    facility_services: "उपलब्ध चिकित्सा सुविधाएं",
    facility_distance: "दूरी",
    
    // Patient Form
    form_fullname: "मरीज का पूरा नाम",
    form_age: "उम्र",
    form_gender: "लिंग",
    form_village: "गांव / उपकेंद्र",
    form_abha: "आभा (ABHA) आईडी",
    form_phone: "मोबाइल नंबर",
    form_symptoms: "लक्षण"
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

    // Update active state on language selector if present
    const langSelect = document.getElementById("langSelector");
    if (langSelect) {
      langSelect.value = this.currentLang;
    }
  }
}

window.i18n = new I18nManager();
