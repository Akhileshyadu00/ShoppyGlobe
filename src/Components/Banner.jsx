import React from 'react';

//import l1 from '../assets/l1.jpg';
import l1 from '../assets/l1.jpg'

function Banner() {
  return (
    <div className="bg-gray-100 py-12 md:py-24">
      <div
        className="relative max-w-7xl mx-auto h-[550px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${l1})`,
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      >
        {/* Overlay */}
        <div className=" inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Electronics</h1>
          <p className="text-lg md:text-xl">Rediscover the latest tech innovations</p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;