from fastapi import APIRouter, Depends, HTTPException
from pymongo.errors import DuplicateKeyError

from bson import ObjectId

from auth import get_current_user

from database import (
    applications_collection,
    jobs_collection,
    users_collection,
)

from schemas import ApplicationCreate
from services.job_matching import calculate_match


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# ==========================================
# Apply For Job
# ==========================================

@router.post("/")
def apply_for_job(
    application: ApplicationCreate,
    current_user: dict = Depends(get_current_user)
):

    # Only candidates can apply
    if current_user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can apply for jobs")

    # Check valid Job ID
    if not ObjectId.is_valid(application.job_id):
        raise HTTPException(status_code=400, detail="Invalid job ID")

    # Find the job
    job = jobs_collection.find_one({
        "_id": ObjectId(application.job_id)
    })

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Get Job Information
    job_title = job.get(
        "title",
        "Unknown Job"
    )

    company = job.get(
        "company",
        "Unknown Company"
    )

    # Get Employer Email
    employer_email = job.get(
        "employer_email"
    )

    # Check Already Applied
    existing_application = applications_collection.find_one({
        "job_id": application.job_id,
        "candidate_email": current_user["email"]
    })

    if existing_application:
        raise HTTPException(status_code=409, detail="You have already applied for this job")

    candidate = users_collection.find_one({"email": current_user["email"]}) or {}
    candidate_skills = candidate.get("cv_skills", [])
    match_percentage = (
        calculate_match(candidate_skills, job.get("skills", []))["match_percentage"]
        if candidate_skills else None
    )

    # Create Application
    new_application = {

        "job_id":
            application.job_id,

        "job_title":
            job_title,

        "company":
            company,

        "employer_email":
            employer_email,

        "candidate_email":
            current_user["email"],

        "resume": candidate.get("cv_filename"),

        "status":
            "Pending",

        "match_percentage": match_percentage
    }

    # Save Application
    try:
        result = applications_collection.insert_one(new_application)
    except DuplicateKeyError:
        raise HTTPException(status_code=409, detail="You have already applied for this job")

    # Response
    return {

        "message":
            "Application submitted successfully",

        "application_id":
            str(result.inserted_id),

        "job_title":
            job_title,

        "company":
            company,

        "status":
            "Pending",

        "match_percentage": match_percentage
    }


# ==========================================
# Candidate Applications
# ==========================================

@router.get("/my-applications")
def get_my_applications(
    current_user: dict = Depends(get_current_user)
):

    # Only candidates
    if current_user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can view applications")

    # Find applications
    applications = list(
        applications_collection.find({
            "candidate_email":
                current_user["email"]
        })
    )

    # Get Job Information
    for application in applications:

        job_id = application.get(
            "job_id"
        )

        if job_id and ObjectId.is_valid(job_id):

            job = jobs_collection.find_one({
                "_id": ObjectId(job_id)
            })

            if job:

                application["job_title"] = job.get(
                    "title",
                    "Unknown Job"
                )

                application["company"] = job.get(
                    "company",
                    "Unknown Company"
                )

        # Convert MongoDB ObjectId
        application["_id"] = str(
            application["_id"]
        )

    return applications


# ==========================================
# Update Application Status
# ==========================================

@router.put("/{application_id}/status")
def update_application_status(
    application_id: str,
    status: str,
    current_user: dict = Depends(get_current_user)
):

    # Only employers can update applications
    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can update application status")

    # Check valid Application ID
    if not ObjectId.is_valid(application_id):
        raise HTTPException(status_code=400, detail="Invalid application ID")

    # Find application
    application = applications_collection.find_one({
        "_id": ObjectId(application_id)
    })

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    # Make sure this application belongs
    # to the logged-in employer
    if application.get("employer_email") != current_user["email"]:
        raise HTTPException(status_code=403, detail="You cannot update this application")

    # Allowed statuses
    allowed_statuses = [
        "Pending",
        "Shortlisted",
        "Rejected",
        "Accepted"
    ]

    if status not in allowed_statuses:
        raise HTTPException(status_code=422, detail="Invalid application status")

    # Update status
    applications_collection.update_one(
        {
            "_id":
                ObjectId(application_id)
        },
        {
            "$set": {
                "status":
                    status
            }
        }
    )

    # Response
    return {

        "message":
            f"Application marked as {status}",

        "application_id":
            application_id,

        "status":
            status
    }
