package com.hrm.service;

import com.hrm.model.*;
import com.hrm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class HRService {

    private static final Logger LOGGER = Logger.getLogger(HRService.class.getName());

    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired  // ✅ Injecting JobApplicationRepository
    private JobApplicationRepository jobApplicationRepository;
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Get Attendance for Employee
    public List<Attendance> getEmployeeAttendance(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    // ✅ Get All Attendance
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // ✅ Get Leave Request by ID
    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }

    // ✅ Get All Leave Requests
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    // ✅ Get All Payroll Records
    public List<Payroll> getAllPayrollRecords() {
        return payrollRepository.findAll();
    }
    // ✅ Fetch all job applications
    public List<JobApplication> getAllJobApplications() {
        return jobApplicationRepository.findAll();
    }

    // ✅ Update Leave Request Status
    public LeaveRequest updateLeaveRequest(Long id, String status) {
        Optional<LeaveRequest> leaveRequest = leaveRequestRepository.findById(id);
        if (leaveRequest.isPresent()) {
            LeaveRequest request = leaveRequest.get();
            request.setStatus(status);
            return leaveRequestRepository.save(request);
        }
        return null;
    }

 // ✅ Create a Job Posting
    public JobPosting createJobPosting(JobPosting jobPosting) {
        return jobPostingRepository.save(jobPosting);
    }

    // ✅ Generate Payroll
    public Payroll generatePayroll(Long employeeId, double grossSalary, double deductions) {
        if (grossSalary < 0 || deductions < 0) {
            LOGGER.warning("Invalid salary or deductions provided.");
            return null;
        }

        Payroll payroll = new Payroll();
        payroll.setEmployeeId(employeeId);
        payroll.setGrossSalary(grossSalary);
        payroll.setDeductions(deductions);
        payroll.setNetSalary(grossSalary - deductions);
        payroll.setPaymentDate(LocalDate.now());

        return payrollRepository.save(payroll);
    }

    // ✅ Create Job Posting with Details
    public JobPosting createJobPosting(String title, String description, String department,
                                       LocalDate postingDate, LocalDate closingDate) {
        JobPosting jobPosting = new JobPosting();
        jobPosting.setTitle(title);
        jobPosting.setDescription(description);
        jobPosting.setDepartment(department);
        jobPosting.setPostingDate(postingDate);
        jobPosting.setClosingDate(closingDate);
        return jobPostingRepository.save(jobPosting);
    }

    // ✅ Add Employee
    public User addEmployee(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole(Role.EMPLOYEE);
        return userRepository.save(user);
    }

    // ✅ Update Employee
    public User updateEmployee(Long id, String username, String email) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(username);
            user.setEmail(email);
            return userRepository.save(user);
        }
        return null;
    }

    // ✅ Delete Employee
    public void deleteEmployee(Long id) {
        userRepository.deleteById(id);
    }

 // ✅ Fetch all Job Postings
    public List<JobPosting> getAllJobPostings() {
        List<JobPosting> jobPostings = jobPostingRepository.findAll();

        if (jobPostings.isEmpty()) {
            LOGGER.info("No job postings found.");
        }

        return jobPostings;
    }
   
 // ✅ Approve or Reject Job Application
    public JobApplication updateApplicationStatus(Long id, String status) {
        return jobApplicationRepository.findById(id).map(application -> {
            application.setStatus(status);
            return jobApplicationRepository.save(application);
        }).orElse(null);
    }

}
