import React from "react";
import "./app.css";

const Login = () => {
  return (
    <div
      className="img js-fullheight"
      style={{
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg)",
      }}
    >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form action="#" className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
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
                <div style={{ marginBottom: "73px" }}>
                  <center>
                    <a className="mb-4 text-center" href="#">
                      <u>Register Here</u>
                    </a>
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
