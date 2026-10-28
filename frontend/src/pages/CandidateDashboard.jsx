import { useEffect, useState } from "react";

import {
  getCandidateDashboard,
  uploadCV,
  getMyApplications,
} from "../services/api";


function CandidateDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [applications, setApplications] = useState([]);

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [applicationsLoading, setApplicationsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [applicationsError, setApplicationsError] =
    useState("");

  const [uploading, setUploading] = useState(false);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [uploadError, setUploadError] =
    useState("");


  /* =========================
     LOAD DASHBOARD
  ========================= */

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data =
          await getCandidateDashboard();

        console.log(
          "Candidate Dashboard:",
          data
        );

        setDashboard(data);

      } catch (error) {

        console.error(error);

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);


  /* =========================
     LOAD MY APPLICATIONS
  ========================= */

  useEffect(() => {

    const loadApplications = async () => {

      try {

        const data =
          await getMyApplications();

        console.log(
          "My Applications:",
          data
        );

        setApplications(data);

      } catch (error) {

        console.error(
          "Applications Error:",
          error
        );

        setApplicationsError(
          error.message
        );

      } finally {

        setApplicationsLoading(false);

      }

    };

    loadApplications();

  }, []);


  /* =========================
     CV UPLOAD
  ========================= */

  const handleCVUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setUploading(true);

    setUploadMessage("");

    setUploadError("");


    try {

      const data =
        await uploadCV(file);

      console.log(
        "CV Upload:",
        data
      );


      setUploadMessage(
        `CV uploaded successfully! Skills found: ${
          data.skills?.join(", ") ||
          "No skills detected"
        }`
      );


      const updatedDashboard =
        await getCandidateDashboard();

      setDashboard(
        updatedDashboard
      );


    } catch (error) {

      console.error(error);

      setUploadError(
        error.message
      );

    } finally {

      setUploading(false);

    }

  };


  /* =========================
     VIEW APPLICATION DETAILS
  ========================= */

  const handleViewDetails = (application) => {

    setSelectedApplication(
      application
    );

  };


  /* =========================
     CLOSE APPLICATION DETAILS
  ========================= */

  const handleCloseDetails = () => {

    setSelectedApplication(null);

  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <h3>
          Loading dashboard...
        </h3>

      </div>

    );

  }


  /* =========================
     ERROR
  ========================= */

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


        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-5">

          <h1 className="fw-bold">
            Candidate Dashboard
          </h1>

          <p className="text-muted">
            Track your applications and
            job opportunities.
          </p>

        </div>


        {/* =========================
            PROFILE
        ========================= */}

        <div className="dashboard-card mb-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h4 className="fw-bold mb-1">
                Candidate Profile
              </h4>

              <p className="text-muted mb-0">
                Your account information
              </p>

            </div>

            <div className="profile-avatar">
              {dashboard?.candidate?.email
                ?.charAt(0)
                ?.toUpperCase() || "C"}
            </div>

          </div>


          <div className="row g-4">

            {/* Email */}

            <div className="col-md-6">

              <div className="profile-info">

                <span>
                  Email
                </span>

                <strong>
                  {
                    dashboard?.candidate?.email ||
                    "Not available"
                  }
                </strong>

              </div>

            </div>


            {/* Role */}

            <div className="col-md-6">

              <div className="profile-info">

                <span>
                  Account Type
                </span>

                <strong className="text-capitalize">
                  {
                    dashboard?.candidate?.role ||
                    "Candidate"
                  }
                </strong>

              </div>

            </div>


            {/* CV Skills Count */}

            <div className="col-md-6">

              <div className="profile-info">

                <span>
                  Detected Skills
                </span>

                <strong>

                  {
                    dashboard?.candidate?.cv_skills
                      ?.length || 0
                  }

                </strong>

              </div>

            </div>


            {/* Profile Status */}

            <div className="col-md-6">

              <div className="profile-info">

                <span>
                  Profile Status
                </span>

                <strong className="text-success">
                  Active
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            STATS
        ========================= */}

        <div className="row g-4 mb-5">


          {/* Total Applications */}

          <div className="col-md-4">

            <div className="dashboard-stat-card">

              <span>
                Total Applications
              </span>

              <h2>

                {
                  dashboard?.statistics
                    ?.total_applications || 0
                }

              </h2>

            </div>

          </div>


          {/* Pending Applications */}

          <div className="col-md-4">

            <div className="dashboard-stat-card">

              <span>
                Pending Applications
              </span>

              <h2>

                {
                  dashboard?.statistics
                    ?.pending || 0
                }

              </h2>

            </div>

          </div>


          {/* Shortlisted */}

          <div className="col-md-4">

            <div className="dashboard-stat-card">

              <span>
                Shortlisted
              </span>

              <h2>

                {
                  dashboard?.statistics
                    ?.shortlisted || 0
                }

              </h2>

            </div>

          </div>

        </div>


        {/* =========================
            APPLICATION DETAILS
        ========================= */}

        {selectedApplication && (

          <div className="dashboard-card mb-4">

            <div className="d-flex justify-content-between align-items-start">

              <div>

                <h3 className="fw-bold mb-2">

                  {
                    selectedApplication.job_title
                  }

                </h3>

                <p className="text-primary fw-semibold">

                  {
                    selectedApplication.company
                  }

                </p>

              </div>


              <button
                className="btn btn-outline-secondary"
                onClick={
                  handleCloseDetails
                }
              >
                Close
              </button>

            </div>


            <hr />


            {/* Status */}

            <div className="mb-4">

              <h6 className="fw-bold">
                Application Status
              </h6>

              <span
                className={
                  selectedApplication.status ===
                  "Shortlisted"

                    ? "badge bg-success"

                    : selectedApplication.status ===
                      "Accepted"

                    ? "badge bg-primary"

                    : selectedApplication.status ===
                      "Rejected"

                    ? "badge bg-danger"

                    : "badge bg-warning text-dark"
                }
              >

                {
                  selectedApplication.status
                }

              </span>

            </div>


            {/* AI Match */}

            <div className="mb-4">

              <h6 className="fw-bold">
                AI Match
              </h6>

              <h2 className="text-success fw-bold">

                {
                  selectedApplication.match_percentage !==
                    null &&
                  selectedApplication.match_percentage !==
                    undefined

                    ? `${selectedApplication.match_percentage}%`

                    : "Not analyzed"
                }

              </h2>

            </div>


            {/* Resume */}

            <div>

              <h6 className="fw-bold">
                Resume
              </h6>

              <p className="text-muted">

                {
                  selectedApplication.resume
                    ? selectedApplication.resume
                    : "CV submitted with application"
                }

              </p>

            </div>

          </div>

        )}


        {/* =========================
            MY APPLICATIONS
        ========================= */}

        <div className="dashboard-card mb-4">

          <h4 className="fw-bold mb-2">
            My Applications
          </h4>

          <p className="text-muted mb-4">
            Track the jobs you have applied for.
          </p>


          {applicationsError && (

            <div className="alert alert-danger">

              {applicationsError}

            </div>

          )}


          {applicationsLoading ? (

            <p className="text-muted">
              Loading applications...
            </p>

          ) : applications.length === 0 ? (

            <p className="text-muted">
              You have not applied for any jobs yet.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>
                      Job
                    </th>

                    <th>
                      Company
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      AI Match
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {applications.map(
                    (application) => (

                      <tr
                        key={
                          application._id
                        }
                      >

                        {/* Job */}

                        <td>

                          <strong>
                            {
                              application.job_title
                            }
                          </strong>

                        </td>


                        {/* Company */}

                        <td>

                          {
                            application.company
                          }

                        </td>


                        {/* Status */}

                        <td>

                          <span
                            className={
                              application.status ===
                              "Shortlisted"

                                ? "badge bg-success"

                                : application.status ===
                                  "Accepted"

                                ? "badge bg-primary"

                                : application.status ===
                                  "Rejected"

                                ? "badge bg-danger"

                                : "badge bg-warning text-dark"
                            }
                          >

                            {
                              application.status
                            }

                          </span>

                        </td>


                        {/* AI Match */}

                        <td>

                          {
                            application.match_percentage !==
                              null &&
                            application.match_percentage !==
                              undefined

                              ? `${application.match_percentage}%`

                              : "Not analyzed"
                          }

                        </td>


                        {/* View Details */}

                        <td>

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              handleViewDetails(
                                application
                              )
                            }
                          >

                            View Details

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


        {/* =========================
            CV SKILLS
        ========================= */}

        <div className="dashboard-card mb-4">

          <h4 className="fw-bold mb-3">
            Your Skills
          </h4>

          <p className="text-muted">
            Skills detected from your uploaded CV.
          </p>


          <div className="d-flex flex-wrap gap-2 mt-3">

            {
              dashboard?.candidate?.cv_skills?.length > 0

              ? (

                dashboard.candidate.cv_skills.map(
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
                  No CV skills found.
                </p>

              )
            }

          </div>

        </div>


        {/* =========================
            CV SECTION
        ========================= */}

        <div className="dashboard-card">

          <h4 className="fw-bold mb-3">
            Update Your CV
          </h4>

          <p className="text-muted">
            Keep your CV updated to improve
            your AI job matching.
          </p>


          <label className="btn btn-primary">

            {
              uploading
                ? "Uploading..."
                : "Upload CV"
            }

            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={
                handleCVUpload
              }
              disabled={uploading}
            />

          </label>


          {uploadMessage && (

            <div className="alert alert-success mt-4">

              {uploadMessage}

            </div>

          )}


          {uploadError && (

            <div className="alert alert-danger mt-4">

              {uploadError}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default CandidateDashboard;