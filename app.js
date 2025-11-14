process.removeAllListeners("warning");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ExpressError = require("./ExtraData/ExpressError.js");

// Routes
const listingsRoute = require("./Routes/listings.js");
const reviewsRoute = require("./Routes/review.js");
const userRoute = require("./Routes/user.js");

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public2")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB Connection
const mongo_database = process.env.MONGO_ATLAST;
async function main() {
  await mongoose.connect(mongo_database);
}
main()
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log(" Database connection error:", err));

// Mongo Store
const store = MongoStore.create({
  mongoUrl: mongo_database,
  crypto: { secret: "mysecret" },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in Mongo session store:", err);
});

// Session Configuration
const sessionOptions = {
  store,
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  Flash + Current User Middleware (MUST come before routes)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// 404 Handler (fixed for Express 5)
app.all(/"*"/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("includes/error.ejs", { statusCode, message });
});

// Server
app.listen(8080, () => {
  console.log(" Server running at http://localhost:8080");
});
