package com.hrm.service;

import com.hrm.model.JobApplication;
import com.hrm.model.JobPosting;
import com.hrm.repository.JobApplicationRepository;
import com.hrm.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CandidateService {
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private FileStorageService fileStorageService;  // Ensure this service is implemented

    // ✅ Apply for a job
    public JobApplication applyForJob(Long jobPostingId, String candidateName, String resumeUrl) {
        Optional<JobPosting> jobPostingOpt = jobPostingRepository.findById(jobPostingId);

        if (jobPostingOpt.isEmpty()) {
            throw new RuntimeException("Job posting not found with id: " + jobPostingId);
        }

        JobApplication application = new JobApplication();
        application.setJobPosting(jobPostingOpt.get());  // ✅ Ensure JobPosting is set
        application.setCandidateName(candidateName);
        application.setResumeUrl(resumeUrl);
        application.setStatus("PENDING"); // ✅ Default status
        application.setAppliedDate(LocalDate.now());

        return jobApplicationRepository.save(application); // ✅ Save to DB
    }

    // ✅ View active job postings
    public List<JobPosting> getActiveJobPostings() {
        return jobPostingRepository.findAll();  // ✅ Fetch all job postings
    }

    // ✅ Upload resume
    public String uploadResume(MultipartFile file) {
        return fileStorageService.storeFile(file);  // Ensure this method is implemented
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
    // ✅ Fetch applications by candidate name (including updated status)
    public List<JobApplication> getApplicationsByCandidate(String candidateName) {
        return jobApplicationRepository.findByCandidateName(candidateName);
    }
	}
