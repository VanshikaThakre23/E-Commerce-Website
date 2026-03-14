import Rating from "@mui/material/Rating";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineZoomInMap } from "react-icons/md";

import ActionIcon from "../Common/ActionIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { CartContext } from "../../context/CartContext";

const ProductItem = ({ items = [] }) => {

  const { addToCart } = useContext(CartContext);

  return (

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 w-full">

      {items.map((item) => (

        <div
          key={item._id}
          className="productCard border rounded-2xl relative group overflow-hidden w-60"
        >

          {/* product ki Img ka slider */}
          <div className="relative">

            <Link to="#">


              <div className="w-full h-60 overflow-hidden rounded-2xl bg-white">

                <Swiper
                  slidesPerView={1}
                  loop={true}
                  grabCursor={true}
                >

                  {item.img && (
                    <SwiperSlide>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-60 object-cover"
                      />
                    </SwiperSlide>
                  )}

                  {item.alternateimg && (
                    <SwiperSlide>
                      <img
                        src={item.alternateimg}
                        alt="alternate"
                        className="w-full h-60 object-cover"
                      />
                    </SwiperSlide>
                  )}

                </Swiper>

              </div>
            </Link>

          </div>
       {/* <div className="h-2 w-full bg-linear-to-b from-gray-400 to-transparent blur-sm"></div> */}


          {/* ACTION ICONS */}
          <div
            className="absolute top-3 right-2 flex flex-col gap-2 items-center
            opacity-0 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-1
            transition-all duration-300 z-20"
          >

            <ActionIcon title="Wishlist" Icon={FaRegHeart} />

            <ActionIcon title="Compare" Icon={IoGitCompare} />

            <ActionIcon title="Quick View" Icon={MdOutlineZoomInMap} />

            <ActionIcon
              title="Add to Cart"
              Icon={FaShoppingCart}
              onClick={() => addToCart(item)}
            />

          </div>


          {/* PRODUCT DETAILS */}
          <div className="p-3 flex flex-col gap-1 bg-blue-50">

            <h3 className="text-md font-semibold">
              {item.title}
            </h3>

            <h4 className="text-xs text-gray-500">
              {item.category}
            </h4>

            <Rating defaultValue={4} size="small" readOnly />

            <div className="flex gap-3">

              <p className="line-through text-gray-400">
                {item.oldPrice}
              </p>

              <p className="text-pink-600 font-semibold">
                {item.newPrice}
              </p>

            </div>

            <span className="text-xs text-green-600">
              {item.discount} discount
            </span>

          </div>

        </div>

      ))}

    </div>

  );
};

export default ProductItem;