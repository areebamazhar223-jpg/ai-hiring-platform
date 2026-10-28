import { useAuth } from "../context/useAuth";

function Navbar({ setPage }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setPage("home");
  };

  const scrollToSection = (sectionId) => {
    setPage("home");

    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleDashboard = () => {
    if (user?.role === "employer") {
      setPage("employer-dashboard");
    } else {
      setPage("dashboard");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg hireai-navbar">
      <div className="container">

        {/* BRAND */}

        <button
          className="navbar-brand hireai-brand"
          onClick={() => setPage("home")}
        >
          <span className="brand-icon">AI</span>

          <span className="brand-name">
            Hire<span>AI</span>
          </span>
        </button>


        {/* TOGGLE */}

        <button
          className="navbar-toggler hireai-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hireaiNavbar"
          aria-controls="hireaiNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* NAVIGATION */}

        <div
          className="collapse navbar-collapse"
          id="hireaiNavbar"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            {/* HOME */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() => setPage("home")}
            >
              Home
            </button>


            {/* JOBS */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() => setPage("jobs")}
            >
              Jobs
            </button>


            {/* FEATURES */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() =>
                scrollToSection("features")
              }
            >
              Features
            </button>


            {/* HOW IT WORKS */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() =>
                scrollToSection("how-it-works")
              }
            >
              How It Works
            </button>


            {/* PRICING */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() =>
                scrollToSection("pricing")
              }
            >
              Pricing
            </button>


            {/* FAQ */}

            <button
              className="nav-link hireai-nav-link"
              onClick={() =>
                scrollToSection("faq")
              }
            >
              FAQ
            </button>


            {/* =========================
                NOT LOGGED IN
            ========================= */}

            {!user && (
              <div className="d-flex align-items-lg-center gap-2 ms-lg-3">

                <button
                  className="btn hireai-login-btn"
                  onClick={() => setPage("login")}
                >
                  Login
                </button>


                <button
                  className="btn hireai-start-btn"
                  onClick={() => setPage("signup")}
                >
                  Get Started
                </button>

              </div>
            )}


            {/* =========================
                LOGGED IN
            ========================= */}

            {user && (
              <div className="d-flex align-items-lg-center gap-2 ms-lg-3">

                {/* DASHBOARD */}

                <button
                  className="btn hireai-dashboard-btn"
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>


                {/* USER */}

                <div className="hireai-user">

                  <span className="hireai-user-avatar">

                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}

                  </span>


                  <span className="hireai-user-name">

                    {user?.name || "User"}

                  </span>

                </div>


                {/* LOGOUT */}

                <button
                  className="btn hireai-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
