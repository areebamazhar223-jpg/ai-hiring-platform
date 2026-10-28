from contextlib import asynccontextmanager
import os

from config import load_environment_file

load_environment_file()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo.errors import PyMongoError

from database import applications_collection, client, users_collection

from routes.auth_routes import router as auth_router
from routes.jobs_routes import router as jobs_router
from routes.candidate_routes import router as candidate_router
from routes.ai_routes import router as ai_router
from routes.cv_routes import router as cv_router
from routes.applications_routes import router as applications_router
from routes.employer_routes import router as employer_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    client.admin.command("ping")
    users_collection.create_index("email", unique=True)
    applications_collection.create_index(
        [("job_id", 1), ("candidate_email", 1)], unique=True
    )
    yield


app = FastAPI(
    title="AI Hiring Platform",
    description="AI-powered job and hiring platform",
    version="1.0.0",
    lifespan=lifespan,
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Hiring Platform Backend Started!"
    }


@app.get("/health")
def health():
    try:
        client.admin.command("ping")
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Database is unavailable") from exc
    return {"status": "ok", "database": "connected"}


# =========================
# ROUTES
# =========================

app.include_router(auth_router)
app.include_router(jobs_router)
app.include_router(candidate_router)
app.include_router(ai_router)
app.include_router(cv_router)
app.include_router(applications_router)
app.include_router(employer_router)
