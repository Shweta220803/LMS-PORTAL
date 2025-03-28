import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
// import Companies from "./Companies";
// import CourseSection from "./CourseSection";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
      {/* Hero Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">
        Empower Your Future with Education <span className="text-blue-700"><img src={assets.sketch} alt="sketch" className="md:block hidden absolute-bottom-7 right-0"></img></span>
      </h1>

      {/* Hero Description */}
      <p className="text-lg sm:text-xl max-w-2xl mb-6">
        Unlock limitless learning opportunities. Gain new skills, explore
        knowledge, and build a brighter future with our expert-led courses.
      </p>

      <SearchBar />
      {/* <Companies />
      <CourseSection /> */}

    </div>
  );
};

export default Hero;
