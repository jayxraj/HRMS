package com.hrm.service;

import com.hrm.model.PerformanceReview;
import com.hrm.repository.PerformanceReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PerformanceReviewService {
    @Autowired
    private PerformanceReviewRepository performanceReviewRepository;

    public PerformanceReview addReview(Long employeeId, String reviewer, String review, int rating) {
        PerformanceReview performanceReview = new PerformanceReview();
        performanceReview.setEmployeeId(employeeId);
        performanceReview.setReviewer(reviewer);
        performanceReview.setReview(review);
        performanceReview.setRating(rating);
        performanceReview.setReviewDate(LocalDate.now());
        return performanceReviewRepository.save(performanceReview);
    }

    public List<PerformanceReview> getReviewsByEmployeeId(Long employeeId) {
        return performanceReviewRepository.findByEmployeeId(employeeId);
    }

	public Object addPerformanceReview(PerformanceReview review) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<PerformanceReview> getAllReviews() {
	    return performanceReviewRepository.findAll();
	}

	public Object getEmployeeReviews(Long employeeId) {
		// TODO Auto-generated method stub
		return null;
	}

	public void saveReview(PerformanceReview review) {
		// TODO Auto-generated method stub
		
	}

}