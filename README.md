# 💧 Water Quality Monitoring Dashboard

A full-stack web application built with **FASTAPI** (backend) and **React** (frontend) to monitor, analyze, and manage water quality data from distributed sensors. This dashboard provides real-time insights, anomaly detection, forecasting, and reporting tools to support environmental monitoring and decision-making.

---

## 🚀 Features

- **📈 Anomaly Detection**
  - Automatically detects unusual readings from water quality sensors using statistical and machine learning models.

- **🔮 Forecasting Trends**
  - Predicts water quality metrics (e.g., pH, turbidity, temperature) for the next 6 to 12 hours using time-series forecasting.

- **🗺️ Map Visualization**
  - Displays sensor locations on an interactive map with real-time status indicators.

- **📄 CSV Report Generation**
  - Generates downloadable CSV reports for selected sensors over custom time ranges.

- **🛠️ Sensor Status Management**
  - Admin interface to view, update, and manage sensor metadata and operational status.

---

## 🧰 Tech Stack

| Layer       | Technology     |
|------------|----------------|
| Frontend   | React, Leaflet, Axios |
| Backend    | FASTAPI, Pandas, Scikit-learn |
| Database   | PostgreSQL / SQLite |
| Deployment | Docker, Nginx, GitHub Actions |

---

## 📦 Installation

### Backend (FASTAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
