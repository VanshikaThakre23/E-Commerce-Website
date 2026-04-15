import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ActionIcon from "../Common/ActionIcon";
import { useSelector } from "react-redux";

const ProductCard = ({ item }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="
      ProductCard 
      border-2 relative rounded-2xl group overflow-hidden 
      bg-white flex flex-col
      h-full
    ">

      {/* IMAGE */}
      <div className="
        relative overflow-hidden w-full bg-gray-100
        aspect-4/5 sm:aspect-square md:aspect-auto md:h-72
      ">
        <Link to={`/products/${item._id}`} className="block w-full h-full">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* ACTION ICONS */}
      {user?.role !== "admin" && (
        <div className="
          absolute bottom-1 right-1 sm:bottom-1 sm:right-2 
          flex gap-1 md:gap-2 z-10
        ">
          <ActionIcon type="cart" item={item} />
          <ActionIcon type="wishlist" item={item} />
        </div>
      )}

      {/* DISCOUNT */}
      {item.discount && (
        <span className="
          absolute top-0 left-0 
          bg-red-500 text-white 
          p-1 md:p-2 text-[10px] md:text-sm 
          rounded-br-xl font-bold
        ">
          {item.discount}%
        </span>
      )}

      {/* TEXT */}
      <div className="p-2 md:p-3 flex flex-col gap-0.5 md:gap-1">
        <h4 className="text-[10px] md:text-sm font-semibold text-gray-400 uppercase">
          {item.category}
        </h4>

        <h3 className="text-[12px] md:text-sm text-gray-600 font-medium line-clamp-1">
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
            Rs. {item.oldPrice}
          </p>

          <p className="text-pink-700 font-semibold text-[13px] md:text-base">
            Rs. {item.newPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;