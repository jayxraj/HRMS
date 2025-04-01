package com.hrm.controller;

import com.hrm.model.Attendance;
import com.hrm.model.JobApplication;
import com.hrm.model.JobPosting;
import com.hrm.model.LeaveRequest;
import com.hrm.model.Payroll;
import com.hrm.model.PerformanceReview;
import com.hrm.model.User;
import com.hrm.repository.JobApplicationRepository;
import com.hrm.repository.PerformanceReviewRepository;
import com.hrm.repository.UserRepository;
import com.hrm.service.HRService;
import com.hrm.service.PerformanceReviewService;
import com.hrm.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/hr")
public class HRController {

    private static final Logger LOGGER = Logger.getLogger(HRController.class.getName());

    @Autowired
    private HRService hrService;
    @Autowired
    private UserRepository userRepository;
    @Autowired  // ✅ Correctly inject the JwtUtil bean
    private JwtUtil jwtUtil;
    @Autowired
    private PerformanceReviewRepository performanceReviewRepository;
    @Autowired
    private PerformanceReviewService performanceReviewService;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // ✅ Fetch Employee Attendance (HR can view all attendance)
    @GetMapping("/attendance")
    public ResponseEntity<?> getEmployeeAttendance(@RequestParam(required = false) Long employeeId) {
        try {
            List<Attendance> records = (employeeId != null)
                    ? hrService.getEmployeeAttendance(employeeId)
                    : hrService.getAllAttendance();
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            LOGGER.severe("Error fetching attendance: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching attendance: " + e.getMessage());
        }
    }

    // ✅ Fetch Leave Requests
    @GetMapping("/leave-requests")
    public ResponseEntity<?> getLeaveRequests() {
        try {
            List<LeaveRequest> requests = hrService.getAllLeaveRequests();
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            LOGGER.severe("Error fetching leave requests: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching leave requests: " + e.getMessage());
        }
    }
    @GetMapping("/employee-performance-reviews")
    public ResponseEntity<?> getEmployeePerformanceReviews(@RequestHeader("Authorization") String token) {
        try {
            Long employeeId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            List<PerformanceReview> reviews = performanceReviewRepository.findByEmployeeId(employeeId);
            
            if (reviews.isEmpty()) {
                return ResponseEntity.ok("No reviews found for this employee.");
            }
            
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching performance reviews: " + e.getMessage());
        }
    }

    // ✅ Update Leave Request Status
    @PutMapping("/leave-request/{id}")
    public ResponseEntity<?> updateLeaveRequest(@PathVariable Long id, @RequestParam String status) {
        try {
            Optional<LeaveRequest> leaveRequestOptional = hrService.getLeaveRequestById(id);

            if (leaveRequestOptional.isEmpty()) {
                return ResponseEntity.status(404).body("Leave request not found.");
            }

            LeaveRequest leaveRequest = leaveRequestOptional.get();

            // Ensure only "PENDING" requests can be updated
            if (!"PENDING".equalsIgnoreCase(leaveRequest.getStatus())) {
                return ResponseEntity.status(400)
                        .body("Cannot update a leave request that is already " + leaveRequest.getStatus());
            }

            LeaveRequest updatedRequest = hrService.updateLeaveRequest(id, status);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            LOGGER.severe("Error updating leave request: " + e.getMessage());
            return ResponseEntity.status(500).body("Error updating leave request: " + e.getMessage());
        }
    }

    // ✅ Generate Payroll for an Employee
    @PostMapping("/payroll")
    public ResponseEntity<?> generatePayroll(@RequestParam Long employeeId,
                                             @RequestParam double grossSalary,
                                             @RequestParam double deductions) {
        try {
            if (grossSalary < 0 || deductions < 0) {
                return ResponseEntity.badRequest().body("Salary and deductions must be positive numbers.");
            }

            Payroll payroll = hrService.generatePayroll(employeeId, grossSalary, deductions);
            return ResponseEntity.ok(payroll);
        } catch (Exception e) {
            LOGGER.severe("Error generating payroll: " + e.getMessage());
            return ResponseEntity.status(500).body("Error generating payroll: " + e.getMessage());
        }
    }

    // ✅ Get All Payroll Records
    @GetMapping("/payroll-records")
    public ResponseEntity<?> getAllPayrollRecords() {
        try {
            List<Payroll> payrolls = hrService.getAllPayrollRecords();
            if (payrolls.isEmpty()) {
                return ResponseEntity.ok("No payroll records found.");
            }
            return ResponseEntity.ok(payrolls);
        } catch (Exception e) {
            LOGGER.severe("Error fetching payroll records: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching payroll records: " + e.getMessage());
        }
    }
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getAllEmployees() {
        try {
            List<User> employees = userRepository.findAll();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @PostMapping("/performance-review")
    public ResponseEntity<?> addPerformanceReview(
            @RequestBody PerformanceReview review,
            @RequestHeader("Authorization") String token) {
        try {
            System.out.println("🔍 JWT Token Received: " + token);

            // ✅ Extract user ID from JWT token
            Long loggedInUserId = jwtUtil.extractUserId(token.replace("Bearer ", ""));
            System.out.println("🔍 Extracted User ID: " + loggedInUserId);

            // ✅ Ensure the employee exists
            Optional<User> employee = userRepository.findById(review.getEmployeeId());
            if (employee.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
            }

            // ✅ Ensure required fields are not null
            if (review.getReviewer() == null || review.getReview() == null || review.getRating() == 0) {
                return ResponseEntity.badRequest().body("Missing required review fields.");
            }

            // ✅ Save the review
            review.setReviewDate(LocalDate.now());
            PerformanceReview savedReview = performanceReviewRepository.save(review);

            return ResponseEntity.ok(Map.of("message", "Review submitted successfully!", "review", savedReview));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error saving performance review: " + e.getMessage());
        }
    }

    // ✅ HR Posts a Job
    @PostMapping("/job-posting")
    public ResponseEntity<?> createJobPosting(@RequestBody JobPosting jobPosting) {
        try {
            JobPosting savedJob = hrService.createJobPosting(jobPosting);
            return ResponseEntity.ok(savedJob);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating job posting: " + e.getMessage());
        }
    }

    // ✅ HR Views All Job Postings
    @GetMapping("/job-postings")
    public ResponseEntity<List<JobPosting>> getAllJobPostings() {
        List<JobPosting> jobPostings = hrService.getAllJobPostings();
        return ResponseEntity.ok(jobPostings);
    }

    // ✅ HR Fetches All Job Applications
    @GetMapping("/job-applications")
    public ResponseEntity<?> getAllJobApplications() {
        try {
            List<JobApplication> applications = hrService.getAllJobApplications();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching job applications: " + e.getMessage());
        }
    }
    @GetMapping("/performance-reviews")
    public ResponseEntity<?> getAllPerformanceReviews() {
        try {
            List<PerformanceReview> reviews = performanceReviewService.getAllReviews();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching performance reviews: " + e.getMessage());
        }
    }


    // ✅ HR Approves or Rejects Job Application & Updates Status in DB
    @PutMapping("/job-application/{id}")
    public ResponseEntity<?> updateJobApplicationStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            JobApplication updatedApplication = hrService.updateApplicationStatus(id, status);
            if (updatedApplication == null) {
                return ResponseEntity.status(404).body("Application not found");
            }
            return ResponseEntity.ok(updatedApplication);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating application status: " + e.getMessage());
        }
    }

}
