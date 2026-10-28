from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


# ==========================================
# USER
# ==========================================

class UserCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: Literal["candidate", "employer"]

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower()


# ==========================================
# LOGIN
# ==========================================

class UserLogin(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.lower()


# ==========================================
# JOBS
# ==========================================

class JobCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=3, max_length=160)
    company: str = Field(min_length=2, max_length=160)
    location: str = Field(min_length=2, max_length=160)
    description: str = Field(min_length=20, max_length=10000)
    skills: list[str] = Field(min_length=1, max_length=40)

    # Employer job details
    job_type: str = Field(default="Full Time", max_length=60)
    category: str = Field(default="Technology", max_length=80)

    @field_validator("skills")
    @classmethod
    def normalize_skills(cls, value: list[str]) -> list[str]:
        cleaned = []
        seen = set()
        for skill in value:
            skill = skill.strip()
            normalized = skill.casefold()
            if skill and normalized not in seen:
                cleaned.append(skill)
                seen.add(normalized)
        if not cleaned:
            raise ValueError("Add at least one non-empty skill")
        return cleaned


# ==========================================
# APPLICATIONS
# ==========================================

class ApplicationCreate(BaseModel):
    job_id: str = Field(min_length=24, max_length=24)


# ==========================================
# AI JOB MATCHING
# ==========================================

class JobMatchRequest(BaseModel):
    job_id: str = Field(min_length=24, max_length=24)
