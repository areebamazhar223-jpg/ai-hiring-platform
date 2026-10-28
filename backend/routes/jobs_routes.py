from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from database import jobs_collection
from schemas import JobCreate
from auth import get_current_user


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


# ==========================================
# Employer: Create a New Job
# ==========================================

@router.post("/")
def create_job(
    job: JobCreate,
    current_user: dict = Depends(get_current_user)
):

    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can create jobs")

    job_data = {
        "title": job.title,
        "company": job.company,
        "location": job.location,
        "description": job.description,
        "skills": job.skills,
        "job_type": job.job_type,
        "category": job.category,
        "employer_email": current_user["email"],
        "created_by": current_user["email"]
    }

    result = jobs_collection.insert_one(job_data)

    return {
        "message": "Job created successfully",
        "job_id": str(result.inserted_id)
    }


# ==========================================
# Get All Jobs
# ==========================================

@router.get("/")
def get_jobs():

    jobs = list(
        jobs_collection.find()
    )

    for job in jobs:
        job["_id"] = str(job["_id"])
        job.pop("employer_email", None)
        job.pop("created_by", None)

    return jobs


# ==========================================
# Employer: Update Job
# ==========================================

@router.put("/{job_id}")
def update_job(
    job_id: str,
    job: JobCreate,
    current_user: dict = Depends(get_current_user)
):

    # Check employer
    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can update jobs")


    # Check valid ObjectId
    if not ObjectId.is_valid(job_id):
        raise HTTPException(status_code=400, detail="Invalid job ID")


    # Find existing job
    existing_job = jobs_collection.find_one({
        "_id": ObjectId(job_id)
    })


    if not existing_job:
        raise HTTPException(status_code=404, detail="Job not found")


    # Make sure this employer owns the job
    if existing_job.get("employer_email") != current_user["email"]:
        raise HTTPException(status_code=403, detail="You cannot update this job")


    # Updated job data
    updated_data = {

        "title": job.title,

        "company": job.company,

        "location": job.location,

        "description": job.description,

        "skills": job.skills,

        "job_type": job.job_type,

        "category": job.category

    }


    # Update MongoDB
    jobs_collection.update_one(

        {
            "_id": ObjectId(job_id)
        },

        {
            "$set": updated_data
        }

    )


    return {

        "message": "Job updated successfully",

        "job_id": job_id

    }


# ==========================================
# Employer: Delete Job
# ==========================================

@router.delete("/{job_id}")
def delete_job(
    job_id: str,
    current_user: dict = Depends(get_current_user)
):

    # Check employer
    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can delete jobs")


    # Check valid ObjectId
    if not ObjectId.is_valid(job_id):
        raise HTTPException(status_code=400, detail="Invalid job ID")


    # Find job
    job = jobs_collection.find_one({
        "_id": ObjectId(job_id)
    })


    if not job:
        raise HTTPException(status_code=404, detail="Job not found")


    # Make sure employer owns this job
    if job.get("employer_email") != current_user["email"]:
        raise HTTPException(status_code=403, detail="You cannot delete this job")


    # Delete job
    result = jobs_collection.delete_one({

        "_id": ObjectId(job_id)

    })


    if result.deleted_count == 0:
        raise HTTPException(status_code=409, detail="Job could not be deleted")


    return {

        "message": "Job deleted successfully",

        "job_id": job_id

    }
