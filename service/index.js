const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const User = require("./schema/UserSchema")
const cors = require('cors');

const connectDB = require("./db/db")
connectDB();
app.use(cors());   

app.use(express.json());


app.post('/login', async (req, res) => {
  console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email,
            password
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Return the user with their activities
        res.status(200).json({
            user: {
                firstName: user.firstName,
                email:user.email,
                activities: user.activities // Assuming you have an 'activities' field
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/add-activity', async (req, res) => {
  console.log(req.body)
  const { email, activity } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.activities.push({ activity });
      await user.save();  // Save the user with the new activity
      console.log("Updated activities:", user.activities);  // <-- Log activities
      res.status(200).json({ activities: user.activities });  // Return updated activities
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


  
  app.get('/get-activities', async (req, res) => {
    const { email } = req.query;
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.status(200).json({ activities: user.activities });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  app.post('/delete-activity', async (req, res) => {
    const { email, date } = req.body;
    console.log(req.body)
    try {
      const user = await User.findOne({ email });
      if (user) {
        user.activities = user.activities.filter(activity => new Date(activity.date).toISOString() !== new Date(date).toISOString());
        await user.save();
        console.log(user);
        res.status(200).json({ message: 'Activity deleted successfully', activities: user.activities });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password
        });
        await user.save();
        console.log(user);
    }catch(error) {
        console.log(error)
    }


    res.status(200).json({message: 'this is from the all users route.'});
})

app.get("/",async(req,res)=>{
    
    // const users = await User.find();
    // console.log(users)
    res.send("hello user");
});


app.listen(3000);