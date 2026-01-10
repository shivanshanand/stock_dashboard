# Stock Intelligence Dashboard

Production-ready, full-stack stock analytics platform — FastAPI backend and React frontend — for fetching, processing, storing, and visualizing market data.

## Table of contents

- [Stock Intelligence Dashboard](#stock-intelligence-dashboard)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Quickstart](#quickstart)
  - [API](#api)
  - [Data \& Calculations](#data--calculations)
  - [Deployment](#deployment)

## Features

- **Backend (FastAPI):** Fetches market data, cleans and processes time series, computes metrics, stores into SQL database, exposes documented REST endpoints.
- **Frontend (React + Vite + Tailwind):** Interactive dashboard with price charts, comparisons, top movers, and a compact financial UI.
- **Key Insights:** Trend detection (bull/bear/neutral), volatility, 52-week high/low, moving averages, top gainers/losers.

## Architecture

- **Backend:** `backend/app` — FastAPI app, SQLAlchemy models, services for data ingestion & calculations.
- **Frontend:** `frontend` — Vite + React UI, Chart.js visualizations.
- **Data:** Used SQLite for data storage.

## Quickstart

Prerequisites

- Python 3.10+ and Node.js 16+ / npm

Backend (recommended)

1. Create a virtual environment and install dependencies

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate   # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt || pip install -e .
```

2. Run the FastAPI server

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API docs: http://127.0.0.1:8000/docs

Frontend

1. Install and run

```bash
cd frontend
npm install
npm run dev
```

Frontend default: http://localhost:5173

Notes

- If `backend/pyproject.toml` is the primary dependency manifest, use your preferred tool (pip with PEP 517/518, Poetry, or `pip install .`).

## API

- **GET /api/companies** — list supported symbols
- **GET /api/data/{symbol}?days={n}** — historical OHLC data for the last `n` days (default 30)
- **GET /api/summary/{symbol}** — 52-week high/low, average close, basic summary
- **GET /api/compare?symbol1={s1}&symbol2={s2}&days={n}** — compares performance and returns a winner
- **GET /api/insights/top-movers?days={n}** — returns top gainers and losers

Call the endpoints on the running backend (see Quickstart). Endpoints return JSON suitable for the frontend charts.

## Data & Calculations

- **Daily return:** (Closed price - Opening price) / Opening price
- **Moving average:** 7-day simple moving average of close prices
- **52-week range:** highest and lowest closing prices over the past 52 weeks
- **Volatility:** rolling standard deviation of daily returns
- **Trend logic:**
  - Bullish — price above MA and positive return
  - Bearish — price below MA and negative return
  - Neutral — otherwise

## Deployment

- Backend and frontend are deployable separately.
- Setup:
  - Backend: deployed to Render. Ensured DB and CORS are configured.
  - Frontend: deployed to Vercel; point API calls to the deployed backend.

Production checklist

- Use a managed DB (Postgres) instead of SQLite
- Configure environment variables for secrets and DB URLs
- Add logging, monitoring, and health checks
- Harden CORS and rate limiting

---

For implementation details see `backend/app`, `frontend/src`, and the services in `backend/app/services`.

---

[View dashboard](https://stock-dashboard-one-eta.vercel.app/)
