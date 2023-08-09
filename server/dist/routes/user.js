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
const index_1 = require("../db/index");
const zod_1 = require("zod");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
//backend validation ( create separate module for this one )
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
//Signup Route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = SignupZOD.safeParse(req.body);
    if (!userInput.success) {
        return res.status(401).json({ message: "invalid details" });
    }
    const { username, email, contactNumber, password } = userInput.data;
    const isUser = yield index_1.User.findOne({ username, password });
    if (isUser) {
        return res.status(400).json({ message: "user already exists" });
    }
    const newUser = new index_1.User({ username, email, contactNumber, password });
    try {
        const status = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: status._id }, middlewares_1.USER_SECRET_KEY, { expiresIn: "1hr" });
        res.status(200).json({ message: "User created successfully", token: token });
    }
    catch (error) {
        console.log("failed to save user details in database");
        res.status(500).json({ message: "Signup failed" });
    }
}));
//Login Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = LoginZOD.safeParse(req.body);
    if (!userInput.success) {
        return res.status(401).json({ message: "invalid details" });
    }
    const { username, password } = userInput.data;
    const isUser = yield index_1.User.findOne({ username, password });
    if (!isUser) {
        res.status(401).json({ message: "incorrect username or password" });
    }
    else {
        const token = jsonwebtoken_1.default.sign({ id: isUser._id }, middlewares_1.USER_SECRET_KEY, { expiresIn: "1hr" });
        res.status(200).json({ message: "User loggedin successfully", token: token });
    }
}));
//Show all courses
router.get("/courses", middlewares_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield index_1.Course.find({});
        if (courses.length > 0)
            res.status(200).json(courses);
        else
            res.status(200).json({ message: "No courses found" });
    }
    catch (error) {
        console.log("Failed to retrive courses form database");
        res.status(500).json({ message: "Failed to retrive courses" });
    }
}));
//purchase course
router.post("/purchaseCourse/:Id", middlewares_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.Id;
    const isCourse = yield index_1.Course.findOne({ _id: Id });
    if (isCourse) {
        const user = yield index_1.User.findOne({ _id: req.headers['userId'] });
        if (user) {
            const purchased = user.purchasedCourses.includes(isCourse._id);
            if (purchased) {
                res.status(400).json({ message: "You've already bought this course" });
            }
            else {
                user.purchasedCourses.push(isCourse._id);
                yield user.save();
                res.status(200).json({ message: "Course purchased Successfully" });
            }
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
//Show purchased courses
router.get('/purchasedCourses', middlewares_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.findOne({ _id: req.headers["userId"] }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
exports.default = router;
