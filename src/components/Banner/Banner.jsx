import React from 'react'

const Banner = () => {
    const bannerImg = [
        { id: 1, img: "/images/sub-banner-4.jpg", title: "S22 Samsung Smartphone", price: "250.00" },
        { id: 2, img: "/images/sub-banner-2.jpg", title: "Armchair Mad By Shopstic", price: "190.00" },
        { id: 3, img: "/images/sub-banner-3.jpg", title: "Noise Wireless Headphones", price: "129.00" }
    ]

    return (
        <>
            <div className=" container flex items-center justify-center gap-5 mt-4 px-3 py-5">
                {
                    bannerImg.map((item) => (

                        <div className='flex items-center justify-center w-180 h-66 bg-amber-800 relative  rounded-2xl overflow-hidden'>

                            <img src={item.img} alt="banner-img" className='w-160 h-full transition-transform duration-300 hover:scale-105 '  />

                            <div className="details absolute right-3 px-2 w-50 ">
                                <h3 className='font-semibold text-2xl text-black-600 '>{item.title}</h3>
                                <h4 className='font-semibold text-xl text-orange-600 mt-1 mb-1'>Rs {item.price}</h4>
                                <h5 className='underline text-[13px] text-black font-medium cursor-pointer '>SHOP NOW</h5>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Banner
