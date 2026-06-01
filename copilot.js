// ==========================================================================
// REVISION COPILOT - CLIENT-SIDE INTELLIGENT NOTES Q&A ASSISTANT
// Compiled Exhaustively From All 8 Building Services Revision Manuals
// ==========================================================================

const copilotDb = [
  // TOPIC 1: PLUMBING
  {
    keywords: ["plumbing", "drainage", "difference", "compare"],
    question: "What is the difference between Plumbing and Drainage?",
    answer: "<strong>Plumbing</strong> deals with bringing clean, potable water IN to a building (water supply, storage tanks, and distribution pipe networks).<br><br><strong>Drainage</strong> deals with removing wastewater, storm water, and solid waste safely OUT of a building (soil pipes, waste pipes, and main public sewers).",
    topic: "Topic 1: Plumbing & Sanitation",
    link: "index.html"
  },
  {
    keywords: ["authority", "authorities", "kenya", "regulate", "regulators", "kebs", "wasreb", "nca"],
    question: "Which authorities regulate plumbing and sanitation in Kenya?",
    answer: "Plumbing is overseen by several regulatory bodies in Kenya:<br>1. <strong>KEBS (Kenya Bureau of Standards):</strong> Controls standard quality of pipes and fittings.<br>2. <strong>WASREB (Water Services Regulatory Board):</strong> Oversees the Water Act 2016 implementation.<br>3. <strong>Ministry of Water, Sanitation & Irrigation (MoWSI):</strong> Formulates national water policies.<br>4. <strong>NCA (National Construction Authority):</strong> Accredits construction contractors.<br>5. <strong>BORAQS & EBK:</strong> Register professional Architects and Engineers who sign off plans.",
    topic: "Topic 1: Plumbing & Sanitation",
    link: "index.html"
  },
  {
    keywords: ["water", "consumption", "categories"],
    question: "What are the categories of water consumption in Kenya?",
    answer: "Water consumption in Kenya falls under four major categories:<br>1. <strong>Domestic:</strong> Drinking, cooking, ablution, bathing, gardening, and laundry.<br>2. <strong>Trade & Industry:</strong> Processing in factories, hospitals, schools, power stations, and offices.<br>3. <strong>Agriculture:</strong> Horticulture, greenhouses, dairy, and livestock farming.<br>4. <strong>Public Use:</strong> Public parks, street watering, sewer flushing, and firefighting.",
    topic: "Topic 1: Plumbing & Sanitation",
    link: "index.html"
  },
  {
    keywords: ["back", "siphonage", "back-siphonage", "contamination"],
    question: "What is back siphonage and how does it happen?",
    answer: "<strong>Back siphonage</strong> is the reverse flow of polluted water into potable water supply mains caused by negative pressure in the pipeline.<br><br>It usually occurs when there is a major pressure drop in the municipal main line (due to a burst or high demand), drawing water back into the supply from a submerged outlet (e.g., a hose left lying in dirty bathwater). It is prevented by using <strong>check valves (non-return valves)</strong> and preserving proper <strong>air gaps</strong>.",
    topic: "Topic 1: Plumbing & Sanitation",
    link: "index.html"
  },
  {
    keywords: ["direct", "indirect", "cold", "water", "system", "supply"],
    question: "What is the difference between Direct and Indirect Cold-Water systems?",
    answer: "<strong>Direct System:</strong> Potable water from the rising main is tapped directly to all draw-off points. Drinking water is available at every faucet. However, there is no storage backup if municipal supply fails, and fittings wear out faster due to high pressure.<br><br><strong>Indirect System:</strong> The rising main supplies only the kitchen sink; all other fixtures are fed via gravity from a large storage tank (minimum 230L). This provides water reserve during main outages and lower, uniform pressure, but requires strong structural support for overhead tanks.",
    topic: "Topic 1: Plumbing & Sanitation",
    link: "index.html"
  },

  // TOPIC 2: SANITARY APPLIANCES
  {
    keywords: ["soil", "waste", "pipe", "pipes", "difference"],
    question: "What is the difference between a Soil Pipe and a Waste Pipe?",
    answer: "<strong>Soil Pipe:</strong> Conveys highly concentrated human excreta from toilets, urinals, or bidets directly to the soil stack/drain.<br><br><strong>Waste Pipe:</strong> Conveys greywater (liquid waste free of human feces) from sinks, showers, bathtubs, bidets, and washing machines.",
    topic: "Topic 2: Sanitary Appliances",
    link: "topic2.html"
  },
  {
    keywords: ["trap", "traps", "water", "seal", "depth", "purpose"],
    question: "What is the purpose and depth of a sanitary trap?",
    answer: "A <strong>trap</strong> is a curved fitting (P, S, or Bottle shape) placed beneath sanitary fixtures to hold a body of water. <br><br><strong>Purpose:</strong> This water forms a physical barrier (seal) that prevents toxic sewer gases, insects, and foul odors from escaping into the building.<br><strong>Water Seal Depth:</strong><br>- <strong>75mm depth:</strong> Mandatory for waste pipes (showers, sinks, baths) connected to single-stack systems.<br>- <strong>50mm depth:</strong> Standard for water closets (WCs) and fixtures with direct, short discharge branches.",
    topic: "Topic 2: Sanitary Appliances",
    link: "topic2.html"
  },
  {
    keywords: ["siphonic", "washdown", "toilet", "closet", "wc"],
    question: "What is the difference between Siphonic and Washdown WCs?",
    answer: "<strong>Washdown WC:</strong> Relies on the simple gravitational force of falling flush water to push waste out. It is robust, rarely clogs, but has a smaller water surface area and can be louder.<br><br><strong>Siphonic WC:</strong> Uses a narrow, curved outlet trap that fills completely with flush water to create a negative pressure (siphon action) that sucks the waste down. It is extremely quiet, has a clean, wide water surface, but is more prone to clogging.",
    topic: "Topic 2: Sanitary Appliances",
    link: "topic2.html"
  },

  // TOPIC 3: DRAINAGE & SEWERAGE
  {
    keywords: ["drainage", "sewerage", "combined", "separate", "system"],
    question: "What are Combined and Separate Sewerage systems?",
    answer: "<strong>Combined System:</strong> Collects both surface rainwater runoff and foul sewage in a single pipe. Cheap to install but risk overflowing during heavy storms, causing raw sewage spillage.<br><br><strong>Separate System:</strong> Rainwater and foul sewage are kept in two separate pipes. Foul sewage goes to the treatment plant, while rainwater goes directly to rivers. Safer and environmentally friendly, but expensive to lay down.",
    topic: "Topic 3: Drainage & Sewerage",
    link: "topic3.html"
  },
  {
    keywords: ["gradient", "gradients", "fall", "slope", "velocity", "self-cleansing"],
    question: "What is the gradient / fall of underground drains?",
    answer: "Drains must be laid at a slope that ensures a <strong>self-cleansing velocity</strong> (typically between 0.7 m/s to 2.4 m/s) to prevent solid debris from settling while ensuring liquid does not flow too fast and leave solids behind.<br><br><strong>Standard Maguire Gradients:</strong><br>- <strong>1 in 40</strong> for 100mm (4-inch) pipes.<br>- <strong>1 in 60</strong> for 150mm (6-inch) pipes.<br>- <strong>1 in 90</strong> for 225mm (9-inch) pipes.",
    topic: "Topic 3: Drainage & Sewerage",
    link: "topic3.html"
  },
  {
    keywords: ["test", "testing", "drain", "drains", "smoke", "water"],
    question: "How are drainage systems tested for leaks?",
    answer: "Two major tests are conducted on newly laid drains before backfilling:<br>1. <strong>Water Test (Hydraulic):</strong> The lower end of the drain is plugged, and the pipe is filled with water to a vertical head of 1.5 meters at the high end. The water level must not drop more than about 100mm over a 30-minute period.<br>2. <strong>Smoke Test:</strong> Used to find gas/odor leaks. A smoke machine pumps thick, colored smoke into the sealed pipes. If smoke escapes, it pinpoints joint cracks or faulty water seals.",
    topic: "Topic 3: Drainage & Sewerage",
    link: "topic3.html"
  },

  // TOPIC 4: SOLID WASTE MANAGEMENT
  {
    keywords: ["solid", "waste", "disposal", "methods", "landfill", "incineration", "composting"],
    question: "What are the common methods of solid waste disposal?",
    answer: "Common municipal solid waste disposal methods include:<br>1. <strong>Sanitary Landfill:</strong> Compacting wastes in engineered pits and covering them daily with soil to prevent vectors, fire, and odors.<br>2. <strong>Incineration:</strong> Burning waste at high temperatures (850°C-1100°C) to reduce volume by up to 90% and generate steam/energy. Prone to air pollution.<br>3. <strong>Composting:</strong> Biological decomposition of organic food/garden waste into humus fertilizer.<br>4. <strong>Recycling & Reduction:</strong> Recovering paper, plastics, glass, and metals to reduce landfill stress.",
    topic: "Topic 4: Solid Waste Management",
    link: "topic4.html"
  },

  // TOPIC 5: FIRE PROTECTION
  {
    keywords: ["fire", "classes", "class", "extinguisher", "color", "codes"],
    question: "What are the classes of fire and extinguisher color codes?",
    answer: "<strong>Fire Classes:</strong><br>- <strong>Class A (Wood/Paper):</strong> Extinguished with <strong>Water (Red label)</strong> or Foam.<br>- <strong>Class B (Flammable Liquids/Gasoline):</strong> Extinguished with <strong>Foam (Cream label)</strong> or CO2.<br>- <strong>Class C (Electrical Equipment):</strong> Extinguished with <strong>CO2 (Black label)</strong> or Dry Powder.<br>- <strong>Class D (Metals):</strong> Extinguished with specialized <strong>Dry Powder (Blue label)</strong>.<br>- <strong>Class K/F (Cooking Oils):</strong> Extinguished with <strong>Wet Chemical (Yellow label)</strong>.",
    topic: "Topic 5: Fire Protection & Control",
    link: "topic5.html"
  },
  {
    keywords: ["drencher", "drenchers", "sprinkler", "difference"],
    question: "What is the difference between Sprinklers and Drenchers?",
    answer: "<strong>Sprinkler Systems:</strong> Installed inside rooms. Each sprinkler head has a heat-sensitive liquid bulb or fusible link that bursts individually to spray water directly on the localized fire source.<br><br><strong>Drencher Systems:</strong> Installed on the exterior walls or roof of a building. All nozzles are open and discharge simultaneously when triggered to create a continuous vertical 'water curtain' that protects the building from thermal radiation originating from adjacent burning buildings.",
    topic: "Topic 5: Fire Protection & Control",
    link: "topic5.html"
  },
  {
    keywords: ["osha", "osha 2007", "fire", "rules", "regulations", "kenya"],
    question: "What are the Kenyan fire risk reduction rules (OSHA 2007)?",
    answer: "Under the <strong>Occupational Safety and Health Act (OSHA), 2007</strong> and Fire Risk Rules:<br>1. Evacuation fire drills must be conducted at least <strong>once every 12 months</strong>.<br>2. Clear, unblocked emergency escape routes that open outwards in the direction of escape. Revolving or sliding doors are prohibited as escape exits.<br>3. Annual workplace fire audits conducted by approved advisors.<br>4. Sand buckets are no longer legally sufficient; standard fire extinguishers must be installed.",
    topic: "Topic 5: Fire Protection & Control",
    link: "topic5.html"
  },

  // TOPIC 6: MECHANICAL TRANSPORTATION
  {
    keywords: ["elevator", "elevators", "lift", "lifts", "traction", "hydraulic"],
    question: "What is the difference between Traction and Hydraulic lifts?",
    answer: "<strong>Hydraulic Lifts:</strong> Pushed up by a piston moving in a pressurized cylinder. Best for low-rise buildings (up to 5-6 floors), slow, requires a machine room at the base, but cheap to install.<br><br><strong>Traction Lifts:</strong> Pulled up/down by steel cables running over a grooved sheave driven by an electric motor, balanced by a counterweight. Best for mid-to-high-rise buildings, extremely fast, energy-efficient.",
    topic: "Topic 6: Mechanical Transportation",
    link: "topic6.html"
  },

  // TOPIC 7: VENTILATION
  {
    keywords: ["ventilation", "natural", "mechanical", "artificial", "air", "change"],
    question: "What is the purpose of ventilation and Air Change Rate?",
    answer: "<strong>Ventilation</strong> is the process of supplying clean outdoor air and removing stale, carbon-dioxide-rich indoor air to maintain oxygen levels, remove odors/humidity, and regulate temperature.<br><br><strong>Air Change Rate (ACH):</strong> The measure of how many times the total volume of air in a room is replaced per hour. E.g., a standard classroom needs 4-6 ACH, while a commercial kitchen or bathroom needs 10-15 ACH to clear grease and moisture.",
    topic: "Topic 7: Ventilation Systems",
    link: "topic7.html"
  },

  // TOPIC 8: AIR CONDITIONING
  {
    keywords: ["air", "conditioning", "refrigeration", "split", "cycle"],
    question: "What are the main functions of an Air Conditioning system?",
    answer: "Unlike simple ventilation, true <strong>Air Conditioning</strong> controls four physical properties of indoor air:<br>1. <strong>Temperature:</strong> Heating or cooling the air.<br>2. <strong>Humidity:</strong> Dehumidifying (removing moisture) or humidifying.<br>3. <strong>Purity:</strong> Filtering out dust, soot, pollen, and odor particles.<br>4. <strong>Air Movement:</strong> Ensuring gentle air circulation without creating drafts.",
    topic: "Topic 8: Air Conditioning Systems",
    link: "topic8.html"
  }
];

