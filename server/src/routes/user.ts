import express from "express";
import jwt from "jsonwebtoken";
import { User, Course } from "../db/index";
import { z } from "zod";
import { USER_SECRET_KEY, authenticateUser } from "../middlewares";
//Created public npm package for zod
import { SignupParams, LoginParams } from "@aniket22n/common/dist/zod";

const router = express.Router();

//Signup Route
router.post("/signup", async (req, res) => {
  const userInput = SignupParams.safeParse(req.body);
  if (!userInput.success) {
    return res.status(401).json({ message: "invalid details" });
  }

  const { username, email, contactNumber, password } = userInput.data;
  const isUser = await User.findOne({ username, password });
  if (isUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  const newUser = new User({ username, email, contactNumber, password });
  try {
    const status = await newUser.save();
    const token = jwt.sign({ id: status._id }, USER_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res
      .status(200)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    console.log("failed to save user details in database");
    res.status(500).json({ message: "Signup failed" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  const userInput = LoginParams.safeParse(req.body);
  if (!userInput.success) {
    return res.status(401).json({ message: "invalid details" });
  }

  const isUser = await User.findOne(userInput.data);

  if (!isUser) {
    res.status(401).json({ message: "incorrect username or password" });
  } else {
    const token = jwt.sign({ id: isUser._id }, USER_SECRET_KEY, {
      expiresIn: "1hr",
    });
    res
      .status(200)
      .json({ message: "User loggedin successfully", token: token });
  }
});

//Show all courses
router.get("/courses", authenticateUser, async (req, res) => {
  try {
    const courses = await Course.find({});
    if (courses.length > 0) res.status(200).json(courses);
    else res.status(200).json({ message: "No courses found" });
  } catch (error) {
    console.log("Failed to retrive courses form database");
    res.status(500).json({ message: "Failed to retrive courses" });
  }
});

//purchase course
router.post("/purchaseCourse/:Id", authenticateUser, async (req, res) => {
  const Id = req.params.Id;
  const isCourse = await Course.findOne({ _id: Id });

  if (isCourse) {
    const user = await User.findOne({ _id: req.headers["userId"] });
    if (user) {
      const purchased: boolean = user.purchasedCourses.includes(isCourse._id);
      if (purchased) {
        res.status(400).json({ message: "You've already bought this course" });
      } else {
        user.purchasedCourses.push(isCourse._id);
        await user.save();
        res.status(200).json({ message: "Course purchased Successfully" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

//Show purchased courses
router.get("/purchasedCourses", authenticateUser, async (req, res) => {
  const user = await User.findOne({ _id: req.headers["userId"] }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

export default router;
