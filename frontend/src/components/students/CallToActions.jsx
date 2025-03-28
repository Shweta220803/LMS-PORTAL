import React from 'react';
import { assets } from '../../assets/assets';

const CallToActions = () => {
  return (
    <div className="text-center bg-gradient-to-r from-blue-100 to-cyan-100 py-12 px-6 md:px-16 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Learn Anything, Anytime, Anywhere
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Unlock limitless learning opportunities with expert educators.
      </p>

      {/* Buttons Section */}
      <div className="flex justify-center gap-4">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-800 transition">
          Get Started
        </button>
        <button className="flex items-center gap-2 bg-white text-blue-700 border border-blue-700 px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-100 transition">
          Learn More
          <img src={assets.arrow_icon} alt="arrow-icon" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CallToActions;
