import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";

const EmployeeDashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Employee Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <AccessTimeIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                My Leaves
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <MonetizationOnIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Payslip Available
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                March 2025
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <SchoolIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Training Sessions
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                2
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <StarIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Performance Rating
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                4.5/5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;
