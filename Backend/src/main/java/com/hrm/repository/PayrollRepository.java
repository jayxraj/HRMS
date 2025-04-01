package com.hrm.repository;

import com.hrm.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

	List<Payroll> findByEmployeeId(Long employeeId);
   
}