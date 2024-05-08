const express = require("express");
const multer = require("multer");
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
const verifyRoles = require("../middleware/verifyRoles")
const ROLES_LIST = require("../config/roleList")

const upload = multer();
const router = express.Router();

router.post("/courses", createCourse);
router.get("/courses", verifyRoles(ROLES_LIST.INSTRUCTOR) , getAllCourses);
router.get("/courses/approved/:isApproved", getCoursesByApproveStatus);
router.get("/courses/instructor/:instructor", getCoursesByInstructor);
router.get("/courses/:courseId", getCourseById);
router.patch("/courses/:courseId", updateCourseById);
router.delete("/courses/:courseId", deleteCourseById);

router.post("/lesson", createLesson);
router.patch("/lesson/:courseId/:lessonId", editLesson);
router.delete("/lesson/:courseId/:lessonId", deleteLesson);

router.post(
  "/resource",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  createResource
);
router.patch(
  "/resource/:courseId/:lessonId/:resourceId",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  editResource
);
router.delete("/resource/:courseId/:lessonId/:resourceId", deleteResource);

module.exports = router;
