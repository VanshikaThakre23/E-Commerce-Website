import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiShare2, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItem);

    const handleDelete = async(id)=>{
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove thhis item?",
      icon: "warning",
      dangerMode: true,
      buttons:true,
    });

    if (!willDelete) {
      return;
    }else{
    dispatch(removeFromWishlist(id))
    
      toast.success("Item removed successfully!")

  }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-sm text-gray-500">{wishlist?.length || 0} Items Saved</p>
      </div>

      {!wishlist || wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border">
          <p className="text-gray-400 mb-4">Your wishlist is empty</p>
          <Link to="/" className="bg-[#ec8e37] text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition">
            Explore Products
          </Link>
        </div>
      ) : (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Link to={`/products/${item._id}`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform"
                    />
                   </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-red-50 text-red-500 rounded-full shadow-sm"
                    >
                      <RiDeleteBin6Line size={18} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-700 truncate mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-gray-900">Rs {item.newPrice}</span>
                      {item.prevPrice && (
                        <span className="text-xs text-gray-400 line-through">Rs {item.prevPrice}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          dispatch(addToCart(item))
                        }
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                        <FiShoppingCart size={16} /> Add to Cart
                      </button>
                      <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        <FiShare2 size={18} />
                      </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>

          {/* Checkout Footer */}
          <div className="mt-12 flex justify-center">
            <Link to="/productlisting" className="w-full max-w-xs">
              <button className="w-full text-black font-bold py-3 rounded-xl border-2 border-gray-400 transition-all transform hover:-translate-y-1  underline">
                Add More Items
              </button>
            </Link>
          </div>
       
    </>
  )
}
    </div >
  );
};

export default WishlistPage;