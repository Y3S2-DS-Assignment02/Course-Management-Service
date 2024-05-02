const Course = require("../models/courseModel");

//////////////////////////////////////////////// Courses ////////////////////////////////////////////////

// Function to create courses
const createCourse = async (course) => {
  try {
    const newCourse = new Course(course);
    return await newCourse.save();
  } catch (error) {
    console.log(error);
    throw new Error("Error creating course");
  }
};

// Function to get all courses
const getAllCourses = async () => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching courses");
  }
};

// Function to get courses by approval status
const getCoursesByApproveStatus = async (status) => {
  try {
    const courses = await Course.find({ isApproved: status });
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching courses by approval status");
  }
};

// Function to get courses by instructor
const getCoursesByInstructor = async (instructorId) => {
  try {
    const courses = await Course.find({ instructor: instructorId });
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching courses by instructor");
  }
};

// Function to get a course by its ID
const getCourseById = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    return course;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching course by ID");
  }
};

// Function to update a course
const updateCourseById = async (courseId, updatedCourseData) => {
  try {
    // Find the course by its ID
    let course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Update simple properties of the course (title, description, etc.)
    course.title = updatedCourseData.title || course.title;
    course.description = updatedCourseData.description || course.description;
    course.instructor = updatedCourseData.instructor || course.instructor;
    course.price = updatedCourseData.price || course.price;
    course.duration = updatedCourseData.duration || course.duration;
    course.isApproved = updatedCourseData.isApproved || course.isApproved;

    // Save the updated course
    await course.save();

    return course;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating course");
  }
};

// Function to delete a course
const deleteCourseById = async (courseId) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    return deletedCourse;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting course");
  }
};

//////////////////////////////////////////////// Lesson ////////////////////////////////////////////////

// Function to add a new lesson to a course
const createLesson = async (courseId, lessonData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Create a new lesson based on the lesson data
    const newLesson = {
      title: lessonData.title,
      description: lessonData.description,
      resources: [], // Optional: if resources are provided
      quizzes: [], // Optional: if quizzes are provided
    };

    // Add the new lesson to the course's lessons array
    course.lessons.push(newLesson);

    // Save the course with the new lesson added
    await course.save();

    return newLesson; // Return the newly created lesson
  } catch (error) {
    console.log(error);
    throw new Error("Error creating lesson");
  }
};

// Function to edit/update a lesson in a course
const editLesson = async (courseId, lessonId, updatedLessonData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson index in the lessons array
    const lessonIndex = course.lessons.findIndex(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (lessonIndex === -1) {
      throw new Error("Lesson not found");
    }

    // Update the lesson data with the provided updatedLessonData
    const lessonToUpdate = course.lessons[lessonIndex];
    lessonToUpdate.title = updatedLessonData.title || lessonToUpdate.title;
    lessonToUpdate.description =
      updatedLessonData.description || lessonToUpdate.description;

    // Save the course with the updated lesson
    await course.save();

    return lessonToUpdate;
  } catch (error) {
    console.log(error);
    throw new Error("Error editing lesson");
  }
};

// Function to delete a lesson from a course
const deleteLesson = async (courseId, lessonId) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the index of the lesson in the lessons array
    const lessonIndex = course.lessons.findIndex(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (lessonIndex === -1) {
      throw new Error("Lesson not found");
    }

    // Remove the lesson from the lessons array
    const deletedLesson = course.lessons.splice(lessonIndex, 1)[0];

    // Save the course with the lesson removed
    await course.save();

    return deletedLesson;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting lesson");
  }
};

//////////////////////////////////////////////// Resource ////////////////////////////////////////////////

// Function to create a new resource in a lesson
const createResource = async (courseId, lessonId, resourceData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Create a new resource based on the provided resource data
    const newResource = {
      title: resourceData.title || "",
      lecNotes: resourceData.lecNotes || "",
      videoUrl: resourceData.videoUrl || "",
      imageUrl: resourceData.imageUrl || "",
    };

    // Add the new resource to the lesson's resources array
    lesson.resources.push(newResource);

    // Save the course with the new resource added
    await course.save();

    return newResource;
  } catch (error) {
    console.error("Error creating resource:", error.message);
    throw new Error("Error creating resource");
  }
};

// Function to edit/update a resource in a lesson
const editResource = async (
  courseId,
  lessonId,
  resourceId,
  updatedResourceData
) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the index of the resource in the lesson's resources array
    const resourceIndex = lesson.resources.findIndex(
      (resource) => resource._id.toString() === resourceId
    );
    if (resourceIndex === -1) {
      throw new Error("Resource not found");
    }

    // Update the resource with the provided updatedResourceData
    const resourceToUpdate = lesson.resources[resourceIndex];
    resourceToUpdate.title =
      updatedResourceData.title || resourceToUpdate.title;
    resourceToUpdate.lecNotes =
      updatedResourceData.lecNotes || resourceToUpdate.lecNotes;
    resourceToUpdate.videoUrl =
      updatedResourceData.videoUrl || resourceToUpdate.videoUrl;
    resourceToUpdate.imageUrl =
      updatedResourceData.imageUrl || resourceToUpdate.imageUrl;

    // Save the course with the updated resource
    await course.save();

    return resourceToUpdate;
  } catch (error) {
    console.error("Error editing resource:", error.message);
    throw new Error("Error editing resource");
  }
};

