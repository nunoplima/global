import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Employee from "../Employee/Employee";
import { getEmployees, deleteEmployee } from "../../store/employees";
import { deleteEmployeeFromDB } from "../../services/employeesService";
import Curve from "../../assets/images/curve.png";
import Square from "../../assets/images/el-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Employees = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);
    const isLoading = useSelector((state) => state.isLoading);

    useEffect(() => {
        dispatch(getEmployees());
        window.scrollTo(0, 0);
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

    return (
        <div className="employees-container">

            <div className="title-container">
                <h1 className="title-text title">Team</h1>      
            </div>

            {isLoading ? (
                <div className="spinner-container employees-spinner">
                    <FontAwesomeIcon className="spinner" icon={faSpinner} />
                </div>
            ) : (
                <div className="container employees-list-container">
                    {renderEmployees()}
                </div>
            )}
            
            <img src={Curve} alt="curve" className="curve" />
            <img src={Square} alt="square" className="square-blue-left" />
            <img src={Square} alt="square" className="square-blue-right" />
            <div className="square-pink-bottom" />
        
        </div>
    );
};

export default Employees;
