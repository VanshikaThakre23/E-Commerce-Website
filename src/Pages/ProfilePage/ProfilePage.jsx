import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, LogOut, Plus, ChevronRight, Phone, Edit3, Trash2 } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    houseNo: "",
    city: "",
    pincode: ""
  });

  // ---------- GET USER ----------
  useEffect(() => {

    const checkUser = async () => {
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

    checkUser();

  }, [navigate]);

  // ---------- INPUT CHANGE ----------
  const handleInputChange = (e) => {

    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value
    });

  };

  // ---------- EDIT ADDRESS ----------
  const handleEditClick = (addressData, index) => {

    setNewAddress(addressData);
    setEditingIndex(index);
    setShowAddressForm(true);

    toast("Editing address...", { icon: "📝" });

  };

  // ---------- SAVE ADDRESS ----------
  const handleSaveAddress = async () => {

    try {

      let finalAddressList;

      if (editingIndex !== null) {

        finalAddressList = (user.addresses || []).map((addr, idx) =>
          idx === editingIndex ? newAddress : addr
        );

      } else {

        finalAddressList = [...(user.addresses || []), newAddress];

      }

      await axios.post(
        "http://localhost:5000/user/add-address",
        { addresses: finalAddressList },
        { withCredentials: true }
      );

      setUser({ ...user, addresses: finalAddressList });

      resetForm();

      toast.success(
        editingIndex !== null ? "Address Updated!" : "Address Added!"
      );

    } catch (error) {

      toast.error("Could not save address");

    }

  };

  // ---------- DELETE ADDRESS ----------
  const handleDeleteAddress = async (indexToDelete) => {

    if (!window.confirm("Delete this address?")) return;

    try {

      const filteredAddresses =
        (user.addresses || []).filter((_, idx) => idx !== indexToDelete);

      await axios.post(
        "http://localhost:5000/user/add-address",
        { addresses: filteredAddresses },
        { withCredentials: true }
      );

      setUser({ ...user, addresses: filteredAddresses });

      toast.success("Address removed", { icon: "🗑️" });

    } catch (error) {

      toast.error("Failed to delete");

    }

  };

  // ---------- RESET FORM ----------
  const resetForm = () => {

    setShowAddressForm(false);
    setEditingIndex(null);

    setNewAddress({
      fullName: "",
      phone: "",
      houseNo: "",
      city: "",
      pincode: ""
    });

  };

  // ---------- LOGOUT ----------
  const logoutUser = async () => {

    try {
      const userLogout = await swal({
        title: "Are you sure?",
        text: "Are you sure you want to logout ?",
        icon: "warning",
        dangerMode: true,
        buttons:
        {
          cancel: "No",
          confirm: "Yes",
        },
      });

      if (!userLogout) {
        return
      }
      else {
        await axios.get(
          "http://localhost:5000/user/logout",
          { withCredentials: true }
        );

        dispatch(logout());

        dispatch(setCart([]));
        dispatch(setWishlist([]));

        navigate("/login");
      }

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

          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div>
            <h2 className="font-bold">{user?.name}</h2>
            <p className="text-xs text-gray-400">Customer</p>
          </div>

        </div>

        <nav className="space-y-2 grow">

          {["profile", "orders", "cancelled"].map((id) => (

            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                resetForm();
              }}
              className={`w-full flex justify-between p-3 rounded-lg ${activeSection === id
                ? "bg-gray-300 text-black"
                : "hover:bg-gray-100"
                }`}
            >
              {id}
              <ChevronRight size={14} />
            </button>

          ))}

          <button
            onClick={logoutUser}
            className="mt-10 flex items-center gap-3 text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>

        </nav>

        {/* <button
          onClick={logoutUser}
          className="mt-10 flex items-center gap-3 text-red-500"
        >
          <LogOut size={18} /> Logout
        </button> */}

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {activeSection === "profile" && (

          <div className="max-w-3xl">

            <h1 className="text-3xl font-bold mb-6">My Account</h1>

            <div className="grid grid-cols-2 gap-6 mb-10">

              <DetailCard label="Full Name" value={user?.name} />
              <DetailCard label="Email" value={user?.email} />

            </div>

            {/* ADDRESS SECTION */}
            <div className="bg-white p-8 rounded-xl border">

              <div className="flex justify-between mb-6">

                <h3 className="font-bold flex items-center gap-2">
                  <MapPin /> Saved Addresses
                </h3>

                {!showAddressForm && (

                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="universalBtn px-1  rounded flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Address
                  </button>

                )}

              </div>

              {/* ADDRESS LIST */}
              <div className="grid md:grid-cols-2 gap-4">

                {user?.addresses
                  ?.filter(addr => addr.fullName || addr.phone || addr.city)
                  ?.map((addr, index) => (

                    <div
                      key={index}
                      className="border p-4 rounded-lg relative"
                    >

                      <div className="absolute right-2 top-2 flex gap-2">

                        <button
                          onClick={() => handleEditClick(addr, index)}
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() => handleDeleteAddress(index)}
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                      <p className="font-semibold">{addr.fullName}</p>

                      <p className="text-sm text-gray-600">
                        {addr.houseNo}, {addr.city}
                      </p>

                      <p className="text-sm">{addr.pincode}</p>

                      <p className="text-xs flex gap-1 mt-2">
                        <Phone size={12} /> {addr.phone}
                      </p>

                    </div>

                  ))}

              </div>

              {/* ADDRESS FORM */}
              {showAddressForm && (

                <div className="mt-8 grid gap-3">

                  <CustomInput
                    name="fullName"
                    value={newAddress.fullName}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                  />

                  <CustomInput
                    name="phone"
                    value={newAddress.phone}
                    placeholder="Phone"
                    onChange={handleInputChange}
                  />

                  <CustomInput
                    name="houseNo"
                    value={newAddress.houseNo}
                    placeholder="House / Area"
                    onChange={handleInputChange}
                  />

                  <CustomInput
                    name="city"
                    value={newAddress.city}
                    placeholder="City"
                    onChange={handleInputChange}
                  />

                  <CustomInput
                    name="pincode"
                    value={newAddress.pincode}
                    placeholder="Pincode"
                    onChange={handleInputChange}
                  />

                  <button
                    onClick={handleSaveAddress}
                    className="bg-green-600 text-white py-2 rounded"
                  >
                    {editingIndex !== null
                      ? "Update Address"
                      : "Save Address"}
                  </button>

                </div>

              )}

            </div>

          </div>

        )}

      </main>

    </div>

  );

};

// ---------- SMALL COMPONENTS ----------

const DetailCard = ({ label, value }) => (

  <div className="bg-white p-5 border rounded-lg">

    <p className="text-xs text-gray-400">{label}</p>

    <p className="font-semibold">{value}</p>

  </div>

);

const CustomInput = ({ ...props }) => (

  <input
    {...props}
    className="border p-3 rounded w-full"
  />

);

export default ProfilePage;