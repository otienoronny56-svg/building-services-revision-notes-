
// -----------------------------------------------------------------------------
// PLUMBING & SANITATION REVISION APP
// Topic 1 Exhaustive Revision Data
// -----------------------------------------------------------------------------

// --- DOM ELEMENTS ---
const elements = {
  dayLinks: document.querySelectorAll('.sidebar-day-link'),
  dayTabs: document.querySelectorAll('.day-tab'),
  dayPanels: document.querySelectorAll('.day-panel'),
  
  // Progress
  progressBar: document.getElementById('sidebar-progress-bar'),
  progressPercentage: document.querySelector('.progress-percentage'),
  badgeTitle: document.getElementById('overall-badge-title'),
  daysCompletedCount: document.getElementById('days-completed-count'),
  avgQuizScore: document.getElementById('avg-quiz-score'),
  
  // Flashcards
  fcTitle: document.getElementById('flashcard-card-title-text'),
  fcFront: document.getElementById('flashcard-front-content'),
  fcBack: document.getElementById('flashcard-back-content'),
  fcPrevBtn: document.getElementById('flashcard-prev-btn'),
  fcNextBtn: document.getElementById('flashcard-next-btn'),
  fcShuffleBtn: document.getElementById('flashcard-shuffle-btn'),
  fcIndicator: document.getElementById('flashcard-position-indicator'),
  fcArena: document.getElementById('revision-flashcard-arena'),
  
  // Quiz
  quizTitle: document.getElementById('quiz-day-title'),
  quizContainer: document.getElementById('quiz-body-area'),
  
  // Checkboxes
  completionCheckboxes: document.querySelectorAll('input[id^="complete-day-checkbox"]')
};

// --- STATE ---
let currentDay = 1;
let fcIndex = 0;
let currentFlashcards = [];
let shuffledFlashcards = [];
let isFcFlipped = false;

// --- DATA: FLASHCARDS ---
const revisionData = {
  1: {
    flashcards: [
      { f: "What are the 3 major categories of Building Services?", b: "1. Mechanical Services (Heating/Cooling)\n2. Electrical Services (Power/Lighting)\n3. Plumbing (Water supply/Sanitation)" },
      { f: "Name the key Kenyan authorities regulating plumbing.", b: "KEBS, WASREB, Ministry of Water (MoWSI), Ministry of Public Works, NCA, KEWI, County Governments, EBK/BORAQS." },
      { f: "What is the difference between Plumbing and Drainage?", b: "Plumbing: Supplying clean potable water IN.\nDrainage: Removing waste water safely OUT." },
      { f: "List the 4 categories of water consumption.", b: "1. Domestic (drinking/cooking/bathing)\n2. Trade & Industry (factories/hotels)\n3. Agriculture (irrigation/livestock)\n4. Public use (firefighting/parks)" },
      { f: "What are the main components of a plumbing system?", b: "a) Water Source\nb) Storage Tanks\nc) Distribution Pipes\nd) Fittings & Valves\ne) Fixtures" }
    ],
    quiz: [
      { q: "Which Kenyan authority is primarily responsible for ensuring compliance with the Water Act 2016?", opts: ["KEBS", "WASREB", "NCA", "Ministry of Public Works"], a: 1 },
      { q: "Which of the following is considered a 'Mechanical Service'?", opts: ["Water storage tanks", "Fire alarm systems", "Heating, ventilation, and air conditioning", "Sewage disposal"], a: 2 },
      { q: "What is the primary function of the National Building Code 2024?", opts: ["To sell water meters", "To set technical requirements for building services", "To regulate agricultural water use", "To manufacture pipes"], a: 1 },
      { q: "Which of these is a common plumbing issue mentioned in Day 1?", opts: ["Exploding boilers", "Faulty water heater", "Electrical short circuits", "Foundation cracking"], a: 1 },
      { q: "Water used for firefighting and sewer flushing falls under which category?", opts: ["Domestic", "Agriculture", "Public Use", "Trade & Industry"], a: 2 }
    ]
  },
  2: {
    flashcards: [
      { f: "What are the 3 main sources of water?", b: "1. Rainfall\n2. Surface sources (Lakes, rivers)\n3. Underground sources (Wells, springs)" },
      { f: "What are the three major water purification processes?", b: "1. Sedimentation\n2. Filtration\n3. Chlorination (Treatment)" },
      { f: "How does a pressure filter work?", b: "Water is forced through filter media inside a sealed pressure vessel at a high filtration rate (5-15 m³/m²/hr)." },
      { f: "What is the filtration rate of a slow sand filter?", b: "Very slow: 0.1 – 0.3 m³/m²/hour. It relies on gravity and biological action." },
      { f: "How are filters cleaned?", b: "Pressure filters use 'backwashing' (reversing flow). Slow sand filters require removing the top layer of sand." }
    ],
    quiz: [
      { q: "What is Sedimentation?", opts: ["Adding chlorine to water", "Forcing water through sand under pressure", "Heavy particles settling at the bottom due to gravity", "Boiling water to kill germs"], a: 2 },
      { q: "Which filter operates at a rate of 5 – 15 m³/m²/hour?", opts: ["Slow sand filter", "Pressure filter", "Porcelain cylinder filter", "Charcoal filter"], a: 1 },
      { q: "What is an advantage of a slow sand filter?", opts: ["Requires very little space", "High filtration rate", "Effective biological removal of microorganisms", "Can be backwashed automatically in 5 minutes"], a: 2 },
      { q: "How is a pressure filter cleaned?", opts: ["By replacing all the sand", "By backwashing", "By scrubbing the tank", "By adding chlorine"], a: 1 },
      { q: "Artesian wells are classified as what type of water source?", opts: ["Surface source", "Rainfall", "Underground source", "Recycled source"], a: 2 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is Sterilization/Disinfection?", b: "The process of destroying harmful microorganisms in water (like bacteria and viruses)." },
      { f: "What is the typical chlorine dosage for drinking water?", b: "0.1 – 0.3 parts per million (ppm)." },
      { f: "What minerals cause water hardness?", b: "Calcium and Magnesium salts (e.g., Calcium carbonate, Calcium sulphate)." },
      { f: "What is the Base Exchange (Zeolite) Process?", b: "Softening hard water by passing it through sodium zeolite, which exchanges sodium ions for calcium/magnesium ions." },
      { f: "How is exhausted Zeolite regenerated?", b: "By adding brine (NaCl - salt) to replace the calcium ions with fresh sodium ions." }
    ],
    quiz: [
      { q: "What is a major advantage of chlorination?", opts: ["It softens the water", "It provides a residual disinfectant effect", "It adds calcium to water", "It raises the pH levels"], a: 1 },
      { q: "What is the chemical reaction when hard water passes through sodium zeolite?", opts: ["Sodium zeolite + calcium salts → calcium zeolite + sodium salts", "Chlorine + water → Hypochlorous acid", "Calcium carbonate + heat → Calcium oxide + CO2", "Magnesium + Oxygen → Magnesium oxide"], a: 0 },
      { q: "What substance is used to regenerate zeolite?", opts: ["Sulfuric acid", "Chlorine gas", "Sodium chloride (Salt)", "Calcium carbonate"], a: 2 },
      { q: "What is a common problem caused by hard water?", opts: ["Pipe corrosion due to low pH", "Formation of scale deposits in pipes and boilers", "Excessive foaming of soap", "Rapid evaporation"], a: 1 },
      { q: "Which of the following does the zeolite process NOT remove?", opts: ["Calcium", "Magnesium", "Bacteria", "Hardness"], a: 2 }
    ]
  },
  4: {
    flashcards: [
      { f: "What is the purpose of water storage in a building?", b: "To provide continuous supply, meet peak demand, maintain pressure, and ensure fire protection reserves." },
      { f: "Difference between Underground and Overhead tanks?", b: "Underground: Main reservoir, large volume. Overhead: Gravity distribution, provides pressure." },
      { f: "What is a Goose Neck (Swan Neck)?", b: "A curved pipe connecting the water main to the service pipe to provide flexibility and absorb soil movement." },
      { f: "Who maintains the Service (Communication) pipe vs Supply pipe?", b: "Service Pipe: Local authority (up to boundary). Supply Pipe: Property owner (inside boundary)." },
      { f: "What is a Distributing Pipe?", b: "A pipe conveying water to fixtures within the building from the internal storage or supply." }
    ],
    quiz: [
      { q: "Why are UPVC water mains often pigmented blue?", opts: ["To protect from UV rays", "For easy identification during excavations", "To prevent algae growth", "To make them look aesthetically pleasing"], a: 1 },
      { q: "What is the purpose of a Goose Neck connection?", opts: ["To measure water flow", "To increase water pressure", "To absorb movement due to soil settlement", "To filter out sand"], a: 2 },
      { q: "Where is the Stop Valve and Water Meter typically located?", opts: ["On the roof tank", "In the kitchen", "At or close to the property boundary", "Inside the municipal treatment plant"], a: 2 },
      { q: "Which pipe is maintained by the consumer and subject to water pressure from authority mains?", opts: ["Service Pipe", "Supply Pipe", "Distributing Pipe", "Water Main"], a: 1 },
      { q: "What provides water pressure in an overhead storage tank system?", opts: ["A hydro-pneumatic pump", "Gravity", "Municipal water main pressure", "Thermal expansion"], a: 1 }
    ]
  },
  5: {
    flashcards: [
      { f: "What is a Direct Cold-Water Supply System?", b: "Water from the rising main is tapped directly to all draw-off points. Drinking water is everywhere." },
      { f: "What is a major risk of a Direct Supply System?", b: "Back siphonage (reverse flow causing contamination) and high pressure noise/wear." },
      { f: "What is an Indirect Cold-Water Supply System?", b: "Main serves only the kitchen sink; all other fixtures are supplied from a cold-water storage cistern (min 230L)." },
      { f: "What is a Hydro-pneumatic Cold Water System?", b: "Uses pumps and a compressed air pressure tank to maintain constant water pressure without an overhead tank." },
      { f: "Why is an air gap important in an indirect system cistern?", b: "It acts as an effective barrier to prevent backflow/siphonage into the mains supply." }
    ],
    quiz: [
      { q: "In a Direct Cold-Water Supply system, what is the capacity limit of the cistern feeding the hot water cylinder?", opts: ["Not more than 115 litres", "Exactly 230 litres", "At least 1000 litres", "4500 litres"], a: 0 },
      { q: "Which system is preferred by water authorities as it imposes less demand on the main?", opts: ["Direct System", "Indirect System", "Hydro-pneumatic System", "Artesian System"], a: 1 },
      { q: "What is Back Siphonage?", opts: ["Water overflowing from the cistern", "Reverse flow of water into supply due to negative pressure", "Water leaking from underground pipes", "Pumping water up to the roof"], a: 1 },
      { q: "What eliminates the need for an overhead tank and supplies water at a higher pressure?", opts: ["Indirect System", "Hydro-pneumatic System", "Gravity System", "Slow sand filter"], a: 1 },
      { q: "What must be done to tanks if storage demand exceeds 4500 litres?", opts: ["They must be placed underground", "They must be made of steel", "They must be duplicated and interconnected", "They must use a direct system"], a: 2 }
    ]
  },
  6: {
    flashcards: [
      { f: "What are the common Energy Sources for Hot Water?", b: "Electric (Instant/Storage), Solar (Thermosiphon/Forced), Gas, and Heat Pumps." },
      { f: "Difference between Centralized and Decentralized Hot Water?", b: "Centralized: One plant room distributes to the whole building.\nDecentralized: Multiple point-of-use heaters." },
      { f: "What is a Thermosiphon Solar System?", b: "A solar system that operates via natural convection (hot water rises, cold sinks) without needing a pump." },
      { f: "What are typical safe hot water temperatures?", b: "Domestic bathing: 40–50°C. Storage tanks: 60°C. Hospitals: 60–70°C." },
      { f: "What are Recirculating Hot Water Systems?", b: "Pumps constantly circulate hot water in the pipes so hot water is instantly available at the tap, reducing water waste." }
    ],
    quiz: [
      { q: "Which type of solar water heating system relies on natural convection?", opts: ["Forced Circulation", "Thermosiphon", "Heat Pump", "Hybrid System"], a: 1 },
      { q: "What is a primary disadvantage of a centralized hot water system?", opts: ["Higher operational costs for small buildings", "Cannot use solar energy", "Heat loss in long pipe runs", "Requires a separate heater for every bathroom"], a: 2 },
      { q: "How does a heat pump water heater work?", opts: ["By burning natural gas", "By direct electric resistance", "By extracting heat from surrounding ambient air", "By using a vacuum tube collector"], a: 2 },
      { q: "What is a major challenge for hot water systems in Kenya?", opts: ["Lack of sunlight", "Mineral scaling in heating elements due to hard water", "Excessive freezing in pipes", "Overly soft water causing corrosion"], a: 1 },
      { q: "At what temperature is hot water generally stored in tanks to prevent bacterial growth?", opts: ["30°C", "40°C", "60°C", "100°C"], a: 2 }
    ]
  },
  7: {
    flashcards: [
      { f: "What are Galvanized Iron (GI) pipes mainly used for?", b: "Supply pipes on main water lines, especially in rocky ground or road crossings. Robust but prone to corrosion." },
      { f: "What is the difference between PVC and UPVC?", b: "UPVC (Unplasticized PVC) doesn't contain plasticizers, making it rigid, durable, and safe for potable water. PVC is used mainly for drainage." },
      { f: "What is a Stop Valve (Stopcock)?", b: "Used to completely stop/allow flow. Usually installed at boundaries or before fixtures." },
      { f: "What does a Check Valve / Non-Return Valve do?", b: "Allows water to flow in only one direction. Prevents backflow and contamination." },
      { f: "What is a Globe Valve?", b: "Used to regulate/throttle flow regularly. Forces water to change direction, creating a pressure drop." }
    ],
    quiz: [
      { q: "Which pipe material is designed for both Hot and Cold water supply and heating applications?", opts: ["PVC", "PPR", "Cast Iron", "Aluminium"], a: 1 },
      { q: "What type of valve is used to prevent the reverse flow of water?", opts: ["Gate Valve", "Check Valve / Non-Return Valve", "Float Valve", "Globe Valve"], a: 1 },
      { q: "Which pipe fitting is used to join two pipes of different diameters?", opts: ["Tee", "Reducer", "Union", "Nipple"], a: 1 },
      { q: "Why is UPVC preferred over PVC for potable water?", opts: ["It is softer and more flexible", "It can handle temperatures up to 200°C", "It does not contain plasticizers (like BPA)", "It is a metal alloy"], a: 2 },
      { q: "What type of valve operates automatically using a floating ball connected to a lever?", opts: ["Ball Valve", "Float Valve", "Butterfly Valve", "Pressure Relief Valve"], a: 1 }
    ]
  }
};

// --- INITIALIZATION ---
function initApp() {
  attachDayNavigation();
  attachCheckboxes();
  attachFlashcardControls();
  
  // Custom Engineering Sandbox Tabs
  document.getElementById('calc-tab-head').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.getElementById('calc-tab-flow').classList.remove('active');
    document.getElementById('calc-form-head').style.display = 'flex';
    document.getElementById('calc-form-flow').style.display = 'none';
  });
  
  document.getElementById('calc-tab-flow').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.getElementById('calc-tab-head').classList.remove('active');
    document.getElementById('calc-form-flow').style.display = 'flex';
    document.getElementById('calc-form-head').style.display = 'none';
  });
  
  // Realtime calc logic
  document.querySelectorAll('.calc-input').forEach(inp => {
    inp.addEventListener('input', updateCalculator);
  });
  
  loadDayContent(1);
  updateGlobalProgress();
}

// --- NAVIGATION ---
function attachDayNavigation() {
  const switchDay = (dayStr) => {
    const day = parseInt(dayStr);
    currentDay = day;
    loadDayContent(day);
  };
  elements.dayLinks.forEach(link => {
    link.addEventListener('click', () => switchDay(link.dataset.day));
  });
  elements.dayTabs.forEach(tab => {
    tab.addEventListener('click', () => switchDay(tab.dataset.day));
  });
}

function loadDayContent(day) {
  // UI Selection Update
  elements.dayLinks.forEach(l => l.classList.remove('active'));
  elements.dayTabs.forEach(t => t.classList.remove('active'));
  elements.dayPanels.forEach(p => p.classList.remove('active'));
  
  document.getElementById(`nav-day-${day}`).classList.add('active');
  document.getElementById(`tab-day-${day}`).classList.add('active');
  document.getElementById(`day-panel-${day}`).classList.add('active');
  
  document.getElementById('dashboard-main').scrollTop = 0;
  
  // Load Suite (Flashcards & Quiz)
  loadFlashcardsForDay(day);
  loadQuizForDay(day);
}

// --- CHECKBOX & PROGRESS ---
function attachCheckboxes() {
  elements.completionCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const dayPanel = cb.closest('.day-panel');
      const dayId = dayPanel.id.split('-')[2];
      
      if(cb.checked) {
        document.getElementById(`nav-day-${dayId}`).innerHTML += ' <i class="ri-check-line" style="color:var(--color-success)"></i>';
        document.getElementById(`tab-day-${dayId}`).classList.add('completed');
      } else {
        const icon = document.getElementById(`nav-day-${dayId}`).querySelector('.ri-check-line');
        if(icon) icon.remove();
        document.getElementById(`tab-day-${dayId}`).classList.remove('completed');
      }
      updateGlobalProgress();
    });
  });
}

function updateGlobalProgress() {
  let completed = 0;
  elements.completionCheckboxes.forEach(cb => {
    if(cb.checked) completed++;
  });
  
  const total = 7;
  const pct = Math.round((completed / total) * 100);
  
  elements.progressBar.style.width = pct + '%';
  elements.progressPercentage.textContent = pct + '%';
  elements.daysCompletedCount.textContent = completed;
  
  if (pct === 100) {
    elements.badgeTitle.textContent = "Master Plumber (Certified)";
    elements.badgeTitle.style.color = "var(--color-accent)";
  } else if (pct > 50) {
    elements.badgeTitle.textContent = "Senior Apprentice";
  } else {
    elements.badgeTitle.textContent = "Junior Apprentice";
  }
}

// --- FLASHCARDS ---
function attachFlashcardControls() {
  elements.fcArena.addEventListener('click', () => {
    isFcFlipped = !isFcFlipped;
    if (isFcFlipped) {
      elements.fcArena.classList.add('flipped');
      elements.fcTitle.textContent = "Concept Definition";
    } else {
      elements.fcArena.classList.remove('flipped');
      elements.fcTitle.textContent = "Tap to Reveal";
    }
  });

  elements.fcPrevBtn.addEventListener('click', () => {
    if (fcIndex > 0) {
      fcIndex--;
      renderCurrentFlashcard();
    }
  });
  
  elements.fcNextBtn.addEventListener('click', () => {
    if (fcIndex < currentFlashcards.length - 1) {
      fcIndex++;
      renderCurrentFlashcard();
    }
  });

  elements.fcShuffleBtn.addEventListener('click', () => {
    shuffledFlashcards = [...currentFlashcards].sort(() => Math.random() - 0.5);
    currentFlashcards = shuffledFlashcards;
    fcIndex = 0;
    renderCurrentFlashcard();
  });
}

function loadFlashcardsForDay(day) {
  const data = revisionData[day];
  if(data && data.flashcards) {
    currentFlashcards = [...data.flashcards];
    fcIndex = 0;
    renderCurrentFlashcard();
  }
}

function renderCurrentFlashcard() {
  if(currentFlashcards.length === 0) return;
  const fc = currentFlashcards[fcIndex];
  
  isFcFlipped = false;
  elements.fcArena.classList.remove('flipped');
  elements.fcTitle.textContent = "Tap to Reveal";
  
  elements.fcFront.innerHTML = fc.f;
  elements.fcBack.innerHTML = fc.b;
  
  elements.fcIndicator.textContent = `${fcIndex + 1} / ${currentFlashcards.length}`;
  
  elements.fcPrevBtn.disabled = (fcIndex === 0);
  elements.fcNextBtn.disabled = (fcIndex === currentFlashcards.length - 1);
}

// --- QUIZ ---
let quizAnswers = {};

function loadQuizForDay(day) {
  elements.quizTitle.innerHTML = `<i class="ri-questionnaire-line"></i> Day ${day} Revision Quiz`;
  const data = revisionData[day];
  const container = elements.quizContainer;
  container.innerHTML = '';
  
  if(!data || !data.quiz) {
    container.innerHTML = "<p>No quiz available for this day.</p>";
    return;
  }
  
  quizAnswers[day] = {};
  
  data.quiz.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    
    let html = `<h4>Q${idx + 1}: ${q.q}</h4><div class="quiz-options">`;
    q.opts.forEach((opt, optIdx) => {
      html += `
        <label class="quiz-option-label" id="opt-lbl-${day}-${idx}-${optIdx}">
          <input type="radio" name="quiz-${day}-q${idx}" value="${optIdx}">
          ${opt}
        </label>
      `;
    });
    html += `</div>
             <div class="quiz-feedback" id="quiz-fb-${day}-${idx}" style="display:none; font-size: 0.8rem; margin-top: 0.5rem; padding: 0.5rem; border-radius: 4px;"></div>`;
    
    qDiv.innerHTML = html;
    container.appendChild(qDiv);
    
    // Attach listeners
    const radios = qDiv.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        handleQuizAnswer(day, idx, parseInt(e.target.value), q.a);
      });
    });
  });
}

function handleQuizAnswer(day, qIdx, selectedIdx, correctIdx) {
  quizAnswers[day][qIdx] = (selectedIdx === correctIdx);
  
  const fb = document.getElementById(`quiz-fb-${day}-${qIdx}`);
  const labels = document.querySelectorAll(`input[name="quiz-${day}-q${qIdx}"]`);
  
  // Reset labels
  labels.forEach((r, i) => {
    const lbl = document.getElementById(`opt-lbl-${day}-${qIdx}-${i}`);
    lbl.style.background = 'rgba(255, 255, 255, 0.05)';
    lbl.style.borderColor = 'rgba(0,0,0,0.1)';
  });
  
  const selLabel = document.getElementById(`opt-lbl-${day}-${qIdx}-${selectedIdx}`);
  
  if (selectedIdx === correctIdx) {
    fb.style.display = 'block';
    fb.style.background = 'rgba(16, 185, 129, 0.1)';
    fb.style.color = 'var(--color-success)';
    fb.innerHTML = '<i class="ri-checkbox-circle-line"></i> Correct!';
    selLabel.style.borderColor = 'var(--color-success)';
    selLabel.style.background = 'rgba(16, 185, 129, 0.05)';
  } else {
    fb.style.display = 'block';
    fb.style.background = 'rgba(239, 68, 68, 0.1)';
    fb.style.color = 'var(--color-danger)';
    fb.innerHTML = '<i class="ri-close-circle-line"></i> Incorrect. Try again.';
    selLabel.style.borderColor = 'var(--color-danger)';
    selLabel.style.background = 'rgba(239, 68, 68, 0.05)';
  }
  
  recalcAvgQuizScore();
}

function recalcAvgQuizScore() {
  let totalQs = 0;
  let totalCorrect = 0;
  
  for(let d in quizAnswers) {
    for(let q in quizAnswers[d]) {
      totalQs++;
      if(quizAnswers[d][q]) totalCorrect++;
    }
  }
  
  if(totalQs === 0) return;
  const pct = Math.round((totalCorrect / totalQs) * 100);
  elements.avgQuizScore.textContent = pct + '%';
  
  if(pct >= 80) {
    elements.avgQuizScore.style.color = 'var(--color-success)';
  } else if (pct >= 50) {
    elements.avgQuizScore.style.color = 'var(--color-warning)';
  } else {
    elements.avgQuizScore.style.color = 'var(--text-main)';
  }
}

// --- SANDBOX CALC ---
function updateCalculator() {
  const isHead = document.getElementById('calc-tab-head').classList.contains('active');
  const resVal = document.getElementById('calc-result-val');
  const resSub = document.getElementById('calc-result-sub');
  
  if(isHead) {
    const h = parseFloat(document.getElementById('calc-input-height').value) || 0;
    const rho = parseFloat(document.getElementById('calc-input-density').value) || 1000;
    const g = 9.81;
    
    const p_pa = rho * g * h;
    const p_kpa = p_pa / 1000;
    const p_bar = p_pa / 100000;
    
    resVal.textContent = p_kpa.toFixed(2) + " kPa";
    resSub.innerHTML = `Equivalent to <strong>${p_bar.toFixed(2)} bar</strong>.<br>P = &rho; &middot; g &middot; h formula used.`;
  } else {
    const q = parseFloat(document.getElementById('calc-input-q').value) || 0;
    const v = parseFloat(document.getElementById('calc-input-velocity').value) || 1;
    
    // Q (m3/s) = A * v => A = Q/v
    // Q (L/s) = Q/1000 m3/s
    const q_m3 = q / 1000;
    const a = q_m3 / v;
    
    // A = pi * r^2 = pi * d^2 / 4 => d = sqrt(4A/pi)
    const d = Math.sqrt((4 * a) / Math.PI);
    const d_mm = d * 1000;
    
    resVal.textContent = d_mm.toFixed(1) + " mm (Internal Dia.)";
    resSub.innerHTML = `Pipe Size for velocity ${v.toFixed(1)} m/s.<br>Continuity Eq: Q = A &middot; v`;
  }
}

// Startup
document.addEventListener('DOMContentLoaded', initApp);
