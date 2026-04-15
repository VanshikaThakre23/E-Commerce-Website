import axios from "axios";
import React, { useEffect, useState } from "react";
import { Package, User, Mail, MapPin, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/order/admin/viewOrders`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load all orders");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [BASE_URL]);

  if (loading) return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

  return (
   <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <AdminSidebar/>

      <div className="flex-1 p-10">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin: Manage Orders</h1>
          <p className="text-gray-500">Total Orders: {orders.length}</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-xl border">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No orders have been placed yet.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                
                {/* 1. TOP BAR - ORDER INFO & USER DETAILS */}
                <div className="bg-gray-100 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-8 flex-wrap">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Order ID</p>
                      <p className="text-xs font-mono">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <User size={14} className="text-amber-600" />
                        {order.user?.name || "Guest User"}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-400" />
                        {order.user?.email || "No email provided"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* 2. MIDDLE CONTENT - ADDRESS & ITEMS */}
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  
                  {/* Shipping Info */}
                  <div className="p-6 border-b lg:border-b-0 lg:border-r bg-gray-50/30">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                      <MapPin size={14} /> Shipping Address
                    </h4>
                    {order.addresses ? (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <p className="font-bold">{order.addresses.fullName}</p>
                        <p>{order.addresses.houseNo}, {order.addresses.area}</p>
                        <p>{order.addresses.city}, {order.addresses.state} - {order.addresses.pincode}</p>
                        <p className="mt-2 font-medium">📞 {order.addresses.phone}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-red-400 italic">Address details deleted</p>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="lg:col-span-2 p-6 space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                      <Package size={14} /> Items Ordered
                    </h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-2 border-b last:border-0">
                        <img 
                          src={item.product?.img} 
                          alt="" 
                          className="w-14 h-14 object-cover rounded border" 
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">{item.product?.title}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">₹{item.product?.newPrice * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Final Total */}
                    <div className="pt-4 flex justify-between items-center">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> Placed on: {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="text-lg font-black text-amber-600">
                        Total Amount: ₹{order.totalAmount}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ViewOrders;