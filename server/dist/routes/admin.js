"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middlewares_1 = require("../middlewares");
const db_1 = require("../db");
const zod_1 = require("zod");
const router = express_1.default.Router();
const SignupZOD = zod_1.z.object({
    username: zod_1.z.string().min(1).max(15),
    email: zod_1.z.string().email(),
    contactNumber: zod_1.z.number().min(1),
    password: zod_1.z.string().min(1).max(15),
});
const LoginZOD = zod_1.z.object({
    username: zod_1.z.string().min(1).max(15),
    password: zod_1.z.string().min(1).max(15),
});
const CourseInput = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().min(0),
    image: zod_1.z.string().min(1),
    published: zod_1.z.boolean(),
});
const PartialCourseInput = CourseInput.partial();
//Signup Route: create new user
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = SignupZOD.safeParse(req.body);
    if (userInput.success) {
        const Input = userInput.data;
        const username = Input.username;
        const password = Input.password;
        const isUser = yield db_1.Admin.findOne({ username, password });
        if (isUser) {
            return res.json({ message: "Admin already exists", token: null });
        }
        const newAdmin = new db_1.Admin(Input);
        const status = yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: status._id }, middlewares_1.ADMIN_SECRET_KEY, { expiresIn: "1hr" });
        return res
            .status(200)
            .json({ message: "Success", token: token, user: isUser });
    }
    return res.json({ message: "Signup failed, try again", token: null });
}));
//Login Route: let existing users login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = LoginZOD.safeParse(req.body);
    if (userInput.success) {
        const { username, password } = userInput.data;
        const isUser = yield db_1.Admin.findOne({ username, password });
        if (isUser) {
            const token = jsonwebtoken_1.default.sign({ id: isUser._id }, middlewares_1.ADMIN_SECRET_KEY, { expiresIn: "1hr" });
            return res
                .status(200)
                .json({ message: "Success", token: token, user: isUser });
        }
    }
    return res.json({ message: "Login failed, try again", token: null });
}));
//Create Course: let user create course
router.post("/createCourse", middlewares_1.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = CourseInput.safeParse(req.body);
    if (!newCourse.success) {
        return res.status(400).json({ message: "Insufficient or Invalid data" });
    }
    const courseData = newCourse.data;
    const isCourse = yield db_1.Course.findOne(courseData);
    if (isCourse) {
        return res.status(400).json({
            message: "This course already exists",
            courseId: isCourse._id,
        });
    }
    const course = new db_1.Course(courseData);
    try {
        const status = yield course.save();
        res
            .status(200)
            .json({ message: "New course created", courseId: status._id });
    }
    catch (_a) {
        console.log("Failed to save course details in Database");
        res.status(500).json({ message: "Failed to create coruse, try again" });
    }
}));
//Update Course: let users update existing course
router.put("/updateCourse/:Id", middlewares_1.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.Id;
    const isCourse = yield db_1.Course.findOne({ _id: Id });
    if (!isCourse) {
        return res.status(404).json({ message: "Course not found" });
    }
    const couresInput = PartialCourseInput.safeParse(req.body);
    if (!couresInput.success) {
        return res.status(400).json({ message: "Invalid data" });
    }
    const updatedCourse = Object.assign(Object.assign({}, isCourse.toObject()), couresInput.data);
    try {
        yield db_1.Course.updateOne({ _id: Id }, updatedCourse);
        res.status(200).json({
            message: "Course updated successfully",
            updatedCourse: updatedCourse,
        });
    }
    catch (error) {
        console.log("Failed to update course details in Database");
        res.status(500).json({ message: "Failed to update course details" });
    }
}));
//Show All courses to user
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield db_1.Course.find({});
        if (courses.length > 0)
            res.status(200).json({ courses: courses });
        else
            res.status(404).json({ courses: [] });
    }
    catch (error) {
        console.log("Failed to retrive courses form database");
        res.status(500).json({ message: "Failed to retrive courses" });
    }
}));
const tokenCheck = zod_1.z.object({
    authorization: zod_1.z.string().min(1),
});
router.get("/me", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = tokenCheck.safeParse(req.headers);
    if (authorization.success) {
        const token = authorization.data.authorization.split(" ")[1];
        jsonwebtoken_1.default.verify(token, middlewares_1.ADMIN_SECRET_KEY, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.json({ admin: false });
            if (!payload || typeof payload == "string") {
                //payload should neither be undefined nor a string.
                return res.json({ admin: false });
            }
            else {
                const adminData = yield db_1.Admin.findOne({ _id: payload.id });
                return res.json(adminData);
            }
        }));
    }
    else {
        return res.json({ admin: false });
    }
}));
exports.default = router;
