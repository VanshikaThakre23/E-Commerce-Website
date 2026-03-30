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


import { FaRegHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';



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

    const [loggedIn, setLoggedIn] = useState(false);

    const location = useLocation();

    const cartSelector = useSelector((state)=>state.cart.cartItem);
    console.log(cartSelector.length)

    const wishlistSelector = useSelector((state)=>state.wishlist.wishlistItem);
    console.log(wishlistSelector.length)


    useEffect(() => {

        const checkLogin = async () => {
            try {
                const res = await axios.get("http://localhost:5000/user/me", {
                    withCredentials: true
                })
                if (res.data.user) {
                    setLoggedIn(true);
                }

            } catch (error) {
                if (error.response?.status === 401) {
                    setLoggedIn(false);
                } else {
                    console.log(error);
                }
            }
        }
        checkLogin();
    }, []);

    // const handleLogout = async () => {
    //     await axios.get("http://localhost:5000/user/logout", {
    //         withCredentials: true,
    //     });
    //     setLoggedIn(false);
    // };


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
                                    {loggedIn ? (
                                        <>

                                            {/* iska mtlb hai agr ye true hai location.pathname !== "/" to && ke baad ka code chalega mtlb home route nhi hai to uska icon dikhao  */}
                                            {
                                                location.pathname !== "/" && (
                                                    <Tooltip title="Home">
                                                        <IconButton aria-label="home">
                                                            <Link to={"/"}>
                                                                <StyledBadge>

                                                                    <IoHome />

                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }

                                            {
                                                location.pathname !== "/profile" && (
                                                    <Tooltip title="Profile">
                                                        <IconButton aria-label="profile">
                                                            <Link to={"/profile"}>
                                                                <StyledBadge  >

                                                                    <MdAccountCircle />

                                                                </StyledBadge >
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }

                                            {
                                                location.pathname !== "/wishlist" && (
                                                    <Tooltip title="Wishlist" >
                                                        <IconButton aria-label="wishlist">
                                                            <Link to={"/wishlist"}>
                                                              <StyledBadge badgeContent={wishlistSelector.length ? wishlistSelector.length:0} >

                                                                    <FaRegHeart />
                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }


                                            {
                                                location.pathname !== "/cart" && (
                                                    <Tooltip title="Cart">
                                                        <IconButton aria-label="cart">
                                                            <Link to={"/cart"}>

                                                                <StyledBadge badgeContent={cartSelector.length ? cartSelector.length:0} >
                                                                    <ShoppingCartIcon />
                                                                </StyledBadge>
                                                            </Link>

                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }



                                            {/* <Tooltip title="Logout">
                                                <IconButton aria-label="Logout">
                                                    <StyledBadge  >
                                                        <Link to={"/logout"}>
                                                            <LogoutOutlinedIcon
 />
                                                        </Link>
                                                    </StyledBadge>
                                                </IconButton>
                                            </Tooltip> */}
                                        </>


                                        // <button onClick={handleLogout} className='authBtn transition-all'>Logout</button>



                                    ) : (
                                        <>
                                            <Link to={"/login"} className='authBtn mr-4'>Login</Link>
                                            <Link to={"/register"} className='authBtn'>Register</Link>
                                        </>


                                    )}
                                </li>

                                {/* <Tooltip title="Profile">
                                    <IconButton aria-label="profile">
                                        <StyledBadge  >
                                            <Link to={"/profile"}>
                                                <MdAccountCircle />
                                            </Link>
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Wishlist" >
                                    <IconButton aria-label="wishlist">
                                        <StyledBadge badgeContent={4}>
                                            <FaRegHeart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Cart">
                                    <IconButton aria-label="cart">
                                        <StyledBadge  >
                                            <Link to={"/cart"}>
                                                <ShoppingCartIcon />
                                            </Link>
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip> */}
                            </ul>

                        </div>

                    </div>
                </div>



            </header>



        </>
    )
}

export default Header