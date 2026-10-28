import { useEffect } from "react";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children, role, setPage }) {
  const { user } = useAuth();

  const notLoggedIn = !user;
  const wrongRole = user && role && user.role !== role;

  // login nahi hai to login page par bhejo
  useEffect(() => {
    if (notLoggedIn) {
      setPage("login");
    }
  }, [notLoggedIn, setPage]);

  if (notLoggedIn) {
    return null;
  }

  // galat role: friendly message
  if (wrongRole) {
    const ownDashboard =
      user.role === "employer" ? "employer-dashboard" : "dashboard";

    return (
      <div className="access-denied-page">
        <div className="container">
          <div className="access-denied-box">
            <div className="access-denied-icon">🔒</div>

            <h3>Access Restricted</h3>

            <p>
              This page is only available for{" "}
              <strong>{role}</strong> accounts. You are signed in as{" "}
              <strong>{user.role}</strong>.
            </p>

            <div className="access-denied-actions">
              <button
                className="access-denied-primary"
                onClick={() => setPage(ownDashboard)}
              >
                Go to my Dashboard
              </button>

              <button
                className="access-denied-secondary"
                onClick={() => setPage("home")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
