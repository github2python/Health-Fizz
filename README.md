# Health Risk Prediction and Management System

This project is a full-stack application that helps users predict health risks based on their medical data and provides personalized health goals and tracking features. The system uses **React** for the frontend, **Express** for the backend, **Flask** for machine learning models, and **MongoDB** for storing user data.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Application](#running-the-application)
7. [Project Structure](#project-structure)
8. [Backend API Endpoints](#backend-api-endpoints)
9. [Contributing](#contributing)
10. [License](#license)

## Project Overview

The Health Risk Prediction and Management System allows users to:

- **Predict health risks** like strokes based on their medical history and lifestyle data using machine learning models.
- **Track health goals** (e.g., reducing BMI, maintaining blood pressure) and monitor progress.
- **View personalized health recommendations** to reduce risk levels.
- **Secure access** through user authentication (registration and login).

### Workflow Overview

1. **Registration/Login**: Users must first register or login.
2. **Data Submission**: Users fill out forms providing their health data.
3. **Machine Learning Prediction**: The data is sent to the backend, which communicates with Flask to get predictions from ML models.
4. **Health Recommendations**: Based on the user's input, personalized health tips are given.

## Key Features

1. **User Authentication**: Secure registration and login with JWT tokens.
2. **Health Risk Prediction**: Predicts health risks like strokes based on user input.
3. **Data Persistence**: User inputs and health data are stored in MongoDB.
4. **Personalized Health Tips**: After prediction, personalized tips and goals are provided to the user.

## Tech Stack

- **Frontend**: React, Material-UI for styling.
- **Backend**: Express.js (Node.js), Axios for API communication.
- **Machine Learning**: Flask (Python) for health risk prediction using ML models.
- **Database**: MongoDB for user data storage.
- **Authentication**: JWT for token-based authentication.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v12.x or later)
- [npm](https://www.npmjs.com/get-npm)
- [Python](https://www.python.org/) (v3.6 or later)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (for deployment)

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/your-repository/health-risk-prediction.git
cd health-risk-prediction
```

### 2. Setup MongoDB:

- Install MongoDB locally or use a cloud service like MongoDB Atlas.
- Create a database named as per your choice.
- Make sure to configure the MongoDB URI in the .env file of the backend (Express).

### 3. Install Frontend Dependencies:

```bash
    cd frontend
    npm install
```

### 4. Install Backend Dependencies:

```bash
    cd backend
    npm install
```

### 5. Creating a Python Virtual Environment:

```bash
    cd backend
    python -m venv venv
    venv\Scripts\activate
```

### 6. Install Flask Dependencies:

```bash
    cd backend
    pip install -r requirements.txt
```

### 7. Create a .env file in the backend folder:

```bash
    TOKEN_SECRET=your_secret_key
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

```

### 8. Create a .env file in the frontend folder:

```bash
    REACT_APP_BACKEND_URL=http://localhost:5000
```

### 9. Running the Application:

- Start the backend server:

```bash
    cd backend
    nodemon server.js
```

- Start the frontend server:

```bash
    cd frontend
    npm start
```

- Start the Flask server:

```bash
    cd backend
    python app.py
```

### Project Structure

```bash
.
├── frontend/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── App.js
├── backend/                 # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── diabetes_model.pkl
├── heart_disease_model.pkl
├── stroke_model.pkl
├── requirements.txt
├── liver_model.pkl
├── server.js
└── README.md
```

### Backend API Endpoints

## **POST /register**: Register a new user.

- **Request Body** :

  ```json
  {
    "username": "",
    "email": "",
    "password": ""
  }
  ```

## **POST /login**: Login an existing user.

- **Request Body** :

  ```json
  {
    "email": "",
    "password": ""
  }
  ```

### License

Apache License
Version 2.0, September 2024
http://www.apache.org/licenses/ 
    
Copyright 2024 Divyanshu Tyagi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
