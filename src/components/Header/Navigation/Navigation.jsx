import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"; // Added Up arrow for toggle
import { IoRocketOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null); // Track which submenu is open on mobile

  const toggleSubmenu = (index) => {
    if (mobileSubmenu === index) {
      setMobileSubmenu(null); // Close if already open
    } else {
      setMobileSubmenu(index); // Open clicked one
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Fashion",
      id: "Fashion",
      submenu: [
        { name: "Men", subId: "Men" },
        { name: "Women", subId: "Women" },
        { name: "Kids", subId: "Kids" },
      ]
    },
    {
      name: "Appliances",
      id: "Appliances",
      submenu: [
        { name: "Kitchen", subId: "Kitchen" },
        { name: "Home", subId: "Home" },
      ]
    },
    {
      name: "Bags",
      id: "Bags",
      submenu: [
        { name: "Office-Bag", subId: "Office-Bag" },
        { name: "Travel-Bag", subId: "Travel-Bag" },
        { name: "School-Bag", subId: "School-Bag" },
      ]
    },
    {
      name: "Footwear",
      id: "Footwear",
      submenu: [
        { name: "Women", subId: "Women" },
        { name: "Men", subId: "Men" },
        { name: "Kids", subId: "Kids" },
      ]
    },
    {
      name: "Groceries",
      id: "Groceries",
      submenu: [
        { name: "Daily-Needs", subId: "Daily" },
        { name: "Essentials", subId: "Essentials" },
      ]
    },
    {
      name: "Beauty",
      id: "Beauty",
      submenu: [
        { name: "Skincare", subId: "Skincare" },
        { name: "Makeup", subId: "Makeup" },
      ]
    },
    {
      name: "Wellness",
      id: "Wellness",
      submenu: [
        { name: "Fitness", subId: "Fitness" },
        { name: "Health", subId: "Health" },
      ]
    },
    {
      name: "Jewellery",
      id: "Jewellery",
      submenu: [
        { name: "Gold", subId: "Gold" },
        { name: "Silver", subId: "Silver" },
        { name: "Men", subId: "Men" },
        { name: "Women", subId: "Women" },
      ]
    }
  ];

  return (
    <nav className='py-2 shadow-md shadow-gray-400/40 bg-white relative'>
      <div className="container flex items-center justify-between md:justify-end gap-4">

        {/* Mobile Menu Button */}
        <div className="md:hidden p-2">
          <RiMenu2Fill
            className="text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Nav Items Container */}
        <div className={`col2 md:w-[75%] w-full absolute md:static top-full left-0 bg-white md:bg-transparent shadow-md md:shadow-none z-50 transition-all duration-300 ${open ? "block" : "hidden md:block"}`}>
          <ul className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8 p-4 md:p-0'>
            {navItems.map((item, index) => (
              <li key={index} className='relative group list-none w-full md:w-auto border-b md:border-none border-gray-100 last:border-none'>
                
                {/* Main Link Header */}
                <div 
                  className='link nav-link cursor-pointer flex items-center justify-between py-2 md:py-0'
                  onClick={() => toggleSubmenu(index)} // Handle mobile click
                >
                  <h3 className="font-semibold text-gray-800 md:font-normal">{item.name}</h3>
                  {item.submenu && (
                    <span className="md:hidden">
                      {mobileSubmenu === index ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  )}
                </div>

                {/* Submenu Logic */}
                {item.submenu && (
                  <ul className={`
                    md:absolute left-0 top-[110%] bg-white md:bg-white/95 backdrop-blur-md md:shadow-xl rounded-xl min-w-45 py-2 md:py-3 z-50 md:border border-gray-100 transition-all
                    ${mobileSubmenu === index ? "block" : "hidden md:group-hover:block"}
                  `}>
                    {item.submenu.map((sub, i) => (
                      <li key={i}>
                        <Link
                          to={`/category/${item.id}/${sub.subId}`}
                          className="block px-5 py-2 text-md font-semibold text-gray-600 md:text-gray-900 hover:text-[#ef7e21] hover:bg-gray-50 rounded-md"
                          onClick={() => setOpen(false)} // Close main menu when a sublink is clicked
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Text */}
        <div className="col3 hidden md:flex w-[20%]">
          <p className='font-semibold flex items-center justify-center gap-2 text-sm lg:text-base'>
            <IoRocketOutline className="text-xl" />
            <span className="whitespace-nowrap">Free Delivery within 40km</span>
          </p>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;