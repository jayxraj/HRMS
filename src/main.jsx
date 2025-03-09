import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Registration from "./Registration";
import HrRegistration from "./hrRegistration";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/HrRegister" element={<HrRegistration />} />
      </Routes>
    </Router>
  </StrictMode>
);
