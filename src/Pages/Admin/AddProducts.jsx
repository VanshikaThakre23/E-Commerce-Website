import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: "", category: "", img: null, alternateimg: null,
    oldPrice: "", newPrice: "", discount: "",
    popularSection: false, latestSection: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct({ ...product, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => formData.append(key, product[key]));

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Product Added Successfully");
      setProduct({
        title: "", category: "", img: null, alternateimg: null,
        oldPrice: "", newPrice: "", discount: "",
        popularSection: false, latestSection: false,
      });
    } catch (error) { console.log(error); }
  };

  // Helper for image previews
  const ImagePreview = ({ file }) => (
    <div className="mt-2 h-20 w-20 border-2 border-dashed border-gray-300 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
      {file ? (
        <img src={URL.createObjectURL(file)} alt="preview" className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs text-gray-400">No Image</span>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-lg space-y-4">


          <input type="text" name="title" placeholder="Product Title"
            value={product.title} onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />


          {/* <input type="text" name="category" placeholder="Category"
            value={product.category} onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          */}

          <select type="text" name="category" placeholder="Category"
            value={product.category} onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
            <option value="" className="text-gray-500">Select one category ....</option>
            <option value="Jewellary">Jewellary</option>
            <option value="Appliances">Appliances</option>
            <option value="Bags">Bags</option>
            <option value="Footwear">Footwear</option>
            <option value="Groceries">Groceries</option>
            <option value="Beauty">Beauty</option>
            <option value="Wellness">Wellness</option>

          </select>


          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">MAIN IMAGE</label>
            <input
              type="file"
              name="img"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border rounded-lg p-1"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Alternate Image</label>
            <input
              type="file"
              name="alternateimg"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer border rounded-lg p-1"
            />
          </div>


          <div className="flex gap-4">

            <input type="number" name="oldPrice" placeholder="Old Price"
              value={product.oldPrice} onChange={handleChange}
              className="w-1/2 border p-3 rounded-lg" />

            <input type="number" name="newPrice" placeholder="New Price"
              value={product.newPrice} onChange={handleChange}
              className="w-1/2 border p-3 rounded-lg" />

          </div>

          <input type="text" name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} className="w-full border p-3 rounded-lg" />

          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <h3>In which section you want to add this product?</h3>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="popularSection" checked={product.popularSection} onChange={handleChange} className="w-4 h-4" />
              <span className="text-sm">Popular Section</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="latestSection" checked={product.latestSection}
                onChange={handleChange} className="w-4 h-4" />
              <span className="text-sm">Latest Section</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold 
          py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Save Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProducts;