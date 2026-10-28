import { useState } from "react";
import { signupUser } from "../services/api";

function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("candidate");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await signupUser({
        name,
        email,
        password,
        role,
      });

      console.log(data);

      setMessage("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setRole("candidate");

      setTimeout(() => {
        setPage("home");
      }, 1000);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container signup-container">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="auth-info">

          <div className="auth-brand">

            <span className="auth-brand-icon">
              AI
            </span>

            <span>
              Hire<span>AI</span>
            </span>

          </div>


          <div className="auth-info-content">

            <span className="auth-eyebrow">
              JOIN HIREAI
            </span>

            <h1>
              Start your
              <br />
              <span>next chapter.</span>
            </h1>

            <p>
              Create your profile, upload your CV and
              discover opportunities that match your
              skills and career goals.
            </p>


            <div className="auth-features">

              <div>

                <span>✓</span>

                <div>
                  <strong>Personalized Job Matching</strong>

                  <small>
                    Discover opportunities based on your skills
                  </small>
                </div>

              </div>


              <div>

                <span>✓</span>

                <div>
                  <strong>Smart CV Analysis</strong>

                  <small>
                    Automatically detect your skills
                  </small>
                </div>

              </div>


              <div>

                <span>✓</span>

                <div>
                  <strong>Application Tracking</strong>

                  <small>
                    Keep everything organized in one place
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            FORM SIDE
        ========================= */}

        <div className="auth-form-side">

          <div className="auth-form-wrapper">

            {/* MOBILE BRAND */}

            <div className="mobile-auth-brand">

              <span className="auth-brand-icon">
                AI
              </span>

              <span>
                Hire<span>AI</span>
              </span>

            </div>


            {/* HEADING */}

            <div className="auth-heading">

              <span className="auth-form-eyebrow">
                CREATE ACCOUNT
              </span>

              <h2>
                Join HireAI
              </h2>

              <p>
                Create your account and start exploring opportunities.
              </p>

            </div>


            {/* SUCCESS */}

            {message && (

              <div className="auth-success">

                <span>✓</span>

                {message}

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="auth-error">

                <span>!</span>

                {error}

              </div>

            )}


            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="auth-input-group">

                <label>
                  Full Name
                </label>

                <div className="auth-input-wrapper">

                  <span className="input-icon">
                    ◉
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="auth-input-group">

                <label>
                  Email Address
                </label>

                <div className="auth-input-wrapper">

                  <span className="input-icon">
                    @
                  </span>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="auth-input-group">

                <label>
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <span className="input-icon">
                    •
                  </span>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* ROLE */}

              <div className="auth-input-group">

                <label>
                  I am joining as
                </label>

                <div className="role-options">

                  <button
                    type="button"
                    className={
                      role === "candidate"
                        ? "role-card active"
                        : "role-card"
                    }
                    onClick={() =>
                      setRole("candidate")
                    }
                  >

                    <span className="role-icon">
                      C
                    </span>

                    <span>
                      <strong>
                        Candidate
                      </strong>

                      <small>
                        Find your next job
                      </small>
                    </span>

                    <b>
                      {role === "candidate" ? "✓" : ""}
                    </b>

                  </button>


                  <button
                    type="button"
                    className={
                      role === "employer"
                        ? "role-card active"
                        : "role-card"
                    }
                    onClick={() =>
                      setRole("employer")
                    }
                  >

                    <span className="role-icon">
                      E
                    </span>

                    <span>
                      <strong>
                        Employer
                      </strong>

                      <small>
                        Find talented people
                      </small>
                    </span>

                    <b>
                      {role === "employer" ? "✓" : ""}
                    </b>

                  </button>

                </div>

              </div>


              {/* SIGNUP BUTTON */}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="auth-spinner"></span>
                    Creating Account...
                  </>

                ) : (

                  <>
                    Create Account
                    <span>→</span>
                  </>

                )}

              </button>

            </form>


            {/* LOGIN */}

            <div className="auth-switch">

              <span>
                Already have an account?
              </span>

              <button
                onClick={() => setPage("login")}
              >
                Sign in
              </button>

            </div>


            <div className="auth-security">

              <span>🔒</span>

              Your information is securely protected.

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;