🩺 Diabetic Retinopathy Detection – Full-Stack Web Application

A full-stack medical image analysis platform designed to assist in the early detection of Diabetic Retinopathy from retinal images.
The system integrates a modern web frontend, RESTful backend APIs, and a machine learning inference pipeline to deliver predictions through a user-friendly interface.

📌 This project is based on an IEEE-published research work and has been engineered into a production-style web application.

🚀 Project Overview

Diabetic Retinopathy (DR) is a diabetes-related eye disease that can lead to vision loss if not detected early.
This application allows users (e.g., clinicians or researchers) to:

Upload retinal images

Send images securely to a backend service

Perform automated analysis using a trained deep learning model

View prediction results through a web dashboard

The focus of this project is end-to-end system design, covering:

Frontend → Backend → ML inference integration

API-driven architecture

Clean separation of concerns

Scalable and maintainable code structure

🧠 System Architecture
Frontend (Next.js / React)
        |
        |  HTTP Requests (JSON / Image Upload)
        v
Backend API (Python + Flask)
        |
        |  Preprocessing & Inference Call
        v
ML Inference Layer (CNN Model)
        |
        v
Prediction Response → Frontend UI

🖥️ Application Flow

User Interaction

User logs in / accesses the dashboard

Uploads a retinal image via the web interface

Frontend Handling

Image and metadata are sent to the backend using REST APIs

Input validation is performed before submission

Backend Processing

Flask API receives the image

Image preprocessing (resize, normalization, formatting)

Request routed to the ML inference module

Model Inference

CNN model predicts the disease stage

Prediction result is returned to the backend

Response & Visualization

Backend sends structured JSON response

Frontend displays prediction and performance metrics

🛠️ Tech Stack
Frontend

Next.js

React

TypeScript

Tailwind CSS

Component-based UI architecture

Backend

Python

Flask

RESTful APIs

Request handling & validation

Error handling and response management

Machine Learning

TensorFlow / Keras

Convolutional Neural Networks (CNN)

Image preprocessing using NumPy / OpenCV

Tools & Practices

Git & GitHub

Modular project structure

Environment isolation (venv – excluded from repo)

Clean .gitignore usage

📂 Project Structure
Diabetic-retinopathy-final/
│
├── app/                    # Frontend pages (Next.js)
├── components/             # Reusable UI components
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── api/                # API route handlers
│   ├── services/           # Business logic & inference services
│   └── utils/              # Helper functions
│
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

⚠️ About Model Files

Trained model files (.h5, .pkl, etc.) are intentionally not included in this repository.

Why?

Trained models are large binary artifacts

GitHub is intended for source code, not large binaries

In real-world systems, models are stored in:

Object storage (S3, GCS)

Model registries

Secure internal servers

What IS included:

Complete model loading logic

Inference pipeline integration

API flow demonstrating how models are used in production

📌 Model files can be shared separately upon request.

📄 Research Background

This project is derived from an IEEE-published research paper focused on automated detection of Diabetic Retinopathy using deep learning techniques.
The academic work has been extended into a real-world usable software system.

🎯 Key Highlights

Full-stack system, not just an ML notebook

Clear API-driven design

Production-oriented project structure

Strong focus on software engineering + ML integration

Recruiter-friendly and scalable codebase

🧪 Future Enhancements

Role-based authentication (Doctor / Admin)

Cloud deployment (AWS / GCP)

Model versioning and monitoring

Database integration for report storage

Real-time analytics dashboard

👤 Author

Appaji Sree Dharma Shasta Rao
B.Tech – Computer Science (AI & ML)
SRM Institute of Science and Technology

📌 IEEE Published Author
