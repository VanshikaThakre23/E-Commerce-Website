import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    cartItem: [],
}

// const saveToLocalStorage = (cart) => { localStorage.setItem("cart", JSON.stringify(cart)); }
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:
    {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItem.find((i) => i._id === item._id);
            if (existing) { existing.quantity += 1; }
            else {
                state.cartItem.push({ ...item, quantity: 1 });
            }
            // saveToLocalStorage(state.cartItem);
        },

        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item._id !== action.payload);
            // saveToLocalStorage(state.cartItem);
        },

        updateInCart: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.cartItem.find((i) => i._id == id);
            if (item) { item.quantity = qty; }
            // saveToLocalStorage(state.cartItem);
        },

        setCart: (state, action) => {
            state.cartItem = action.payload;
        }
    }
})
export const { addToCart, removeFromCart, updateInCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;


