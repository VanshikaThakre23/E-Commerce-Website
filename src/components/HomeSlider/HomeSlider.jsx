import React from 'react'

import 'swiper/css';
import { Autoplay, Navigation,} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeSlider = () => {
  return (
    <>
      <div className="homepageSlider py-4 mb-7">
        <div className="container">
          <Swiper
       navigation={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: true
            }}

            spaceBetween={30}
            modules={[ Navigation, Autoplay]}
            className="mySwiper "
          >

            <SwiperSlide >
              <div className="item rounded-2xl overflow-hidden bg-amber-800">
                <img className='w-full rounded-2xl' src='../../images/homebanner1.1.jpg' alt='banner-slide' />
              </div>
            </SwiperSlide>

            <SwiperSlide ><div className="item rounded-2xl overflow-hidden ">
              <img className='w-full' src='../../images/homebanner1.2.jpg' alt='banner-slide' />
            </div></SwiperSlide>

            <SwiperSlide ><div className="item rounded-2xl overflow-hidden ">
              <img className='w-full' src='../../images/homebanner1.3.jpg' alt='banner-slide' />
            </div></SwiperSlide>

            <SwiperSlide >
              <div className="item rounded-2xl overflow-hidden bg-amber-800">
                <img className='w-full rounded-2xl' src='../../images/homebanner1.4.jpg' alt='banner-slide' />
              </div>
            </SwiperSlide>

            <SwiperSlide ><div className="item rounded-2xl overflow-hidden ">
              <img className='w-full' src='../../images/homebanner1.3.jpg' alt='banner-slide' />
            </div></SwiperSlide>



          </Swiper>
        </div>
      </div>
    </>

  )
}

export default HomeSlider
