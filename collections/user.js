const User=require("../models/user.js");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");

};
 module.exports.Signup=async(req,res) =>{
 let {username,email,password}=req.body;
 const newUser= new User ({email,username});
 const regesterUser= await User.register(newUser,password);
 console.log(regesterUser);
 req.login(regesterUser,(err)=>{
    if(err){
      return next();
       }
     req.flash("success","login successfully");
     res.redirect("/listings");
      });
  };

    module.exports.renderLoginForm=(req,res)=>{
      res.render("users/Login.ejs");
     };
     module.exports.Login=async(req,res) => {
       req.flash("success","you login successfully");
       let redirectUrl=  res.locals.redirectUrl || "/listings";
        res.redirect( redirectUrl );
    };
    module.exports.Logout=(req,res,next)=>{
     req.logout((err)=>{
    if(err){
      return next();
     }
       req.flash("success","logut successfully");
        res.redirect("/listings");
  
     });
   };
