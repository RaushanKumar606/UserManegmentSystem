const API_URL = "http://localhost:5000/api/requests";
// import { useAuth } from '../../context/AuthContext';
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const requestAPI = {
  // Create a new request
  create: async ({ softwareId, accessType, reason }) => {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ softwareId, accessType, reason }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to create request");
    return result;
  },

  // Get all pending requests (Manager role)
  getPending: async () => {
    const res = await fetch(`${API_URL}/pending`, {
      method: "GET",
      headers: getHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to fetch pending requests");
    return result;
  },

  // Get current user's own requests
  getMyRequests: async () => {
    const res = await fetch(`${API_URL}/my-requests`, {
      method: "GET",
      headers: getHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to fetch user requests");
    return result;
  },

  // Update request status (Approve or Reject)
  updateStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to update request status");
    return result;
  },
};
