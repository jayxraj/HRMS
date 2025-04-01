package com.hrm.controller;

import com.hrm.model.JobPosting;
import com.hrm.service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/job-postings")
public class JobPostingController {
    @Autowired
    private JobPostingService jobPostingService;

    @PostMapping
    public JobPosting createJobPosting(@RequestParam String title,
                                       @RequestParam String description,
                                       @RequestParam String department,
                                       @RequestParam String postingDate,
                                       @RequestParam String closingDate) {
        return jobPostingService.createJobPosting(title, description, department,
                LocalDate.parse(postingDate), LocalDate.parse(closingDate));
    }

    @GetMapping("/department/{department}")
    public List<JobPosting> getJobPostingsByDepartment(@PathVariable String department) {
        return jobPostingService.getJobPostingsByDepartment(department);
    }

    @GetMapping("/active")
    public List<JobPosting> getActiveJobPostings() {
        return jobPostingService.getActiveJobPostings();
    }
}