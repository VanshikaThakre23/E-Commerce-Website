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
    id: "fashion",
    submenu: [
      { name: "Men", subId: "men" },
      { name: "Women", subId: "women" },
      { name: "Kids", subId: "kids" },
    ]
  },

  {
    name: "Appliances",
    id: "appliances",
    submenu: [
      { name: "Kitchen", subId: "kitchen" },
      { name: "Home", subId: "home" },
    ]
  },

  {
    name: "Bags",
    id: "bags",
    submenu: [
      { name: "Office Bag", subId: "office" },
      { name: "Travel Bag", subId: "travel" },
      { name: "School Bag", subId: "school" },
    ]
  },

  {
    name: "Footwear",
    id: "footwear",
    submenu: [
      { name: "Women", subId: "women" },
      { name: "Men", subId: "men" },
      { name: "Kids", subId: "kids" },
    ]
  },

  {
    name: "Groceries",
    id: "groceries",
    submenu: [
      { name: "Daily Needs", subId: "daily" },
      { name: "Essentials", subId: "essentials" },
    ]
  },

  {
    name: "Beauty",
    id: "beauty",
    submenu: [
      { name: "Skincare", subId: "skincare" },
      { name: "Makeup", subId: "makeup" },
    ]
  },

  {
    name: "Wellness",
    id: "wellness",
    submenu: [
      { name: "Fitness", subId: "fitness" },
      { name: "Health", subId: "health" },
    ]
  },

  {
    name: "Jewellery",
    id: "jewellery",
    submenu: [
      { name: "Gold", subId: "gold" },
      { name: "Silver", subId: "silver" },
    ]
  }
];

  const [openCategory, setOpenCategory] = useState(false);

  return (
    <>
      <nav className='py-2 shadow-md shadow-gray-400/40'>
        <div className="container flex items-center justify-end gap-8">

          <div className="col1 w-[20%]">
            {/* <Button
              className='text-black! gap-3 w-full'
              onClick={() => setOpenCategory(true)}
            >
              <RiMenu2Fill className='text-xl' />
              Shop By Categories
              <FaAngleDown className='text-xl ml-auto' />
            </Button> */}
          </div>

          <div className="col2 w-[65%]">
            <ul className='flex items-center gap-6'>
              {navItems.map((item, index) => (
                <li key={index} className=' relative  group list-none'>

                  <Link to={item.path ? item.path : `/category/${item.id}`} className='link nav-link'>
                    {item.name}
                  </Link>

                  {/* submenu */}
                  {item.submenu && (
                    <ul className='absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md min-w-30 py-2 z-50'>
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          <Link to={`/category/${item.id}/${subitem.subId}`}
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
