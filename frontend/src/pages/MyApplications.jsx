
import { useEffect, useState } from "react";
import { getMyApplications } from "../services/api";

function MyApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();

        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          setError(data.message || "Unable to load applications.");
        }
      } catch (err) {
        setError(err.message || "Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div className="container py-5">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <h2>My Applications</h2>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-2">My Applications</h2>
      <p className="text-secondary mb-4">
        Track the jobs you have applied for.
      </p>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          You haven't applied for any jobs yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Status</th>
                <th>AI Match</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application._id}>
                  <td>{application.job_title || "Unknown Job"}</td>
                  <td>{application.company || "Unknown Company"}</td>
                  <td>
                    <span className="badge bg-primary">
                      {application.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {application.match_percentage != null
                      ? `${application.match_percentage}%`
                      : "Not analyzed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyApplication;
