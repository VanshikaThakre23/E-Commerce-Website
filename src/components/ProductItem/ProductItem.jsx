import Rating from '@mui/material/Rating'
import React from 'react'
import { Link } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineZoomInMap } from "react-icons/md";
import Button from '@mui/material/Button';


const productItemList = [
  { id: 1, img: "images/productItem-1.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 2, img: "images/productItem-2.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 3, img: "images/productItem-3.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 4, img: "images/productItem-4.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 5, img: "images/productItem-5.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },


  { id: 3, img: "images/productItem-3.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 4, img: "images/productItem-4.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },
  { id: 5, img: "images/productItem-5.jpg", category: "clothes", title: "jacket", oldPrice: 400, newPrice: 300, discount: 10 },


]

const ProductItem = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10  " >
      {
        productItemList.map((item) => (
          <div className="productCard border-2 relative rounded-2xl overflow-hidden" key={item.id}>

            <div className="productCardimg">
              <img src={item.img} alt="" />
            </div>

            <span className='absolute top-0 left-0 bg-red-500 text-white p-2 rounded-br-xl'>{item.discount} %</span>

            <div className="actions absolute top-3 right-0 flex flex-col items-center gap-2">
  <Button className="min-w-0 w-9 p-2">
    <GoHeart />
  </Button>

  <Button className="min-w-0 p-2">
    <IoIosGitCompare />
  </Button>

  <Button className="min-w-0 p-2">
    <MdOutlineZoomInMap />
  </Button>
</div>

            <div className="productCardtext p-3 flex flex-col gap-1">
              <h4 className='text-sm font-semibold'>{item.category}</h4>
              <h3 className="text-sm text-gray-600">{item.title}</h3>

              <Rating defaultValue={4} size="small" />

              <div className="productCardPrice flex gap-3">
                <p className='oldPrice line-through'>{item.oldPrice}</p>
                <p className='newPrice text-pink-700'>{item.newPrice} </p>
              </div>
            </div>


          </div>
        ))
      }
    </div>

  )
}

export default ProductItem
