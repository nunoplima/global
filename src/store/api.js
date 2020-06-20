import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
    name: "api",
    initialState: false,
    reducers: {
        apiCallBegan: (state, action) => {
            return true;
        },
        apiCallSucceeded: (state, action) => {
            return false;
        },
        apiCallFailed: (state, action) => {
            return false;
        },
        loadingToggled: (state, action) => {
            return action.payload;
        }
    }
});

export default apiSlice.reducer;
export const { apiCallBegan, apiCallSucceeded, apiCallFailed, loadingToggled } = apiSlice.actions;

export const toggleLoading = bool => loadingToggled(bool);