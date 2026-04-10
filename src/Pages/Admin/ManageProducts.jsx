import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import swal from 'sweetalert';


const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts  = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {

    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
      buttons:true,
    });

    if (!willDelete) {
      return;
    }


    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      toast.success("Product is deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Error deleting");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Manage All Products</h2>
          <span className="text-sm text-gray-500">{products.length} Items</span>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium text-sm">Product Name</th>
                <th className="px-6 py-3 font-medium text-sm">New Price</th>
                <th className="px-6 py-3 font-medium text-sm">Old Price</th>
                <th className="px-6 py-3 font-medium text-sm">Discount</th>
                <th className="px-6 py-3 font-medium text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-md border"
                    />
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">Rs. {item.newPrice}</td>
                  <td className="px-6 py-4 text-sm font-semibold">Rs. {item.oldPrice}</td>
                  <td className="px-6 py-4 text-sm font-semibold">  {item.discount}%</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="text-red-500 hover:underline text-sm font-medium"
                    >
                      Delete Item
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;