import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Plus, Check, ChevronLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItem);

  // STATE
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [payment, setPayment] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

  // FETCH ADDRESSES
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/address/myAddress",
          { withCredentials: true }
        );
        setAddresses(res.data.data);

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
    };

    fetchAddresses();
    fetchCartPrice();
  }, [cart]);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return toast.error("Please select address");
    if (!payment) return toast.error("Please select payment method");

    const orderData = {
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      addresses: selectedAddressId,
      paymentMethod: payment,
      totalAmount: orderTotal + 12,
    };

    try {
      const res = await axios.post(`${BASE_URL}/order/placeOrders`, orderData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");
        dispatch(setCart([]));
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <Toaster />
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button - Increased touch target on mobile */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 md:mb-6 text-gray-600 hover:text-gray-900 py-2"
        >
          <ChevronLeft size={20} />
          <span className="text-sm md:text-base">Back</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content (Address & Payment) */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            
            {/* Address Section */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <h2 className="font-bold text-lg md:text-xl flex items-center gap-2">
                  <MapPin className="text-amber-500" size={20} />
                  Delivery Address
                </h2>
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
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
                      className={`border-2 p-3 md:p-4 rounded-lg cursor-pointer transition-all ${
                        selectedAddressId === addr._id
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm md:text-base mb-1">{addr.fullName}</p>
                          <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                            {addr.houseNo}, {addr.area}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 mt-2 font-medium">
                            Phone: {addr.phone}
                          </p>
                        </div>
                        {selectedAddressId === addr._id && (
                          <div className="bg-amber-500 text-white rounded-full p-1 shrink-0">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MapPin size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No saved addresses</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-amber-600 text-sm hover:underline mt-1"
                  >
                    Add your first address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-lg md:text-xl mb-4">Payment Method</h2>
              <div className="space-y-3">
                
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="w-4 h-4 text-amber-600"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span className="text-sm md:text-base font-medium">Cash on Delivery</span>
                </label>

                <div className="p-4 border rounded-lg">
                  <p className="mb-3 text-sm md:text-base font-medium">UPI Payment</p>
                  <div className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="payment"
                        value="gpay"
                        className="w-4 h-4 text-amber-600"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <img src="/images/google-pay.png" className="w-8 h-8 object-contain" alt="GPay" />
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="payment"
                        value="paytm"
                        className="w-4 h-4 text-amber-600"
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <img src="/images/paytm.png" className="w-10 h-8 object-contain" alt="Paytm" />
                    </label>
                  </div>
                </div>

                {/* QR Code Section - Responsive Scaling */}
                {(payment === "gpay" || payment === "paytm") && (
                  <div className="border rounded-lg p-6 bg-gray-50 text-center animate-in fade-in duration-300">
                    <p className="font-medium text-sm md:text-base mb-3">
                      {payment === "gpay" ? "Scan to pay with Google Pay" : "Scan to pay with Paytm"}
                    </p>
                    <div className="bg-white p-2 inline-block rounded-lg shadow-sm">
                        <img
                        src={payment === "gpay" ? "/images/gpayQr.png" : "/images/paytmQr.png"}
                        alt="QR Code"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto border-2 border-gray-100"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 italic">Waiting for transaction confirmation...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky on Desktop, Stacks on Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h3 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs {orderTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Rs 12.00</span>
                </div>

                <div className="flex justify-between font-bold text-lg md:text-xl border-t pt-4 mt-4">
                  <span>Total</span>
                  <span className="text-amber-600">Rs. {(orderTotal + 12).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-lg font-bold transition-all transform active:scale-[0.98] shadow-md shadow-amber-200"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center leading-tight">
                By placing an order, you agree to our terms of service.<br/>
                <strong>Secure Payment Guarantee</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;