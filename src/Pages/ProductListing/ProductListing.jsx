import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'

import productItemList from '../../data/products'

import ProductItem from '../../components/ProductItem/ProductItem'

const ProductListing = () => {
    return (
        <>
            <div className="">

                <div className="container ">
                    <div className="flex gap-4 mt-3 bg-[#fcf9f9] px-4">
                        <div className="sidebarWrapper ">
                            <Sidebar />
                        </div>

                        <div className="gridWrapper">
                          <ProductItem items={productItemList}/>
                          
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductListing
