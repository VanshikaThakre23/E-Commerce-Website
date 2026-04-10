import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { setCart } from '../../features/cart/cartSlice';
import { setWishlist } from '../../features/wishlist/wishlistSlice';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true }


      );
      console.log("API Data:", res.data);
      console.log("res.data:", res.data)
      console.log("res.data.user:", res.data.user)
      console.log("_id exists?:", res.data.user?._id);

      const user = res.data.user || res.data;

      dispatch(login(user));

      const userId = user?.email;

      const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`)) || []

      dispatch(setCart(userCart));
      dispatch(setWishlist(userWishlist));

      toast.success(res.data.message);

      console.log("jnbljk;",user)

      if(user.role==="admin"){
        navigate("/adminHome");
      }else{
      navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }



  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Login Here
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Enter Your Email
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
                Enter Your Password
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

              type='submit'
              className="bg-amber-500 text-white py-2 rounded-md cursor-pointer"
            >
              Login
            </button>

            <p className="text-sm text-center">
              Not a user?{" "}
              <button className="text-amber-600 font-medium hover:underline cursor-pointer
              ">
                <Link to={"/register"} className="link " > Create New Account </Link>
              </button>
            </p>

          </form>
        </div>
      </div >

    </>
  )
}

export default Login
