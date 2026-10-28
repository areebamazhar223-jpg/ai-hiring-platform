from pydantic import BaseModel


class User(BaseModel):
    name: str
    email: str
    password: str
    role: str


class Job(BaseModel):
    title: str
    company: str
    location: str
    description: str
    skills: list[str]


class Application(BaseModel):
    job_id: int
    candidate_email: str