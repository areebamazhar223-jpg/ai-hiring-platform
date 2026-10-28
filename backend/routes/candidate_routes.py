from fastapi import APIRouter, Depends, HTTPException

from auth import get_current_user
from database import applications_collection, users_collection


router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


# ==========================================
# Candidate: Protected API
# ==========================================

@router.get("/")
def get_candidates(
    current_user: dict = Depends(get_current_user)
):

    return {
        "message": "Candidates API is protected",
        "user": current_user
    }


# ==========================================
# Candidate: Dashboard
# ==========================================

@router.get("/dashboard")
def candidate_dashboard(
    current_user: dict = Depends(get_current_user)
):

    # Only candidates can access dashboard
    if current_user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can access the candidate dashboard")

    # Find candidate applications
    applications = list(
        applications_collection.find({
            "candidate_email": current_user["email"]
        })
    )

    # Count applications by status
    total_applications = len(applications)

    pending = 0
    shortlisted = 0
    accepted = 0
    rejected = 0

    for application in applications:

        status = application.get("status")

        if status == "Pending":
            pending += 1

        elif status == "Shortlisted":
            shortlisted += 1

        elif status == "Accepted":
            accepted += 1

        elif status == "Rejected":
            rejected += 1


    # ==========================================
    # Get Candidate CV Skills
    # ==========================================

    candidate = users_collection.find_one({
        "email": current_user["email"]
    })

    cv_skills = []

    if candidate:
        cv_skills = candidate.get(
            "cv_skills",
            []
        )


    return {
        "candidate": {
            "email": current_user["email"],
            "role": current_user["role"],
            "cv_skills": cv_skills
        },

        "statistics": {
            "total_applications": total_applications,
            "pending": pending,
            "shortlisted": shortlisted,
            "accepted": accepted,
            "rejected": rejected
        }
    }


# ==========================================
# Candidate: Get Candidate Details
# ==========================================

@router.get("/{candidate_id}")
def get_candidate(
    candidate_id: str,
    current_user: dict = Depends(get_current_user)
):

    return {
        "candidate_id": candidate_id,
        "message": "Candidate details",
        "user": current_user
    }
