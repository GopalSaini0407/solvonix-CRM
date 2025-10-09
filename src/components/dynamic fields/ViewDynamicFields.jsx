import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewDynamicFields() {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const token = localStorage.getItem("login_token");

    try {
      const res = await axios.get(
        "http://localhost/crm-solvonix/api/v1/user/get/contacts/fields",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Data:", res.data.data);
      setGroups(res.data.data || {});
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch dynamic fields. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Loading state
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading data...</p>
      </div>
    );

  // 🔹 Error state
  if (error)
    return (
      <div className="alert alert-danger mt-4 text-center" role="alert">
        {error}
      </div>
    );

  // 🔹 Empty data state
  if (!groups || Object.keys(groups).length === 0)
    return (
      <div className="alert alert-warning mt-4 text-center" role="alert">
        No dynamic field data found.
      </div>
    );

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-primary fw-bold">
        <i className="fas fa-list-alt me-2"></i>Dynamic Groups
      </h3>

      {Object.keys(groups).map((groupName, index) => (
        <div
          key={index}
          className="card shadow-sm mb-4 border-0 rounded-3"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="card-header bg-primary text-white fw-semibold">
            {groupName}
          </div>

          <div className="card-body">
            {Array.isArray(groups[groupName]) &&
            groups[groupName].length > 0 ? (
              groups[groupName].map((item, i) => (
                <div
                  key={i}
                  className="border-start border-4 border-primary ps-3 mb-3"
                >
                  {Object.entries(item).map(([key, value]) => (
                    <p key={key} className="mb-1">
                      <strong className="text-dark">{key}:</strong>{" "}
                      <span className="text-secondary">{String(value)}</span>
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-muted">No data available for this group.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
