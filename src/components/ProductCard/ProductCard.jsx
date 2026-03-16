import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import ActionIcon from "../Common/ActionIcon";



const ProductCard = ({ item, actions = [] }) => {
  return (
    <div className="productCard border-2 relative rounded-2xl group overflow-hidden h-100">

      {/* Image Section */}
      <div className="productCardimg relative overflow-hidden w-full h-72 bg-gray-100">
        <Link to={`/products/${item._id}`} className="block w-full h-full">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      {
        actions.length > 0 && (
          <div className="absolute top-3 right-2 flex flex-col items-center gap-2
                  opacity-0 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">

            {
              actions.map((action, index) => (
                <ActionIcon
                  key={index}
                  title={action.title}
                  Icon={action.Icon}
                  onClick={action.onClick}
                ></ActionIcon>
              ))
            }

          </div>
        )
      }


      {/* Discount Badge */}
      {item.discount && (
        <span className="absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-xl">
          {item.discount}
        </span>
      )}

      {/* Text Section */}
      <div className="productCardtext p-3 flex flex-col gap-1">
        <h4 className="text-sm font-semibold">{item.category}</h4>
        <h3 className="text-sm text-gray-600">{item.title}</h3>

        <Rating defaultValue={4} size="small" readOnly />

        <div className="flex gap-3">
          <p className="line-through text-gray-400">
            Rs .{item.oldPrice}
          </p>
          <p className="text-pink-700 font-semibold">
            Rs. {item.newPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;