import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
import _ from "lodash";
import { apiCallBegan } from "./api";

const employeesSlice = createSlice({
    name: "employees",
    initialState: [],
    reducers: {
        employeesRecieved: (employees, action) => action.payload.employees,

        employeesRestored: (employees, action) => action.payload.employess,

        employeeSaved: (employees, action) => [...employees, action.payload.employee],

        employeeUpdated: (employees, action) => {
            const idx = employees.indexOf(employee => employee.id === action.payload.employee.id);
            employees[idx] = action.payload.employee;
            return employees;
        },

        employeeDeleted: (employees, action) =>
            employees.filter((employee) => employee.id !== action.payload.id),
    },
});

export default employeesSlice.reducer;
const { employeesRecieved, employeesRestored, employeeSaved, employeeUpdated, employeeDeleted } = employeesSlice.actions;

// actions creators
const baseUrl = process.env.REACT_APP_API_URL;

export const getEmployees = () =>
    apiCallBegan({
        baseUrl,
        url: "employees",
        onSuccess: employeesRecieved.type,
    });

export const saveEmployee = (data) => {
    const { id } = data;
    const method = id ? "put" : "post"
    const url = id ? `employees/${id}` : "employees";
    const onSuccess = id ? employeeUpdated.type : employeeSaved.type;
    return apiCallBegan({
        baseUrl,
        url,
        method,
        data,
        onSuccess,
    });
};

export const restoreEmployees = (employees) => employeesRestored({ employees });

export const deleteEmployee = (id) =>
    apiCallBegan({
        baseUrl,
        url: `employees/${id}`,
        method: "delete",
        onSuccess: employeeDeleted.type,
        payload: { id },
    });

