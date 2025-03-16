import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <PeopleAltIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Employees
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                120
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <EventAvailableIcon
              color="secondary"
              sx={{ fontSize: 40, mr: 2 }}
            />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                On Leave
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{ display: "flex", alignItems: "center", p: 2, boxShadow: 3 }}
          >
            <WorkOutlineIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                New Hires
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                5
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
                Payroll Processed
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                $53,000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Performance Overview
            </Typography>
            <BarChartIcon color="primary" sx={{ fontSize: 80 }} />
            <Typography variant="body1" color="text.secondary">
              Analytics and reports will be displayed here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
