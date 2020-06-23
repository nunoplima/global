import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const employeesSlice = createSlice({
    name: "employees",
    initialState: { list: [] },
    reducers: {
        employeesRecieved: (employees, action) => {
            employees.list = action.payload.employees;
        },

        employeeSaved: (employees, action) => {
            employees.list = [...employees.list, action.payload.employee];
        },

        employeeUpdated: (employees, action) => {
            const idx = employees.list.findIndex((employee) => employee.id === action.payload.employee.id);
            employees.list[idx] = action.payload.employee;
        },

        employeeDeleted: (employees, action) => {
            employees.list = employees.list.filter((employee) => employee.id !== action.payload.id);
        },
    },
});

export default employeesSlice.reducer;
const {
    employeesRecieved,
    employeeSaved,
    employeeUpdated,
    employeeDeleted,
} = employeesSlice.actions;

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

export const deleteEmployee = (id) => employeeDeleted({ id });