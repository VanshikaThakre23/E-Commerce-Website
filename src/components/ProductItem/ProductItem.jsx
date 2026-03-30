import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

import ActionIcon from "../Common/ActionIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const ProductItem = ({ items = [] }) => {
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
              <Swiper slidesPerView={1} loop pagination modules={[Pagination]}>
                {item.img && (
                  <SwiperSlide>
                    <img src={item.img} className="w-full h-60 object-cover" />
                  </SwiperSlide>
                )}
                {item.alternateimg && (
                  <SwiperSlide>
                    <img src={item.alternateimg} className="w-full h-60 object-cover" />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </Link>

          {/* ACTION ICONS ✅ */}
          <div className="absolute bottom-1 right-2 flex flex-col-reverse gap-3 items-center">
            <ActionIcon type="cart" item={item} />
            <ActionIcon type="wishlist" item={item} />
          </div>

          {/* DETAILS */}
          <div className="p-3 flex flex-col gap-1">
            <h3 className="text-md font-semibold uppercase">
              {item.title}
            </h3>

            <h4 className="text-xs text-gray-500">
              {item.category?.join(", ")}
            </h4>

            <Rating defaultValue={4} size="small" readOnly />

            <div className="flex gap-3">
              <p className="line-through text-gray-800">
                Rs.{item.oldPrice}
              </p>

              <p className="text-pink-600 font-semibold">
                Rs.{item.newPrice}
              </p>
            </div>

            <span className="text-md text-green-600">
              {item.discount}% discount
            </span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductItem;