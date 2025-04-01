import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "../Style/Login.css"; // Importing the CSS file

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("/api/login", formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
        navigate(`/${response.data.role.toLowerCase()}`);
      } else {
        await axios.post("/api/register", formData);
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data || "Authentication failed");
    }
  };

  return (
    <div className={`container ${isLogin ? "login-mode" : "register-mode"}`}>
      <div className="login-wrapper">
        {/* Welcome Section - Moves on Transition */}
        <div className="welcome-section">
          <h2>{isLogin ? "HRMS" : "HRMS"}</h2>
          <p>
            {isLogin
              ? "Enter your personal details and start your journey with us"
              : "To keep connected with us, please login with your personal info"}
          </p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>

        {/* Login/Register Form */}
        <div className="form-container">
          <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            )}
            <input
              type="text"
              placeholder="UserName"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {!isLogin && (
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="HR">HR</option>
                <option value="ADMIN">Admin</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="CANDIDATE">Candidate</option>
              </select>
            )}
            <button type="submit">{isLogin ? "SIGN IN" : "SIGN UP"}</button>
          </form>
          {isLogin && (
            <p>
              Forgot password? <a href="/forgot-password">Reset here</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
