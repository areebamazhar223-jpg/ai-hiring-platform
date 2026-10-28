import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/useAuth";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log("Login response:", data);

      login(data);

      setMessage("Login successful!");

      setTimeout(() => {
        setPage("home");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-info">

          <div className="auth-brand">
            <span className="auth-brand-icon">AI</span>
            <span>Hire<span>AI</span></span>
          </div>

          <div className="auth-info-content">

            <span className="auth-eyebrow">
              WELCOME BACK
            </span>

            <h1>
              Your next
              <br />
              <span>opportunity</span>
              <br />
              is waiting.
            </h1>

            <p>
              Sign in to discover jobs that match your
              skills, track your applications and use
              AI-powered job matching.
            </p>

            <div className="auth-features">

              <div>
                <span>✓</span>
                <div>
                  <strong>AI Job Matching</strong>
                  <small>Find jobs based on your skills</small>
                </div>
              </div>

              <div>
                <span>✓</span>
                <div>
                  <strong>Smart CV Analysis</strong>
                  <small>Get insights from your CV</small>
                </div>
              </div>

              <div>
                <span>✓</span>
                <div>
                  <strong>Track Applications</strong>
                  <small>Manage your job applications</small>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="auth-form-side">

          <div className="auth-form-wrapper">

            <div className="mobile-auth-brand">
              <span className="auth-brand-icon">AI</span>
              <span>Hire<span>AI</span></span>
            </div>

            <div className="auth-heading">

              <span className="auth-form-eyebrow">
                ACCOUNT LOGIN
              </span>

              <h2>
                Welcome back
              </h2>

              <p>
                Sign in to continue to your account.
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

                <div className="password-label">

                  <label>
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => {}}
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="auth-input-wrapper">

                  <span className="input-icon">
                    •
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* LOGIN */}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="auth-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span>→</span>
                  </>
                )}

              </button>

            </form>


            {/* SIGNUP */}

            <div className="auth-switch">

              <span>
                Don't have an account?
              </span>

              <button
                onClick={() => setPage("signup")}
              >
                Create an account
              </button>

            </div>


            <div className="auth-security">
              <span>🔒</span>
              Your account information is securely protected.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
