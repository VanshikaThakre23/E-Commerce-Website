import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Navigation = () => {

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
    <>
      <nav className='py-2 shadow-md shadow-gray-400/40'>
        <div className="container flex items-center justify-end gap-8">

          <div className="col1 w-[10%]">

          </div>

          <div className="col2 w-[75%]">
            <ul className='flex items-center gap-8'>
              {navItems.map((item, index) => (
                <li key={index} className=' relative  group list-none'>
                  <h3 className='link nav-link'> {item.name}</h3>



                  {/* submenu */}
                  {item.submenu && (
                    <ul className="absolute left-0 top-[110%] hidden group-hover:block bg-white/95 backdrop-blur-md shadow-xl rounded-xl min-w-45 py-3 z-50 border border-gray-100 transition-all duration-200">
                      {item.submenu.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={`/category/${item.id}/${sub.subId}`}
                            className="block px-5 py-2 text-md font font-semibold text-gray-900 hover:text-[#ef7e21] hover:bg-gray-50 rounded-md transition-all duration-150"
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

          <div className="col3 w-[20%]">
            <p className='font-semibold flex items-center justify-center gap-2'>
              <IoRocketOutline className="text-xl" />
              Free Delivery within 40km
            </p>
          </div>

        </div>
      </nav>


    </>
  );
};

export default Navigation;
