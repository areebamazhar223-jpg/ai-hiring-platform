const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");


// ==========================================
// AUTH
// ==========================================

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Signup failed"
    );
  }

  return data;
};


export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Login failed"
    );
  }

  return data;
};


// ==========================================
// JOBS
// ==========================================

export const getJobs = async () => {
  const response = await fetch(
    `${API_URL}/jobs/`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to fetch jobs"
    );
  }

  return data;
};


// ==========================================
// CREATE JOB - EMPLOYER
// ==========================================

export const createJob = async (jobData) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/jobs/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to create job"
    );
  }

  return data;
};


// ==========================================
// CANDIDATE DASHBOARD
// ==========================================

export const getCandidateDashboard = async () => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/candidates/dashboard`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to load dashboard"
    );
  }

  return data;
};


// ==========================================
// CV UPLOAD
// ==========================================

export const uploadCV = async (file) => {
  const token =
    localStorage.getItem("token");

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await fetch(
    `${API_URL}/cv/upload`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "CV upload failed"
    );
  }

  return data;
};


// ==========================================
// AI JOB MATCH
// ==========================================

export const matchJob = async (jobId) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/ai/match-job`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ job_id: jobId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Job matching failed"
    );
  }

  return data;
};


// ==========================================
// APPLY FOR JOB
// ==========================================

export const applyForJob = async (jobId) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/applications/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        job_id: jobId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Application failed"
    );
  }

  return data;
};


// ==========================================
// MY APPLICATIONS
// ==========================================

export const getMyApplications = async () => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/applications/my-applications`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to load applications"
    );
  }

  return data;
};


// ==========================================
// EMPLOYER DASHBOARD
// ==========================================

export const getEmployerDashboard = async () => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/employer/dashboard`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to load employer dashboard"
    );
  }

  return data;
};


// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/applications/${applicationId}/status?status=${encodeURIComponent(
      status
    )}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to update application status"
    );
  }

  return data;
};
// DELETE JOB - EMPLOYER
export const deleteJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/jobs/${jobId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to delete job"
    );
  }

  return data;
};

// ==========================================
// UPDATE JOB - EMPLOYER
// ==========================================

export const updateJob = async (jobId, jobData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/jobs/${jobId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(jobData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.message ||
      "Failed to update job"
    );
  }

  return data;
};

export const downloadApplicantResume = async (applicationId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/cv/applications/${applicationId}/resume`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    let data = {};
    try {
      data = await response.json();
    } catch {
      // Use the fallback message when the server returns a non-JSON error.
    }
    throw new Error(data.detail || data.message || "Unable to download this CV");
  }

  return response.blob();
};
