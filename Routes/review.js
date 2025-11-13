const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../ExtraData/WrapAsync.js");
const { reviewValidate, checklogin, checkAuther } = require("../middleware.js");
const reviewCollection = require("../collections/reviews.js");

// Create review
router.post("/", checklogin, reviewValidate, WrapAsync(reviewCollection.createReview));

// Delete review
router.delete("/:reviewId", checklogin, checkAuther, WrapAsync(reviewCollection.deleteReview));

module.exports = router;
