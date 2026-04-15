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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-900 text-lg font-medium">Products Coming Soon...</p>
      </div>
    );
  }

  return (
    <div className="
      grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5
      gap-1 sm:gap-4 md:gap-6 lg:gap-8
      mt-4 md:mt-10
      bg-gray-100 sm:bg-transparent 
    ">

      {items.map((item) => (
        <div
          key={item._id}
        className="
  productCard relative bg-white flex flex-col h-full
  border border-gray-200 sm:border-gray-200
  rounded-xl sm:rounded-2xl
  overflow-hidden
"
        >

          {/* IMAGE */}
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
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                )}

                {item.alternateimg && (
                  <SwiperSlide>
                    <img
                      src={item.alternateimg}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                )}

              </Swiper>
            </Link>

            {/* ICONS - MOBILE SMALLER */}
            {user?.role !== "admin" && (
              <div className="
                absolute bottom-2 right-2 sm:bottom-3 sm:right-2
                flex flex-col gap-2 z-10
                scale-90 sm:scale-100
              ">
                <div className="bg-white shadow-lg rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <ActionIcon type="wishlist" item={item} />
                </div>

                <div className="bg-white shadow-lg rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <ActionIcon type="cart" item={item} />
                </div>
              </div>
            )}

            {/* DISCOUNT
            {item.discount && (
              <div className="
                absolute top-2 left-2 z-10
                bg-pink-600 text-white
                text-[10px] font-bold px-2 py-0.5
              ">
                {item.discount}% OFF
              </div>
            )} */}
          </div>

         
          <div className="p-2 sm:p-3 flex flex-col grow bg-white">

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
              <span className="text-sm sm:text-base font-bold text-gray-900">
                ₹{item.newPrice}
              </span>

              {item.oldPrice && (
                <span className="line-through text-[10px] sm:text-xs text-gray-400">
                  ₹{item.oldPrice}
                </span>
              )}
            </div>

          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductItem;