import Rating from '@mui/material/Rating'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineZoomInMap } from "react-icons/md";
import ActionIcon from "../Common/ActionIcon";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";



const ProductItem = ({ items }) => {

  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 w-full " >
      {
        items.map((item) => (
          <div className="productCard border-2 relative rounded-2xl group overflow-hidden w-full h-full"
            key={item._id}>

            <div className="productCardimg">

              <Link to={"#"}>
                <div className="img relative w-full h-60 overflow-hidden">

                  {item.img && (
                    <img src={item.img} alt={item.title} />
                  )}

                  {item.alternateimg && (
                    <img
                      src={item.alternateimg}
                      alt="alternate-img"
                      className="absolute top-0 left-0 transition opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                  )}

                </div>
              </Link>

            </div>

            <span className='absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-xl'>{item.discount} </span>

            <div className="actions absolute top-3 right-2 flex flex-col items-center gap-2
                  opacity-0 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">


              <ActionIcon title="Wishlist" Icon={FaRegHeart} />
              <ActionIcon title="Compare" Icon={IoGitCompare} />
              <ActionIcon title="Zoom View" Icon={MdOutlineZoomInMap} />
              <ActionIcon title="Add to Cart" Icon={FaShoppingCart} onClick={() => addToCart(item)} />


            </div>

            <div className="productCardtext p-3 flex flex-col gap-1">
              <h4 className='text-sm font-semibold'>{item.category}</h4>
              <h3 className="text-sm text-gray-600">{item.title}</h3>

              <Rating defaultValue={4} size="small" />

              <div className="productCardPrice flex gap-3">
                <p className='oldPrice line-through'>{item.oldPrice}</p>
                <p className='newPrice text-pink-700'>{item.newPrice} </p>
              </div>
            </div>


          </div>
        ))
      }
    </div>

  )
}

export default ProductItem
