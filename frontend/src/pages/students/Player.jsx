import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  // Fetch course data
  useEffect(() => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    if (course) setCourseData(course);
  }, [enrolledCourses, courseId]);

  // Toggle section visibility
  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left Column - Course Structure */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold text-gray-800">Course Structure</h2>
          <div>
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
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
                          <img
                            src={false ? assets.blue_tick_icon : assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div>
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 text-sm text-gray-500">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ["h", "m"],
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 py-3 mt-10">
                <h1 className="text-xl text-gray-500 font-semibold">Rate this course:</h1>
                <Rating initialRating={0} />
              </div>
          </div>
        </div>

        {/* Right Column - Video Player */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
            <YouTube
              videoId={playerData.lectureUrl.split("/").pop()}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
            <div className="flex justify-between items-center mt-1">
              <p>{playerData.chapter}.{playerData.lecture}{playerData.lectureTitle}</p>
              <button className="text-blue-600">{false ? 'Completed' : 'Mark Complete'}</button>
            </div>
            </div>
          ) : courseData?.courseThumbnail ? (
            <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-80 h-44 rounded-lg shadow-lg" />
          ) : (
            <p className="text-center text-gray-500">Select a lecture to play</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
