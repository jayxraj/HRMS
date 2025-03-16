import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    body: {
      margin: 0,
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      background: "linear-gradient(to right, #4facfe, #00f2fe)",
      width: "100vw",
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    navbar: {
      padding: "15px 20px",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 50, 0.3)",
      backdropFilter: "blur(5px)",
    },
    navLinks: {
      color: "white",
      margin: "0 15px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1.1rem",
      transition: "color 0.3s ease-in-out",
    },
    hero: {
      color: "white",
      textAlign: "center",
      padding: "100px 20px",
    },
    heroH2: {
      color: "#f8f9fa",
      fontSize: "2.8rem",
      textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    },
    heroP: {
      fontSize: "1.3rem",
      marginTop: "10px",
    },
    button: {
      background: "linear-gradient(135deg, #007bff, #6610f2)",
      padding: "12px 25px",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
      borderRadius: "25px",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "white",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      ...(isHovered && {
        transform: "scale(1.05)",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
      }),
    },
    footer: {
      background: "linear-gradient(to right, #1f1c2c, #928dab)",
      color: "white",
      textAlign: "center",
      padding: "15px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div>
          <Link to="/about" style={styles.navLinks}>
        About
      </Link>
      <Link to="/contact" style={styles.navLinks}>
        Contact
      </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <h2 style={styles.heroH2}>Welcome to HRMS Website</h2>
        <p style={styles.heroP}>
          Empowering businesses with efficient HR solutions
        </p>
        <button
          style={styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to="/Login" style={{ textDecoration: "none", color: "white" }}>
            Get Started
          </Link>
        </button>
      </header>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 HRMS Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
