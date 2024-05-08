const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("index.ejs", { allListing });
}

module.exports.renderNew = (req, res) => {
  return res.render("new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing your requested is not exist !");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("show.ejs", { listing });
}


module.exports.createNew = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "new listing Created !");
  res.redirect("/listings");

}

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing your requested is not exist !");
    res.redirect("/listings");
  }
  res.render("edit.ejs", { listing });
}

module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !=="undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "succesfully updated !");
  res.redirect(`/listings/${id}`);
}

module.exports.deletePost = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted successfully !");
  console.log(deletedListing);
  res.redirect("/listings");
}