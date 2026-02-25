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
        <div className="flex items-stretch container gap-7">
          <div className="leftpart w-[66%] h-full my-auto">
            <Swiper
              spaceBetween={30}
              effect={'fade'}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay:2000,
                duration:6,
                disableOnInteraction:false
              }}
              modules={[EffectFade, Navigation, Pagination,Autoplay]}
              className="sliderType2"
            >
              {
                bannerSlider.map((item) => (

                  <SwiperSlide key={item.id}>
                    <div className="item w-full rounded-2xl relative overflow-hidden">
                      <img src={item.img} />

                      <div className="info absolute top-0 right-0 w-80 py-25" data-aos="zoom-in-left">
                        <h4 className='text-md text-black mb-2'>Big saving Days Sale</h4>
                        <h3 className='text-black text-2xl font-semibold mb-2'>{item.imgtitle} </h3>
                        <h5 className='text-md text-black mb-2.5'>Starting At Only <span className='text-xl text-orange-500 font-semibold '>{item.startingPrice}</span></h5>

                        <button className="universalBtn" >SHOP NOW</button>

                      </div>

                    </div>

                  </SwiperSlide>


                ))
              }
            </Swiper>

          </div>

          <div className="rightpart w-[35%] h-full mr-2 my-auto">

            <div className="column-img w-full flex-col items-center ">

              <div className="top relative mb-3 rounded-2xl overflow-hidden">
                <div className="textPart font-semibold absolute left-5 top-14 w-45  ">
                  <h2 className=' text-xl mb-1'>Samsung Gear VR Camera</h2>
                  <h2 className='text-[#ff5252] mb-1'>$ 129.00</h2>
                  <p className='underline text-sm text-black f'>SHOP NOW</p>
                </div>

                <img src="images/sub-banner-1.jpg" alt="" className='w-full h-55.5 object-cover' />

              </div>
{/* -------------------- */}
              <div className="bottom relative rounded-2xl overflow-hidden">

                <div className="textPart font-semibold absolute right-5 top-14 w-45  ">
                  <h2 className=' text-xl mb-1'>Samsung Gear VR Camera</h2>
                  <h2 className='text-[#ff5252] mb-1'>$ 129.00</h2>
                  <p className='underline text-sm text-black f'>SHOP NOW</p>
                </div>

                <img src="images/sub-banner-2.jpg" alt="" className='w-full h-55.5 object-cover' />

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SliderType2;