package com.example.emfinalassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.emfinalassessment.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
}
