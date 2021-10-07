import axios from 'axios';
import http from '../http-common';
const EMPLOYEE_API_BASE_URL = "http://localhost:8090/api/employee";

class EmployeeService {

    getAll(params){
        return http.get("employeepage", {params})
    }

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    getEmployeesByName(empName){
        return axios.get('http://localhost:8090/api/employee/name/' + empName);
    }

    getEmployeesByEmail(empEmail){
        return axios.get('http://localhost:8090/api/employee/email/' + empEmail);
    }
    getEmployeesByPhone(empPhone){
        return axios.get(EMPLOYEE_API_BASE_URL + '/phone/' + empPhone);
    }
    getEmployeesByManager(empManager){
        return axios.get(EMPLOYEE_API_BASE_URL + '/manager/' + empManager);
    }
    getEmployeesByLocation(empLocation){
        return axios.get(EMPLOYEE_API_BASE_URL + '/location/' + empLocation);
    }
}

export default new EmployeeService()