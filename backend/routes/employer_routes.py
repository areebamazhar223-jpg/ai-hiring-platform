from fastapi import APIRouter, Depends, HTTPException

from auth import get_current_user

from database import (
    jobs_collection,
    applications_collection,
    users_collection
)


router = APIRouter(
    prefix="/employer",
    tags=["Employer"]
)


# ==========================================
# Employer Dashboard
# ==========================================

@router.get("/dashboard")
def employer_dashboard(
    current_user: dict = Depends(get_current_user)
):

    # Only employers can access
    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can access the employer dashboard")

    employer_email = current_user["email"]

    # ==========================================
    # Get Employer Jobs
    # ==========================================

    jobs = list(
        jobs_collection.find({
            "employer_email": employer_email
        })
    )

    # ==========================================
    # Get Employer Applications
    # ==========================================

    applications = list(
        applications_collection.find({
            "employer_email": employer_email
        })
    )

    # ==========================================
    # Convert Job IDs
    # ==========================================

    for job in jobs:
        job["_id"] = str(job["_id"])

    # ==========================================
    # Add Candidate Information
    # ==========================================

    for application in applications:

        candidate_email = application.get(
            "candidate_email"
        )

        candidate = users_collection.find_one({
            "email": candidate_email
        })

        if candidate:

            application["candidate_name"] = candidate.get(
                "name",
                "Candidate"
            )

            application["candidate_skills"] = candidate.get(
                "cv_skills",
                []
            )

            application["cv_filename"] = candidate.get(
                "cv_filename"
            )

        else:

            application["candidate_name"] = "Candidate"

            application["candidate_skills"] = []

            application["cv_filename"] = None

        # Convert Application ID
        application["_id"] = str(
            application["_id"]
        )

    # ==========================================
    # Return Dashboard
    # ==========================================

    return {

        "employer": {
            "name": current_user.get("name"),
            "email": employer_email,
            "role": current_user.get("role")
        },

        "statistics": {

            "total_jobs":
                len(jobs),

            "total_applications":
                len(applications),

            "pending_applications":
                len([
                    a for a in applications
                    if a.get("status") == "Pending"
                ]),

            "shortlisted":
                len([
                    a for a in applications
                    if a.get("status") == "Shortlisted"
                ])
        },

        "jobs":
            jobs,

        "applications":
            applications
    }
