import http from "./httpService";

export const getEmployee = id => (
    http.get(`${process.env.REACT_APP_API_URL}employees/${id}`)
);

export const deleteEmployeeFromDB = id => (
    http.delete(`${process.env.REACT_APP_API_URL}employees/${id}`)
);
