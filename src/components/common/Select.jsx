import React from "react";

const Select = ({ label, name, options, value, error, onChange }) => {
    return (
        <div className="float-container">
            <label htmlFor={name}>{label}: </label>
            <select
                className=""
                name={name}
                onChange={(e) => onChange(e)}
                value={value}>
                <option value=""></option>
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Select;
