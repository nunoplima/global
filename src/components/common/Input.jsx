import React from "react";

const Input = ({ label, name, value, error, ...rest }) => {
    return (
        <div className="">
            <label htmlFor={label}>{label}</label>
            <input
                className=""
                id={name}
                name={name}
                value={value || ""}
                {...rest}></input>
            {error && <div className="">{error}</div>}
        </div>
    );
};

export default Input;
