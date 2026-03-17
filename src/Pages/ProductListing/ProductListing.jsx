import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductItem from '../../components/ProductItem/ProductItem'
import axios from 'axios'


const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");



    useEffect(() => {
        axios.get("http://localhost:5000/products/popular")
            .then((res => setProducts(res.data)));
    }, []);


    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((p) =>
                p.category?.includes(selectedCategory)
            );

    return (
        <>
            <div className="">

                <div className="container ">
                    <div className="flex gap-4 mt-3 bg-[#fcf9f9] px-4">
                        <div className="sidebarWrapper ">
                            <Sidebar
                                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        </div>

                       

                        <div className="gridWrapper w-full">
                            <ProductItem items={filteredProducts} />
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductListing
