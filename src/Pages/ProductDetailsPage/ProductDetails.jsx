import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Necessary fix for the "Go Back" button
    const [product, setProduct] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!product) return <div className="h-screen flex products-center justify-center font-mono text-sm tracking-widest uppercase">Loading...</div>

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Minimalist Back Navigation */}
                <button
                    onClick={() => navigate("/")}
                    className="group mb-12 flex products-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-transparent hover:border-black transition-all pb-1"
                >
                    <span className="text-lg"><FaArrowLeft /></span> Go Back
                </button>

                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Image Section - Frameless & Elegant */}
                    {/* <div className="lg:w-3/5 bg-[#f9f9f9] flex justify-center products-center p-12 min-h-125">
                        <img
                            src={product.img}
                            alt={product.title}
                            className="w-full max-w-md object-contain mix-blend-multiply"
                        />
                    </div> */}

                    <div className="lg:w-3/5 bg-[#f9f9f9] flex justify-center products-center p-12 min-h-125">
                        
                            <Swiper
                                slidesPerView={1}
                                loop={true}
                                grabCursor={true}
                                pagination={true}
                                modules={[Pagination]}
                            >

                                {product.img && (
                                    <SwiperSlide>
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="w-full h-auto "
                                        />
                                    </SwiperSlide>
                                )}

                                {product.alternateimg && (
                                    <SwiperSlide>
                                        <img
                                            src={product.alternateimg}
                                            alt="alternate"
                                            className="w-full h-auto "
                                        />
                                    </SwiperSlide>
                                )}

                            </Swiper>
                       
                    </div>





                    {/* Info Section - Clean & Structured */}
                    <div className="lg:w-2/5 flex flex-col">
                        <header className="mb-10">
                            <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-400 mb-4 font-semibold">
                                {product.category}
                            </p>
                            <h1 className="text-2xl md:text-2xl font-medium tracking-tight mb-6">
                                {product.title}
                            </h1>
                            <div className="flex products-center gap-6">
                                <span className="text-3xl font-light">Rs. {product.newPrice}</span>
                                <span className="text-lg text-zinc-300 line-through">Rs. {product.oldPrice}</span>
                                <span className="text-[10px] font-bold border border-zinc-900 px-2 py-0.5 tracking-tighter">
                                    {product.discount}% OFF
                                </span>
                            </div>
                        </header>

                        {/* Description Placeholder (Optional but helps look) */}
                        <div className="mb-10">
                            <p className="text-sm leading-relaxed text-zinc-600 max-w-md">
                                Experience premium craftsmanship and timeless design. This piece is curated for those who value both style and functionality in their daily essentials.
                            </p>
                        </div>

                        {/* Action Buttons - High Contrast */}
                        <div className="space-y-4">
                            <button className="w-full bg-[#f3842a] text-white py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#bc5806] hover:cursor-pointer transition-colors active:scale-[0.99]">
                                Add to  Cart
                            </button>
                            <button className="w-full bg-transparent border border-zinc-200 text-zinc-900 py-5 text-xs uppercase font-bold hover:border-zinc-900 hover:cursor-pointer transition-colors">
                                Add to Wishlist
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductDetails;