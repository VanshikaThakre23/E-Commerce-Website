import React from 'react'

const Banner = () => {
    const bannerImg = [
        { id: 1, img: "/images/sub-banner-4.jpg", title: "S22 Samsung Smartphone", price: "250.00" },
        { id: 2, img: "/images/sub-banner-2.jpg", title: "Armchair Mad By Shopstic", price: "190.00" },
        { id: 3, img: "/images/sub-banner-3.jpg", title: "Noise Wireless Headphones", price: "129.00" }
    ]

    return (
     <section className="w-full">
            <div className="
                container mx-auto 
                flex flex-col lg:flex-row 
                items-center justify-center 
                gap-4 md:gap-5 
                mt-4 
                px-3 md:px-4 
                py-4 md:py-5
            ">
                {bannerImg.map((item) => (
                    <div 
                        key={item.id}
                        className="
                            group relative 
                            w-full lg:w-1/3 
                            h-40 sm:h-48 md:h-60 lg:h-66 
                            rounded-2xl overflow-hidden 
                            flex items-center justify-center
                        "
                    >
                        {/* IMAGE */}
                        <img 
                            src={item.img} 
                            alt="banner-img" 
                            className="
                                w-full h-full object-cover 
                                transition-transform duration-500 
                                group-hover:scale-110
                            "  
                        />

                        {/* DETAILS - MOVED FURTHER RIGHT */}
                        <div className="
                            absolute 
                            /* Reduced 'right' values to move text right */
                            right-0 sm:right-1 md:right-2 
                            /* Added pr-4 to ensure text doesn't hit the very edge */
                            pr-4 md:pr-6
                            p-2 
                            w-[60%] sm:w-[55%] md:w-[50%]
                            text-right /* Optional: Aligns text lines to the right */
                        ">
                            <h3 className="
                                font-bold 
                                text-sm sm:text-lg md:text-xl 
                                text-black 
                                leading-tight
                            ">
                                {item.title}
                            </h3>

                            <h4 className="
                                font-bold 
                                text-sm sm:text-md md:text-xl 
                                text-orange-600 
                                mt-1 mb-1
                            ">
                                Rs {item.price}
                            </h4>

                            <h5 className="
                                underline 
                                text-[11px] sm:text-[12px] md:text-[13px] 
                                text-black font-bold 
                                cursor-pointer 
                                hover:text-orange-700 
                                transition-colors
                            ">
                                SHOP NOW
                            </h5>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default Banner;