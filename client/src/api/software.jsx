// src/api/software.js

const API_URL = "http://localhost:5000/api/software";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const softwareAPI = {
  // Create
  create: async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to create software");
    return result;
  },

  // Get All
  getAll: async () => {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to fetch software");
    return result;
  },

  // Get by ID
  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to fetch software");
    return result;
  },

  // Update
  update: async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to update software");
    return result;
  },

  // Delete
  delete: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || "Failed to delete software");
    return result;
  },
};
