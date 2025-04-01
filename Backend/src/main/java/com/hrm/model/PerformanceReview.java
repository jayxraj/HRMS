package com.hrm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class PerformanceReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;
    private String reviewer; // Manager or peer
    private String review;
    private int rating; // e.g., 1 to 5
    private LocalDate reviewDate;
}