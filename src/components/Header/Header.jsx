import React from 'react'
import { Link } from 'react-router-dom';
import logo from '/images/logo.svg'
import SearchBar from '../SearchBar/SearchBar';
import Navigation from './Navigation/Navigation';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoMdGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';


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
    return (

        <>
            <header className='bg-white'>
                <div className="top-strip bg-amber-300 py-2 border-t border-b border-gray-250">
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

                <div className=" header py-5 border-t border-b border-gray-110 ">
                    <div className="container mx-auto px-4 flex items-center justify-between">

                        {/* Logo */}
                        <div className="w-1/4">
                            <Link to="/">
                                <img src={logo} alt="logo" className="h-10" />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="w-2/4">
                            <SearchBar />
                        </div>
 
                        {/* Right Section */}
                         <div className="w-1/4 flex justify-end items-center">
                            <ul className='flex items-center w-full justify-end gap-2'>
                                <li className='list-none text-[16px] font-medium'>
                                    <Link to={"/login"} className='link'>Login</Link> | <Link to={"/register"} className='link'>Register</Link>
                                </li>&nbsp;&nbsp;&nbsp;&nbsp;

                                <Tooltip title="Compare">
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4} >
                                            <IoMdGitCompare />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Wishlist" >
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4}>
                                            <FaRegHeart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Cart">
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={4} >
                                            <ShoppingCartIcon />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </ul>

                        </div>

                    </div>
                </div>


                <Navigation/>
            </header>



        </>
    )
}

export default Header