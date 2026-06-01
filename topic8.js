
// -----------------------------------------------------------------------------
// AIR-CONDITIONING TOPIC 8 REVISION APP
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
      { f: "What is the basic definition of Air Conditioning?", b: "The process of removing heat and controlling the humidity of air in an enclosed space to achieve a comfortable interior environment." },
      { f: "Why is thermal comfort important in an office?", b: "It increases productivity, improves the health of workers, and reduces absenteeism." },
      { f: "What is Sensible Heat?", b: "Heat gains from occupants, lights, machines, and solar radiation that directly influence the air temperature." },
      { f: "What is Latent Heat?", b: "Moisture gains from infiltration, occupants, and processes that influence the moisture content (humidity) but not directly the thermometer temperature." },
      { f: "Name three things a true AC system must be capable of doing.", b: "Filtering, Heating, Cooling, Humidifying, Dehumidifying, and Distributing air evenly." }
    ],
    quiz: [
      { q: "What does 'AC' stand for in building services?", opts: ["Air Circulation", "Air Conditioning", "Atmospheric Cooling", "Automatic Control"], a: 1 },
      { q: "Which type of heat gain causes a change in the moisture content of the air?", opts: ["Sensible heat", "Radiant heat", "Latent heat", "Convective heat"], a: 2 },
      { q: "A computer room must be held at 20°C even when it is 28°C outside. What must the AC overcome?", opts: ["Only external heat gains", "Only internal heat gains", "Both internal and exterior heat gains", "Latent heat only"], a: 2 },
      { q: "Which of the following is NOT a required capability for a full air-conditioning system?", opts: ["Humidification", "Filtering", "Cooling without moisture removal", "Generating natural wind"], a: 3 },
      { q: "Why might a pharmaceutical production area require an AC system?", opts: ["For decorative purposes", "To provide more than basic temperature control, giving strict control over humidity and air purity", "To reduce the electricity bill", "To heat the water supply"], a: 1 }
    ]
  },
  2: {
    flashcards: [
      { f: "What does HVAC stand for?", b: "Heating, Ventilation, and Air Conditioning." },
      { f: "What is a BTU (British Thermal Unit)?", b: "A unit of measurement quantifying the amount of heat energy required to raise or lower the temperature of a given amount of air." },
      { f: "What is the Refrigeration Cycle?", b: "The process of circulating a refrigerant, which changes state from a gas to a liquid and back to a gas, absorbing and releasing heat." },
      { f: "What is Sensible Heat?", b: "Heat energy that causes a change in temperature WITHOUT a state change." },
      { f: "What is a Heat Exchanger?", b: "A device used to transfer heat between two fluids without them coming into direct contact." }
    ],
    quiz: [
      { q: "What does the 'V' in HVAC stand for?", opts: ["Vacuum", "Voltage", "Ventilation", "Velocity"], a: 2 },
      { q: "What unit of measurement is commonly used to determine the cooling or heating capacity of an air conditioning system?", opts: ["Watts", "BTU", "Pascals", "Joules"], a: 1 },
      { q: "During the refrigeration cycle, what happens to the refrigerant?", opts: ["It is permanently destroyed", "It changes state from a gas to a liquid and back to a gas", "It mixes directly with the indoor air", "It turns into water"], a: 1 },
      { q: "Heat energy that causes a change in temperature without a change in moisture is known as:", opts: ["Latent heat", "Sensible heat", "Radiant heat", "Solar heat"], a: 1 },
      { q: "A device used to transfer heat between two fluids without them touching is called a:", opts: ["Compressor", "Thermostat", "Heat Exchanger", "Filter"], a: 2 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is the role of the Compressor?", b: "It pressurizes the refrigerant gas, raising its temperature and pressure, circulating it through the system." },
      { f: "Where is the Condenser located and what does it do?", b: "Located in the outdoor unit. It releases heat to the outside air, causing the high-pressure refrigerant gas to condense into a liquid." },
      { f: "What is the function of the Evaporator?", b: "Located in the indoor unit. It receives low-pressure liquid refrigerant, allowing it to evaporate and absorb heat from the indoor air." },
      { f: "What does the Expansion Valve do?", b: "It reduces the pressure of the refrigerant, allowing it to expand and cool rapidly before entering the evaporator." },
      { f: "What is the Circulation Fan (Blower) responsible for?", b: "Moving air through the indoor unit, across the evaporator coil, and out into the room." }
    ],
    quiz: [
      { q: "Which component of an AC system is responsible for pressurizing the refrigerant gas?", opts: ["Evaporator", "Condenser", "Compressor", "Expansion Valve"], a: 2 },
      { q: "Where is the Condenser typically located in a split system?", opts: ["Inside the room", "In the outdoor unit", "Inside the ductwork", "Next to the thermostat"], a: 1 },
      { q: "What happens to the refrigerant inside the Evaporator?", opts: ["It becomes a high-pressure liquid", "It evaporates into a gas, absorbing heat from the indoor air", "It is filtered", "It releases heat to the outside"], a: 1 },
      { q: "Which device regulates the flow and reduces the pressure of the refrigerant before it enters the evaporator?", opts: ["Compressor", "Expansion Valve", "Blower fan", "Ductwork"], a: 1 },
      { q: "What component is used to trap dust and allergens to improve indoor air quality?", opts: ["Condenser", "Return outlet", "Filters (e.g., HEPA)", "Thermostat"], a: 2 }
    ]
  },
  4: {
    flashcards: [
      { f: "What is Psychrometrics?", b: "The study of the physical and thermodynamic properties of air and their relationship to moisture content." },
      { f: "What is Dry-Bulb Temperature?", b: "The temperature of the air measured by a regular thermometer. Used to determine sensible heat transfer." },
      { f: "What is Wet-Bulb Temperature?", b: "The lowest temperature achieved by evaporating water into the air. Measured with a wetted wick over the thermometer bulb." },
      { f: "What is Relative Humidity (RH)?", b: "The ratio of the actual amount of moisture present in the air to the maximum amount it can hold at that temperature, expressed as a percentage." },
      { f: "What is the Dew Point?", b: "The temperature at which the air becomes 100% saturated with moisture, causing condensation (water droplets) to form." }
    ],
    quiz: [
      { q: "The study of the properties of air and its moisture content is called:", opts: ["Thermodynamics", "Aerodynamics", "Psychrometrics", "Hydraulics"], a: 2 },
      { q: "Which temperature is measured using a regular thermometer without any moisture applied to the bulb?", opts: ["Dew point", "Wet-bulb temperature", "Dry-bulb temperature", "Latent temperature"], a: 2 },
      { q: "Which parameter indicates the air's moisture saturation level as a percentage?", opts: ["Dew point", "Relative Humidity (RH)", "Sensible heat", "Dry-bulb temperature"], a: 1 },
      { q: "What happens when the air temperature drops to the Dew Point?", opts: ["The air catches fire", "The air becomes completely dry", "Condensation occurs", "The air pressure doubles"], a: 2 },
      { q: "The wet-bulb temperature is an indicator of the system's potential for:", opts: ["Heating", "Filtration", "Cooling via evaporation", "Pressurization"], a: 2 }
    ]
  },
  5: {
    flashcards: [
      { f: "What does the Cooling Load Calculation take into account?", b: "Room size, solar heat gain from windows, occupancy, equipment, and insulation levels." },
      { f: "What does SEER stand for, and why is a higher rating better?", b: "Seasonal Energy Efficiency Ratio. Higher ratings mean greater energy efficiency and lower operating costs." },
      { f: "Why is 'Zoning' an important AC feature?", b: "It allows for independent temperature control in different areas or floors, customizing comfort and saving energy." },
      { f: "What environmental consideration is important when choosing a refrigerant?", b: "Choosing one with a lower Global Warming Potential (GWP), such as R-410A instead of the older R-22." },
      { f: "What is the benefit of System Integration (e.g., with a Building Management System)?", b: "It enables features like occupancy-based scheduling to optimize energy usage without compromising comfort." }
    ],
    quiz: [
      { q: "What calculation is necessary to ensure an AC system is not undersized or oversized?", opts: ["Dew point calculation", "Cooling Load Calculation", "Voltage calculation", "Airspeed calculation"], a: 1 },
      { q: "If System A has a SEER rating of 18 and System B has a SEER rating of 14, which is true?", opts: ["System B is more energy efficient", "System A consumes less energy for the same cooling output", "They cost the same to operate", "System A is louder"], a: 1 },
      { q: "What AC feature allows different floors of a building to have different temperature settings?", opts: ["HEPA Filtration", "Zoning Options", "Heat Exchange", "Dew Point Control"], a: 1 },
      { q: "When evaluating environmental impact, modern systems should use refrigerants with:", opts: ["Higher Global Warming Potential (GWP)", "Lower Global Warming Potential (GWP)", "High ozone depletion potential", "No pressure"], a: 1 },
      { q: "Why might you integrate your AC system with occupancy sensors via a Building Management System?", opts: ["To adjust cooling based on room occupancy, saving energy", "To make the fans spin faster constantly", "To bypass the filters", "To increase the sensible heat"], a: 0 }
    ]
  },
  6: {
    flashcards: [
      { f: "What is the difference between Comfort AC and Industrial AC?", b: "Comfort AC aims to give maximum human comfort. Industrial AC controls temperature/humidity for specific industry processes (e.g., cleanrooms)." },
      { f: "How does a Composite (All-Weather) AC system work?", b: "It combines cooling and heating (e.g., a Heat Pump) by reversing the refrigeration cycle based on the season." },
      { f: "What is Central Air Conditioning?", b: "A centralized unit (often outdoors) that cools air and distributes it through a network of ducts to multiple rooms." },
      { f: "What is Unitary Air Conditioning?", b: "Self-contained units (like a window AC) that provide localized cooling to a single area." },
      { f: "What is an Air-Water System?", b: "A system that uses a water loop (like a cooling tower or well) to transfer heat, combined with air handlers to condition the air." }
    ],
    quiz: [
      { q: "A cleanroom requires strict control over temperature and humidity to protect a manufacturing process. What type of AC is this?", opts: ["Comfort AC", "Industrial AC", "Unitary AC", "Winter AC"], a: 1 },
      { q: "Which type of AC system provides both cooling in summer and heating in winter by reversing the refrigeration cycle?", opts: ["Summer AC", "Comfort AC", "Composite (All-Weather) AC / Heat Pump", "Chilled Water System"], a: 2 },
      { q: "A rooftop package unit that cools air and sends it through ducts to 10 different offices is an example of:", opts: ["Unitary Air Conditioning", "Central Air Conditioning", "A window AC unit", "Natural ventilation"], a: 1 },
      { q: "A window air conditioner used to cool a single bedroom is an example of:", opts: ["Central Air Conditioning", "An all-water system", "Unitary Air Conditioning", "An industrial cleanroom"], a: 2 },
      { q: "Which system circulates chilled water through pipes to coils, where air is then blown across the coils to cool a room?", opts: ["All Air System", "All Water System (Chilled Water)", "Air-Water System", "Direct Expansion System"], a: 1 }
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
    elements.badgeTitle.textContent = "HVAC Engineer";
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
