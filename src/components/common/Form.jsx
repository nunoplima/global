import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (error) {
            return error.details.reduce((acc, cur) => ({ ...acc, [cur.path[0]]: cur.message}), {});
        }
        return null;
    };

    validateProperty = (input, value) => {
        const obj = { [input]: value };
        const subSchema = { [input]: this.schema[input] }; 
        const { error } = Joi.validate(obj, subSchema);
        if (error) return error.details[0].message;
        return null;
    };

    handleChange = (e) => {
        const { name: input, value } = e.target;
        this.setState(prevState => ({ ...prevState, data: { ...prevState.data, [input]: value } }));
        
        const errorMessage = this.validateProperty(input, value);
        const errors = { ...this.state.errors }; 
        if (errorMessage) errors[input] = errorMessage;
        else delete errors[input];
        this.setState({ errors });
    };

    renderInput = (name, label, type, isReadOnly=false) => {
        const { data, errors } = this.state;
        return (
            <Input
                key={label}
                type={type}
                label={label}
                name={name}
                value={data[name]}
                error={errors[name]}
                onChange={isReadOnly ? null : this.handleChange}
                readOnly={isReadOnly}
            />
        )
    };

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;
        return (
            <Select
                key={label}
                label={label}
                name={name}
                options={options}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    };

    renderButton = label => (
        <input type="submit" disabled={this.validate()} className="" value={label} />
    );

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        if (errors) {
            return this.setState({ errors });
        }
        // submition method specific to each instance
        this.doSubmit();
    };
}

export default Form;
