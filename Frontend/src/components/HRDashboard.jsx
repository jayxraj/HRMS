import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import "../Style/hrdash.css";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Grid,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  AttachMoney as AttachMoneyIcon,
  AccessTime as AccessTimeIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

const drawerWidth = 240;

const handleLogout = () => {
  // Clear authentication token
  localStorage.removeItem("token");
  // Redirect to login page
  window.location.href = "/login";
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: -190,
      // marginTop: ,
    }),
  })
);

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...{
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const HRDashboard = () => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("employees");
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reviews, setReviews] = useState({});
  const [employees, setEmployees] = useState([]);
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    department: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case "employees":
          await fetchEmployees();
          break;
        case "attendance":
          await fetchAttendance();
          break;
        case "payroll":
          await fetchPayrollRecords();
          break;
        case "jobs":
          await fetchJobPostings();
          break;
        case "applications":
          await fetchApplications();
          break;
        case "leave":
          await fetchLeaveRequests();
          break;
        case "reviews":
          await fetchPerformanceReviews();
          await fetchEmployees();
          break;
        default:
          await fetchEmployees();
      }
    } catch (err) {
      setError(`Failed to load ${activeTab} data`);
    } finally {
      setLoading(false);
    }
  };
  const [formData, setFormData] = useState({
    employeeId: "",
    grossSalary: "",
    deductions: "",
  });
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("/api/hr/attendance");
      setAttendance(response.data);
    } catch (err) {
      setError("Failed to load attendance records");
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("/api/hr/leave-requests");
      setLeaveRequests(response.data);
    } catch (err) {
      setError("Failed to load leave requests");
    }
  };

  const fetchPayrollRecords = async () => {
    try {
      const response = await axios.get("/api/hr/payroll-records");
      setPayroll(response.data);
    } catch (err) {
      setError("Error fetching payroll records.");
    }
  };
  const handleGeneratePayroll = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/hr/payroll", null, {
        params: formData,
      });
      setPayroll([response.data, ...payroll]); // Add new record at beginning
      setSuccessMessage("Payroll generated successfully!");
      setFormData({
        employeeId: "",
        grossSalary: "",
        deductions: "",
      });
    } catch (err) {
      setError(
        "Error generating payroll: " +
          (err.response?.data?.message || err.message)
      );
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("/api/hr/job-postings");
      setJobPostings(response.data);
    } catch (err) {
      setError("Error fetching job postings.");
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/api/hr/job-applications");
      setApplications(response.data);
    } catch (err) {
      setError("Error fetching job applications.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/hr/employees");
      setEmployees(response.data);
    } catch (err) {
      setError("Error fetching employees.");
    }
  };

  const fetchPerformanceReviews = async () => {
    try {
      const response = await axios.get("/api/hr/performance-reviews");
      setPerformanceReviews(response.data);
    } catch (err) {
      setError("Error fetching performance reviews.");
    }
  };

  const handleUpdateLeaveRequest = async (id, status) => {
    try {
      await axios.put(`/api/hr/leave-request/${id}?status=${status}`);
      setLeaveRequests(
        leaveRequests.map((lr) => (lr.id === id ? { ...lr, status } : lr))
      );
      setSuccessMessage(`Leave request ${status.toLowerCase()} successfully!`);
    } catch (err) {
      setError("Failed to update leave request");
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    try {
      await axios.put(`/api/hr/job-application/${id}?status=${status}`);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      setSuccessMessage(`Application ${status.toLowerCase()} successfully!`);
    } catch (err) {
      setError("Failed to update application status");
    }
  };

  const handleCreateJobPosting = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/hr/job-posting", newJob);
      setSuccessMessage("Job posted successfully!");
      setOpenJobDialog(false);
      setNewJob({ title: "", description: "", department: "" });
      fetchJobPostings();
    } catch (err) {
      setError("Error creating job posting.");
    }
  };

  const handleReviewChange = (employeeId, field, value) => {
    setReviews((prev) => ({
      ...prev,
      [employeeId]: { ...(prev[employeeId] || {}), [field]: value },
    }));
  };

  const openReviewDialog = (employee) => {
    setSelectedEmployee(employee);
    setReviews((prev) => ({
      ...prev,
      [employee.id]: {
        review: prev[employee.id]?.review || "",
        rating: prev[employee.id]?.rating || 0,
      },
    }));
    setReviewDialogOpen(true);
  };

  const submitReview = async () => {
    if (!selectedEmployee) {
      setError("No employee selected for review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in again.");
        return;
      }

      const reviewData = {
        employeeId: selectedEmployee.id,
        reviewer: "HR Manager",
        review: reviews[selectedEmployee.id]?.review || "",
        rating: reviews[selectedEmployee.id]?.rating || 0,
      };

      await axios.post("/api/hr/performance-review", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Review submitted successfully!");
      setReviewDialogOpen(false);
      fetchPerformanceReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(error.response?.data?.message || "Error submitting review");
    }
  };

  const handleCloseSnackbar = () => {
    setError("");
    setSuccessMessage("");
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      );
    }

    switch (activeTab) {
      case "employees":
        return (
          <Card sx={{ width: "60vw" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Employee List
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar sx={{ mr: 2 }}>
                              {emp.username.charAt(0)}
                            </Avatar>
                            {emp.username}
                          </Box>
                        </TableCell>
                        <TableCell>{emp.email}</TableCell>
                        <TableCell>{emp.role}</TableCell>
                        <TableCell>
                          <Typography
                            variant="text"
                            size="small"
                            onClick={() => openReviewDialog(emp)}
                            sx={{
                              textTransform: "none",
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "transparent",
                                textDecoration: "underline",
                                cursor: "pointer",
                              },
                            }}
                          >
                            Add Review
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );

      case "attendance":
        return (
          <Card>
            <CardContent>
              <Box sx={{ width: "70vw" ,mt: "560px"}}>
                <Typography variant="h6" gutterBottom>
                  Employee Attendance
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TableContainer component={Paper} className="table-container">
                  <Table className="table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Present</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendance.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.employeeId}</TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.present ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        );

      case "payroll":
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate Payroll
              </Typography>

              <form onSubmit={handleGeneratePayroll}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      name="employeeId"
                      label="Employee ID"
                      type="number"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      name="grossSalary"
                      label="Gross Salary"
                      type="number"
                      value={formData.grossSalary}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      name="deductions"
                      label="Deductions"
                      type="number"
                      value={formData.deductions}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Generate Payroll
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Payroll Records
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Gross Salary</TableCell>
                      <TableCell>Deductions</TableCell>
                      <TableCell>Net Salary</TableCell>
                      <TableCell>Payment Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payroll.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.employeeId}</TableCell>
                        <TableCell>₹{record.grossSalary}</TableCell>
                        <TableCell>₹{record.deductions}</TableCell>
                        <TableCell>₹{record.netSalary}</TableCell>
                        <TableCell>
                          {new Date(record.paymentDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );

      case "jobs":
        return (
          <Card sx={{ mb: 3, width: "70vw" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5">Job Postings</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenJobDialog(true)}
                >
                  New Job
                </Button>
              </Box>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobPostings.map((job) => (
                      <TableRow key={job.id || job._id}>
                        <TableCell>{job.title || "No Title"}</TableCell>
                        <TableCell>
                          {job.department || "Not Specified"}
                        </TableCell>
                        <TableCell>
                          {job.description
                            ? job.description.length > 50
                              ? `${job.description.substring(0, 50)}...`
                              : job.description
                            : "No description"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      case "applications":
        return (
          <Card sx={{ mb: 3, width: "70vw" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Job Applications
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Candidate</TableCell>
                      <TableCell>Job Title</TableCell>
                      <TableCell>Resume</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id || app._id}>
                        <TableCell>
                          {app.candidateName || "Anonymous"}
                        </TableCell>
                        <TableCell>
                          {app.jobPosting?.title || "Job not found"}
                        </TableCell>
                        <TableCell>
                          {app.resumeUrl && (
                            <Typography
                              variant="text"
                              onClick={() => {
                                const resumeUrl = app.resumeUrl.startsWith(
                                  "http"
                                )
                                  ? app.resumeUrl
                                  : `http://localhost:8080${app.resumeUrl}`;
                                window.open(
                                  resumeUrl,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                              sx={{
                                textTransform: "none",
                                color: "primary.main",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              Resume
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            color={
                              app.status === "APPROVED"
                                ? "success.main"
                                : app.status === "REJECTED"
                                ? "error.main"
                                : "warning.main"
                            }
                            fontWeight="medium"
                          >
                            {app.status || "PENDING"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {(!app.status || app.status === "PENDING") && (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography
                                component="a"
                                sx={{
                                  color: "success.main",
                                  cursor: "pointer",
                                  textDecoration: "none",
                                  "&:hover": { textDecoration: "underline" },
                                  fontSize: "0.875rem",
                                }}
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    app.id || app._id,
                                    "APPROVED"
                                  )
                                }
                              >
                                Approve
                              </Typography>
                              <Typography
                                component="a"
                                sx={{
                                  color: "error.main",
                                  cursor: "pointer",
                                  textDecoration: "none",
                                  "&:hover": { textDecoration: "underline" },
                                  fontSize: "0.875rem",
                                }}
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    app.id || app._id,
                                    "REJECTED"
                                  )
                                }
                              >
                                Reject
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      case "leave":
        return (
          <Card sx={{ mb: 3, width: "70vw" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Leave Requests
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          {employees.find((e) => e.id === request.employeeId)
                            ?.username || "Unknown"}
                        </TableCell>
                        <TableCell>
                          {format(new Date(request.startDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(request.endDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell>
                          <Typography
                            color={
                              request.status === "APPROVED"
                                ? "success.main"
                                : request.status === "REJECTED"
                                ? "error.main"
                                : "warning.main"
                            }
                          >
                            {request.status}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {request.status === "PENDING" && (
                            <>
                              <Typography
                                color="success"
                                onClick={() =>
                                  handleUpdateLeaveRequest(
                                    request.id,
                                    "APPROVED"
                                  )
                                }
                              >
                                Accept
                              </Typography>
                              <Typography
                                color="error"
                                onClick={() =>
                                  handleUpdateLeaveRequest(
                                    request.id,
                                    "REJECTED"
                                  )
                                }
                              >
                                Reject
                              </Typography>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );

      case "reviews":
        return (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Performance Reviews
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Reviewer</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Review</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {performanceReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          {employees.find((e) => e.id === review.employeeId)
                            ?.username || "Unknown"}
                        </TableCell>
                        <TableCell>{review.reviewer}</TableCell>
                        <TableCell>
                          <Rating
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            icon={<StarIcon fontSize="inherit" />}
                          />
                        </TableCell>
                        <TableCell>
                          {review.review.length > 50
                            ? `${review.review.substring(0, 50)}...`
                            : review.review}
                        </TableCell>
                        <TableCell>
                          {format(new Date(review.reviewDate), "MMM dd, yyyy")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );

      default:
        return <Card></Card>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            pr: "24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            HR Management System
          </Typography>
          <Typography
            color="inherit"
            onClick={handleLogout}
            sx={{
              textTransform: "none", // Prevents uppercase transformation
              fontSize: "1rem", // Matches typography
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => setActiveTab("employees")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("attendance")}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("payroll")}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("leave")}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Requests" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("jobs")}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Job Postings" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("applications")}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItem>
          <ListItem button onClick={() => setActiveTab("reviews")}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Performance Reviews" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg">{renderTabContent()}</Container>
      </Main>

      {/* Job Posting Dialog */}
      <Dialog open={openJobDialog} onClose={() => setOpenJobDialog(false)}>
        <DialogTitle>Create New Job Posting</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleCreateJobPosting}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Department"
              value={newJob.department}
              onChange={(e) =>
                setNewJob({ ...newJob, department: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={newJob.description}
              onChange={(e) =>
                setNewJob({ ...newJob, description: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJobDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateJobPosting} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Performance Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
      >
        <DialogTitle>
          Performance Review for {selectedEmployee?.username}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={reviews[selectedEmployee?.id]?.rating || 0}
              onChange={(event, newValue) =>
                handleReviewChange(selectedEmployee?.id, "rating", newValue)
              }
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              icon={<StarIcon fontSize="inherit" />}
            />
          </Box>
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Review Comments"
            value={reviews[selectedEmployee?.id]?.review || ""}
            onChange={(e) =>
              handleReviewChange(selectedEmployee?.id, "review", e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button onClick={submitReview} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for messages */}
      <Snackbar
        open={!!error || !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HRDashboard;
