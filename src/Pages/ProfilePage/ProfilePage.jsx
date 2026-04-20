import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, LogOut, Plus, ChevronRight, Phone, Edit3, Trash2, X, Package } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { setCart } from "../../features/cart/cartSlice";
import swal from "sweetalert";
import { setWishlist } from "../../features/wishlist/wishlistSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_API_URL;

  // ---------- STATE ----------
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const emptyAddress = {
    fullName: "",
    phone: "",
    houseNo: "",
    area: "",
    city: "",
    state: "",
    pincode: ""
  };

  const [newAddress, setNewAddress] = useState(emptyAddress);

  // ---------- FETCH USER & ADDRESSES ----------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch (error) {
        navigate("/login");
      }
    };

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/address/myAddress`, { withCredentials: true });
        setAddresses(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    fetchAddresses();
  }, [navigate, BASE_URL]);

  // ---------- FETCH ORDERS ----------
  useEffect(() => {
    if (activeSection === "orders") {
      setLoading(true);
      axios.get(`${BASE_URL}/order/myOrders`, { withCredentials: true })
        .then(res => {
          setOrders(res.data.data || []);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [activeSection, BASE_URL]);

  // ---------- HANDLERS ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    const requiredFields = ["fullName", "phone", "houseNo", "area", "city", "state", "pincode"];
    if (requiredFields.some(f => !newAddress[f])) return toast.error("Please fill all fields");
    
    setLoading(true);
    try {
      if (editingAddressId) {
        const res = await axios.put(`${BASE_URL}/address/updateAddress/${editingAddressId}`, newAddress, { withCredentials: true });
        setAddresses(prev => prev.map(a => a._id === editingAddressId ? res.data.data : a));
        toast.success("Address updated");
      } else {
        const res = await axios.post(`${BASE_URL}/address/giveAddress`, newAddress, { withCredentials: true });
        setAddresses(prev => [res.data.data, ...prev]);
        toast.success("Address saved");
      }
      handleCancelForm();
    } catch (error) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };
  const handleEditAddress = (addr) => {
  setEditingAddressId(addr._id);
  setNewAddress({
    fullName: addr.fullName,
    phone: addr.phone,
    houseNo: addr.houseNo,
    area: addr.area,
    city: addr.city,
    state: addr.state,
    pincode: addr.pincode
  });
  setShowAddressForm(true);
};

  const handleDeleteAddress = async (id) => {
    const confirm = await swal({ title: "Delete?", text: "Delete this address?", icon: "warning", buttons: true, dangerMode: true });
    if (!confirm) return;
    try {
      await axios.delete(`${BASE_URL}/address/deleteAddress/${id}`, { withCredentials: true });
      setAddresses(prev => prev.filter(a => a._id !== id));
      toast.success("Deleted");
    } catch (err) { toast.error("Error deleting"); }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setNewAddress(emptyAddress);
  };
const logoutUser = async () => {
  const confirm = await swal({ title: "Logout?", icon: "warning", buttons: true });
  if (!confirm) return;

  try {
    await axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
    
    // 1. Clear Redux
    dispatch(logout());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    
    // 2. Clear Session/Local Storage if you use it for guest carts
    localStorage.removeItem("user"); 
    // Do NOT use localStorage.clear() as it might delete theme settings, etc.
    
    navigate("/login");
    toast.success("Logged out successfully");
  } catch (err) {
    toast.error("Logout failed");
  }
};

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-white border-r p-8 flex flex-col md:h-screen sticky top-0">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.name}</h2>
            <p className="text-xs text-gray-400">Customer</p>
          </div>
        </div>

        <nav className="space-y-2 grow">
          {["profile", "orders", "cancelled"].map((id) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex justify-between items-center p-3 rounded-lg capitalize transition-colors ${activeSection === id ? "bg-amber-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              {id} <ChevronRight size={16} />
            </button>
          ))}
          <button onClick={logoutUser} className="mt-10 flex items-center gap-3 text-red-500 hover:text-red-600 font-medium">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        {activeSection === "profile" && (
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <DetailCard label="Full Name" value={user?.name} />
              <DetailCard label="Email" value={user?.email} />
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2"><MapPin className="text-blue-600" size={20} /> Saved Addresses</h3>
                {!showAddressForm && (
                  <button onClick={() => setShowAddressForm(true)} className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
                    <Plus size={16} /> Add New
                  </button>
                )}
              </div>

              {!showAddressForm ? (
                <div className="space-y-4">
                  {addresses.length > 0 ? addresses.map((addr) => (
                    <div key={addr._id} className="border border-gray-100 p-5 rounded-lg hover:shadow-sm relative bg-gray-50/50">
                      <div className="absolute top-3 right-3 flex gap-1">
                        <button onClick={() => handleEditAddress(addr)} className="p-2 hover:bg-white rounded-full text-green-600"><Edit3 size={18} /></button>
                        <button onClick={() => handleDeleteAddress(addr._id)} className="p-2 hover:bg-white rounded-full text-red-600"><Trash2 size={18} /></button>
                      </div>
                      <p className="font-semibold text-gray-800">{addr.fullName}</p>
                      <p className="text-sm text-gray-600">{addr.houseNo}, {addr.area}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-sm flex items-center gap-1 mt-2 text-gray-700 font-medium"><Phone size={14} /> {addr.phone}</p>
                    </div>
                  )) : <p className="text-center py-10 text-gray-400 italic">No saved addresses</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideIn">
                   <CustomInput name="fullName" value={newAddress.fullName} placeholder="Full Name" onChange={handleInputChange} />
                   <CustomInput name="phone" value={newAddress.phone} placeholder="Phone" onChange={handleInputChange} maxLength={10} />
                   <CustomInput name="houseNo" value={newAddress.houseNo} placeholder="House No." onChange={handleInputChange} />
                   <CustomInput name="area" value={newAddress.area} placeholder="Area" onChange={handleInputChange} />
                   <CustomInput name="city" value={newAddress.city} placeholder="City" onChange={handleInputChange} />
                   <CustomInput name="state" value={newAddress.state} placeholder="State" onChange={handleInputChange} />
                   <CustomInput name="pincode" value={newAddress.pincode} placeholder="Pincode" onChange={handleInputChange} maxLength={6} />
                   <div className="md:col-span-2 flex gap-3 mt-2">
                     <button onClick={handleSaveAddress} className="bg-green-600 text-white px-8 py-2 rounded-lg font-medium">{editingAddressId ? "Update" : "Save"}</button>
                     <button onClick={handleCancelForm} className="border px-8 py-2 rounded-lg">Cancel</button>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "orders" && (
          <div className="max-w-4xl animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-xl border">
                 <Package size={48} className="mx-auto text-gray-300 mb-4" />
                 <p className="text-gray-500">You haven't placed any orders yet.</p>
               </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center text-sm">
                      <div className="flex gap-6">
                        <div><p className="text-gray-500 uppercase text-[10px] font-bold">Order Placed</p><p>{new Date(order.createdAt).toLocaleDateString()}</p></div>
                        <div><p className="text-gray-500 uppercase text-[10px] font-bold">Total</p><p className="font-bold">₹{order.totalAmount}</p></div>
                        <div><p className="text-gray-500 uppercase text-[10px] font-bold">Payment</p><p className="uppercase">{order.paymentMethod}</p></div>
                      </div>
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {order.status || "Processing"}
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          {/* Safe access to product properties */}
                          <img src={item.product?.img} className="w-16 h-16 object-cover rounded border" alt="" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.product?.title || "Product details unavailable"}</p>
                            <p className="text-sm text-gray-500 font-medium">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                             <p className="font-bold">₹{item.product?.newPrice * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === "cancelled" && (
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6">Cancelled Orders</h1>
            <div className="bg-white p-10 rounded-xl border text-center text-gray-400">
              No cancelled orders found.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const DetailCard = ({ label, value }) => (
  <div className="bg-white p-6 border rounded-lg shadow-sm">
    <p className="text-xs text-gray-400 mb-1 uppercase font-bold tracking-wider">{label}</p>
    <p className="font-semibold text-gray-800">{value || "Not provided"}</p>
  </div>
);

const CustomInput = (props) => (
  <input {...props} className="border border-gray-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-gray-50" />
);

export default ProfilePage;