const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const User = require("./schema/UserSchema")
const cors = require('cors');

app.use(cors());   

app.use(express.json());


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.find({
            email,
            password
        })
        res.status(200).json({message: 'verified successfully'});
    }catch(error) {
        console.log(error);
    }

})

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
    
    const users = await User.find();
    console.log(users)
    res.send(users);
});


app.listen(3000);