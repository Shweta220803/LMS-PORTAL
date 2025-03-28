import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo & About */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            <img src={assets.logo} alt="EduLearn Logo" className="w-12 h-12" />
            <h2 className="text-2xl font-bold text-white">EduLearn</h2>
          </div>
          <p className="text-sm text-gray-400">
            Empowering learners with quality education anytime, anywhere.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Courses", "About Us", "Contact"].map((link, index) => (
              <li key={index}>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Info & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <div className="flex items-center space-x-2">
            <i className="fas fa-envelope text-blue-400"></i>
            <p className="text-sm text-gray-400">support@edulearn.com</p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <i className="fas fa-phone text-blue-400"></i>
            <p className="text-sm text-gray-400">+1 (234) 567-890</p>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            {[
              { icon: "fab fa-facebook-f", href: "#" },
              { icon: "fab fa-twitter", href: "#" },
              { icon: "fab fa-linkedin-in", href: "#" },
              { icon: "fab fa-instagram", href: "#" },
            ].map((social, index) => (
              <a key={index} href={social.href} className="text-gray-400 hover:text-blue-400 transition duration-300 text-lg">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get the latest updates & offers.</p>
          <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-800 text-gray-300 outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-3 text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} EduLearn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