// Stopwords to filter from queries to improve search quality
const stopwords = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "what", "how", "to",
  "can", "we", "add", "way", "of", "asking", "questions", "through", "app", "too",
  "like", "i", "type", "question", "it", "answers", "based", "on", "notes", "specifically",
  "somewhere", "very", "accessible", "you", "me", "tell", "us", "about", "for", "in", "with",
  "why", "which", "whose", "whom", "where", "does"
]);

// Initialize Copilot Events
document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('copilot-widget');
  const trigger = document.getElementById('copilot-trigger');
  const closeBtn = document.getElementById('copilot-close-btn');
  const sendBtn = document.getElementById('copilot-send-btn');
  const input = document.getElementById('copilot-input');
  
  if (trigger && widget) {
    trigger.addEventListener('click', () => {
      widget.classList.remove('copilot-closed');
      widget.classList.add('copilot-open');
      input.focus();
    });
  }
  
  if (closeBtn && widget) {
    closeBtn.addEventListener('click', () => {
      widget.classList.remove('copilot-open');
      widget.classList.add('copilot-closed');
    });
  }
  
  if (sendBtn) {
    sendBtn.addEventListener('click', handleCopilotSubmit);
  }
  
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleCopilotSubmit();
      }
    });
  }
});

// Trigger Q&A with predefined suggestions
window.askCopilot = function(questionText) {
  const widget = document.getElementById('copilot-widget');
  const input = document.getElementById('copilot-input');
  if (widget && widget.classList.contains('copilot-closed')) {
    widget.classList.remove('copilot-closed');
    widget.classList.add('copilot-open');
  }
  if (input) {
    input.value = questionText;
    handleCopilotSubmit();
  }
};

