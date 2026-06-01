
// -----------------------------------------------------------------------------
// MECHANICAL TRANSPORTATION TOPIC 6 REVISION APP
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
      { f: "At what building height is a firefighting lift strictly required in Kenya?", b: "Buildings above 18 meters in height." },
      { f: "How many floors must a building have to legally require a lift?", b: "Any building with more than 4 floors MUST have a lift." },
      { f: "What is the primary functional requirement for mechanical transport?", b: "Safety. Lifts must not be used in a fire unless they are designated firefighting lifts." },
      { f: "What is the typical maximum speed of a hydraulic lift?", b: "About 1 m/s. Traction lifts are much faster." },
      { f: "What determines the necessary pit depth and headroom?", b: "The coordination and tolerances specified by the lift manufacturer based on the building design." }
    ],
    quiz: [
      { q: "According to the Building Code, a lift is mandatory for buildings with more than how many floors?", opts: ["2 floors", "3 floors", "4 floors", "10 floors"], a: 2 },
      { q: "A firefighting lift is required for buildings above what height?", opts: ["10m", "15m", "18m", "30m"], a: 2 },
      { q: "Which type of lift provides a gentler and faster ride?", opts: ["Hydraulic lifts", "Traction lifts", "Platform lifts", "Service lifts"], a: 1 },
      { q: "What is the typical maximum speed of a hydraulic elevator?", opts: ["0.5 m/s", "1 m/s", "3 m/s", "6 m/s"], a: 1 },
      { q: "Which requirement is considered 'paramount' for mechanical transportation?", opts: ["Aesthetics", "Speed", "Safety", "Coordination"], a: 2 }
    ]
  },
  2: {
    flashcards: [
      { f: "How does a Traction Elevator work?", b: "A car and counterweight are attached to hoist ropes that pass over a driving machine, running on load-bearing rails." },
      { f: "How does a Hydraulic Elevator work?", b: "Pressurized oil is forced through a valve into a steel cylinder, pushing a piston up. It uses gravity to descend." },
      { f: "What is a Dumb Waiter?", b: "A small lift used in kitchens, restaurants, and hospitals to transport food or small items." },
      { f: "What is the main advantage of hydraulic lifts over traction lifts?", b: "Lower life cycle maintenance costs (fewer pulleys/ropes) and they only use power on ascent." },
      { f: "What is an Evacuation Lift?", b: "A lift provided as part of a management plan for evacuating people during an emergency." }
    ],
    quiz: [
      { q: "Which type of elevator is raised by forcing pressurized oil into a steel cylinder?", opts: ["Traction elevator", "Hydraulic elevator", "Dumb waiter", "Belt-type elevator"], a: 1 },
      { q: "Which elevator type requires load-bearing rails to support the weight of the car?", opts: ["Hydraulic elevator", "Traction elevator", "Platform lift", "Scissor lift"], a: 1 },
      { q: "What type of lift is strictly designed to carry small goods like food in a restaurant?", opts: ["Passenger lift", "Trolley lift", "Dumb waiter", "Stair lift"], a: 2 },
      { q: "In which scenario does a hydraulic elevator use energy to operate the pump motor?", opts: ["Only during ascent (going up)", "Only during descent (going down)", "Both going up and down", "When the doors are opening"], a: 0 },
      { q: "Which lift has additional protection and is under the direct control of the rescue service?", opts: ["Platform lift", "Evacuation lift", "Firefighting lift", "Service lift"], a: 2 }
    ]
  },
  3: {
    flashcards: [
      { f: "What is Single Automatic Lift Control?", b: "The lift can be called by only one person/group at a time. The 'in use' light stays on, and it ignores other calls until finished." },
      { f: "What is Down Collective Control?", b: "Stores all calls. As it descends, it answers landing calls in floor sequence to optimize movement." },
      { f: "What is the purpose of Lift Buffers?", b: "Located at the base of the shaft to safely absorb impact. They are oil-loaded for high speeds or spring-loaded." },
      { f: "What does an Overspeed Governor do?", b: "It responds to centrifugal force if the lift over-speeds, switching off power and actuating the safety braking gear." },
      { f: "What is Full/Directional Collective Control?", b: "Registers upward and downward calls separately, responding to calls in floor order first in one direction, then the other." }
    ],
    quiz: [
      { q: "Which control system ignores all other calls while a person is using the lift?", opts: ["Down Collective", "Single Automatic", "Full Collective", "Two-Car Coordination"], a: 1 },
      { q: "Which control system answers calls in floor sequence as the car descends?", opts: ["Down Collective", "Single Automatic", "Full Collective", "Traction Control"], a: 0 },
      { q: "Where are the lift buffers located?", opts: ["On top of the lift car", "In the machine room", "At the base of the lift shaft (pit)", "Inside the counterweight"], a: 2 },
      { q: "What mechanical device responds to centrifugal force to lock the rope and actuate the safety gear?", opts: ["Fusible link", "Electromagnet", "Overspeed governor", "Step return idler"], a: 2 },
      { q: "In a 'Two Car' control system, where is the priority car usually stationed when at rest?", opts: ["At the main entrance lobby", "At the basement", "At a mid-point or convenient floor level", "On the roof"], a: 2 }
    ]
  },
  4: {
    flashcards: [
      { f: "What is the standard step width of an escalator?", b: "600, 800, or 1000 mm." },
      { f: "What are the two tracks used in an escalator truss?", b: "The step-wheel track (for front wheels) and the trailer-wheel track (for back wheels)." },
      { f: "What is the main advantage of Parallel Escalators?", b: "They can transport more people because they have twice as many steps, increasing capacity." },
      { f: "What is a major disadvantage of Escalators?", b: "High maintenance and installation costs, continuous energy consumption, and safety risks (entrapment)." },
      { f: "Why do curved escalators use space more efficiently?", b: "The radius of the curve allows for a longer arc, achieving the same vertical travel in less floor space." }
    ],
    quiz: [
      { q: "What is the typical speed range of an escalator?", opts: ["0.1 - 0.2 m/s", "0.5 - 0.65 m/s", "1.5 - 2.0 m/s", "3.0 - 5.0 m/s"], a: 1 },
      { q: "What is the hollow metal structure that bridges the lower and upper escalator landings called?", opts: ["The Track", "The Landing Platform", "The Truss", "The Balustrade"], a: 2 },
      { q: "Which escalator type is side-by-side and moves in the same direction to increase capacity?", opts: ["Curved", "Stairway", "Belt-type", "Parallel"], a: 3 },
      { q: "What is a significant disadvantage of curved escalators compared to straight ones?", opts: ["They take up more floor space", "They are slower", "They are more expensive to install and require more maintenance", "They cannot go up"], a: 2 },
      { q: "For safety, escalator up and down traffic should be:", opts: ["Combined into one wide lane", "Physically separated and not lead into confined spaces", "Directed into a single revolving door", "Hidden from public view"], a: 1 }
    ]
  },
  5: {
    flashcards: [
      { f: "What is a Travelator?", b: "A passenger conveyor or moving pavement used for horizontal or slightly inclined transport (up to 300m)." },
      { f: "What is the maximum recommended incline for a travelator?", b: "Slight inclines up to 12°, though 18° is possible (not recommended for wheeled transport)." },
      { f: "What is a Dual-Directional Travelator?", b: "Two conveyors moving in opposite directions simultaneously to handle high pedestrian traffic." },
      { f: "What is a key disadvantage of travelators?", b: "They require a massive amount of horizontal and vertical space, limiting feasibility." },
      { f: "What is the 'Moving Surface' of a travelator made of?", b: "Metal slats or rubber belts." }
    ],
    quiz: [
      { q: "Travelators are primarily designed to move people over distances up to approximately:", opts: ["50 metres", "300 metres", "1000 metres", "5000 metres"], a: 1 },
      { q: "What is the maximum incline generally recommended for a travelator handling wheeled transport (like luggage)?", opts: ["5 degrees", "12 degrees", "30 degrees", "45 degrees"], a: 1 },
      { q: "What type of travelator operates at a constant speed faster than a walk but slower than a moving sidewalk?", opts: ["Speed walk", "Inclined travelator", "Spiral travelator", "Outdoor travelator"], a: 0 },
      { q: "Which of the following is considered a major disadvantage of travelators?", opts: ["They consume no energy", "They have a very high capacity", "They require a significant amount of space", "They move vertically between 10 floors"], a: 2 },
      { q: "Which safety feature on a travelator is designed to halt movement if a person or object blocks the path?", opts: ["Directional signage", "Energy-saving mode", "Safety Sensors", "Floor lighting"], a: 2 }
    ]
  },
  6: {
    flashcards: [
      { f: "What are the four main parts of a Hoist?", b: "Power source, Drum/Pulley system, Lifting mechanism (chain/wire rope), and Control system." },
      { f: "What happens during 'Step 2: Shaft Construction' of lift installation?", b: "Creating strong concrete walls, correct pit depth, and correct overhead space. Done during construction." },
      { f: "What makes a lift 'smart' during Step 6?", b: "The electrical installation and programming of control boards and floor settings." },
      { f: "What are the components of Step 7: Testing and Load Trials?", b: "Testing under full load, emergency power, fire mode, and brake failure simulation." },
      { f: "What signs indicate you should immediately stop using a lift?", b: "Jerky movement, strange noise, burning smell, stopping between floors, or error alarms." }
    ],
    quiz: [
      { q: "In a hoist, which component wraps the lifting chain and provides torque?", opts: ["Power source", "Drum or Pulley System", "Safety limit switch", "Control pendant"], a: 1 },
      { q: "During lift installation, when must the shaft construction and pit depth preparation occur?", opts: ["After the building is fully finished", "During the building construction phase", "During the electrical programming phase", "During the handover phase"], a: 1 },
      { q: "In the 8-step lift installation process, what happens during Step 6 (Electrical Installation)?", opts: ["Concrete is poured", "The rails are fixed", "Control boards are programmed and buttons tested", "The hoist is removed"], a: 2 },
      { q: "During Step 7 (Testing), the lift must be tested under which condition?", opts: ["Empty car only", "Full passenger load and brake failure simulation", "Manual pushing", "Water flooding"], a: 1 },
      { q: "Which of the following is a sign that you should immediately stop using an elevator?", opts: ["The doors open quickly", "A burning smell or jerky movement", "The 'in use' light turns on", "The chime sounds"], a: 1 }
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
    elements.badgeTitle.textContent = "Transport Engineer";
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
