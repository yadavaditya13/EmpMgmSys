// don't use this file

import React, { Component } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import EmployeeService from '../services/EmployeeService';

class EmpListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        //this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        // this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    
        this.state = {
            employees: [],
            currentEmployee: null,
          currentIndex: -1,
    
          page: 1,
          count: 0,
          pageSize: 3,
        };
    
        this.pageSizes = [3, 6, 9];
      }

      
  componentDidMount() {
    this.retrieveTutorials();
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

        const {
            employees,
            currentEmployee,
            currentIndex,
            page,
            count,
            pageSize,
          } = this.state;

        return ( 
        <div>
            <div className="list row"><div className="col-md-6">
            <h2>EmpList Page</h2>
            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
                </div>

           <ul className="list-group">
             {employees &&
              employees.map((employee, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(employee, index)}
                  key={index}
                >
                  {employee.firstName}
                </li>
              ))}
          </ul>

                </div>
        
          
        </div>
        );
    }
}
 
export default EmpListComponent