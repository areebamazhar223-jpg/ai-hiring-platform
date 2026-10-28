from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from bson import ObjectId
from pathlib import Path
from uuid import uuid4
import os

from services.cv_parser import extract_text_from_pdf
from services.ai_service import analyze_cv
from database import applications_collection, users_collection
from auth import get_current_user


router = APIRouter(
    prefix="/cv",
    tags=["CV"]
)


UPLOAD_FOLDER = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
MAX_CV_SIZE = int(os.getenv("MAX_CV_SIZE_BYTES", str(5 * 1024 * 1024)))


@router.post("/upload")
async def upload_cv(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):

    # ==========================================
    # Only candidates can upload CV
    # ==========================================

    if current_user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can upload a CV")

    # ==========================================
    # Check file type
    # ==========================================

    if not file.filename or Path(file.filename).suffix.lower() != ".pdf":
        raise HTTPException(status_code=415, detail="Only PDF files are supported")

    # ==========================================
    # Save PDF
    # ==========================================

    file_content = await file.read(MAX_CV_SIZE + 1)
    if len(file_content) > MAX_CV_SIZE:
        maximum_mb = max(1, MAX_CV_SIZE // (1024 * 1024))
        raise HTTPException(status_code=413, detail=f"CV must be {maximum_mb} MB or smaller")
    if not file_content.startswith(b"%PDF-"):
        raise HTTPException(status_code=415, detail="The uploaded file is not a valid PDF")

    storage_name = f"{uuid4().hex}.pdf"
    file_path = UPLOAD_FOLDER / storage_name
    file_path.write_bytes(file_content)

    # ==========================================
    # Extract CV text
    # ==========================================

    try:
        cv_text = extract_text_from_pdf(str(file_path))
    except Exception as exc:
        file_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="Could not read text from this PDF") from exc
    if not cv_text.strip():
        file_path.unlink(missing_ok=True)
        raise HTTPException(status_code=422, detail="This PDF contains no extractable text")

    # ==========================================
    # Analyze CV
    # ==========================================

    cv_analysis = analyze_cv(
        cv_text
    )

    # ==========================================
    # Save CV data to candidate
    # ==========================================

    previous_candidate = users_collection.find_one(
        {"email": current_user["email"]}, {"cv_storage_name": 1}
    ) or {}
    try:
        users_collection.update_one(
            {"email": current_user["email"]},
            {"$set": {
                "cv_filename": file.filename,
                "cv_storage_name": storage_name,
                "cv_text": cv_text,
                "cv_skills": cv_analysis["skills"],
            }},
        )
    except Exception:
        file_path.unlink(missing_ok=True)
        raise

    old_storage_name = previous_candidate.get("cv_storage_name")
    if old_storage_name and old_storage_name != storage_name:
        old_path = UPLOAD_FOLDER / old_storage_name
        if old_path.parent == UPLOAD_FOLDER:
            old_path.unlink(missing_ok=True)

    # ==========================================
    # Response
    # ==========================================

    return {
        "message": "CV uploaded and saved successfully",

        "filename": file.filename,

        "skills": cv_analysis["skills"],

        "summary": cv_analysis["summary"],

        "cv_length": cv_analysis["cv_length"]
    }


@router.get("/applications/{application_id}/resume")
def download_applicant_resume(
    application_id: str,
    current_user: dict = Depends(get_current_user),
):
    if current_user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can view applicant CVs")
    if not ObjectId.is_valid(application_id):
        raise HTTPException(status_code=400, detail="Invalid application ID")

    application = applications_collection.find_one({"_id": ObjectId(application_id)})
    if not application or application.get("employer_email") != current_user["email"]:
        raise HTTPException(status_code=404, detail="Application or CV not found")

    candidate = users_collection.find_one({"email": application.get("candidate_email")}) or {}
    storage_name = candidate.get("cv_storage_name")
    if not storage_name or Path(storage_name).name != storage_name:
        raise HTTPException(status_code=404, detail="Candidate has not uploaded a CV")

    file_path = UPLOAD_FOLDER / storage_name
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="CV file is no longer available")

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=Path(candidate.get("cv_filename") or "candidate-cv.pdf").name,
    )
