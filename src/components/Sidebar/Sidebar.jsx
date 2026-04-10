import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import Radio from '@mui/material/Radio';

import Slider from "@mui/material/Slider";
import { X } from "lucide-react";

const categories = 
["All" , "Men", "Women", "Kids", "Bags","Footwear","Groceries", "Accessories" ,"Beauty","Jewellery"];

const Sidebar = ({selectedCategory , setSelectedCategory}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState("");
   

    const handleCategory = (item) => {
        setSelectedCategory (item);
    };

    const handleRange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <div
            className={` sidebar top-32 left-0
                  h-full
                    z-99
                    bg-[#f8f9fa]
                    transition-all duration-1000
                    overflow-y-auto scrollbar-hide
                    ${isOpen ? "w-72 p-4" : "w-14 p-2"}`}
        >
            {/* Toggle Button */}
            <button
                className="text-2xl cursor-pointer mb-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <FaBars />}
            </button>

            {isOpen && (
                <div className="space-y-6">

                    {/* Categories */}
                    <div className="productCategories">
                        <h3 className="font-semibold mb-3 text-md">
                            PRODUCT CATEGORIES
                        </h3>

                        {categories.map((item) => (
                            <div key={item} className="flex items-center gap-2 mb-2">
                                <Radio
                                    checked={selectedCategory === item}
                                    onChange={() => handleCategory(item)}
                                />



                                <span className="text-sm">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price Range */}
                    <div className="pricerange">
                        <h3 className="font-semibold mb-3 text-md">
                            PRICE RANGE
                        </h3>
                        <div className="flex items-center text-sm mt-2 font-sans font-bold">
                            <span>₹{priceRange[0]} </span> -
                            <span>  ₹{priceRange[1]}</span>
                        </div>
                        <Slider
                            value={priceRange}
                            onChange={handleRange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000}
                            sx={{
                                width: "95%",
                                height: 2,              // track thickness
                                color: "#6f4242",

                                "& .MuiSlider-thumb": {
                                    height: 17,
                                    width: 17,
                                    border:" 2px solid #000",
                                },

                                "& .MuiSlider-track": {
                                    height: 8,
                                },

                                "& .MuiSlider-rail": {
                                    height: 10,
                                },
                            }}
                        />


                    </div>

                   
                    {/* Sort By */}
                    <div>
                        <h3 className="font-semibold mb-3 text-md">SORT BY</h3>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-2 rounded-md border text-sm"
                        >
                            <option value="">Select</option>
                            <option value="newest">Newest</option>
                            <option value="priceLow">Price: Low to High</option>
                            <option value="priceHigh">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>

                    </div>

                    {/* Clear All */}
                    <button
                        onClick={() => {
                          setSelectedCategory("All");
                            setPriceRange([0, 10000]);
                           
                            setSortBy("");
                        }}
                        className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
                    >
                        Clear All Filters
                    </button>



                </div>
            )}
        </div>
    );
};

export default Sidebar;