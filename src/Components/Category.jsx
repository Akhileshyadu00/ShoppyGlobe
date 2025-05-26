import React, { useState, useEffect } from "react";
import { useData } from "../Utils/useProducts";
import { useNavigate } from "react-router-dom";

function Category() {
  const { data, categoryOnlyData } = useData();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Filter products by selected category
  useEffect(() => {
    if (selectedCategory) {
      const filtered = data.filter(
        (item) => item.category?.name === selectedCategory || item.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, data]);

  // Handle product click to navigate to details
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="  py-8 px-4 mt-10">
      <h2 className="text-center  text-4xl  mb-6 text-black font-bold">
        Shop by Category
      </h2>

      {/* Category Buttons */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4  mt-4 mb-4">
        {categoryOnlyData.map((category, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedCategory(category === selectedCategory ? null : category)
            }
            className={`uppercase px-6 py-2 rounded-full shadow-md transition duration-300 ${
              selectedCategory === category
                ? "bg-yellow-500 text-black font-extrabold"
                : " text-black font-semibold hover:scale-105 hover:shadow-amber-600 "
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Product Cards */}
      {selectedCategory && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleProductClick(product.id);
                  }
                }}
              >
                <img
                  src={product.image || product.images?.[0]}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-3"
                  loading="lazy"
                />
                <h3 className="font-semibold text-gray-900 text-lg">
                  {product.title}
                </h3>
                <p className="text-gray-700">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-white text-center col-span-full">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Category;