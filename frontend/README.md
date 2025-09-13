# DisasterPrep - Disaster Preparedness Platform

A comprehensive React-based disaster preparedness training platform with interactive modules, virtual drills, and gamification features.

## Features

### 🎓 **Learning Modules**

- Interactive disaster education modules
- Multiple content types (videos, text, quizzes)
- Progress tracking and completion certificates
- Category-based filtering (Fire, Earthquake, Flood, etc.)

### 🏃 **Virtual Drills**

- Animated drill simulations
- Step-by-step emergency procedures
- Real-time scoring and feedback
- Multiple drill types and difficulty levels

### 🏆 **Gamification**

- XP and leveling system
- Achievement badges with rarity levels
- Leaderboards with regional filtering
- Progress tracking and statistics

### 👥 **Role-Based Access**

- **Students**: Access to modules, drills, and gamification
- **Teachers**: Class management and student progress tracking
- **Admins**: Full system administration and analytics

### 📊 **Admin Panel**

- Comprehensive user management
- Data visualization with Recharts
- Regional preparedness analytics
- Drill participation statistics

## Technology Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BadgeDisplay.jsx
│   ├── DrillSimulation.jsx
│   ├── Leaderboard.jsx
│   ├── ModuleCard.jsx
│   ├── Navbar.jsx
│   ├── QuizEngine.jsx
│   ├── Sidebar.jsx
│   └── XPTracker.jsx
├── context/            # React Context providers
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── AdminPanel.jsx
│   ├── Alerts.jsx
│   ├── Dashboard.jsx
│   ├── Drills.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ModuleDetails.jsx
│   ├── Modules.jsx
│   └── Signup.jsx
├── services/           # API services
│   └── api.js
├── lib/                # Utility functions
│   └── utils.js
└── assets/             # Static assets
```

## Key Features

### Authentication System

- JWT-based authentication
- Role-based access control
- Persistent login state
- Protected routes

### Interactive Learning

- Module-based curriculum
- Quiz system with instant feedback
- Progress tracking
- Completion certificates

### Virtual Drills

- Animated simulations
- Real-time scoring
- Step-by-step guidance
- Performance analytics

### Gamification

- XP and leveling system
- Achievement badges
- Leaderboards
- Progress tracking

### Admin Dashboard

- User management
- Analytics and reporting
- Regional statistics
- System monitoring

## API Integration

The application is designed to work with a REST API. All API calls are centralized in `src/services/api.js` with the following endpoints:

- Authentication (login, signup, logout)
- User management
- Modules and quizzes
- Drills and simulations
- Gamification (XP, badges, leaderboards)
- Admin analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
