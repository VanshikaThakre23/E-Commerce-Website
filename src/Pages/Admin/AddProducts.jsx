import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const AddProducts = () => {

  const [product, setProduct] = useState({
    title: "",
    category: "",
    img: null,
    alternateimg: null,
    oldPrice: "",
    newPrice: "",
    discount: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("oldPrice", product.oldPrice);
    formData.append("newPrice", product.newPrice);
    formData.append("discount", product.discount);
    formData.append("img", product.img);
    formData.append("alternateimg", product.alternateimg);

    try {

      await axios.post(
        "http://localhost:5000/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      toast.success("Product Added");

      setProduct({
        title: "",
        category: "",
        img: null,
        alternateimg: null,
        oldPrice: "",
        newPrice: "",
        discount: "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-300">Add Product</li>
          <li className="cursor-pointer hover:text-gray-300">Manage Products</li>
        </ul>
      </div>

      <div className="flex-1 p-10">

        <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow w-125 space-y-4"
          encType="multipart/form-data"
        >

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />


          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e) =>
              setProduct({ ...product, img: e.target.files[0] })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e) =>
              setProduct({ ...product, alternateimg: e.target.files[0] })
            }
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={product.oldPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="newPrice"
            placeholder="New Price"
            value={product.newPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={product.discount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add Product
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddProducts;