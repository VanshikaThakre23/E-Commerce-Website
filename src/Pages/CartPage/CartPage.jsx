import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
   const { cart, removeFromCart } = useContext(CartContext);
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-5">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 mb-3 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img src={item.img} alt="" className="w-16 h-16 border border-gray-700" />

              <div className="title">
                <h3 className="font-semibold ">{item.title}</h3>

              </div>
              <p>Qty: {item.quantity}</p>
              <p className="text-pink-600">{item.newPrice}</p>
            </div>


            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>

        ))
      )}
      <Link to={'/checkout'}>
        <button className="m-auto block bg-[#f08838] text-white px-1 py-2 mt-4 hover:cursor-pointer">Proceed to Checkout</button>
      </Link>

    </div>
  );
};

export default CartPage;