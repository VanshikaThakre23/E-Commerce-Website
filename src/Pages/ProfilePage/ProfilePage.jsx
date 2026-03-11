import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({});

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
  }, []);

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/add-address",
        newAddress,
        { withCredentials: true }
      );

      setUser(res.data.user);
      setShowAddressForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await axios.get("http://localhost:5000/user/logout", {
      withCredentials: true,
    });
    navigate("/login");
  };

  const cardStyle = (section) =>
    `p-6 rounded shadow cursor-pointer transition 
    ${
      activeSection === section
        ? "bg-amber-100 border border-amber-400"
        : "bg-white hover:shadow-lg"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* User Info */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">

        <div
          onClick={() => setActiveSection("profile")}
          className={cardStyle("profile")}
        >
          <h3 className="text-lg font-semibold">Profile Info</h3>
          <p className="text-gray-500 text-sm">View profile details</p>
        </div>

        <div
          onClick={() => setActiveSection("orders")}
          className={cardStyle("orders")}
        >
          <h3 className="text-lg font-semibold">My Orders</h3>
          <p className="text-gray-500 text-sm">Track your orders</p>
        </div>

        <div
          onClick={() => {
            setActiveSection("addresses");
            setShowAddressForm(false);
          }}
          className={cardStyle("addresses")}
        >
          <h3 className="text-lg font-semibold">Addresses</h3>
          <p className="text-gray-500 text-sm">Manage addresses</p>
        </div>

        <div
          onClick={() => setActiveSection("cancelled")}
          className={cardStyle("cancelled")}
        >
          <h3 className="text-lg font-semibold">Cancelled Orders</h3>
        </div>

        <div
          onClick={() => setActiveSection("wishlist")}
          className={cardStyle("wishlist")}
        >
          <h3 className="text-lg font-semibold">Wishlist</h3>
        </div>

        <div
          onClick={logoutUser}
          className="p-6 rounded shadow cursor-pointer bg-red-100 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-red-600">Logout</h3>
        </div>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-3">Profile Info</h3>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      )}

      {/* Orders Section */}
      {activeSection === "orders" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-3">My Orders</h3>
          <p>No orders yet.</p>
        </div>
      )}

      {/* Cancelled Orders */}
      {activeSection === "cancelled" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-3">Cancelled Orders</h3>
          <p>No cancelled orders.</p>
        </div>
      )}

      {/* Wishlist */}
      {activeSection === "wishlist" && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-3">Wishlist</h3>
          <p>No items in wishlist.</p>
        </div>
      )}

      {/* Address Section */}
      {activeSection === "addresses" && (
        <div className="bg-white p-6 rounded shadow">

          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">My Addresses</h3>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="bg-amber-500 text-white px-4 py-1 rounded"
            >
              + Add Address
            </button>
          </div>

          {/* Address List */}
          <div className="grid grid-cols-2 gap-4">
            {user?.addresses?.map((addr, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-semibold">{addr.fullName}</p>
                <p>{addr.houseNo}, {addr.area}</p>
                <p>{addr.city}, {addr.state}</p>
                <p>{addr.pincode}</p>
                <p>{addr.phone}</p>
              </div>
            ))}
          </div>

          {/* Address Form */}
          {showAddressForm && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <input name="fullName" placeholder="Full Name" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="phone" placeholder="Phone" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="city" placeholder="City" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="state" placeholder="State" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="houseNo" placeholder="House No" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="area" placeholder="Area" onChange={handleAddressChange} className="border p-2 rounded"/>
              <input name="landmark" placeholder="Landmark" onChange={handleAddressChange} className="border p-2 rounded"/>

              <button
                onClick={saveAddress}
                className="col-span-2 bg-green-600 text-white py-2 rounded"
              >
                Save Address
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default ProfilePage;