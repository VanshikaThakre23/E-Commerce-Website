import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/images/logoMK.png';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { IoHome, IoCartOutline } from "react-icons/io5"; 
import { FaRegHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../features/cart/cartSlice';
import { setWishlist } from '../../features/wishlist/wishlistSlice';
import { logout } from '../../features/auth/authSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid white`,
    padding: '0 4px',
    backgroundColor: "#ff5252",
    color: "white"
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const cartSelector = useSelector((state) => state.cart.cartItem) || [];
  const wishlistSelector = useSelector((state) => state.wishlist.wishlistItem) || [];

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products`, { withCredentials: true });
        dispatch(setCart(res.data));
      } catch (err) {
        if (err.response?.status === 401) { dispatch(logout()); }
      }
    };

    if (user && user._id) {
      fetchUserData();
    } else {
      dispatch(setCart([]));
      dispatch(setWishlist([]));
    }
  }, [user, dispatch, BASE_URL]);

  return (
    <header className='bg-white sticky top-0 z-50 shadow-sm'>
      {/* Top Strip */}
      <div className="top-strip hidden md:block py-2 border-t border-b border-gray-400 bg-amber-600 ">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className='text-[14px] font-medium text-white'>Get up to 50% off new season styles!</p>
          <ul className='flex items-center gap-3'>
            <li><Link to="/help-center" className='text-[14px] text-white'>Help Center</Link></li>
            <li><Link to="/order-tracking" className='text-[14px] text-white'>Order Tracking</Link></li>
          </ul>
        </div>
      </div>

      <div className="header py-2 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="w-1/4">
            <Link to="/"><img src={logo} alt="logo" className="w-24 md:w-28" /></Link>
          </div>

          <div className="flex-1 max-w-xl mx-2"></div>

          <div className="flex items-center gap-3 md:gap-5 flex-nowrap">
            
            {/* --- ALWAYS VISIBLE HOME ICON --- */}
            {location.pathname !== "/" && (
              <Tooltip title="Home">
                <IconButton size="small">
                  <Link to="/"><IoHome className='text-gray-500 hover:text-amber-600 text-2xl md:text-3xl' /></Link>
                </IconButton>
              </Tooltip>
            )}

            {/* --- LOGGED IN USERS ONLY --- */}
            {user && user._id ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Tooltip title="Profile">
                      <IconButton size="small">
                        <Link to="/profile"><MdAccountCircle className='text-gray-500 hover:text-amber-600 text-2xl md:text-3xl' /></Link>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Wishlist">
                      <IconButton size="small">
                        <Link to="/wishlist">
                          <StyledBadge badgeContent={wishlistSelector.length}>
                            <FaRegHeart className='text-gray-500 hover:text-amber-600 text-2xl md:text-3xl' />
                          </StyledBadge>
                        </Link>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Cart">
                      <IconButton size="small">
                        <Link to="/cart">
                          <StyledBadge badgeContent={cartSelector.length}>
                            <IoCartOutline className='text-gray-500 hover:text-amber-600 text-2xl md:text-3xl' />
                          </StyledBadge>
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </>
                )}

                {user.role === "admin" && (
                  <Tooltip title="Admin Dashboard">
                    <IconButton size="medium">
                      <Link to="/adminHome">
                        <ManageAccountsSharpIcon className='text-gray-900 hover:text-amber-600 text-3xl' />
                      </Link>
                    </IconButton>
                  </Tooltip>
                )}
              </>
            ) : (
              /* --- LOGGED OUT USERS ONLY --- */
              <div className="flex items-center gap-4">
                <Link to="/login" className='text-sm font-bold bg-amber-500 text-white px-4 py-2 rounded-lg'>Login</Link>
                <Link to="/register" className='text-sm font-medium hover:text-amber-600'>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;