import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

const middleware = [...getDefaultMiddleware(), api];

export default (preloadedState=null) => {
    const options = {
        reducer,
        middleware
    };

    if (preloadedState) 
        options.preloadedState = preloadedState
    
    return configureStore(options);
};