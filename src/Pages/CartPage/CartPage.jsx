import React, { useContext } from "react";
// import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";
import { removeFromCart ,updateInCart} from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

const CartPage = () => {
  //  const { cart, removeFromCart } = useContext(CartContext);
  const dispatch = useDispatch();

  // get cart data from Redux
  const cart = useSelector((state) => state.cart.cartItem);


  const handleDelete = async(id)=>{
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove thhis item?",
      icon: "warning",
      dangerMode: true,
      buttons:true,
    });

    if (!willDelete) {
      return;
    }
    dispatch(removeFromCart(id))
    swal("Item removed",{
      icon:success,
    })
  }

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
        <>
          <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT SIDE - CART ITEMS */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">


                {/* Items */}
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b py-5 items-center"
                  >
                 

                    {/* Image */}
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded"
                    />

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-green-600 text-sm">In stock</p>

                      <div className="flex items-center gap-4 mt-2 text-sm">
                        {/* <span>Qty: {item.quantity}</span> */}
                        <label htmlFor="">Qty:</label>
                        <input type="number" name="" id="" defaultValue={item.quantity} min={1}
                        onChange={(e)=>{
                            dispatch(updateInCart({
                              id:item._id,
                              qty:Number(e.target.value)
                            }))
                        }}    
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                        <button
                          onClick={() => {
                            dispatch(addToWishlist(item))
                            dispatch(removeFromCart(item._id));
                          }}
                          className="py-1 px-2  rounded-2xl bg-[#0c9005] border-2 border-[#075403] text-white ">
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

                    {/* Price */}
                    <div className="text-lg font-bold text-right">
                     Rs {(item.newPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE - ORDER SUMMARY */}
              <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal</span>
                  <span>
                   Rs 
                    {cart
                      .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-2 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between mb-2 text-sm">
                  <span>Tax</span>
                  <span>Rs 12</span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>
                   Rs 
                    {cart
                      .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>

                {/* Checkout */}
                <Link to="/checkout">
                  <button className="w-full mt-5 bg-amber-600 text-white py-3 rounded-lg font-semibold">
                    Proceed to Checkout
                  </button>
                </Link>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Secure purchase. Ships from multiple sellers 
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

export default CartPage;