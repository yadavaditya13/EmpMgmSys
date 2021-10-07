import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            role: '',
		    address: '',
		    phoneNo: '',
		    birthDate: '',
		    hireDate: '',
		    baseLocation: '',
		    managerName: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneNoHandler = this.changePhoneNoHandler.bind(this);
        this.changeBirthDateHandler = this.changeBirthDateHandler.bind(this);
        this.changeHireDateHandler = this.changeHireDateHandler.bind(this);
        this.changeBaseLocationHandler = this.changeBaseLocationHandler.bind(this);
        this.changeManagerHandler = this.changeManagerHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email : employee.email,
                    username: employee.username,
                    password: employee.password,
                    role: employee.role,
                    address : employee.address,
                    phoneNo : employee.phoneNo,
                    birthDate : employee.birthDate,
                    hireDate : employee.hireDate,
                    baseLocation : employee.baseLocation,
                    managerName : employee.managerName
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email,
            username: this.state.username, password: this.state.password, role: this.state.role, 
            address: this.state.address, phoneNo: this.state.phoneNo, birthDate: this.state.birthDate, hireDate: this.state.hireDate, 
            baseLocation: this.state.baseLocation, managerName: this.state.managerName
        };
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
                console.log('id => ' + JSON.stringify(this.state.id));
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
                console.log('id => ' + JSON.stringify(this.state.id));
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeUserNameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    changeRoleHandler= (event) => {
        this.setState({role: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changePhoneNoHandler= (event) => {
        this.setState({phoneNo: event.target.value});
    }

    changeBirthDateHandler= (event) => {
        this.setState({birthDate: event.target.value});
    }

    changeHireDateHandler= (event) => {
        this.setState({hireDate: event.target.value});
    }

    changeBaseLocationHandler= (event) => {
        this.setState({baseLocation: event.target.value});
    }

    changeManagerHandler= (event) => {
        this.setState({managerName: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body mb-10">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" required
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" required
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" required
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> UserName: </label>
                                            <input placeholder="Username" name="username" className="form-control" required
                                                value={this.state.username} onChange={this.changeUserNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input type="password" placeholder="Password" name="password" className="form-control" required
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Role: </label>
                                            <input type="text" placeholder="Role" name="role" className="form-control" required
                                                value={this.state.role} onChange={this.changeRoleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input type="text" placeholder="Address" name="address" className="form-control" required
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone No: </label>
                                            <input type="tel" placeholder="Phone No" name="phoneNo" className="form-control" required
                                                value={this.state.phoneNo} onChange={this.changePhoneNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date of Birth: </label>
                                            <input type="date" placeholder="dd/mm/yyyy" name="birthDate" className="form-control" required
                                                value={this.state.birthDate} onChange={this.changeBirthDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Hire Date: </label>
                                            <input type="date" placeholder="dd/mm/yyyy" name="hireDate" className="form-control" required
                                                value={this.state.hireDate} onChange={this.changeHireDateHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Base Location: </label>
                                            <input placeholder="Base Location" name="baseLocation" className="form-control" required
                                                value={this.state.baseLocation} onChange={this.changeBaseLocationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Manager Name: </label>
                                            <input placeholder="Manager Name" name="managerName" className="form-control" required
                                                value={this.state.managerName} onChange={this.changeManagerHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee} style={{marginTop: "10px"}}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px", marginTop: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent