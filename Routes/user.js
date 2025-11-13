const express = require("express");
const router = express.Router();
const passport=require("passport");
let{ saveUrl }=require("../middleware.js");
const userCollections=require("../collections/user.js")
//router.route handel all the request that comes in our "/sihnup"route 
router.route("/signup")
.get((userCollections.renderSignupForm) )
 .post((userCollections.Signup));
//router.route handel all the request that comes in our "/login"route 
 router.route("/login")
 .get((userCollections.renderLoginForm))
 .post( saveUrl,passport.authenticate("local",
   {failuerRedirect:"/login",failureFlash:true}),(userCollections.Login)  
 );

router.get("/logout",(userCollections.Logout));


 module.exports = router;