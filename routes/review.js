const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync1.js");
const {isLoggedIn,validateReview,isReviewauther} = require("../middleware.js");
const reviewsController = require("../controller/reviews.js");



router.post("/",isLoggedIn, validateReview,wrapAsync(reviewsController.createReviews));
 
 
 // Delete review route
 router.delete("/:reviewId",isReviewauther,wrapAsync(reviewsController.deleteReviews));

 module.exports = router;
 