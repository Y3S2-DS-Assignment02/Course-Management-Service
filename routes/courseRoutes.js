const express = require("express");
const multer = require("multer");
const {
  createCourse,
  getAllCourses,
  getCoursesByApproveStatus,
  getCoursesByRejectStatus,
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
  approveOrRejecteCourse,
  createQuiz,
  editQuiz,
  deleteQuiz,
  createQuizQuestion,
  editQuizQuestion,
  deleteQuizQuestion,
} = require("../controllers/courseController");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roleList");
const verifyJWT = require("../middleware/verifyJWT");
const upload = multer();
const router = express.Router();

router.post(
  "/courses",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  createCourse
);

router.get("/courses", getAllCourses);
router.get("/courses/approved/:isApproved", getCoursesByApproveStatus);
router.get("/courses/reject/:isRejected", getCoursesByRejectStatus);
router.get("/courses/instructor/:instructor", getCoursesByInstructor);
router.get("/courses/:courseId", getCourseById);

router.patch(
  "/courses/:courseId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  updateCourseById
);
router.patch("/courses/approveOrRejecte/:courseId", approveOrRejecteCourse);
router.delete(
  "/courses/:courseId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  deleteCourseById
);

// -------------------- lesson
router.post(
  "/lesson",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  createLesson
);
router.patch(
  "/lesson/:courseId/:lessonId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  editLesson
);
router.delete(
  "/lesson/:courseId/:lessonId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  deleteLesson
);

// -------------------- resources
router.post(
  "/resource",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  createResource
);
router.patch(
  "/resource/:courseId/:lessonId/:resourceId",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "videofile", maxCount: 1 },
  ]),
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  editResource
);
router.delete(
  "/resource/:courseId/:lessonId/:resourceId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  deleteResource
);

//-------------------- quiz
router.post("/quiz", verifyJWT, verifyRoles(ROLES_LIST.INSTRUCTOR), createQuiz);
router.patch(
  "/quiz/:courseId/:lessonId/:quizId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  editQuiz
);
router.delete(
  "/quiz/:courseId/:lessonId/:quizId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  deleteQuiz
);

//-------------------- quiz question
router.post(
  "/quizQuestion",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  createQuizQuestion
);
router.patch(
  "/quizQuestion/:courseId/:lessonId/:quizId/:questionId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  editQuizQuestion
);
router.delete(
  "/quizQuestion/:courseId/:lessonId/:quizId/:questionId",
  verifyJWT,
  verifyRoles(ROLES_LIST.INSTRUCTOR),
  deleteQuizQuestion
);

module.exports = router;
