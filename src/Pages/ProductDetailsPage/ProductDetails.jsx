import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCartAPI } from '../../features/cart/cartActions';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleAddtoCart = (product) => {
        dispatch(addToCartAPI(product));
        toast.success(" Added to Cart");
    };

    const handleAddtoWishlist = (product) => {
        dispatch(addToWishlist(product));
        toast.success("Added to Wishlist");
    };

    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!product)
        return (
            <div className="h-screen flex items-center justify-center font-mono text-sm tracking-widest uppercase">
                Loading...
            </div>
        );

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate("/")}
                    className="group mb-8 sm:mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-transparent hover:border-black transition-all pb-1"
                >
                    <span className="text-lg"><FaArrowLeft /></span> Go Back
                </button>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* IMAGE SECTION */}
                    <div className="lg:w-3/5 bg-[#f9f9f9] flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-[300px] sm:min-h-[450px] lg:min-h-125">

                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            grabCursor={true}
                            pagination={true}
                            modules={[Pagination]}
                            className="w-full"
                        >

                            {product.img && (
                                <SwiperSlide>
                                    <img
                                        src={product.img}
                                        alt={product.title}
                                        className="w-full h-[250px] sm:h-[350px] lg:h-auto object-contain"
                                    />
                                </SwiperSlide>
                            )}

                            {product.alternateimg && (
                                <SwiperSlide>
                                    <img
                                        src={product.alternateimg}
                                        alt="alternate"
                                        className="w-full h-[250px] sm:h-[350px] lg:h-auto object-contain"
                                    />
                                </SwiperSlide>
                            )}

                        </Swiper>

                    </div>

                    {/* DETAILS */}
                    <div className="lg:w-2/5 flex flex-col">

                        <header className="mb-8 sm:mb-10">

                            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-zinc-400 mb-3 sm:mb-4 font-semibold">
                                {product.category}
                            </p>

                            <h1 className="text-xl sm:text-2xl font-medium tracking-tight mb-4 sm:mb-6">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                                <span className="text-2xl sm:text-3xl font-light">
                                    Rs. {product.newPrice}
                                </span>

                                <span className="text-base sm:text-lg text-zinc-300 line-through">
                                    Rs. {product.oldPrice}
                                </span>

                                <span className="text-[10px] font-bold border border-zinc-900 px-2 py-0.5 tracking-tighter">
                                    {product.discount}% OFF
                                </span>
                            </div>

                        </header>

                        <div className="mb-8 sm:mb-10">
                            <p className="text-sm leading-relaxed text-zinc-600 max-w-md">
                                Experience premium craftsmanship and timeless design. This piece is curated for those who value both style and functionality in their daily essentials.
                            </p>
                        </div>

                        {user.role !== "admin" && (
                            <div className="space-y-3 sm:space-y-4">

                                <button
                                    onClick={() => handleAddtoCart(product)}
                                    className="w-full bg-[#f3842a] text-white py-4 sm:py-5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#bc5806] transition-colors active:scale-[0.99]"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => handleAddtoWishlist(product)}
                                    className="w-full bg-transparent border border-zinc-200 text-zinc-900 py-4 sm:py-5 text-[10px] sm:text-xs uppercase font-bold hover:border-zinc-900 transition-colors"
                                >
                                    Add to Wishlist
                                </button>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;