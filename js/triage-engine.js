/**
 * SwasthyaSetu Clinical Triage Risk Engine
 * Objective clinical vital threshold assessment for frontline decision support
 * NOTE: Decision support only. Does not replace clinician evaluation.
 */

class TriageEngine {
  static evaluateVitals(vitals, selectedSymptoms = []) {
    const indicators = [];
    let riskScore = 0; // 0 = Low, 1-2 = Moderate, 3-4 = High, 5+ = Emergency

    const spo2 = parseFloat(vitals.spo2) || 98;
    const bpSys = parseFloat(vitals.bpSys) || 120;
    const bpDia = parseFloat(vitals.bpDia) || 80;
    const pulse = parseFloat(vitals.pulse) || 72;
    const temp = parseFloat(vitals.temp) || 98.6;
    const bloodSugar = parseFloat(vitals.bloodSugar) || 100;

    // 1. Oxygen Saturation (SpO2)
    if (spo2 < 85) {
      indicators.push(`Critical Hypoxemia (SpO2 ${spo2}% < 85%)`);
      riskScore += 5;
    } else if (spo2 < 92) {
      indicators.push(`Low Oxygen Saturation (SpO2 ${spo2}% < 92%)`);
      riskScore += 3;
    } else if (spo2 < 95) {
      indicators.push(`Borderline Oxygen Saturation (SpO2 ${spo2}%)`);
      riskScore += 1;
    }

    // 2. Blood Pressure
    if (bpSys >= 180 || bpDia >= 110) {
      indicators.push(`Hypertensive Crisis (${bpSys}/${bpDia} mmHg)`);
      riskScore += 4;
    } else if (bpSys >= 150 || bpDia >= 95) {
      indicators.push(`Stage 2 Hypertension (${bpSys}/${bpDia} mmHg)`);
      riskScore += 2;
    } else if (bpSys >= 140 || bpDia >= 90) {
      indicators.push(`Stage 1 Elevated BP (${bpSys}/${bpDia} mmHg)`);
      riskScore += 1;
    }

    // 3. Pulse Rate
    if (pulse > 120) {
      indicators.push(`Severe Tachycardia (${pulse} bpm > 120 bpm)`);
      riskScore += 3;
    } else if (pulse > 100) {
      indicators.push(`Elevated Pulse (${pulse} bpm > 100 bpm)`);
      riskScore += 1;
    } else if (pulse < 50) {
      indicators.push(`Bradycardia (${pulse} bpm < 50 bpm)`);
      riskScore += 2;
    }

    // 4. Body Temperature
    if (temp >= 103) {
      indicators.push(`High Grade Pyrexia (${temp} °F)`);
      riskScore += 2;
    } else if (temp >= 100.4) {
      indicators.push(`Elevated Body Temperature (${temp} °F)`);
      riskScore += 1;
    }

    // 5. Symptoms Flagging
    if (selectedSymptoms.includes("breathlessness") || selectedSymptoms.includes("Shortness of Breath / Breathlessness")) {
      indicators.push("Acute respiratory distress / breathlessness reported");
      riskScore += 2;
    }
    if (selectedSymptoms.includes("chest_pain") || selectedSymptoms.includes("Chest Tightness / Pain")) {
      indicators.push("Chest pain / angina symptom flagged");
      riskScore += 3;
    }

    // Final Risk Classification
    let level = "LOW";
    let riskClass = "risk-low";
    let borderClass = "border-risk-low";
    let action = "Schedule standard Sub-Centre routine check and lifestyle guidance.";

    if (riskScore >= 5) {
      level = "EMERGENCY";
      riskClass = "risk-emergency";
      borderClass = "border-risk-emergency";
      action = "Immediate 108 ambulance dispatch and priority transfer to District Civil Hospital emergency bay.";
    } else if (riskScore >= 3) {
      level = "HIGH";
      riskClass = "risk-high";
      borderClass = "border-risk-high";
      action = "Priority referral transfer to Primary Health Centre (PHC) or Sub-District Hospital with oxygen standby.";
    } else if (riskScore >= 1) {
      level = "MODERATE";
      riskClass = "risk-moderate";
      borderClass = "border-risk-moderate";
      action = "Escalate to Sub-Centre ANM screening and PHC tele-consultation within 24-48 hours.";
    }

    if (indicators.length === 0) {
      indicators.push("All recorded vital parameters within normal baseline limits.");
    }

    return {
      level: level,
      score: riskScore,
      riskClass: riskClass,
      borderClass: borderClass,
      indicators: indicators,
      recommendedAction: action,
      disclaimer: "Decision Support Note: Triage algorithms suggest classification only. The qualified healthcare professional decides the final diagnosis and next step."
    };
  }
}

window.TriageEngine = TriageEngine;
