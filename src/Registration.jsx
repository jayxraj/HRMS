import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./app.css";

const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};


const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setError("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const response = await registerUser(formData);

    if (response.error) {
      setError(response.error);
    } else {
      alert("Successfully registered, Redirecting to login page");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div
      className="img js-fullheight"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2015/07/28/22/01/office-865091_1280.jpg)",
      }}
    >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Registration</h3>
                <form className="signin-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <select
                      className="form-control text-gray-700"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="HR">HR</option>
                      <option value="EMPLOYEE">Employee</option>
                      <option value="CANDIDATE">Candidate</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && (
                    <p style={{ color: "red", fontSize: "smaller" }}>{error}</p>
                  )}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </form>
                <p className="w-100 text-center">&mdash; Or &mdash;</p>
                <div style={{ marginBottom: "73px" }}>
                  <center>
                    <Link className="mb-4 text-center" to="/">
                      <u>Go To Login</u>
                    </Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
