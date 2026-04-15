import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const bannerSlider = [
  { id: 1, img: "images/main-banner-1.jpg", imgtitle: "Women Solid Round Green T-Shirt ", startingPrice: "$59.00", },
  { id: 2, img: "images/main-banner-2.jpg", imgtitle: "Buy Modern Chair in Black Colour ", startingPrice: "$89.00", }
]

const SliderType2 = () => {
  return (
    <>
      <section className='py-6'>
        {/* Changed to flex-col for mobile and flex-row for desktop */}
        <div className="flex flex-col lg:flex-row items-stretch container mx-auto px-4 gap-7">
          
          {/* Left Part: 100% width on mobile, 66% on desktop */}
          <div className="leftpart w-full lg:w-[66%] h-full my-auto">
            <Swiper
              spaceBetween={30}
              effect={'fade'}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false
              }}
              modules={[EffectFade, Navigation, Pagination, Autoplay]}
              className="sliderType2 rounded-2xl"
            >
              {bannerSlider.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="item w-full rounded-2xl relative overflow-hidden bg-gray-100">
                    <img src={item.img} className="w-full h-75 md:h-auto object-cover" alt="banner" />

                    {/* Adjusted info box: smaller text/padding on mobile */}
                    <div className="info absolute top-0 right-0 w-full md:w-80 p-6 md:py-25 text-right md:text-left">
                      <h4 className='text-sm md:text-md text-black mb-1 md:mb-2'>Big saving Days Sale</h4>
                      <h3 className='text-lg md:text-2xl text-black font-semibold mb-1 md:mb-2 leading-tight'>{item.imgtitle}</h3>
                      <h5 className='text-sm md:text-md text-black mb-2.5'>Starting At Only <span className='text-lg md:text-xl text-orange-500 font-semibold'>{item.startingPrice}</span></h5>
                      <button className="universalBtn scale-90 md:scale-100 origin-right md:origin-left">SHOP NOW</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Part: 100% width on mobile, 35% on desktop */}
          <div className="rightpart w-full lg:w-[35%] h-full my-auto">
            {/* flex-row on mobile to keep banners side-by-side, or flex-col to stack */}
            <div className="column-img w-full flex flex-col sm:flex-row lg:flex-col gap-4 items-center">

              {/* Top Banner */}
              <div className="top relative w-full rounded-2xl overflow-hidden flex-1">
                <div className="textPart font-semibold absolute left-5 top-8 md:top-14 w-32 md:w-45 z-10">
                  <h2 className='text-md md:text-xl mb-1 leading-tight'>Samsung Gear VR Camera</h2>
                  <h2 className='text-[#ff5252] mb-1'>$ 129.00</h2>
                  <p className='underline text-xs md:text-sm text-black cursor-pointer'>SHOP NOW</p>
                </div>
                <img src="images/sub-banner-1.jpg" alt="" className='w-full h-40 md:h-55.5 object-cover transition-transform duration-500 hover:scale-105' />
              </div>

              {/* Bottom Banner */}
              <div className="bottom relative w-full rounded-2xl overflow-hidden flex-1">
                <div className="textPart font-semibold absolute right-5 top-8 md:top-14 w-32 md:w-45 text-right z-10">
                  <h2 className='text-md md:text-xl mb-1 leading-tight'>Samsung Gear VR Camera</h2>
                  <h2 className='text-[#ff5252] mb-1'>$ 129.00</h2>
                  <p className='underline text-xs md:text-sm text-black cursor-pointer'>SHOP NOW</p>
                </div>
                <img src="images/sub-banner-2.jpg" alt="" className='w-full h-40 md:h-55.5 object-cover transition-transform duration-500 hover:scale-105' />
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SliderType2;