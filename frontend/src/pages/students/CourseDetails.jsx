import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from '../../components/students/Footer'
import YouTube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  const { currency, allCourses, calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext);

  const fetchCourseData = async() => {
    const findCourse = allCourses.find(course => course._id === id);
    setCourseData(findCourse);
  };
  useEffect(() => {
    fetchCourseData()
  }, [allCourses])

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
    <div className="flex flex-col md:flex-row gap-10 px-8 md:px-20 py-16 w-full max-w-6xl mx-auto">
      {/* Left Column - Course Details */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">{courseData.courseTitle}</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {courseData.courseDescription.length > 200
            ? `${courseData.courseDescription.slice(0, 200)}... `
            : courseData.courseDescription}
        </p>
        {courseData.courseDescription.length > 200 && (
          <button className="text-blue-600 text-sm mt-2">Read more</button>
        )}

        {/* Course Rating */}
        <div className="flex items-center gap-4">
          <p className="text-yellow-500 text-xl font-bold">{calculateRating(courseData)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                alt="star"
                className="w-5 h-5"
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
          </p>
        </div>
        
        <p className="text-gray-600 text-sm">
          {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "students" : "student"} enrolled
        </p>

        {/* Course Structure */}
        <h2 className="text-xl font-semibold mt-6">Course Structure</h2>
        <div>
          {courseData.courseContent.map((chapter, index) => (
            <div key={index} className="border border-gray-300 rounded mb-3 bg-cyan-100">
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={assets.down_arrow_icon}
                    alt="arrow icon"
                    className={`w-4 h-4 transition-transform ${openSections[index] ? "rotate-180" : "rotate-0"}`}
                  />
                  <p className="font-medium text-base">{chapter.chapterTitle}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                </p>
              </div>
              {openSections[index] && (
                <ul className="list-disc pl-8 pr-4 py-2 text-gray-600 border-t border-gray-300">
                  {chapter.chapterContent.map((lecture, i) => (
                    <li key={i} className="flex items-start gap-2 py-1">
                      <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                      <div>
                        <p>{lecture.lectureTitle}</p>
                        <div className="flex gap-2 text-sm text-gray-500">
                          {lecture.isPreviewFree && <p
                          onClick={() => setPlayerData({
                            videoId: lecture.lectureUrl.split('/').pop()

                          })}
                           className="text-blue-500 cursor-pointer">Preview</p>}
                          <p>
                            {humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Course Pricing */}
      <div className="w-full md:w-1/3 flex flex-col items-center p-4 rounded-lg shadow-md bg-white">
        {/* {courseData.courseThumbnail && ( */}
          
            {
          playerData ? <YouTube videoId={playerData.videoId}  opts={{playerVars: {autoplay: 1}}} iframeClassName="w-full aspect-video" />
           :  
           <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-80 h-50 object-cover rounded-lg shadow-md" />

        }

          
        {/* )} */}

        <div className="pt-5 flex items-center gap-2">
        {
          playerData ? <YouTube videoId={playerData.videoId}  opts={{playerVars: {autoplay: 1}}} iframeClassName="w-full aspect-video" />
           :   <img src={assets.time_left_clock_icon} alt="time left Clock Icon" className="w-4 h-4" />

        }
          <p className="text-sm text-gray-700">
            <span className="font-bold">5 days</span> left at this price
          </p>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-gray-800 text-2xl md:text-4xl font-semibold">{currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
          <p className="text-gray-500 text-lg line-through">{currency}{courseData.coursePrice}</p>
          <p className="text-gray-600 text-lg">{courseData.discount}% off</p>
        </div>
        
        <div className="flex items-center text-sm md:text-default gap-4 pt-4 text-gray-500">
          <div className="flex items-center gap-1">
            <img src={assets.star} alt="star icon" />
            <p>{calculateRating(courseData)}</p>
          </div>
          <div className="h-4 w-px bg-gray-500/40"></div>
          <div className="flex items-center gap-1">
            <img src={assets.time_clock_icon} alt="clock icon" />
            <p>{calculateCourseDuration(courseData)}</p>
          </div>
          <div className="flex items-center gap-1">
            <img src={assets.time_clock_icon} alt="clock icon" />
            <p>{calculateNoOfLectures(courseData)} lessons</p>
          </div>
        </div>
        <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
        <div>
          <p className="md:text-xl text-lg font-medium text-gray-500">What's in the course ?</p>
          <ul className="ml-4 text-sm md:text-default list-disc text-gray-500">
            <li>Lifetime access with free updates.</li>
            <li>Step-by-step,hands-on project guidance .</li>
            <li>Downloadable resources and source code.</li>
            <li>Quizzes to test your knowledge.</li>
            <li>Certificate of completion.</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
</>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
