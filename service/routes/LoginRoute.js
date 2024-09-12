const express = require("express");
const router = express.Router();
const port = process.env.PORT || 5000;
router.route("/").get((req,res)=>{
    res.json({Message:`The port is running in ${port}`});
    console.log(`The port is running in ${port}`);
});

module.exports = router;