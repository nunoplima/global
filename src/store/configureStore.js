import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import api from "./middleware/api";


const middleware = [...getDefaultMiddleware(), api];

export default () => configureStore({
    reducer: rootReducer,
    middleware,
});