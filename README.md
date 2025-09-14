🛡️ Disaster Preparedness Platform
A scalable, modular MERN-based platform designed to enhance disaster awareness, preparedness, and response across Indian educational institutions. It integrates real-time alerts, gamified learning, and region-specific risk intelligence through ML-powered microservices.

 Refrence FIle : https://docs.google.com/document/d/1ghVRYjTGqUyCVltGO3n1ys2Ib0bqNGlwdWxZ4AESR88/edit?usp=sharing
 
🧭 Overview
This platform empowers students and institutions to:

Assess disaster risks based on location and infrastructure

Participate in interactive drills and preparedness scoring

Receive real-time alerts and safety recommendations

Learn through gamified modules tailored to regional hazards

🚀 Features
🔐 Authentication: Secure login/signup with JWT-based session management

🌋 Disaster Modules: Earthquake, flood, cyclone, and fire preparedness workflows

🧠 ML Microservices: Flask-based services for risk prediction, scoring, and gamification logic

🧪 Drill APIs: Track, simulate, and evaluate drill participation

📊 Admin Dashboard: Institution-level analytics and user management

📍 Geo-Intelligence: Region-specific risk mapping and alerting

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Vite, Tailwind CSS
Backend	Node.js, Express.js, MongoDB
ML Services	Python, Flask, scikit-learn
Auth	JWT, bcrypt
Deployment	Docker, Nginx, PM2
📦 Installation & Setup
bash
# Clone the repo
git clone https://github.com/your-org/disaster-preparedness-platform.git
cd disaster-preparedness-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start ML microservices
cd ../ml-services
python risk_predictor.py
python preparedness_score.py
python gamification_engine.py

# Start backend and frontend
cd ../backend
npm run dev

cd ../frontend
npm run dev
🔌 API Endpoints
Auth
POST /api/auth/signup

POST /api/auth/login

Disaster Modules
GET /api/disaster/:type

POST /api/disaster/report

Drill
GET /api/drill/:userId

POST /api/drill/submit

ML Integration
POST /ml/risk-score

POST /ml/preparedness-score

POST /ml/gamify

🧪 Testing
bash
# Backend tests
cd backend
npm test

# ML microservice tests
pytest tests/
📁 Folder Structure
Code
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
├── ml-services/
│   ├── risk_predictor.py
│   ├── preparedness_score.py
│   └── gamification_engine.py
