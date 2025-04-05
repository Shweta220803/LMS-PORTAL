import express from 'express'
import upload from '../config/multer.js'
import { addCourse, getEducatorCourses, updateRoleToEducator,educatorDashboardData, getEnrolledStudentsData } from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Add Educator Role
router.post('/update-role' ,updateRoleToEducator)

router.post('/add-course', upload.single('image'), protectEducator, addCourse)

router.get('/courses', protectEducator, getEducatorCourses)
router.get('/dashboard', protectEducator, educatorDashboardData)

router.get('/enrolled-students', protectEducator, getEnrolledStudentsData)







export default router