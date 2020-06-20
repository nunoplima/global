import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import moment from "moment";
import Form from "../common/Form";
import { getEmployee } from "../../services/employeesService";
import { saveEmployee } from "../../store/employees";

class EmployeeForm extends Form {
    async componentDidMount() {
        try {
            const { employeeId } = this.props.match.params;
            // if we are looking to create a new employee populate the date fields and return
            if (employeeId === "new") {
                const today = moment(Date.now()).format("YYYY-MM-DD");
                return this.setState({ data: { address: "test address", name: "test", birthdate: "1992-10-02", status: "Inactive", position: "Developer", created: today, updated: today }});
                // return this.setState({ data: { created: today, updated: today }});
            };
            // otherwise get the employee from de database and populate fields
            const { data: { employee } } = await getEmployee(employeeId);
            this.setState({ data: employee })
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
        birthdate: Joi.date().required().label("Birthdate"),
        address: Joi.string().min(5).max(30).required().label("Address"),
        status: Joi.string().min(4).max(10).required().label("Status"),
        position: Joi.string().min(4).max(10).required().label("Position"),
        created: Joi.date().optional().label("Created"),
        updated: Joi.date().optional().label("Updated"),
        photoUrl: Joi.string().optional(),
    };

    render() {
        const isNewEmployee = this.props.match.params.employeeId === "new";

        return (
            <form onSubmit={this.handleSubmit}>
                {isNewEmployee ? <h1>New Employee</h1> : <h1>Edit Employee</h1>}

                {isNewEmployee ? null : this.renderInput("id", "Employee ID", "number")}

                {this.renderInput("name", "Name: ", "text")}
                {this.renderInput("birthdate", "Birthdate: ", "date")}
                {this.renderInput("address", "Address: ", "text")}
                {this.renderSelect("status", "Status", ["Active", "Inactive"])}
                {this.renderInput("position", "Position: ", "text")}
                {this.renderInput("created", "Created: ", "date")}
                {this.renderInput("updated", "Updated: ", "date")}

                {isNewEmployee ? this.renderButton("Create") : this.renderButton("Edit")}
            </form>
        )
    }
}


export default connect(null, { saveEmployee })(EmployeeForm);
