import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const email = user?.email;

            localStorage.removeItem("user");
            if (email) {
                localStorage.removeItem(`cart_${email}`);
                localStorage.removeItem(`wishlist_${email}`);
            } else {
                localStorage.removeItem("cart_guest");
            }

            state.user = null;

        }

    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 