package com.hrm.service;

import com.hrm.model.JobPosting;
import com.hrm.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobPostingService {
    @Autowired
    private JobPostingRepository jobPostingRepository;

    public JobPosting createJobPosting(String title, String description, String department,
                                       LocalDate postingDate, LocalDate closingDate) {
        JobPosting jobPosting = new JobPosting();
        jobPosting.setTitle(title);
        jobPosting.setDescription(description);
        jobPosting.setDepartment(department);
        jobPosting.setPostingDate(postingDate);
        jobPosting.setClosingDate(closingDate);
        return jobPostingRepository.save(jobPosting);
    }

    public List<JobPosting> getJobPostingsByDepartment(String department) {
        return jobPostingRepository.findByDepartment(department);
    }

    public List<JobPosting> getActiveJobPostings() {
        return jobPostingRepository.findByClosingDateAfter(LocalDate.now());
    }
}