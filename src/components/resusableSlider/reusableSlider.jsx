import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ReusableSlider = ({
  data = [],
  renderItem,
  slidesPerView = 5,
  spaceBetween = 20,
  title,
}) => {
  const uniqueId = Math.random().toString(36).substring(2, 9);

  return (
    <section className="mt-5 px-4 md:px-0">
      {title && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg md:text-xl font-semibold">{title}</h2>

          <div className="flex gap-2">
            <button
              className={`prev-${uniqueId} w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all`}
            >
              ❮
            </button>
            <button
              className={`next-${uniqueId} w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all`}
            >
              ❯
            </button>
          </div>
        </div>
      )}

      <Swiper
        // Responsive Breakpoints
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: slidesPerView, spaceBetween: spaceBetween },
        }}
        navigation={{
          nextEl: `.next-${uniqueId}`,
          prevEl: `.prev-${uniqueId}`,
        }}
        modules={[Navigation]}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReusableSlider;