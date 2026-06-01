
// -----------------------------------------------------------------------------
// DRAINAGE TOPIC 3 REVISION APP
// Exhaustive 6-Day Data
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
      { f: "What is Invert Level?", b: "The depth to the bottom of a drain pipe measured from the datum." },
      { f: "What is the difference between a Gully and a Manhole?", b: "A gully takes waste from baths/basins (not WCs). A manhole is a large access point for inspection and cleaning." },
      { f: "What are the three main categories of wastewater?", b: "1. Black Water (Soil Water)\n2. Grey Water\n3. Storm Water (Rainwater)" },
      { f: "List three non-potable uses for harvested Storm Water.", b: "Landscape irrigation, Toilet flushing, and Concrete curing/washing." },
      { f: "Does Grey Water contain human waste?", b: "No, but it still contains soap, grease, and dirt, making it unsafe for drinking without treatment." }
    ],
    quiz: [
      { q: "Which type of wastewater contains human waste and high levels of pathogens?", opts: ["Storm Water", "Grey Water", "Black Water", "Surface Water"], a: 2 },
      { q: "What is the definition of 'Invert Level'?", opts: ["The highest point of a drain pipe", "The depth to the bottom of a drain pipe measured from the datum", "The water level inside a trap", "The slope of the roof"], a: 1 },
      { q: "Which of the following is NOT a suitable use for untreated storm water?", opts: ["Landscape irrigation", "Drinking water", "Toilet flushing", "Cooling towers"], a: 1 },
      { q: "What fitting on the drain takes waste pipes from baths and basins but NOT from water closets?", opts: ["Manhole", "Gully", "Soil Vent Pipe", "Trap"], a: 1 },
      { q: "Why is storm water beneficial for landscape irrigation?", opts: ["It contains high levels of fertilizer", "It is usually soft water with low mineral content", "It naturally repels insects", "It acts as a herbicide"], a: 1 }
    ]
  },
  2: {
    flashcards: [
      { f: "What is the primary rule for the gradient of a soil drain?", b: "Lay drains on even gradients to make sure the water carries solid matter smoothly without blocking." },
      { f: "What is the 'Combined System' of drainage?", b: "A single pipe network that carries both foul water (sewage) and surface water (stormwater). It's cheaper but overburdens treatment plants." },
      { f: "What is the 'Separate System' of drainage?", b: "Uses separate drains for foul water and surface water. Mandated by modern codes to prevent storm water from entering sewers." },
      { f: "What causes 'Combined Sewer Overflows' (CSO)?", b: "Heavy rains overwhelming a combined system, causing untreated sewage to flood streets or rivers." },
      { f: "What is the common residential grade for Surface Drainage?", b: "A 2% slope (a 2-unit drop for every 100 units of distance)." }
    ],
    quiz: [
      { q: "If a drain must change direction below ground, what should be inserted?", opts: ["A P-Trap", "An Inspection Chamber", "A French Drain", "An Eccentric Reducer"], a: 1 },
      { q: "What is a major challenge of the Combined System in Kenya?", opts: ["It is too expensive to install", "It requires two separate pipe networks", "It causes Combined Sewer Overflows during heavy rains", "It cannot handle human waste"], a: 2 },
      { q: "Under the National Building Code, can stormwater enter a new sewer installation?", opts: ["Yes, if it is filtered", "Yes, to help flush the sewer", "No, it is strictly mandated that it must not", "Only during dry seasons"], a: 2 },
      { q: "What is the minimum diameter for soil drains below ground?", opts: ["50mm", "100mm", "150mm", "200mm"], a: 1 },
      { q: "What is the purpose of laying drains on even gradients?", opts: ["To save pipe material", "To make water flow as fast as possible", "To ensure water carries solid matter smoothly without blockages", "To prevent pipes from freezing"], a: 2 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is the difference between Surface and Sub-surface drainage?", b: "Surface deals with water before it enters the soil. Sub-surface deals with water after it has soaked in, lowering the water table." },
      { f: "How does a French Drain work?", b: "It's a trench filled with gravel and a perforated pipe. Often wrapped in geotextile fabric to filter soil." },
      { f: "What is a Mole Drain?", b: "A 'pipeless' horizontal tunnel created in heavy clay soil by a tractor pulling a bullet. Lasts 2-5 years." },
      { f: "What is an Interceptor Drain?", b: "A drain installed uphill from a structure on a slope to 'cut off' moving groundwater before it hits the foundation." },
      { f: "What is 'Drawdown'?", b: "The localized lowering of the water table caused by pumping water out of an aquifer." }
    ],
    quiz: [
      { q: "Which subsoil drainage system is literally 'pipeless' and made by compacting clay?", opts: ["French Drain", "Soak Pit", "Mole Drain", "Interceptor Drain"], a: 2 },
      { q: "What is the purpose of the geotextile fabric in a French Drain?", opts: ["To retain water inside the pipe", "To heat the water", "To prevent fine soil particles from clogging the pipe", "To poison tree roots"], a: 2 },
      { q: "If a house is built on a slope, where should an Interceptor Drain be placed?", opts: ["Downhill from the house", "Uphill from the house", "Underneath the living room", "On the roof"], a: 1 },
      { q: "Sub-surface drainage is primarily designed to do what?", opts: ["Remove water from the roof", "Lower the natural water table", "Process black water", "Increase soil erosion"], a: 1 },
      { q: "How long do Mole Drains typically last before they collapse or silt up?", opts: ["6 months", "2 to 5 years", "20 years", "50 years"], a: 1 }
    ]
  },
  4: {
    flashcards: [
      { f: "When is a Manhole used instead of an Inspection Chamber?", b: "When the depth to invert exceeds 1m, making it large enough for a person to enter. Inspection chambers are shallow (<1m)." },
      { f: "What must be provided in a Manhole deeper than 1m?", b: "Step irons installed at 300mm vertical and horizontal spacing." },
      { f: "What is a Backdrop Manhole?", b: "Used when there's a huge vertical drop between a drain and a sewer to reduce excavation costs. The water drops vertically inside or outside the manhole." },
      { f: "Name three places where physical drain access is required.", b: "1. Change of direction\n2. Change of gradient\n3. At junctions or long straight runs." },
      { f: "What is a Shallow Access Chamber?", b: "A small compartment up to 600mm deep used for rodding, providing access in both directions." }
    ],
    quiz: [
      { q: "Which access point is large enough for a person to physically enter?", opts: ["Shallow Access Chamber", "Gully Trap", "Manhole", "Inspection Chamber"], a: 2 },
      { q: "If a manhole is deeper than 1 meter, what MUST be installed?", opts: ["A grease trap", "Step irons at 300mm intervals", "An extractor fan", "A glass window"], a: 1 },
      { q: "What is used to handle a very large vertical drop between a new drain and a deep public sewer?", opts: ["A Backdrop Manhole", "A French Drain", "A P-Trap", "A Siphon"], a: 0 },
      { q: "Which of the following is NOT a valid reason to insert an inspection access point?", opts: ["At a significant change in direction", "At a significant change in gradient", "Every 2 meters on a perfectly straight pipe", "At junctions"], a: 2 },
      { q: "What is the maximum depth typically associated with an Inspection Chamber (where entry is not required)?", opts: ["1 meter", "3 meters", "5 meters", "10 meters"], a: 0 }
    ]
  },
  5: {
    flashcards: [
      { f: "What is the parameter for a Drainage Water Test?", b: "System is filled with a 1.5m head of water and must stand for 2 hours to check for leaks." },
      { f: "What is the parameter for an Air Pressure Test?", b: "Hand-pumped to 38mm water gauge using a U-tube manometer. Must remain constant for 3 minutes." },
      { f: "How do you locate leaks during an Air Test?", b: "Wipe a soap solution onto the joints and look for bubbles." },
      { f: "What is a Smoke Test?", b: "Injecting smoke into existing stacks to find leaks. It's less severe than the air test." },
      { f: "What is a Flow Test?", b: "Simulating typical usage conditions with controlled water flow to ensure there are no restrictions or backups." }
    ],
    quiz: [
      { q: "In the Water Test for drainage, what is the required head of water?", opts: ["0.5 meters", "1.5 meters", "3 meters", "10 meters"], a: 1 },
      { q: "In the Air Pressure Test, how long must the pressure remain constant?", opts: ["30 seconds", "3 minutes", "1 hour", "24 hours"], a: 1 },
      { q: "What is the target pressure for the Air Pressure Test?", opts: ["10mm water gauge", "38mm water gauge", "100mm water gauge", "1 bar"], a: 1 },
      { q: "Which test is specifically used for EXISTING stacks because it is less severe?", opts: ["Water Test", "Smoke Test", "Chemical Test", "Hydraulic Test"], a: 1 },
      { q: "How are leaks visually identified during an Air Pressure Test?", opts: ["By listening with a stethoscope", "By wiping soap solution on joints to see bubbles", "By using a thermal camera", "By filling the pipe with colored dye"], a: 1 }
    ]
  },
  6: {
    flashcards: [
      { f: "What is the main requirement for a Soak-Away pit to work?", b: "The soil must be permeable (like sandy loam, not heavy clay). A percolation test is required." },
      { f: "What is a Cesspool?", b: "A completely sealed holding tank that performs NO treatment. Extremely expensive to maintain because it must be emptied frequently." },
      { f: "How does a Septic Tank work?", b: "Watertight chamber where solids settle and break down. Liquid effluent overflows into a soak-away." },
      { f: "How does a Biodigester differ from a Septic Tank?", b: "It actively uses anaerobic bacteria to digest sewage into clean treated water, biogas, and bio-slurry. It rarely needs exhausting." },
      { f: "What kills the bacteria in a Biodigester?", b: "Harsh chemicals (bleach, acid). Non-biodegradables (plastics) cause blockages." }
    ],
    quiz: [
      { q: "Which waste management system performs ABSOLUTELY NO treatment of the waste?", opts: ["Septic Tank", "Cesspool", "Biodigester", "Soak-away"], a: 1 },
      { q: "Why are modern geocellular crates better than stones for a Soak-Away pit?", opts: ["They are cheaper", "They provide 95% void space, holding much more water", "They chemically treat the water", "They kill bacteria"], a: 1 },
      { q: "Which system produces Biogas that can be used for cooking?", opts: ["Cesspool", "Biodigester", "Soak-away", "French Drain"], a: 1 },
      { q: "What is a major maintenance rule for keeping a Biodigester healthy?", opts: ["Add bleach every week", "Empty it completely every month", "Avoid harsh chemicals and non-biodegradable plastics", "Ensure rainwater flows into it"], a: 2 },
      { q: "What test must be performed to ensure a Soak-Away will function properly?", opts: ["Air Pressure Test", "Smoke Test", "Percolation Test", "Slump Test"], a: 2 }
    ]
  }
};

// --- INITIALIZATION ---
function initApp() {
  attachDayNavigation();
  attachCheckboxes();
  attachFlashcardControls();
  
  // Custom Engineering Sandbox Tabs
  document.getElementById('calc-tab-fall').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.getElementById('calc-tab-gradient').classList.remove('active');
    document.getElementById('calc-form-head').style.display = 'flex';
    document.getElementById('calc-form-flow').style.display = 'none';
  });
  
  document.getElementById('calc-tab-gradient').addEventListener('click', (e) => {
    e.target.classList.add('active');
    document.getElementById('calc-tab-fall').classList.remove('active');
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
  elements.dayLinks.forEach(l => l.classList.remove('active'));
  elements.dayTabs.forEach(t => t.classList.remove('active'));
  elements.dayPanels.forEach(p => p.classList.remove('active'));
  
  document.getElementById(`nav-day-${day}`).classList.add('active');
  document.getElementById(`tab-day-${day}`).classList.add('active');
  document.getElementById(`day-panel-${day}`).classList.add('active');
  
  document.getElementById('dashboard-main').scrollTop = 0;
  
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
  
  const total = 6;
  const pct = Math.round((completed / total) * 100);
  
  elements.progressBar.style.width = pct + '%';
  elements.progressPercentage.textContent = pct + '%';
  elements.daysCompletedCount.textContent = completed;
  
  if (pct === 100) {
    elements.badgeTitle.textContent = "Drainage Master";
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
  const isFall = document.getElementById('calc-tab-fall').classList.contains('active');
  const resVal = document.getElementById('calc-result-val');
  const resSub = document.getElementById('calc-result-sub');
  
  if(isFall) {
    const l = parseFloat(document.getElementById('calc-input-height').value) || 0;
    const g = parseFloat(document.getElementById('calc-input-density').value) || 40;
    
    // Fall = Length / Gradient
    const fall_m = l / g;
    const fall_mm = fall_m * 1000;
    
    resVal.textContent = fall_m.toFixed(3) + " m";
    resSub.innerHTML = `Equivalent to <strong>${fall_mm.toFixed(0)} mm</strong> fall.<br>Fall = Length / Gradient.`;
  } else {
    const l = parseFloat(document.getElementById('calc-input-q').value) || 0;
    const f = parseFloat(document.getElementById('calc-input-velocity').value) || 1;
    
    // Gradient = Length / Fall
    const g = l / f;
    
    resVal.textContent = "1 in " + g.toFixed(1);
    resSub.innerHTML = `Pipe requires a slope of 1 in ${g.toFixed(0)}.<br>Gradient = Length / Fall`;
  }
}

// Startup
document.addEventListener('DOMContentLoaded', initApp);
