const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync1.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

const listingController = require ("../controller/listing.js");


const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }

};

router
.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.createNew));

router.get("/new", isLoggedIn,listingController.renderNew);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateRoute))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deletePost));


router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.editForm));

module.exports = router;