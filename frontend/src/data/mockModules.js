export const mockModules = [
  {
    id: 1,
    title: "Earthquake Safety Fundamentals",
    description:
      "Learn essential earthquake preparedness, safety measures during tremors, and post-earthquake recovery procedures. This comprehensive module covers everything from creating emergency kits to understanding seismic activity.",
    image: "/earthquake-safety-training.jpg",
    difficulty: "beginner",
    duration: "45 minutes",
    rating: 4.8,
    enrolled: 1247,
    regions: ["North", "West", "Central"],
    progress: 0,
    sections: [
      {
        title: "Understanding Earthquakes",
        type: "reading",
        duration: "10 minutes",
        content: `
          <h3>What Causes Earthquakes?</h3>
          <p>Earthquakes occur when there is a sudden release of energy in the Earth's crust, creating seismic waves. This typically happens along fault lines where tectonic plates meet and interact.</p>
          
          <h3>Types of Earthquakes</h3>
          <p>There are several types of earthquakes:</p>
          <ul>
            <li><strong>Tectonic earthquakes:</strong> The most common type, caused by the movement of tectonic plates</li>
            <li><strong>Volcanic earthquakes:</strong> Associated with volcanic activity</li>
            <li><strong>Collapse earthquakes:</strong> Caused by the collapse of underground caverns</li>
            <li><strong>Explosion earthquakes:</strong> Resulting from nuclear or chemical explosions</li>
          </ul>
          
          <h3>Measuring Earthquake Intensity</h3>
          <p>Earthquakes are measured using two main scales:</p>
          <ul>
            <li><strong>Richter Scale:</strong> Measures the magnitude of an earthquake</li>
            <li><strong>Modified Mercalli Scale:</strong> Measures the intensity of shaking and damage</li>
          </ul>
        `,
        keyPoints: [
          "Earthquakes are caused by sudden energy release in Earth's crust",
          "Tectonic earthquakes are the most common type",
          "Magnitude and intensity are measured differently",
          "Understanding earthquake science helps with preparedness",
        ],
      },
      {
        title: "Before an Earthquake: Preparation",
        type: "reading",
        duration: "15 minutes",
        content: `
          <h3>Creating an Emergency Kit</h3>
          <p>Every household should have an earthquake emergency kit containing:</p>
          <ul>
            <li>Water (1 gallon per person per day for 3 days)</li>
            <li>Non-perishable food (3-day supply)</li>
            <li>Battery-powered or hand-crank radio</li>
            <li>Flashlight and extra batteries</li>
            <li>First aid kit</li>
            <li>Whistle for signaling help</li>
            <li>Dust masks and plastic sheeting</li>
            <li>Moist towelettes and garbage bags</li>
            <li>Wrench or pliers to turn off utilities</li>
            <li>Manual can opener</li>
            <li>Local maps</li>
            <li>Cell phone with chargers</li>
          </ul>
          
          <h3>Securing Your Home</h3>
          <p>Make your home safer by:</p>
          <ul>
            <li>Securing heavy furniture and appliances to walls</li>
            <li>Installing safety latches on cabinets</li>
            <li>Using earthquake putty for breakable items</li>
            <li>Knowing how to shut off gas, water, and electricity</li>
            <li>Identifying safe spots in each room</li>
          </ul>
          
          <h3>Family Emergency Plan</h3>
          <p>Develop a family emergency plan that includes:</p>
          <ul>
            <li>Meeting places (near your home and outside your neighborhood)</li>
            <li>Out-of-state contact person</li>
            <li>Important documents in waterproof container</li>
            <li>Emergency contact information</li>
            <li>Evacuation routes</li>
          </ul>
        `,
        keyPoints: [
          "Emergency kits should contain supplies for at least 3 days",
          "Secure heavy items that could fall during shaking",
          "Know how to shut off utilities in your home",
          "Have a family communication plan",
        ],
      },
      {
        title: "During an Earthquake: Drop, Cover, Hold",
        type: "video",
        duration: "12 minutes",
        content: `
          <h3>The Drop, Cover, and Hold On Method</h3>
          <p>When earthquake shaking begins, immediately:</p>
          <ol>
            <li><strong>DROP</strong> to your hands and knees</li>
            <li><strong>COVER</strong> your head and neck under a sturdy desk or table</li>
            <li><strong>HOLD ON</strong> to your shelter and be prepared to move with it</li>
          </ol>
          
          <h3>If You're in Different Locations</h3>
          <p><strong>Indoors:</strong> Stay inside, get under a desk or table, stay away from windows</p>
          <p><strong>Outdoors:</strong> Move away from buildings, trees, and power lines</p>
          <p><strong>In a vehicle:</strong> Pull over safely, avoid overpasses and bridges</p>
          <p><strong>In bed:</strong> Stay there, cover your head with a pillow</p>
          
          <h3>What NOT to Do</h3>
          <ul>
            <li>Don't run outside during shaking</li>
            <li>Don't stand in doorways</li>
            <li>Don't use elevators</li>
            <li>Don't light matches or candles</li>
          </ul>
        `,
        keyPoints: [
          "Drop, Cover, and Hold On is the recommended response",
          "Stay where you are when shaking starts",
          "Protect your head and neck from falling debris",
          "Different locations require different responses",
        ],
      },
      {
        title: "After an Earthquake: Recovery and Safety",
        type: "reading",
        duration: "8 minutes",
        content: `
          <h3>Immediate Actions After Shaking Stops</h3>
          <p>Once the shaking stops:</p>
          <ul>
            <li>Check yourself and others for injuries</li>
            <li>Look for hazards (gas leaks, electrical damage, structural damage)</li>
            <li>Turn off utilities if damaged</li>
            <li>Clean up dangerous spills</li>
            <li>Check your home for damage</li>
          </ul>
          
          <h3>Communication and Information</h3>
          <p>After an earthquake:</p>
          <ul>
            <li>Use text messages instead of phone calls</li>
            <li>Listen to emergency broadcasts</li>
            <li>Stay informed about aftershocks</li>
            <li>Follow official evacuation orders</li>
          </ul>
          
          <h3>Helping Your Community</h3>
          <p>Ways to help after an earthquake:</p>
          <ul>
            <li>Check on neighbors, especially elderly or disabled</li>
            <li>Provide first aid if trained</li>
            <li>Report hazards to authorities</li>
            <li>Volunteer with relief organizations</li>
          </ul>
        `,
        keyPoints: [
          "Check for injuries and hazards immediately after shaking",
          "Use text messages for communication",
          "Be prepared for aftershocks",
          "Help your community recover safely",
        ],
      },
    ],
    quiz: {
      title: "Earthquake Safety Quiz",
      timeLimit: 300,
      questions: [
        {
          question: "What should you do immediately when earthquake shaking begins?",
          options: [
            "Run outside as quickly as possible",
            "Stand in a doorway",
            "Drop, Cover, and Hold On",
            "Turn on the lights",
          ],
          correctAnswer: 2,
          explanation:
            "Drop, Cover, and Hold On is the recommended response. Drop to hands and knees, take cover under a sturdy desk or table, and hold on to your shelter.",
        },
        {
          question: "How much water should you store per person in your emergency kit?",
          options: [
            "1 gallon per day for 1 day",
            "1 gallon per day for 3 days",
            "2 gallons per day for 3 days",
            "1 gallon per day for 1 week",
          ],
          correctAnswer: 1,
          explanation:
            "You should store 1 gallon of water per person per day for at least 3 days in your emergency kit.",
        },
        {
          question: "What type of communication is recommended immediately after an earthquake?",
          options: ["Phone calls", "Text messages", "Email", "Social media posts"],
          correctAnswer: 1,
          explanation:
            "Text messages are recommended because they use less bandwidth and are more likely to get through when phone networks are overloaded.",
        },
        {
          question: "If you're driving when an earthquake occurs, what should you do?",
          options: [
            "Speed up to get to safety quickly",
            "Pull over safely and avoid overpasses",
            "Get out of the car immediately",
            "Keep driving normally",
          ],
          correctAnswer: 1,
          explanation:
            "Pull over safely, avoid overpasses and bridges, stay in your vehicle, and cover your head until the shaking stops.",
        },
        {
          question: "What should you NOT do during an earthquake?",
          options: [
            "Get under a sturdy table",
            "Protect your head and neck",
            "Run outside during shaking",
            "Stay where you are",
          ],
          correctAnswer: 2,
          explanation:
            "You should not run outside during shaking as you could be injured by falling debris. It's safer to take cover where you are.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Flood Emergency Response",
    description:
      "Master flood safety protocols, evacuation procedures, and water emergency survival techniques. Learn to identify flood risks and protect your family and property.",
    image: "/flood-emergency-response-training.jpg",
    difficulty: "intermediate",
    duration: "60 minutes",
    rating: 4.6,
    enrolled: 892,
    regions: ["South", "East", "Central"],
    progress: 65,
    sections: [
      {
        title: "Understanding Flood Risks",
        type: "reading",
        duration: "15 minutes",
        content: `
          <h3>Types of Flooding</h3>
          <p>Understanding different types of floods helps in preparation:</p>
          <ul>
            <li><strong>Flash Floods:</strong> Sudden flooding due to heavy rainfall or dam failure</li>
            <li><strong>River Floods:</strong> Gradual overflow of rivers and streams</li>
            <li><strong>Coastal Floods:</strong> Storm surge and high tides</li>
            <li><strong>Urban Floods:</strong> Overwhelmed drainage systems in cities</li>
          </ul>
        `,
        keyPoints: [
          "Flash floods can occur with little warning",
          "Different types of floods require different responses",
          "Urban areas face unique flooding challenges",
        ],
      },
    ],
    quiz: {
      title: "Flood Safety Quiz",
      timeLimit: 240,
      questions: [
        {
          question: "What is the most dangerous type of flood due to its speed?",
          options: ["River flood", "Flash flood", "Coastal flood", "Urban flood"],
          correctAnswer: 1,
          explanation:
            "Flash floods are the most dangerous because they can occur suddenly with little warning and move at high speeds.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Fire Safety and Evacuation",
    description:
      "Learn fire prevention, detection, and evacuation procedures. Understand different types of fires and appropriate response methods.",
    image: "/fire-safety-evacuation-training.jpg",
    difficulty: "beginner",
    duration: "40 minutes",
    rating: 4.9,
    enrolled: 1456,
    regions: ["North", "South", "East", "West", "Central"],
    progress: 100,
    sections: [
      {
        title: "Fire Prevention Basics",
        type: "reading",
        duration: "12 minutes",
        content: `
          <h3>Common Fire Hazards</h3>
          <p>Identify and eliminate common fire hazards in your home:</p>
          <ul>
            <li>Overloaded electrical outlets</li>
            <li>Faulty wiring</li>
            <li>Unattended cooking</li>
            <li>Improper storage of flammable materials</li>
            <li>Blocked exits and pathways</li>
          </ul>
        `,
        keyPoints: [
          "Prevention is the best fire safety strategy",
          "Regular maintenance prevents electrical fires",
          "Keep exits clear at all times",
        ],
      },
    ],
    quiz: {
      title: "Fire Safety Quiz",
      timeLimit: 180,
      questions: [
        {
          question: "What should you do if your clothes catch fire?",
          options: ["Run to get help", "Stop, Drop, and Roll", "Pour water on yourself", "Wave your arms"],
          correctAnswer: 1,
          explanation:
            "Stop, Drop, and Roll is the correct response. Stop where you are, drop to the ground, and roll to smother the flames.",
        },
      ],
    },
  },
]
