import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '/images/logoMK.png'
import SearchBar from '../SearchBar/SearchBar';
// import Navigation from './Navigation/Navigation';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoHome } from "react-icons/io5";
import { RiUserStarFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';


import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../features/cart/cartSlice';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "#ff5252",
        color: "white"
    },
}));

const Header = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const user = useSelector((state) => state.auth.user); 
    console.log(user);

    const cartSelector = useSelector((state) => state.cart.cartItem);
    console.log(cartSelector.length)

    const wishlistSelector = useSelector((state) => state.wishlist.wishlistItem);
    console.log(wishlistSelector.length)


    
  const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://megakart-backend.onrender.com";


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/products`, {
                    withCredentials: true
                });
                dispatch(setCart(res.data));
            } catch (err) {
                console.log(err);
            }
        };

        if (user) {
            fetchCart();
        } else {
            dispatch(setCart([]));
        }
    }, [user]);



    return (

        <>
            <header className='bg-white sticky top-0 z-50'>
                <div className="top-strip bg-[#] py-2 border-t border-b border-gray-250">
                    <div className="container">
                        <div className="flex items-center justify-between">
                            <div className="col1 w-[50%]">
                                <p className='text-[14px] font-medium'>Get up to 50% off new season styles,limited time
                                </p>
                            </div>

                            <div className="col2 flex items-center justify-end " >
                                <ul className='flex items-center gap-3'>
                                    <li className='list-none'>
                                        <Link to="/help-center"
                                            className='text-[14px] link font-medium'>Help Center{" "}</Link>
                                    </li>



                                    <li className='list-none'>
                                        <Link to="/order-tracking"
                                            className='text-[14px] link font-medium'>Order-tracking{" "}</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" header py-2 border-t border-b border-gray-110 ">
                    <div className="container mx-auto px-4 flex items-center justify-between">

                        {/* Logo */}
                        <div className="w-1/4">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-30" />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="w-2/4">
                            {/* <SearchBar /> */}
                        </div>

                        {/* Right Section */}
                        <div className="w-1/4 flex justify-end items-center">
                            <ul className='flex items-center w-full justify-end gap-2'>

                                <li className='list-none text-[16px] font-medium'>
                                    {user ? (
                                        <>

                                            {/* iska mtlb hai agr ye true hai location.pathname !== "/" to && ke baad ka code chalega mtlb home route nhi hai to uska icon dikhao  */}
                                            {user.role !== 'admin' && (
                                                location.pathname !== "/" && (
                                                    <Tooltip title="Home">
                                                        <IconButton aria-label="home">
                                                            <Link to={"/"}>
                                                                <StyledBadge>

                                                                    <IoHome  className='text-gray-500 hover:text-[#0b4778]'/>

                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            )
                                            }

                                            {user.role !== "admin" &&(
                                                 location.pathname !== "/profile" && (
                                                    <Tooltip title="Profile">
                                                        <IconButton aria-label="profile">
                                                            <Link to={"/profile"}>
                                                                <StyledBadge  >

                                                                    <MdAccountCircle  className='text-gray-500 hover:text-[#0b4778]' />

                                                                </StyledBadge >
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            )
                                               
                                            }

                                            { user.role !== "admin" &&(
                                                location.pathname !== "/wishlist" && (
                                                    <Tooltip title="Wishlist" >
                                                        <IconButton aria-label="wishlist">
                                                            <Link to={"/wishlist"}>
                                                                <StyledBadge badgeContent={wishlistSelector.length ? wishlistSelector.length : 0} >

                                                                    <FaRegHeart  className='text-gray-500 hover:text-[#0b4778]' />
                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            )
                                            }


                                            {user.role !== "admin" &&(
                                                location.pathname !== "/cart" && (
                                                    <Tooltip title="Cart">
                                                        <IconButton aria-label="cart">
                                                            <Link to={"/cart"}>

                                                                <StyledBadge badgeContent={cartSelector.length ? cartSelector.length : 0} >
                                                                    <ShoppingCartIcon  className='text-gray-500 hover:text-[#0b4778]'  />
                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            )
                                            }

                                            {
                                                user.role === "admin"&&(
                                                    location.pathname !== "/adminHome" &&(
                                                    <Tooltip title="Admin">
                                                        <IconButton aria-label="admin" >
                                                            <Link to={"/adminHome"}>
                                                                    <ManageAccountsSharpIcon 
                                                                    fontSize='large'
                                                                    className='text-gray-500 hover:text-[#0b4778]' />
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            )
                                            }

            

                                        </>

                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center text-center">
                                                <Link to={"/"} className='homeBtn mr-4 ml-2'>Home</Link>

                                                <Link to={"/login"} className='authBtn mr-4 ml-2'>Login</Link>
                                                <Link to={"/register"} className='authBtn'>Register</Link>
                                            </div>
                                        </>


                                    )}
                                </li>


                            </ul>

                        </div>

                    </div>
                </div>



            </header >



        </>
    )
}

export default Header