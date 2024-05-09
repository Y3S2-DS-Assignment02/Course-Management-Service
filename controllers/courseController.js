const courseService = require("../services/courseServices");

const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price, duration } = req.body;

    // Call the course service to create the course
    const response = await courseService.createCourse(
      title,
      description,
      instructor,
      price,
      duration
    );

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).send({ data: {}, message: "Error creating course" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const response = await courseService.getAllCourses();

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error retrieving all courses:", error.message);
    res.status(500).send({ data: {}, message: "Error creating course" });
  }
};

const getCoursesByApproveStatus = async (req, res) => {
  const { isApproved } = req.params;
  try {
    const response = await courseService.getCoursesByApproveStatus(isApproved);
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error(
      `Error retrieving ${isApproved ? "approved" : "not approved"} courses:`,
      error.message
    );
    res.status(500).json({
      data: {},
      message: `Failed to retrieve ${
        isApproved ? "approved" : "not approved"
      } courses: Internal server error`,
    });
  }
};

const getCoursesByInstructor = async (req, res) => {
  const { instructor } = req.params;
  try {
    const response = await courseService.getCoursesByInstructor(instructor);
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error(
      `Error retrieving courses by instructor ${instructor}:`,
      error.message
    );
    res.status(500).json({
      data: {},
      message: `Failed to retrieve courses by instructor ${instructor}: Internal server error`,
    });
  }
};

const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const response = await courseService.getCourseById(courseId);
    res
      .status(response.status)
      .json({ data: response.data, message: response.message });
  } catch (error) {
    console.error(
      `Error retrieving course with ID ${courseId}:`,
      error.message
    );
    res.status(500).json({
      data: {},
      message: `Failed to retrieve course with ID ${courseId}: Internal server error`,
    });
  }
};

// Function to update a course by ID
const updateCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, price, duration } = req.body;

    // Initialize an empty object to store the updated course data
    const updatedCourseData = {};

    // Check if each field is provided in the request body, and if so, add it to the updatedCourseData object
    if (title) updatedCourseData.title = title;
    if (description) updatedCourseData.description = description;
    //if (instructor) updatedCourseData.instructor = instructor;
    if (price) updatedCourseData.price = price;
    if (duration) updatedCourseData.duration = duration;

    const response = await courseService.updateCourseById(
      courseId,
      updatedCourseData
    );

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).send({ data: {}, message: "Error updating course" });
  }
};

// Function to update a course by ID
const approveOrRejecteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {isApproved, isRejected} = req.body;

    // Initialize an empty object to store the updated course data
    const updatedCourseData = {};

    // Check if each field is provided in the request body, and if so, add it to the updatedCourseData object
    if (isApproved) updatedCourseData.isApproved = isApproved;
    if (isRejected) updatedCourseData.isRejected = isRejected;

    const response = await courseService.updateCourseById(
      courseId,
      updatedCourseData
    );

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error updating course:", error.message);
    res.status(500).send({ data: {}, message: "Error updating course" });
  }
};

// Function to delete a course by ID
const deleteCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const response = await courseService.deleteCourseById(courseId);

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error deleting course:", error.message);
    res.status(500).send({ data: {}, message: "Error deleting course" });
  }
};

const createLesson = async (req, res) => {
  try {
    const { courseId, title, description } = req.body;
    const lessonDetails = { title, description };

    const response = await courseService.createLesson(courseId, lessonDetails);

    res
      .status(response.status)
      .send({ data: response.data || {}, message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: {}, message: "Error creating Lesson" });
  }
};

const editLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { title, description } = req.body;

    const updatedCourseData = {
      title,
      description,
    };
    const response = await courseService.editLesson(
      courseId,
      lessonId,
      updatedCourseData
    );

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error updating Lesson:", error.message);
    res.status(500).send({ data: {}, message: "Error updating Lesson" });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    const response = await courseService.deleteLesson(courseId, lessonId);

    res
      .status(response.status)
      .send({ data: response.data || {}, message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: {}, message: "Error deleting Lesson" });
  }
};

const createResource = async (req, res) => {
  try {
    const { courseId, lessonId, title, lecNotes } = req.body;

    let uploadedImage = null;
    let uploadedVideo = null;

    if (req.files["imagefile"]) {
      uploadedImage = req.files["imagefile"];
      //console.log(uploadedImage);
    }
    if (req.files["videofile"]) {
      uploadedVideo = req.files["videofile"];
    }

    const response = await courseService.createResource(
      courseId,
      lessonId,
      title,
      lecNotes,
      uploadedImage,
      uploadedVideo
    );

    res
      .status(response.status)
      .send({ data: response.data || {}, message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: {}, message: "Error creating Resource" });
  }
};

const editResource = async (req, res) => {
  try {
    const { courseId, lessonId, resourceId } = req.params;
    const { title, lecNotes } = req.body;

    let uploadedImage = null;
    let uploadedVideo = null;

    if (req.files["imagefile"]) {
      uploadedImage = req.files["imagefile"];
      //console.log(uploadedImage);
    }
    if (req.files["videofile"]) {
      uploadedVideo = req.files["videofile"];
    }

    const response = await courseService.editResource(
      courseId,
      lessonId,
      resourceId,
      title,
      lecNotes,
      uploadedImage,
      uploadedVideo
    );

    // Send the appropriate response
    res.status(response.status).send({
      data: response.data || {}, // Send the response data if available
      message: response.message, // Default message if not provided
    });
  } catch (error) {
    console.error("Error updating Resource:", error.message);
    res.status(500).send({ data: {}, message: "Error updating Resource" });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { courseId, lessonId, resourceId } = req.params;

    const response = await courseService.deleteResource(
      courseId,
      lessonId,
      resourceId
    );

    res
      .status(response.status)
      .send({ data: response.data || {}, message: response.message });
  } catch (error) {
    console.error(error);
    res.status(500).send({ data: {}, message: "Error deleting Resource" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCoursesByApproveStatus,
  getCoursesByInstructor,
  getCourseById,
  updateCourseById,
  approveOrRejecteCourse,
  deleteCourseById,
  createLesson,
  editLesson,
  deleteLesson,
  createResource,
  editResource,
  deleteResource,
};
