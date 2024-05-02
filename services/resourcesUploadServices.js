const { storage } = require("../database/index");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const getCurrentDateTimeString = () => {
    // Get the current date and time
    const currentDate = new Date();
  
    // Format the date and time as a string
    const dateTimeString = currentDate.toISOString().replace(/[-:.]/g, '');
  
    return dateTimeString;
  };
  

const uploadImage = async (file, courseId, lessonId, filetype, filename) => {
  try {
    if (!file) {
      console.log("Error: No file provided");
      return null;
    }

     // Generate a unique filename using the current date and time
     const uniqueName = getCurrentDateTimeString();

    const fileRef = ref(storage, `${courseId}/${lessonId}/${filetype}/${uniqueName}-${filename}`);

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file.buffer);

    // Get the download URL of the uploaded file
    const fileUrl = await getDownloadURL(fileRef);

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

module.exports = { uploadImage };
