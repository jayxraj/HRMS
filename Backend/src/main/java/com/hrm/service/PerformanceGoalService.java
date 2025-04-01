package com.hrm.service;

import com.hrm.model.PerformanceGoal;
import com.hrm.repository.PerformanceGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PerformanceGoalService {
    @Autowired
    private PerformanceGoalRepository performanceGoalRepository;

    public PerformanceGoal setGoal(Long employeeId, String goal, LocalDate deadline) {
        PerformanceGoal performanceGoal = new PerformanceGoal();
        performanceGoal.setEmployeeId(employeeId);
        performanceGoal.setGoal(goal);
        performanceGoal.setDeadline(deadline);
        performanceGoal.setCompleted(false);
        return performanceGoalRepository.save(performanceGoal);
    }

    public List<PerformanceGoal> getGoalsByEmployeeId(Long employeeId) {
        return performanceGoalRepository.findByEmployeeId(employeeId);
    }

    public PerformanceGoal markGoalCompleted(Long id) {
        PerformanceGoal performanceGoal = performanceGoalRepository.findById(id).orElse(null);
        if (performanceGoal != null) {
            performanceGoal.setCompleted(true);
            return performanceGoalRepository.save(performanceGoal);
        }
        return null;
    }
}