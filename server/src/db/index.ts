import  mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  contactNumber: {type: Number, required: true},
  password: {type: String, required: true},
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const adminSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  contactNumber: {type: Number, required: true},
  password: {type: String, required: true},
})

const courseSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  image: {type: String, required: true},
  published: {type: Boolean, required: true},
})

export const Admin = mongoose.model("Admin", adminSchema);
export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);