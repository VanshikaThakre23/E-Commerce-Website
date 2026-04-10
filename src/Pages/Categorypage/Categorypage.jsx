import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductItem from "../../components/ProductItem/ProductItem";

const Categorypage = () => {
  const { id, subId } = useParams();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // fetch products
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    };

    getProducts();
  }, []);

  // filter products
  useEffect(() => {
    const data = products.filter(
      (item) =>
        item.category?.some(cat => cat.toLowerCase() === id.toLowerCase()) &&
        item.subCategory?.some(subCat => subCat.toLowerCase() === subId.toLowerCase())
    );

    setFiltered(data);
  }, [id, subId, products]);

  console.log("PARAMS:", id, subId);
  console.log("PRODUCTS:", products);

  return (
    <div className="p-5">
      <h1 className="text-3xl text-center mb-5">
        {id} / {subId}
      </h1>

      {/* <Link>
        <div className="grid grid-cols-4 gap-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div key={item._id} className="border p-3">
                <img
                  src={item.img}
                  alt=""
                  className="h-40 w-full object-cover"
                />
                <h2>{item.title}</h2>
                <p>₹{item.newPrice}</p>
              </div>
            ))

          ) : (
           
              <p className="text-center font-semibold font-stretch-50%">Products Comingg Soooon....</p>
         
          )}
        </div>
      </Link>  */}

      <ProductItem items={filtered}/>
    </div>
  );
};

export default Categorypage;