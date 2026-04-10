import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import { FaCloudUploadAlt, FaEdit } from "react-icons/fa";

const AddProducts = () => {

  // ---------------- STATE ----------------
  const [product, setProduct] = useState({
    title: "",
    category: [],
    subCategory: [],
    img: null,
    alternateimg: null,
    oldPrice: "",
    newPrice: "",
    discount: "",
    popularSection: false,
    latestSection: false,
  });

  // ---------------- STATIC DATA ----------------
  const categories = [
    "Fashion", "Appliances", "Bags", "Footwear",
    "Groceries", "Beauty", "Wellness", "Jewellery"
  ];

  const subCategories = [
    "Men", "Women", "Kids",
    "Kitchen", "Home",
    "Office-Bag", "Travel-Bag", "School-Bag",
    "Daily-Needs", "Essentials",
    "Skincare", "Makeup",
    "Fitness", "Health",
    "Gold", "Silver"
  ];

  // ---------------- HANDLERS ----------------

  // handle text + checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // toggle category
  const toggleCategory = (cat) => {
    setProduct((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((item) => item !== cat)
        : [...prev.category, cat],
    }));
  };

  // toggle subcategory
  const toggleSubCategory = (subCat) => {
    setProduct((prev) => ({
      ...prev,
      subCategory: prev.subCategory.includes(subCat)
        ? prev.subCategory.filter((item) => item !== subCat)
        : [...prev.subCategory, subCat],
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("category", JSON.stringify(product.category));
    formData.append("subCategory", JSON.stringify(product.subCategory));
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

      // reset form
      setProduct({
        title: "",
        category: [],
        subCategory: [],
        img: null,
        alternateimg: null,
        oldPrice: "",
        newPrice: "",
        discount: "",
        popularSection: false,
        latestSection: false,
      });

    } catch (err) {
      console.error(err);
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
              <label className="block text-sm font-medium mb-1">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter title"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      product.category.includes(cat)
                        ? "bg-[#f28226] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Sub-Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {subCategories.map((subCat) => (
                  <button
                    key={subCat}
                    type="button"
                    onClick={() => toggleSubCategory(subCat)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      product.subCategory.includes(subCat)
                        ? "bg-[#d79506] text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            </div>

            {/* Prices */}
            <div className="flex gap-4">
              {["oldPrice", "newPrice", "discount"].map((field) => (
                <div className="flex-1" key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field === "discount"
                      ? "Discount (%)"
                      : field === "oldPrice"
                      ? "Old Price"
                      : "New Price"}
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={product[field]}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              ))}
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-6">

              {["img", "alternateimg"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">
                    {field === "img" ? "Main Image" : "Alt Image"}
                  </label>

                  <label className="relative w-24 h-24 cursor-pointer block">
                    <input
                      type="file"
                      name={field}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {product[field] ? (
                      <img
                        src={URL.createObjectURL(product[field])}
                        alt="preview"
                        className="w-24 h-24 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <FaCloudUploadAlt size={30} />
                      </div>
                    )}

                    <div className="absolute bottom-0 right-0 text-gray-500 p-1">
                      <FaEdit size={18} />
                    </div>
                  </label>
                </div>
              ))}

            </div>

            {/* Sections */}
            <p>In which section you want to add this product?</p>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="popularSection"
                  checked={product.popularSection}
                  onChange={handleChange}
                />
                Popular Product
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="latestSection"
                  checked={product.latestSection}
                  onChange={handleChange}
                />
                Latest Arrival
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ef7e21] text-white py-3 rounded font-bold hover:bg-[#b85a0d]"
            >
              Save Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;