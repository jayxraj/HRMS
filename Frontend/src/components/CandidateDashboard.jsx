import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  Avatar,
  LinearProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import {
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: "bold",
  backgroundColor:
    status === "APPROVED"
      ? "rgba(56, 142, 60, 0.1)"
      : status === "REJECTED"
      ? "rgba(211, 47, 47, 0.1)"
      : "rgba(245, 124, 0, 0.1)",
  color:
    status === "APPROVED"
      ? "#388e3c"
      : status === "REJECTED"
      ? "#d32f2f"
      : "#f57c00",
}));

const CandidateDashboard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState({
    jobPostingId: "",
    candidateName: "",
    resumeUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const isMounted = useRef(true);

  const token = localStorage.getItem("token");
  const candidateName = localStorage.getItem("username");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/candidate/job-postings",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (isMounted.current) {
        setJobPostings(response.data || []);
      }
    } catch (err) {
      setError("Failed to load job postings.");
      showSnackbar("Failed to load job postings.", "error");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchApplications = useCallback(async () => {
    if (!candidateName) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/candidate/applications/${candidateName}`
      );
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      showSnackbar("Failed to load applications.", "error");
    }
  }, [candidateName]);

  useEffect(() => {
    isMounted.current = true;
    fetchJobs();
    fetchApplications();

    const interval = setInterval(() => {
      fetchApplications();
    }, 10000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, [fetchJobs, fetchApplications]);

  const handleApplyForJob = async () => {
    if (!token) {
      showSnackbar("You must be logged in to apply for jobs.", "error");
      return;
    }

    if (!application.jobPostingId) {
      showSnackbar("Please select a job before applying.", "error");
      return;
    }

    if (!application.candidateName || !application.resumeUrl) {
      showSnackbar(
        "Enter your name and upload a resume before applying.",
        "error"
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/candidate/apply", null, {
        params: {
          jobPostingId: application.jobPostingId,
          candidateName: application.candidateName,
          resumeUrl: application.resumeUrl,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      showSnackbar("Application submitted successfully!");
      setApplication({ jobPostingId: "", candidateName: "", resumeUrl: "" });
      fetchApplications();
    } catch (err) {
      showSnackbar("Failed to submit application.", "error");
    }
  };

  const handleUploadResume = async (file) => {
    if (!token) {
      showSnackbar("You must be logged in to upload a resume.", "error");
      return;
    }

    if (!file) {
      showSnackbar("Please select a file to upload.", "error");
      return;
    }

    if (file.type !== "application/pdf") {
      showSnackbar("Please upload a PDF file.", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/candidate/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setApplication((prevState) => ({
        ...prevState,
        resumeUrl: response.data,
      }));

      showSnackbar("Resume uploaded successfully!");
    } catch (err) {
      showSnackbar("Failed to upload resume.", "error");
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircleIcon color="success" />;
      case "REJECTED":
        return <CancelIcon color="error" />;
      default:
        return <PendingIcon color="warning" />;
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Candidate Dashboard
      </Typography>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Job Postings Section */}
      <Box mb={6}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Available Job Opportunities
        </Typography>

        {error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : jobPostings.length > 0 ? (
          <Grid container spacing={3}>
            {jobPostings.map((posting) => {
              const alreadyApplied = applications.some(
                (app) => app.jobPosting.id === posting.id
              );
              return (
                <Grid item xs={12} sm={6} md={4} key={posting.id}>
                  <StyledCard>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {posting.title}
                      </Typography>
                      <Chip
                        label={posting.department}
                        size="small"
                        sx={{ mb: 2 }}
                        color="primary"
                        variant="outlined"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {posting.description || "No description available."}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant={alreadyApplied ? "outlined" : "contained"}
                        fullWidth
                        onClick={() => {
                          setApplication((prevState) => ({
                            ...prevState,
                            jobPostingId: posting.id,
                            candidateName: candidateName,
                          }));
                        }}
                        disabled={alreadyApplied}
                        sx={{
                          mt: "auto",
                          fontWeight: 600,
                        }}
                      >
                        {alreadyApplied ? "Application Submitted" : "Apply Now"}
                      </Button>
                    </CardActions>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              No job postings available at the moment. Please check back later.
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Job Application Form */}
      {application.jobPostingId && (
        <Box mb={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Complete Your Application
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyForJob();
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    value={application.candidateName}
                    onChange={(e) =>
                      setApplication({
                        ...application,
                        candidateName: e.target.value,
                      })
                    }
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <input
                      accept=".pdf"
                      style={{ display: "none" }}
                      id="resume-upload"
                      type="file"
                      onChange={(e) => handleUploadResume(e.target.files[0])}
                    />
                    <label htmlFor="resume-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<UploadIcon />}
                        disabled={uploading}
                      >
                        Upload Resume
                      </Button>
                    </label>
                    {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                    {application.resumeUrl && !uploading && (
                      <Chip
                        label="Resume Uploaded"
                        color="success"
                        variant="outlined"
                        sx={{ ml: 2 }}
                        avatar={<CheckCircleIcon />}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    PDF files only (max 5MB)
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={uploading || !application.resumeUrl}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Submit Application
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Application Status Table */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Your Applications
        </Typography>

        {applications.length > 0 ? (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead
                sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id} hover>
                    <TableCell>{app.jobPosting?.title}</TableCell>
                    <TableCell>{app.jobPosting?.department}</TableCell>
                    <TableCell align="center">
                      <StatusChip
                        status={app.status}
                        label={app.status}
                        icon={getStatusIcon(app.status)}
                        sx={{
                          minWidth: 120,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              You haven't applied to any jobs yet.
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbarSeverity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateDashboard;
