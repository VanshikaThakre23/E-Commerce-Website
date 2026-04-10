import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, LogOut, Plus, ChevronRight, Phone, Edit3, Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { setCart } from "../../features/cart/cartSlice";
import swal from "sweetalert";
import { setWishlist } from "../../features/wishlist/wishlistSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ---------- STATE ----------
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // ---------- GET USER + ADDRESSES ----------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/user/me",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        navigate("/login");
      }
    };

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/address/myAddress",
          { withCredentials: true }
        );
        setAddresses(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    fetchAddresses();
  }, [navigate]);

  // ---------- INPUT CHANGE ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------- SAVE ADDRESS (Create or Update) ----------
  const handleSaveAddress = async () => {
    // Validation
    const requiredFields = ["fullName", "phone", "houseNo", "area", "city", "state", "pincode"];
    const missingFields = requiredFields.filter(field => !newAddress[field]);

    if (missingFields.length > 0) {
      return toast.error("Please fill all required fields");
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(newAddress.phone)) {
      return toast.error("Please enter a valid 10-digit phone number");
    }

    // Pincode validation
    if (!/^[0-9]{6}$/.test(newAddress.pincode)) {
      return toast.error("Please enter a valid 6-digit pincode");
    }

    setLoading(true);

    try {
      if (editingAddressId) {
        // update address
        const res = await axios.put(
          `http://localhost:5000/address/updateAddress/${editingAddressId}`,
          newAddress,
          { withCredentials: true }
        );

        // after updating adress -> ui update
        setAddresses((prev) =>
          prev.map((addr) =>
            addr._id === editingAddressId ? res.data.data : addr
          )
        );

        toast.success("Address updated successfully");
        setEditingAddressId(null);
      } else {
        // create new address
        const res = await axios.post(
          "http://localhost:5000/address/giveAddress",
          newAddress,
          { withCredentials: true }
        );

        // Update UI
        setAddresses((prev) => [res.data.data, ...prev]);
        toast.success("Address saved successfully");
      }

      setNewAddress(emptyAddress);
      setShowAddressForm(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to save address";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---------- EDIT ADDRESS ----------
  const handleEditAddress = (address) => {
    setNewAddress({
      fullName: address.fullName,
      phone: address.phone,
      houseNo: address.houseNo,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    });
    setEditingAddressId(address._id);
    setShowAddressForm(true);
  };

  // ---------- DELETE ADDRESS ----------
  const handleDeleteAddress = async (addressId) => {
    const confirm = await swal({
      title: "Delete Address?",
      text: "You sure you want to delete address",
      icon: "warning",
      buttons: ["Cancel", "Yes , Delete"],
      dangerMode: true,
    });

    if (!confirm) return;

    setLoading(true);

    try {
      await axios.delete(
        `http://localhost:5000/address/deleteAddress/${addressId}`,
        { withCredentials: true }
      );

      // Update UI
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
      toast.success("Address deleted successfully");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete address";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---------- CANCEL FORM ----------
  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setNewAddress(emptyAddress);
  };

  const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://megakart-backend.onrender.com";

  // ---------- LOGOUT ----------
  const logoutUser = async () => {
    try {
      const confirm = await swal({
        title: "Are you sure you want to logout ??",
        icon: "warning",
        buttons: ["Cancel", "Logout"],
        dangerMode: true,
      });

      if (!confirm) return;

      await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true
      });

      dispatch(logout());
      dispatch(setCart([]));
      dispatch(setWishlist([]));

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <aside className="w-full md:w-80 bg-white border-r p-8 flex flex-col h-screen">
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
              className={`w-full flex justify-between items-center p-3 rounded-lg capitalize transition-colors ${
                activeSection === id
                  ? "bg-amber-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {id}
              <ChevronRight size={16} />
            </button>
          ))}

          <button
            onClick={logoutUser}
            className="mt-10 flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-10">
        {activeSection === "profile" && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>

            {/* USER DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <DetailCard label="Full Name" value={user?.name} />
              <DetailCard label="Email" value={user?.email} />
            </div>

            {/* ADDRESS SECTION */}
            <div className="bg-white p-8 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MapPin className="text-[#0a53a7]" size={20} /> 
                  Saved Addresses
                </h3>

                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    <Plus size={16} /> Add New
                  </button>
                )}
              </div>

              {/* ADDRESS LIST */}
              {!showAddressForm && addresses?.length > 0 && (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div 
                      key={addr._id} 
                      className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow relative"
                    >
                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit Address"
                        >
                          <Edit3 size={18} className="text-[#2ba306]" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Address"
                          disabled={loading}
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>

                      {/* Address Details */}
                      <p className="font-semibold text-lg mb-2">{addr.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {addr.houseNo}, {addr.area}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-sm flex items-center gap-1 mt-3 text-gray-700">
                        <Phone size={14} /> {addr.phone}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* EMPTY STATE */}
              {!showAddressForm && addresses?.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No saved addresses yet</p>
                  <p className="text-sm">Add your first address to get started</p>
                </div>
              )}

              {/* ADDRESS FORM */}
              {showAddressForm && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-700">
                      {editingAddressId ? "Edit Address" : "Add New Address"}
                    </h4>
                    <button
                      onClick={handleCancelForm}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomInput 
                      name="fullName" 
                      value={newAddress.fullName} 
                      placeholder="Full Name *" 
                      onChange={handleInputChange} 
                    />
                    <CustomInput 
                      name="phone" 
                      value={newAddress.phone} 
                      placeholder="Phone Number (10 digits) *" 
                      onChange={handleInputChange}
                      maxLength={10}
                    />
                    <CustomInput 
                      name="houseNo" 
                      value={newAddress.houseNo} 
                      placeholder="House/Flat No. *" 
                      onChange={handleInputChange} 
                    />
                    <CustomInput 
                      name="area" 
                      value={newAddress.area} 
                      placeholder="Area/Street *" 
                      onChange={handleInputChange} 
                    />
                    <CustomInput 
                      name="city" 
                      value={newAddress.city} 
                      placeholder="City *" 
                      onChange={handleInputChange} 
                    />
                    <CustomInput 
                      name="state" 
                      value={newAddress.state} 
                      placeholder="State *" 
                      onChange={handleInputChange} 
                    />
                    <CustomInput 
                      name="pincode" 
                      value={newAddress.pincode} 
                      placeholder="Pincode (6 digits) *" 
                      onChange={handleInputChange}
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button 
                      onClick={handleSaveAddress} 
                      className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : editingAddressId ? "Update" : "Save"}
                    </button>
                    <button 
                      onClick={handleCancelForm} 
                      className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* OTHER SECTIONS */}
        {activeSection === "orders" && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            <p className="text-gray-500">Your order history will appear here</p>
          </div>
        )}

        {activeSection === "cancelled" && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Cancelled Orders</h1>
            <p className="text-gray-500">Your cancelled orders will appear here</p>
          </div>
        )}
      </main>
    </div>
  );
};

// -SMALL COMPONENTS = name and email show krne k liye 
const DetailCard = ({ label, value }) => (
  <div className="bg-white p-6 border rounded-lg shadow-sm">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="font-semibold text-gray-800">{value || "Not provided"}</p>
  </div>
);

const CustomInput = (props) => (
  <input 
    {...props} 
    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all" 
  />
);

export default ProfilePage;