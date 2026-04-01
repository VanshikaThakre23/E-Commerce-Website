import axios from "axios";

export const addToCartAPI = (product) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post("http://localhost:5000/user/add-to-cart", {
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
