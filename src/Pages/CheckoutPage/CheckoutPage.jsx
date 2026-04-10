import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ChevronLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const CheckoutPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();apn ko data me kuch add remove nhi kr rhe so no need of dipatch

  const cart = useSelector((state) => state.cart.cartItem);

  //  STATE 
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [payment, setPayment] = useState("");

  // FETCH ADDRESSES 
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/address/myAddress",
          { withCredentials: true }
        );
        setAddresses(res.data.data);

        // Auto-select first address if available
        if (res.data.data.length > 0) {
          setSelectedAddressId(res.data.data[0]._id);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load addresses");
      }
    };

    const fetchCartPrice = () => {
      let total = 0;
      cart.forEach((item) => {
        total += item.newPrice * item.quantity;
      });
      setOrderTotal(total);
    }



    fetchAddresses();
    fetchCartPrice();

  }, [cart]);
  console.log(cart);

 const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://megakart-backend.onrender.com";


  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return toast.error("Plase select address");

    if (!payment) return toast.error("Please select payment");

    const orderData = {
      items:cart.map((item)=>({
        product:item._id,
        quantity:item.quantity,
        
      })),
      addresses:selectedAddressId,
      paymentMethod:payment,
      totalAmount:orderTotal,
    }

    try {
      const res = await axios.post(`${BASE_URL}/order/placeOrders`,orderData,{withCredentials:true});

      if(res.data.success){
        return toast.success("Order placed successfully");
      }
      navigate("/profile/myorder");

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-6xl mx-auto px-4">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl flex items-center gap-2">
                  <MapPin className="text-amber-500" />
                  Delivery Address
                </h2>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm"
                >
                  <Plus size={16} /> Add New Address
                </button>
              </div>

              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      onClick={() => setSelectedAddressId(addr._id)}
                      className={`border-2 p-4 rounded-lg cursor-pointer transition-all ${selectedAddressId === addr._id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold mb-1">{addr.fullName}</p>
                          <p className="text-sm text-gray-600">{addr.houseNo}, {addr.area}</p>
                          <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode} </p>
                          <p className="text-sm text-gray-500 mt-2">Enter Phone: {addr.phone}
                          </p>
                        </div>

                        {selectedAddressId === addr._id && (
                          <div className="bg-amber-500 text-white rounded-full p-1">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="mb-2">No saved addresses</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-amber-600 hover:text-amber-700 underline"
                  >
                    Add your first address
                  </button>
                </div>
              )}
            </div>


            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-bold text-xl mb-4">Payment Method</h2>
              <div className="space-y-3">


                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>


                <div className="p-3 border rounded-lg">
                  <p className="mb-2 font-medium">UPI Payment</p>

                  <div className="flex gap-6">

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="gpay"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <img src="/images/google-pay.png" className="w-8 h-8" />
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="paytm"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <img src="/images/paytm.png" className="w-10 h-8" />
                    </label>

                  </div>
                </div>


                {(payment === "gpay" || payment === "paytm") && (
                  <div className="border rounded-lg p-4 bg-gray-50 text-center">
                    <p className="font-medium mb-2">
                      {payment === "gpay" ? "Pay using Google Pay" : "Pay using Paytm"}
                    </p>

                    <img
                      src={payment === "gpay" ? "/images/gpayQr.png" : "/images/paytmQr.png"}
                      alt="QR"
                      className="w-32 mx-auto border-2 border-gray-400"
                    />
                  </div>
                )}

              </div>
            </div>


          </div>

          {/* right side */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="flex justify-between mb-2 text-sm">
                <span>Subtotal</span>
                <span>
                  Rs
                  {orderTotal.toFixed(2)}
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
                  {orderTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout */}
              <Link to="/checkout">
                <button className="w-full mt-5 bg-amber-600 text-white py-3 rounded-lg font-semibold"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </Link>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Secure purchase.Enjoy your Shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;