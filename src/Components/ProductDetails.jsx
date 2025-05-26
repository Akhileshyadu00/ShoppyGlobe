import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../Utils/cartSlice"; // ✅ Correct import

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch(); // ✅ Correct usage
  const { id } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      setProduct(res.data); // ✅ Fixed response
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg w-full md:w-1/2">
        <img
          src={product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="h-64 object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-gray-600 mb-6">Rs. {product.price}</p>

        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="border border-gray-300 rounded-2xl px-4 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={() => dispatch(addToCart({ product, quantity }))} // ✅ Proper dispatch
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white mt-2 px-6 py-2 rounded shadow transition"
        >
          <IoCartOutline className="text-xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
