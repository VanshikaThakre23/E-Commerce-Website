import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './Pages/HomePage/HomePage'
import ProductListing from './Pages/ProductListing/ProductListing'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import CartPage from './Pages/CartPage/CartPage';
import WishlistPage from './Pages/WishlistPage/WishlistPage';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AddProducts from "./Pages/Admin/AddProducts.jsx";
import AdminSidebar from './Pages/Admin/AdminSidebar.jsx';
import ViewUsers from './Pages/Admin/ViewUsers.jsx';
import ProductDetails from './Pages/ProductDetailsPage/ProductDetails.jsx';
import ManageProducts from './Pages/Admin/ManageProducts.jsx';
import Categorypage from './Pages/Categorypage/Categorypage.jsx';
import CheckoutPage from './Pages/CheckoutPage/CheckoutPage.jsx';
import MyOrderPage from './Pages/MyOrderPage/MyOrderPage.jsx';
import ViewOrders from './Pages/Admin/ViewOrders.jsx';


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAPI } from "./features/cart/cartActions.js";

const App = () => {

  const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        // Only fetch from DB if a user is logged in
        if (user) {
            dispatch(fetchCartAPI());
        }
    }, [user, dispatch]);


  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">

          <Header />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productlisting" element={<ProductListing />} />
              <Route path="/login" element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/wishlist' element={<WishlistPage />} />
              <Route path='/profile/myorder' element={<MyOrderPage />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/category/:id/:subId' element={<Categorypage />} />

              {/* admin routes */}
              <Route path='/adminHome' element={<AdminDashboard />} />
              <Route path='/addProducts' element={<AddProducts />} />
              {/* <Route path='/admin' element={<AdminSidebar/>}/> */}
              <Route path='/viewUsers' element={<ViewUsers />} />
              <Route path='/manageProducts' element={<ManageProducts />} />
              <Route path='/viewOrders' element={<ViewOrders />} />

            </Routes>
          </main>

          <Footer />

        </div>
      </BrowserRouter>

      <ToastContainer position='top-right' autoClose={1000} />

    </>
  )
}

export default App