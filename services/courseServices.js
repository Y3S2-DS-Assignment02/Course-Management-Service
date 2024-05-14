const courseRepo = require("../database/repositories/courseRepository");
const { uploadImage } = require("./resourcesUploadServices");

const createCourse = async (
  title,
  description,
  instructor,
  price,
  duration
) => {
  try {
    // Validate input parameters
    if (!title || !description || !instructor || !price || !duration) {
      return {
        status: 400,
        message: "Failed to create course: Missing required parameters.",
      };
    }

    // Create course object
    const courseData = {
      title,
      description,
      instructor,
      price,
      duration,
      lessons: [],
    };

    // Call repository function to create course
    const newCourse = await courseRepo.createCourse(courseData);

    return {
      status: 200,
      message: "Course created successfully.",
      data: newCourse, // Return the newly created course object
    };
  } catch (error) {
    console.error("Error creating course:", error.message);
    return {
      status: 500,
      message: "Failed to create course: Internal server error.",
      error: error, // Return the error details
    };
  }
};

// Function to get all courses
const getAllCourses = async () => {
  try {
    const allCourses = await courseRepo.getAllCourses();
    return {
      status: 200,
      message: "Courses retrieved successfully.",
      data: allCourses,
    };
  } catch (error) {
    console.error("Error retrieving courses:", error.message);
    return {
      status: 500,
      message: "Failed to retrieve courses: Internal server error.",
      error: error,
    };
  }
};

// Function to get courses by approval status
const getCoursesByApproveStatus = async (isApproved) => {
  try {
    const courses = await courseRepo.getCoursesByApproveStatus(isApproved);
    return {
      status: 200,
      message: `Courses with approval status ${
        isApproved ? "approved" : "not approved"
      } retrieved successfully.`,
      data: courses,
    };
  } catch (error) {
    console.error(
      `Error retrieving ${isApproved ? "approved" : "not approved"} courses:`,
      error.message
    );
    return {
      status: 500,
      message: `Failed to retrieve ${
        isApproved ? "approved" : "not approved"
      } courses: Internal server error.`,
      error: error,
    };
  }
};

// Function to get courses by reject status
const getCoursesByRejectStatus = async (isRejected) => {
  try {
    const courses = await courseRepo.getCoursesByRejectStatus(isRejected);
    return {
      status: 200,
      message: `Courses with reject status ${
        isRejected ? "rejected" : "not rejected"
      } retrieved successfully.`,
      data: courses,
    };
  } catch (error) {
    console.error(
      `Error retrieving ${isRejected ? "rejected" : "not rejected"} courses:`,
      error.message
    );
    return {
      status: 500,
      message: `Failed to retrieve ${
        isRejected ? "rejected" : "not rejected"
      } courses: Internal server error.`,
      error: error,
    };
  }
};

// Function to get courses by instructor
const getCoursesByInstructor = async (instructorName) => {
  try {
    const courses = await courseRepo.getCoursesByInstructor(instructorName);
    return {
      status: 200,
      message: `Courses by instructor ${instructorName} retrieved successfully.`,
      data: courses,
    };
  } catch (error) {
    console.error(
      `Error retrieving courses by instructor ${instructorName}:`,
      error.message
    );
    return {
      status: 500,
      message: `Failed to retrieve courses by instructor ${instructorName}: Internal server error.`,
      error: error,
    };
  }
};

// Function to get course by ID
const getCourseById = async (courseId) => {
  try {
    const course = await courseRepo.getCourseById(courseId);
    if (!course) {
      return {
        status: 404,
        message: "Course not found.",
      };
    }
    return {
      status: 200,
      message: "Course retrieved successfully.",
      data: course,
    };
  } catch (error) {
    console.error("Error retrieving course:", error.message);
    return {
      status: 500,
      message: "Failed to retrieve course: Internal server error.",
      error: error,
    };
  }
};

// Function to update a course by ID
const updateCourseById = async (courseId, updatedCourseData) => {
  try {
    // Check if courseId is provided
    if (!courseId) {
      return {
        status: 400,
        message: "Failed to update course: Missing course ID.",
      };
    }

    // Check if updatedCourseData is provided
    if (!updatedCourseData) {
      return {
        status: 400,
        message: "Failed to update course: Missing updated course data.",
      };
    }

    const updatedCourse = await courseRepo.updateCourseById(
      courseId,
      updatedCourseData
    );

    if (!updatedCourse) {
      return {
        status: 404,
        message: "Course not found.",
      };
    }

    return {
      status: 200,
      message: "Course updated successfully.",
      data: updatedCourse,
    };
  } catch (error) {
    console.error("Error updating course:", error.message);
    return {
      status: 500,
      message: "Failed to update course: Internal server error.",
      error: error,
    };
  }
};

// Function to delete a course by ID
const deleteCourseById = async (courseId) => {
  try {
    // Check if courseId is provided
    if (!courseId) {
      return {
        status: 400,
        message: "Failed to delete course: Missing course ID.",
      };
    }

    const deletedCourse = await courseRepo.deleteCourseById(courseId);
    if (!deletedCourse) {
      return {
        status: 404,
        message: "Course not found.",
      };
    }

    return {
      status: 200,
      message: "Course deleted successfully.",
      data: deletedCourse,
    };
  } catch (error) {
    console.error("Error deleting course:", error.message);
    return {
      status: 500,
      message: "Failed to delete course: Internal server error.",
      error: error,
    };
  }
};

// Function to create a new lesson
const createLesson = async (courseId, lessonData) => {
  try {
    // Check if courseId is provided
    if (!courseId) {
      return {
        status: 400,
        message: "Failed to create lesson: Missing course ID.",
      };
    }

    // Check if lessonData is provided
    if (!lessonData) {
      return {
        status: 400,
        message: "Failed to create lesson: Missing lesson data.",
      };
    }

    // Call repository function to create lesson
    const newLesson = await courseRepo.createLesson(courseId, lessonData);

    return {
      status: 200,
      message: "Lesson created successfully.",
      data: newLesson,
    };
  } catch (error) {
    console.error("Error creating lesson:", error.message);
    return {
      status: 500,
      message: "Failed to create lesson: Internal server error.",
      error: error,
    };
  }
};

// Function to edit/update a lesson
const editLesson = async (courseId, lessonId, updatedLessonData) => {
  try {
    // Check if courseId and lessonId are provided
    if (!courseId || !lessonId) {
      return {
        status: 400,
        message: "Failed to edit lesson: Missing course ID or lesson ID.",
      };
    }

    // Check if updatedLessonData is provided
    if (!updatedLessonData) {
      return {
        status: 400,
        message: "Failed to edit lesson: Missing updated lesson data.",
      };
    }

    const updatedLesson = await courseRepo.editLesson(
      courseId,
      lessonId,
      updatedLessonData
    );
    if (!updatedLesson) {
      return {
        status: 404,
        message: "Lesson not found.",
      };
    }

    return {
      status: 200,
      message: "Lesson updated successfully.",
      data: updatedLesson,
    };
  } catch (error) {
    console.error("Error editing lesson:", error.message);
    return {
      status: 500,
      message: "Failed to edit lesson: Internal server error.",
      error: error,
    };
  }
};

// Function to delete a lesson
const deleteLesson = async (courseId, lessonId) => {
  try {
    // Check if courseId and lessonId are provided
    if (!courseId || !lessonId) {
      return {
        status: 400,
        message: "Failed to delete lesson: Missing course ID or lesson ID.",
      };
    }

    const deletedLesson = await courseRepo.deleteLesson(courseId, lessonId);
    if (!deletedLesson) {
      return {
        status: 404,
        message: "Lesson not found.",
      };
    }

    return {
      status: 200,
      message: "Lesson deleted successfully.",
      data: deletedLesson,
    };
  } catch (error) {
    console.error("Error deleting lesson:", error.message);
    return {
      status: 500,
      message: "Failed to delete lesson: Internal server error.",
      error: error,
    };
  }
};

