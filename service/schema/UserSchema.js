const mongoose = require("mongoose");
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  activities: [{
    _id: mongoose.Schema.Types.ObjectId,  // Unique ID for each activity
    activity: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});


const User = mongoose.model("User", userSchema);

module.exports = User;