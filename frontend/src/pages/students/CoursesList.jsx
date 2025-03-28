import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/students/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/students/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/students/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext); 
  const { input } = useParams();

  const [filterCourses, setFilterCourses] = useState([]); // fixed typo here

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      // Fixed method names: toLowerCase() and includes()
      if (input) {
        setFilterCourses(
          tempCourses.filter(item =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        );
      } else {
        setFilterCourses(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left max-w-6xl mx-auto p-6">
        {/* Heading Section */}
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500 mt-1">
              <span 
                className="text-blue-600 cursor-pointer hover:underline" 
                onClick={() => navigate('/')}
              >
                Home
              </span> 
              {' '} / <span className="text-gray-700">Course List</span>
            </p>
          </div>

          {/* Search Bar Section */}
          <SearchBar data={input} />
        </div>

        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600'>
          <p>{input}</p>
          <img src={assets.cross_icon} alt='' className='cursor-pointer' onClick={() => navigate('/course-list')} />
          </div>
        }

        {/* Course List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  my-16 gap-6 mt-8">
          {filterCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
