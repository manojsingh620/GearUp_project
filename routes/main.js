const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    return res.render("landing.ejs");
});

module.exports = router;