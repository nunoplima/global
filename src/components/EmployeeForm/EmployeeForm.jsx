import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import moment from "moment";
import Form from "../common/Form";
import { getEmployee } from "../../services/employeesService";
import { saveEmployee } from "../../store/employees";
import Curve from "../../assets/images/curve.png";
import Square from "../../assets/images/el-1.png";

class EmployeeForm extends Form {
    async componentDidMount() {
        try {
            window.scrollTo(0, 0);
            const { employeeId } = this.props.match.params;
            // if we are looking to create a new employee populate the date fields and return
            if (employeeId === "new") {
                const today = moment(Date.now()).format("YYYY-MM-DD");
                return this.setState({ data: { address: "test address", name: "test", birthdate: "1992-10-02", status: "Inactive", position: "Developer", created: today, updated: today }});
                // return this.setState({ data: { created: today, updated: today }});
            };
            // otherwise get the employee from de database and populate fields
            const { data: { employee } } = await getEmployee(employeeId);
            this.setState({ data: employee });
        } catch(ex) {
            if (ex.response && ex.response.status === 404) {
                this.props.history.replace("/not-found");
            }
        }
    }

    doSubmit = async () => {
        try {
            await this.props.saveEmployee(this.state.data);
            this.props.history.push("/employees");
        } catch(ex) {
            console.log(ex);
        }
    };

    schema = {
        name: Joi.string().min(2).max(20).required().label("Name"),
        id: Joi.number().label("Employee ID"),
        birthdate: Joi.date()
            .min("1900-01-01")
            .max(moment().subtract(18, "years").format("YYYY-MM-DD"))
            .required()
            .label("Birthdate"),
        address: Joi.string().min(5).max(40).required().label("Address"),
        status: Joi.string().min(4).max(10).required().label("Status"),
        position: Joi.string().min(4).max(16).required().label("Position"),
        created: Joi.date().required().label("Created"),
        updated: Joi.date().required().label("Updated"),
        photoUrl: Joi.string().optional(),
    };
    
    render() {
        const isNewEmployee = this.props.match.params.employeeId === "new";

        return (
            <div data-test="component-employee-form" className="form-container">

                <div className="title-container">
                    <h1 className="title-text title">
                        {isNewEmployee ? "New Employee" : "Edit Employee"}
                    </h1>
                </div>
                
                <form className="form" onSubmit={this.handleSubmit}>

                    {isNewEmployee ? null : this.renderInput("id", "Employee ID: ", "number", true)}

                    {this.renderInput("name", "Name: ", "text")}
                    {this.renderInput("birthdate", "Birthdate: ", "date")}
                    {this.renderInput("address", "Address: ", "text")}
                    {this.renderSelect("status", "Status", ["Active", "Inactive"])}
                    {this.renderInput("position", "Position: ", "text")}
                    <div className="dates-container">
                        {this.renderInput("created", "Created: ", "date")}
                        {this.renderInput("updated", "Updated: ", "date")}
                    </div>

                    {isNewEmployee ? this.renderButton("Create") : this.renderButton("Edit")}
                    
                </form>
                
                <img src={Curve} alt="curve" className="curve" />
                <img src={Square} alt="square" className="square-blue-left" />
                <img src={Square} alt="square" className="square-blue-right" />
                
            </div>
        )
    }
}

export default connect(null, { saveEmployee })(EmployeeForm);
