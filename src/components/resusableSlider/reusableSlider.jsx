import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ReusableSlider = ({
  data,
  renderItem,
  slidesPerView = 5,
  spaceBetween = 20,
  title,
}) => {
  const uniqueId = Math.random().toString(36).substring(2, 9);

  return (
    <section className="mt-5">
      {title && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">{title}</h2>

          <div className="flex gap-2 ">
            <button
              className={`prev-${uniqueId} w-8 h-8 rounded-full border cursor-pointer`}
            >
              ❮
            </button>
            <button
              className={`next-${uniqueId} w-8 h-8 rounded-full border cursor-pointer`}
            >
              ❯
            </button>
          </div>
        </div>
      )}

      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={{
          nextEl: `.next-${uniqueId}`,
          prevEl: `.prev-${uniqueId}`,
        }}
        modules={[Navigation]}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReusableSlider;