import { clerkClient } from "@clerk/express";
import Course from "../models/CourseModel.js";
import {v2 as cloudinary} from 'cloudinary';
import  User  from "../models/UserModel.js";

// Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    // Check if authentication exists
    if (!req.auth || !req.auth.userId) {
      return res
        .status(400)
        .json({ success: false, message: "User is not authenticated" });
    }

    const userId = req.auth.userId;

    // Debugging: Log userId to verify it's retrieved correctly
    console.log("Updating role for userId:", userId);

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    console.error("Error updating role:", error.message); // Log error

    res.json({ success: false, message: error.message });
  }
};


// Add new course
export const addCourse = async(req, res) => {
  try {
    const {courseData} = req.body
    const imageFile = req.file
    const educatorId = req.auth.userId

    if(!imageFile){
      return res.json({success: false, message: 'Thumbnail  Not Attached'})
    }

    const parsedCourseData = await JSON.parse(courseData)
    parsedCourseData.educator = educatorId
     const newCourse = await Course.create(parsedCourseData)
     const imageUpload = await cloudinary.uploader.upload(imageFile.path)
     newCourse.courseThumbnail = imageUpload.secure_url
     await newCourse.save()

     res.json({success: true, message: 'Course Added'})
    
  } catch (error) {
    res.json({success: false, message: error.message})


    
  }
}


// Get Educator Courses
export const getEducatorCourses = async(req, res) => {
  try {
    const educator = req.auth.userId
    
    const courses = await Course.find({educator})
    res.json({success: true, courses})

    
  } catch (error) {
    res.json({success: false, message: error.message})

    
  }
}

// Get Educator Dashboard Data (Total Earning, Enrolled Students, No. of Courses)
export const educatorDashboardData = async() => {
  try {
    const educator = req.auth.userId
    
    const courses = await Course.find({educator})
    const totalCourses = courses.length
    const courseIds = courses.map(course => course._id)

    // Calculate total earnings from purchase
    const purchase = await Purchase.find({
      courseId: {$in: courseIds},
      status: 'completed'
    });

    const totalEarnings = purchase.reduce((sum, purchase) => sum + purchase.amount, 0);

    // Collect unique enrolled student IDs with their course titles
    const enrolledStudentsData = [];
    for(const course of courses){
      const  students = await User.find({
        _id: {$in: course.enrolledStudents}
      }, 'name imageUrl');

      students.forEach(student => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student
        })
      })
    }
    res.json({success: true, dashboardData: {
      totalEarnings, enrolledStudentsData, totalCourses
    }})


    
  } catch (error) {
    res.json({success: false, message: error.message})

    
  }

}

// Get Students Enrolled Data with Purchased data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map(course => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    return res.json({ success: true, enrolledStudents });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



