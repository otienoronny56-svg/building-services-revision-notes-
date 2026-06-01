
// -----------------------------------------------------------------------------
// SANITARY TOPIC 2 REVISION APP
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
      { f: "What is Black Water vs Grey Water?", b: "Black water contains human waste (toilets, urinals). Grey water is from sinks, showers, baths (no human waste)." },
      { f: "What are Sanitary Appliances (Fixtures)?", b: "Immovable sanitary objects attached to plumbing for receiving/discharging water. E.g., WCs, washbasins, bathtubs." },
      { f: "What are Sanitary Fittings?", b: "Objects used to seal, clamp, and fasten fixtures to prevent leaks and bacteria. E.g., Adapters, elbows, unions." },
      { f: "What is the purpose of a Trap Water Seal?", b: "A small amount of water in a U-bend that acts as a hygienic, airtight barrier against sewer gases and pests." },
      { f: "What is a Grease Trap?", b: "A device in commercial kitchens that captures grease and solids before they enter the wastewater system." }
    ],
    quiz: [
      { q: "Water from a shower or washing machine is referred to as:", opts: ["Black water", "Grey water", "Sullage", "Both B and C"], a: 3 },
      { q: "Which of the following is considered a Sanitary Fitting?", opts: ["Washbasin", "Bidet", "Adapter", "Water Closet"], a: 2 },
      { q: "What blocks methane and hydrogen sulfide from entering a building?", opts: ["Water Seal", "Sewerage System", "Soil Pipe", "Effluent"], a: 0 },
      { q: "What can cause the failure of a water seal?", opts: ["Evaporation", "Siphoning", "Backpressure", "All of the above"], a: 3 },
      { q: "Which device captures grease in commercial kitchens?", opts: ["Grease Trap", "Gully Trap", "P-Trap", "Intercepting Trap"], a: 0 }
    ]
  },
  2: {
    flashcards: [
      { f: "What features should a Washbasin have?", b: "Slotted overflow, internal angles facilitating cleaning, circular waste hole, and an integral soap holder." },
      { f: "What is the function of a Bidet?", b: "A sanitary appliance used for personal hygiene (washing genital/anal areas) after using the toilet." },
      { f: "What are the two main types of Water Closets (W.C.)?", b: "1. Squatting type (Indian type)\n2. Wash-down, Pedestal or European type." },
      { f: "What is the wash cycle for public Urinals?", b: "Washed at intervals of 20 minutes by an automatic flushing cistern discharging 4.5 liters per 610mm stall width." },
      { f: "What is a Faucet?", b: "A valve that controls the flow of water to sinks, bathtubs, showers, and bidets." }
    ],
    quiz: [
      { q: "What should a washbasin have to prevent overflowing?", opts: ["A P-Trap", "A slotted overflow hole", "An automatic sensor", "A double bowl"], a: 1 },
      { q: "Which of the following is a type of Water Closet?", opts: ["Slab type", "Squatting type", "Double drain type", "P-Trap type"], a: 1 },
      { q: "At what interval are automatic public urinals typically washed?", opts: ["Every 5 minutes", "Every 20 minutes", "Once a day", "Every hour"], a: 1 },
      { q: "What is a bidet primarily used for?", opts: ["Washing clothes", "Disposing of black water", "Personal hygiene after toilet use", "Filtering grease"], a: 2 },
      { q: "What type of sink has a draining board on both sides?", opts: ["Single bowl sink", "Double bowl double drain sink", "Pedestal sink", "Barbed sink"], a: 1 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is an Adapter fitting used for?", b: "Connecting unlike pipes, or changing a pipe's end to male or female threading." },
      { f: "What is the difference between a Coupling and a Union?", b: "Both connect pipes, but a Coupling is permanent while a Union can be easily removed at any time." },
      { f: "What is a Wye (Y-fitting)?", b: "Used in drainage to keep flow smooth with a 45-degree branch. Used when sanitary tees fail in horizontal connections." },
      { f: "What is an Eccentric Reducer?", b: "A reducer with one straight edge facing the mouth, reducing the chances of air accumulation." },
      { f: "Name three types of Regulating Valves.", b: "Gate valves, globe valves, check valves (spring/swing), ball valves, and pressure reducing valves." }
    ],
    quiz: [
      { q: "Which fitting is used to easily disconnect and reconnect two pipes?", opts: ["Coupling", "Union", "Flange", "Cap"], a: 1 },
      { q: "Which fitting contains four openings and is used in fire sprinkler systems?", opts: ["Tee", "Wye", "Cross", "Elbow"], a: 2 },
      { q: "What type of reducer prevents air accumulation?", opts: ["Concentric Reducer", "Eccentric Reducer", "Barbed Reducer", "Sleeve Reducer"], a: 1 },
      { q: "Which fitting is best suited for low-pressure flexible hose applications?", opts: ["Barbed fitting", "Cam-lock fitting", "Flange", "Crimp fitting"], a: 0 },
      { q: "What is an elbow fitting primarily used for?", opts: ["To connect pipes of different diameters", "To change the direction of flow", "To stop leakage", "To seal the end of a pipe"], a: 1 }
    ]
  },
  4: {
    flashcards: [
      { f: "What is a P-Trap vs S-Trap?", b: "P-Trap: Goes through the wall. Most common.\nS-Trap: Goes through the floor. More prone to self-siphonage." },
      { f: "What is a Gully Trap?", b: "External trap carrying wastewater to sewers. Profound seal of at least 50mm. Keeps cockroaches out of house pipes." },
      { f: "What is an Intercepting Trap?", b: "Placed in the Interceptor Manhole to prevent foul public sewer gases from entering the building's private sewer." },
      { f: "What is Self-Siphonage?", b: "Appliance discharge fills the waste pipe, creating a vacuum that sucks out its own trap seal." },
      { f: "What is Back Pressure?", b: "Resistance to flow at the base of a stack compresses air, blowing water UPWARDS out of the lowest trap." }
    ],
    quiz: [
      { q: "Which trap geometry is used when the pipe goes through the wall?", opts: ["S-Trap", "P-Trap", "Q-Trap", "Bottle Trap"], a: 1 },
      { q: "What is the minimum water seal depth required for a Gully Trap?", opts: ["10 mm", "25 mm", "50 mm", "100 mm"], a: 2 },
      { q: "What causes Induced Siphonage?", opts: ["A piece of string wicking water out", "Discharge from an adjacent appliance creating a vacuum in a shared pipe", "Wind blowing over the vent stack", "Evaporation"], a: 1 },
      { q: "Where is an Intercepting Trap located?", opts: ["Under a kitchen sink", "In a commercial kitchen", "At the junction of the building sewer and public sewer", "On the roof"], a: 2 },
      { q: "Which of the following causes back pressure?", opts: ["A waste pipe that is too steep", "A piece of rag caught on the trap", "Wind blowing over the stack", "Resistance to flow at the base of a stack"], a: 3 }
    ]
  },
  5: {
    flashcards: [
      { f: "What is a Soil Pipe?", b: "Carries soiled (black) water from toilets/urinals. Vented high at the top of the building to release harmful gases." },
      { f: "What is a Waste Pipe?", b: "Carries grey water from sinks/showers. Narrower than soil pipe, handles less harmful gas." },
      { f: "What is a Vent Pipe?", b: "Attached to soil/waste pipes to release bad odors and prevent siphonage by balancing air pressure." },
      { f: "What is an Anti-Siphonage Pipe?", b: "Connected to toilet outlets to maintain the water seal and prevent foul sewer gases from entering." },
      { f: "What are Rainwater Pipes made of?", b: "Generally PVC. Used to collect rainwater from the roof to ground level or harvesting tanks." }
    ],
    quiz: [
      { q: "Which pipe carries black water from a toilet to the sewer?", opts: ["Waste Pipe", "Soil Pipe", "Vent Pipe", "Rainwater Pipe"], a: 1 },
      { q: "What is the primary function of a Vent Pipe?", opts: ["To carry rainwater", "To balance air pressure and prevent siphonage", "To carry grey water", "To trap grease"], a: 1 },
      { q: "Which pipe prevents induced or self-siphonage specifically at toilet outlets?", opts: ["Anti-Siphonage Pipe", "Waste Pipe", "Gully Pipe", "Soil Pipe"], a: 0 },
      { q: "Why doesn't a waste pipe need the exact same massive venting as a soil pipe?", opts: ["It is wider", "It carries less harmful gas since it has no human waste", "It operates at higher pressure", "It only carries rainwater"], a: 1 },
      { q: "Rainwater pipes are generally made of what material?", opts: ["Cast iron", "Copper", "PVC", "Steel"], a: 2 }
    ]
  },
  6: {
    flashcards: [
      { f: "What is the Two Pipe System?", b: "The best plumbing system. Uses two vertical pipes: one for soil, one for waste. Both are separately ventilated." },
      { f: "What is the One Pipe System?", b: "One main vertical pipe collects both soil and waste. It has a cowl on top, PLUS a separate vent pipe for traps." },
      { f: "What is the Single Stack System?", b: "Uses only one pipe for soil/waste and NO separate vent pipe. Stack extends 2m above roof. Prone to siphonage." },
      { f: "What is the Partially Ventilated Single Stack?", b: "One main pipe, but only the Water Closet (soil) traps get a separate relief vent pipe. Waste traps are not individually vented." },
      { f: "Why choose Partially Ventilated over Single Stack?", b: "It reduces the cost of branches compared to the two-pipe system, while being safer against siphonage than a pure single stack." }
    ],
    quiz: [
      { q: "Which system is considered the best and most improved type of plumbing?", opts: ["Single Stack", "One Pipe", "Two Pipe", "Partially Ventilated"], a: 2 },
      { q: "In a Single Stack System, how is siphonage managed?", opts: ["With a separate vent pipe network", "By extending the stack 2m above the roof and strictly designing branch slopes", "By using a hydro-pneumatic pump", "By removing all P-Traps"], a: 1 },
      { q: "In the Partially Ventilated Single Stack system, which fixtures get a separate vent pipe?", opts: ["Washbasins", "Sinks", "Water Closets (Soil appliances)", "Bathtubs"], a: 2 },
      { q: "How many vertical pipes are used in the One Pipe System?", opts: ["One main pipe + One vent pipe", "Two main pipes + Two vent pipes", "One main pipe only", "Three pipes"], a: 0 },
      { q: "What does 'Sullage' refer to in the Two Pipe system?", opts: ["Black water", "Grey waste water", "Rainwater", "Vent gases"], a: 1 }
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
    elements.badgeTitle.textContent = "Sanitary Master";
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
