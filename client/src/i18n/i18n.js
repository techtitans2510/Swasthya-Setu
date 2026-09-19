/**
 * SwasthyaSetu Multilingual Internationalization (i18n) Engine
 * Supported Languages: English (en), Marathi (mr), Hindi (hi)
 * Design Movement: Civic Functionalism & ABDM Health Grid Compatibility
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
    
    // Navigation
    nav_dashboard: "Dashboard",
    nav_patients: "Patients",
    nav_triage: "Triage & Vitals",
    nav_facilities: "Facility Finder",
    nav_referrals: "Active Referrals",
    nav_followups: "Follow-ups",
    nav_consultations: "Clinical Station",
    nav_records: "Health Records",
    nav_analytics: "District Overview",
    nav_my_health: "My Health Home",
    nav_abha_card: "ABHA Card & QR",
    nav_prescriptions: "Prescriptions & Medicines",
    nav_appointments: "Upcoming Visits & Appointments",
    nav_consent: "Consent & Data Sharing",
    
    // Status & Offline
    status_online: "Online (Synced just now)",
    status_offline: "Working offline",
    status_synced_now: "Synced just now",
    status_pending_sync: "records waiting to sync",
    btn_sync_now: "Sync Now",
    offline_banner_text: "Local Offline Storage Active • Records queued for sync. All data cached securely on device.",
    
    // Dashboard & Metrics
    dash_handled_today: "Daily Census",
    dash_high_risk: "High Risk Cases",
    dash_pending_referrals: "Pending PHC Referrals",
    dash_followups_due: "Follow-ups Due This Week",
    dash_recent_patients: "Active Referral & Triage Queue",
    dash_quick_register: "+ Register New Patient",
    dash_active_case: "SIH Active Continuum Flow",
    dash_record_vitals: "Record Vitals & Triage",
    dash_facility_finder: "Nearest Facility Finder",
    
    // Stepper Labels
    step_patient: "1. Profile",
    step_assessment: "2. Assessment",
    step_triage: "3. Triage",
    step_facility: "4. Facility",
    step_referral: "5. Referral Slip",
    step_doctor: "6. Doctor Care",
    step_followup: "7. Follow-up",
    
    // Vitals & Triage
    vitals_title: "Clinical Symptoms & Vitals Assessment",
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
    triage_disclaimer: "Decision Support & Clinical Guardrail: Algorithm calculates predictive severity indices based on frontline vitals (SpO2, Pulse, SBP). Definitive diagnostic confirmation is strictly authorized by registered PHC Medical Officers under MoHFW Indian Public Health Standards (IPHS).",
    
    // Buttons & Actions
    btn_continue: "Continue to Next Step",
    btn_back: "Back",
    btn_submit: "Save & Generate Referral",
    btn_select_facility: "Select This Facility",
    btn_view_timeline: "View Longitudinal Health Record",
    btn_confirm_transfer: "Confirm & Track Referral",
    btn_complete_followup: "Mark Follow-up Complete",
    btn_download_qr: "Download ABHA Card (QR)",
    btn_request_sync: "Request Record Sync",
    
    // Citizen Portal
    citizen_title: "Citizen ABHA Portal",
    active_continuum: "Active Continuum Phase",
    protocol_compliance: "Protocol Compliance",
    jan_aushadhi_title: "Jan Aushadhi Refill",
    jan_aushadhi_desc: "Shirur Hub • Free Subsidized Medicines",
    notify_asha_title: "Notify ASHA Sunita",
    notify_asha_desc: "Request early home visit or phone call",
    tele_manas_title: "Tele-MANAS & Support",
    tele_manas_desc: "24/7 National Citizen Health Helpline (14416)",
    
    // Facilities
    facility_available: "Active / Available",
    facility_busy: "High Traffic",
    facility_services: "Operational Capabilities",
    facility_distance: "Distance",
    
    // Patient Form
    form_fullname: "Full Patient Name",
    form_age: "Age (Years)",
    form_gender: "Gender",
    form_village: "Village / Locality",
    form_abha: "ABHA Health ID (Ayushman Bharat)",
    form_phone: "Contact Mobile Number",
    form_symptoms: "Reported Clinical Symptoms"
  },

  mr: {
    app_title: "स्वास्थ्यसेतू",
    app_subtitle: "ग्रामीण आरोग्य सातत्य प्रणाली",
    
    // Roles
    role_asha: "आशा कार्यकर्ती",
    role_doctor: "वैद्यकीय अधिकारी",
    role_admin: "आरोग्य प्रशासन",
    role_patient: "रुग्ण / नागरिक (आभा)",
    
    // Navigation
    nav_dashboard: "मुख्यपृष्ठ",
    nav_patients: "रुग्ण यादी",
    nav_triage: "तपासणी व ट्रियाज",
    nav_facilities: "आरोग्य केंद्र शोध",
    nav_referrals: "सक्रिय संदर्भ सेवा",
    nav_followups: "पाठपुरावा",
    nav_consultations: "तपासणी कक्ष",
    nav_records: "आरोग्य नोंदी",
    nav_analytics: "जिल्हा विहंगावलोकन",
    nav_my_health: "माझे आरोग्य दालन",
    nav_abha_card: "आभा कार्ड व क्यूआर",
    nav_prescriptions: "औषधोपचार व प्रिस्क्रिप्शन",
    nav_appointments: "पुढील भेटी व तपासण्या",
    nav_consent: "संमती व डेटा देवाणघेवाण",
    
    // Status & Offline
    status_online: "ऑनलाइन (आत्ताच सिंक झाले)",
    status_offline: "ऑफलाइन कार्यरत",
    status_synced_now: "नुकतेच सिंक झाले",
    status_pending_sync: "नोंदी सिंक होणे बाकी",
    btn_sync_now: "आता सिंक करा",
    offline_banner_text: "स्थानिक ऑफलाइन साठवणूक सक्रिय • नोंदी डिव्हाइसवर सुरक्षित आहेत. नेटवर्क आल्यावर आपोआप सिंक होतील.",
    
    // Dashboard & Metrics
    dash_handled_today: "आजची रुग्णसंख्या",
    dash_high_risk: "अतिजोखमीचे रुग्ण",
    dash_pending_referrals: "सक्रिय रेफरल्स",
    dash_followups_due: "या आठवड्यातील पाठपुरावा",
    dash_recent_patients: "सक्रिय रेफरल व ट्रियाज रांग",
    dash_quick_register: "+ नवीन रुग्ण नोंदवा",
    dash_active_case: "सक्रिय आरोग्य सातत्य प्रकरण",
    dash_record_vitals: "तपासणी व ट्रियाज",
    dash_facility_finder: "जवळचे आरोग्य केंद्र",
    
    // Stepper Labels
    step_patient: "१. माहिती",
    step_assessment: "२. तपासणी",
    step_triage: "३. ट्रियाज",
    step_facility: "४. केंद्र निवड",
    step_referral: "५. रेफरल पावती",
    step_doctor: "६. डॉक्टर उपचार",
    step_followup: "७. पाठपुरावा",
    
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
    triage_disclaimer: "निर्णय सहाय्य व क्लिनिकल मार्गदर्शक: प्रणाली केवळ लक्षणांवरून जोखीम वर्गीकरण सुचवते. अंतिम निदान आणि औषधोपचार प्राथमिक आरोग्य केंद्राचे अधिकृत वैद्यकीय अधिकारीच निश्चित करतील.",
    
    // Buttons & Actions
    btn_continue: "पुढील पायरी",
    btn_back: "मागे",
    btn_submit: "जतन करा व रेफर करा",
    btn_select_facility: "हे केंद्र निवडा",
    btn_view_timeline: "आरोग्य इतिहास पहा",
    btn_confirm_transfer: "रेफरल निश्चित करा",
    btn_complete_followup: "पाठपुरावा पूर्ण झाला",
    btn_download_qr: "आभा कार्ड (QR) डाऊनलोड",
    btn_request_sync: "रेकॉर्ड सिंक विनंती",
    
    // Citizen Portal
    citizen_title: "नागरिक आभा पोर्टल",
    active_continuum: "सक्रिय उपचार टप्पा",
    protocol_compliance: "उपचार पालन प्रमाण",
    jan_aushadhi_title: "जन औषधी रिफिल",
    jan_aushadhi_desc: "शिरूर केंद्र • मोफत अनुदानित औषधे",
    notify_asha_title: "आशा कार्यकर्तीला कळवा",
    notify_asha_desc: "घरभेटीची किंवा कॉलची विनंती करा",
    tele_manas_title: "टेलि-मानस व २४/७ मदत",
    tele_manas_desc: "राष्ट्रीय नागरिक आरोग्य हेल्पलाइन (१४४१६)",
    
    // Facilities
    facility_available: "उपलब्ध",
    facility_busy: "गर्दी आहे",
    facility_services: "उपलब्ध सेवा व सुविधा",
    facility_distance: "अंतर",
    
    // Patient Form
    form_fullname: "रुग्णाचे पूर्ण नाव",
    form_age: "वय (वर्षे)",
    form_gender: "लिंग",
    form_village: "गाव / उपकेंद्र परिसर",
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
    role_patient: "मरीज / नागरिक (आभा)",
    
    // Navigation
    nav_dashboard: "डैशबोर्ड",
    nav_patients: "मरीज सूची",
    nav_triage: "जांच एवं ट्राइएज",
    nav_facilities: "अस्पताल खोज",
    nav_referrals: "सक्रिय रेफरल",
    nav_followups: "फॉलो-अप",
    nav_consultations: "परामर्श कक्ष",
    nav_records: "स्वास्थ्य रिकॉर्ड",
    nav_analytics: "जिला समीक्षा",
    nav_my_health: "मेरा स्वास्थ्य दालान",
    nav_abha_card: "आभा कार्ड एवं क्यूआर",
    nav_prescriptions: "दवाइयां एवं नुस्खे",
    nav_appointments: "आगामी जांच एवं अपॉइंटमेंट",
    nav_consent: "सहमति एवं डेटा साझा",
    
    // Status & Offline
    status_online: "ऑनलाइन (अभी सिंक हुआ)",
    status_offline: "ऑफ़लाइन मोड",
    status_synced_now: "अभी सिंक हुआ",
    status_pending_sync: "रिकॉर्ड सिंक होना बाकी",
    btn_sync_now: "अभी सिंक करें",
    offline_banner_text: "स्थानीय ऑफ़लाइन भंडारण सक्रिय • आपकी प्रविष्टियां डिवाइस पर सुरक्षित हैं। इंटरनेट आने पर सिंक हो जाएंगी।",
    
    // Dashboard & Metrics
    dash_handled_today: "आज की मरीज गणना",
    dash_high_risk: "उच्च जोखिम मरीज",
    dash_pending_referrals: "सक्रिय रेफरल",
    dash_followups_due: "इस सप्ताह लंबित फॉलो-अप",
    dash_recent_patients: "सक्रिय रेफरल एवं ट्राइएज कतार",
    dash_quick_register: "+ नया मरीज पंजीकृत करें",
    dash_active_case: "सक्रिय स्वास्थ्य निरंतरता मामला",
    dash_record_vitals: "जांच एवं ट्राइएज",
    dash_facility_finder: "निकटतम स्वास्थ्य केंद्र",
    
    // Stepper Labels
    step_patient: "1. विवरण",
    step_assessment: "2. जांच",
    step_triage: "3. ट्राइएज",
    step_facility: "4. अस्पताल चयन",
    step_referral: "5. रेफरल पर्ची",
    step_doctor: "6. डॉक्टर परामर्श",
    step_followup: "7. फॉलो-अप",
    
    // Vitals & Triage
    vitals_title: "महत्वपूर्ण लक्षण एवं क्लिनिकल जांच",
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
    triage_disclaimer: "निर्णय सहायता एवं क्लिनिकल दिशानिर्देश: यह प्रणाली केवल लक्षणों के आधार पर जोखिम स्तर दर्शाती है। अंतिम निदान और उपचार का निर्णय अधिकृत चिकित्सा अधिकारी ही करेंगे।",
    
    // Buttons & Actions
    btn_continue: "आगे बढ़ें",
    btn_back: "पीछे जाएं",
    btn_submit: "सुरक्षित करें और रेफर करें",
    btn_select_facility: "यह अस्पताल चुनें",
    btn_view_timeline: "स्वास्थ्य इतिहास देखें",
    btn_confirm_transfer: "रेफरल ट्रैक करें",
    btn_complete_followup: "फॉलो-अप पूर्ण चिन्हित करें",
    btn_download_qr: "आभा कार्ड (QR) डाउनलोड",
    btn_request_sync: "रिकॉर्ड सिंक अनुरोध",
    
    // Citizen Portal
    citizen_title: "नागरिक आभा पोर्टल",
    active_continuum: "सक्रिय उपचार चरण",
    protocol_compliance: "उपचार अनुपालन दर",
    jan_aushadhi_title: "जन औषधि रिफिल",
    jan_aushadhi_desc: "शिरूर केंद्र • निःशुल्क अनुदानित दवाइयां",
    notify_asha_title: "आशा कार्यकर्ता को सूचित करें",
    notify_asha_desc: "घर के दौरे या फोन की विनती करें",
    tele_manas_title: "टेली-मानस एवं सहायता",
    tele_manas_desc: "24/7 राष्ट्रीय नागरिक स्वास्थ्य हेल्पलाइन (14416)",
    
    // Facilities
    facility_available: "उपलब्ध",
    facility_busy: "अधिक व्यस्त",
    facility_services: "उपलब्ध चिकित्सा सुविधाएं",
    facility_distance: "दूरी",
    
    // Patient Form
    form_fullname: "मरीज का पूरा नाम",
    form_age: "उम्र (वर्ष)",
    form_gender: "लिंग",
    form_village: "गांव / उपकेंद्र",
    form_abha: "आभा (ABHA) आईडी",
    form_phone: "मोबाइल नंबर",
    form_symptoms: "दिखने वाले लक्षण"
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
