package com.example.emfinalassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.emfinalassessment.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	@Query("from Employee where lower(first_name) like %?1% or lower(last_name) like %?1% ")
	List <Employee> searchByName(String name);
	
	@Query("from Employee where lower(email) like %?1% ")
	List <Employee> searchByEmail(String email);
	
	@Query("from Employee where phone_no like %?1% ")
	List <Employee> searchByPhone(String phone);
	
	@Query("from Employee where manager_name like %?1% ")
	List <Employee> searchByManager(String manager);
	
	@Query("from Employee where base_location like %?1% ")
	List <Employee> searchByBaseLocation(String location);
}
