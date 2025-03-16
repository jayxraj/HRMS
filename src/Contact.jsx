import React from "react";
import { Box, Typography, Card, CardContent, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Contact = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
        paddingBottom: "20px",
        bgcolor: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Contact HR Support
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ maxWidth: 600, textAlign: "center" }}
      >
        Have a question about your payroll, leave, or other HR-related queries? Reach out to us and we’ll be happy to assist you!
      </Typography>

      <Card
        sx={{
          maxWidth: 600,
          marginTop: 4,
          padding: 3,
          boxShadow: 5,
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            HR Department Details
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOnIcon color="primary" /> <strong>Office Address:</strong>{" "}
            Corporate Office, Tech Tower, Bangalore, Karnataka
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
          >
            <PhoneIcon color="primary" /> <strong>HR Helpline:</strong>{" "}
            1-800-HR-HELP
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
          >
            <EmailIcon color="primary" /> <strong>Email:</strong>{" "}
            hrsupport@excelestate.com
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
          >
            <AccessTimeIcon color="primary" /> <strong>Working Hours:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            Mon-Fri: 9:00 AM to 6:00 PM
            <br />
            Sat: 10:00 AM to 2:00 PM
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="body1" paragraph>
          For HR-related inquiries, please fill out our{" "}
          <strong>Employee Feedback Form</strong>:
        </Typography>
        <Link
          href="https://forms.gle/dummyformlink" // Replace with actual feedback form link
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontSize: "18px", fontWeight: "bold", color: "#1976d2" }}
        >
          Submit Feedback
        </Link>
      </Box>
    </Box>
  );
};

export default Contact;
