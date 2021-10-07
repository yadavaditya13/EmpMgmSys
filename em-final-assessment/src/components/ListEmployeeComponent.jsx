import React, { Component } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import EmployeeService from '../services/EmployeeService';
import "../assets/css/styles.css";
import FilterTableDataComponent from './FilterTableDataComponent';

const userData = [
  {name:"Select All" ,isChecked: true},
  { name: "First Name",isChecked: true },
  { name: "Last Name",isChecked: true },
  { name: "email" ,isChecked: true},
  { name: "address" ,isChecked: true},
  { name: "contact" ,isChecked: true},
  { name: "DOJ" ,isChecked: true},
  { name: "DOB" ,isChecked: true},
 
];


class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1,
      searchElement: '',

      page: 1,
      count: 0,
      pageSize: 3,
      sortBy: "id",
      sortDir: "asc",
      sortLastTog: true,
      sortEmailTog: true,
      sortFirstTog: true,
      sortFirstToggle: 0,
      sortLastToggle: 0,
      sortEmailToggle: 0,

      filters:[...userData], 
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
    this.sortFirstData = this.sortFirstData.bind(this);
    this.sortLastData = this.sortLastData.bind(this);
    this.sortEmailData = this.sortEmailData.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchEmail = this.searchEmail.bind(this);
    this.searchPhone = this.searchPhone.bind(this);
    this.searchManager = this.searchManager.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.setFilters = this.setFilters.bind(this);

    this.pageSizes = [3, 6, 9];
  }

  setFilters(newFilters){
    this.setState({filters:newFilters});                      
}

  sortFirstData() {
    console.log(this.state.sortFirstToggle);
    this.setState(state => ({
      sortFirstToggle: (state.sortFirstToggle + 1) % 3,
      sortBy: (state.sortFirstToggle) % 3 === 0 ? "id" : "firstName",
      sortDir: (state.sortFirstToggle) % 3 === 0 ? "asc" : (state.sortFirstTog ? "asc" : "desc"),
      sortFirstTog: !state.sortFirstTog
    }),
      () => {
        console.log(this.state.temp);
        this.retrieveTutorials();
      }
    );
  }

  sortLastData() {
    this.setState(state => ({
      sortLastToggle: (state.sortLastToggle + 1) % 3,
      sortBy: (state.sortLastToggle) % 3 === 0 ? "id" : "lastName",
      sortDir: (state.sortLastToggle) % 3 === 0 ? "asc" : (state.sortLastTog ? "asc" : "desc"),
      sortLastTog: !state.sortLastTog
    }),
      () => {
        this.retrieveTutorials();
      }
    );
  }

  sortEmailData() {
    this.setState(state => ({
      sortEmailToggle: (state.sortEmailToggle + 1) % 3,
      sortBy: (state.sortEmailToggle) % 3 === 0 ? "id" : "email",
      sortDir: (state.sortEmailToggle) % 3 === 0 ? "asc" : (state.sortEmailTog ? "asc" : "desc"),
      sortEmailTog: !state.sortEmailTog
    }),
      () => {
        this.retrieveTutorials();
      }
    );
  }


  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
    });
  }
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    // EmployeeService.getEmployees().then((res) => {
    //     this.setState({ employees: res.data});
    // });
    this.retrieveTutorials();
  }

  addEmployee() {
    this.props.history.push('/add-employee/_add');
  }

  setActiveTutorial(employee, index) {
    this.setState({
      currentEmployee: employee,
      currentIndex: index,
    });
  }

  getRequestParams(page, pageSize, sortBy, sortDir) {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    if (sortBy) {
      params["sortBy"] = sortBy;
    }


    if (sortDir) {
      params["sortDir"] = sortDir;
    }

    return params;
  }

  retrieveTutorials() {
    const { page, pageSize, sortBy, sortDir } = this.state;
    const params = this.getRequestParams(page, pageSize, sortBy, sortDir);

    EmployeeService.getAll(params)
      .then((response) => {
        const { employees, totalPages } = response.data;

        this.setState({
          employees: employees,
          count: totalPages,
        });
        console.log(this.sortFirstToggle, this.sortBy, this.sortDir)
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

  handleSortByChange() {
    this.setState(
      {

        sortBy: "firstName",
        sortDir: this.state.sortDir
      },
      () => {
        this.retrieveTutorials();
      }
    );
  }

  searchName(e) {
    e.preventDefault();
    if (this.state.searchElement == '') {
      return;
    }
    EmployeeService.getEmployeesByName(this.state.searchElement).then(res => {
      this.setState({ employees: res.data });
      // this.props.history.push(`/view-employee/${this.state.employee.id}`);
      console.log(JSON.stringify(this.state.employee));
    });
  }
  searchEmail(e) {
    e.preventDefault();
    if (this.state.searchElement == '') {
      return;
    }
    EmployeeService.getEmployeesByEmail(this.state.searchElement).then(res => {
      this.setState({ employees: res.data });
      // this.props.history.push(`/view-employee/${this.state.employee.id}`);
      console.log(JSON.stringify(this.state.employee));
    });
  }
  searchPhone(e) {
    e.preventDefault();
    if (this.state.searchElement == '') {
      return;
    }
    EmployeeService.getEmployeesByPhone(this.state.searchElement).then(res => {
      this.setState({ employees: res.data });
      // this.props.history.push(`/view-employee/${this.state.employee.id}`);
      console.log(JSON.stringify(this.state.employee));
    });
  }
  searchManager(e) {
    e.preventDefault();
    if (this.state.searchElement == '') {
      return;
    }
    EmployeeService.getEmployeesByManager(this.state.searchElement).then(res => {
      this.setState({ employees: res.data });
      // this.props.history.push(`/view-employee/${this.state.employee.id}`);
      console.log(JSON.stringify(this.state.employee));
    });
  }
  searchLocation(e) {
    e.preventDefault();
    if (this.state.searchElement == '') {
      return;
    }
    EmployeeService.getEmployeesByLocation(this.state.searchElement).then(res => {
      this.setState({ employees: res.data });
      // this.props.history.push(`/view-employee/${this.state.employee.id}`);
      console.log(JSON.stringify(this.state.employee));
    });
  }


  searchHandler = (event) => {
    this.setState({ searchElement: event.target.value });

  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div class="d-flex justify-content-center">
        <div class="p-2 bd-highlight"><button className="btn btn-success" onClick={this.addEmployee}> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        </button></div>
          <div class="p-2 bd-highlight"><form action="/" method="get" align="right">
              <div className="input-group" align="right">
                <input type="text" required
                  className="form-control"
                  placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.searchElement} onChange={this.searchHandler} />
                <div className="input-group-append">
                  <span className="input-group-text">Search in</span>
                </div>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchName} >Name</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchEmail} >Email</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchPhone} >Phone</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchManager} >Manager</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchLocation} >Location</button>
                </div>
              </div>
            </form></div>
          <div class="p-2 bd-highlight"><FilterTableDataComponent filters={this.state.filters} setFilters={this.setFilters}/></div>
        </div>
        {/* <div className="row-3"> */}
          {/* <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
          <div align="right" className="mt-3">
            <form action="/" method="get" align="right">
              <div className="input-group" align="right">
                <input type="text" required
                  className="form-control"
                  placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.state.searchElement} onChange={this.searchHandler} />
                <div className="input-group-append">
                  <span className="input-group-text">Search in</span>
                </div>
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchName} >Name</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchEmail} >Email</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchPhone} >Phone</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchManager} >Manager</button>
                  <button className="btn btn-outline-secondary" type="button" onClick={this.searchLocation} >Location</button>
                </div>
              </div>
            </form>
          </div> */}
          <div className="d-flex justify-content-center">
          <button style={{ marginLeft: "10px" }} className="btn btn-outline-dark mt-3" onClick={this.sortFirstData}> sort according to FirstName<div
            className={
              (this.state.sortFirstToggle === 1) ? ' ' :
                (this.state.sortDir === "asc"
                  ? "arrow arrow-up"
                  : "arrow arrow-down")
            }
          >
            {" "}
          </div></button>
          <button style={{ marginLeft: "10px" }} className="btn btn-outline-dark mt-3" onClick={this.sortLastData}> sort according to  LastName<div
            className={
              this.state.sortLastToggle === 1 ? "" :
                (this.state.sortDir === "asc"
                  ? "arrow arrow-up"
                  : "arrow arrow-down")
            }
          >
            {" "}
          </div></button>
          <button style={{ marginLeft: "10px" }} className="btn btn-outline-dark mt-3" onClick={this.sortEmailData}> sort according to EmailName<div
            className={
              this.state.sortEmailToggle === 1 ? "" :
                (this.state.sortDir === "asc"
                  ? "arrow arrow-up"
                  : "arrow arrow-down")
            }
          >
            {" "}
          </div></button>
        </div>
       
        <br></br>
        <div className="row">
          <table className="table table-success table-striped table-bordered table-hover">

            <thead>
              <tr>
              {(this.state.filters[1].isChecked === true ) && <th> First Name</th>}
              {(this.state.filters[2].isChecked === true ) &&  <th> Last Name</th>}
              {(this.state.filters[3].isChecked === true ) && <th> Email Id</th>}
              {(this.state.filters[4].isChecked === true ) && <th> Address</th>}
              {(this.state.filters[5].isChecked === true ) && <th> contact</th>}
              {(this.state.filters[6].isChecked === true ) && <th> DOB</th>}
              {(this.state.filters[7].isChecked === true ) && <th> DOJ</th>}

                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.employees.map(
                  (employee, index) =>
                    <tr key={index}
                      className={
                        (index === this.state.currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTutorial(employee, index)}
                    >
                      {(this.state.filters[1].isChecked === true ) && <td> {employee.firstName} </td>}
                      {(this.state.filters[2].isChecked === true ) &&  <td> {employee.lastName}</td>}
                      {(this.state.filters[3].isChecked === true ) && <td> {employee.email}</td>}
                      {(this.state.filters[4].isChecked === true ) && <td> {employee.address}</td>}
                      {(this.state.filters[5].isChecked === true ) && <td> {employee.phoneNo}</td>}
                      {(this.state.filters[6].isChecked === true ) && <td> {employee.birthDate}</td>}
                      {(this.state.filters[7].isChecked === true ) && <td> {employee.hireDate}</td>}
                      {/* <td> {employee.firstName} </td>
                      <td> {employee.lastName}</td>
                      <td> {employee.email}</td>
                      <td> {employee.address}</td>
                      <td> {employee.phoneNo}</td>
                      <td> {employee.birthDate}</td>
                      <td> {employee.hireDate}</td> */}
                      <td>
                        <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                        </button>
                        <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" 
                          viewBox="0 0 16 16"> <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 
                          7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg> 
                          </button>
                        <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                      </svg>
                           </button>
                      </td>
                    </tr>
                )
              }
            </tbody>
            
          </table>
          <Pagination
              className="d-flex justify-content-center"
              count={this.state.count}
              page={this.state.page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
        </div>
        {/* <div className="mt-3">
        <FilterTableDataComponent filters={this.state.filters} setFilters={this.setFilters}/>
        </div> */}

      </div>
    )
  }
}

export default ListEmployeeComponent