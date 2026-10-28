from fastapi import APIRouter, Depends, HTTPException

from services.ai_service import analyze_cv, generate_interview_questions

from services.job_matching import calculate_match

from bson import ObjectId
from database import applications_collection, jobs_collection, users_collection

from auth import get_current_user

from schemas import JobMatchRequest


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# ==========================================
# AI Home
# ==========================================

@router.get("/")
def ai_home():

    return {
        "message": "AI Service is working"
    }


# ==========================================
# Analyze CV
# ==========================================

@router.post("/analyze-cv")
def analyze_cv_api(cv_text: str):

    return analyze_cv(cv_text)


# ==========================================
# AI Job Matching
# ==========================================

@router.post("/match-job")
def match_job_api(
    data: JobMatchRequest,
    current_user: dict = Depends(get_current_user)
):
    if current_user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can check job matches")
    if not ObjectId.is_valid(data.job_id):
        raise HTTPException(status_code=400, detail="Invalid job ID")

    job = jobs_collection.find_one({"_id": ObjectId(data.job_id)})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidate = users_collection.find_one({"email": current_user["email"]})
    if not candidate or not candidate.get("cv_skills"):
        raise HTTPException(status_code=400, detail="Upload your CV before checking job matches")

    result = calculate_match(
        candidate.get("cv_skills", []),
        job.get("skills", [])
    )


    # ==========================================
    # Save Match Percentage
    # ==========================================

    applications_collection.update_one(
        {"job_id": data.job_id, "candidate_email": current_user["email"]},
        {"$set": {"match_percentage": result["match_percentage"]}}
    )


    return result


# ==========================================
# Interview Questions
# ==========================================

@router.post("/interview-questions")
def interview_questions_api(job_title: str):

    return generate_interview_questions(
        job_title
    )
