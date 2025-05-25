// src/pages/admin/SoftwareList.jsx
import React, { useEffect, useState } from "react";
import { softwareAPI } from "../../api/software";

const SoftwareList = () => {
  const [softwares, setSoftwares] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSoftwares = async () => {
      try {
        const data = await softwareAPI.getAll();
        setSoftwares(data);
      } catch (err) {
        setError(err.message || "Failed to load software");
      }
    };
    fetchSoftwares();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Software List</h1>
      <ul>
        {softwares.map((software) => (
          <li key={software._id}>{software.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SoftwareList;
