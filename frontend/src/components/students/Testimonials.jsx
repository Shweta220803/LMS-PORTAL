import React from 'react';
import { assets, dummyTestimonial } from '../../assets/assets';

const Testimonials = () => {
  return (
    <div className="py-12 px-6 md:px-16 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Testimonials</h1>
      <p className="text-lg text-gray-600 mb-10">Hear from our learners about their experiences!</p>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {dummyTestimonial.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
            
            {/* Image & Name Section */}
            <div className="flex items-center gap-4">
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-gray-300" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{testimonial.name}</h2>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <img 
                  key={i} 
                  src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                  alt="star" 
                  className="w-5 h-5"
                />
              ))}
            </div>

            {/* Feedback Section */}
            <p className="mt-4 text-gray-700 italic">"{testimonial.feedback}"</p>
            
            {/* Read More Link (Fixed) */}
            <a href="#" className="text-red-500 hover:underline font-medium mt-2 inline-block">Read More</a>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
