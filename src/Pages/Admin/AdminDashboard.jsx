import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  // const location = useLocation();

  useEffect(() => {
    const userCount = async () => {
      const res = await fetch("http://localhost:5000/user/totalUser");
      const data = await res.json();
      setTotalUser(data.totalUser);
    };
    userCount();
  }, []);


  useEffect(() => {
    const productCount = async () => {
      const res = await fetch("http://localhost:5000/products/totalProducts");
      const data = await res.json();
      setTotalProducts(data.totalProducts);
    };
    productCount();
  }, []);



  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold mt-2">{totalProducts}</p>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">
            <Link to={"/users"}>
              <h3 className="text-gray-500">Total User</h3>
              <p className="text-2xl font-bold mt-2">{totalUser}</p>
            </Link>
          </div>


          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">not done </p>
          </div>



          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold mt-2">not done</p>
          </div>

        </div>

        <Link to={"/"}>
          <button className="mt-4 border-2 border-gray-700 py-2 px-2 text-gray-900 font-semibold rounded-2xl bg-[#1171a5] cursor-pointer">
            Do you want to see your website ?
          </button>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;