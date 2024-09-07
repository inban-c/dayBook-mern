const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const mongourl = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("The db connection is successful");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
