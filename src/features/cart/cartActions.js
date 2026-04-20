import axios from "axios";

export const addToCartAPI = (product) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/add-to-cart`, {
                productId: product._id
            }, {
                withCredentials: true
            });

            dispatch({
                type: "cart/addToCart",
                payload: product
            });
            
            console.log("Added:", res.data);
        } catch (error) {
            // Logs detailed error from server if available
            console.log("Error details:", error.response ? error.response.data : error.message);
        }
    };
};
// Add this near your addToCartAPI function
export const fetchCartAPI = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/get-cart`, {
                withCredentials: true
            });
            
            // Overwrite Redux state with the fresh data from MongoDB
            // res.data should be the array of cart items
            dispatch(setCart(res.data)); 
            
            console.log("Cart synced with Database");
        } catch (error) {
            console.error("Failed to sync cart:", error.response?.data || error.message);
        }
    };
};