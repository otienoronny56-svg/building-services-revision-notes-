
// -----------------------------------------------------------------------------
// VENTILATION TOPIC 7 REVISION APP
// Exhaustive 6-Day Data
// -----------------------------------------------------------------------------

// --- DOM ELEMENTS ---
const elements = {
  dayLinks: document.querySelectorAll('.sidebar-day-link'),
  dayTabs: document.querySelectorAll('.day-tab'),
  dayPanels: document.querySelectorAll('.day-panel'),
  progressBar: document.getElementById('sidebar-progress-bar'),
  progressPercentage: document.querySelector('.progress-percentage'),
  badgeTitle: document.getElementById('overall-badge-title'),
  daysCompletedCount: document.getElementById('days-completed-count'),
  avgQuizScore: document.getElementById('avg-quiz-score'),
  fcTitle: document.getElementById('flashcard-card-title-text'),
  fcFront: document.getElementById('flashcard-front-content'),
  fcBack: document.getElementById('flashcard-back-content'),
  fcPrevBtn: document.getElementById('flashcard-prev-btn'),
  fcNextBtn: document.getElementById('flashcard-next-btn'),
  fcShuffleBtn: document.getElementById('flashcard-shuffle-btn'),
  fcIndicator: document.getElementById('flashcard-position-indicator'),
  fcArena: document.getElementById('revision-flashcard-arena'),
  quizTitle: document.getElementById('quiz-day-title'),
  quizContainer: document.getElementById('quiz-body-area'),
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
      { f: "What is an unintended consequence of making buildings more airtight to save energy?", b: "The accumulation of internally generated contaminants, leading to deficient Indoor Air Quality (IAQ)." },
      { f: "According to the EPA, how much higher can indoor pollutant levels be compared to outdoor levels?", b: "Two to five times higher, and occasionally more than 100 times higher." },
      { f: "What percentage of their chemical exposure does the average person receive at home?", b: "72%." },
      { f: "What are Volatile Organic Compounds (VOCs)?", b: "Chemicals emitted as gases from certain solids or liquids, such as paints, furniture, and cleaning detergents." },
      { f: "Why is dampness and mold a common pollutant issue?", b: "Due to high humidity and poor airflow failing to remove moisture from the building." }
    ],
    quiz: [
      { q: "What is a major unintended consequence of highly energy-efficient, airtight buildings?", opts: ["Excessive noise", "Poor Indoor Air Quality (IAQ)", "Increased structural weight", "Excessive natural light"], a: 1 },
      { q: "According to the EPA, approximately what percentage of their time do most people spend indoors?", opts: ["50%", "72%", "90%", "99%"], a: 2 },
      { q: "Which of the following is a common source of VOCs in Kenyan buildings?", opts: ["Charcoal smoke", "Vehicle exhaust", "Paints and furniture", "Carbon monoxide"], a: 2 },
      { q: "Carbon monoxide in a building is most likely caused by:", opts: ["Cleaning detergents", "Faulty appliances or incomplete combustion", "Mold and dampness", "Human breathing"], a: 1 },
      { q: "The average person receives what percentage of their chemical exposure at home?", opts: ["10%", "50%", "72%", "90%"], a: 2 }
    ]
  },
  2: {
    flashcards: [
      { f: "How does ventilation help regulate temperature?", b: "By facilitating the exchange of indoor and outdoor air, it maintains the internal temperature at a constant comfortable level." },
      { f: "Why is controlling humidity crucial in a building?", b: "It prevents moisture build-up from cooking and washing, which can lead to mold growth, dampness, and structural damage." },
      { f: "How does ventilation remove airborne pathogens?", b: "By continuously circulating and exchanging air, it lowers the concentration of viruses and bacteria, minimizing disease transmission." },
      { f: "What is the role of ventilation regarding safety?", b: "It dilutes potentially harmful/combustible gases (like carbon monoxide) to safe levels." },
      { f: "What happens if a building does not comply with minimum ventilation regulations?", b: "It may face legal issues, as compliance is necessary for regulatory health and safety purposes." }
    ],
    quiz: [
      { q: "How does proper ventilation prevent condensation on windows and walls?", opts: ["By heating the glass", "By controlling humidity and driving dry outside air into the building", "By increasing the indoor pressure", "By filtering out dust"], a: 1 },
      { q: "In crowded or enclosed spaces, what is the primary benefit of ventilation regarding pathogens?", opts: ["It freezes the pathogens", "It reduces the concentration of airborne viruses and bacteria", "It kills pathogens with UV light", "It traps pathogens in the carpet"], a: 1 },
      { q: "Which of the following is NOT a primary reason for implementing ventilation?", opts: ["Regulating temperature", "Removing airborne pathogens", "Generating electricity", "Odor removal"], a: 2 },
      { q: "How does ventilation improve safety in areas with faulty appliances?", opts: ["By sounding an alarm", "By diluting harmful gases like carbon monoxide to safe levels", "By automatically turning off the appliance", "By increasing the humidity"], a: 1 },
      { q: "What does 'compliance' refer to in the context of ventilation?", opts: ["Meeting minimum ventilation requirements mandated by building codes", "Using only natural ventilation", "Ensuring windows are always open", "Using the most expensive fans"], a: 0 }
    ]
  },
  3: {
    flashcards: [
      { f: "Why must external air quality be assessed before choosing natural ventilation?", b: "Because natural ventilation relies on the external air being cleaner than the indoor air. If external air is polluted, mechanical filtration is needed." },
      { f: "What does CFD stand for, and why is it used?", b: "Computational Fluid Dynamics. It is software used to model and understand how air moves through a building's geometry." },
      { f: "How does the 'construction' (age) of a building affect ventilation?", b: "Older buildings have high infiltration (leaks). Modern buildings are airtight, requiring much higher assisted ventilation rates." },
      { f: "How do materials and finishes impact ventilation requirements?", b: "Materials like paints and carpets emit VOCs, increasing the required ventilation rate to maintain good air quality." },
      { f: "What is a 'hybrid system'?", b: "A system that uses both active (mechanical) and passive (natural) ventilation strategies to minimize energy load." }
    ],
    quiz: [
      { q: "If a building is located next to a busy, heavily polluted highway, which ventilation strategy is NOT recommended?", opts: ["Mechanical extract", "Pure natural ventilation", "Mechanical input with filtration", "Plenum system"], a: 1 },
      { q: "What tool is commonly used to understand how air flows through the volume and shape of a complex internal space?", opts: ["Thermostat", "CFD (Computational Fluid Dynamics) software", "Hygrometer", "BIM"], a: 1 },
      { q: "Compared to older buildings, modern constructions usually require:", opts: ["Less ventilation because they are smaller", "More assisted ventilation because they are highly airtight for thermal efficiency", "Only single-sided ventilation", "No ventilation at all"], a: 1 },
      { q: "Which factor increases cooling demand during hotter months, affecting ventilation needs?", opts: ["Airtightness", "Solar heat gains due to glazing and orientation", "Carpet materials", "CFD analysis"], a: 1 },
      { q: "Specifying a 'hybrid system' is primarily a strategy to address which project requirement?", opts: ["Budgetary constraints (capital cost)", "Energy efficiency (minimizing load)", "Aesthetics", "Noise level"], a: 1 }
    ]
  },
  4: {
    flashcards: [
      { f: "What three natural factors drive Natural Ventilation?", b: "1. Temperature differences (thermal density/buoyancy), 2. Wind forces, 3. A combination of both." },
      { f: "What is Cross Ventilation?", b: "A wind-driven process where fresh air flows in from the high-pressure windward side and stale air is drawn out the negative-pressure side." },
      { f: "How does Stack Ventilation work?", b: "It is driven by thermal buoyancy. Warmer, less dense air rises and escapes through high vents, drawing in cool air from low inlets." },
      { f: "What is Night Cooling (Night Flushing)?", b: "Opening vents at night when it's cool to remove stale air and cool down the building's thermal mass (floors/walls) for the next day." },
      { f: "What is a major demerit of Natural Ventilation?", b: "It is highly dependent on the weather, leading to variable airflow and limited cooling on hot, still days." }
    ],
    quiz: [
      { q: "Which natural ventilation technique relies primarily on thermal buoyancy (warm air rising)?", opts: ["Cross ventilation", "Stack ventilation", "Single-sided ventilation", "Mechanical extract"], a: 1 },
      { q: "In cross ventilation, where does the fresh air enter?", opts: ["From the negative-pressure side", "From the roof vents", "From the high-pressure side facing the wind", "From the basement"], a: 2 },
      { q: "What is the primary goal of a 'Night Purge' or 'Night Cooling' strategy?", opts: ["To warm the building up for the morning", "To cool the mass of the building down by releasing stored heat during the cooler night", "To test the fire alarms", "To filter out VOCs"], a: 1 },
      { q: "Where is Single-Sided Ventilation most commonly used?", opts: ["In massive warehouses", "In deep, wide floor plans", "In buildings with narrow floor plans or near noisy roads", "In hospital operating theatres"], a: 2 },
      { q: "Which of the following is a significant disadvantage of natural ventilation?", opts: ["High energy costs", "High greenhouse gas emissions", "Inability to filter out outdoor pollutants", "Requires massive ductwork"], a: 2 }
    ]
  },
  5: {
    flashcards: [
      { f: "How does 'Mechanical Extract, Induced Inlet' work?", b: "An extractor fan pulls air out, creating a negative pressure. Air from outside or surrounding rooms is naturally drawn in." },
      { f: "Where is Mechanical Extract (Negative Pressure) most useful?", b: "In lavatories, kitchens, and process areas, so that odours and toxic gases do not escape to other areas." },
      { f: "What is 'Mechanical Input, Forced Extract' (Plenum System)?", b: "Air is forced into the space by a fan, creating a positive pressure. Air naturally leaks outwards." },
      { f: "Where is the Plenum System (Positive Pressure) most useful?", b: "In hospital operating theatres. The outward leakage ensures contaminated air from outside cannot enter the sterile space." },
      { f: "What is a 'Heater Battery' in a plenum system used for?", b: "To temper the incoming forced air so it is heated to near room conditions." }
    ],
    quiz: [
      { q: "A ventilation system uses a fan to pull air OUT of a kitchen. What kind of pressure is created inside the kitchen?", opts: ["Positive pressure", "Negative pressure", "Neutral pressure", "Atmospheric pressure"], a: 1 },
      { q: "Why are lavatories and kitchens typically kept at a negative pressure?", opts: ["To save electricity", "So that fresh air is blown out into the corridors", "So that odours and gases flow IN to the room and do not escape to other areas", "To keep them sterile"], a: 2 },
      { q: "What is a 'Plenum System'?", opts: ["Mechanical extract only", "Natural cross ventilation", "Mechanical input (forced air) creating positive pressure", "A completely airtight room with no ventilation"], a: 2 },
      { q: "Why do hospital operating theatres use positive pressure ventilation?", opts: ["To force odours into the hallway", "To ensure all leakages are outwards, preventing contaminated air from entering the sterile space", "To reduce heating costs", "To draw fresh air in through the cracks"], a: 1 },
      { q: "In a Mechanical Extract system, what overcomes the natural stack and wind effects?", opts: ["The heater battery", "The open windows", "The extractor fan", "The thermal mass"], a: 2 }
    ]
  },
  6: {
    flashcards: [
      { f: "What is 'Mechanical Input & Mechanical Extract' ventilation?", b: "Both powered extract and input fans are used. The pressure depends on the ratio of extraction to input." },
      { f: "What happens if the input fans handle the exact same amount of air as the extract fans?", b: "It results in a neutral pressure condition." },
      { f: "What is a major advantage of full mechanical ventilation regarding filtration?", b: "It can aggressively filter out harmful microorganisms, particulates, gases, and odors from the incoming air." },
      { f: "What is a 'depressurization risk' in mechanical systems?", b: "Overzealous extraction can cause a strong negative pressure, pulling dangerous exhaust fumes (back-drafting) from appliances like water heaters into the room." },
      { f: "What are the main drawbacks of full mechanical ventilation?", b: "High energy consumption, high maintenance costs, noise/vibration from ductwork, and complex installation." }
    ],
    quiz: [
      { q: "If a room has both mechanical input and mechanical extract fans running at the exact same flow rate, what is the resulting pressure?", opts: ["Highly positive", "Highly negative", "Neutral", "Fluctuating"], a: 2 },
      { q: "Which of the following is a major ADVANTAGE of full mechanical ventilation systems?", opts: ["Zero energy consumption", "Consistent airflow regardless of external weather", "Silent operation", "No maintenance required"], a: 1 },
      { q: "What is 'back-drafting' in the context of mechanical ventilation?", opts: ["Air flowing backwards through the input fan", "A depressurization risk where dangerous appliance emissions are sucked into the occupied space", "A technique used to cool the room", "When the filters get clogged"], a: 1 },
      { q: "Why might a mechanical ventilation system increase heating and cooling costs?", opts: ["Because fans generate heat", "Because constantly introducing fresh outdoor air requires that air to be heated or cooled to room temperature", "Because the ductwork leaks", "Because it uses natural wind"], a: 1 },
      { q: "Which feature is unique to mechanical input systems compared to purely natural ventilation?", opts: ["Thermal buoyancy", "Cross breezes", "The ability to precisely filter incoming air and integrate with Air Conditioning", "Zero greenhouse gas emissions"], a: 2 }
    ]
  }
};

// --- INITIALIZATION ---
function initApp() {
  attachDayNavigation();
  attachCheckboxes();
  attachFlashcardControls();
  
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
    elements.badgeTitle.textContent = "Airflow Specialist";
    elements.badgeTitle.style.color = "var(--color-primary)";
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

// Startup
document.addEventListener('DOMContentLoaded', initApp);
