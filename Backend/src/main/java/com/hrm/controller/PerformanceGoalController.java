package com.hrm.controller;

import com.hrm.model.PerformanceGoal;
import com.hrm.service.PerformanceGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/performance-goals")
public class PerformanceGoalController {
    @Autowired
    private PerformanceGoalService performanceGoalService;

    @PostMapping
    public PerformanceGoal setGoal(@RequestParam Long employeeId,
                                  @RequestParam String goal,
                                  @RequestParam String deadline) {
        return performanceGoalService.setGoal(employeeId, goal, LocalDate.parse(deadline));
    }

    @GetMapping("/employee/{employeeId}")
    public List<PerformanceGoal> getGoalsByEmployeeId(@PathVariable Long employeeId) {
        return performanceGoalService.getGoalsByEmployeeId(employeeId);
    }

    @PutMapping("/{id}/complete")
    public PerformanceGoal markGoalCompleted(@PathVariable Long id) {
        return performanceGoalService.markGoalCompleted(id);
    }
}