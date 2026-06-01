
// -----------------------------------------------------------------------------
// FIRE PROTECTION TOPIC 5 REVISION APP
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
      { f: "What two legal acts govern fire prevention and control in Kenya?", b: "The Occupational Safety and Health Act (OSHA), 2007, and the Fire Risk Reduction Rules of 2007." },
      { f: "What is the penalty for neglecting fire safety regulations in Kenya?", b: "Substantial fines, often up to KES 500,000." },
      { f: "How often must fire drills be conducted according to statutory requirements?", b: "At least once every 12 months." },
      { f: "What is the difference between Passive and Active fire controls?", b: "Passive controls (walls, doors) are built-in and don't require activation. Active controls (extinguishers, sprinklers) respond when fire occurs." },
      { f: "What does the acronym RACE stand for?", b: "Rescue, Alarm, Contain, Evacuate." }
    ],
    quiz: [
      { q: "Which of the following is an example of a Passive fire control?", opts: ["Fire Extinguisher", "Fire-resistant concrete wall", "Smoke Detector", "Water Sprinkler"], a: 1 },
      { q: "How frequently must a workplace conduct fire drills?", opts: ["Every 6 months", "Every 12 months", "Every 2 years", "Only when requested by authorities"], a: 1 },
      { q: "In the acronym PASS for using a fire extinguisher, what does the 'A' stand for?", opts: ["Alert", "Aim", "Activate", "Access"], a: 1 },
      { q: "Which of the following is NOT permitted to be used as an emergency exit door?", opts: ["A door opening outwards", "A heavy wooden door", "A sliding or revolving door", "A metal fire-rated door"], a: 2 },
      { q: "What is the maximum fine for neglecting fire safety regulations under the Fire Risk Reduction Rules 2007?", opts: ["KES 50,000", "KES 100,000", "KES 500,000", "KES 1,000,000"], a: 2 }
    ]
  },
  2: {
    flashcards: [
      { f: "What is a Class A fire?", b: "Ordinary Combustibles like wood, paper, textiles, and rubber." },
      { f: "What color code is a Carbon Dioxide (CO2) fire extinguisher?", b: "Black. Ideal for electrical and flammable liquid fires, leaving no residue." },
      { f: "Which extinguisher should NEVER be used on electrical or oil fires?", b: "Red (Water) extinguisher." },
      { f: "What is a Class K/F fire?", b: "Kitchen Fires involving cooking oils and fats." },
      { f: "How often must fire extinguishers be serviced?", b: "Annually, by certified companies, and they must have inspection tags." }
    ],
    quiz: [
      { q: "What class of fire involves flammable liquids like gasoline and paint?", opts: ["Class A", "Class B", "Class C", "Class D"], a: 1 },
      { q: "A fire erupts in a server room full of electrical equipment. Which extinguisher color code is best?", opts: ["Red", "Cream", "Black", "Yellow"], a: 2 },
      { q: "What extinguishing agent is represented by the 'Blue' color code?", opts: ["Water", "Foam", "Carbon Dioxide", "Dry Powder"], a: 3 },
      { q: "What causes a Class D fire?", opts: ["Cooking fats", "Combustible Metals like magnesium", "Electrical faults", "Textiles"], a: 1 },
      { q: "How is Foam created inside a Cream extinguisher?", opts: ["By pressurizing CO2", "By freezing water", "By a chemical reaction between sodium bicarbonate and aluminum sulphate", "By mixing dry powder with oil"], a: 2 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is the primary function of a Fire Hose Reel?", b: "It's a hand-operated device used as a first-aid measure by building occupants to guide a fire hose." },
      { f: "Where are drenchers typically located?", b: "On the exterior of a building (roof, walls, windows) to protect against fire spreading from neighboring buildings." },
      { f: "What is the required pressure at the highest hose reel?", b: "200 kPa. If the main water can't provide this, a booster pump is needed." },
      { f: "What is the difference between a Dry Riser and a Wet Riser?", b: "A Dry Riser is only charged with water during an emergency. A Wet Riser always has water present in the pipe." },
      { f: "How do Drenchers activate compared to Sprinklers?", b: "All nozzles in a drencher system activate simultaneously, whereas sprinklers open individually." }
    ],
    quiz: [
      { q: "What is the required discharge rate for a fire hose reel?", opts: ["0.1 l/s", "0.4 l/s", "1.0 l/s", "5.0 l/s"], a: 1 },
      { q: "If a building is taller than 15 meters, what size internal diameter supply pipe is required for hose reels?", opts: ["25mm", "50mm", "65mm", "100mm"], a: 2 },
      { q: "Which system is specifically designed to protect the EXTERNAL surfaces of a building from a neighboring fire?", opts: ["Wet Riser", "Drencher System", "Hose Reel", "Sprinkler System"], a: 1 },
      { q: "Why might a booster pump and suction tank be installed for a hose reel system?", opts: ["To cool the water", "Because the municipal water main cannot provide the required 200 kPa pressure", "To mix foam into the water", "To prevent pipes from freezing"], a: 1 },
      { q: "Where is the best location for a hose reel to ensure user safety?", opts: ["Inside the kitchen", "In the basement", "At the staircase landing", "On the roof"], a: 2 }
    ]
  },
  4: {
    flashcards: [
      { f: "How does a standard sprinkler head activate?", b: "It opens at a pre-set temperature when heated by the fire." },
      { f: "What is a Pre-action sprinkler system?", b: "The pipe is dry to avoid water damage. Water only flows if a separate ceiling heat detector confirms a fire." },
      { f: "Why is a 'Dry System' sprinkler not commonly used in Kenya?", b: "Because they are designed for sub-zero (freezing) weather to prevent pipes from bursting, which is not an issue in Kenya." },
      { f: "What is a Recycling Pre-action system?", b: "It turns the water off after a 5-minute delay when the fire is subdued, but restarts if the fire reignites." },
      { f: "What are the four main water supplies for sprinklers?", b: "Elevated private reservoir, Suction tank, Gravity tank, and River/Canal." }
    ],
    quiz: [
      { q: "Once a standard sprinkler head activates, does it close automatically?", opts: ["Yes, after 5 minutes", "No, it is an 'open once only' tap", "Yes, when the room cools down", "Yes, when the alarm goes off"], a: 1 },
      { q: "Which sprinkler system is ideal for Data Centers to avoid accidental water damage from broken sprinkler heads?", opts: ["Wet system", "Pre-action system", "Tail end system", "Dry riser"], a: 1 },
      { q: "In a tail end system, what is the maximum number of sprinklers allowed after a tail end air control valve?", opts: ["10", "100", "500", "1000"], a: 1 },
      { q: "If drawing water from a river for a sprinkler system, what specific equipment is mandated?", opts: ["A water heater", "A dry riser", "Strainers and duplicate pumps (one diesel, one electric)", "A water purification filter"], a: 2 },
      { q: "What happens to the water pressure when a sprinkler head opens?", opts: ["It drops, which activates an alarm to call the fire service", "It increases drastically", "It remains constant", "It pushes air into the room"], a: 0 }
    ]
  },
  5: {
    flashcards: [
      { f: "What is a Fire/Smoke Damper?", b: "A passive protection product that closes inside HVAC ductwork when temperature rises to prevent smoke spread." },
      { f: "How does a Fusible Link damper work?", b: "It melts at about 70°C to release a steel shutter." },
      { f: "Why is an electromagnet damper preferred over a fusible link?", b: "Because smoke damage can occur long before the heat reaches the 70°C required to melt a fusible link." },
      { f: "What is the purpose of Pressurization in Escape Routes?", b: "To maintain higher air pressure (25-50 Pa) in stairwells, pushing smoke away so people can escape safely." },
      { f: "Where are fire dampers majorly found?", b: "Hospitals, airports (JKIA), and high-end commercial buildings." }
    ],
    quiz: [
      { q: "What is the primary function of a fire damper?", opts: ["To pump water into ventilation ducts", "To cool the air conditioner", "To close and prevent fire/smoke spread inside HVAC ductwork", "To extract smoke from the building"], a: 2 },
      { q: "At approximately what temperature does a standard fusible link melt to release a damper shutter?", opts: ["30°C", "70°C", "150°C", "500°C"], a: 1 },
      { q: "What is a unique characteristic of an intumescent-coated honeycomb damper?", opts: ["It freezes the smoke", "It expands to 100 times its original volume when heated to seal the duct", "It relies on water pressure", "It only works in high-velocity systems"], a: 1 },
      { q: "In a pressurized escape route, where is the highest air pressure maintained?", opts: ["In the offices", "In the basement", "In the stairwell", "On the roof"], a: 2 },
      { q: "What is the typical pressurization level used for stairwells?", opts: ["1 to 5 Pa", "25 to 50 Pa", "100 to 200 Pa", "500 Pa"], a: 1 }
    ]
  },
  6: {
    flashcards: [
      { f: "What is the disadvantage of a Thermal (Heat) detector?", b: "It may not detect a fire in its early smoldering stages, unlike a smoke detector." },
      { f: "Where are Flame Detectors commonly used?", b: "In hostile environments and industrial plants. They are very expensive and must look directly at the flame." },
      { f: "What type of alarm output device is ideal for libraries?", b: "Horns, because a loud signal is needed in sensitive structures." },
      { f: "Why are backup batteries crucial for fire alarms in Kenya?", b: "Because many buildings lack functional alarms due to frequent power outages." },
      { f: "What is a major cause of fires in Kenyan school dormitories?", b: "Arson or electrical faults, highlighting the need for regular fire drills and clear escape routes." }
    ],
    quiz: [
      { q: "Which fire detector is considered highly efficient because it detects fire very early during the smoldering stage?", opts: ["Thermal detector", "Smoke detector", "Flame detector", "Human sense"], a: 1 },
      { q: "Which output device provides a soft alarm tone, suitable for hospitals and theatres?", opts: ["Bells", "Horns", "Chimes", "Visual strobes"], a: 2 },
      { q: "What is a major limitation of a Flame Detector?", opts: ["It is too cheap", "It must be directly looking at the flame to work", "It only detects smoke", "It cannot be used in industries"], a: 1 },
      { q: "Which of the following is a common issue exacerbating fires in places like Gikomba Market?", opts: ["Too many fire hydrants", "Over-pressurized stairwells", "Poor access roads for fire engines and congestion", "Too many fire drills"], a: 2 },
      { q: "When are visual alarms (strobes) highly recommended?", opts: ["In libraries", "In areas with high noise levels or for hearing-impaired occupants", "In small residential kitchens", "When there is a power outage"], a: 1 }
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
    elements.badgeTitle.textContent = "Fire Safety Master";
    elements.badgeTitle.style.color = "var(--color-danger)";
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
