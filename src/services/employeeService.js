import http from "./http";

export const getEmployee = id => (
    http.get(`${process.env.REACT_APP_API_URL}employees/${id}`)
)