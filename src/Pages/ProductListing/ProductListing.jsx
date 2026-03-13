import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProductItem from '../../components/ProductItem/ProductItem'
import axios from 'axios'


const ProductListing = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then((res => setProducts(res.data)));
    }, [])
    return (
        <>
            <div className="">

                <div className="container ">
                    <div className="flex gap-4 mt-3 bg-[#fcf9f9] px-4">
                        <div className="sidebarWrapper ">
                            <Sidebar />
                        </div>

                        <div className="gridWrapper">
                            <ProductItem items={products} />

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductListing
