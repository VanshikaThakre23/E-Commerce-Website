import Tooltip from "@mui/material/Tooltip";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import {addToWishlist,removeFromWishlist,} from "../../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { addToCartAPI } from "../../features/cart/cartActions";

const ActionIcon = ({ type, item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart?.cartItem || []);
  const wishlist = useSelector((state) => state.wishlist?.wishlistItem || []);

  const inWishlist = wishlist.find((i) => i._id === item._id);
  const inCart = cart.find((i) => i._id === item._id);


  const handleAuth = (callback) => {
    if (!user) {
      toast.info("You need to login first");
      navigate("/login");
      return;
    }
    callback();
  };

  // 🎯 Decide icon + action based on type
  let Icon, title, onClick, color;

  if (type === "cart") {
    Icon = FaShoppingCart;
    // title = "Cart";
     color = inCart ? "green" : "black";
    onClick = () =>
      handleAuth(() => {
        if (inCart) {
          dispatch(removeFromCart(item._id));
          toast.info("Removed from Cart");
        } else {
          dispatch(addToCartAPI(item));
          toast.success("Added to Cart");
        }
      });
  }

  if (type === "wishlist") {
    Icon = inWishlist ? FaHeart : FaRegHeart;
    // title = "Wishlist";
    color = inWishlist ? "red" : "black";

    onClick = () =>
      handleAuth(() => {
        if (inWishlist) {
          dispatch(removeFromWishlist(item._id));
          toast.info("Removed from wishlist");
        } else {
          dispatch(addToWishlist(item));
          toast.success("Added to wishlist");
        }
      });
  }

  return (
    <Tooltip title={title}>
      <div
        onClick={onClick}
        className="w-8 h-8 flex items-center justify-center
        rounded-full border-2 border-gray-200 bg-white cursor-pointer
        transition-all duration-100 ease-in-out
        hover:scale-110 hover:border-gray-400 hover:shadow-lg"
      >
        <Icon size={20} color={color} />
      </div>
    </Tooltip>
  );
};

export default ActionIcon;