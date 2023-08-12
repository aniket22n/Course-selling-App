import express from "express";
import jwt from "jsonwebtoken";
import {
  ADMIN_SECRET_KEY,
  ADMIN_SECRET_KEY as KEY,
  authenticateAdmin,
} from "../middlewares";
import { Admin, Course } from "../db";
import { z } from "zod";

const router = express.Router();

const SignupZOD = z.object({
  username: z.string().min(1).max(15),
  email: z.string().email(),
  contactNumber: z.number().min(1),
  password: z.string().min(1).max(15),
});
type SignupType = z.infer<typeof SignupZOD>;

const LoginZOD = z.object({
  username: z.string().min(1).max(15),
  password: z.string().min(1).max(15),
});
type LoginType = z.infer<typeof LoginZOD>;

const CourseInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  image: z.string().min(1),
  published: z.boolean(),
});
type CourseType = z.infer<typeof CourseInput>;

const PartialCourseInput = CourseInput.partial();
type PartialCourseType = z.infer<typeof PartialCourseInput>;

//Signup Route: create new user
router.post("/signup", async (req, res) => {
  const userInput = SignupZOD.safeParse(req.body);
  if (userInput.success) {
    const Input: SignupType = userInput.data;
    const username = Input.username;
    const password = Input.password;

    const isUser = await Admin.findOne({ username, password });
    if (isUser) {
      return res.json({ message: "Admin already exists", token: null });
    }

    const newAdmin = new Admin(Input);
    const status = await newAdmin.save();
    const token = jwt.sign({ id: status._id }, KEY, { expiresIn: "1hr" });
    return res
      .status(200)
      .json({ message: "Success", token: token, user: isUser });
  }
  return res.json({ message: "Signup failed, try again", token: null });
});

//Login Route: let existing users login
router.post("/login", async (req, res) => {
  const userInput = LoginZOD.safeParse(req.body);
  if (userInput.success) {
    const { username, password }: LoginType = userInput.data;
    const isUser = await Admin.findOne({ username, password });

    if (isUser) {
      const token = jwt.sign({ id: isUser._id }, KEY, { expiresIn: "1hr" });
      return res
        .status(200)
        .json({ message: "Success", token: token, user: isUser });
    }
  }
  return res.json({ message: "Login failed, try again", token: null });
});

//Create Course: let user create course
router.post("/createCourse", authenticateAdmin, async (req, res) => {
  const newCourse = CourseInput.safeParse(req.body);
  if (!newCourse.success) {
    return res.status(400).json({ message: "Insufficient or Invalid data" });
  }

  const courseData: CourseType = newCourse.data;
  const isCourse = await Course.findOne(courseData);
  if (isCourse) {
    return res.status(400).json({
      message: "This course already exists",
      courseId: isCourse._id,
    });
  }

  const course = new Course(courseData);
  try {
    const status = await course.save();
    res
      .status(200)
      .json({ message: "New course created", courseId: status._id });
  } catch {
    console.log("Failed to save course details in Database");
    res.status(500).json({ message: "Failed to create coruse, try again" });
  }
});

//Update Course: let users update existing course
router.put("/updateCourse/:Id", authenticateAdmin, async (req, res) => {
  const Id = req.params.Id;
  const isCourse = await Course.findOne({ _id: Id });
  if (!isCourse) {
    return res.status(404).json({ message: "Course not found" });
  }

  const couresInput = PartialCourseInput.safeParse(req.body);
  if (!couresInput.success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const updatedCourse: PartialCourseType = {
    ...isCourse.toObject(),
    ...couresInput.data,
  };

  try {
    await Course.updateOne({ _id: Id }, updatedCourse);
    res.status(200).json({
      message: "Course updated successfully",
      updatedCourse: updatedCourse,
    });
  } catch (error) {
    console.log("Failed to update course details in Database");
    res.status(500).json({ message: "Failed to update course details" });
  }
});

//Show All courses to user
router.get("/courses", async (req, res) => {
  try {
    const courses: CourseType[] = await Course.find({});
    if (courses.length > 0) res.status(200).json({ courses: courses });
    else res.status(404).json({ courses: [] });
  } catch (error) {
    console.log("Failed to retrive courses form database");
    res.status(500).json({ message: "Failed to retrive courses" });
  }
});

const tokenCheck = z.object({
  authorization: z.string().min(1),
});

router.get("/me", async (req, res) => {
  const authorization = tokenCheck.safeParse(req.headers);
  if (authorization.success) {
    const token = authorization.data.authorization.split(" ")[1];
    jwt.verify(token, ADMIN_SECRET_KEY, async (err, payload) => {
      if (err) return res.json({ admin: false });

      if (!payload || typeof payload == "string") {
        //payload should neither be undefined nor a string.
        return res.json({ admin: false });
      } else {
        const adminData = await Admin.findOne({ _id: payload.id });
        return res.json(adminData);
      }
    });
  } else {
    return res.json({ admin: false });
  }
});

export default router;