// Function to create a new resource in a lesson
const createResource = async (
  courseId,
  lessonId,
  title,
  lecNotes,
  imagefile,
  videofile
) => {
  try {
    let imageurl = null;
    let videourl = null;

    // Check if courseId and lessonId are provided
    if (!courseId || !lessonId) {
      return {
        status: 400,
        message: "Failed to create resource: Missing course ID or lesson ID.",
      };
    }

    // Check if resourceData is provided
    if (!title && !lecNotes && !imagefile && !videofile) {
      return {
        status: 400,
        message: "Failed to create resource: Missing resource data.",
      };
    }
    if (imagefile) {
      //console.log("imagefile - ",imagefile)
      // Get the file name and file type from the image file
      //const { originalname, mimetype } = imagefile;
      const originalname = imagefile[0].originalname;
      const mimetype = imagefile[0].mimetype;

      //console.log("originalname",imagefile[0].originalname);
      //console.log("mimetype", imagefile.mimetype);

      const filename = originalname;
      const filetype = mimetype.split("/")[1];

      // Upload the image file and get the URL
      imageurl = await uploadImage(
        imagefile[0],
        courseId,
        lessonId,
        filetype,
        filename
      );
    }

    if (videofile) {
      // Get the file name and file type from the video file
      //const { originalname, mimetype } = videofile;
      //console.log("videofile - ",videofile)

      const originalname = videofile[0].originalname;
      const mimetype = videofile[0].mimetype;

      const filename = originalname;
      const filetype = mimetype.split("/")[1];

      // Upload the video file and get the URL
      videourl = await uploadImage(
        videofile[0],
        courseId,
        lessonId,
        filetype,
        filename
      );
    }

    const resourceData = {
      title: title || "",
      lecNotes: lecNotes || "",
      videoUrl: videourl || "",
      imageUrl: imageurl || "",
    };

    const newResource = await courseRepo.createResource(
      courseId,
      lessonId,
      resourceData
    );

    return {
      status: 200,
      message: "Resource created successfully.",
      data: newResource,
    };
  } catch (error) {
    console.error("Error creating resource:", error.message);
    return {
      status: 500,
      message: "Failed to create resource: Internal server error.",
      error: error,
    };
  }
};

// Function to edit/update a resource in a lesson
const editResource = async (
  courseId,
  lessonId,
  resourceId,
  title,
  lecNotes,
  imagefile,
  videofile
) => {
  try {
    let imageurl = null;
    let videourl = null;

    // Check if courseId, lessonId, and resourceId are provided
    if (!courseId || !lessonId || !resourceId) {
      return {
        status: 400,
        message:
          "Failed to edit resource: Missing course ID, lesson ID, or resource ID.",
      };
    }

    // Check if resourceData is provided
    if (!title && !lecNotes && !imagefile && !videofile) {
      return {
        status: 400,
        message: "Failed to create resource: Missing resource data.",
      };
    }

    if (imagefile) {
      //console.log("imagefile - ",imagefile)
      // Get the file name and file type from the image file
      //const { originalname, mimetype } = imagefile;
      const originalname = imagefile[0].originalname;
      const mimetype = imagefile[0].mimetype;

      //console.log("originalname",imagefile[0].originalname);
      //console.log("mimetype", imagefile.mimetype);

      const filename = originalname;
      const filetype = mimetype.split("/")[1];

      // Upload the image file and get the URL
      imageurl = await uploadImage(
        imagefile[0],
        courseId,
        lessonId,
        filetype,
        filename
      );
    }

    if (videofile) {
      // Get the file name and file type from the video file
      //const { originalname, mimetype } = videofile;
      //console.log("videofile - ",videofile)

      const originalname = videofile[0].originalname;
      const mimetype = videofile[0].mimetype;

      const filename = originalname;
      const filetype = mimetype.split("/")[1];

      // Upload the video file and get the URL
      videourl = await uploadImage(
        videofile[0],
        courseId,
        lessonId,
        filetype,
        filename
      );
    }

    const resourceData = {
      title: title || "",
      lecNotes: lecNotes || "",
      videoUrl: videourl || "",
      imageUrl: imageurl || "",
    };

    const updatedResource = await courseRepo.editResource(
      courseId,
      lessonId,
      resourceId,
      resourceData
    );

    if (!updatedResource) {
      return {
        status: 404,
        message: "Resource not found.",
      };
    }

    return {
      status: 200,
      message: "Resource updated successfully.",
      data: updatedResource,
    };
  } catch (error) {
    console.error("Error editing resource:", error.message);
    return {
      status: 500,
      message: "Failed to edit resource: Internal server error.",
      error: error,
    };
  }
};

