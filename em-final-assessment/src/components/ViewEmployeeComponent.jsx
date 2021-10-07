import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center fw-bolder"> View Employee Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label class="col-5 fw-bold"> Employee First Name: </label>
                            <div class="col-7"> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Employee Last Name: </label>
                            <div class="col-7"> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Employee Email ID: </label>
                            <div class="col-7"> { this.state.employee.email }</div>
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Address: </label>
                            <div class="col-7">{this.state.employee.address}</div>            
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Phone No: </label>
                            <div class="col-7">{this.state.employee.phoneNo}</div>            
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Date of Birth: </label>
                            <div class="col-7">{this.state.employee.birthDate}</div>            
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Hire Date: </label>
                            <div class="col-7">{this.state.employee.hireDate}</div>            
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Base Location: </label>
                            <div class="col-7">{this.state.employee.baseLocation}</div>            
                        </div>
                        <div className = "row">
                            <label class="col-5 fw-bold"> Manager Name: </label>
                            <div class="col-7">{this.state.employee.managerName}</div>            
                        </div>
                    </div>
                    <button className="btn btn-info" onClick={this.cancel.bind(this)} style={{marginLeft: "10px", marginTop: "10px"}}>back</button>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent