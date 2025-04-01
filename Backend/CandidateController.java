package com.hrm.controller;

import com.hrm.model.JobApplication;
import com.hrm.model.JobPosting;
import com.hrm.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {
    @Autowired
    private CandidateService candidateService;

    // ✅ Candidates View Available Job Postings
    @GetMapping("/job-postings")
    public ResponseEntity<List<JobPosting>> getActiveJobPostings() {
        try {
            List<JobPosting> jobs = candidateService.getActiveJobPostings();
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // ✅ Candidate Applies for a Job
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(
            @RequestParam Long jobPostingId,
            @RequestParam String candidateName,
            @RequestParam String resumeUrl) {
        try {
            if (candidateName.isEmpty() || resumeUrl.isEmpty()) {
                return ResponseEntity.badRequest().body("Candidate name and resume URL are required.");
            }
            JobApplication application = candidateService.applyForJob(jobPostingId, candidateName, resumeUrl);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error applying for job: " + e.getMessage());
        }
    }

    // ✅ Candidate Uploads Resume
    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is required.");
            }
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get("uploads/" + fileName);
            Files.write(filePath, file.getBytes());

            String fileUrl = "http://localhost:8080/uploads/" + fileName;
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading resume: " + e.getMessage());
        }
    }
}
