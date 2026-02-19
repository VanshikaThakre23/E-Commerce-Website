import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductItem from '../ProductItem/ProductItem';

const ProductSlider = (props) => {
  return (
    <>
    <div className="productSlider">
         <Swiper
                  slidesPerView={props.item}
                  spaceBetween={10}
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

                    <SwiperSlide>
                        <ProductItem/>
                    </SwiperSlide>

                </Swiper>
    </div>
    </>
  )
}

export default ProductSlider
