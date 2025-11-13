const Listing = require("./models/listings");
const { listingSchema } = require("./Schema.js");
const { reviewSchema } = require("./Schema.js");
const Review = require("./models//review.js");
const ExpressError = require("./ExtraData/ExpressError.js");

//this is our joi that check all the schema is perfect or not which part you miss
module.exports.listingValidate = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        // ExpressError expects (message, statusCode)
        throw new ExpressError(errMsg, 424);
    } else {
        next();
    }
};

//this is our joi that check all the schema is perfect or not which part you miss
//in our reviewSchema

module.exports. reviewValidate=(req,res,next)=>{
     const {error}=reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=> el.message).join(",");
        // ExpressError expects (message, statusCode)
        throw new ExpressError(errMsg, 427);
    }else{
        next();
    }
}

//check rhe user login or not login 
module.exports.checklogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must login first");
        return res.redirect("/login");
    }
    next();
}

//----CHECK URL SAVE OR NOTSAVE (SAVE IT LOCALS THAT NOT CHANGE)----- 
module.exports.saveUrl=(req,res,next)=>{
    if(!req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

//check owner or not 
module.exports.checkOwner= async (req,res,next)=>{
    let {id}= req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","dont have access");
        return res.redirect(`/listings/${id}`);

    }
    next();
}
//---------check who is the real auther--------
// middleware/checkAuther.js


module.exports.checkAuther = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the original author!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
