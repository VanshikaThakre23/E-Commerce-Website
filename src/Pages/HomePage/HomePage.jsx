import React, { useEffect, useState } from 'react'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import HomeCategorySlider from '../../components/HomeCategorySlider/HomeCategorySlider'

import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Navigation from '../../components/Header/Navigation/Navigation';
import ProductItem from '../../components/ProductItem/ProductItem';
import productItemList from '../../data/products';
import Banner from '../../components/Banner/Banner';
import ReusableSlider from '../../components/resusableSlider/reusableSlider';
import ProductCard from '../../components/ProductCard/ProductCard';
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import testimonials from "../../data/testimonials";

import { FaTruck, FaRedo, FaLock, FaGift, FaHeadset } from "react-icons/fa";
import Features from '../../components/Features/Features';
import SliderType2 from '../../components/SliderType2/SliderType2';
import axios from 'axios';




const HomePage = () => {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((res)=>setProducts(res.data))
    .catch((err)=>console.log(err))
  },[])

  console.log(products);

  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const tabsList = [
    { id: 1, title: "Jewellary" },
    { id: 2, title: "Appliances" },
    { id: 3, title: "Bags" },
    { id: 4, title: "Footwear" },
    { id: 5, title: "Groceries" },
    { id: 6, title: "Beauty" },
    { id: 7, title: "Wellness" },
  ]

  const latestActions = [
    { title: "Wishlist", Icon: FaRegHeart },
    { title: "Compare", Icon: IoGitCompare },
    { title: "Add to Cart", Icon: FaShoppingCart },
  ]

  const featuresData = [
    { icon: <FaTruck size={40} />, title: "Free Shipping", description: "For all Orders Over $100" },
    { icon: <FaRedo size={35} />, title: "30 Days Returns", description: "For an Exchange Product" },
    { icon: <FaLock size={35} />, title: "Secured Payment", description: "Payment Cards Accepted" },
    { icon: <FaGift size={35} />, title: "Special Gifts", description: "Our First Product Order" },
    { icon: <FaHeadset size={35} />, title: "Support 24/7", description: "Contact us Anytime" },
  ];


  return (
    <>
    <Navigation/>


      {/* <section className='py-6'>
        <div className="flex items-center container">
          <div className="leftpart w-[65%]">
            <SliderType2/>
          </div>
        </div>
      </section> */}


      <SliderType2 />



      <HomeCategorySlider />
      <Banner />

      <div className='bg-white py-5 '>
        <div className="container mx-auto px-4">

          {/* -------------popular Product vala sections */}
          <div className="flex items-center justify-between gap-6 mt-10">
            <div className="leftSec w-[30%]">
              <h3 className='text-[22px] font-semibold'> Popular Products</h3>
              <p className='text-[12px] font-semibold'>Do not miss the current offers until the end of March</p>

            </div>

            <div className="rightSec w-[70%] bg-amber-200">

              <Box
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  bgcolor: 'background.paper',
                }}
              >
                <Tabs

                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"

                >
                  {
                    tabsList.map((item) => (
                      <Tab key={item.id} label={item.title} />
                    ))
                  }

                </Tabs>
              </Box>

            </div>


          </div>

           <ProductItem items={products} /> 

                

          {/* banner image single vali black bg vali*/}
          <div className="banner mt-5  border-2 rounded-2xl overflow-hidden group">
            <img src="/images/bannerimg1.png" alt="gwrfwefwef" className='transition-all duration-190 group-hover:scale-110 ' />
          </div>

          {/* ------------------------------Latest Product Section------------------------------------- */}
          <ReusableSlider
            title="Latest Products"
            data={productItemList}
            renderItem={(item) =>
              <ProductCard item={item} actions={latestActions} />
            }
            slidesPerView={5}
          />

          {/* ------------------------------Testimonial Section------------------------------------------ */}
          {/* isme customer ke photo and their feedback add krne hai  */}
          <ReusableSlider
            title="See What our Customer Says"
            data={testimonials}
            renderItem={(item) => (
              <div className="bg-white p-6 rounded-xl shadow text-center border">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-30 h-30 rounded-full mx-auto mb-4"
                />
                <p className="text-sm text-gray-600 mb-2">"{item.feedback}"</p>
                <h4 className="font-semibold">{item.name}</h4>
              </div>
            )}
            slidesPerView={4}
          />





        </div>
        

      </div>



          <div className=" mx-auto mt-10">
            <Features features={featuresData} />

          </div>
    </>
  )
}

export default HomePage
