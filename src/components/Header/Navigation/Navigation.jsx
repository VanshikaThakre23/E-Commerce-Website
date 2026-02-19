import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';

const Navigation = () => {

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Fashion",
      submenu: [
        { name: "Men", path: "/fashion" },
        { name: "Women", path: "/fashion" },
        { name: "Kids", path: "/fashion" },
      ]
    },

    {
      name: "Appliances",
      submenu: [
        { name: "Kitchen", path: "/appliances" },
        { name: "Home", path: "/appliances" },
      ]
    },

    {
      name: "Bags",
      submenu: [
        { name: "OfficeBag", path: "/bags" },
        { name: "travelBag", path: "/bags" },
        { name: "schoolBag", path: "/bags" },
      ]

    },

    {
      name: "Footwear",
      submenu: [
        { name: "women", path: "/bags" },
        { name: "men", path: "/bags" },
        { name: "kids", path: "/bags" },
      ]

    },

    {
      name: "Groceries",
      submenu: [
        { name: "OfficeBag", path: "/groceries" },
        { name: "travelBag", path: "/groceries" },
        { name: "schoolBag", path: "/groceries" },
      ]

    },

    {
      name: "Beauty",
      submenu: [
        { name: "OfficeBag", path: "/groceries" },
        { name: "travelBag", path: "/groceries" },
        { name: "schoolBag", path: "/groceries" },
      ]

    },

    {
      name: "Wellness",
      submenu: [
        { name: "OfficeBag", path: "/groceries" },
        { name: "travelBag", path: "/groceries" },
        { name: "schoolBag", path: "/groceries" },
      ]

    },

    {
      name: "Jewellary",
      submenu: [
        { name: "OfficeBag", path: "/groceries" },
        { name: "travelBag", path: "/groceries" },
        { name: "schoolBag", path: "/groceries" },
      ]

    },


  ]

  const [openCategory, setOpenCategory] = useState(false);

  return (
    <>
      <nav className='py-2'>
        <div className="container flex items-center justify-end gap-8">

          <div className="col1 w-[20%]">
            <Button
              className='text-black! gap-3 w-full'
              onClick={() => setOpenCategory(true)}
            >
              <RiMenu2Fill className='text-xl' />
              Shop By Categories
              <FaAngleDown className='text-xl ml-auto' />
            </Button>
          </div>

          <div className="col2 w-[65%]">
            <ul className='flex items-center gap-6'>
              {navItems.map((item, index) => (
                <li key={index} className=' relative  group list-none'>

                  <Link to={item.path || "#"} className='link nav-link'>
                    {item.name}
                  </Link>

                  {/* submenu */}
                  {item.submenu && (
                    <ul className='absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md min-w-30 py-2 z-50'>
                      {item.submenu.map((subitem,subindex)=>(
                        <li key={subindex}>
                          <Link to={subitem.path}
                          className='block px-4 py-2 hover:bg-gray-100 text-black  font-sans'>
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul>
                    
                  </ul>


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

      <CategoryPanel
        open={openCategory}
        setOpen={setOpenCategory}
      />
    </>
  );
};

export default Navigation;
