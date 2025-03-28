import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";


const CourseCard = ({ course }) => {
  // Destructure 'currency' from the AppContext

  const { currency, calculateRating } = useContext(AppContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0,0)} className='border border-gray-500/30 pb-6 overflow-hidden'>

      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 text-left">
        <h3 className="text-xl font-semibold text-gray-800">
          {course.courseTitle}
        </h3>
        <p className="text-gray-600">{course.educator.name} Edulearn</p>

        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <p className="text-yellow-500 text-sm">{calculateRating(course)}</p>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor (calculateRating(course)) ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-1">
          Total number of ratings: {course.courseRatings.length}
        </p>

        {/* Price Section */}
        <p className="text-lg font-bold text-gray-800 mt-4">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
      </Link>

    </div>
  );
};

export default CourseCard;
