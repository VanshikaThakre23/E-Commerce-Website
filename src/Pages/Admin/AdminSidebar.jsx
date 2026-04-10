import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const AdminSidebar = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://megakart-backend.onrender.com";
    

    const handleLogout = async () => {
        try {
            const confirm = await swal({
                title: "Really ??",
                text: "Are you sure you want to logout ??",
                icon: "warning",
                dangerMode: true,
                buttons:
                {
                    confirm: "Yes Logout",
                    cancel: "No"
                },

            });

            if (!confirm) {
                return;
            }

             await axios.get(`${BASE_URL}/user/logout`, {
                    withCredentials: true
                  });

            dispatch(logout());
            navigate("/login");

        } catch (error) {
            console.log(error);
        }
    }

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
                    <button
                        onClick={handleLogout}
                        className='text-red-600 flex gap-2 items-center cursor-pointer'>
                        Logout
                        <IoMdLogOut className='text-2xl' />
                    </button>
                </ul>
            </div>
        </>
    )
}

export default AdminSidebar
