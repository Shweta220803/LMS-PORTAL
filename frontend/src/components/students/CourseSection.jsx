import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const {allCourses} = useContext(AppContext)
  return (
    <div className="py-10 px-4 sm:px-8 md:px-16 bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-lg shadow-lg">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-4">
        Learn from the Best
      </h2>
      <p className="text-lg sm:text-xl text-center text-gray-600 mb-6">
        Discover our top-rated courses
      </p>
      <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0,4).map((course, index)=> <CourseCard key={index} course={course} />)}
      </div>

      <div className="text-center">
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="inline-block text-blue-700 font-semibold text-lg hover:text-blue-900 transition-colors duration-300"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
