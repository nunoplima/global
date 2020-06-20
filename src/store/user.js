import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { isAdmin: false },
    reducers: {
        userLoggedAsAdmin: (user, payload) => {
            user.isAdmin = true;
        }
    },
});

export default userSlice.reducer;
const { userLoggedAsAdmin } = userSlice.actions;

// actions creators
export const logUserAsAdmin = () => userLoggedAsAdmin(); 