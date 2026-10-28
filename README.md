# HireAI

HireAI is a job board and hiring dashboard with candidate and employer accounts, CV upload and skill extraction, job matching, applications, and employer review tools.

## Prerequisites

- Node.js 20.19+ or 22.12+
- Python 3.10+
- MongoDB, either local or a reachable MongoDB URL

## Configure the backend

In PowerShell:

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Set a private `SECRET_KEY` in `backend/.env` before using the app beyond local development. Keep `.env` out of version control. Set `MONGO_URL` for your MongoDB instance. The API creates unique indexes on user email and candidate/job applications when it starts.

Start the API from the `backend` directory:

```powershell
py -m uvicorn main:app --reload
```

The API runs at `http://127.0.0.1:8000`; interactive API documentation is at `/docs`. `/health` reports whether MongoDB is reachable.

## Configure the frontend

In another terminal:

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_URL` in `frontend/.env` if the API uses another address. Build and lint with `npm run build` and `npm run lint` from `frontend`.

## Product behavior and limits

- Candidate accounts can upload text-based PDFs up to 5 MB. CV skills are extracted using a built-in keyword list; scanned PDFs and image-only documents need OCR, which is not included.
- Job match percentages compare extracted candidate skills with the job's required skills. This is a transparent skills overlap score, not a trained AI model.
- Employer accounts can create and manage their jobs, view applications to their jobs, and update applicant statuses.
- The frontend currently uses client-side page state rather than URL routes. Refreshing returns to the home page.

## Project layout

- `frontend/` is the active React/Vite application.
- `backend/` contains the FastAPI API, MongoDB integration, CV parsing, and matching logic.
- `backend/frontend/` is an unused Vite starter scaffold; run the app in the top-level `frontend/` directory.
