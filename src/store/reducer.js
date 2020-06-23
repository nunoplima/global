import { combineReducers } from "redux";
import employeesReducer from "./employees";
import apiReducer from "./api";

export default combineReducers({
    employees: employeesReducer,
    isLoading: apiReducer
});
