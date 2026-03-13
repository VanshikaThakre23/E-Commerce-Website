import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/user/register",
                { name, email, password },
                { withCredentials: true },
            )

            toast.success(res.data.message);
         

            navigate("/login")

            setName("");
            setEmail("");
            setPassword("");


        } catch (error) {
            toast.error(error?.response?.data?.message|| "Registration Failed");
        }
    }


    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Register Here
                    </h2>

                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">
                                Enter Your Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                required
                            />
                        </div>



                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">
                                Enter Your Email *
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">
                                Enter Your Password *
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={4}
                                maxLength={8}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                required
                            />
                        </div>

                        <button
                            onClick={handleRegister}
                            className="bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
                        >
                            Register

                        </button>

                        <p className="text-sm text-center">
                            Already a user?{" "}
                            <button className="text-amber-600 font-medium hover:underline">
                                <Link to={"/login"} className="link " >Login Here </Link>
                            </button>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
