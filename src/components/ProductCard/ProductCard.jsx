import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ActionIcon from "../Common/ActionIcon";
import { useSelector } from "react-redux";

const ProductCard = ({ item }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="
  ProductCard relative bg-white flex flex-col h-full rounded-xl md:rounded-2xl   border border-gray-200 md:border-2
  overflow-hidden  m-px">

      {/* IMAGE SECTION */}
      <div className="
        relative overflow-hidden w-full bg-gray-100
        aspect-square md:h-72
      ">
        <Link to={`/products/${item._id}`} className="block w-full h-full">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
        
        {/* MOBILE ICONS - Overlaying the image to save space */}
        {user?.role !== "admin" && (
          <div className="md:hidden absolute bottom-2 right-2 flex gap-1 z-10">
            <div className="bg-white/80 rounded-full p-0.5 shadow-sm">
               <ActionIcon type="cart" item={item} />
            </div>
            <div className="bg-white/80 rounded-full p-0.5 shadow-sm">
               <ActionIcon type="wishlist" item={item} />
            </div>
          </div>
        )}
      </div>

      {/* DISCOUNT TAG */}
      {item.discount && (
        <span className="
          absolute top-0 left-0 
          bg-red-500 text-white 
          px-2 py-1 text-[10px] md:text-sm 
          rounded-br-xl font-bold z-10
        ">
          {item.discount}%
        </span>
      )}

      {/* TEXT & DESKTOP ICON SECTION */}
      <div className="p-2 md:p-3 flex flex-row grow items-end">
        
        {/* Left Side: Product Info */}
        <div className="flex flex-col gap-0.5 md:gap-1 grow">
          <h4 className="text-[9px] md:text-xs font-semibold text-gray-400 uppercase">
            {item.category}
          </h4>

          <h3 className="text-[11px] md:text-sm text-gray-600 font-medium line-clamp-1">
            {item.title}
          </h3>

          <Rating
            defaultValue={4}
            size="small"
            readOnly
            className="scale-75 md:scale-100 origin-left"
          />

          <div className="flex flex-wrap items-center gap-1 md:gap-3 mt-1">
            <p className="line-through text-gray-400 text-[10px] md:text-sm">
              ₹{item.oldPrice}
            </p>
            <p className="text-pink-700 font-bold text-[12px] md:text-base">
              ₹{item.newPrice}
            </p>
          </div>
        </div>

        {/* Right Side: Desktop Icons (Hidden on mobile) */}
        {user?.role !== "admin" && (
          <div className="hidden md:flex flex-col gap-2 ml-2">
            <ActionIcon type="wishlist" item={item} />
            <ActionIcon type="cart" item={item} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;