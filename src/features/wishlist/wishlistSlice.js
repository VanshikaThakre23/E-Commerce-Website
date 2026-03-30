import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItem: JSON.parse(localStorage.getItem("wishlist")) || []
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;

            const existing = state.wishlistItem.find((i) => i._id == item._id);

            if (!existing) {
                state.wishlistItem.push({ ...item, quantity: 1 })
            }
          
            localStorage.setItem("wishlist", JSON.stringify(state.wishlistItem))

        },

        removeFromWishlist: (state, action) => {
            state.wishlistItem = state.wishlistItem.filter((item) => item._id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlistItem));
        }
    },

})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer