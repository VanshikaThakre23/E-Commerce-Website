import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {

    const location = useLocation();

   

    return (
        <>
            <div className="w-64 bg-gray-100 text-black font-semibold p-6 border-r-[#d8d0d0] border-r-2">
                <h2 className="text-2xl font-bold mb-6 text-[#ef6820]">Admin Panel</h2>

                <ul className="space-y-4">
                    {location.pathname !== "/adminHome" && (
                        <li className="cursor-pointer transition-all duration-100 hover:text-[#043074] hover:scale-105 hover:translate-x-1"><Link to={"/adminHome"}>Home</Link></li>
                    )}
                    {location.pathname !== "/addProducts" && (
                        <li className="cursor-pointer transition-all duration-300 hover:text-[#043074] hover:scale-105 hover:translate-x-1"> <Link to={"/addProducts"}>Add Product</Link></li>
                    )}
                    {location.pathname !== "/manageproducts" && (
                        <li className="cursor-pointer transition-all duration-300 hover:text-[#043074] hover:scale-105 hover:translate-x-1"><Link to={"/manageproducts"}>Manage Products</Link></li>
                    )}
                    {location.pathname !== "/orders" && (
                        <li className="cursor-pointer transition-all duration-300 hover:text-[#043074] hover:scale-105 hover:translate-x-1"><Link to={"/orders"}>Orders</Link></li>
                    )}
                    {location.pathname !== "/users" && (
                        <li className="cursor-pointer transition-all duration-300 hover:text-[#043074] hover:scale-105 hover:translate-x-1">
                            <Link to="/viewUsers">Users</Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default AdminSidebar
