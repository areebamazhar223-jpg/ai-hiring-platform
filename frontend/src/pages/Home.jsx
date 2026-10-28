function Home({ setPage }) {
  return (
    <div className="home-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            <div className="col-lg-6">

              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                AI-Powered Hiring Platform
              </div>

              <h1 className="hero-title">
                Find the right job.
                <br />
                <span>Build your future.</span>
              </h1>

              <p className="hero-text">
                Discover opportunities that match your skills,
                experience and career goals with intelligent
                AI-powered job matching.
              </p>

              <div className="hero-buttons">

                <button
                  className="btn hireai-primary-btn"
                  onClick={() => setPage("jobs")}
                >
                  Explore Jobs
                  <span>→</span>
                </button>

                <button
                  className="btn hireai-secondary-btn"
                  onClick={() => setPage("signup")}
                >
                  Get Started
                </button>

              </div>

              <div className="hero-trust">
                <span>✓ AI Job Matching</span>
                <span>✓ Smart CV Analysis</span>
                <span>✓ Easy Applications</span>
              </div>

            </div>

            {/* HERO AI CARD */}

            <div className="col-lg-6">

              <div className="hero-visual">

                <div className="ai-dashboard-card">

                  <div className="ai-card-header">

                    <div>
                      <small>AI MATCHING</small>

                      <h5>Your Job Match</h5>
                    </div>

                    <span className="live-badge">
                      ● Live
                    </span>

                  </div>

                  <div className="match-main">

                    <div className="match-circle">
                      <strong>92%</strong>
                      <span>Match</span>
                    </div>

                    <div>

                      <h5>Full Stack Developer</h5>

                      <p>Tech Solutions</p>

                      <span className="location-text">
                        📍 Remote
                      </span>

                    </div>

                  </div>

                  <div className="skill-match-list">

                    <div className="skill-match">
                      <span>React</span>
                      <b>✓</b>
                    </div>

                    <div className="skill-match">
                      <span>Node.js</span>
                      <b>✓</b>
                    </div>

                    <div className="skill-match">
                      <span>MongoDB</span>
                      <b>✓</b>
                    </div>

                    <div className="skill-match missing">
                      <span>Docker</span>
                      <b>+</b>
                    </div>

                  </div>

                  <button
                    className="ai-view-btn"
                    onClick={() => setPage("jobs")}
                  >
                    View Matching Jobs →
                  </button>

                </div>

                <div className="floating-card floating-card-one">

                  <span className="floating-icon">
                    ✓
                  </span>

                  <div>
                    <strong>CV Analyzed</strong>

                    <small>
                      14 skills detected
                    </small>
                  </div>

                </div>

                <div className="floating-card floating-card-two">

                  <span className="floating-icon">
                    AI
                  </span>

                  <div>
                    <strong>Smart Match</strong>

                    <small>
                      Personalized results
                    </small>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================
          STATS
      ========================= */}

      <section className="stats-section">
        <div className="container">

          <div className="stats-wrapper">

            <div className="stat-item">
              <h2>10K+</h2>
              <p>Job Opportunities</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <h2>5K+</h2>
              <p>Talented Candidates</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <h2>1K+</h2>
              <p>Companies</p>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <h2>95%</h2>
              <p>Smart Matching</p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FEATURES
      ========================= */}

      <section
        id="features"
        className="features-section"
      >

        <div className="container">

          <div className="section-heading text-center">

            <span>PLATFORM FEATURES</span>

            <h2>
              Everything you need
              <br />
              <strong>to move forward.</strong>
            </h2>

            <p>
              Powerful tools designed to make job searching
              and hiring simpler, smarter and faster.
            </p>

          </div>

          <div className="row g-4 mt-4">

            <div className="col-md-6 col-lg-4">

              <div className="feature-card">

                <div className="feature-icon">
                  AI
                </div>

                <h4>AI Job Matching</h4>

                <p>
                  Compare your skills with job requirements
                  and instantly see your match percentage.
                </p>

                <span className="feature-link">
                  Smart matching →
                </span>

              </div>

            </div>


            <div className="col-md-6 col-lg-4">

              <div className="feature-card">

                <div className="feature-icon">
                  CV
                </div>

                <h4>Smart CV Analysis</h4>

                <p>
                  Upload your CV and automatically detect
                  your technical skills and experience.
                </p>

                <span className="feature-link">
                  Analyze your CV →
                </span>

              </div>

            </div>


            <div className="col-md-6 col-lg-4">

              <div className="feature-card">

                <div className="feature-icon">
                  ✓
                </div>

                <h4>Application Tracking</h4>

                <p>
                  Keep track of every job you apply for
                  and monitor your application status.
                </p>

                <span className="feature-link">
                  Track applications →
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="container">

          <div className="section-heading text-center">

            <span>HOW IT WORKS</span>

            <h2>
              Your next opportunity
              <br />
              is only a few steps away.
            </h2>

          </div>

          <div className="row g-4 mt-5">

            <div className="col-md-4">

              <div className="step-card">

                <div className="step-number">
                  01
                </div>

                <h4>Create Your Profile</h4>

                <p>
                  Create your account and upload your CV.
                  Our platform analyzes your skills automatically.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="step-card active-step">

                <div className="step-number">
                  02
                </div>

                <h4>Discover Jobs</h4>

                <p>
                  Explore opportunities across technology,
                  business, education, support and more.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="step-card">

                <div className="step-number">
                  03
                </div>

                <h4>Match & Apply</h4>

                <p>
                  Check your AI match, understand missing skills
                  and apply to the right opportunity.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          JOB CATEGORIES
      ========================= */}

      <section className="categories-section">

        <div className="container">

          <div className="section-heading">

            <span>EXPLORE OPPORTUNITIES</span>

            <h2>
              Find jobs across
              <br />
              multiple industries.
            </h2>

            <p>
              From software development to teaching and
              customer support, discover opportunities that
              match your skills.
            </p>

          </div>

          <div className="row g-3 mt-4">

            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>⌘</span>
                <strong>Software Development</strong>
                <small>Developers & Engineers</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>AI</span>
                <strong>Data & AI</strong>
                <small>AI & Data professionals</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>✦</span>
                <strong>Design</strong>
                <small>UI/UX & Creative</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>↗</span>
                <strong>Marketing</strong>
                <small>Digital & Growth</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>⌨</span>
                <strong>Data Entry</strong>
                <small>Admin & Operations</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>☎</span>
                <strong>Customer Support</strong>
                <small>Call Center & Support</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>◈</span>
                <strong>Amazon & eCommerce</strong>
                <small>Online business roles</small>
              </button>
            </div>


            <div className="col-6 col-md-4 col-lg-3">
              <button
                className="category-card"
                onClick={() => setPage("jobs")}
              >
                <span>▣</span>
                <strong>Teaching & Education</strong>
                <small>Teachers & Trainers</small>
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FEATURED JOBS
      ========================= */}

      <section className="featured-jobs-section">

        <div className="container">

          <div className="section-heading d-flex justify-content-between align-items-end flex-wrap gap-3">

            <div>

              <span>FEATURED OPPORTUNITIES</span>

              <h2>
                Explore popular jobs.
              </h2>

              <p>
                Discover roles across different industries
                and experience levels.
              </p>

            </div>

            <button
              className="btn view-all-btn"
              onClick={() => setPage("jobs")}
            >
              View All Jobs →
            </button>

          </div>

          <div className="row g-4 mt-4">

            <div className="col-lg-6">

              <div className="job-preview-card">

                <div className="job-preview-top">

                  <div className="company-logo">
                    TS
                  </div>

                  <span className="job-type">
                    Remote
                  </span>

                </div>

                <h4>
                  Full Stack Developer
                </h4>

                <p className="company-name">
                  Tech Solutions
                </p>

                <div className="job-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>

                <div className="job-preview-bottom">

                  <span>
                    📍 Remote
                  </span>

                  <button
                    onClick={() => setPage("jobs")}
                  >
                    View Job →
                  </button>

                </div>

              </div>

            </div>


            <div className="col-lg-6">

              <div className="job-preview-card">

                <div className="job-preview-top">

                  <div className="company-logo">
                    AI
                  </div>

                  <span className="job-type">
                    Full Time
                  </span>

                </div>

                <h4>
                  Python AI Developer
                </h4>

                <p className="company-name">
                  AI Tech Company
                </p>

                <div className="job-tags">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>AI</span>
                </div>

                <div className="job-preview-bottom">

                  <span>
                    📍 Lahore
                  </span>

                  <button
                    onClick={() => setPage("jobs")}
                  >
                    View Job →
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          PRICING
      ========================= */}

      <section
        id="pricing"
        className="pricing-section"
      >

        <div className="container">

          <div className="section-heading text-center">

            <span>SIMPLE PRICING</span>

            <h2>
              Plans that fit your journey.
            </h2>

            <p>
              Start exploring opportunities with the tools
              you need to move forward.
            </p>

          </div>

          <div className="row justify-content-center g-4 mt-4">

            <div className="col-md-6 col-lg-4">

              <div className="pricing-card">

                <h4>Candidate</h4>

                <p>
                  For professionals looking for their next opportunity.
                </p>

                <div className="price">
                  Free
                </div>

                <ul>
                  <li>✓ Create profile</li>
                  <li>✓ Upload CV</li>
                  <li>✓ AI job matching</li>
                  <li>✓ Apply to jobs</li>
                  <li>✓ Track applications</li>
                </ul>

                <button
                  className="btn pricing-btn"
                  onClick={() => setPage("signup")}
                >
                  Get Started
                </button>

              </div>

            </div>


            <div className="col-md-6 col-lg-4">

              <div className="pricing-card featured-pricing">

                <div className="popular-label">
                  FOR EMPLOYERS
                </div>

                <h4>Hiring</h4>

                <p>
                  Tools for companies looking to find skilled talent.
                </p>

                <div className="price">
                  Coming Soon
                </div>

                <ul>
                  <li>✓ Post job opportunities</li>
                  <li>✓ Manage applications</li>
                  <li>✓ AI candidate matching</li>
                  <li>✓ Candidate profiles</li>
                  <li>✓ Hiring dashboard</li>
                </ul>

                <button
                  className="btn pricing-btn"
                  onClick={() => setPage("signup")}
                >
                  Join Platform
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FAQ
      ========================= */}

      <section
        id="faq"
        className="faq-section"
      >

        <div className="container">

          <div className="section-heading text-center">

            <span>FAQ</span>

            <h2>
              Frequently asked questions.
            </h2>

          </div>

          <div className="faq-wrapper">

            <details className="faq-item">

              <summary>
                How does AI job matching work?
              </summary>

              <p>
                HireAI compares the skills detected from your CV
                with the skills required for a job and calculates
                a match percentage.
              </p>

            </details>


            <details className="faq-item">

              <summary>
                Do I need to upload my CV?
              </summary>

              <p>
                Uploading your CV allows the platform to analyze
                your skills and provide more useful AI job matches.
              </p>

            </details>


            <details className="faq-item">

              <summary>
                Can I track my applications?
              </summary>

              <p>
                Yes. After applying for jobs, you can open your
                dashboard to view yoyour applications and their
                current status.
              </p>

            </details>


            <details className="faq-item">

              <summary>
                Is HireAI free for candidates?
              </summary>

              <p>
                Yes. Candidate accounts can create a profile,
                upload a CV, check AI matches and apply for jobs.
              </p>

            </details>


            <details className="faq-item">

              <summary>
                Is the employer dashboard available?
              </summary>

              <p>
                Employer features are planned for the next phase
                of the platform.
              </p>

            </details>

          </div>

        </div>

      </section>
      {/* =========================
          CTA
      ========================= */}

      <section className="cta-section">

        <div className="container">

          <div className="cta-card">

            <div className="cta-content">

              <span className="cta-label">
                READY TO START?
              </span>

              <h2>
                Your next opportunity
                <br />
                could be one click away.
              </h2>

              <p>
                Create your profile, upload your CV and discover
                opportunities matched to your skills.
              </p>

              <div className="cta-buttons">

                <button
                  className="btn hireai-primary-btn"
                  onClick={() => setPage("signup")}
                >
                  Get Started
                  <span>→</span>
                </button>

                <button
                  className="btn hireai-secondary-btn"
                  onClick={() => setPage("jobs")}
                >
                  Explore Jobs
                </button>

              </div>

            </div>


            <div className="cta-visual">

              <div className="cta-ai-circle">
                AI
              </div>

              <div className="cta-floating-card">

                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Smart Matching
                  </strong>

                  <small>
                    Find jobs that fit your skills
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer-section">

        <div className="container">

          <div className="row g-4">

            {/* BRAND */}

            <div className="col-lg-4">

              <div className="footer-brand">

                <button
                  className="footer-logo"
                  onClick={() => setPage("home")}
                >
                  <span className="brand-icon">
                    AI
                  </span>

                  <span className="brand-name">
                    Hire<span>AI</span>
                  </span>
                </button>

                <p className="footer-description">
                  An AI-powered hiring platform designed to
                  connect talented people with meaningful
                  opportunities.
                </p>

                <div className="footer-socials">

                  <a
                    href="#"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>

                  <a
                    href="#"
                    aria-label="GitHub"
                  >
                    GH
                  </a>

                </div>

              </div>

            </div>


            {/* PLATFORM */}

            <div className="col-6 col-lg-2">

              <h6>
                Platform
              </h6>

              <button
                onClick={() => setPage("jobs")}
              >
                Jobs
              </button>

              <button
                onClick={() => setPage("signup")}
              >
                Get Started
              </button>

              <button
                onClick={() => setPage("login")}
              >
                Login
              </button>

              <button
                onClick={() => setPage("dashboard")}
              >
                Dashboard
              </button>

            </div>


            {/* PRODUCT */}

            <div className="col-6 col-lg-2">

              <h6>
                Product
              </h6>

              <a href="#features">
                Features
              </a>

              <a href="#how-it-works">
                How It Works
              </a>

              <a href="#pricing">
                Pricing
              </a>

              <a href="#faq">
                FAQ
              </a>

            </div>


            {/* CATEGORIES */}

            <div className="col-6 col-lg-2">

              <h6>
                Categories
              </h6>

              <button
                onClick={() => setPage("jobs")}
              >
                Development
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Data & AI
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Design
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Customer Support
              </button>

            </div>


            {/* MORE JOBS */}

            <div className="col-6 col-lg-2">

              <h6>
                More Jobs
              </h6>

              <button
                onClick={() => setPage("jobs")}
              >
                Amazon
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Teaching
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Data Entry
              </button>

              <button
                onClick={() => setPage("jobs")}
              >
                Marketing
              </button>

            </div>

          </div>


          {/* FOOTER BOTTOM */}

          <div className="footer-bottom">

            <p>
              © 2026 HireAI. All rights reserved.
            </p>

            <div>

              <span>
                Privacy
              </span>

              <span>
                Terms
              </span>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;