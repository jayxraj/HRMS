package com.hrm.service;

import com.hrm.model.JobApplication;
import com.hrm.model.JobPosting;
import com.hrm.repository.JobApplicationRepository;
import com.hrm.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository; // ✅ Added repository to fetch job posting

    // ✅ Apply for a job
    public JobApplication applyForJob(Long jobPostingId, String candidateName, String resumeUrl) {
        Optional<JobPosting> jobPostingOpt = jobPostingRepository.findById(jobPostingId);
        
        if (jobPostingOpt.isEmpty()) {
            throw new RuntimeException("Job posting not found with ID: " + jobPostingId);
        }

        JobApplication jobApplication = new JobApplication();
        jobApplication.setJobPosting(jobPostingOpt.get()); // ✅ Fix: Use setJobPosting()
        jobApplication.setCandidateName(candidateName);
        jobApplication.setResumeUrl(resumeUrl);
        jobApplication.setStatus("Pending");

        return jobApplicationRepository.save(jobApplication);
    }

    // ✅ Get applications by Job Posting ID
    public List<JobApplication> getApplicationsByJobPostingId(Long jobPostingId) {
        return jobApplicationRepository.findByJobPostingId(jobPostingId);
    }

    // ✅ Get applications by Status
    public List<JobApplication> getApplicationsByStatus(String status) {
        return jobApplicationRepository.findByStatus(status);
    }

    // ✅ Update application status
    public JobApplication updateApplicationStatus(Long id, String status) {
        Optional<JobApplication> jobApplicationOpt = jobApplicationRepository.findById(id);
        if (jobApplicationOpt.isPresent()) {
            JobApplication jobApplication = jobApplicationOpt.get();
            jobApplication.setStatus(status);
            return jobApplicationRepository.save(jobApplication);
        }
        return null;
    }
}
