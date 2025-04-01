import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../Style/Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "EMPLOYEE"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select 
          value={formData.role} 
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="HR">HR</option>
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="CANDIDATE">Candidate</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;