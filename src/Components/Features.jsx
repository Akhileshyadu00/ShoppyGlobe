import React from 'react';
import { Clock, Lock, RotateCcw, Truck } from 'lucide-react';

const features = [
  { icon: Truck, text: 'Free Shipping', subtext: 'On orders over Rs.100' },
  { icon: Lock, text: 'Secure Payment', subtext: '100% protected payment' },
  { icon: RotateCcw, text: 'Easy Return', subtext: '30-days return policy' },
  { icon: Clock, text: '24/7 Support', subtext: 'Dedicated customer services' },
];

function Features() {
  return (
    <div className="bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center sm:flex-row sm:text-left bg-white shadow-md p-6 rounded-lg transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <feature.icon className="h-10 w-10 text-red-500 mb-4 sm:mb-0 sm:mr-4" aria-hidden="true" />
              <div>
                <p className="text-lg font-semibold text-gray-800">{feature.text}</p>
                <p className="mt-1 text-sm text-gray-500">{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;