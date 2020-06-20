import { combineReducers } from "redux";
import employeesReducer from "./employees";
import userReducer from "./user";

export default combineReducers({
    user: userReducer,
    employees: employeesReducer,
});
