import React from "react";

const Input = ({ label, name, value, error, ...rest }) => {
    return (
        <div className="float-container">
            <label htmlFor={label}>{label}</label>
            <input
                id={name}
                name={name}
                value={value || ""}
                {...rest}></input>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Input;
