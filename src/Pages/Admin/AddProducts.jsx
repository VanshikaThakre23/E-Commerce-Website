import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


const AddProducts = () => {
  const [product, setProduct] = useState({
    title: "",
    category: [],
    img: null,
    alternateimg: null,
    oldPrice: "--",
    newPrice: "--",
    discount: "--",
    popularSection: false,
    latestSection: false,
  });

  const categories = ["Jewellary", "Appliances", "Bags", "Footwear", "Groceries", "Beauty", "Wellness", "Accessories", "Men", "Women", "Kids"];

  // Handles text and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  // Handles images
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct({ ...product, [name]: files[0] });
  };

  // Handles selecting/deselecting categories
  const toggleCategory = (cat) => {
    setProduct((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((item) => item !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", JSON.stringify(product.category));
    formData.append("img", product.img);
    formData.append("alternateimg", product.alternateimg);
    formData.append("oldPrice", product.oldPrice);
    formData.append("newPrice", product.newPrice);
    formData.append("discount", product.discount);
    formData.append("popularSection", product.popularSection);
    formData.append("latestSection", product.latestSection);

    try {
      await axios.post("http://localhost:5000/products", formData);
      toast.success("Product Added!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-6">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Title</label>
              <input type="text" name="title" value={product.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Enter title" />
            </div>

            {/* Simple Category Chips */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full border ${product.category.includes(cat) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Prices */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Old Price</label>
                <input type="number" name="newPrice" value={product.newPrice} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">New Price</label>
                <input type="number" name="oldPrice" value={product.oldPrice} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input type="text" name="discount" value={product.discount} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-2 gap-6">

              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Main Image</label>

                <label className="relative w-24 h-24 cursor-pointer block">
                  <input
                    type="file"
                    name="img"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {product.img ? (
                    <img
                      src={URL.createObjectURL(product.img)}
                      alt="preview"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaCloudUploadAlt size={30} />
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0 text-gray-500 p-1 rounded-full text-md">
                   <FaEdit size={19}/>
                   
                  </div>
                </label>
              </div>


              {/* Alternate Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Alt Image</label>

                <label className="relative w-24 h-24 cursor-pointer block">
                  <input
                    type="file"
                    name="alternateimg"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {product.alternateimg ? (
                    <img
                      src={URL.createObjectURL(product.alternateimg)}
                      alt="preview"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaCloudUploadAlt size={30} />
                    </div>
                  )}

                   <div className="absolute bottom-0 right-0 text-gray-500 p-1 rounded-full text-md">
                   <FaEdit size={18}/>
                   
                  </div>
                </label>
              </div>

            </div>

            {/* Checkboxes */}
            <p>In which section You want to add this product ?</p>
            <div className="flex gap-6  ">

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="popularSection" checked={product.popularSection} onChange={handleChange} />
                Popular Product
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="latestSection" checked={product.latestSection} onChange={handleChange} />
                Latest Arrival
              </label>
            </div>

            <button type="submit" className="w-full bg-[#ef7e21] text-white py-3 rounded font-bold hover:bg-[#b85a0d] hover:cursor-pointer">
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;


