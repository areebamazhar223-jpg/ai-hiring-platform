import { useEffect, useState } from "react";

import {
  getEmployerDashboard,
  updateApplicationStatus,
  deleteJob,
  updateJob,
  downloadApplicantResume,
} from "../services/api";


function EmployerDashboard({ setPage }) {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  const [updatingApplication, setUpdatingApplication] =
    useState(null);

  const [statusError, setStatusError] =
    useState("");

  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");


  // ==========================================
  // EDIT JOB STATES
  // ==========================================

  const [editingJob, setEditingJob] =
    useState(null);

  const [editJobData, setEditJobData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full Time",
    category: "Technology",
    description: "",
    skills: "",
  });

  const [updatingJob, setUpdatingJob] =
    useState(false);

  const [jobUpdateError, setJobUpdateError] =
    useState("");

  const [jobUpdateMessage, setJobUpdateMessage] =
    useState("");


  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  const loadDashboard = async () => {

    try {

      const data = await getEmployerDashboard();

      console.log(
        "Employer Dashboard:",
        data
      );

      setDashboard(data);

    } catch (error) {

      console.error(
        "Employer Dashboard Error:",
        error
      );

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    // loadDashboard awaits the API before updating component state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();

  }, []);


  // ==========================================
  // VIEW CANDIDATE
  // ==========================================

  const handleViewCandidate = (application) => {

    setSelectedCandidate(application);

    setStatusError("");
    setResumeError("");

  };


  // ==========================================
  // CLOSE CANDIDATE
  // ==========================================

  const closeCandidate = () => {

    setSelectedCandidate(null);

    setStatusError("");

  };

  const handleResumeDownload = async () => {
    if (!selectedCandidate?._id) return;
    setResumeLoading(true);
    setResumeError("");
    try {
      const file = await downloadApplicantResume(selectedCandidate._id);
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedCandidate.cv_filename || "candidate-cv.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (downloadError) {
      setResumeError(downloadError.message || "Unable to download this CV.");
    } finally {
      setResumeLoading(false);
    }
  };


  // ==========================================
  // UPDATE APPLICATION STATUS
  // ==========================================

  const handleStatusUpdate = async (
    applicationId,
    status
  ) => {

    try {

      setUpdatingApplication(applicationId);

      setStatusError("");

      const result =
        await updateApplicationStatus(
          applicationId,
          status
        );

      console.log(
        "Status Updated:",
        result
      );


      setDashboard((previousDashboard) => {

        if (!previousDashboard) {
          return previousDashboard;
        }

        const updatedApplications =
          previousDashboard.applications.map(
            (application) => {

              if (
                application._id ===
                applicationId
              ) {

                return {
                  ...application,
                  status: status,
                };

              }

              return application;

            }
          );


        const pendingCount =
          updatedApplications.filter(
            (application) =>
              application.status ===
              "Pending"
          ).length;


        const shortlistedCount =
          updatedApplications.filter(
            (application) =>
              application.status ===
              "Shortlisted"
          ).length;


        return {

          ...previousDashboard,

          applications:
            updatedApplications,

          statistics: {

            ...previousDashboard.statistics,

            pending_applications:
              pendingCount,

            shortlisted:
              shortlistedCount,

          },

        };

      });


      setSelectedCandidate(
        (previousCandidate) => {

          if (
            !previousCandidate ||
            previousCandidate._id !==
              applicationId
          ) {

            return previousCandidate;

          }


          return {

            ...previousCandidate,

            status: status,

          };

        }
      );


    } catch (error) {

      console.error(
        "Status Update Error:",
        error
      );

      setStatusError(
        error.message ||
        "Failed to update application status."
      );

    } finally {

      setUpdatingApplication(null);

    }

  };


  // ==========================================
  // DELETE JOB
  // ==========================================

  const handleDeleteJob = async (jobId) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this job?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await deleteJob(jobId);


      setDashboard((previousDashboard) => {

        if (!previousDashboard) {
          return previousDashboard;
        }


        const updatedJobs =
          previousDashboard.jobs.filter(
            (job) =>
              job._id !== jobId
          );


        return {

          ...previousDashboard,

          jobs: updatedJobs,

          statistics: {

            ...previousDashboard.statistics,

            total_jobs:
              updatedJobs.length,

          },

        };

      });


    } catch (error) {

      console.error(
        "Delete Job Error:",
        error
      );

      alert(
        error.message ||
        "Failed to delete job."
      );

    }

  };


  // ==========================================
  // EDIT JOB
  // ==========================================

  const handleEditJob = (job) => {

    setEditingJob(job);

    setJobUpdateError("");

    setJobUpdateMessage("");


    setEditJobData({

      title:
        job.title || "",

      company:
        job.company || "",

      location:
        job.location || "",

      job_type:
        job.job_type || "Full Time",

      category:
        job.category || "Technology",

      description:
        job.description || "",

      skills:
        job.skills?.join(", ") || "",

    });

  };


  // ==========================================
  // EDIT JOB INPUT CHANGE
  // ==========================================

  const handleEditJobChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setEditJobData(
      (previousData) => ({

        ...previousData,

        [name]: value,

      })
    );

  };


  // ==========================================
  // UPDATE JOB
  // ==========================================

  const handleUpdateJob = async (e) => {

    e.preventDefault();


    if (!editingJob) {
      return;
    }


    try {

      setUpdatingJob(true);

      setJobUpdateError("");

      setJobUpdateMessage("");


      const jobData = {

        title:
          editJobData.title,

        company:
          editJobData.company,

        location:
          editJobData.location,

        job_type:
          editJobData.job_type,

        category:
          editJobData.category,

        description:
          editJobData.description,

        skills:
          editJobData.skills
            .split(",")
            .map(
              (skill) =>
                skill.trim()
            )
            .filter(
              (skill) =>
                skill !== ""
            ),

      };


      const result =
        await updateJob(
          editingJob._id,
          jobData
        );


      console.log(
        "Job Updated:",
        result
      );


      setJobUpdateMessage(
        result.message ||
        "Job updated successfully!"
      );


      await loadDashboard();


      setTimeout(() => {

        setEditingJob(null);

      }, 1000);


    } catch (error) {

      console.error(
        "Update Job Error:",
        error
      );


      setJobUpdateError(
        error.message ||
        "Failed to update job."
      );

    } finally {

      setUpdatingJob(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <h3>
          Loading employer dashboard...
        </h3>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>

    );

  }


  return (

    <div className="dashboard-page py-5">

      <div className="container">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>

            <h1 className="fw-bold mb-2">
              Employer Dashboard
            </h1>

            <p className="text-muted mb-0">
              Manage your jobs and review candidate applications.
            </p>

          </div>


          <button
            className="post-job-dashboard-btn"
            onClick={() =>
              setPage("post-job")
            }
          >
            + Post New Job
          </button>

        </div>


        {/* ==========================================
            PROFILE
        ========================================== */}

        <div className="dashboard-card mb-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h4 className="fw-bold mb-1">
                Employer Profile
              </h4>

              <p className="text-muted mb-0">
                Your account information
              </p>

            </div>


            <div className="profile-avatar">

              {dashboard?.employer?.name
                ?.charAt(0)
                ?.toUpperCase() || "E"}

            </div>

          </div>


          <div className="row g-4">

            <div className="col-md-6">

              <div className="profile-info">

                <span>Name</span>

                <strong>
                  {dashboard?.employer?.name ||
                    "Not available"}
                </strong>

              </div>

            </div>


            <div className="col-md-6">

              <div className="profile-info">

                <span>Email</span>

                <strong>
                  {dashboard?.employer?.email ||
                    "Not available"}
                </strong>

              </div>

            </div>


            <div className="col-md-6">

              <div className="profile-info">

                <span>Account Type</span>

                <strong className="text-capitalize">

                  {dashboard?.employer?.role ||
                    "Employer"}

                </strong>

              </div>

            </div>


            <div className="col-md-6">

              <div className="profile-info">

                <span>Profile Status</span>

                <strong className="text-success">
                  Active
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="row g-4 mb-5">

          <div className="col-md-3">

            <div className="dashboard-stat-card">

              <span>Total Jobs</span>

              <h2>
                {dashboard?.statistics?.total_jobs ||
                  0}
              </h2>

            </div>

          </div>


          <div className="col-md-3">

            <div className="dashboard-stat-card">

              <span>Applications</span>

              <h2>
                {dashboard?.statistics?.total_applications ||
                  0}
              </h2>

            </div>

          </div>


          <div className="col-md-3">

            <div className="dashboard-stat-card">

              <span>Pending</span>

              <h2>
                {dashboard?.statistics?.pending_applications ||
                  0}
              </h2>

            </div>

          </div>


          <div className="col-md-3">

            <div className="dashboard-stat-card">

              <span>Shortlisted</span>

              <h2>
                {dashboard?.statistics?.shortlisted ||
                  0}
              </h2>

            </div>

          </div>

        </div>


        {/* ==========================================
            MY JOBS
        ========================================== */}

        <div className="dashboard-card mb-4">

          <h4 className="fw-bold mb-2">
            My Jobs
          </h4>

          <p className="text-muted mb-4">
            Jobs posted by your company.
          </p>


          {!dashboard?.jobs ||
          dashboard.jobs.length === 0 ? (

            <p className="text-muted">
              You have not posted any jobs yet.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>Job</th>

                    <th>Company</th>

                    <th>Location</th>

                    <th>Skills</th>

                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {dashboard.jobs.map(
                    (job) => (

                      <tr key={job._id}>

                        <td>
                          <strong>
                            {job.title}
                          </strong>
                        </td>

                        <td>
                          {job.company}
                        </td>

                        <td>
                          {job.location ||
                            "Remote"}
                        </td>

                        <td>

                          <div className="d-flex flex-wrap gap-2">

                            {job.skills?.map(
                              (skill, index) => (

                                <span
                                  key={index}
                                  className="skill-badge"
                                >
                                  {skill}
                                </span>

                              )
                            )}

                          </div>

                        </td>

                        <td>

                          <div className="d-flex gap-2">

                            <button
                              className="edit-job-btn"
                              onClick={() =>
                                handleEditJob(job)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-job-btn"
                              onClick={() =>
                                handleDeleteJob(
                                  job._id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>
        {/* ==========================================
            EDIT JOB FORM
        ========================================== */}

        {editingJob && (

          <div className="dashboard-card edit-job-card mb-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <span className="edit-job-label">
                  EMPLOYER
                </span>

                <h3 className="fw-bold mt-2 mb-1">
                  Edit Job
                </h3>

                <p className="text-muted mb-0">
                  Update your job information.
                </p>

              </div>


              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setEditingJob(null);
                  setJobUpdateError("");
                  setJobUpdateMessage("");
                }}
              >
                Close
              </button>

            </div>


            <form onSubmit={handleUpdateJob}>

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
                    value={editJobData.title}
                    onChange={handleEditJobChange}
                    placeholder="e.g. MERN Stack Developer"
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
                    value={editJobData.company}
                    onChange={handleEditJobChange}
                    placeholder="Company name"
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
                    value={editJobData.location}
                    onChange={handleEditJobChange}
                    placeholder="Remote / Lahore / Islamabad"
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
                    value={editJobData.job_type}
                    onChange={handleEditJobChange}
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
                    value={editJobData.category}
                    onChange={handleEditJobChange}
                  >

                    <option value="Technology">
                      Technology
                    </option>

                    <option value="AI">
                      AI
                    </option>

                    <option value="Software Development">
                      Software Development
                    </option>

                    <option value="Web Development">
                      Web Development
                    </option>

                    <option value="Data Science">
                      Data Science
                    </option>

                    <option value="Marketing">
                      Marketing
                    </option>

                    <option value="Design">
                      Design
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
                    value={editJobData.skills}
                    onChange={handleEditJobChange}
                    placeholder="React, Node.js, MongoDB, Python"
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
                    value={editJobData.description}
                    onChange={handleEditJobChange}
                    placeholder="Write the job description..."
                    rows="6"
                    required
                  />

                </div>


                {/* ERROR */}

                {jobUpdateError && (

                  <div className="col-12">

                    <div className="alert alert-danger mb-0">
                      {jobUpdateError}
                    </div>

                  </div>

                )}


                {/* SUCCESS */}

                {jobUpdateMessage && (

                  <div className="col-12">

                    <div className="alert alert-success mb-0">
                      {jobUpdateMessage}
                    </div>

                  </div>

                )}


                {/* UPDATE BUTTON */}

                <div className="col-12">

                  <button
                    type="submit"
                    className="update-job-btn"
                    disabled={updatingJob}
                  >

                    {updatingJob
                      ? "Updating Job..."
                      : "Update Job"}

                  </button>

                </div>

              </div>

            </form>

          </div>

        )}
        {/* ==========================================
            CANDIDATE DETAILS
        ========================================== */}

        {selectedCandidate && (

          <div className="dashboard-card candidate-details-card mb-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <span className="candidate-details-label">
                  CANDIDATE PROFILE
                </span>

                <h3 className="fw-bold mt-2 mb-1">
                  {selectedCandidate.candidate_name ||
                    "Candidate"}
                </h3>

                <p className="text-muted mb-0">
                  {selectedCandidate.candidate_email}
                </p>

                {selectedCandidate.cv_filename && (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mt-3"
                    onClick={handleResumeDownload}
                    disabled={resumeLoading}
                  >
                    {resumeLoading ? "Preparing CV…" : "Download CV"}
                  </button>
                )}

                {resumeError && (
                  <p className="text-danger small mt-2 mb-0" role="alert">
                    {resumeError}
                  </p>
                )}

              </div>


              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={closeCandidate}
              >
                Close
              </button>

            </div>


            <hr />


            <div className="row g-4">

              {/* APPLIED JOB */}

              <div className="col-md-6">

                <div className="candidate-info-box">

                  <span>
                    Applied For
                  </span>

                  <strong>
                    {selectedCandidate.job_title ||
                      "Unknown Job"}
                  </strong>

                </div>

              </div>


              {/* AI MATCH */}

              <div className="col-md-6">

                <div className="candidate-info-box">

                  <span>
                    AI Match
                  </span>

                  <strong className="text-success">

                    {selectedCandidate.match_percentage !==
                      null &&
                    selectedCandidate.match_percentage !==
                      undefined
                      ? `${selectedCandidate.match_percentage}%`
                      : "Not analyzed"}

                  </strong>

                </div>

              </div>

            </div>


            {/* CANDIDATE SKILLS */}

            <div className="mt-4">

              <h6 className="fw-bold mb-3">
                Candidate Skills
              </h6>

              <div className="d-flex flex-wrap gap-2">

                {selectedCandidate.candidate_skills?.length >
                0 ? (

                  selectedCandidate.candidate_skills.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="skill-badge"
                      >
                        {skill}
                      </span>

                    )
                  )

                ) : (

                  <p className="text-muted">
                    No skills detected from CV.
                  </p>

                )}

              </div>

            </div>


            {/* APPLICATION STATUS */}

            <div className="mt-4">

              <h6 className="fw-bold mb-2">
                Application Status
              </h6>


              <span
                className={
                  selectedCandidate.status ===
                  "Shortlisted"
                    ? "badge bg-success"
                    : selectedCandidate.status ===
                      "Rejected"
                    ? "badge bg-danger"
                    : selectedCandidate.status ===
                      "Accepted"
                    ? "badge bg-primary"
                    : "badge bg-warning text-dark"
                }
              >
                {selectedCandidate.status}
              </span>

            </div>


            {/* STATUS ERROR */}

            {statusError && (

              <div className="alert alert-danger mt-4">
                {statusError}
              </div>

            )}


            {/* ACTION BUTTONS */}

            <div className="candidate-action-buttons mt-4">

              <button
                type="button"
                className="shortlist-candidate-btn"
                onClick={() =>
                  handleStatusUpdate(
                    selectedCandidate._id,
                    "Shortlisted"
                  )
                }
                disabled={
                  updatingApplication ===
                  selectedCandidate._id
                }
              >

                {updatingApplication ===
                selectedCandidate._id
                  ? "Updating..."
                  : "✓ Shortlist Candidate"}

              </button>


              <button
                type="button"
                className="reject-candidate-btn"
                onClick={() =>
                  handleStatusUpdate(
                    selectedCandidate._id,
                    "Rejected"
                  )
                }
                disabled={
                  updatingApplication ===
                  selectedCandidate._id
                }
              >

                {updatingApplication ===
                selectedCandidate._id
                  ? "Updating..."
                  : "✕ Reject Candidate"}

              </button>

            </div>

          </div>

        )}


        {/* ==========================================
            CANDIDATE APPLICATIONS
        ========================================== */}

        <div className="dashboard-card">

          <h4 className="fw-bold mb-2">
            Candidate Applications
          </h4>

          <p className="text-muted mb-4">
            Review candidates who applied to your jobs.
          </p>


          {!dashboard?.applications ||
          dashboard.applications.length === 0 ? (

            <p className="text-muted">
              No applications received yet.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>Job</th>

                    <th>Candidate</th>

                    <th>Skills</th>

                    <th>Status</th>

                    <th>AI Match</th>

                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {dashboard.applications.map(
                    (application) => (

                      <tr
                        key={application._id}
                      >

                        {/* JOB */}

                        <td>

                          <strong>
                            {application.job_title ||
                              "Unknown Job"}
                          </strong>

                        </td>


                        {/* CANDIDATE */}

                        <td>

                          <div>

                            <strong>
                              {application.candidate_name ||
                                "Candidate"}
                            </strong>

                            <small className="d-block text-muted">
                              {application.candidate_email}
                            </small>

                          </div>

                        </td>


                        {/* SKILLS */}

                        <td>

                          <div className="d-flex flex-wrap gap-1">

                            {application.candidate_skills
                              ?.slice(0, 4)
                              .map(
                                (skill, index) => (

                                  <span
                                    key={index}
                                    className="skill-badge"
                                  >
                                    {skill}
                                  </span>

                                )
                              )}


                            {application.candidate_skills
                              ?.length > 4 && (

                              <span className="more-skills-badge">

                                +
                                {application.candidate_skills.length -
                                  4}

                              </span>

                            )}

                          </div>

                        </td>


                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              application.status ===
                              "Shortlisted"
                                ? "badge bg-success"
                                : application.status ===
                                  "Rejected"
                                ? "badge bg-danger"
                                : application.status ===
                                  "Accepted"
                                ? "badge bg-primary"
                                : "badge bg-warning text-dark"
                            }
                          >
                            {application.status}
                          </span>

                        </td>


                        {/* AI MATCH */}

                        <td>

                          {application.match_percentage !==
                            null &&
                          application.match_percentage !==
                            undefined
                            ? `${application.match_percentage}%`
                            : "Not analyzed"}

                        </td>


                        {/* ACTION */}

                        <td>

                          <button
                            type="button"
                            className="view-candidate-btn"
                            onClick={() =>
                              handleViewCandidate(
                                application
                              )
                            }
                          >
                            View Candidate
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>


      </div>

    </div>

  );

}


export default EmployerDashboard;
