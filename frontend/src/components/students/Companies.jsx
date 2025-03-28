import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  return (
    <div className="py-10 px-4 sm:px-8 md:px-16">
      <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6">
        Trusted by learners from
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <img
          src={assets.microsoft_logo}
          alt="Microsoft"
          className="w-20 md:w-28 hover:scale-110 transition-all duration-300"
        />
        <img
          src={assets.walmart_logo}
          alt="Walmart"
          className="w-20 md:w-28 hover:scale-110 transition-all duration-300"
        />
        <img
          src={assets.adobe_logo}
          alt="Adobe"
          className="w-20 md:w-28 hover:scale-110 transition-all duration-300"
        />
        <img
          src={assets.paypal_logo}
          alt="PayPal"
          className="w-20 md:w-28 hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default Companies;
