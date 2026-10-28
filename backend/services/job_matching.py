def calculate_match(
    candidate_skills: list[str],
    job_skills: list[str]
):

    candidate_by_key = {
        skill.strip().casefold(): skill.strip()
        for skill in candidate_skills
        if skill and skill.strip()
    }
    unique_job_skills = {}
    for skill in job_skills:
        if skill and skill.strip():
            unique_job_skills.setdefault(skill.strip().casefold(), skill.strip())

    matched_keys = [key for key in unique_job_skills if key in candidate_by_key]
    matched_skills = [unique_job_skills[key] for key in matched_keys]
    total_job_skills = len(unique_job_skills)

    if total_job_skills == 0:
        match_percentage = 0
    else:
        match_percentage = (
            len(matched_skills) / total_job_skills
        ) * 100

    missing_skills = [
        skill for key, skill in unique_job_skills.items()
        if key not in candidate_by_key
    ]

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": min(round(match_percentage, 2), 100)
    }
