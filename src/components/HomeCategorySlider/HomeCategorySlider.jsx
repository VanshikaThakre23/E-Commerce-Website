import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const HomeCategorySlider = () => {
  return (
    <>
      <div className="homecatslider">
        <div className="container">
          <Swiper
            slidesPerView={7}
            spaceBetween={30}
            navigation={true}

            modules={[Navigation]}
            className='mySwiper'
          >

            <SwiperSlide>
              <Link to={"/"} >
                <div className='item p-3 bg-white rounded-2xl text-center flex items-center justify-center flex-col'>
                  <img src="/images/cat-1.jpg" alt="" className="w-20" />

                  <h3>Smart TabletSmart Tablet</h3>
                </div>
              </Link>
            </SwiperSlide>





          </Swiper>
        </div>
      </div>
    </>
  )
}

export default HomeCategorySlider
