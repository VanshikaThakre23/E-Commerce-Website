import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-300">Add Product</li>
          <li className="cursor-pointer hover:text-gray-300">Manage Products</li>
          <li className="cursor-pointer hover:text-gray-300">Orders</li>
          <li className="cursor-pointer hover:text-gray-300">Users</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Users</h3>
            <p className="text-2xl font-bold mt-2">60</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$3200</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;