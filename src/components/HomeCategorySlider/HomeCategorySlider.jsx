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
    <>
      <div className="homecatslider">

        <Swiper
          // slidesPerView={7}

          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 },
          }}


          spaceBetween={30}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          autoplay={{

            delay: 8000,
            disableOnInteraction: true
          }}

          modules={[Navigation, Pagination, Autoplay]}
          className='mySwiper'
        >

          {
            categorySlider.map((item) => (

              <SwiperSlide key={item.id}>
                <Link to={"/"} >
                  <div className='relative w-45 h-45  bg-white rounded-2xl text-center flex items-center justify-between flex-col '>
                    <img src={item.img} alt="" className="w-40  rounded-2xl mt-2" />

                    <h3 className='link absolute font-semibold text-[15px]  bottom-7'>{item.title}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      

    </>
  )
}

export default HomeCategorySlider
