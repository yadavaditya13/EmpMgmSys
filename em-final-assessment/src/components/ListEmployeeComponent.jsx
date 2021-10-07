import React, { Component } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: [],
                currentEmployee: null,
                currentIndex: -1,
            
                page: 1,
                count: 0,
                pageSize: 3,
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        //this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.pageSizes = [3, 6, 9];
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        // EmployeeService.getEmployees().then((res) => {
        //     this.setState({ employees: res.data});
        // });
        this.retrieveTutorials();
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    setActiveTutorial(employee, index) {
        this.setState({
            currentEmployee: employee,
          currentIndex: index,
        });
      }

    getRequestParams(page, pageSize) {
        let params = {};
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
      }
    
      retrieveTutorials() {
        const { page, pageSize } = this.state;
        const params = this.getRequestParams(page, pageSize);
    
        EmployeeService.getAll(params)
          .then((response) => {
            const { employees, totalPages } = response.data;
    
            this.setState({
              employees: employees,
              count: totalPages,
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    
      handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveTutorials();
          }
        );
      }
    
      handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.retrieveTutorials();
          }
        );
      }

    render() {
        return (
            <div>
                 <h2 className="text-center">Employees List</h2>
                 <div className = "row-3">
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        (employee, index) => 
                                        <tr key = {index}
                                            className={
                                            (index === this.state.currentIndex ? "active" : "")
                                          }
                                          onClick={() => this.setActiveTutorial(employee, index)}
                                        >
                                             <td> {employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.email}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                            <Pagination
                                className="my-3"
                                count={this.state.count}
                                page={this.state.page}
                                siblingCount={1}
                                boundaryCount={1}
                                variant="outlined"
                                shape="rounded"
                                onChange={this.handlePageChange}
                                />
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent