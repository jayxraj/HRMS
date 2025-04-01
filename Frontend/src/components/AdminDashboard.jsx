import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import "../Style/AdminDashboard.css";
import { Snackbar, Alert } from "@mui/material";
import { Padding } from "@mui/icons-material";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
        setSuccessMessage("Users loaded successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        setSuccessMessage("User deleted successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      console.log("Updating role:", { userId, role }); // Debugging
      const response = await axios.put(
        `/api/admin/users/${userId}?role=${role}`
      );
      console.log("Response:", response.data); // Debugging
      setUsers(
        users.map((user) => (user.id === userId ? { ...user, role } : user))
      );
      console.log("Setting success message..."); // ✅ Check if it reaches this point
      setSuccessMessage("Role updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
    setSuccessMessage("");
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="admin-dashboard">
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>

      <div className="dashboard-header" >
        <h1>Admin Dashboard</h1>
      </div>

      <section className="section">
        <h3 className="section-title">
          Users <span>{users.length} total</span>
        </h3>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Update Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="role-cell">
                  <select
                    className="role-select"
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                  >
                    <option value="HR">HR</option>
                    <option value="ADMIN">Admin</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="CANDIDATE">Candidate</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
