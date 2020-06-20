import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Employee from "../Employee/Employee";
import { getEmployees, deleteEmployee } from "../../store/employees";

const Employees = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const renderEmployees = () =>
        employees.map((employee) => (
            <Employee
                key={employee.id}
                employee={employee}
                onDelete={handleDelete}
            />
        ));

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    return [renderEmployees()];
};

export default Employees;
