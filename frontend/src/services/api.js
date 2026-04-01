const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const registerUser = async (user) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
};

export const getStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/students`);
  return response.json();
};

export const addStudent = async (student) => {
  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
};

export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getCompanies = async () => {
  const response = await fetch(`${API_BASE_URL}/companies`);
  return response.json();
};

export const addCompany = async (company) => {
  const response = await fetch(`${API_BASE_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  });
  return response.json();
};

export const updateCompany = async (id, company) => {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company),
  });
  return response.json();
};

export const deleteCompany = async (id) => {
  const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getDrives = async () => {
  const response = await fetch(`${API_BASE_URL}/drives`);
  return response.json();
};

export const addDrive = async (drive) => {
  const response = await fetch(`${API_BASE_URL}/drives`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(drive),
  });
  return response.json();
};

export const updateDrive = async (id, drive) => {
  const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(drive),
  });
  return response.json();
};

export const deleteDrive = async (id) => {
  const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getTestReports = async () => {
  const response = await fetch(`${API_BASE_URL}/testreports`);
  return response.json();
};

export const addTestReport = async (report) => {
  const response = await fetch(`${API_BASE_URL}/testreports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });
  return response.json();
};

export const updateTestReport = async (id, report) => {
  const response = await fetch(`${API_BASE_URL}/testreports/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });
  return response.json();
};

export const deleteTestReport = async (id) => {
  const response = await fetch(`${API_BASE_URL}/testreports/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getNotifications = async () => {
  const response = await fetch(`${API_BASE_URL}/notifications`);
  return response.json();
};

export const addNotification = async (notification) => {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification),
  });
  return response.json();
};

export const updateNotification = async (id, notification) => {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification),
  });
  return response.json();
};

export const deleteNotification = async (id) => {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getSchedules = async () => {
  const response = await fetch(`${API_BASE_URL}/schedules`);
  return response.json();
};

export const addSchedule = async (schedule) => {
  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  return response.json();
};

export const updateSchedule = async (id, schedule) => {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });
  return response.json();
};

export const deleteSchedule = async (id) => {
  const response = await fetch(`${API_BASE_URL}/schedules/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(
    `${API_BASE_URL}/users${query ? `?${query}` : ""}`
  );
  return response.json();
};

export const uploadResume = async (id, file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_BASE_URL}/users/upload-resume/${id}`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const uploadProfileImage = async (id, file) => {
  const formData = new FormData();
  formData.append("profile", file);

  const response = await fetch(`${API_BASE_URL}/users/upload-profile/${id}`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const exportStudentsCSV = () => {
  window.open("http://localhost:5000/api/export/students");
};

export const exportReportsCSV = () => {
  window.open("http://localhost:5000/api/export/reports");
};