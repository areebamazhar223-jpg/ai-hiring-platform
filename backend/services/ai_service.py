def analyze_cv(cv_text: str):

    text = cv_text.lower()

    possible_skills = [
        "javascript",
        "typescript",
        "react",
        "node.js",
        "express",
        "mongodb",
        "python",
        "fastapi",
        "django",
        "html",
        "css",
        "bootstrap",
        "tailwind",
        "git",
        "github",
        "rest api",
        "graphql",
        "sql",
        "mysql",
        "postgresql",
        "c++"
    ]

    detected_skills = []

    for skill in possible_skills:
        if skill.lower() in text:
            detected_skills.append(skill)

    return {
        "message": "CV analyzed successfully",
        "skills": detected_skills,
        "summary": "Skills were detected from the uploaded CV.",
        "cv_length": len(cv_text)
    }


def match_job(
    candidate_skills: list[str],
    job_skills: list[str]
):

    matched_skills = []

    for skill in candidate_skills:
        if skill.lower().strip() in [
            job_skill.lower().strip()
            for job_skill in job_skills
        ]:
            matched_skills.append(skill)

    return {
        "matched_skills": matched_skills,
        "total_matched": len(matched_skills)
    }


def generate_interview_questions(job_title: str):

    return {
        "job": job_title,
        "questions": [
            "Tell me about yourself.",
            "What projects have you worked on?",
            "What are your strongest technical skills?"
        ]
    }