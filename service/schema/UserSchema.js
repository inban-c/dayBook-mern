const mongoose = require("mongoose");
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl);

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const  User = mongoose.model("User",userSchema);

module.exports = User;