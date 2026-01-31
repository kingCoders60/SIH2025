<div align="center">
  <h1>🛡️ Disaster Preparedness Platform 🛡️</h1>
  <p>
    A scalable, modular MERN-based platform to enhance disaster awareness, preparedness, and response across Indian educational institutions.
  </p>
</div>

---

### **Reference File:** [Project Documentation](https://docs.google.com/document/d/1ghVRYjTGqUyCVltGO3n1ys2Ib0bqNGlwdWxZ4AESR88/edit?usp=sharing)

## 🧭 Overview

This platform empowers students and institutions by integrating real-time alerts, gamified learning, and region-specific risk intelligence through ML-powered microservices.

**Key capabilities include:**
- **Assess:** Evaluate disaster risks based on location and infrastructure.
- **Participate:** Engage in interactive drills and track preparedness scores.
- **Receive:** Get real-time alerts and actionable safety recommendations.
- **Learn:** Study through gamified modules tailored to regional hazards.

---

frontend - https://sih2025-1-pjfk.onrender.com 
backend - https://sih2025-ydfn.onrender.com 

## 🚀 Core Features

- **🔐 Authentication:** Secure login/signup with JWT-based session management.
- **🌋 Disaster Modules:** Comprehensive workflows for earthquake, flood, cyclone, and fire preparedness.
- **🧠 ML Microservices:** Flask-based services for risk prediction, preparedness scoring, and gamification logic.
- **🧪 Drill APIs:** System to track, simulate, and evaluate disaster drill participation.
- **📊 Admin Dashboard:** Institution-level analytics and user management portal.
- **📍 Geo-Intelligence:** Advanced region-specific risk mapping and alerting.

---

## 🛠️ Tech Stack

| Layer       | Technology                               |
|-------------|------------------------------------------|
| **Frontend** | `React.js` `Vite` `Tailwind CSS`         |
| **Backend** | `Node.js` `Express.js` `MongoDB`         |
| **ML Services**| `Python` `Flask` `scikit-learn`          |
| **Auth** | `JWT` `bcrypt`                           |
| **Deployment**| `Docker` `Nginx` `PM2`                   |

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-org/disaster-preparedness-platform.git](https://github.com/your-org/disaster-preparedness-platform.git)
    cd disaster-preparedness-platform
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Run the Application:**
    - **Start ML Microservices:**
      ```bash
      cd ../ml-services
      python risk_predictor.py
      python preparedness_score.py
      python gamification_engine.py
      ```
    - **Start Backend Server:**
      ```bash
      cd ../backend
      npm run dev
      ```
    - **Start Frontend Development Server:**
      ```bash
      cd ../frontend
      npm run dev
      ```

---

## 🔌 API Endpoints

<details>
<summary><strong>Click to expand API routes</strong></summary>

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Disaster Modules
- `GET /api/disaster/:type`
- `POST /api/disaster/report`

### Drill
- `GET /api/drill/:userId`
- `POST /api/drill/submit`

### ML Integration
- `POST /ml/risk-score`
- `POST /ml/preparedness-score`
- `POST /ml/gamify`

</details>

---

## 🧪 Testing

- **Backend Tests:**
  ```bash
  cd backend
  npm test

# ML microservice tests

Run the tests using the following command:
```bash 
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
└──  ml-services/
    ├── risk_predictor.py
    ├── ai_assistant/
    └── manual_data_fetch/

```
