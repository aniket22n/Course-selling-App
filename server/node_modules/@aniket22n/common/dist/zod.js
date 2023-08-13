"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialCourseParams = exports.CourseParams = exports.LoginParams = exports.SignupParams = void 0;
const zod_1 = require("zod");
exports.SignupParams = zod_1.z.object({
    username: zod_1.z.string().min(1).max(15),
    email: zod_1.z.string().email(),
    contactNumber: zod_1.z.number().min(1),
    password: zod_1.z.string().min(1).max(15),
});
exports.LoginParams = zod_1.z.object({
    username: zod_1.z.string().min(1).max(15),
    password: zod_1.z.string().min(1).max(15),
});
exports.CourseParams = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().min(0),
    image: zod_1.z.string().min(1),
    published: zod_1.z.boolean(),
});
exports.PartialCourseParams = exports.CourseParams.partial();
//published this package to npm publically and can import this anywhere
