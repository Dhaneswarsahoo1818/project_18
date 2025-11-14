 const mongoose = require("mongoose");
 const initData = require("./data.js");
 const Listing = require("../models/listings");
 main().then(()=>{
     console.log("connected")
 }).catch((err)=>{
     console.log("error found")
 });
 async function main(){
 await mongoose.connect("mongodb://127.0.0.1:27017/Selecthome")
 }
 const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({ ...obj,owner:'690488fe0c1a8b658fd14658'}));
    await Listing.insertMany(initData.data);
    console.log("Data Initialized");
    };

    initDb();

