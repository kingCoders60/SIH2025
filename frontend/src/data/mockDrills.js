export const mockDrills = [
  {
    id: 1,
    title: "Office Fire Evacuation",
    description:
      "Practice proper fire evacuation procedures in a multi-story office building scenario.",
    type: "fire",
    status: "upcoming",
    difficulty: "medium",
    duration: "15 minutes",
    participants: 45,
    location: "Office Building - Floor 3",
    scheduledTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/office-fire-drill.jpg",
    completed: false,
    steps: [
      {
        scenario:
          "You're working at your desk on the 3rd floor when the fire alarm sounds. You can smell smoke coming from the direction of the break room.",
        question: "What is your immediate first action?",
        options: [
          "Investigate the source of the smoke",
          "Gather your personal belongings",
          "Immediately leave your workstation and head to the nearest exit",
          "Call 911 from your desk phone",
        ],
        correctAction: 2,
        feedback:
          "Correct! When a fire alarm sounds, your immediate priority is to evacuate. Don't waste time investigating or gathering belongings.",
        image: "/office-fire-scenario-1.jpg",
      },
      {
        scenario:
          "You're moving toward the exit when you encounter a colleague who is panicking and doesn't know which way to go.",
        question: "How should you help your colleague?",
        options: [
          "Leave them behind to save yourself",
          "Calmly guide them to the nearest safe exit",
          "Stop to comfort them until they calm down",
          "Send them in a different direction to spread out the crowd",
        ],
        correctAction: 1,
        feedback:
          "Correct! Help others evacuate calmly and efficiently, but don't delay the evacuation process unnecessarily.",
        image: "/office-fire-scenario-2.jpg",
      },
      {
        scenario:
          "You reach the stairwell and notice it's filling with smoke. There's also an elevator nearby that appears to be working.",
        question: "What should you do?",
        options: [
          "Take the elevator to get down faster",
          "Use the smoky stairwell but stay low",
          "Go back and find an alternative route",
          "Wait in place for rescue",
        ],
        correctAction: 2,
        feedback:
          "Correct! Never use elevators during a fire. If the stairwell has smoke, stay low where the air is cleaner, or find an alternative stairwell if available.",
        image: "/office-fire-scenario-3.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Earthquake Drop and Cover",
    description:
      "Learn and practice the proper Drop, Cover, and Hold On technique during an earthquake.",
    type: "shelter",
    status: "active",
    difficulty: "easy",
    duration: "10 minutes",
    participants: 32,
    location: "Classroom Building",
    scheduledTime: new Date().toISOString(),
    image: "/earthquake-drill.jpg",
    completed: false,
    steps: [
      {
        scenario:
          "You're sitting at your desk when you feel the ground start to shake. The shaking is getting stronger.",
        question: "What is the correct immediate response?",
        options: [
          "Run outside immediately",
          "Stand in a doorway",
          "Drop to hands and knees, take cover under desk",
          "Stay seated and wait it out",
        ],
        correctAction: 2,
        feedback:
          "Correct! Drop, Cover, and Hold On is the recommended response. Get under a sturdy desk or table immediately.",
        image: "/earthquake-scenario-1.jpg",
      },
      {
        scenario:
          "You're now under your desk as the shaking continues. Some items are falling from shelves around the room.",
        question: "What should you do while under the desk?",
        options: [
          "Stay perfectly still",
          "Hold onto the desk legs and be ready to move with it",
          "Cover your ears from the noise",
          "Try to grab falling items",
        ],
        correctAction: 1,
        feedback:
          "Correct! Hold onto your shelter and be prepared to move with it. Protect your head and neck from falling debris.",
        image: "/earthquake-scenario-2.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Severe Weather Shelter",
    description:
      "Practice taking shelter during a tornado warning in a school environment.",
    type: "shelter",
    status: "upcoming",
    difficulty: "easy",
    duration: "12 minutes",
    participants: 28,
    location: "School Building",
    scheduledTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/tornado-drill.jpg",
    completed: false,
    steps: [
      {
        scenario:
          "A tornado warning has been issued for your area. You hear the emergency alert system and see dark, rotating clouds outside.",
        question: "Where should you go for shelter?",
        options: [
          "Stay by the windows to watch the storm",
          "Go to the lowest floor, interior room, away from windows",
          "Go to the top floor for a better view",
          "Stay in your current classroom",
        ],
        correctAction: 1,
        feedback:
          "Correct! Move to the lowest floor, find an interior room away from windows, and stay away from large roof spans like gymnasiums.",
        image: "/tornado-scenario-1.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Medical Emergency Response",
    description:
      "Learn how to respond to a medical emergency and provide basic first aid.",
    type: "medical",
    status: "completed",
    difficulty: "hard",
    duration: "20 minutes",
    participants: 15,
    location: "Training Center",
    scheduledTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    image: "/medical-emergency-drill.jpg",
    completed: true,
    steps: [
      {
        scenario:
          "You find a colleague who has collapsed and is unconscious. They are breathing but unresponsive to your voice.",
        question: "What is your first priority?",
        options: [
          "Move them to a more comfortable position",
          "Give them water",
          "Check for responsiveness and call for help",
          "Start CPR immediately",
        ],
        correctAction: 2,
        feedback:
          "Correct! First check responsiveness, then call for emergency help. Don't move an unconscious person unless they're in immediate danger.",
        image: "/medical-scenario-1.jpg",
      },
    ],
  },
  {
    id: 5,
    title: "Communication System Test",
    description:
      "Practice using emergency communication systems and protocols during a crisis.",
    type: "communication",
    status: "upcoming",
    difficulty: "medium",
    duration: "18 minutes",
    participants: 22,
    location: "Emergency Operations Center",
    scheduledTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    image: "/communication-drill.jpg",
    completed: false,
    steps: [
      {
        scenario:
          "The primary communication system has failed during an emergency. You need to establish contact with emergency services.",
        question: "What is the best backup communication method?",
        options: [
          "Send someone to drive to the fire station",
          "Use a battery-powered radio or satellite phone",
          "Wait for the system to come back online",
          "Use social media to call for help",
        ],
        correctAction: 1,
        feedback:
          "Correct! Battery-powered radios and satellite phones are reliable backup communication methods during emergencies.",
        image: "/communication-scenario-1.jpg",
      },
    ],
  },
];
