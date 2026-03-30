import {configureStore}  from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import authReducer from "../features/auth/authSlice.js"

export const store  = configureStore({
    reducer:{
        cart : cartReducer,
        wishlist : wishlistReducer,
        auth : authReducer, 
    }
})