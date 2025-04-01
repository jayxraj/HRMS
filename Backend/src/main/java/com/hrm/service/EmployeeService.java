package com.hrm.service;

import com.hrm.model.*;
import com.hrm.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeService {

    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final PayrollRepository payrollRepository;
    private final PerformanceReviewRepository performanceReviewRepository;

    public EmployeeService(AttendanceRepository attendanceRepository,
                          LeaveRequestRepository leaveRequestRepository,
                          PayrollRepository payrollRepository,
                          PerformanceReviewRepository performanceReviewRepository) {
        this.attendanceRepository = attendanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.payrollRepository = payrollRepository;
        this.performanceReviewRepository = performanceReviewRepository;
    }

    public Attendance markAttendance(Long employeeId, boolean present) {
        Attendance attendance = new Attendance();
        attendance.setEmployeeId(employeeId);
        attendance.setDate(LocalDate.now());
        attendance.setPresent(present);
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getEmployeeAttendance(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    public LeaveRequest requestLeave(Long employeeId, LocalDate startDate, 
                                    LocalDate endDate, String reason) {
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployeeId(employeeId);
        leaveRequest.setStartDate(startDate);
        leaveRequest.setEndDate(endDate);
        leaveRequest.setReason(reason);
        leaveRequest.setStatus("PENDING");
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeaveRequests(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<Payroll> getPayroll(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    public List<PerformanceReview> getPerformanceReviews(Long employeeId) {
        return performanceReviewRepository.findByEmployeeId(employeeId);
    }
}