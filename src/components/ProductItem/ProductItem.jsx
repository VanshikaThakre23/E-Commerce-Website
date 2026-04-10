import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";

import ActionIcon from "../Common/ActionIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // ✅ Import pagination CSS
import { Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

const ProductItem = ({ items = [] }) => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user)


  if(!user){
    navigate('/login');
  }

  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-900 text-lg">Products Comingg Sooooon....</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-10 w-full justify-items-center">
      {items.map((item) => (
        <div
          key={item._id}
          className="productCard border rounded-2xl relative group overflow-hidden w-full max-w-60"
        >
          {/* IMAGE */}
          <Link to={`/products/${item._id}`}>
            <div className="w-full h-60 bg-white">
              <Swiper
                slidesPerView={1}
                loop={!!(item.img && item.alternateimg)} // ✅ Only loop if both images exist
                pagination={{ clickable: true }}
                modules={[Pagination]}
              >
                {item.img && (
                  <SwiperSlide>
                    <img
                      src={item.img}
                      alt={item.title || "Product"}
                      className="w-full h-60 object-cover"
                    />
                  </SwiperSlide>
                )}
                {item.alternateimg && (
                  <SwiperSlide>
                    <img
                      src={item.alternateimg}
                      alt={`${item.title} alternate` || "Product alternate"}
                      className="w-full h-60 object-cover"
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </Link>

          {user.role !== "admin" &&
            (
              <div className="absolute bottom-1 right-2 flex flex-col-reverse gap-3 items-center">
                <ActionIcon type="cart" item={item} />
                <ActionIcon type="wishlist" item={item} />
              </div>
            )
          }

          {/* DETAILS */}
          <div className="p-3 flex flex-col gap-1">
            <h3 className="text-md font-semibold uppercase truncate">
              {item.title}
            </h3>


            <h4 className="text-xs text-gray-500 truncate">
              {[
                ...(item.category || []),
                ...(item.subCategory || [])
              ].filter(Boolean).join(", ")}
            </h4>

            {/* ✅ FIX: Use item.rating with fallback */}
            <Rating
              value={item.rating || 5}
              size="small"


            />

            <div className="flex gap-3 items-center">
              <p className="line-through text-gray-500 text-sm">
                Rs.{item.oldPrice}
              </p>

              <p className="text-pink-600 font-semibold text-lg">
                Rs.{item.newPrice}
              </p>
            </div>

            {/* ✅ FIX: Only show discount if it exists */}
            {item.discount && (
              <span className="text-sm text-green-600 font-medium">
                {item.discount}% OFF
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;