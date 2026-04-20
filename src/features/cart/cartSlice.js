import { createSlice } from "@reduxjs/toolkit";

// Helper to get the current key consistently
const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.email || "guest";
    return `cart_${userId}`;
};
const initialState = {
    cartItem: (() => {
        try {
            const key = getCartKey();
            const stored = JSON.parse(localStorage.getItem(key)) || [];
            return stored
                .filter(item => item && item._id)
                .map(item => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) }));
        } catch {
            return []; // If anything is corrupted, start fresh
        }
    })()
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItem.find((i) => i._id === item._id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItem.push({ ...item, quantity: 1 });
            }
            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItem));
        },

        removeFromCart: (state, action) => {
            // 1. Create the new list
            const updatedCart = state.cartItem.filter((item) => item._id !== action.payload);
            // 2. Update State
            state.cartItem = updatedCart;
            // 3. Force update LocalStorage immediately with the NEW list
            localStorage.setItem(getCartKey(), JSON.stringify(updatedCart));
        },

        updateInCart: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.cartItem.find((i) => i._id === id);
            if (item) {
                item.quantity = Math.max(1, Number(qty) || 1);
            }
            localStorage.setItem(getCartKey(), JSON.stringify(state.cartItem));
        },

        setCart: (state, action) => {
            state.cartItem = action.payload;
            localStorage.setItem(getCartKey(), JSON.stringify(action.payload));
        },
       clearCart: (state) => {
    state.cartItem = [];
    localStorage.removeItem(getCartKey());
},

        
    }
});

export const { addToCart, removeFromCart, updateInCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;