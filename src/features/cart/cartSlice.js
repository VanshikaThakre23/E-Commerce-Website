import { createSlice } from "@reduxjs/toolkit"

const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.email;

const initialState = {
    cartItem: JSON.parse(localStorage.getItem(`cart_${userId}`)) || []
}

const saveToLocalStorage = (cart, userId) => { localStorage.setItem(`cart_${userId}`, JSON.stringify(cart)); }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:
    {
        addToCart: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.email;

            const item = action.payload;
            const existing = state.cartItem.find((i) => i._id === item._id);
            if (existing) { existing.quantity += 1; }
            else {
                state.cartItem.push({ ...item, quantity: 1 });
            }
            saveToLocalStorage(state.cartItem, userId);
        },

        removeFromCart: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.email;

            state.cartItem = state.cartItem.filter((item) => item._id !== action.payload);

            saveToLocalStorage(state.cartItem, userId);
        },

        updateInCart: (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user?.email;

            const { id, qty } = action.payload;
            const item = state.cartItem.find((i) => i._id == id);

            if (item) item.quantity = qty;

            saveToLocalStorage(state.cartItem, userId);
        },

        setCart: (state, action) => {
            state.cartItem = action.payload;
        }
    }
})
export const { addToCart, removeFromCart, updateInCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

