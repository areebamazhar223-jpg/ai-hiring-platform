import { useState } from "react";
import { createJob } from "../services/api";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full Time",
    category: "Technology",
    description: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        description: formData.description,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        job_type: formData.job_type,
        category: formData.category,
      };

      const data = await createJob(jobData);

      console.log("Job Created:", data);

      setMessage(
        data.message || "Job posted successfully!"
      );

      setFormData({
        title: "",
        company: "",
        location: "",
        job_type: "Full Time",
        category: "Technology",
        description: "",
        skills: "",
      });

    } catch (error) {
      console.error("Create Job Error:", error);

      setError(
        error.message || "Failed to create job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page py-5">
      <div className="container">

        {/* HEADER */}

        <div className="mb-5">

          <span className="d-block text-success fw-semibold mb-2">
            EMPLOYER
          </span>

          <h1 className="fw-bold">
            Post a New Job
          </h1>

          <p className="text-muted">
            Create a job opportunity and find the right
            candidate with AI-powered matching.
          </p>

        </div>


        {/* FORM */}

        <div className="post-job-card">

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* JOB TITLE */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g. MERN Stack Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* COMPANY */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  className="form-control"
                  placeholder="e.g. Tech Solutions"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* LOCATION */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g. Remote / Lahore"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* JOB TYPE */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Job Type
                </label>

                <select
                  name="job_type"
                  className="form-select"
                  value={formData.job_type}
                  onChange={handleChange}
                >
                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                </select>

              </div>


              {/* CATEGORY */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Category
                </label>

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option value="Technology">
                    Technology
                  </option>

                  <option value="Software Development">
                    Software Development
                  </option>

                  <option value="Design">
                    Design
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* SKILLS */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Required Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  className="form-control"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />

                <small className="text-muted">
                  Separate skills with commas.
                </small>

              </div>


              {/* DESCRIPTION */}

              <div className="col-12">

                <label className="form-label fw-semibold">
                  Job Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="7"
                  placeholder="Describe the role, responsibilities and requirements..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* MESSAGES */}

              {message && (
                <div className="col-12">

                  <div className="alert alert-success">
                    {message}
                  </div>

                </div>
              )}


              {error && (
                <div className="col-12">

                  <div className="alert alert-danger">
                    {error}
                  </div>

                </div>
              )}


              {/* SUBMIT */}

              <div className="col-12">

                <button
                  type="submit"
                  className="post-job-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Posting Job..."
                    : "Post Job →"}
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default PostJob;
