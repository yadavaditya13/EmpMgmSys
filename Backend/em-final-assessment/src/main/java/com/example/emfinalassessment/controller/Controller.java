package com.example.emfinalassessment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.emfinalassessment.model.Employee;
import com.example.emfinalassessment.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class Controller {

	@Autowired
	private EmployeeRepository employeeRepository;

	// read
	public Iterable<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@GetMapping("/employee")
	public ResponseEntity<Iterable<Employee>> findAll() {
		try {
			return new ResponseEntity<Iterable<Employee>>(getAllEmployees(), HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Iterable<Employee>>(HttpStatus.BAD_REQUEST);
		}
	}

	// get employee by id rest api
	@GetMapping("/employee/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee emp = employeeRepository.findById(id).orElseThrow(NoSuchElementException::new);
		return ResponseEntity.ok(emp);
	}
	
	@GetMapping("/employee/sort/{col}/{order}")
	@ResponseBody
	public List<Employee> getSorted(@PathVariable String col,@PathVariable String order){
		
		List<Employee> emp;
		if(order.equals("asc")) {
			emp = employeeRepository.findAll(Sort.by(Sort.Direction.ASC,col));
			
		}
		else if(order.equals("decs")) {
			emp = employeeRepository.findAll(Sort.by(Sort.Direction.DESC,col));
			
		}
		else {
			emp = employeeRepository.findAll();
			
		}
		return emp;
	}

	@PostMapping("/employee")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}

	// update
	@PutMapping("/employee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Employee emp = employeeRepository.findById(id).orElseThrow();

		emp.setFirstName(employeeDetails.getFirstName());
		emp.setLastName(employeeDetails.getLastName());
		emp.setAddress(employeeDetails.getAddress());
		emp.setBaseLocation(employeeDetails.getBaseLocation());
		emp.setBirthDate(employeeDetails.getBirthDate());
		emp.setEmail(employeeDetails.getEmail());
		emp.setHireDate(employeeDetails.getHireDate());
		emp.setManagerName(employeeDetails.getManagerName());
		emp.setPhoneNo(employeeDetails.getPhoneNo());

		Employee updatedEmployee = employeeRepository.save(emp);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee actor = employeeRepository.findById(id)
				.orElseThrow();
		
		employeeRepository.delete(actor);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// pagination rest api
	@GetMapping("/employeepage")
	public ResponseEntity<Map<String, Object>> getAll(
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue="5") int size,
			@RequestParam(defaultValue="id") String sortBy,
			@RequestParam(defaultValue="asc") String sortDir
			) {
		
		try {
			List<Employee> employees = new ArrayList<Employee>();
			Pageable paging = PageRequest.of(page, size, sortDir.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending());
			
			Page<Employee> pageEmp;
			pageEmp = employeeRepository.findAll(paging);
			
			employees = pageEmp.getContent();
			
			Map<String, Object> response = new HashMap<>();
			response.put("employees", employees);
		    response.put("currentPage", pageEmp.getNumber());
		    response.put("totalItems", pageEmp.getTotalElements());
		    response.put("totalPages", pageEmp.getTotalPages());

		    return new ResponseEntity<>(response, HttpStatus.OK);
		}
		 catch (Exception e) {
		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
	}
	
	// Search Employee Name
		@RequestMapping("/employee/name/{name}")
		@ResponseBody
		public List<Employee> searchEmployeeName(@PathVariable String name) {
			List<Employee> emp = employeeRepository.searchByName(name);
			return emp;
		}

	//Search Employee Email
		@RequestMapping("/employee/email/{email}")
		@ResponseBody
		public List<Employee> searchEmployeeEmail(@PathVariable String email) {
			List<Employee> emp = employeeRepository.searchByEmail(email);
			return emp;
		}

	//Search Employee Phone
		@RequestMapping("/employee/phone/{phone}")
		@ResponseBody
		public List<Employee> searchEmployeePhone(@PathVariable String phone) {
			List<Employee> emp = employeeRepository.searchByPhone(phone);
			return emp;
		}

	//Search Employee Manager
		@RequestMapping("/employee/manager/{manager}")
		@ResponseBody
		public List<Employee> searchEmployeeManager(@PathVariable String manager) {
			List<Employee> emp = employeeRepository.searchByManager(manager);
			return emp;
		}

	//Search Employee Location
		@RequestMapping("/employee/location/{location}")
		@ResponseBody
		public List<Employee> searchEmployeeBaseLocation(@PathVariable String location) {
			List<Employee> emp = employeeRepository.searchByBaseLocation(location);
			return emp;
		}

}
