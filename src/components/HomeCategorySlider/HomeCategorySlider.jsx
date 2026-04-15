import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const categorySlider = [
  { id: 1, img: "/images/cat-1.jpg", title: "Smart Tablet" },
  { id: 2, img: "/images/cat-2.jpg", title: "T-Shirt" },
  { id: 3, img: "/images/cat-3.jpg", title: "Leather Watch" },
  { id: 4, img: "/images/cat-4.jpg", title: "Jewellary" },
  { id: 5, img: "/images/cat-5.jpg", title: "Furniture" },
  { id: 6, img: "/images/cat-6.jpg", title: "Sneaker Shoes" },
  { id: 7, img: "/images/cat-7.jpg", title: "Bags" },
  { id: 8, img: "/images/cat-8.jpg", title: "Gaming" },
]

const HomeCategorySlider = () => {
  return (
    <div className="homecatslider px-4"> 
      <Swiper
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 30 },
          1280: { slidesPerView: 7, spaceBetween: 30 },
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className='mySwiper pb-10'
      >
        {categorySlider.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={"/productlisting"} >
             
              <div className='relative w-full aspect-square bg-white rounded-2xl text-center flex items-center justify-between flex-col shadow-sm border border-gray-100 overflow-hidden'>
                <img src={item.img} alt={item.title} className="w-[70%] mt-4 object-contain" />
                <h3 className='font-semibold text-[13px] md:text-[15px] mb-4'>{item.title}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeCategorySlider;