const mongoose = require("mongoose");
require("dotenv").config();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const connectToDatabase = async () => {
  try {
    const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

    await mongoose.connect(url, {});

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAQU3Vx6QLCPceoJGuSpvRWvjrbOSQCac",
  authDomain: "y3s2-ds-assignment02.firebaseapp.com",
  projectId: "y3s2-ds-assignment02",
  storageBucket: "y3s2-ds-assignment02.appspot.com",
  messagingSenderId: "32867375144",
  appId: "1:32867375144:web:871ba9250c855f3ed2bd1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

module.exports = { connectToDatabase, storage }; // Export an object with 'storage' property