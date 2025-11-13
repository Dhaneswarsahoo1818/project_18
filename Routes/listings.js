const express = require("express");
const router = express.Router();
const WrapAsync = require("../ExtraData/WrapAsync.js");
const { checklogin, listingValidate, checkOwner } = require("../middleware.js");
const listingCollection = require("../collections/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

// All listings & create
router
  .route("/")
  .get(WrapAsync(listingCollection.index))
  .post(checklogin, listingValidate,upload.single('listing[image]'), WrapAsync(listingCollection.newForm));

 
// New listing form
router.get("/new", checklogin, listingCollection.renderNewform);

// Show, update, delete single listing
router
  .route("/:id")
  .get(WrapAsync(listingCollection.showtheForm))
  .put(checklogin, checkOwner,upload.single('listing[image]'), listingValidate, WrapAsync(listingCollection.updateForm))
  .delete(checklogin, checkOwner, WrapAsync(listingCollection.deleteForm));

// Edit form
router.get("/:id/edit", checklogin, checkOwner, WrapAsync(listingCollection.editForm));

module.exports = router;
