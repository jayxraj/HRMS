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
    @GetMapping("/applications/{candidateName}")
    public ResponseEntity<List<JobApplication>> getCandidateApplications(@PathVariable String candidateName) {
        try {
            List<JobApplication> applications = candidateService.getApplicationsByCandidate(candidateName);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    // ✅ Candidate Applies for a Job
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@RequestParam Long jobPostingId,
                                         @RequestParam String candidateName,
                                         @RequestParam String resumeUrl) {
        try {
            // ✅ Debugging: Print received parameters
            System.out.println("Applying for job: " + jobPostingId);
            System.out.println("Candidate Name: " + candidateName);
            System.out.println("Resume URL: " + resumeUrl);

            if (candidateName.isEmpty() || resumeUrl.isEmpty()) {
                return ResponseEntity.badRequest().body("Candidate name and resume URL are required.");
            }

            JobApplication application = candidateService.applyForJob(jobPostingId, candidateName, resumeUrl);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            e.printStackTrace(); // ✅ Print full error stack trace
            return ResponseEntity.status(500).body("Error applying for job: " + e.getMessage());
        }
    }

    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is required.");
            }

            String uploadDir = "uploads/resumes/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // ✅ Return the correct file access URL
            String fileUrl = "/uploads/resumes/" + fileName;
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading resume: " + e.getMessage());
        }
    }
}