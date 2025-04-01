package com.hrm.controller;

import com.hrm.model.*;
import com.hrm.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/attendance")
    public ResponseEntity<?> markAttendance(@RequestBody AttendanceRequest request) {
        try {
            Attendance attendance = employeeService.markAttendance(
                request.getEmployeeId(),
                request.isPresent()
            );
            return ResponseEntity.ok(attendance);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error marking attendance: " + e.getMessage());
        }
    }

    @GetMapping("/attendance")
    public ResponseEntity<?> getAttendanceRecords(@RequestParam Long employeeId) {
        try {
            List<Attendance> records = employeeService.getEmployeeAttendance(employeeId);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching attendance: " + e.getMessage());
        }
    }

    @PostMapping("/leave-requests")
    public ResponseEntity<?> requestLeave(@RequestBody LeaveRequestDTO request) {
        try {
            LeaveRequest leave = employeeService.requestLeave(
                request.getEmployeeId(),
                request.getStartDate(),
                request.getEndDate(),
                request.getReason()
            );
            return ResponseEntity.ok("Leave request submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error creating leave request: " + e.getMessage());
        }
    }

    @GetMapping("/leave-requests")
    public ResponseEntity<?> getLeaveRequests(@RequestParam Long employeeId) {
        try {
            List<LeaveRequest> requests = employeeService.getLeaveRequests(employeeId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching leave requests: " + e.getMessage());
        }
    }

    @GetMapping("/payroll/{employeeId}")
    public ResponseEntity<?> getPayroll(@PathVariable Long employeeId) {
        try {
            List<Payroll> payroll = employeeService.getPayroll(employeeId);
            return ResponseEntity.ok(payroll);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching payroll: " + e.getMessage());
        }
    }

    @GetMapping("/performance-reviews")
    public ResponseEntity<?> getPerformanceReviews(@RequestParam Long employeeId) {
        try {
            List<PerformanceReview> reviews = employeeService.getPerformanceReviews(employeeId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error fetching performance reviews: " + e.getMessage());
        }
    }

    // DTO Classes
    public static class AttendanceRequest {
        private Long employeeId;
        private boolean present;

        // Getters and setters
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public boolean isPresent() { return present; }
        public void setPresent(boolean present) { this.present = present; }
    }

    public static class LeaveRequestDTO {
        private Long employeeId;
        private LocalDate startDate;
        private LocalDate endDate;
        private String reason;

        // Getters and setters
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public LocalDate getStartDate() { return startDate; }
        public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
        public LocalDate getEndDate() { return endDate; }
        public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}