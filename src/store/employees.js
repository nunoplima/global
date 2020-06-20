import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
import _ from "lodash";
import { apiCallBegan } from "./api";

const employeesSlice = createSlice({
    name: "employees",
    initialState: [],
    reducers: {
        employeesRecieved: (employees, action) => action.payload.employees,

        employessRestored: (employees, action) => action.payload.employess,

        employeeDeleted: (employees, action) =>
            employees.list.filter((employee) => employee.id !== action.payload.id),
    },
});

export default employeesSlice.reducer;
const { employeesRecieved, employeesRestored, employeeDeleted } = employeesSlice.actions;

// actions creators
const baseUrl = process.env.REACT_APP_API_URL;

export const getEmployees = () =>
    apiCallBegan({
        baseUrl,
        url: "employees",
        onSuccess: employeesRecieved.type,
    });

export const restoreEmployees = (employees) => employeesRestored({ employees });

export const deleteEmployee = (id) =>
    apiCallBegan({
        baseUrl,
        url: `${id}`,
        method: "delete",
        onSuccess: employeeDeleted.type,
        payload: { id },
    });

