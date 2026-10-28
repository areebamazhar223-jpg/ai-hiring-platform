import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../services/api";

function Jobs({ setPage, setSelectedJob }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();

        console.log("Jobs:", data);

        setJobs(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !search ||
        job.title?.toLowerCase().includes(searchText) ||
        job.company?.toLowerCase().includes(searchText) ||
        job.description?.toLowerCase().includes(searchText) ||
        job.skills?.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesLocation =
        !location ||
        job.location?.toLowerCase().includes(location.toLowerCase());

      const matchesType =
        jobType === "All" ||
        job.job_type?.toLowerCase() === jobType.toLowerCase();

      const matchesCategory =
        category === "All" ||
        job.category?.toLowerCase() === category.toLowerCase();

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesCategory
      );
    });
  }, [jobs, search, location, jobType, category]);

  if (loading) {
    return (
      <div className="jobs-loading">
        <div className="container">
          <div className="jobs-loading-box">
            <div className="jobs-loader"></div>
            <h4>Finding opportunities...</h4>
            <p>Please wait while we load the latest jobs.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-error">
        <div className="container">
          <div className="jobs-error-box">
            <h4>Unable to load jobs</h4>
            <p>{error}</p>

            <button
              className="jobs-reset-btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">

      {/* =========================
          JOBS HERO
      ========================= */}

      <section className="jobs-hero">

        <div className="container">

          <div className="jobs-hero-content">

            <span className="jobs-eyebrow">
              OPPORTUNITIES FOR EVERYONE
            </span>

            <h1>
              Find a job that
              <span> fits your future.</span>
            </h1>

            <p>
              Explore opportunities across technology, AI,
              education, design, marketing, support and more.
            </p>

          </div>


          {/* SEARCH BOX */}

          <div className="jobs-search-box">

            <div className="search-field">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Job title, skill or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <div className="search-field">

              <span>⌖</span>

              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

            </div>


            <button
              className="search-button"
              onClick={() => {}}
            >
              Search Jobs
            </button>

          </div>

        </div>

      </section>


      {/* =========================
          FILTERS
      ========================= */}

      <section className="jobs-content">

        <div className="container">

          <div className="jobs-toolbar">

            <div className="job-categories">

              {[
                "All",
                "Software",
                "AI",
                "Teaching",
                "Design",
                "Marketing",
                "Support",
                "Data",
                "eCommerce",
              ].map((item) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "category-filter active"
                      : "category-filter"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}

            </div>


            <div className="job-type-filter">

              {["All", "Remote", "Onsite", "Hybrid"].map((type) => (
                <button
                  key={type}
                  className={
                    jobType === type
                      ? "type-filter active"
                      : "type-filter"
                  }
                  onClick={() => setJobType(type)}
                >
                  {type}
                </button>
              ))}

            </div>

          </div>


          {/* JOB COUNT */}

          <div className="jobs-result-header">

            <div>
              <h3>
                Available Jobs
              </h3>

              <p>
                {filteredJobs.length} opportunities found
              </p>
            </div>

          </div>


          {/* =========================
              JOB CARDS
          ========================= */}

          <div className="row g-4">

            {filteredJobs.length === 0 ? (

              <div className="col-12">

                <div className="no-jobs-box">

                  <div className="no-jobs-icon">
                    ⌕
                  </div>

                  <h4>
                    No jobs found
                  </h4>

                  <p>
                    Try changing your search or filters.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setLocation("");
                      setJobType("All");
                      setCategory("All");
                    }}
                  >
                    Clear Filters
                  </button>

                </div>

              </div>

            ) : (

              filteredJobs.map((job) => (

                <div
                  className="col-md-6 col-xl-4"
                  key={job._id}
                >

                  <div className="modern-job-card">

                    <div className="job-card-top">

                      <div className="company-logo-large">
                        {job.company
                          ? job.company.substring(0, 2).toUpperCase()
                          : "CO"}
                      </div>


                      <div className="job-card-type">

                        {job.job_type || "Job"}

                      </div>

                    </div>


                    <h4>
                      {job.title}
                    </h4>


                    <p className="job-company">
                      {job.company}
                    </p>


                    <div className="job-location">

                      <span>⌖</span>

                      {job.location || "Location not specified"}

                    </div>


                    <p className="job-description">

                      {job.description}

                    </p>


                    <div className="job-skills">

                      {job.skills?.slice(0, 5).map(
                        (skill, index) => (
                          <span key={index}>
                            {skill}
                          </span>
                        )
                      )}

                    </div>


                    <div className="job-card-bottom">

                      <div>

                        <small>
                          Employment
                        </small>

                        <strong>
                          {job.job_type || "Flexible"}
                        </strong>

                      </div>


                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setPage("job-details");
                        }}
                      >
                        View Job →
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Jobs;