import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/images/logoMK.png';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { IoHome, IoCartOutline } from "react-icons/io5"; // Swapped to IoCartOutline for consistency
import { FaRegHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
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
  const cartSelector = useSelector((state) => state.cart.cartItem);
  const wishlistSelector = useSelector((state) => state.wishlist.wishlistItem);

  const BASE_URL = import.meta.env.VITE_API_URL;

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
  }, [user, dispatch, BASE_URL]);

  return (
    <header className='bg-white sticky top-0 z-50 shadow-sm'>

      {/* Top Strip */}
      <div className="top-strip hidden md:block py-2 border-t border-b border-gray-400 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className='text-[14px] font-medium text-white'>
              Get up to 50% off new season styles, limited time
            </p>

            <ul className='flex items-center gap-3'>
              <li>
                <Link to="/help-center" className='text-[14px] font-medium text-white'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className='text-[14px] font-medium text-white'>
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header py-2 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <div className="w-1/4">
            <Link to="/">
              <img src={logo} alt="logo" className="w-24 md:w-28" />
            </Link>
          </div>

          {/* Search spacer */}
          <div className="flex-1 max-w-xl mx-2"></div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5 flex-nowrap">

            {user ? (
              <>
                {/* Home */}
                {user.role !== 'admin' && location.pathname !== "/" && (
                  <Tooltip title="Home">
                    <IconButton className="p-2" size="small">
                      <Link to="/">
                        <IoHome className='text-gray-500 hover:text-[#0b4778] text-2xl md:text-3xl' />
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}

                {/* Profile */}
                {user.role !== 'admin' && location.pathname !== "/profile" && (
                  <Tooltip title="Profile">
                    <IconButton className="p-2" size="small">
                      <Link to="/profile">
                        <MdAccountCircle className='text-gray-500 hover:text-[#0b4778] text-2xl md:text-3xl' />
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}

                {/* Wishlist */}
                {user.role !== 'admin' && location.pathname !== "/wishlist" && (
                  <Tooltip title="Wishlist">
                    <IconButton className="p-2" size="small">
                      <Link to="/wishlist">
                        <StyledBadge badgeContent={wishlistSelector.length || 0}>
                          <FaRegHeart className='text-gray-500 hover:text-[#0b4778] text-2xl md:text-3xl' />
                        </StyledBadge>
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}

                
                {user.role !== 'admin' && location.pathname !== "/cart" && (
                  <Tooltip title="Cart">
                    <IconButton className="p-2" size="small">
                      <Link to="/cart">
                        <StyledBadge badgeContent={cartSelector.length || 0}>
                          <IoCartOutline className='text-gray-500 hover:text-[#0b4778] text-2xl md:text-3xl' />
                        </StyledBadge>
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}

                {/* Admin */}
                {user.role === "admin" && location.pathname !== "/adminHome" && (
                  <Tooltip title="Admin">
                    <IconButton className="p-2" size="medium">
                      <Link to="/adminHome">
                        <ManageAccountsSharpIcon className='text-gray-900 hover:text-[#0b4778] text-3xl md:text-3xl' />
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/" className='hidden sm:block text-sm md:text-base'>
                  Home
                </Link>
                <Link to="/login" className='text-sm md:text-base px-2 md:px-4'>
                  Login
                </Link>
                <Link to="/register" className='text-sm md:text-base px-2 md:px-4'>
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;