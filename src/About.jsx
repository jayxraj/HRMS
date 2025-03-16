import React from "react";
import { Box, Typography, Card, CardContent, Container } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        padding: "40px 20px",
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 5, borderRadius: "10px", backgroundColor: "#fff" }}>
          <CardContent sx={{ padding: "40px" }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
              About Us
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "center", color: "text.secondary" }}>
              Welcome to our HR Management System, a comprehensive solution designed to streamline HR processes, 
              enhance employee engagement, and optimize workforce management. Our platform ensures efficiency, 
              accuracy, and compliance in handling all HR-related tasks.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4 }}>
              Who We Are
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              We are a team of dedicated professionals committed to revolutionizing HR management with innovative 
              technology. Our goal is to empower businesses with an intuitive, secure, and efficient HRMS platform 
              that simplifies workforce management.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4 }}>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Our vision is to create a future where HR operations are seamless, automated, and data-driven, enabling 
              organizations to focus on their most valuable asset – their people.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4 }}>
              Why Choose Our HRMS?
            </Typography>
            <Typography variant="body1" component="ul" color="text.secondary">
              <li>Comprehensive Employee Management</li>
              <li>Seamless Recruitment & Onboarding</li>
              <li>Automated Payroll Processing</li>
              <li>Advanced Performance Tracking</li>
              <li>Secure & Scalable Infrastructure</li>
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Whether you're a small business or a large enterprise, our HR Management System is designed to meet your 
              needs. Contact us today to learn how we can help streamline your HR processes.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default About;