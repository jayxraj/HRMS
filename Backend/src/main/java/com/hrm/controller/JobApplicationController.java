package com.hrm.controller;

import com.hrm.model.JobApplication;
import com.hrm.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {
    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping("/apply")
    public JobApplication applyForJob(@RequestParam Long jobPostingId,
                                     @RequestParam String candidateName,
                                     @RequestParam String resumeUrl) {
        return jobApplicationService.applyForJob(jobPostingId, candidateName, resumeUrl);
    }

    @GetMapping("/job-posting/{jobPostingId}")
    public List<JobApplication> getApplicationsByJobPostingId(@PathVariable Long jobPostingId) {
        return jobApplicationService.getApplicationsByJobPostingId(jobPostingId);
    }

    @GetMapping("/status/{status}")
    public List<JobApplication> getApplicationsByStatus(@PathVariable String status) {
        return jobApplicationService.getApplicationsByStatus(status);
    }

    @PutMapping("/{id}/status")
    public JobApplication updateApplicationStatus(@PathVariable Long id,
                                                 @RequestParam String status) {
        return jobApplicationService.updateApplicationStatus(id, status);
    }
}