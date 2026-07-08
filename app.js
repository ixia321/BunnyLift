const { useState, useMemo, useEffect, useRef, createElement: h } = React;

// ═══════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════
function cls(...a) { return a.filter(Boolean).join(' '); }
function AnimatePresence({ show, children }) { return show ? children : null; }

// Smooth scroll to ref
function useScrollTo() {
  const ref = useRef(null);
  const scroll = () => { if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return [ref, scroll];
}

// ═══════════════════════════════════════════
//  I18N - TRANSLATIONS
// ═══════════════════════════════════════════
const TRANSLATIONS = {
en: {
brand: "BunnyLift", brandTag: "For Women",
navHome: "Home", navCalculator: "Calculator", navTraining: "Training", navNutrition: "Nutrition", navScience: "Science",
footerSlogan: "Science-based fitness tools designed for women.",
footerDisclaimer: "This website provides general information and is not a substitute for professional medical or nutritional advice.",
footerCopyright: "\u00A9 2026 BunnyLift. Built with care.",
homeTitle: "Science-Based Fitness for Women", homeSubtitle1: "Train Smart.", homeSubtitle2: "Eat Right. Know Why.",
homeDesc: "BunnyLift provides science-backed tools for RMR/TDEE calculation, training program design, nutrition planning, and evidence-based female fitness science. No bro-science, just peer-reviewed research.",
homeStatsPrograms: "Training Programs", homeStatsFoods: "Foods in Database", homeStatsEvidence: "Evidence-Based",
homeSectionTitle: "Everything You Need", homeSectionDesc: "From calorie calculations to training programs \u2014 all grounded in peer-reviewed research and tailored for women.",
homeScienceTitle: "Built on Science, Not Trends",
homeScienceDesc: "Every recommendation is backed by peer-reviewed research from sources like the ISSN, ACSM, and WHO. We incorporate Stacy Sims' principles on female physiology, account for hormonal cycles, body composition differences, and unique micronutrient needs.",
homeScienceCTA: "Explore the Science", homeStartCalc: "Start Calculator", homeViewTraining: "View Training Plans",
calcTitle: "Fitness Calculator", calcSubtitle: "RMR, TDEE, and macro targets based on the Mifflin-St Jeor equation for women. RMR (Resting Metabolic Rate) is often called BMR in fitness apps.",
calcInfoTitle: "Your Info", calcAge: "Age", calcWeight: "Weight", calcHeight: "Height", calcYears: "years", calcKg: "kg", calcCm: "cm",
calcActivityTitle: "Activity Level", calcSedentary: "Sedentary", calcSedentaryDesc: "Little or no exercise",
calcLightlyActive: "Lightly Active", calcLightlyActiveDesc: "1-3 days/week", calcModeratelyActive: "Moderately Active", calcModeratelyActiveDesc: "3-5 days/week",
calcVeryActive: "Very Active", calcVeryActiveDesc: "6-7 days/week", calcExtraActive: "Extra Active", calcExtraActiveDesc: "Physical job + training",
calcMultiplier: "Multiplier", calcBMR: "RMR", calcBMRUnit: "calories / day", calcBMRNote: "Resting metabolic rate",
calcTDEE: "TDEE", calcTDEEUnit: "calories / day", calcTDEENote: "Actual daily burn",
calcGoalTitle: "Choose Your Goal", calcCut: "Cut", calcCutSubtitle: "Fat Loss", calcCutDesc: "TDEE - 18%",
calcMaingain: "Maingaining", calcMaingainSubtitle: "Body Recomp", calcMaingainDesc: "TDEE + 3%",
calcBulk: "Bulk", calcBulkSubtitle: "Muscle Gain", calcBulkDesc: "TDEE + 12%",
calcTargetTitle: "Your Daily Target", calcWeeklyChange: "weekly change",
calcProtein: "Protein", calcCarbs: "Carbohydrates", calcFats: "Fats", calcKcal: "kcal",
calcProteinWhy: "Why this protein amount?", calcProteinWhyDesc: "ISSN (2017) and Morton et al. (2018) show women benefit from",
trainingTitle: "Training Splits", trainingSubtitle: "Choose a program that matches your experience level and schedule. Each split is periodized for progressive overload.",
trainingClickHint: "Click a program above to view its schedule", trainingIdealFor: "Ideal for", trainingDaysPerWeek: "Days/Week",
trainingRest: "Rest", trainingActiveRecovery: "Active Recovery",
nutritionTitle: "Nutrition Guide", nutritionSubtitle: "Macros, micronutrients, supplements, hydration, and a food database \u2014 all tailored for female physiology.",
nutritionTabMacros: "Macros", nutritionTabMicros: "Micronutrients", nutritionTabSupplements: "Supplements", nutritionTabHydration: "Hydration", nutritionTabFoods: "Food Database",
nutritionBestSources: "Best Sources", nutritionKeyTips: "Key Tips", nutritionProteinByGoal: "Protein Intake by Goal", nutritionStacySimsLabel: "Stacy Sims",
hydrationTitle: "Hydration Calculator", hydrationSubtitle: "Based on Stacy Sims' research on female hydration needs.",
hydrationBodyWeight: "Body Weight", hydrationExercise: "Daily Exercise", hydrationCaffeine: "Caffeine", hydrationCups: "cups/day",
hydrationCreatine: "Taking Creatine?", hydrationTarget: "Daily Water Target", hydrationMl: "ml / day",
hydrationBase: "Base", hydrationExerciseLabel: "Exercise", hydrationCaffeineLabel: "Caffeine", hydrationCreatineLabel: "Creatine supplement",
hydrationStacyTip: "Stacy Sims Tip", hydrationTips: "Hydration Tips",
foodTitle: "Common Foods", foodAdd: "Add", foodRemove: "Remove", foodAdded: "Added", foodTotal: "Total", foodPer: "Per", foodClear: "Clear All",
scienceTitle: "The Science", scienceSubtitle: "Evidence-based insights into female physiology, metabolism, gut health, and training adaptations.",
scienceTabMenstrual: "Menstrual Cycle", scienceTabMetabolism: "Metabolism", scienceTabBodyFat: "Body Fat", scienceTabGut: "Gut Health",
scienceWomenAreNotSmallMen: "Women Are Not Small Men",
scienceWomenAreNotSmallMenDesc: "Most sports science research has been conducted on men, then simply scaled down for women. This does not work. Women have different hormonal profiles, body compositions, and metabolic responses. Training and nutrition must be adapted to these differences for optimal results.",
scienceRecommendedReading: "Recommended Reading", scienceLiftHeavy: "Lift Heavy",
scienceLiftHeavyDesc: "Women have a higher proportion of type I (endurance) fibers and lower type II (power) fibers. Prioritize heavy resistance training (3-6 reps at 80-90% 1RM) to effectively recruit type II fibers for strength and power development.",
scienceRecovery: "Recovery is Non-Negotiable",
scienceRecoveryDesc: "Due to estrogen's role in muscle damage and inflammation, women experience less muscle damage but also less muscle protein breakdown. Women can train more frequently but need 48 hours of recovery for the same muscle group.",
scienceBirthControl: "Birth Control Changes Everything",
scienceBirthControlDesc: "Hormonal contraceptives suppress the natural estrogen and progesterone fluctuations that cycle-based training plans assume. For the ~400 million women worldwide using hormonal contraception, phase-based training approaches have no physiological basis. Current evidence (D'Souza et al., 2023) suggests women on the pill should follow consistent, symptom-guided training rather than cycle-based periodization.",
scienceNote: "Note", scienceReferences: "References",
gutTitle: "Gut Health & Digestion", gutBristolScale: "Bristol Stool Scale", gutBristolDesc: "A medical tool used to classify stool into 7 types. Types 3-4 are considered ideal.",
gutDailyFiber: "Daily Fiber Target", gutFiberRec: "25-30g/day for women", gutFiberGuide: "Fiber Guide", gutFiberIncrease: "How to Increase Fiber",
gutCommonIssues: "Common Issues & Fixes", gutIssue: "Issue", gutCauses: "Causes", gutFixes: "Fixes",
explore: "Explore", langEn: "EN"
}};
function T(lang, key) { return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key; }

// ─── SVG Icons ───
function Icon({ name, size, className, strokeWidth }) {
  const s = size || 20, sw = strokeWidth || 1.5, c = className || '';
  const p = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", className: c };
  const i = {
    Home: h('svg', p, h('path', { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), h('polyline', { points: "9 22 9 12 15 12 15 22" })),
    Calculator: h('svg', p, h('rect', { width: 16, height: 20, x: 4, y: 2, rx: 2 }), h('line', { x1: 8, x2: 16, y1: 6, y2: 6 }), h('line', { x1: 16, x2: 16, y1: 14, y2: 14 }), h('path', { d: "m8 14 2-2" }), h('path', { d: "m14 16 2-2" }), h('path', { d: "m8 18 2-2" })),
    Dumbbell: h('svg', p, h('path', { d: "m6.5 6.5 11 11" }), h('path', { d: "m21 21-1-1" }), h('path', { d: "m3 3 1 1" }), h('path', { d: "m18 22 4-4" }), h('path', { d: "m2 6 4-4" }), h('path', { d: "m3 10 4-4" }), h('path', { d: "m14 21 4-4" }), h('path', { d: "m17 14 4-4" }), h('path', { d: "m6.5 17.5 11-11" })),
    Apple: h('svg', p, h('path', { d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-3 .5-4.5 2-1-.56-2.78-2-5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" }), h('path', { d: "M10 2c1 .5 2 2 2 5" })),
    Flask: h('svg', p, h('path', { d: "M10 2v8L4 20h16l-6-10V2" }), h('path', { d: "M8.5 14h7" }), h('path', { d: "M7 17h10" })),
    Menu: h('svg', p, h('line', { x1: 4, x2: 20, y1: 8, y2: 8 }), h('line', { x1: 4, x2: 20, y1: 16, y2: 16 })),
    X: h('svg', p, h('path', { d: "M18 6 6 18" }), h('path', { d: "m6 6 12 12" })),
    ChevronRight: h('svg', p, h('path', { d: "m9 18 6-6-6-6" })),
    ChevronDown: h('svg', p, h('path', { d: "m6 9 6 6 6-6" })),
    ChevronUp: h('svg', p, h('path', { d: "m18 15-6-6-6 6" })),
    Info: h('svg', p, h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: "M12 16v-4" }), h('path', { d: "M12 8h.01" })),
    Heart: h('svg', p, h('path', { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })),
    TrendingUp: h('svg', p, h('polyline', { points: "22 7 13.5 15.5 8.5 10.5 2 17" }), h('polyline', { points: "16 7 22 7 22 13" })),
    Target: h('svg', p, h('circle', { cx: 12, cy: 12, r: 10 }), h('circle', { cx: 12, cy: 12, r: 6 }), h('circle', { cx: 12, cy: 12, r: 2 })),
    Scale: h('svg', p, h('path', { d: "m16 16 3-8 3 8c-.87.65-1.96 1-3.08 1.1A5.5 5.5 0 0 1 16 16z" }), h('path', { d: "m2 16 3-8 3 8c-.87.65-1.96 1-3.08 1.1A5.5 5.5 0 0 1 2 16z" }), h('path', { d: "M7 21h10" })),
    Droplet: h('svg', p, h('path', { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5C11.5 6 9.8 8.2 8 10c-2 1.7-3 3.5-3 5.5a7 7 0 0 0 7 7z" })),
    Sun: h('svg', p, h('circle', { cx: 12, cy: 12, r: 4 }), h('path', { d: "M12 2v2" }), h('path', { d: "M12 20v2" }), h('path', { d: "m4.93 4.93 1.41 1.41" }), h('path', { d: "m17.66 17.66 1.41 1.41" }), h('path', { d: "M2 12h2" }), h('path', { d: "M20 12h2" }), h('path', { d: "m6.34 17.66-1.41 1.41" }), h('path', { d: "m19.07 4.93-1.41 1.41" })),
    Moon: h('svg', p, h('path', { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })),
    Zap: h('svg', p, h('polygon', { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })),
    Award: h('svg', p, h('path', { d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" }), h('circle', { cx: 12, cy: 8, r: 6 })),
    BookOpen: h('svg', p, h('path', { d: "M12 7v14" }), h('path', { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" })),
    Check: h('svg', p, h('path', { d: "M20 6 9 17l-5-5" })),
    Clock: h('svg', p, h('circle', { cx: 12, cy: 12, r: 10 }), h('polyline', { points: "12 6 12 12 16 14" })),
    Flame: h('svg', p, h('path', { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" })),
    Beef: h('svg', p, h('path', { d: "M16.4 11A7 7 0 1 1 6.8 16.5 9 9 0 1 1 16.4 11Z" }), h('path', { d: "M12 12v.01" })),
    Wheat: h('svg', p, h('path', { d: "M2 22 16 8" }), h('path', { d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }), h('path', { d: "M8.47 7.53 10 6l1.53 1.53a3.5 3.5 0 0 1 0 4.94L10 14l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }), h('path', { d: "M13.47 2.53 15 1l1.53 1.53a3.5 3.5 0 0 1 0 4.94L15 9l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }), h('path', { d: "m20 10-2 2" }), h('path', { d: "m6 16 2 2" })),
    Droplets: h('svg', p, h('path', { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5C11.5 6 9.8 8.2 8 10c-2 1.7-3 3.5-3 5.5a7 7 0 0 0 7 7z" }), h('path', { d: "M5 18a4 4 0 0 1 4-4" })),
    Footprints: h('svg', p, h('path', { d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16" }), h('path', { d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20" }), h('path', { d: "M16 20v-3" }), h('path', { d: "M8 20v-3" })),
    Plus: h('svg', p, h('path', { d: "M5 12h14" }), h('path', { d: "M12 5v14" })),
    Minus: h('svg', p, h('path', { d: "M5 12h14" })),
    Trash2: h('svg', p, h('path', { d: "M10 11v6" }), h('path', { d: "M14 11v6" }), h('path', { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }), h('path', { d: "M3 6h18" }), h('path', { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })),
    User: h('svg', p, h('path', { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), h('circle', { cx: 12, cy: 7, r: 4 })),
    Smile: h('svg', p, h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: "M8 14s1.5 2 4 2 4-2 4-2" }), h('line', { x1: 9, y1: 9, x2: 9.01, y2: 9 }), h('line', { x1: 15, y1: 9, x2: 15.01, y2: 9 })),
  };
  return i[name] || null;
}

// ═══════════════════════════════════════════
//  TRAINING SPLITS (优化版 - 参考Bret Contreras等)
// ═══════════════════════════════════════════
const TRAINING_SPLITS = [
  {
    id: 'ppl',
    name: 'Push / Pull / Legs',
    frequency: '6 Days / Week',
    level: 'Intermediate — Advanced',
    description: 'The gold standard for hypertrophy. Each muscle group is trained twice per week with moderate volume per session. Allows for excellent recovery between sessions.',
    idealFor: 'Women with 6+ months of consistent training who can commit to 6 days',
    schedule: [
      { day: 'Day 1 — Push A', focus: 'Chest, Shoulders, Triceps', exercises: ['Incline DB Press 3×8-10', 'Overhead Press 3×8-10', 'Cable Fly 3×12-15', 'Lateral Raise 3×12-15', 'Tricep Pushdown 3×12-15'] },
      { day: 'Day 2 — Pull A', focus: 'Back, Biceps, Rear Delts', exercises: ['Lat Pulldown 3×10-12', 'Barbell Row 3×8-10', 'Face Pull 3×15-20', 'Bicep Curl 3×12-15', 'Reverse Fly 3×15-20'] },
      { day: 'Day 3 — Legs A', focus: 'Glutes, Quads', exercises: ['Barbell Hip Thrust 4×8-10', 'Barbell Squat 3×6-8', 'Bulgarian Split Squat 3×8-10 each', 'Leg Extension 3×12-15'] },
      { day: 'Day 4 — Push B', focus: 'Chest, Shoulders, Triceps', exercises: ['Flat DB Press 3×10-12', 'Arnold Press 3×10-12', 'Lateral Raise 3×15-20', 'Dips 3×10-12', 'Skullcrusher 3×10-12'] },
      { day: 'Day 5 — Pull B', focus: 'Back, Biceps, Rear Delts', exercises: ['Pull-Up / Assisted 3×8-10', 'Single-Arm DB Row 3×10-12 each', 'Seated Cable Row 3×12-15', 'Hammer Curl 3×12-15', 'Face Pull 3×15-20'] },
      { day: 'Day 6 — Legs B', focus: 'Glutes, Hamstrings', exercises: ['Romanian Deadlift 4×8-10', 'Walking Lunge 3×10 each', 'Hip Abduction Machine 3×15-20', 'Leg Curl 3×12-15'] },
      { day: 'Day 7 — Rest', focus: 'Complete recovery', exercises: ['Rest, light walking, stretching'] },
    ]
  },
  {
    id: 'upperlower',
    name: 'Upper / Lower Split',
    frequency: '4 Days / Week',
    level: 'Beginner — Intermediate',
    description: 'Perfect balance between frequency and recovery. Each muscle group is hit twice weekly with manageable volume per session. The most popular split for busy women.',
    idealFor: 'Women who want results with only 4 training days',
    schedule: [
      { day: 'Day 1 — Lower A', focus: 'Squat pattern + Glutes', exercises: ['Barbell Back Squat 3×6-8', 'Hip Thrust 3×10-12', 'Leg Press 3×10-12', 'Leg Curl 3×12-15', 'Calf Raise 3×15-20'] },
      { day: 'Day 2 — Upper A', focus: 'Horizontal push + pull', exercises: ['Flat DB Press 3×10-12', 'Barbell Row 3×8-10', 'Overhead Press 3×8-10', 'Lat Pulldown 3×10-12', 'Lateral Raise 3×12-15'] },
      { day: 'Day 3 — Rest', focus: 'Recovery', exercises: ['Walking, mobility work'] },
      { day: 'Day 4 — Lower B', focus: 'Hinge pattern + Glutes', exercises: ['Romanian Deadlift 3×8-10', 'Bulgarian Split Squat 3×8-10 each', 'Hip Abduction 3×15-20', 'Leg Extension 3×12-15', 'Calf Raise 3×15-20'] },
      { day: 'Day 5 — Upper B', focus: 'Vertical push + pull', exercises: ['Pull-Up / Assisted 3×8-10', 'Incline DB Press 3×10-12', 'Cable Row 3×12-15', 'Arnold Press 3×10-12', 'Face Pull 3×15-20'] },
      { day: 'Day 6-7 — Rest / Active', focus: 'Recovery', exercises: ['Optional: 20-30 min LISS cardio'] },
    ]
  },
  {
    id: 'fullbody',
    name: 'Full Body',
    frequency: '3 Days / Week',
    level: 'Beginner',
    description: 'Maximum efficiency for beginners. Each session hits every major muscle group with compound movements. Build movement patterns, strength, and confidence.',
    idealFor: 'Women new to lifting or with limited time',
    schedule: [
      { day: 'Day 1', focus: 'Squat + Push + Pull', exercises: ['Goblet Squat 3×10-12', 'DB Press 3×10-12', 'Lat Pulldown 3×10-12', 'Romanian Deadlift 3×10-12', 'Lateral Raise 3×12-15'] },
      { day: 'Day 2 — Rest', focus: 'Recovery', exercises: ['Walking, stretching'] },
      { day: 'Day 3', focus: 'Hip Hinge + Vertical', exercises: ['Hip Thrust 3×10-12', 'Overhead Press 3×10-12', 'Seated Row 3×12-15', 'Walking Lunge 3×10 each', 'Face Pull 3×15-20'] },
      { day: 'Day 4 — Rest', focus: 'Recovery', exercises: ['Active recovery'] },
      { day: 'Day 5', focus: 'Mixed compound', exercises: ['Barbell Squat 3×6-8', 'Incline DB Press 3×10-12', 'Single-Arm Row 3×10-12 each', 'Leg Press 3×10-12', 'Bicep Curl 3×12-15'] },
      { day: 'Day 6-7 — Rest / Active', focus: 'Recovery', exercises: ['Light cardio, yoga'] },
    ]
  },
  {
    id: 'glutefocus',
    name: 'Glute-Focused',
    frequency: '5 Days / Week',
    level: 'Intermediate — Advanced',
    description: 'Lower-body biased program with 3 dedicated glute/leg days and 2 upper body days. Maximizes glute development while maintaining upper body.',
    idealFor: 'Women prioritizing glute and leg development',
    schedule: [
      { day: 'Day 1 — Lower A', focus: 'Glute + Quad emphasis', exercises: ['Barbell Hip Thrust 4×8-10', 'High-Bar Squat 3×8-10', 'Bulgarian Split Squat 3×8-10 each', 'Leg Extension 3×12-15'] },
      { day: 'Day 2 — Upper', focus: 'Push + Pull', exercises: ['Incline DB Press 3×10-12', 'Lat Pulldown 3×10-12', 'Overhead Press 3×8-10', 'Cable Row 3×12-15', 'Lateral Raise 3×12-15'] },
      { day: 'Day 3 — Lower B', focus: 'Hinge + Glute emphasis', exercises: ['Romanian Deadlift 4×8-10', 'Walking Lunge 3×10 each', 'Hip Abduction 3×15-20', 'Leg Curl 3×12-15'] },
      { day: 'Day 4 — Upper', focus: 'Pull + Accessories', exercises: ['Pull-Up / Assisted 3×8-10', 'Flat DB Press 3×10-12', 'Face Pull 3×15-20', 'Bicep Curl 3×12-15', 'Tricep Pushdown 3×12-15'] },
      { day: 'Day 5 — Lower C', focus: 'Glute volume', exercises: ['Sumo Deadlift 3×8-10', 'Deficit Reverse Lunge 3×10 each', 'Step-Up 3×10 each', 'Banded Hip Thrust 3×15-20'] },
      { day: 'Day 6-7 — Rest', focus: 'Recovery', exercises: ['Walking, foam rolling'] },
    ]
  },
  {
    id: 'hourglass',
    name: 'Hourglass (NEAT + Lifting)',
    frequency: '4 Days / Week',
    level: 'All Levels',
    description: 'The most sustainable and realistic program. Combines daily 10K steps (NEAT) with 4 focused lifting days. Based on research showing NEAT is the biggest differentiator in female body composition.',
    idealFor: 'Women who want a balanced, realistic lifestyle approach',
    schedule: [
      { day: 'Daily — NEAT Goal', focus: '10,000 steps', exercises: ['Morning or evening walk', 'Take stairs', 'Park farther away', 'Walk during phone calls', 'Stand desk if possible'] },
      { day: 'Day 1 — Lower A (Glutes)', focus: 'Hip hinge + Glute emphasis', exercises: ['Barbell Hip Thrust 4×8-10', 'Romanian Deadlift 3×8-10', 'Bulgarian Split Squat 3×8-10 each', 'Hip Abduction 3×15-20'] },
      { day: 'Day 2 — Upper A', focus: 'Push + Pull', exercises: ['DB Press 3×10-12', 'Lat Pulldown 3×10-12', 'Overhead Press 3×8-10', 'Cable Row 3×12-15', 'Lateral Raise 3×12-15'] },
      { day: 'Day 3 — Rest / Active', focus: 'Recovery + Steps', exercises: ['Light walk, stretching, yoga', 'Still hit 10K steps'] },
      { day: 'Day 4 — Lower B (Quads)', focus: 'Squat pattern', exercises: ['Barbell Squat 3×6-8', 'Walking Lunge 3×10 each', 'Leg Press 3×10-12', 'Leg Curl 3×12-15'] },
      { day: 'Day 5 — Upper B', focus: 'Pull + Accessories', exercises: ['Pull-Up / Assisted 3×8-10', 'Incline DB Press 3×10-12', 'Face Pull 3×15-20', 'Bicep Curl 3×12-15', 'Tricep Extension 3×12-15'] },
      { day: 'Day 6-7 — Rest / Active', focus: 'Recovery + Steps', exercises: ['Long walk, mobility work', 'Still hit 10K steps'] },
    ]
  }
];


// ═══════════════════════════════════════════
//  FOOD DATABASE (每100g 或 常见份数)
// ═══════════════════════════════════════════
const FOOD_DATABASE = [
  { id: 'chicken', name: 'Chicken Breast', unit: '100g', serving: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, emoji: '🍗' },
  { id: 'egg', name: 'Boiled Egg', unit: '1 egg (50g)', serving: 50, kcal: 70, protein: 6, carbs: 0.5, fat: 5, emoji: '🥚' },
  { id: 'rice', name: 'White Rice (cooked)', unit: '100g', serving: 100, kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, emoji: '🍚' },
  { id: 'oats', name: 'Oats (dry)', unit: '40g', serving: 40, kcal: 150, protein: 5, carbs: 27, fat: 3, emoji: '🥣' },
  { id: 'toast', name: 'Whole Wheat Toast', unit: '1 slice (30g)', serving: 30, kcal: 80, protein: 3, carbs: 15, fat: 1, emoji: '🍞' },
  { id: 'broccoli', name: 'Broccoli', unit: '100g', serving: 100, kcal: 34, protein: 2.8, carbs: 7, fat: 0.4, emoji: '🥦' },
  { id: 'salmon', name: 'Salmon', unit: '100g', serving: 100, kcal: 208, protein: 20, carbs: 0, fat: 13, emoji: '🐟' },
  { id: 'greek', name: 'Greek Yogurt (0%)', unit: '100g', serving: 100, kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, emoji: '🥛' },
  { id: 'banana', name: 'Banana', unit: '1 medium (120g)', serving: 120, kcal: 105, protein: 1.3, carbs: 27, fat: 0.4, emoji: '🍌' },
  { id: 'sweetpotato', name: 'Sweet Potato (cooked)', unit: '100g', serving: 100, kcal: 86, protein: 1.6, carbs: 20, fat: 0.1, emoji: '🍠' },
  { id: 'almonds', name: 'Almonds', unit: '15 pieces (20g)', serving: 20, kcal: 115, protein: 4, carbs: 4, fat: 10, emoji: '🌰' },
  { id: 'tofu', name: 'Tofu (firm)', unit: '100g', serving: 100, kcal: 76, protein: 8, carbs: 1.9, fat: 4.8, emoji: '🧊' },
  { id: 'avocado', name: 'Avocado (half)', unit: '1/2 avocado (70g)', serving: 70, kcal: 112, protein: 1.3, carbs: 6, fat: 10, emoji: '🥑' },
  { id: 'blueberry', name: 'Blueberries', unit: '100g', serving: 100, kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, emoji: '🫐' },
  { id: 'pasta', name: 'Pasta (cooked)', unit: '100g', serving: 100, kcal: 131, protein: 5, carbs: 25, fat: 1.1, emoji: '🍝' },
  { id: 'beef', name: 'Lean Beef (95%)', unit: '100g', serving: 100, kcal: 174, protein: 26, carbs: 0, fat: 8, emoji: '🥩' },
  { id: 'shrimp', name: 'Shrimp', unit: '100g', serving: 100, kcal: 85, protein: 18, carbs: 0, fat: 0.5, emoji: '🦐' },
  { id: 'pb', name: 'Peanut Butter', unit: '1 tbsp (16g)', serving: 16, kcal: 94, protein: 4, carbs: 3, fat: 8, emoji: '🥜' },
  { id: 'whey', name: 'Whey Protein Powder', unit: '1 scoop (30g)', serving: 30, kcal: 120, protein: 24, carbs: 2, fat: 1, emoji: '🥤' },
  { id: 'apple', name: 'Apple', unit: '1 medium (180g)', serving: 180, kcal: 95, protein: 0.5, carbs: 25, fat: 0.3, emoji: '🍎' },
  { id: 'spinach', name: 'Spinach', unit: '100g', serving: 100, kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, emoji: '🥬' },
  { id: 'cheese', name: 'Cottage Cheese (low-fat)', unit: '100g', serving: 100, kcal: 72, protein: 12, carbs: 3.4, fat: 1, emoji: '🧀' },
];

// ═══════════════════════════════════════════
//  STACY SIMS DATA
// ═══════════════════════════════════════════
const STACY_SIMS_DATA = {
  title: "Women Are Not Small Men",
  subtitle: "Key principles from Dr. Stacy Sims — exercise physiologist and author of ROAR & Next Level",
  principles: [
    {
      title: "Women Are Not Small Men",
      desc: "Most sports science research has been conducted on men, then simply scaled down for women. This doesn't work. Women have different hormonal profiles, body compositions, and metabolic responses. What works for a 75kg male athlete may be completely wrong for a 60kg female."
    },
    {
      title: "Fuel with Carbs, Not Just Fat",
      desc: "Women oxidize more fat and less carbohydrate at the same relative exercise intensity compared to men. However, this doesn't mean women should follow low-carb diets. Adequate carbohydrate intake is essential for thyroid function, menstrual health, and training performance — especially in the luteal phase."
    },
    {
      title: "Menstrual Cycle Matters",
      desc: "The follicular phase (low estrogen/progesterone) is ideal for high-intensity training and strength work. The luteal phase (high progesterone) raises core temperature and reduces time to fatigue — this is when moderate intensity and recovery-focused work is optimal."
    },
    {
      title: "Protein Timing is Critical",
      desc: "Women have a shorter anabolic window post-exercise compared to men. Aim for 25-30g protein within 30 minutes post-workout, particularly leucine-rich sources. This becomes even more important during the luteal phase when protein oxidation increases."
    },
    {
      title: "Lift Heavy — No, Really Heavy",
      desc: "Women have a higher proportion of type I (endurance) muscle fibers and a lower proportion of type II (power) fibers compared to men. This means women should prioritize heavy resistance training (3-6 reps at 80-90% 1RM) to effectively recruit and stimulate type II fibers for strength and power development."
    },
    {
      title: "Hydration is Different",
      desc: "Women have lower sweat rates and higher core temperature thresholds for sweating compared to men. Pre-loading with sodium (especially in the luteal phase) and maintaining electrolyte balance is more important than just drinking plain water. Add a pinch of salt to your water bottle."
    },
    {
      title: "Birth Control Changes Everything",
      desc: "Hormonal contraceptives flatten the natural hormonal fluctuations. Women on the pill may not experience the same performance peaks in the follicular phase, and recovery patterns may differ. Training should be periodized differently for women on hormonal birth control."
    },
    {
      title: "Recovery is Non-Negotiable",
      desc: "Due to estrogen's role in muscle damage and inflammation, women experience less muscle damage but also less muscle protein breakdown after exercise. This means women can train more frequently but also need adequate recovery between sessions — 48 hours for the same muscle group is recommended."
    }
  ],
  keyQuote: "The female body is not a smaller version of the male body. We have different hormonal cycles, different fuel utilization patterns, and different recovery needs. Training and nutrition must be adapted to these differences for optimal results."
};

// ═══════════════════════════════════════════
//  BOWEL HEALTH DATA
// ═══════════════════════════════════════════
const BOWEL_HEALTH_DATA = {
  title: 'Gut Health & Digestion',
  bristolScale: [
    { type: 1, desc: "Separate hard lumps", status: "Constipation" },
    { type: 2, desc: "Lumpy sausage shape", status: "Mild constipation" },
    { type: 3, desc: "Sausage with cracks", status: "Normal" },
    { type: 4, desc: "Smooth soft snake", status: "Ideal" },
    { type: 5, desc: "Soft blobs", status: "Normal" },
    { type: 6, desc: "Fluffy pieces", status: "Mild diarrhea" },
    { type: 7, desc: "Watery, no solids", status: "Diarrhea" },
  ],
  ideal: {
    frequency: "1-2 times per day",
    consistency: "Type 3-4 on Bristol Scale (banana-like)",
    color: "Medium to dark brown",
    time: "Within 30 minutes of waking (ideal) or after meals",
    effort: "Should pass easily without straining"
  },
  fiberGuide: {
    dailyTarget: "25-30g per day for women",
    tips: [
      "Gradually increase fiber to avoid bloating",
      "Soluble fiber (oats, beans, apples) softens stool",
      "Insoluble fiber (whole grains, veggies) adds bulk",
      "Always pair fiber increase with more water",
      "Prebiotic foods feed beneficial gut bacteria"
    ],
    prebioticFoods: ["Garlic", "Onions", "Leeks", "Asparagus", "Bananas (slightly green)", "Oats", "Apples", "Flaxseeds"],
    probioticFoods: ["Greek yogurt", "Kefir", "Sauerkraut", "Kimchi", "Miso", "Tempeh", "Kombucha"]
  },
  commonIssues: [
    { issue: "Constipation", causes: "Low fiber, dehydration, sedentary lifestyle, stress, certain supplements (iron)", fixes: "Increase fiber gradually, drink 500ml water upon waking, walk after meals, magnesium supplement" },
    { issue: "Bloating", causes: "Eating too fast, high FODMAP foods, carbonated drinks, artificial sweeteners, stress", fixes: "Chew thoroughly, reduce carbonated drinks, try low-FODMAP trial, manage stress" },
    { issue: "Loose stools", causes: "Too much fiber too fast, caffeine excess, dairy intolerance, pre-workout supplements", fixes: "Reduce fiber temporarily, limit caffeine to 400mg, check dairy tolerance" },
  ]
};

// ═══════════════════════════════════════════
//  NUTRITION GUIDE
// ═══════════════════════════════════════════
const NUTRITION_GUIDE = {
  protein: {
    title: 'Protein',
    icon: 'Beef',
    color: '#FF8FAB',
    description: 'The building block of muscle. Adequate protein intake is essential for muscle protein synthesis, recovery, and maintaining lean mass during fat loss.',
    sources: ['Chicken breast', 'Turkey', 'Lean beef', 'Fish (salmon, tuna, cod)', 'Eggs & egg whites', 'Greek yogurt', 'Cottage cheese', 'Tofu & tempeh', 'Lentils & beans', 'Protein powder (whey, casein, plant-based)'],
    tips: ['Aim for 1.6-2.2g per kg of bodyweight daily', 'Distribute across 3-5 meals (20-40g per meal)', 'Post-workout: 25-30g within 30 min (Sims)', 'Leucine-rich sources trigger MPS most effectively'],
    stacySims: 'Women may benefit from post-exercise protein intake of 20-30g within ~2 hours post-workout, particularly leucine-rich sources (Morton et al. 2018; Phillips & Van Loon 2021). Total daily protein intake is the primary driver of muscle protein synthesis.'
  },
  carbs: {
    title: 'Carbohydrates',
    icon: 'Wheat',
    color: '#D4A574',
    description: "Your body's primary fuel source for training. Carbs replenish muscle glycogen, support thyroid function, and help regulate cortisol levels in women. Stacy Sims emphasizes that women should NOT follow low-carb diets.",
    sources: ['Oats & oatmeal', 'Rice (white, brown, jasmine)', 'Potatoes & sweet potatoes', 'Quinoa', 'Whole grain bread & pasta', 'Fruits (bananas, berries, apples)', 'Legumes', 'Honey & maple syrup (moderation)'],
    tips: ['Timing: prioritize carbs around your workout window', 'Fiber: aim for 25-30g daily for digestive health', 'Complex carbs provide sustained energy', 'Women need adequate carbs for hormonal health'],
    stacySims: "Women oxidize proportionally more fat and less carbohydrate at the same relative exercise intensity compared to men (Tarnopolsky et al. 2001). However, this does not mean women should follow low-carbohydrate diets. Adequate carbohydrate intake is essential for thyroid function, menstrual health, and training performance in women (Stellingwerff et al. 2021)."
  },
  fats: {
    title: 'Healthy Fats',
    icon: 'Droplet',
    color: '#F7DC6F',
    description: 'Essential for hormone production (estrogen, progesterone), brain function, and absorption of fat-soluble vitamins. Women need adequate fat for menstrual health.',
    sources: ['Avocado', 'Olive oil', 'Nuts (almonds, walnuts, cashews)', 'Nut butters', 'Fatty fish (salmon, sardines)', 'Chia & flax seeds', 'Egg yolks', 'Dark chocolate (70%+)'],
    tips: ['Never drop below 0.6g per kg bodyweight', 'Omega-3s: aim for 2-3 servings of fatty fish weekly', 'Saturated fat: <10% of total calories', 'Avoid trans fats completely']
  },
  micronutrients: {
    title: 'Key Micronutrients for Women',
    icon: 'Flask',
    color: '#BB8FCE',
    description: 'Women have unique micronutrient needs due to menstruation, hormonal cycles, and bone density requirements.',
    items: [
      { name: 'Iron', amount: '18mg/day (premenopausal)', source: 'Red meat, spinach, lentils, fortified cereals', note: 'Menstruating women lose iron monthly; deficiency is common' },
      { name: 'Calcium', amount: '1000-1200mg/day', source: 'Dairy, fortified plant milk, leafy greens', note: 'Critical for bone density; women are at higher risk of osteoporosis' },
      { name: 'Vitamin D', amount: '600-2000 IU/day', source: 'Sunlight, fatty fish, fortified foods, supplement', note: 'Most women are deficient; essential for bone health and immunity' },
      { name: 'Magnesium', amount: '310-320mg/day', source: 'Nuts, seeds, dark chocolate, leafy greens', note: 'Supports muscle function, sleep, and stress management' },
      { name: 'Folate', amount: '400mcg/day', source: 'Leafy greens, legumes, fortified grains', note: 'Essential for DNA synthesis and reproductive health' },
      { name: 'Omega-3', amount: '1-3g EPA+DHA/day', source: 'Fatty fish, fish oil, algae oil', note: 'Anti-inflammatory; supports brain, heart, and hormonal health' },
    ]
  },
  supplements: {
    title: 'Evidence-Based Supplements',
    icon: 'Award',
    color: '#87CEEB',
    items: [
      { name: 'Creatine Monohydrate', dose: '3-5g/day', note: 'Most researched supplement. Increases strength, muscle mass, and cognitive function. Equally effective for women. Safe for long-term use.' },
      { name: 'Whey/Plant Protein', dose: 'As needed to hit protein targets', note: 'Convenient protein source. No different from food protein. Useful post-workout when whole food is not available.' },
      { name: 'Vitamin D3', dose: '1000-2000 IU/day', note: 'Deficiency is extremely common, especially for indoor workers. Get blood levels tested if possible.' },
      { name: 'Iron (if deficient)', dose: 'Per blood test results', note: 'Only supplement if deficient. Ferritin <30 ng/mL indicates deficiency. Common in active women.' },
      { name: 'Caffeine', dose: '3-6mg/kg pre-workout', note: 'Improves performance and endurance. ~150-300mg for most women. Avoid within 8 hours of bedtime.' },
      { name: 'Multivitamin', dose: '1/day', note: 'Insurance policy, not a replacement for whole foods. Look for one with iron if you menstruate.' },
    ]
  },
  hydration: {
    title: 'Hydration',
    icon: 'Droplet',
    color: '#98D8C8',
    description: 'Water is involved in every metabolic process, nutrient transport, and temperature regulation. Women have different hydration needs than men.',
    recommendation: 'Base: 35ml per kg bodyweight daily',
    stacySimsNote: 'Women have lower sweat rates and higher core temperature thresholds for sweating compared to men (Gagnon & Kenny 2012). Adding sodium to fluids (especially during hot weather or high-volume training) can improve hydration status. Individual fluid needs vary significantly. Monitor urine color (pale yellow = well hydrated) as a practical guide.',
    tips: ['Base: 35ml per kg bodyweight', 'Add 500ml per hour of exercise', 'Add 300-500ml if taking creatine', 'Caffeine is a diuretic — add 150ml per cup of coffee', 'Pale yellow urine = well hydrated', 'Start your day with 300-500ml water', 'Electrolytes needed for sessions >60 min']
  }
};

// ═══════════════════════════════════════════
//  SCIENCE DATA
// ═══════════════════════════════════════════
const SCIENCE_DATA = {
  menstrual: {
    title: 'Menstrual Cycle: What the Evidence Says',
    icon: 'Moon',
    phases: [
      { name: 'The Research Landscape', desc: 'A 2023 umbrella review from McMaster University (D\'Souza et al., J Appl Physiol) found no consistent evidence that menstrual cycle phase affects strength performance or training adaptations. Individual variation is far greater than any phase-based effect. Most previous studies had methodological limitations (self-reported cycles, no hormonal confirmation, small samples).' },
      { name: 'What This Means for Training', desc: 'Stuart Phillips, senior author of the umbrella review, stated: "We saw no evidence that such practice is science-based." (Colenso-Semple et al., 2023, Frontiers in Sports). Current evidence does NOT support rigid phase-based training plans. The best approach is consistent training with adjustments based on how YOU feel, not your cycle day.' },
      { name: 'Individual Differences Matter', desc: 'While group-level data shows no clear phase effects, some women DO experience symptoms that affect training. If you feel stronger during certain phases, schedule harder sessions then. If you experience fatigue or discomfort, reduce intensity. Self-tracking remains valuable — but use it to find YOUR individual patterns, not to follow generic phase-based templates.' },
      { name: 'Practical Guidelines', desc: '1) Train consistently year-round (Kissow et al., 2022; Wikstrom-Frisen et al., 2017). 2) Adjust intensity based on symptoms and recovery, not calendar dates. 3) If you experience severe symptoms, consult a physician. 4) Women on hormonal contraceptives follow different hormonal patterns — cycle-based approaches do not apply to ~400 million women worldwide who use them.' }
    ],
    note: 'The consensus has shifted significantly since 2020. Earlier narrative reviews (e.g., McNulty 2020) suggested phase-based periodization, but more rigorous umbrella reviews and meta-analyses in 2023 found the evidence insufficient. This is a fast-evolving field — we update our content as new research emerges.'
  },
  womenVsMen: {
    title: 'Women vs Men: Muscle Building',
    icon: 'Scale',
    facts: [
      'Women can build muscle at ~85-90% the rate of men relative to lean mass',
      'Women have more type I (endurance) muscle fibers, making them more fatigue-resistant',
      'Women recover faster between sets — 60-90s rest vs 2-3 min for men',
      'Women are less prone to training-induced muscle damage',
      'Women respond equally well to creatine supplementation',
      'Women need higher relative training volume for optimal growth due to fiber composition',
      'Estrogen provides a protective effect against muscle breakdown'
    ]
  },
  rmrFacts: {
    title: 'Female Metabolism: The Truth',
    icon: 'Flame',
    facts: [
      "Women's RMR is ~5-10% lower than men's of the same weight (due to lower lean mass)",
      'Menstrual cycle causes RMR to fluctuate by 2.5-11% throughout the month (Benton et al. 2020)',
      'RMR decreases by ~2-3% per decade after age 20, primarily due to muscle loss (St-Onge & Gallagher 2008)',
      'Building 1kg of muscle increases RMR by ~13 kcal/day — small but cumulative (McArdle et al., 2015)',
      'Crash dieting (>500 kcal deficit) suppresses metabolic rate and raises cortisol',
      'Women generally burn a higher percentage of fat at rest compared to men'
    ]
  },
  bodyFat: {
    title: 'Healthy Body Fat Ranges (ACE Standards)',
    icon: 'Target',
    ranges: [
      { category: 'Essential Fat', range: '10-13%', note: 'Minimum for physiological function (ACE, 2024). Not sustainable for athletic performance.' },
      { category: 'Athletic', range: '14-20%', note: 'Typical for competitive athletes. Optimal for power-to-weight sports (ACE, 2024).' },
      { category: 'Fit', range: '21-24%', note: 'Healthy target for active women. Balances performance and hormonal health (ACE, 2024).' },
      { category: 'Average', range: '25-31%', note: 'Normal healthy range for general population (ACE, 2024). Increases ~1% per decade after 30.' },
      { category: 'Above Average', range: '32%+', note: 'Associated with elevated cardiometabolic risk (ACE, 2024; NHANES 2022).' },
    ],
    note: 'Standards from the American Council on Exercise (ACE, 2024). Body fat is more informative than BMI for athletic women. Essential fat requirements are higher in women than men due to reproductive and hormonal functions. Ranges shift ~1% higher per decade of age after 30.'
  },
  references: [
    'Mifflin MD, et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr, 51(2): 241-247.',
    'Jager R, et al. (2017). International Society of Sports Nutrition Position Stand: protein and exercise. JISSN, 14(1): 20.',
    'Kerksick CM, et al. (2022). ISSN exercise & sports nutrition review update. JISSN, 19(1): 1-62.',
    'Kreider RB, et al. (2022). ISSN Position Stand: safety and efficacy of creatine supplementation. JISSN, 19(1): 1-25.',
    'Morton RW, et al. (2018). Protein supplementation augments resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med, 52(6): 376-384.',
    'Schoenfeld BJ, et al. (2023). Resistance training variables and muscle hypertrophy: systematic review and network meta-analysis. Br J Sports Med, 57(18): 1211-1220.',
    "Colenso-Semple LM, et al. (2023). Current evidence shows no influence of women's menstrual cycle phase on acute strength performance or adaptations to resistance exercise training. Front Sports Act Living, 5: 1054542.",
    "D'Souza AC, et al. (2023). Menstrual cycle hormones and oral contraceptives: multimethod systems physiology-based review. J Appl Physiol, 135(2): 319-336.",
    'Schoenfeld BJ, Grgic J. (2022). Evidence-based guidelines for resistance training volume. JSCR, 36(4): 1036-1041.',
    "Helms ER, et al. (2014). Evidence-based recommendations for natural bodybuilding contest preparation. JISSN, 11(1): 20.",
    'Sims ST. (2016). ROAR: How to Match Your Food and Fitness to Your Unique Female Physiology.',
    'Sims ST, Yeager K. (2022). Next Level: Your Guide to Kicking Ass, Feeling Great, and Crushing Goals Through Menopause and Beyond.',
    "ACSM's Guidelines for Exercise Testing and Prescription, 11th Edition (2021).",
  ]
};


// ═══════════════════════════════════════════
//  NAVBAR
// ═══════════════════════════════════════════
function Navbar({ currentPage, setPage, lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [{ key: 'home', label: T(lang, 'navHome') }, { key: 'calculator', label: T(lang, 'navCalculator') }, { key: 'training', label: T(lang, 'navTraining') }, { key: 'nutrition', label: T(lang, 'navNutrition') }, { key: 'science', label: T(lang, 'navScience') }];
  return h('nav', { className: 'sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-light-pink/40' },
    h('div', { className: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8' },
      h('div', { className: 'flex items-center justify-between h-16' },
        h('button', { onClick: () => setPage('home'), className: 'flex items-center gap-2 btn-tap' },
          h('span', { className: 'font-display text-2xl text-brown' }, 'BunnyLift'),
          h('span', { className: 'hidden sm:inline text-[10px] bg-pink/30 text-brown px-2 py-0.5 rounded-full uppercase tracking-wider font-medium' }, 'For Women')
        ),
        h('div', { className: 'hidden md:flex items-center gap-1' }, links.map(l => h('button', { key: l.key, onClick: () => setPage(l.key), className: cls('px-4 py-2 rounded-full text-sm font-medium transition-colors btn-tap', currentPage === l.key ? 'bg-pink/20 text-brown' : 'text-text-light hover:text-brown hover:bg-light-pink/50') }, l.label))),
        h('button', { onClick: () => setMobileOpen(!mobileOpen), className: 'md:hidden w-10 h-10 rounded-full bg-light-pink flex items-center justify-center btn-tap' }, mobileOpen ? h(Icon, { name: 'X', size: 18 }) : h(Icon, { name: 'Menu', size: 18 }))
      ),
      h(AnimatePresence, { show: mobileOpen }, h('div', { className: 'md:hidden pb-4 anim-fade-in' }, links.map(l => h('button', { key: l.key, onClick: () => { setPage(l.key); setMobileOpen(false); }, className: cls('block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors btn-tap', currentPage === l.key ? 'bg-pink/20 text-brown' : 'text-text-light hover:text-brown hover:bg-light-pink/50') }, l.label))))
    )
  );
}

// ═══════════════════════════════════════════
//  FOOTER
// ═══════════════════════════════════════════
function Footer({ lang }) {
  return h('footer', { className: 'bg-brown text-white/70 py-10 mt-16' },
    h('div', { className: 'max-w-6xl mx-auto px-4 sm:px-6 text-center' },
      h('p', { className: 'font-display text-xl text-white mb-2' }, 'BunnyLift'),
      h('p', { className: 'text-sm mb-4' }, T(lang, 'footerSlogan')),
      h('p', { className: 'text-xs text-white/40' }, T(lang, 'footerDisclaimer')),
      h('p', { className: 'text-xs text-white/30 mt-2' }, T(lang, 'footerCopyright'))
    )
  );
}

// ═══════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════
function HomePage({ setPage, lang }) {
  const features = [
    { icon: 'Calculator', title: 'Smart Calculator', desc: 'RMR, TDEE, and macro targets tailored to your goal: cut, maingain, or bulk.', action: 'calculator', color: '#FFB5C5' },
    { icon: 'Dumbbell', title: T(lang, 'trainingTitle'), desc: '5 science-backed programs including the new Hourglass plan with 10K daily steps.', action: 'training', color: '#FF8FAB' },
    { icon: 'Apple', title: 'Nutrition Tools', desc: 'Macro guide, hydration calculator, food nutrition lookup — all grounded in research.', action: 'nutrition', color: '#D4A574' },
    { icon: 'Flask', title: T(lang, 'scienceTitle'), desc: 'Female-specific physiology: Stacy Sims principles, menstrual cycle training, gut health.', action: 'science', color: '#BB8FCE' },
  ];
  return h('div', null,
    h('section', { className: 'pt-12 pb-16 px-4' },
      h('div', { className: 'max-w-4xl mx-auto text-center' },
        h('div', { className: 'anim-fade-in-up' },
          h('span', { className: 'inline-block text-xs font-semibold tracking-widest uppercase text-pink bg-pink/15 px-4 py-1.5 rounded-full mb-6' }, T(lang, 'homeTitle')),
          h('h1', { className: 'font-display text-5xl sm:text-6xl lg:text-7xl text-brown mb-6 leading-tight' }, T(lang, 'homeSubtitle1')),
          h('h2', { className: 'font-display text-3xl sm:text-4xl text-text-light mb-8' }, T(lang, 'homeSubtitle2'))
        ),
        h('p', { className: 'text-text-light text-lg max-w-2xl mx-auto mb-10 anim-fade-in-up', style: { animationDelay: '0.15s' } },
          T(lang, 'homeDesc')),
        h('div', { className: 'flex flex-col sm:flex-row gap-4 justify-center anim-fade-in-up', style: { animationDelay: '0.25s' } },
          h('button', { onClick: () => setPage('calculator'), className: 'px-8 py-4 bg-gradient-to-r from-pink to-glute text-white font-semibold rounded-2xl shadow-lg shadow-pink/25 hover-lift btn-tap text-lg' }, T(lang, 'homeStartCalc')),
          h('button', { onClick: () => setPage('training'), className: 'px-8 py-4 bg-white text-brown font-semibold rounded-2xl border-2 border-light-pink hover:border-pink hover-lift btn-tap text-lg' }, T(lang, 'homeViewTraining'))
        )
      )
    ),
    h('section', { className: 'py-10 px-4 bg-white/50 border-y border-light-pink/40' },
      h('div', { className: 'max-w-4xl mx-auto flex flex-col sm:flex-row justify-around gap-8 text-center' },
        [{ v: '5', l: T(lang, 'homeStatsPrograms') }, { v: '22+', l: T(lang, 'homeStatsFoods') }, { v: '100%', l: T(lang, 'homeStatsEvidence') }].map((s, i) => h('div', { key: i, className: 'anim-fade-in-up', style: { animationDelay: `${i * 0.1}s` } },
          h('p', { className: 'font-display text-4xl text-pink' }, s.v), h('p', { className: 'text-sm text-text-light mt-1' }, s.l)
        ))
      )
    ),
    h('section', { className: 'py-16 px-4' },
      h('div', { className: 'max-w-6xl mx-auto' },
        h('h2', { className: 'font-display text-3xl sm:text-4xl text-brown text-center mb-4' }, T(lang, 'homeSectionTitle')),
        h('p', { className: 'text-text-light text-center max-w-xl mx-auto mb-12' }, T(lang, 'homeSectionDesc')),
        h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6' },
          features.map((f, i) => h('button', { key: i, onClick: () => setPage(f.action), className: 'text-left bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-light-pink/40 hover-lift anim-fade-in-up btn-tap', style: { animationDelay: `${i * 0.1}s` } },
            h('div', { className: 'w-12 h-12 rounded-2xl flex items-center justify-center mb-4', style: { backgroundColor: f.color + '25' } }, h(Icon, { name: f.icon, size: 24, className: 'text-brown' })),
            h('h3', { className: 'font-semibold text-brown text-lg mb-2' }, f.title),
            h('p', { className: 'text-sm text-text-light leading-relaxed' }, f.desc),
            h('span', { className: 'inline-flex items-center gap-1 text-sm text-pink font-medium mt-4' }, 'Explore ', h(Icon, { name: 'ChevronRight', size: 14 }))
          ))
        )
      )
    ),
    h('section', { className: 'py-16 px-4' },
      h('div', { className: 'max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-light-pink/40 text-center anim-fade-in-up' },
        h(Icon, { name: 'Flask', size: 36, className: 'text-pink mx-auto mb-4' }),
        h('h2', { className: 'font-display text-3xl text-brown mb-4' }, T(lang, 'homeScienceTitle')),
        h('p', { className: 'text-text-light max-w-2xl mx-auto mb-6' }, 'Every recommendation is backed by peer-reviewed research from sources like the ISSN, ACSM, and WHO. We incorporate Stacy Sims\' principles on female physiology, account for hormonal cycles, body composition differences, and unique micronutrient needs.'),
        h('button', { onClick: () => setPage('science'), className: 'px-6 py-3 bg-light-pink text-brown font-medium rounded-xl btn-tap hover:bg-pink/30 transition-colors' }, T(lang, 'homeScienceCTA'))
      )
    )
  );
}

// ═══════════════════════════════════════════
//  CALCULATOR PAGE
// ═══════════════════════════════════════════
function CalculatorPage({ lang }) {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(60);
  const [height, setHeight] = useState(165);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState(null);
  const goalRef = useRef(null);
  const handleGoalSelect = (g) => {
    setGoal(g);
    setTimeout(() => { if (goalRef.current) goalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
  };
  const bmr = useMemo(() => Math.round(10 * weight + 6.25 * height - 5 * age - 161), [age, weight, height]);
  const tdee = useMemo(() => Math.round(bmr * activity), [bmr, activity]);
  const goalData = useMemo(() => {
    if (!goal) return null;
    let calories, protein, fat, carbs, desc, weeklyChange;
    const proteinPerKg = goal === 'bulk' ? 2.0 : goal === 'cut' ? 2.2 : 1.8;
    protein = Math.round(weight * proteinPerKg);
    if (goal === 'cut') { calories = Math.round(tdee * 0.82); fat = Math.round((calories * 0.30) / 9); weeklyChange = '~0.5% bodyweight loss per week'; desc = 'Moderate deficit for sustainable fat loss while preserving muscle mass. Higher protein to maintain lean tissue.'; }
    else if (goal === 'maingain') { calories = Math.round(tdee * 1.03); fat = Math.round((calories * 0.30) / 9); weeklyChange = 'Minimal weight change'; desc = 'Near-maintenance calories to recomposition — slowly building muscle while keeping fat stable.'; }
    else { calories = Math.round(tdee * 1.12); fat = Math.round((calories * 0.25) / 9); weeklyChange = '~0.25-0.5% bodyweight gain per week'; desc = 'Controlled surplus to maximize muscle gain while minimizing fat accumulation.'; }
    carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
    return { calories, protein, fat, carbs, desc, weeklyChange };
  }, [goal, tdee, weight]);
  const activities = [
    { value: 1.2, label: T(lang, 'calcSedentary'), desc: T(lang, 'calcSedentaryDesc') }, { value: 1.375, label: T(lang, 'calcLightlyActive'), desc: T(lang, 'calcLightlyActiveDesc') },
    { value: 1.55, label: T(lang, 'calcModeratelyActive'), desc: T(lang, 'calcModeratelyActiveDesc') }, { value: 1.725, label: T(lang, 'calcVeryActive'), desc: T(lang, 'calcVeryActiveDesc') },
    { value: 1.9, label: T(lang, 'calcExtraActive'), desc: T(lang, 'calcExtraActiveDesc') },
  ];
  const goals = [
    { key: 'cut', label: T(lang, 'calcCut'), subtitle: T(lang, 'calcCutSubtitle'), color: '#98D8C8', desc: T(lang, 'calcCutDesc') },
    { key: 'maingain', label: T(lang, 'calcMaingain'), subtitle: T(lang, 'calcMaingainSubtitle'), color: '#F7DC6F', desc: T(lang, 'calcMaingainDesc') },
    { key: 'bulk', label: T(lang, 'calcBulk'), subtitle: T(lang, 'calcBulkSubtitle'), color: '#FF8FAB', desc: T(lang, 'calcBulkDesc') },
  ];

  return h('div', { className: 'max-w-5xl mx-auto px-4 py-8 sm:py-12' },
    h('div', { className: 'text-center mb-12 anim-fade-in-up' },
      h('h1', { className: 'font-display text-4xl sm:text-5xl text-brown mb-3' }, T(lang, 'calcTitle')),
      h('p', { className: 'text-text-light max-w-xl mx-auto' }, T(lang, 'calcSubtitle'))
    ),
    h('div', { className: 'grid lg:grid-cols-2 gap-8 mb-12' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 anim-fade-in-up' },
        h('h2', { className: 'font-display text-2xl text-brown mb-6 flex items-center gap-2' }, h(Icon, { name: 'Calculator', size: 22 }), T(lang, 'calcInfoTitle')),
        h('div', { className: 'space-y-5' },
          [['Age', age, 15, 80, 'years', setAge], ['Weight', weight, 35, 150, 'kg', setWeight], ['Height', height, 130, 200, 'cm', setHeight]].map(([label, val, min, max, unit, setter]) =>
            h('div', { key: label }, h('label', { className: 'block text-sm font-medium text-brown mb-2' }, `${label}: ${val} ${unit}`),
              h('input', { type: 'range', min, max, value: val, onChange: e => setter(+e.target.value), className: 'w-full accent-pink' }),
              h('div', { className: 'flex justify-between text-xs text-text-light mt-1' }, h('span', null, min), h('span', null, max + ' ' + unit))))
        )
      ),
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 anim-fade-in-up', style: { animationDelay: '0.1s' } },
        h('h2', { className: 'font-display text-2xl text-brown mb-6 flex items-center gap-2' }, h(Icon, { name: 'Zap', size: 22 }), T(lang, 'calcActivityTitle')),
        h('div', { className: 'space-y-3' }, activities.map(a => h('button', { key: a.value, onClick: () => setActivity(a.value), className: cls('w-full text-left p-4 rounded-2xl border-2 transition-all btn-tap', activity === a.value ? 'border-pink bg-pink/10' : 'border-light-pink/50 hover:border-pink/30') },
          h('div', { className: 'flex items-center justify-between' }, h('span', { className: cls('font-medium', activity === a.value ? 'text-brown' : 'text-text') }, a.label), activity === a.value ? h(Icon, { name: 'Check', size: 16, className: 'text-pink' }) : null),
          h('p', { className: 'text-xs text-text-light mt-1' }, a.desc), h('p', { className: 'text-xs text-text-light' }, `Multiplier: ${a.value}`)
        )))
      )
    ),
    h('div', { className: 'grid sm:grid-cols-2 gap-6 mb-12' },
      h('div', { className: 'bg-gradient-to-br from-brown to-[#6B4423] text-white rounded-3xl p-8 text-center anim-fade-in-up', style: { animationDelay: '0.15s' } },
        h('p', { className: 'text-white/60 text-sm uppercase tracking-wider mb-2' }, T(lang, 'calcBMR')), h('p', { className: 'font-display text-5xl mb-2' }, bmr.toLocaleString()), h('p', { className: 'text-white/60 text-sm' }, T(lang, 'calcBMRUnit')), h('p', { className: 'text-white/40 text-xs mt-3' }, T(lang, 'calcBMRNote'))
      ),
      h('div', { className: 'bg-gradient-to-br from-pink to-glute text-white rounded-3xl p-8 text-center anim-fade-in-up', style: { animationDelay: '0.2s' } },
        h('p', { className: 'text-white/70 text-sm uppercase tracking-wider mb-2' }, T(lang, 'calcTDEE')), h('p', { className: 'font-display text-5xl mb-2' }, tdee.toLocaleString()), h('p', { className: 'text-white/70 text-sm' }, T(lang, 'calcBMRUnit')), h('p', { className: 'text-white/50 text-xs mt-3' }, T(lang, 'calcTDEENote'))
      )
    ),
    h('div', { className: 'mb-12 anim-fade-in-up', style: { animationDelay: '0.25s' } },
      h('h2', { className: 'font-display text-2xl text-brown mb-6 text-center' }, T(lang, 'calcGoalTitle')),
      h('div', { className: 'grid sm:grid-cols-3 gap-4' }, goals.map(g => h('button', { key: g.key, onClick: () => handleGoalSelect(g.key), className: cls('p-6 rounded-3xl border-2 text-left transition-all btn-tap hover-lift', goal === g.key ? 'border-pink bg-pink/10' : 'border-light-pink/50 bg-white/50') },
        h('div', { className: 'flex items-center gap-3 mb-3' }, h('span', { className: 'w-4 h-4 rounded-full border-2 flex items-center justify-center', style: { borderColor: g.color } }, goal === g.key ? h('span', { className: 'w-2 h-2 rounded-full', style: { backgroundColor: g.color } }) : null), h('span', { className: 'font-semibold text-brown' }, g.label)),
        h('p', { className: 'text-xs text-text-light mb-1' }, g.subtitle), h('p', { className: 'text-xs text-text-light' }, g.desc)
      )))
    ),
    h('div', { ref: goalRef }),
    h(AnimatePresence, { show: goalData !== null },
      h('div', { className: 'anim-fade-in-up' },
        h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-8' },
          h('div', { className: 'text-center mb-6' }, h('p', { className: 'text-text-light text-sm uppercase tracking-wider mb-2' }, T(lang, 'calcTargetTitle')), h('p', { className: 'font-display text-5xl text-brown' }, `${goalData?.calories?.toLocaleString()} kcal`), h('p', { className: 'text-text-light text-sm mt-2' }, goalData?.weeklyChange), h('p', { className: 'text-text-light text-xs max-w-lg mx-auto mt-3' }, goalData?.desc)),
          h('div', { className: 'space-y-4 max-w-2xl mx-auto' },
            [['Protein', goalData?.protein, 4, '#FF8FAB'], ['Carbohydrates', goalData?.carbs, 4, '#D4A574'], ['Fats', goalData?.fat, 9, '#F7DC6F']].map(([label, val, mult, color]) =>
              h('div', { key: label }, h('div', { className: 'flex justify-between text-sm mb-1' }, h('span', { className: 'font-medium text-brown' }, label), h('span', { className: 'text-text-light' }, `${val}g (${Math.round(val * mult)} kcal)`)),
                h('div', { className: 'h-4 bg-light-pink/40 rounded-full overflow-hidden' }, h('div', { className: 'h-full rounded-full transition-all duration-700', style: { width: `${Math.min((val * mult / goalData?.calories) * 100, 100)}%`, backgroundColor: color } })))
            ))
          ),
          h('div', { className: 'grid grid-cols-3 gap-4 mt-8' },
            h('div', { className: 'bg-pink/10 rounded-2xl p-4 text-center' }, h('p', { className: 'font-display text-2xl text-brown' }, `${goalData?.protein}g`), h('p', { className: 'text-xs text-text-light mt-1' }, T(lang, 'calcProtein'))),
            h('div', { className: 'bg-leg/10 rounded-2xl p-4 text-center' }, h('p', { className: 'font-display text-2xl text-brown' }, `${goalData?.carbs}g`), h('p', { className: 'text-xs text-text-light mt-1' }, T(lang, 'calcCarbs'))),
            h('div', { className: 'bg-chest/20 rounded-2xl p-4 text-center' }, h('p', { className: 'font-display text-2xl text-brown' }, `${goalData?.fat}g`), h('p', { className: 'text-xs text-text-light mt-1' }, T(lang, 'calcFats')))
          )
        ),
        h('div', { className: 'bg-pink/10 border border-pink/20 rounded-2xl p-5 flex gap-4 items-start' },
          h(Icon, { name: 'Info', size: 20, className: 'text-pink shrink-0 mt-0.5' }),
          h('div', null, h('p', { className: 'text-sm text-brown font-medium mb-1' }, 'Why this protein amount?'),
            h('p', { className: 'text-xs text-text-light leading-relaxed' }, `ISSN (2017) and Morton et al. (2018) show women benefit from ${goal === 'cut' ? '2.2g' : goal === 'bulk' ? '2.0g' : '1.8g'}/kg during ${goal === 'cut' ? 'caloric restriction' : goal === 'bulk' ? 'surplus' : 'recomposition'}. Supports muscle protein synthesis, recovery, and hormonal health.`))
        )
      )
    );
}


// ═══════════════════════════════════════════
//  TRAINING PAGE (新增滚动交互 + Hourglass)
// ═══════════════════════════════════════════
function TrainingPage({ lang }) {
  const [selectedSplit, setSelectedSplit] = useState('ppl');
  const [expandedDay, setExpandedDay] = useState(0);
  const scheduleRef = useRef(null);
  const split = TRAINING_SPLITS.find(s => s.id === selectedSplit);

  const handleSelectSplit = (id) => {
    setSelectedSplit(id);
    setExpandedDay(0);
    // Scroll to schedule after a short delay for React to render
    setTimeout(() => {
      if (scheduleRef.current) {
        scheduleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return h('div', { className: 'max-w-5xl mx-auto px-4 py-8 sm:py-12' },
    h('div', { className: 'text-center mb-12 anim-fade-in-up' },
      h('h1', { className: 'font-display text-4xl sm:text-5xl text-brown mb-3' }, T(lang, 'trainingTitle')),
      h('p', { className: 'text-text-light max-w-2xl mx-auto' }, T(lang, 'trainingSubtitle'))
    ),
    // Split selector cards
    h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6' },
      TRAINING_SPLITS.map((s, i) => h('button', {
        key: s.id,
        onClick: () => handleSelectSplit(s.id),
        className: cls('p-5 rounded-2xl border-2 text-left transition-all btn-tap hover-lift anim-fade-in-up', selectedSplit === s.id ? 'border-pink bg-pink/10' : 'border-light-pink/40 bg-white/50'),
        style: { animationDelay: `${i * 0.06}s` }
      },
        h('p', { className: 'font-semibold text-brown mb-1 text-sm' }, s.name),
        h('p', { className: 'text-xs text-text-light' }, s.frequency),
        h('span', { className: 'inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-light-pink text-brown' }, s.level)
      ))
    ),
    // Scroll hint
    h('div', { className: 'text-center mb-8 anim-fade-in' },
      h('p', { className: 'text-xs text-text-light' }, T(lang, 'trainingClickHint'))
    ),
    // Split detail
    h('div', { ref: scheduleRef, className: 'scroll-mt-24 anim-fade-in' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-8' },
        h('div', { className: 'flex flex-col lg:flex-row gap-6' },
          h('div', { className: 'flex-1' },
            h('h2', { className: 'font-display text-3xl text-brown mb-3' }, split.name),
            h('p', { className: 'text-text-light mb-4 leading-relaxed' }, split.description),
            h('p', { className: 'text-sm' }, h('span', { className: 'font-medium text-brown' }, 'Ideal for: '), h('span', { className: 'text-text-light' }, split.idealFor))
          ),
          h('div', { className: 'flex gap-4 lg:flex-col lg:justify-center shrink-0' },
            h('div', { className: 'bg-light-pink/40 rounded-2xl px-5 py-3 text-center' }, h('p', { className: 'font-display text-2xl text-brown' }, split.frequency.split(' ')[0]), h('p', { className: 'text-xs text-text-light' }, T(lang, 'trainingDaysPerWeek'))),
            split.id === 'hourglass' ? h('div', { className: 'bg-glute/20 rounded-2xl px-5 py-3 text-center' }, h('p', { className: 'font-display text-2xl text-brown' }, '10K'), h('p', { className: 'text-xs text-text-light' }, 'Steps/Day')) : null
          )
        ),
        split.id === 'hourglass' ? h('div', { className: 'mt-5 p-4 bg-glute/10 rounded-2xl flex gap-3 items-start' },
          h(Icon, { name: 'Info', size: 18, className: 'text-glute shrink-0 mt-0.5' }),
          h('div', null, h('p', { className: 'text-sm text-brown font-medium mb-1' }, 'Why 10,000 steps?'),
            h('p', { className: 'text-xs text-text-light leading-relaxed' }, 'NEAT (Non-Exercise Activity Thermogenesis) is the biggest differentiator in female body composition. Research by Levine et al. shows that increasing daily steps from 5K to 10K can increase TDEE by 200-300 kcal/day — more than most gym sessions. The Hourglass plan prioritizes this sustainable, lifestyle-based approach.'))
        ) : null
      ),
      // Schedule accordion
      h('div', { className: 'space-y-3' }, split.schedule.map((day, idx) => {
        const isOpen = expandedDay === idx;
        const isRest = day.day.includes('Rest') || day.day.includes('Active');
        const isNeat = day.day.includes('NEAT');
        return h('div', { key: idx, className: cls('rounded-2xl border overflow-hidden transition-all anim-fade-in-up', isRest || isNeat ? 'border-light-pink/30 bg-white/40' : 'border-light-pink/40 bg-white/70'), style: { animationDelay: `${idx * 0.04}s` } },
          h('button', { onClick: () => setExpandedDay(isOpen ? -1 : idx), className: 'w-full flex items-center justify-between p-5 btn-tap text-left' },
            h('div', { className: 'flex items-center gap-4' },
              h('span', { className: cls('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0', isRest ? 'bg-light-pink/30 text-text-light' : isNeat ? 'bg-glute/30 text-brown' : 'bg-pink/20 text-brown') }, isRest ? 'Z' : isNeat ? 'S' : `D${idx + 1}`),
              h('div', null, h('p', { className: 'font-semibold text-brown' }, day.day), h('p', { className: 'text-xs text-text-light' }, day.focus))
            ),
            isOpen ? h(Icon, { name: 'ChevronUp', size: 18, className: 'text-text-light' }) : h(Icon, { name: 'ChevronDown', size: 18, className: 'text-text-light' })
          ),
          h(AnimatePresence, { show: isOpen },
            h('div', { className: 'px-5 pb-5 anim-fade-in' },
              h('div', { className: 'space-y-2' }, day.exercises.map((ex, ei) => h('div', { key: ei, className: 'flex items-center gap-3 py-2 px-3 rounded-xl bg-cream/50' },
                h('span', { className: 'w-6 h-6 rounded-full bg-light-pink flex items-center justify-center text-[10px] font-bold text-brown shrink-0' }, ei + 1),
                h('span', { className: 'text-sm text-text' }, ex)
              )))
            )
          )
        );
      }))
    )
  );
}


// ═══════════════════════════════════════════
//  NUTRITION PAGE (新增饮水计算器 + 食物计算器)
// ═══════════════════════════════════════════
function NutritionPage({ lang }) {
  const [activeTab, setActiveTab] = useState('macros');
  const g = NUTRITION_GUIDE;

  return h('div', { className: 'max-w-5xl mx-auto px-4 py-8 sm:py-12' },
    h('div', { className: 'text-center mb-12 anim-fade-in-up' },
      h('h1', { className: 'font-display text-4xl sm:text-5xl text-brown mb-3' }, T(lang, 'nutritionTitle')),
      h('p', { className: 'text-text-light max-w-2xl mx-auto' }, 'Macros, micronutrients, supplements, hydration, and a food database — all tailored for female physiology.')
    ),
    h('div', { className: 'flex justify-center mb-10' },
      h('div', { className: 'inline-flex bg-light-pink/40 rounded-full p-1 gap-1 flex-wrap' },
        [{ k: 'macros', l: T(lang, 'nutritionTabMacros') }, { k: 'micros', l: T(lang, 'nutritionTabMicros') }, { k: 'supplements', l: T(lang, 'nutritionTabSupplements') }, { k: 'hydration', l: T(lang, 'nutritionTabHydration') }, { k: 'foods', l: T(lang, 'nutritionTabFoods') }].map(t =>
          h('button', { key: t.k, onClick: () => setActiveTab(t.k), className: cls('px-4 py-2.5 rounded-full text-sm font-medium transition-colors btn-tap', activeTab === t.k ? 'bg-white text-brown shadow-sm' : 'text-text-light') }, t.l)
        )
      )
    ),

    // === MACROS TAB ===
    activeTab === 'macros' ? h('div', { className: 'anim-fade-in' },
      h('div', { className: 'grid lg:grid-cols-3 gap-6 mb-10' },
        [{ key: 'protein', data: g.protein, icon: 'Beef' }, { key: 'carbs', data: g.carbs, icon: 'Wheat' }, { key: 'fats', data: g.fats, icon: 'Droplet' }].map((m, i) =>
          h('div', { key: m.key, className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-light-pink/40 hover-lift anim-fade-in-up', style: { animationDelay: `${i * 0.1}s` } },
            h('div', { className: 'w-12 h-12 rounded-2xl flex items-center justify-center mb-4', style: { backgroundColor: m.data.color + '20' } }, h(Icon, { name: m.icon, size: 24, className: 'text-brown' })),
            h('h3', { className: 'font-display text-2xl text-brown mb-3' }, m.data.title),
            h('p', { className: 'text-sm text-text-light mb-5 leading-relaxed' }, m.data.description),
            h('h4', { className: 'text-xs font-semibold text-brown uppercase tracking-wider mb-2' }, T(lang, 'nutritionBestSources')),
            h('ul', { className: 'space-y-1.5 mb-5' }, m.data.sources.map((s, si) => h('li', { key: si, className: 'text-sm text-text flex items-center gap-2' }, h('span', { className: 'w-1.5 h-1.5 rounded-full shrink-0', style: { backgroundColor: m.data.color } }), s))),
            h('div', { className: 'bg-cream/50 rounded-2xl p-4 mb-4' }, h('h4', { className: 'text-xs font-semibold text-brown uppercase tracking-wider mb-2' }, T(lang, 'nutritionKeyTips')), h('ul', { className: 'space-y-1.5' }, m.data.tips.map((t, ti) => h('li', { key: ti, className: 'text-xs text-text-light flex items-start gap-2' }, h(Icon, { name: 'Check', size: 12, className: 'text-pink shrink-0 mt-0.5' }), t)))),
            m.data.stacySims ? h('div', { className: 'p-3 bg-pink/8 rounded-xl border-l-3 border-pink/30' }, h('p', { className: 'text-[11px] text-text-light leading-relaxed italic' }, h('span', { className: 'font-semibold text-pink not-italic' }, 'Stacy Sims: '), m.data.stacySims)) : null
          )
        )
      ),
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
        h('h3', { className: 'font-display text-2xl text-brown mb-6 text-center' }, T(lang, 'nutritionProteinByGoal')),
        h('div', { className: 'grid sm:grid-cols-3 gap-6' },
          [{ label: 'Cutting', val: '2.0-2.2g/kg', color: '#98D8C8', desc: 'Preserves lean mass during deficit' }, { label: 'Maingaining', val: '1.6-2.0g/kg', color: '#F7DC6F', desc: 'Moderate for recomposition' }, { label: 'Bulking', val: '1.8-2.0g/kg', color: '#FF8FAB', desc: 'Supports MPS in surplus' }].map((p, i) =>
            h('div', { key: i, className: 'text-center p-6 rounded-2xl anim-fade-in-up', style: { backgroundColor: p.color + '18', animationDelay: `${i * 0.1}s` } }, h('p', { className: 'font-display text-3xl mb-1', style: { color: p.color } }, p.val), h('p', { className: 'font-semibold text-brown mb-1' }, p.label), h('p', { className: 'text-xs text-text-light' }, p.desc))
          )
        )
      )
    ) : null,

    // === MICROS TAB ===
    activeTab === 'micros' ? h('div', { className: 'anim-fade-in' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-6' },
        h('div', { className: 'flex items-center gap-3 mb-4' }, h(Icon, { name: 'Flask', size: 24, className: 'text-pink' }), h('h3', { className: 'font-display text-2xl text-brown' }, g.micronutrients.title)),
        h('p', { className: 'text-text-light' }, g.micronutrients.description)
      ),
      h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' }, g.micronutrients.items.map((item, i) => h('div', { key: i, className: 'bg-white/60 rounded-2xl p-5 border border-light-pink/30 hover-lift anim-fade-in-up', style: { animationDelay: `${i * 0.05}s` } },
        h('div', { className: 'flex items-center justify-between mb-2' }, h('h4', { className: 'font-semibold text-brown' }, item.name), h('span', { className: 'text-xs font-medium text-pink bg-pink/10 px-2 py-0.5 rounded-full' }, item.amount)),
        h('p', { className: 'text-xs text-text-light mb-2' }, h('span', { className: 'font-medium text-text' }, 'Sources: '), item.source), h('p', { className: 'text-xs text-text-light italic' }, item.note)
      )))
    ) : null,

    // === SUPPLEMENTS TAB ===
    activeTab === 'supplements' ? h('div', { className: 'anim-fade-in' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-6' },
        h('div', { className: 'flex items-center gap-3 mb-2' }, h(Icon, { name: 'Award', size: 24, className: 'text-pink' }), h('h3', { className: 'font-display text-2xl text-brown' }, g.supplements.title)),
        h('p', { className: 'text-sm text-text-light' }, 'These supplements have strong scientific evidence. Always prioritize whole foods first.')
      ),
      h('div', { className: 'space-y-4' }, g.supplements.items.map((item, i) => h('div', { key: i, className: 'bg-white/60 rounded-2xl p-5 border border-light-pink/30 hover-lift anim-fade-in-up flex gap-4 items-start', style: { animationDelay: `${i * 0.05}s` } },
        h('div', { className: 'w-10 h-10 rounded-xl bg-light-pink flex items-center justify-center shrink-0' }, h('span', { className: 'font-display text-lg text-brown' }, i + 1)),
        h('div', null, h('div', { className: 'flex items-center gap-3 mb-1 flex-wrap' }, h('h4', { className: 'font-semibold text-brown' }, item.name), h('span', { className: 'text-xs bg-pink/15 text-brown px-2 py-0.5 rounded-full' }, item.dose)), h('p', { className: 'text-sm text-text-light' }, item.note))
      )))
    ) : null,

    // === HYDRATION TAB (含计算器) ===
    activeTab === 'hydration' ? h(HydrationCalculator, { data: g.hydration, lang }) : null,

    // === FOOD DATABASE TAB ===
    activeTab === 'foods' ? h(FoodCalculator, { lang }) : null
  );
}

// ═══════════════════════════════════════════
//  HYDRATION CALCULATOR
// ═══════════════════════════════════════════
function HydrationCalculator({ data, lang }) {
  const [bodyWeight, setBodyWeight] = useState(60);
  const [exerciseMin, setExerciseMin] = useState(60);
  const [takingCreatine, setTakingCreatine] = useState(false);
  const [caffeineCups, setCaffeineCups] = useState(1);

  const baseWater = Math.round(bodyWeight * 35);
  const exerciseWater = exerciseMin * 8;
  const creatineWater = takingCreatine ? 500 : 0;
  const caffeineWater = caffeineCups * 150;
  const totalWater = baseWater + exerciseWater + creatineWater + caffeineWater;
  const totalLiters = (totalWater / 1000).toFixed(1);

  return h('div', { className: 'anim-fade-in max-w-2xl mx-auto' },
    h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-6' },
      h(Icon, { name: 'Droplets', size: 36, className: 'text-pink mx-auto mb-4' }),
      h('h3', { className: 'font-display text-2xl text-brown text-center mb-2' }, T(lang, 'hydrationTitle')),
      h('p', { className: 'text-text-light text-center text-sm mb-6' }, T(lang, 'hydrationSubtitle')),

      // Inputs
      h('div', { className: 'space-y-5 mb-8' },
        h('div', null, h('label', { className: 'block text-sm font-medium text-brown mb-2' }, `Body Weight: ${bodyWeight} kg`),
          h('input', { type: 'range', min: 35, max: 150, value: bodyWeight, onChange: e => setBodyWeight(+e.target.value), className: 'w-full accent-pink' })),
        h('div', null, h('label', { className: 'block text-sm font-medium text-brown mb-2' }, `Daily Exercise: ${exerciseMin} min`),
          h('input', { type: 'range', min: 0, max: 180, value: exerciseMin, onChange: e => setExerciseMin(+e.target.value), className: 'w-full accent-pink' })),
        h('div', null, h('label', { className: 'block text-sm font-medium text-brown mb-2' }, `Caffeine: ${caffeineCups} cups/day`),
          h('input', { type: 'range', min: 0, max: 6, value: caffeineCups, onChange: e => setCaffeineCups(+e.target.value), className: 'w-full accent-pink' })),
        h('div', { className: 'flex items-center justify-between p-4 rounded-2xl bg-cream/50' },
          h('span', { className: 'text-sm text-brown font-medium' }, T(lang, 'hydrationCreatine')),
          h('button', { onClick: () => setTakingCreatine(!takingCreatine), className: cls('w-12 h-7 rounded-full transition-colors relative shrink-0', takingCreatine ? 'bg-pink' : 'bg-light-pink') },
            h('span', { className: cls('absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform', takingCreatine ? 'translate-x-5' : 'translate-x-0.5') })
          )
        )
      ),

      // Result
      h('div', { className: 'bg-gradient-to-br from-pink to-glute text-white rounded-2xl p-6 mb-6' },
        h('p', { className: 'text-white/70 text-sm uppercase tracking-wider mb-2 text-center' }, T(lang, 'hydrationTarget')),
        h('p', { className: 'font-display text-5xl text-center' }, `${totalLiters}L`),
        h('p', { className: 'text-white/60 text-sm text-center' }, `${totalWater} ml / day`)
      ),

      // Breakdown
      h('div', { className: 'space-y-2 mb-6' },
        h('div', { className: 'flex justify-between text-sm' }, h('span', { className: 'text-text-light' }, `Base (${bodyWeight}kg × 35ml)`), h('span', { className: 'text-brown font-medium' }, `${baseWater}ml`)),
        h('div', { className: 'flex justify-between text-sm' }, h('span', { className: 'text-text-light' }, `Exercise (${exerciseMin}min × 8ml)`), h('span', { className: 'text-brown font-medium' }, `${exerciseWater}ml`)),
        h('div', { className: 'flex justify-between text-sm' }, h('span', { className: 'text-text-light' }, `Caffeine (${caffeineCups} cups)`), h('span', { className: 'text-brown font-medium' }, `+${caffeineWater}ml`)),
        takingCreatine ? h('div', { className: 'flex justify-between text-sm' }, h('span', { className: 'text-text-light' }, 'Creatine supplement'), h('span', { className: 'text-brown font-medium' }, '+500ml')) : null
      ),

      h('div', { className: 'p-4 bg-pink/10 rounded-2xl flex gap-3 items-start' },
        h(Icon, { name: 'Info', size: 18, className: 'text-pink shrink-0 mt-0.5' }),
        h('div', null, h('p', { className: 'text-sm text-brown font-medium mb-1' }, T(lang, 'hydrationStacyTip')),
          h('p', { className: 'text-xs text-text-light leading-relaxed' }, data.stacySimsNote))
      )
    ),

    // General tips
    h('div', { className: 'bg-white/60 rounded-3xl p-6 border border-light-pink/30' },
      h('h4', { className: 'font-semibold text-brown mb-3' }, T(lang, 'hydrationTips')),
      h('div', { className: 'space-y-2' }, data.tips.slice(4).map((t, i) => h('div', { key: i, className: 'flex items-start gap-2 text-sm text-text-light' }, h(Icon, { name: 'Check', size: 14, className: 'text-pink shrink-0 mt-0.5' }), t)))
    )
  );
}

// ═══════════════════════════════════════════
//  FOOD CALCULATOR
// ═══════════════════════════════════════════
function FoodCalculator({ lang }) {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const addFood = (food) => {
    setSelectedFoods([...selectedFoods, { ...food, qty: 1, instanceId: Date.now() + Math.random() }]);
  };

  const removeFood = (instanceId) => {
    setSelectedFoods(selectedFoods.filter(f => f.instanceId !== instanceId));
  };

  const updateQty = (instanceId, qty) => {
    if (qty <= 0) { removeFood(instanceId); return; }
    setSelectedFoods(selectedFoods.map(f => f.instanceId === instanceId ? { ...f, qty } : f));
  };

  const totals = useMemo(() => {
    return selectedFoods.reduce((acc, f) => {
      const ratio = (f.qty * f.serving) / f.serving; // qty is number of servings
      acc.kcal += f.kcal * f.qty;
      acc.protein += f.protein * f.qty;
      acc.carbs += f.carbs * f.qty;
      acc.fat += f.fat * f.qty;
      return acc;
    }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });
  }, [selectedFoods]);

  return h('div', { className: 'anim-fade-in' },
    // Selected foods summary
    selectedFoods.length > 0 ? h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-light-pink/40 mb-6 anim-fade-in-up' },
      h('h3', { className: 'font-display text-xl text-brown mb-4' }, 'Your Meal'),
      h('div', { className: 'space-y-3 mb-6' }, selectedFoods.map(f => h('div', { key: f.instanceId, className: 'flex items-center gap-3 bg-cream/50 rounded-xl p-3' },
        h('span', { className: 'text-xl' }, f.emoji),
        h('div', { className: 'flex-1 min-w-0' }, h('p', { className: 'text-sm font-medium text-brown truncate' }, f.name), h('p', { className: 'text-xs text-text-light' }, `${f.qty} × ${f.unit}`)),
        h('div', { className: 'flex items-center gap-1' },
          h('button', { onClick: () => updateQty(f.instanceId, f.qty - 0.5), className: 'w-7 h-7 rounded-full bg-light-pink flex items-center justify-center btn-tap' }, h(Icon, { name: 'Minus', size: 12 })),
          h('span', { className: 'text-sm font-medium text-brown w-12 text-center' }, f.qty % 1 === 0 ? f.qty : f.qty.toFixed(1)),
          h('button', { onClick: () => updateQty(f.instanceId, f.qty + 0.5), className: 'w-7 h-7 rounded-full bg-light-pink flex items-center justify-center btn-tap' }, h(Icon, { name: 'Plus', size: 12 }))
        ),
        h('button', { onClick: () => removeFood(f.instanceId), className: 'w-7 h-7 rounded-full bg-light-pink/50 flex items-center justify-center btn-tap' }, h(Icon, { name: 'X', size: 12 }))
      ))),
      // Totals
      h('div', { className: 'grid grid-cols-4 gap-3' },
        h('div', { className: 'bg-gradient-to-br from-brown to-[#6B4423] text-white rounded-2xl p-3 text-center' }, h('p', { className: 'font-display text-xl' }, Math.round(totals.kcal)), h('p', { className: 'text-[10px] text-white/60' }, 'kcal')),
        h('div', { className: 'bg-pink/10 rounded-2xl p-3 text-center' }, h('p', { className: 'font-display text-xl text-brown' }, `${totals.protein.toFixed(1)}g`), h('p', { className: 'text-[10px] text-text-light' }, T(lang, 'calcProtein'))),
        h('div', { className: 'bg-leg/10 rounded-2xl p-3 text-center' }, h('p', { className: 'font-display text-xl text-brown' }, `${totals.carbs.toFixed(1)}g`), h('p', { className: 'text-[10px] text-text-light' }, T(lang, 'calcCarbs'))),
        h('div', { className: 'bg-chest/20 rounded-2xl p-3 text-center' }, h('p', { className: 'font-display text-xl text-brown' }, `${totals.fat.toFixed(1)}g`), h('p', { className: 'text-[10px] text-text-light' }, T(lang, 'calcFats')))
      )
    ) : null,

    // Food grid
    h('h3', { className: 'font-display text-xl text-brown mb-4' }, T(lang, 'foodTitle')),
    h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3' },
      FOOD_DATABASE.map((food, i) => h('button', { key: food.id, onClick: () => addFood(food), className: 'text-left bg-white/60 rounded-2xl p-4 border border-light-pink/30 hover-lift anim-fade-in-up btn-tap', style: { animationDelay: `${i * 0.03}s` } },
        h('div', { className: 'flex items-center gap-3' },
          h('span', { className: 'text-2xl' }, food.emoji),
          h('div', { className: 'flex-1' },
            h('p', { className: 'font-medium text-brown text-sm' }, food.name),
            h('p', { className: 'text-xs text-text-light' }, `${food.kcal} kcal · ${food.protein}P/${food.carbs}C/${food.fat}F`)
          ),
          h(Icon, { name: 'Plus', size: 16, className: 'text-pink' })
        ),
        h('p', { className: 'text-[10px] text-text-light mt-1 ml-10' }, `Per ${food.unit}`)
      ))
    )
  );
}


// ═══════════════════════════════════════════
//  SCIENCE PAGE (新增Stacy Sims + 排便健康)
// ═══════════════════════════════════════════
function SciencePage({ lang }) {
  const [activeTab, setActiveTab] = useState('stacy');
  const d = SCIENCE_DATA;

  return h('div', { className: 'max-w-5xl mx-auto px-4 py-8 sm:py-12' },
    h('div', { className: 'text-center mb-12 anim-fade-in-up' },
      h('h1', { className: 'font-display text-4xl sm:text-5xl text-brown mb-3' }, T(lang, 'scienceTitle')),
      h('p', { className: 'text-text-light max-w-2xl mx-auto' }, T(lang, 'scienceSubtitle'))
    ),

    // Tab selector
    h('div', { className: 'flex justify-center mb-10' },
      h('div', { className: 'inline-flex bg-light-pink/40 rounded-full p-1 gap-1 flex-wrap' },
        [{ k: 'menstrual', l: T(lang, 'scienceTabMenstrual') }, { k: 'metabolism', l: T(lang, 'scienceTabMetabolism') }, { k: 'bodyfat', l: T(lang, 'scienceTabBodyFat') }, { k: 'gut', l: T(lang, 'scienceTabGut') }].map(t =>
          h('button', { key: t.k, onClick: () => setActiveTab(t.k), className: cls('px-4 py-2.5 rounded-full text-sm font-medium transition-colors btn-tap', activeTab === t.k ? 'bg-white text-brown shadow-sm' : 'text-text-light') }, t.l)
        )
      )
    ),



    // === MENSTRUAL CYCLE TAB ===
    activeTab === 'menstrual' ? h('div', { className: 'anim-fade-in' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-8' },
        h('div', { className: 'flex items-center gap-3 mb-6' }, h('div', { className: 'w-12 h-12 rounded-2xl bg-pink/15 flex items-center justify-center' }, h(Icon, { name: 'Moon', size: 24, className: 'text-brown' })), h('h2', { className: 'font-display text-2xl sm:text-3xl text-brown' }, d.menstrual.title)),
        h('div', { className: 'grid sm:grid-cols-2 gap-4' }, d.menstrual.phases.map((phase, i) => h('div', { key: i, className: 'p-5 rounded-2xl bg-cream/50 anim-fade-in-up', style: { animationDelay: `${i * 0.08}s` } },
          h('h4', { className: 'font-semibold text-brown mb-2' }, phase.name),
          h('p', { className: 'text-sm text-text-light leading-relaxed' }, phase.desc)
        ))),
        h('div', { className: 'mt-6 p-4 bg-pink/10 rounded-2xl flex gap-3 items-start' },
          h(Icon, { name: 'Info', size: 18, className: 'text-pink shrink-0 mt-0.5' }),
          h('p', { className: 'text-sm text-text-light' }, d.menstrual.note)
        )
      ),
      // Birth Control (Stacy Sims)
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 anim-fade-in-up' },
        h('h3', { className: 'font-display text-xl text-brown mb-3' }, T(lang, 'scienceBirthControl')),
        h('p', { className: 'text-sm text-text-light leading-relaxed mb-4' }, T(lang, 'scienceBirthControlDesc')),
        h('div', { className: 'p-3 bg-cream/50 rounded-xl' },
          h('p', { className: 'text-xs text-text-light' }, h('span', { className: 'font-semibold text-brown' }, 'Note: '), 'The field is evolving rapidly. We update content as new research emerges. Current best practice: train consistently, track YOUR individual symptoms, and adjust based on how you feel — not calendar dates.')
        )
      )
    ) : null,

    // === METABOLISM TAB ===
    activeTab === 'metabolism' ? h('div', { className: 'anim-fade-in' },
      // Women Are Not Small Men
      h('div', { className: 'bg-gradient-to-br from-pink to-glute text-white rounded-3xl p-6 sm:p-8 mb-8' },
        h('div', { className: 'text-center mb-4' },
          h('h2', { className: 'font-display text-2xl sm:text-3xl mb-3' }, T(lang, 'scienceWomenAreNotSmallMen')),
          h('p', { className: 'text-white/80 text-sm max-w-2xl mx-auto leading-relaxed' }, T(lang, 'scienceWomenAreNotSmallMenDesc'))
        ),
        h('div', { className: 'bg-white/15 rounded-2xl p-4 text-center' },
          h('p', { className: 'text-white/60 text-xs mb-1' }, T(lang, 'scienceRecommendedReading')),
          h('p', { className: 'font-display text-lg' }, 'ROAR & Next Level by Dr. Stacy Sims')
        )
      ),
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-8' },
        h('div', { className: 'flex items-center gap-3 mb-6' }, h('div', { className: 'w-12 h-12 rounded-2xl bg-chest/20 flex items-center justify-center' }, h(Icon, { name: 'Flame', size: 24, className: 'text-brown' })), h('h2', { className: 'font-display text-2xl sm:text-3xl text-brown' }, d.rmrFacts.title)),
        h('div', { className: 'grid sm:grid-cols-2 gap-3' }, d.rmrFacts.facts.map((fact, i) => h('div', { key: i, className: 'flex items-start gap-3 p-4 rounded-xl bg-cream/50 anim-fade-in-up', style: { animationDelay: `${i * 0.05}s` } },
          h(Icon, { name: 'Check', size: 16, className: 'text-pink shrink-0 mt-0.5' }), h('p', { className: 'text-sm text-text leading-relaxed' }, fact)
        )))
      ),
      // Women vs Men
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40 mb-8' },
        h('div', { className: 'flex items-center gap-3 mb-6' }, h('div', { className: 'w-12 h-12 rounded-2xl bg-leg/20 flex items-center justify-center' }, h(Icon, { name: 'Scale', size: 24, className: 'text-brown' })), h('h2', { className: 'font-display text-2xl sm:text-3xl text-brown' }, d.womenVsMen.title)),
        h('div', { className: 'grid sm:grid-cols-2 gap-3' }, d.womenVsMen.facts.map((fact, i) => h('div', { key: i, className: 'flex items-start gap-3 p-4 rounded-xl bg-cream/50 anim-fade-in-up', style: { animationDelay: `${i * 0.05}s` } },
          h('span', { className: 'w-6 h-6 rounded-full bg-pink/20 flex items-center justify-center text-[10px] font-bold text-brown shrink-0 mt-0.5' }, i + 1), h('p', { className: 'text-sm text-text leading-relaxed' }, fact)
        )))
      ),
      // Training Principles (Stacy Sims)
      h('div', { className: 'grid sm:grid-cols-2 gap-4' },
        h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-light-pink/40 anim-fade-in-up', style: { animationDelay: '0.1s' } },
          h('h3', { className: 'font-display text-xl text-brown mb-3' }, T(lang, 'scienceLiftHeavy')),
          h('p', { className: 'text-sm text-text-light leading-relaxed' }, T(lang, 'scienceLiftHeavyDesc'))
        ),
        h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-light-pink/40 anim-fade-in-up', style: { animationDelay: '0.15s' } },
          h('h3', { className: 'font-display text-xl text-brown mb-3' }, T(lang, 'scienceRecovery')),
          h('p', { className: 'text-sm text-text-light leading-relaxed' }, T(lang, 'scienceRecoveryDesc'))
        )
      )
    ) : null,

    // === BODY FAT TAB ===
    activeTab === 'bodyfat' ? h('div', { className: 'anim-fade-in' },
      h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
        h('div', { className: 'flex items-center gap-3 mb-6' }, h('div', { className: 'w-12 h-12 rounded-2xl bg-shoulder/20 flex items-center justify-center' }, h(Icon, { name: 'Target', size: 24, className: 'text-brown' })), h('h2', { className: 'font-display text-2xl sm:text-3xl text-brown' }, d.bodyFat.title)),
        h('div', { className: 'space-y-3 mb-6' }, d.bodyFat.ranges.map((r, i) => {
          const colors = ['#BB8FCE', '#87CEEB', '#98D8C8', '#D4A574', '#F1948A'];
          return h('div', { key: i, className: 'flex items-center gap-4 anim-fade-in-up', style: { animationDelay: `${i * 0.05}s` } },
            h('div', { className: 'w-32 sm:w-40 text-right shrink-0' }, h('span', { className: 'text-sm font-medium text-brown' }, r.category)),
            h('div', { className: 'flex-1 h-10 bg-cream/50 rounded-xl overflow-hidden relative' },
              h('div', { className: 'h-full flex items-center px-3 rounded-xl transition-all duration-700', style: { width: `${Math.min(100, (parseInt(r.range) / 35) * 100)}%`, backgroundColor: colors[i] + '30' } }, h('span', { className: 'text-sm font-semibold', style: { color: colors[i] } }, r.range))
            )
          );
        })),
        h('div', { className: 'p-4 bg-pink/10 rounded-2xl flex gap-3 items-start' }, h(Icon, { name: 'Info', size: 18, className: 'text-pink shrink-0 mt-0.5' }), h('p', { className: 'text-sm text-text-light' }, d.bodyFat.note))
      )
    ) : null,

    // === GUT HEALTH TAB (新增) ===
    activeTab === 'gut' ? h(GutHealthSection, { lang }) : null,

    // References (always visible at bottom)
    h('div', { className: 'mt-12 bg-white/50 rounded-3xl p-6 sm:p-8 border border-light-pink/30 anim-fade-in-up' },
      h('h3', { className: 'font-display text-xl text-brown mb-4 flex items-center gap-2' }, h(Icon, { name: 'BookOpen', size: 18 }), T(lang, 'scienceReferences')),
      h('ol', { className: 'space-y-2' }, d.references.map((ref, i) => h('li', { key: i, className: 'text-xs text-text-light pl-4 border-l-2 border-light-pink' }, ref)))
    )
  );
}

// ═══════════════════════════════════════════
//  GUT HEALTH SECTION
// ═══════════════════════════════════════════
function GutHealthSection({ lang }) {
  const data = BOWEL_HEALTH_DATA;
  const [selectedType, setSelectedType] = useState(4);

  return h('div', { className: 'anim-fade-in space-y-8' },
    // Bristol Scale
    h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
      h('div', { className: 'flex items-center gap-3 mb-6' }, h('div', { className: 'w-12 h-12 rounded-2xl bg-glute/20 flex items-center justify-center' }, h(Icon, { name: 'Smile', size: 24, className: 'text-brown' })), h('h2', { className: 'font-display text-2xl text-brown' }, data.title)),
      h('h4', { className: 'text-sm font-semibold text-brown uppercase tracking-wider mb-4' }, T(lang, 'gutBristolScale')),
      h('div', { className: 'grid grid-cols-7 gap-2 mb-6' },
        data.bristolScale.map((item) => {
          const isSelected = selectedType === item.type;
          const isNormal = item.status === 'Normal' || item.status === 'Ideal';
          return h('button', { key: item.type, onClick: () => setSelectedType(item.type), className: cls('p-3 rounded-xl text-center transition-all btn-tap', isSelected ? 'ring-2 ring-pink bg-pink/10' : 'bg-cream/50 hover:bg-cream') },
            h('span', { className: cls('text-lg font-bold block', isNormal ? 'text-pink' : 'text-text-light') }, item.type),
            h('span', { className: 'text-[9px] text-text-light leading-tight block mt-1' }, item.status)
          );
        })
      ),
      // Selected type detail
      (() => {
        const item = data.bristolScale.find(s => s.type === selectedType);
        return h('div', { className: 'p-4 rounded-2xl bg-cream/50 flex gap-3 items-start anim-fade-in' },
          h('span', { className: 'font-display text-3xl text-pink' }, item.type),
          h('div', null, h('p', { className: 'font-medium text-brown' }, item.desc), h('p', { className: 'text-sm text-text-light mt-1' }, item.status))
        );
      })(),
      h('p', { className: 'text-xs text-text-light mt-3' }, 'Click the numbers above to explore each type. Types 3-4 are considered ideal.')
    ),

    // What's ideal
    h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
      h('h3', { className: 'font-display text-xl text-brown mb-4' }, 'What\'s "Ideal"?'),
      h('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' },
        Object.entries(data.ideal).map(([key, val]) => {
          const labels = { frequency: 'Frequency', consistency: 'Consistency', color: 'Color', time: 'Timing', effort: 'Effort' };
          return h('div', { key, className: 'p-4 rounded-2xl bg-cream/50' },
            h('p', { className: 'text-xs text-text-light uppercase tracking-wider mb-1' }, labels[key] || key),
            h('p', { className: 'text-sm font-medium text-brown' }, val)
          );
        })
      )
    ),

    // Fiber Guide
    h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
      h('h3', { className: 'font-display text-xl text-brown mb-4' }, T(lang, 'gutFiberGuide')),
      h('div', { className: 'grid lg:grid-cols-2 gap-6' },
        h('div', null,
          h('p', { className: 'text-sm text-text-light mb-3' }, h('span', { className: 'font-medium text-brown' }, 'Target: '), data.fiberGuide.dailyTarget),
          h('div', { className: 'space-y-2 mb-4' }, data.fiberGuide.tips.map((t, i) => h('div', { key: i, className: 'flex items-start gap-2 text-sm text-text-light' }, h(Icon, { name: 'Check', size: 14, className: 'text-pink shrink-0 mt-0.5' }), t)))
        ),
        h('div', { className: 'space-y-4' },
          h('div', null, h('h4', { className: 'text-xs font-semibold text-brown uppercase tracking-wider mb-2' }, 'Prebiotic Foods'), h('div', { className: 'flex flex-wrap gap-2' }, data.fiberGuide.prebioticFoods.map((f, i) => h('span', { key: i, className: 'text-xs bg-pink/10 text-brown px-2 py-1 rounded-full' }, f)))),
          h('div', null, h('h4', { className: 'text-xs font-semibold text-brown uppercase tracking-wider mb-2' }, 'Probiotic Foods'), h('div', { className: 'flex flex-wrap gap-2' }, data.fiberGuide.probioticFoods.map((f, i) => h('span', { key: i, className: 'text-xs bg-glute/10 text-brown px-2 py-1 rounded-full' }, f))))
        )
      )
    ),

    // Common Issues
    h('div', { className: 'bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-light-pink/40' },
      h('h3', { className: 'font-display text-xl text-brown mb-4' }, T(lang, 'gutCommonIssues')),
      h('div', { className: 'space-y-4' }, data.commonIssues.map((issue, i) => h('div', { key: i, className: 'p-4 rounded-2xl bg-cream/50 anim-fade-in-up', style: { animationDelay: `${i * 0.05}s` } },
        h('h4', { className: 'font-semibold text-brown mb-2' }, issue.issue),
        h('p', { className: 'text-xs text-text-light mb-1' }, h('span', { className: 'font-medium text-text' }, T(lang, 'gutCauses') + ': '), issue.causes),
        h('p', { className: 'text-xs text-text-light' }, h('span', { className: 'font-medium text-text' }, T(lang, 'gutFixes') + ': '), issue.fixes)
      )))
    )
  );
}

// ═══════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════
function App() {
  const [page, setPage] = useState('home');
  const lang = 'en';
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  return h('div', { className: 'min-h-screen flex flex-col' },
    h(Navbar, { currentPage: page, setPage, lang }),
    h('div', { className: 'flex-1' },
      page === 'home' ? h(HomePage, { setPage, lang }) :
      page === 'calculator' ? h(CalculatorPage, { lang }) :
      page === 'training' ? h(TrainingPage, { lang }) :
      page === 'nutrition' ? h(NutritionPage, { lang }) :
      h(SciencePage, { lang })
    ),
    h(Footer, { lang })
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(h(App));
