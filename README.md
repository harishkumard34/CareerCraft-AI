# 🗺️ AI Career Roadmap Generator (CareerCraft AI)

A modern full-stack web application that creates hyper-personalized, phase-by-phase tech learning roadmaps using **FastAPI**, **Google Gemini AI**, and **React (Vite)**.

---

## ✨ Features

- **5-Step Interactive Wizard Form:**
  1. 🎓 **Education / Background:** Clickable degree cards + optional detail (e.g., year, non-tech switcher).
  2. ⚡ **Current Skills:** Toggle skill chips by domain (Programming, Tools, AI, Web) + custom skill input.
  3. 🎯 **Target Role:** High-demand tech roles + option to enter custom job titles.
  4. ⏳ **Daily Study Time:** Hours per day & days per week frequency.
  5. 🚀 **Target Timeline & Goal:** Target duration (3m to 1.5yr) and specific end goals (first job, switch, upskill).
- **AI-Powered Multi-Phase Roadmap:**
  - Sequential sprint phases (Phases 1, 2, 3, etc.).
  - Recommended high-quality free learning resources (freeCodeCamp, Kaggle, official docs).
  - Concrete hands-on portfolio projects with clear deliverables.
  - LinkedIn/community milestones to build proof of work.
  - Job readiness checklist & motivational tips.
- **Interactive UI:**
  - Dark glassmorphism design system.
  - Confetti celebration upon roadmap generation.
  - One-click **Download as PDF** export.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Lucide Icons, Canvas-Confetti, jsPDF, html2canvas
- **Backend:** FastAPI, Python 3.12, Pydantic, Uvicorn, Google GenAI SDK

---

## 🚀 Quick Start Guide

### 1. Start the Backend API

```powershell
cd career_roadmap_ai/backend

# Optional: Add your Gemini API Key in .env (if empty, realistic fallback generator runs)
# GEMINI_API_KEY=your_key_here

python -m uvicorn main:app --reload --port 8000
```
Backend will be live at: `http://localhost:8000`  
Interactive Swagger docs: `http://localhost:8000/docs`

---

### 2. Start the Frontend React App

```powershell
cd career_roadmap_ai/frontend

npm run dev
```
Open `http://localhost:5173` in your browser.
