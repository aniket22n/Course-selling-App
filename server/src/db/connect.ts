import  mongoose from "mongoose";

export async function dbConnect() {
  const url = "mongodb://127.0.0.1:27017/Course-Selling-App"
  
  try {
    await mongoose.connect(url);
    console.log("connected to database successfully");
  } 
  catch(err) {
    console.log("Failed to connect database");
  }
}