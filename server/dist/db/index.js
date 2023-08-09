"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.User = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    password: { type: String, required: true },
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
const adminSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    password: { type: String, required: true },
});
const courseSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    published: { type: Boolean, required: true },
});
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
exports.User = mongoose_1.default.model("User", userSchema);
exports.Course = mongoose_1.default.model("Course", courseSchema);
