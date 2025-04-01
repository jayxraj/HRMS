package com.hrm.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeeId;
    private double grossSalary;
    private double deductions;
    private double netSalary;
    private LocalDate paymentDate;
}