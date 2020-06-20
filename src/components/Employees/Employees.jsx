import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/employees";

const Employees = () => {
    const dispatch = useDispatch();
    const employees = useSelector((s) => s.employees);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    return <div>{employees.map(e => e.name)}</div>;
};

export default Employees;
