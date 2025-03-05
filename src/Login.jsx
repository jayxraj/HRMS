import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./app.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  return (
    <div
      className="img js-fullheight"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_1280.jpg)",
      }}
    >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form className="signin-form" onSubmit={handleLogin}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50">
                      <label className="checkbox-wrap checkbox-primary">
                        Remember Me
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="w-50 text-md-right">
                      <a href="#" style={{ color: "#fff" }}>
                        Forgot Password
                      </a>
                    </div>
                  </div>
                </form>
                <p className="w-100 text-center">&mdash; Or &mdash;</p>
                <div style={{ marginBottom: "120px" }}>
                  <center>
                    <Link className="mb-4 text-center" to="/register">
                      <u>Register Here</u>
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

export default Login;
