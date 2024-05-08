const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync1 = require("../utils/wrapAsync1");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route("/signup")
    .get(userController.signupFormRender)
    .post(wrapAsync1(userController.signup));

router.route("/login")
    .get(userController.loginFormRender)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), userController.login);





router.get("/logout", userController.logout);

module.exports = router;