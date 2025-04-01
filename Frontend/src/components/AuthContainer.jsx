import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthContainer.css";

const AuthContainer = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`auth-container ${isFlipped ? "flipped" : ""}`}>
      <div className="auth-card">
        <div className="auth-front">
          <Login />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setIsFlipped(true)}>Sign Up</button>
          </p>
        </div>
        <div className="auth-back">
          <Register />
          <p>
            Already have an account?{" "}
            <button onClick={() => setIsFlipped(false)}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
