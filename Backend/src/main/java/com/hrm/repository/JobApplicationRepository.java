package com.hrm.repository;

import com.hrm.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJobPostingId(Long jobPostingId);
    List<JobApplication> findByStatus(String status);
	List<JobApplication> findByCandidateName(String candidateName);
}