// Function to delete a resource from a lesson
const deleteResource = async (courseId, lessonId, resourceId) => {
  try {
    // Check if courseId, lessonId, and resourceId are provided
    if (!courseId || !lessonId || !resourceId) {
      return {
        status: 400,
        message:
          "Failed to delete resource: Missing course ID, lesson ID, or resource ID.",
      };
    }

    const deletedResource = await courseRepo.deleteResource(
      courseId,
      lessonId,
      resourceId
    );
    if (!deletedResource) {
      return {
        status: 404,
        message: "Resource not found.",
      };
    }

    return {
      status: 200,
      message: "Resource deleted successfully.",
      data: deletedResource,
    };
  } catch (error) {
    console.error("Error deleting resource:", error.message);
    return {
      status: 500,
      message: "Failed to delete resource: Internal server error.",
      error: error,
    };
  }
};

// Function to add a new quiz to a lesson
const addQuiz = async (courseId, lessonId, quizData) => {
  try {
    // Check if courseId and lessonId are provided
    if (!courseId || !lessonId) {
      return {
        status: 400,
        message: "Failed to add quiz: Missing course ID or lesson ID.",
      };
    }

    // Check if quizData is provided
    if (!quizData) {
      return {
        status: 400,
        message: "Failed to add quiz: Missing quiz data.",
      };
    }

    const newQuiz = await courseRepo.addQuiz(courseId, lessonId, quizData);

    return {
      status: 200,
      message: "Quiz added successfully.",
      data: newQuiz,
    };
  } catch (error) {
    console.error("Error adding quiz:", error.message);
    return {
      status: 500,
      message: "Failed to add quiz: Internal server error.",
      error: error,
    };
  }
};

// Function to edit/update a quiz in a lesson
const editQuiz = async (courseId, lessonId, quizId, updatedQuizData) => {
  try {
    // Check if courseId, lessonId, and quizId are provided
    if (!courseId || !lessonId || !quizId) {
      return {
        status: 400,
        message:
          "Failed to edit quiz: Missing course ID, lesson ID, or quiz ID.",
      };
    }

    // Check if updatedQuizData is provided
    if (!updatedQuizData) {
      return {
        status: 400,
        message: "Failed to edit quiz: Missing updated quiz data.",
      };
    }

    const updatedQuiz = await courseRepo.editQuiz(
      courseId,
      lessonId,
      quizId,
      updatedQuizData
    );
    if (!updatedQuiz) {
      return {
        status: 404,
        message: "Quiz not found.",
      };
    }

    return {
      status: 200,
      message: "Quiz updated successfully.",
      data: updatedQuiz,
    };
  } catch (error) {
    console.error("Error editing quiz:", error.message);
    return {
      status: 500,
      message: "Failed to edit quiz: Internal server error.",
      error: error,
    };
  }
};

// Function to delete a quiz from a lesson
const deleteQuiz = async (courseId, lessonId, quizId) => {
  try {
    // Check if courseId, lessonId, and quizId are provided
    if (!courseId || !lessonId || !quizId) {
      return {
        status: 400,
        message:
          "Failed to delete quiz: Missing course ID, lesson ID, or quiz ID.",
      };
    }

    const deletedQuiz = await courseRepo.deleteQuiz(courseId, lessonId, quizId);
    if (!deletedQuiz) {
      return {
        status: 404,
        message: "Quiz not found.",
      };
    }

    return {
      status: 200,
      message: "Quiz deleted successfully.",
      data: deletedQuiz,
    };
  } catch (error) {
    console.error("Error deleting quiz:", error.message);
    return {
      status: 500,
      message: "Failed to delete quiz: Internal server error.",
      error: error,
    };
  }
};

// Function to add a new quiz question to a quiz
const addQuizQuestion = async (courseId, lessonId, quizId, questionData) => {
  try {
    // Check if courseId, lessonId, and quizId are provided
    if (!courseId || !lessonId || !quizId) {
      return {
        status: 400,
        message:
          "Failed to add quiz question: Missing course ID, lesson ID, or quiz ID.",
      };
    }

    // Check if questionData is provided
    if (!questionData) {
      return {
        status: 400,
        message: "Failed to add quiz question: Missing question data.",
      };
    }

    const newQuestion = await courseRepo.addQuizQuestion(
      courseId,
      lessonId,
      quizId,
      questionData
    );

    return {
      status: 200,
      message: "Quiz question added successfully.",
      data: newQuestion,
    };
  } catch (error) {
    console.error("Error adding quiz question:", error.message);
    return {
      status: 500,
      message: "Failed to add quiz question: Internal server error.",
      error: error,
    };
  }
};

// Function to edit/update a quiz question in a quiz
const editQuizQuestion = async (
  courseId,
  lessonId,
  quizId,
  questionId,
  updatedQuestionData
) => {
  try {
    // Check if courseId, lessonId, quizId, and questionId are provided
    if (!courseId || !lessonId || !quizId || !questionId) {
      return {
        status: 400,
        message:
          "Failed to edit quiz question: Missing course ID, lesson ID, quiz ID, or question ID.",
      };
    }

    // Check if updatedQuestionData is provided
    if (!updatedQuestionData) {
      return {
        status: 400,
        message: "Failed to edit quiz question: Missing updated question data.",
      };
    }

    const updatedQuestion = await courseRepo.editQuizQuestion(
      courseId,
      lessonId,
      quizId,
      questionId,
      updatedQuestionData
    );
    if (!updatedQuestion) {
      return {
        status: 404,
        message: "Quiz question not found.",
      };
    }

    return {
      status: 200,
      message: "Quiz question updated successfully.",
      data: updatedQuestion,
    };
  } catch (error) {
    console.error("Error editing quiz question:", error.message);
    return {
      status: 500,
      message: "Failed to edit quiz question: Internal server error.",
      error: error,
    };
  }
};

// Function to delete a quiz question from a quiz
const deleteQuizQuestion = async (courseId, lessonId, quizId, questionId) => {
  try {
    // Check if courseId, lessonId, quizId, and questionId are provided
    if (!courseId || !lessonId || !quizId || !questionId) {
      return {
        status: 400,
        message:
          "Failed to delete quiz question: Missing course ID, lesson ID, quiz ID, or question ID.",
      };
    }

    const deletedQuestion = await courseRepo.deleteQuizQuestion(
      courseId,
      lessonId,
      quizId,
      questionId
    );
    if (!deletedQuestion) {
      return {
        status: 404,
        message: "Quiz question not found.",
      };
    }

    return {
      status: 200,
      message: "Quiz question deleted successfully.",
      data: deletedQuestion,
    };
  } catch (error) {
    console.error("Error deleting quiz question:", error.message);
    return {
      status: 500,
      message: "Failed to delete quiz question: Internal server error.",
      error: error,
    };
  }
};

module.exports = {
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
  addQuiz,
  editQuiz,
  deleteQuiz,
  addQuizQuestion,
  editQuizQuestion,
  deleteQuizQuestion,
};
