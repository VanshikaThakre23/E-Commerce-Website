import React from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { removeFromCart, updateInCart } from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'; // Ensure you have this imported

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);

  // Helper to calculate total safely
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const price = Number(item.newPrice) || 0;
      const qty = Number(item.quantity) || 0;
      return acc + (price * qty);
    }, 0).toFixed(2);
  };

  const handleDelete = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove this item?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "No",
        confirm: "Yes",
      },
    });

    if (willDelete) {
      dispatch(removeFromCart(id));
      toast.success("Item removed successfully");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <header className="flex items-center justify-between mb-8 pb-4 border-b">
        <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
        <p className="text-gray-500 font-medium">{cart?.length || 0} Items</p>
      </header>

      {!cart || cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xl text-gray-400">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-orange-500 font-semibold hover:underline">
            Go add some items!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 border-b py-5 items-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-green-600 text-sm">In stock</p>

                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <label>Qty:</label>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      min={1}
                      onChange={(e) => {
                        dispatch(updateInCart({
                          id: item._id,
                          qty: Number(e.target.value)
                        }))
                      }}    
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => {
                        dispatch(addToWishlist(item));
                        dispatch(removeFromCart(item._id));
                      }}
                      className="py-1 px-2 rounded-2xl bg-[#0c9005] border-2 border-[#075403] text-white"
                    >
                      Move to Wishlist
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="py-1 px-2 bg-red-300 border-2 border-red-400 rounded-2xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-lg font-bold text-right">
                  Rs {(Number(item.newPrice || 0) * Number(item.quantity || 0)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>Rs {calculateTotal()}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
              <span>Total</span>
              <span>Rs {calculateTotal()}</span>
            </div>

            <Link to="/checkout">
              <button className="w-full mt-5 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;