import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.email;

const initialState = {
    wishlistItem: JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || []
}

const saveToLocalstorage = (wishlist, userId) => { localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist)) }

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.email;

            const item = action.payload;

            const existing = state.wishlistItem.find((i) => i._id == item._id);

            if (!existing) {
                state.wishlistItem.push({ ...item, quantity: 1 })
            }

            // localStorage.setItem("wishlist", JSON.stringify(state.wishlistItem))

            saveToLocalstorage(state.wishlistItem, userId);

        },

        removeFromWishlist: (state, action) => {

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.email;

            state.wishlistItem = state.wishlistItem.filter((item) => item._id !== action.payload);
            // localStorage.setItem("wishlist", JSON.stringify(state.wishlistItem));

            saveToLocalstorage(state.wishlistItem, userId);

        },

        setWishlist: (state, action) => {
            state.wishlistItem = action.payload;
        }
    },

})

export const { addToWishlist, removeFromWishlist, setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer