import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Employee from "../Employee/Employee";
import { getEmployees, deleteEmployee } from "../../store/employees";
import { deleteEmployeeFromDB } from "../../services/employeesService";

const Employees = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const renderEmployees = () => (
        employees.map((employee) => (
            <Employee
                key={employee.id}
                employee={employee}
                onDelete={handleDelete}
            />
        ))
    );

    const handleDelete = async (id) => {
        // optimistic update
        try {
            // update the ui
            dispatch(deleteEmployee(id))
            // try to update the back-end
            await deleteEmployeeFromDB(id);
        } catch(ex) {
            if (ex.response && (ex.response.status === 403 || ex.response.status === 404)) {
                const { error } = ex.response.data; 
                toast.error(error);
            }
        }
    };

    return [renderEmployees()];
};

export default Employees;
