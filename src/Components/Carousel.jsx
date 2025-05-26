import React, { useEffect } from "react";
import { useData } from "../Utils/useProducts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category";

function Carousel() {
  const { data, fetchProduct } = useData();

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
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="max-w-screen-xl mx-auto my-6 min-h-[600px] px-4">
      <Slider {...settings}>
        {data &&
          data.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-r from-[#0f0c27] via-[#330b26] to-[#0f0c27] text-white py-12 px-6 rounded-xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl space-y-5 text-center md:text-left">
                  <h2 className="text-2xl font-bold">🔥 Trending Now</h2>
                  <h3 className="text-3xl font-extrabold text-yellow-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {item.description?.slice(0, 120)}...
                  </p>
                  <p className="text-xl font-semibold text-red-400">
                    ${item.price}
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md shadow-md transition transform hover:scale-105">
                    Shop Now
                  </button>
                </div>
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.title}
                  className="w-64 h-64 object-contain rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
      </Slider>

      <Category />
    </div>
  );
}

export default Carousel;
