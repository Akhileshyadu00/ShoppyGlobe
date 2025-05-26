import React, { useEffect } from "react";
import { useData } from "../Utils/useProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

// Custom Arrows (inside the carousel container)
function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
      aria-label="Previous"
    >
      <svg
        className="w-6 h-6 text-black"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
      aria-label="Next"
    >
      <svg
        className="w-6 h-6 text-black"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function Carousel() {
  const { data, fetchProduct } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleShopNow = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto my-6 min-h-[600px] px-4">
      <div className="relative">
        <Slider {...settings}>
          {data &&
            data.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className=" text-black py-12 px-6 rounded-xl h-[600px]"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 h-full">
                  <div className="max-w-xl space-y-5 text-center md:text-left flex flex-col justify-center h-full">
                    <h2 className="text-2xl text-orange-600 font-bold">🔥 Trending Now</h2>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {item.description?.slice(0, 120)}...
                    </p>
                    <p className="text-xl font-semibold text-red-400">
                      ${item.price}
                    </p>
                    <button
                      onClick={() => handleShopNow(item.id)}
                      className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-teal-700 transition transform hover:scale-105 cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.title}
                  
                    className="w-64 h-64 object-contain rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <Category />
    </div>
  );
}

export default Carousel;