// Function to delete a resource from a lesson
const deleteResource = async (courseId, lessonId, resourceId) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the index of the resource in the lesson's resources array
    const resourceIndex = lesson.resources.findIndex(
      (resource) => resource._id.toString() === resourceId
    );
    if (resourceIndex === -1) {
      throw new Error("Resource not found");
    }

    // Remove the resource from the lesson's resources array
    const deletedResource = lesson.resources.splice(resourceIndex, 1)[0];

    // Save the course with the resource removed
    await course.save();

    return deletedResource;
  } catch (error) {
    console.error("Error deleting resource:", error.message);
    throw new Error("Error deleting resource");
  }
};

//////////////////////////////////////////////// Quiz ////////////////////////////////////////////////

// Function to add a new quiz to a lesson
const addQuiz = async (courseId, lessonId, quizData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Create a new quiz based on the provided quiz data
    const newQuiz = {
      title: quizData.title,
      questions: quizData.questions || [],
    };

    // Add the new quiz to the lesson's quizzes array
    lesson.quizzes.push(newQuiz);

    // Save the course with the new quiz added
    await course.save();

    return newQuiz;
  } catch (error) {
    console.error("Error adding quiz:", error.message);
    throw new Error("Error adding quiz");
  }
};

// Function to edit/update a quiz in a lesson
const editQuiz = async (courseId, lessonId, quizId, updatedQuizData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the index of the quiz in the lesson's quizzes array
    const quizIndex = lesson.quizzes.findIndex(
      (quiz) => quiz._id.toString() === quizId
    );
    if (quizIndex === -1) {
      throw new Error("Quiz not found");
    }

    // Update the quiz with the provided updatedQuizData
    const quizToUpdate = lesson.quizzes[quizIndex];
    quizToUpdate.title = updatedQuizData.title || quizToUpdate.title;
    quizToUpdate.questions =
      updatedQuizData.questions || quizToUpdate.questions;

    // Save the course with the updated quiz
    await course.save();

    return quizToUpdate;
  } catch (error) {
    console.error("Error editing quiz:", error.message);
    throw new Error("Error editing quiz");
  }
};

// Function to delete a quiz from a lesson
const deleteQuiz = async (courseId, lessonId, quizId) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the index of the quiz in the lesson's quizzes array
    const quizIndex = lesson.quizzes.findIndex(
      (quiz) => quiz._id.toString() === quizId
    );
    if (quizIndex === -1) {
      throw new Error("Quiz not found");
    }

    // Remove the quiz from the lesson's quizzes array
    const deletedQuiz = lesson.quizzes.splice(quizIndex, 1)[0];

    // Save the course with the quiz removed
    await course.save();

    return deletedQuiz;
  } catch (error) {
    console.error("Error deleting quiz:", error.message);
    throw new Error("Error deleting quiz");
  }
};

//////////////////////////////////////////////// Quiz question ////////////////////////////////////////////////

// Function to add a new quiz question to a quiz
const addQuizQuestion = async (courseId, lessonId, quizId, questionData) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the quiz within the lesson by its ID
    const quiz = lesson.quizzes.find((quiz) => quiz._id.toString() === quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Create a new quiz question based on the provided question data
    const newQuestion = {
      question: questionData.question,
      options: questionData.options || [],
      correctAnswerIndex: questionData.correctAnswerIndex,
    };

    // Add the new question to the quiz's questions array
    quiz.questions.push(newQuestion);

    // Save the course with the new question added
    await course.save();

    return newQuestion;
  } catch (error) {
    console.error("Error adding quiz question:", error.message);
    throw new Error("Error adding quiz question");
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
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the quiz within the lesson by its ID
    const quiz = lesson.quizzes.find((quiz) => quiz._id.toString() === quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Find the index of the question in the quiz's questions array
    const questionIndex = quiz.questions.findIndex(
      (question) => question._id.toString() === questionId
    );
    if (questionIndex === -1) {
      throw new Error("Question not found");
    }

    // Update the question with the provided updatedQuestionData
    const questionToUpdate = quiz.questions[questionIndex];
    questionToUpdate.question =
      updatedQuestionData.question || questionToUpdate.question;
    questionToUpdate.options =
      updatedQuestionData.options || questionToUpdate.options;
    questionToUpdate.correctAnswerIndex =
      updatedQuestionData.correctAnswerIndex ||
      questionToUpdate.correctAnswerIndex;

    // Save the course with the updated question
    await course.save();

    return questionToUpdate;
  } catch (error) {
    console.error("Error editing quiz question:", error.message);
    throw new Error("Error editing quiz question");
  }
};

// Function to delete a quiz question from a quiz
const deleteQuizQuestion = async (courseId, lessonId, quizId, questionId) => {
  try {
    // Find the course by its ID
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Find the lesson within the course by its ID
    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    // Find the quiz within the lesson by its ID
    const quiz = lesson.quizzes.find((quiz) => quiz._id.toString() === quizId);
    if (!quiz) {
      throw new Error("Quiz not found");
    }

    // Find the index of the question in the quiz's questions array
    const questionIndex = quiz.questions.findIndex(
      (question) => question._id.toString() === questionId
    );
    if (questionIndex === -1) {
      throw new Error("Question not found");
    }

    // Remove the question from the quiz's questions array
    const deletedQuestion = quiz.questions.splice(questionIndex, 1)[0];

    // Save the course with the question removed
    await course.save();

    return deletedQuestion;
  } catch (error) {
    console.error("Error deleting quiz question:", error.message);
    throw new Error("Error deleting quiz question");
  }
};

module.exports = {
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
  addQuiz,
  editQuiz,
  deleteQuiz,
  addQuizQuestion,
  editQuizQuestion,
  deleteQuizQuestion
};
