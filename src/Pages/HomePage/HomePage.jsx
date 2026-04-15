import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { addToWishlist } from "../../features/wishlist/wishlistSlice";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import HomeCategorySlider from "../../components/HomeCategorySlider/HomeCategorySlider";
import Navigation from "../../components/Header/Navigation/Navigation";
import ProductItem from "../../components/ProductItem/ProductItem";
import Banner from "../../components/Banner/Banner";
import ReusableSlider from "../../components/resusableSlider/reusableSlider";
import ProductCard from "../../components/ProductCard/ProductCard";
import Features from "../../components/Features/Features";
import SliderType2 from "../../components/SliderType2/SliderType2";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import testimonials from "../../data/testimonials";

import {
  FaTruck,
  FaRedo,
  FaLock,
  FaGift,
  FaHeadset,
  FaShoppingCart,
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Footwear");

  const tabsList = [
    { id: 1, title: "Fashion" },
    { id: 2, title: "Appliances" },
    { id: 3, title: "Bags" },
    { id: 4, title: "Footwear" },
    { id: 5, title: "Groceries" },
    { id: 6, title: "Beauty" },
    { id: 7, title: "Wellness" },
    { id: 8, title: "Jewellery" },
  
  ];

  const featuresData = [
    { icon: <FaTruck size={40} />, title: "Free Shipping", description: "For all Orders Over $100" },
    { icon: <FaRedo size={35} />, title: "30 Days Returns", description: "For an Exchange Product" },
    { icon: <FaLock size={35} />, title: "Secured Payment", description: "Payment Cards Accepted" },
    { icon: <FaGift size={35} />, title: "Special Gifts", description: "Our First Product Order" },
    { icon: <FaHeadset size={35} />, title: "Support 24/7", description: "Contact us Anytime" },
  ];


  console.log(user);

  const BASE_URL = import.meta.env.VITE_API_URL;
 
  useEffect(() => {
    const fetchData = async () => {
      try {
       const [all, popular, latest] = await Promise.all([
  axios.get(`${BASE_URL}/products`),
  axios.get(`${BASE_URL}/products/popular`),
  axios.get(`${BASE_URL}/products/latest`),
]);


        setProducts(all.data);
        setPopularProducts(popular.data);
        setLatestProducts(latest.data);
           console.log("popular data", popular)
      } catch (err) {
        console.log(err);
      }
    };
 
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedCategory(tabsList[newValue].title);
  };

  const selectedCategoryProducts = (popularProducts || []).filter((item) => {
    if (!item.category) return false;

    const categories = Array.isArray(item.category)
      ? item.category
      : [item.category];

    return categories
      .map((c) => c.trim().toLowerCase())
      .includes(selectedCategory.trim().toLowerCase());
  });

  return (
    <>
      <Navigation />
      <SliderType2 />
      <HomeCategorySlider />
      <Banner />

      <div className="bg-white py-5">
        <div className="container mx-auto px-4">

          {/* Popular Section */}
          <div className="flex items-center justify-between gap-6 mt-10">
            <div className="w-[30%]">
              <h3 className="text-[22px] font-semibold">Popular Products</h3>
              <p className="text-[12px] font-semibold">
                Do not miss the current offers until the end of March
              </p>
            </div>

            <div className="w-[70%]">
              <Box sx={{ flexGrow: 1, width: "100%", bgcolor: "background.paper" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                >
                  {tabsList.map((item) => (
                    <Tab key={item.id} label={item.title} />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>

          <ProductItem items={selectedCategoryProducts} />

          {/* Banner */}
          <div className="mt-5 border-2 rounded-2xl overflow-hidden group">
            <img
              src="/images/bannerimg1.png"
              alt="banner"
              className="transition-all duration-200 group-hover:scale-110"
            />
          </div>

          {/* Latest Products */}
          <ReusableSlider
            title="Latest Products"
            data={latestProducts}
            renderItem={(item) => (
              <ProductCard item={item} />
            )}
            slidesPerView={5}
          />

          {/* Testimonials */}
          {/* <ReusableSlider
            title="See What our Customer Says"
            data={testimonials}
            renderItem={(item) => (
              <div className="bg-white p-6 rounded-xl shadow text-center border">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-30 h-30 rounded-full mx-auto mb-4"
                />
                <p className="text-sm text-gray-600 mb-2">
                  "{item.feedback}"
                </p>
                <h4 className="font-semibold">{item.name}</h4>
              </div>
            )}
            slidesPerView={4}
          /> */}
        </div>
      </div>

      <div className="mx-auto mt-10">
        <Features features={featuresData} />
      </div>
    </>
  );
};

export default HomePage;