package com.hrm.repository;

import com.hrm.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    // Find job postings by department
    List<JobPosting> findByDepartment(String department);

    // Find active job postings (where closing date is in the future)
    List<JobPosting> findByClosingDateAfter(LocalDate currentDate);
}