// Handle submission of user queries
function handleCopilotSubmit() {
  const input = document.getElementById('copilot-input');
  const chatArea = document.getElementById('copilot-chat-area');
  
  if (!input || !chatArea) return;
  const query = input.value.trim();
  if (query === "") return;
  
  // 1. Render User Message
  renderBubble(query, 'user-bubble');
  input.value = "";
  
  // 2. Render Typing Indicator
  const typingIndicator = renderTypingIndicator();
  chatArea.scrollTop = chatArea.scrollHeight;
  
  // 3. Simulate AI thinking delay (600ms)
  setTimeout(() => {
    // Remove typing indicator
    typingIndicator.remove();
    
    // Process search & generate reply
    const replyObj = searchNotes(query);
    
    // Render Assistant Reply
    let html = `<strong>${replyObj.question}</strong><br><br>${replyObj.answer}`;
    if (replyObj.topic && replyObj.link) {
      html += `<div style="margin-top: 1rem; border-top: 1px solid var(--border-glass); padding-top: 0.5rem; font-size: 0.72rem; display: flex; justify-content: space-between; align-items: center;">
                 <span style="color: var(--text-muted); font-weight: 600;"><i class="ri-book-open-line"></i> ${replyObj.topic}</span>
                 <a href="${replyObj.link}" style="color: var(--color-primary); font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.15rem;">Go to Topic <i class="ri-arrow-right-s-line"></i></a>
               </div>`;
    }
    renderBubble(html, 'assistant-bubble');
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 750);
}

// Search algorithm through curated database
function searchNotes(query) {
  const cleanTokens = query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
    .split(/\s+/)
    .filter(token => token.length > 1 && !stopwords.has(token));
    
  if (cleanTokens.length === 0) {
    return {
      question: "Hello!",
      answer: "I couldn't process the query. Try asking something specific like 'Classes of fire', 'Back siphonage', or 'Maguire gradients'!",
      topic: null,
      link: null
    };
  }
  
  let bestMatch = null;
  let highestScore = 0;
  
  for (let item of copilotDb) {
    let score = 0;
    // Score based on keywords match
    for (let token of cleanTokens) {
      if (item.keywords.includes(token)) {
        score += 3; // strong keyword match
      } else {
        // partial string matching
        for (let kw of item.keywords) {
          if (kw.includes(token) || token.includes(kw)) {
            score += 1.5;
          }
        }
      }
      
      // also check in question text
      if (item.question.toLowerCase().includes(token)) {
        score += 1;
      }
      
      // check in answer text
      if (item.answer.toLowerCase().includes(token)) {
        score += 0.5;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }
  
  // If we found a solid match, return it
  if (bestMatch && highestScore >= 2) {
    return bestMatch;
  }
  
  // Fallback: If no direct match in compiled database, try searching general keywords
  return {
    question: `Query: "${query}"`,
    answer: "I couldn't find an exact match for that in our compiled notes.<br><br>💡 <strong>Try asking about:</strong><br>- <em>'What is back siphonage?'</em><br>- <em>'What are the classes of fire?'</em><br>- <em>'What causes water hardness?'</em><br>- <em>'What is the gradient of drains?'</em><br>- <em>'Dry riser vs wet riser'</em>",
    topic: null,
    link: null
  };
}

// UI helper to render message bubble
function renderBubble(content, className) {
  const chatArea = document.getElementById('copilot-chat-area');
  if (!chatArea) return;
  
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${className}`;
  bubble.innerHTML = content;
  
  chatArea.appendChild(bubble);
  return bubble;
}

// UI helper to render typing indicator
function renderTypingIndicator() {
  const chatArea = document.getElementById('copilot-chat-area');
  if (!chatArea) return null;
  
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble assistant-bubble typing-bubble';
  bubble.innerHTML = `<span style="display: inline-flex; align-items: center; gap: 4px; height: 12px;">
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.4s infinite ease-in-out; display: inline-block;"></span>
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.4s infinite ease-in-out 0.2s; display: inline-block;"></span>
                        <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); animation: bounce 1.4s infinite ease-in-out 0.4s; display: inline-block;"></span>
                      </span>
                      <style>
                        @keyframes bounce {
                          0%, 80%, 100% { transform: scale(0); }
                          40% { transform: scale(1.0); }
                        }
                      </style>`;
  
  chatArea.appendChild(bubble);
  return bubble;
}
