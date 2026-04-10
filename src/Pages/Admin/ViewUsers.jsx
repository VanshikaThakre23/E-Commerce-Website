import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';

const ViewUsers = () => {
    const [seeUsers, setSeeUsers] = useState([]);

    const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://megakart-backend.onrender.com";
    

    useEffect(() => {
        const allUsers = async () => {
            try {
                const res = await fetch(`${BASE_URL}/user/viewUser`);
                const data = await res.json();
                setSeeUsers(data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        allUsers();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 p-8">
                <h1 className="text-xl font-bold mb-6 text-gray-800">User List</h1>

                {seeUsers.length === 0 ? (
                    <p className="text-gray-500">No users found.</p>
                ) : (
                    <div className="space-y-4">
                        {seeUsers.map((user) => (
                            <div key={user._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                
                                {/* User Info */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <p className="text-xs font-semibold text-gray-400 uppercase mb-3">User Address</p>
                                    
                                    {user.addresses && user.addresses.length > 0 ? (
                                        <div className="space-y-3">
                                            {user.addresses
                                                .filter(addr => addr.phone || addr.city)
                                                .map((addr, i) => (
                                                    <div key={i} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                                        <p><strong>Phone:</strong> {addr.phone}</p>
                                                        <p><strong>Address:</strong> {addr.houseNo}, {addr.area}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No address provided.</p>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewUsers;