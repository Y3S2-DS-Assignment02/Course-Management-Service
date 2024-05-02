const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCoursesByApproveStatus,
  getCoursesByInstructor,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createLesson,
  editLesson,
  deleteLesson,
  createResource,
  editResource,
  deleteResource,
} = require("../controllers/courseController");


const router = express.Router();

router.post('/courses', createCourse);
router.get('/courses', getAllCourses);
router.get('/courses/approved/:isApproved', getCoursesByApproveStatus);
router.get('/courses/instructor/:instructor', getCoursesByInstructor);
router.get('/courses/:courseId', getCourseById);
router.put('/courses/:courseId', updateCourseById);
router.delete('/courses/:courseId', deleteCourseById);

router.post('/lesson', createLesson);
router.put('/lesson/:courseId/:lessonId', editLesson);
router.delete('/lesson/:courseId/:lessonId', deleteLesson);

router.post('/resource', createResource);
router.put('/resource/:courseId/:lessonId/:resourceId', editResource);
router.delete('/resource/:courseId/:lessonId/:resourceId', deleteResource);

module.exports = router;