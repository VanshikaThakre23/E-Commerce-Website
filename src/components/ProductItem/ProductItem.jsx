import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import ActionIcon from "../Common/ActionIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProductItem = ({ items = [] }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);



  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-900 text-lg font-medium">Products Coming Soon...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-4 md:gap-6 lg:gap-8 mt-4 md:mt-10 bg-gray-100 sm:bg-transparent">
      {items.map((item) => (
        <div key={item._id} className="productCard relative bg-white flex flex-col h-full border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden ">
          
          {/* 1. IMAGE SECTION */}
          <div className="relative w-full aspect-3/4 sm:aspect-square bg-gray-100 overflow-hidden">
            <Link to={`/products/${item._id}`} className="block w-full h-full">
              <Swiper
                slidesPerView={1}
                loop={!!(item.img && item.alternateimg)}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full h-full"
              >
                {item.img && (
                  <SwiperSlide>
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </SwiperSlide>
                )}
                {item.alternateimg && (
                  <SwiperSlide>
                    <img src={item.alternateimg} alt={item.title} className="w-full h-full object-cover" />
                  </SwiperSlide>
                )}
              </Swiper>
            </Link>

            {/* MOBILE ONLY ICONS (Floating over image) */}
            {user?.role !== "admin" && (
              <div className="md:hidden absolute bottom-2 right-2 flex flex-col gap-2 z-10 scale-90">
                <div className="bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center">
                  <ActionIcon type="wishlist" item={item} />
                </div>
                <div className="bg-white shadow-lg rounded-full w-8 h-8 flex items-center justify-center">
                  <ActionIcon type="cart" item={item} />
                </div>
              </div>
            )}
          </div>

          {/* 2. TEXT & DESKTOP ICON SECTION */}
          <div className="p-2 sm:p-3 flex flex-row grow bg-white items-end">
            
            {/* Left Side: Details */}
            <div className="flex flex-col grow">
              <h3 className="text-[12px] sm:text-[13px] font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mb-1">
                {item.category?.[0]}
              </p>
              <div className="flex items-center mb-2">
                <Rating value={item.rating || 5} size="small" readOnly />
                <span className="text-[10px] text-gray-400 ml-1">(4.5)</span>
              </div>
              <div className="mt-auto flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-gray-900">₹{item.newPrice}</span>
                {item.oldPrice && (
                  <span className="line-through text-[10px] sm:text-xs text-gray-400">₹{item.oldPrice}</span>
                )}
              </div>
            </div>

            {/* Right Side: Desktop Icons (Only visible on MD screens and up) */}
            {user?.role !== "admin" && (
              <div className="hidden md:flex flex-col gap-2 ml-2 pb-1">
                <ActionIcon type="wishlist" item={item} />
                <ActionIcon type="cart" item={item} />
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductItem;