import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import MyApplication from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  getCandidateDashboard,
  matchJob,
  applyForJob,
} from "./services/api";

function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);

  const [matchResult, setMatchResult] = useState(null);
  const [matching, setMatching] = useState(false);
  const [matchError, setMatchError] = useState("");

  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [applyError, setApplyError] = useState("");

  // AI JOB MATCH
  const handleJobMatch = async () => {
    setMatching(true);
    setMatchError("");
    setMatchResult(null);

    try {
      const dashboard = await getCandidateDashboard();
      const candidateSkills =
        dashboard?.candidate?.cv_skills || [];

      if (candidateSkills.length === 0) {
        setMatchError(
          "Please upload your CV first to check your AI match."
        );
        return;
      }

      const result = await matchJob(selectedJob?._id);

      setMatchResult(result);
    } catch (error) {
      console.error("AI Match Error:", error);
      setMatchError(
        error.message || "Unable to calculate AI match."
      );
    } finally {
      setMatching(false);
    }
  };

  // APPLY FOR JOB
  const handleApply = async () => {
    if (!selectedJob?._id) {
      setApplyError("Job information is missing.");
      return;
    }

    setApplying(true);
    setApplyMessage("");
    setApplyError("");

    try {
      const result = await applyForJob(selectedJob._id);

      setApplyMessage(
        result.message || "Application submitted successfully!"
      );
    } catch (error) {
      console.error("Application Error:", error);
      setApplyError(
        error.message || "Unable to submit application."
      );
    } finally {
      setApplying(false);
    }
  };

  // BACK TO JOBS
  const resetJobDetails = () => {
    setPage("jobs");
    setMatchResult(null);
    setMatchError("");
    setApplyMessage("");
    setApplyError("");
  };

  return (
    <>
      <Navbar
        setPage={(pageName) => {
          console.log("PAGE CHANGED:", pageName);
          setPage(pageName);
        }}
      />

      {/* HOME */}
      {page === "home" && <Home setPage={setPage} />}

      {/* LOGIN */}
      {page === "login" && <Login setPage={setPage} />}

      {/* SIGNUP */}
      {page === "signup" && <Signup setPage={setPage} />}

      {/* JOBS */}
      {page === "jobs" && (
        <Jobs
          setPage={setPage}
          setSelectedJob={setSelectedJob}
        />
      )}

      {/* JOB DETAILS */}
      {page === "job-details" && selectedJob && (
        <div className="job-details-page">
          <div className="container">
            <button
              className="job-back-btn"
              onClick={resetJobDetails}
            >
              ← Back to Jobs
            </button>

            <div className="row g-4">
              {/* LEFT SIDE */}
              <div className="col-lg-8">
                <div className="job-details-main">
                  <div className="job-details-header">
                    <div className="job-details-company-logo">
                      {selectedJob.company
                        ? selectedJob.company
                            .substring(0, 2)
                            .toUpperCase()
                        : "CO"}
                    </div>

                    <div className="job-details-header-info">
                      <span className="job-details-eyebrow">
                        JOB OPPORTUNITY
                      </span>

                      <h1>{selectedJob.title}</h1>
                      <h4>{selectedJob.company}</h4>

                      <div className="job-details-meta">
                        <span>
                          📍 {selectedJob.location || "Remote"}
                        </span>

                        {selectedJob.job_type && (
                          <span>💼 {selectedJob.job_type}</span>
                        )}

                        {selectedJob.category && (
                          <span>🏷️ {selectedJob.category}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ABOUT ROLE */}
                  <div className="job-details-section">
                    <div className="details-section-title">
                      <span>01</span>
                      <h3>About the Role</h3>
                    </div>

                    <p className="job-full-description">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* REQUIRED SKILLS */}
                  <div className="job-details-section">
                    <div className="details-section-title">
                      <span>02</span>
                      <h3>Required Skills</h3>
                    </div>

                    <div className="details-skills">
                      {selectedJob.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="details-skill"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI MATCH */}
                  <div className="ai-match-section">
                    <div className="ai-match-header">
                      <div>
                        <span className="ai-match-label">
                          AI POWERED
                        </span>

                        <h3>Check your job match</h3>
                        <p>
                          Compare your CV skills with this
                          job's requirements.
                        </p>
                      </div>

                      <div className="ai-match-icon">AI</div>
                    </div>

                    <button
                      className="ai-match-btn"
                      onClick={handleJobMatch}
                      disabled={matching}
                    >
                      {matching ? (
                        <>
                          <span className="button-spinner"></span>
                          Analyzing your skills...
                        </>
                      ) : (
                        <>
                          Check AI Match <span>→</span>
                        </>
                      )}
                    </button>
                  </div>

                  {matchError && (
                    <div className="job-alert error-alert">
                      <span>!</span>
                      {matchError}
                    </div>
                  )}

                  {/* MATCH RESULT */}
                  {matchResult && (
                    <div className="match-result-card">
                      <div className="match-result-header">
                        <div>
                          <span>AI ANALYSIS</span>
                          <h3>Your Job Match</h3>
                        </div>

                        <div className="match-percentage">
                          {matchResult.match_percentage}%
                        </div>
                      </div>

                      <div className="match-result-section">
                        <h5>✓ Matched Skills</h5>

                        <div className="result-skills">
                          {matchResult.matched_skills?.length > 0 ? (
                            matchResult.matched_skills.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="matched-skill"
                                >
                                  ✓ {skill}
                                </span>
                              )
                            )
                          ) : (
                            <p>No matching skills found.</p>
                          )}
                        </div>
                      </div>

                      <div className="match-result-section">
                        <h5>+ Skills to Improve</h5>

                        <div className="result-skills">
                          {matchResult.missing_skills?.length > 0 ? (
                            matchResult.missing_skills.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="missing-skill"
                                >
                                  + {skill}
                                </span>
                              )
                            )
                          ) : (
                            <p className="all-skills-text">
                              You have all required skills!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-4">
                <div className="job-apply-card">
                  <span className="apply-card-label">
                    READY TO APPLY?
                  </span>

                  <h3>Take the next step.</h3>

                  <p>
                    Submit your application for this opportunity
                    and track it from your dashboard.
                  </p>

                  <button
                    className="apply-job-btn"
                    onClick={handleApply}
                    disabled={applying}
                  >
                    {applying ? (
                      <>
                        <span className="button-spinner"></span>
                        Applying...
                      </>
                    ) : (
                      <>
                        Apply Now <span>→</span>
                      </>
                    )}
                  </button>

                  {applyMessage && (
                    <div className="job-alert success-alert">
                      <span>✓</span>
                      {applyMessage}
                    </div>
                  )}

                  {applyError && (
                    <div className="job-alert error-alert">
                      <span>!</span>
                      {applyError}
                    </div>
                  )}

                  <div className="apply-divider"></div>

                  <div className="job-side-info">
                    <div>
                      <span>📍</span>
                      <div>
                        <small>Location</small>
                        <strong>
                          {selectedJob.location || "Remote"}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <span>💼</span>
                      <div>
                        <small>Job Type</small>
                        <strong>
                          {selectedJob.job_type || "Full Time"}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <span>🏷️</span>
                      <div>
                        <small>Category</small>
                        <strong>
                          {selectedJob.category || "Technology"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="job-ai-info-card">
                  <div className="small-ai-icon">AI</div>
                  <h4>Smart Job Matching</h4>
                  <p>
                    Upload your CV and let HireAI compare your
                    skills with this job before you apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE DASHBOARD  (sirf candidate) */}
      {page === "dashboard" && (
        <ProtectedRoute role="candidate" setPage={setPage}>
          <CandidateDashboard />
        </ProtectedRoute>
      )}

      {/* MY APPLICATIONS  (sirf candidate) */}
      {page === "my-applications" && (
        <ProtectedRoute role="candidate" setPage={setPage}>
          <MyApplication />
        </ProtectedRoute>
      )}

      {/* EMPLOYER DASHBOARD  (sirf employer) */}
      {page === "employer-dashboard" && (
        <ProtectedRoute role="employer" setPage={setPage}>
          <EmployerDashboard setPage={setPage} />
        </ProtectedRoute>
      )}

      {/* POST JOB  (sirf employer) */}
      {page === "post-job" && (
        <ProtectedRoute role="employer" setPage={setPage}>
          <PostJob />
        </ProtectedRoute>
      )}
    </>
  );
}

export default App;
