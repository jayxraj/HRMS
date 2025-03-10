import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./app.css";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // State for role selection
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        email,
        fullname,
        password,
        confirmPassword,
        role, // Send selected role to backend
      });
      alert("Successfully registered, Redirecting to login page");
      navigate("/login");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Registration failed");
    }
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
                <form className="signin-form" onSubmit={handleRegister}>
                  {/* Role Dropdown */}
                  <div className="form-group">
                    <select
                      className="form-control text-gray-700"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="" className="text-black">
                        Select Role
                      </option>
                      <option value="hr" className="text-black">
                        HR
                      </option>
                      <option value="employee" className="text-black">
                        Employee
                      </option>
                      <option value="candidate" className="text-black">
                        Candidate
                      </option>
                    </select>
                  </div>
                  {/* Username Field */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>
                  {/* Email Field */}
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <p style={{ color: "red", fontSize: "smaller" }}>{error}</p>
                  )}

                  {/* Register Button */}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Register
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
