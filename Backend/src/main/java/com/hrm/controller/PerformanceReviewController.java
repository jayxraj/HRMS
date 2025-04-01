package com.hrm.controller;

import com.hrm.model.PerformanceReview;
import com.hrm.service.PerformanceReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance-reviews")
public class PerformanceReviewController {
    @Autowired
    private PerformanceReviewService performanceReviewService;

    @PostMapping
    public PerformanceReview addReview(@RequestParam Long employeeId,
                                       @RequestParam String reviewer,
                                       @RequestParam String review,
                                       @RequestParam int rating) {
        return performanceReviewService.addReview(employeeId, reviewer, review, rating);
    }

    @GetMapping("/employee/{employeeId}")
    public List<PerformanceReview> getReviewsByEmployeeId(@PathVariable Long employeeId) {
        return performanceReviewService.getReviewsByEmployeeId(employeeId);
    }
}