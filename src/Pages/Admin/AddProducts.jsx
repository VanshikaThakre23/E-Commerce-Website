// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import AdminSidebar from "./AdminSidebar";

// const AddProducts = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     category: [],
//     img: null,
//     alternateimg: null,
//     oldPrice: "",
//     newPrice: "",
//     discount: "",
//     popularSection: false,
//     latestSection: false,
//   });

//   const categories = ["Jewellary", "Appliances", "Bags", "Footwear", "Groceries", "Beauty", "Wellness", "Accessories", "Men", "Women", "Kids"];

//   // Handles text and checkboxes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
//   };

//   // Handles images
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setProduct({ ...product, [name]: files[0] });
//   };

//   // Handles selecting/deselecting categories
//   const toggleCategory = (cat) => {
//     setProduct((prev) => ({
//       ...prev,
//       category: prev.category.includes(cat)
//         ? prev.category.filter((item) => item !== cat)
//         : [...prev.category, cat],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(product).forEach((key) => formData.append(key, product[key]));

//     try {
//       await axios.post("http://localhost:5000/products", formData);
//       toast.success("Product Added!");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <AdminSidebar />

//       <div className="flex-1 p-6">
//         <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
//           <h2 className="text-xl font-bold mb-6">Add New Product</h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Product Title</label>
//               <input type="text" name="title" value={product.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Enter title" />
//             </div>

//             {/* Simple Category Chips */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Select Categories</label>
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat}
//                     type="button"
//                     onClick={() => toggleCategory(cat)}
//                     className={`px-3 py-1 text-sm rounded-full border ${
//                       product.category.includes(cat) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Prices */}
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium mb-1">Price</label>
//                 <input type="number" name="newPrice" value={product.newPrice} onChange={handleChange} className="w-full border p-2 rounded" />
//               </div>
//               <div className="flex-1">
//                 <label className="block text-sm font-medium mb-1">Discount (%)</label>
//                 <input type="text" name="discount" value={product.discount} onChange={handleChange} className="w-full border p-2 rounded" />
//               </div>
//             </div>

//             {/* Image Uploads */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Main Image</label>
//                 <input type="file" name="img" onChange={handleFileChange} className="text-xs" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Alt Image</label>
//                 <input type="file" name="alternateimg" onChange={handleFileChange} className="text-xs" />
//               </div>
//             </div>

//             {/* Checkboxes */}
//             <div className="flex gap-6 py-2 border-t border-b">
//               <label className="flex items-center gap-2 text-sm cursor-pointer">
//                 <input type="checkbox" name="popularSection" checked={product.popularSection} onChange={handleChange} />
//                 Popular Product
//               </label>
//               <label className="flex items-center gap-2 text-sm cursor-pointer">
//                 <input type="checkbox" name="latestSection" checked={product.latestSection} onChange={handleChange} />
//                 Latest Arrival
//               </label>
//             </div>

//             <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
//               Save Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import { X } from "lucide-react"; // Optional: for a nice close icon on chips

const AddProducts = () => {
  const [product, setProduct] = useState({
    title: "",
    category: [],
    img: null,
    alternateimg: null,
    oldPrice: "",
    newPrice: "",
    discount: "",
    popularSection: false,
    latestSection: false,
  });

  const categories = ["Jewellary", "Appliances", "Bags", "Footwear", "Groceries", "Beauty", "Wellness", "Accessories", "Men", "Women", "Kids"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct({ ...product, [name]: files[0] });
  };

  // Improved Category Dropdown Handler
  const handleCategorySelect = (e) => {
    const selectedCat = e.target.value;
    if (selectedCat && !product.category.includes(selectedCat)) {
      setProduct({ ...product, category: [...product.category, selectedCat] });
    }
    // Reset dropdown to placeholder after selection
    e.target.value = "";
  };

  const removeCategory = (catToRemove) => {
    setProduct({
      ...product,
      category: product.category.filter((cat) => cat !== catToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "category") {
        formData.append(key, JSON.stringify(product[key]));
      } else {
        formData.append(key, product[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/products", formData);
      toast.success("Product Added!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <AdminSidebar />

      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <p className="text-sm text-gray-500">Fill in the details to list a new item in your store.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="e.g. Premium Leather Handbag"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                onChange={handleCategorySelect}
                defaultValue=""
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition-all"
              >
                <option value="" disabled>Choose categories...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} disabled={product.category.includes(cat)}>
                    {cat} {product.category.includes(cat) ? "(Selected)" : ""}
                  </option>
                ))}
              </select>

              {/* Selected Categories Display (Tags) */}
              {product.category.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.category.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-medium border border-blue-200"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => removeCategory(cat)}
                        className="hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Prices & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Old Price (Rs)</label>
                <input type="number" name="newPrice" value={product.newPrice} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">New Price (Rs)</label>
                <input type="number" name="oldPrice" value={product.oldPrice} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Discount (%)</label>
                <input type="text" name="discount" value={product.discount} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="10" />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Main Image</label>
                <input type="file" name="img" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Alt Image</label>
                <input type="file" name="alternateimg" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
            </div>

            {/* Checkboxes */}
            <p>In which section you want to add the product ?</p>
            <div className="flex items-center gap-8 py-4 px-2 border-y border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="popularSection" checked={product.popularSection} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium group-hover:text-blue-600">Popular Product</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name="latestSection" checked={product.latestSection} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm font-medium group-hover:text-blue-600">Latest Arrival</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-[#ff7723] text-white py-4 rounded-lg font-bold shadow-lg hover:bg-[#cb570f] hover:cursor-pointer transform transition-transform active:scale-[0.98]">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;