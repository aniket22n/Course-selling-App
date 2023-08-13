"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInvalidRoutes = exports.authenticateUser = exports.authenticateAdmin = exports.ADMIN_SECRET_KEY = exports.USER_SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
require("dotenv").config();
const tokenCheck = zod_1.z.object({
    authorization: zod_1.z.string().min(1),
});
//after compilation .env file is not getting added in dist
//Backup Key is temp solution for that
const USER_KEY = process.env.USER_KEY || "Backup Key for USER ";
exports.USER_SECRET_KEY = USER_KEY;
const ADMIN_KEY = process.env.ADMIN_KEY || "Backup Key for ADMIN";
exports.ADMIN_SECRET_KEY = ADMIN_KEY;
//autharization for admin
const authenticateAdmin = (req, res, next) => {
    const authHeader = tokenCheck.safeParse(req.headers);
    if (!authHeader.success) {
        return res.status(401).json({ message: "Login or signup" });
    }
    const token = authHeader.data.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, exports.ADMIN_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Login or signup" });
        }
        if (!payload || typeof payload == "string") {
            //payload should neither be undefined nor a string.
            return res.status(403).json({ message: "Login or signup" });
        }
        req.headers["userId"] = payload.id;
        next();
    });
};
exports.authenticateAdmin = authenticateAdmin;
//authorization for users
const authenticateUser = (req, res, next) => {
    const authHeader = tokenCheck.safeParse(req.headers);
    if (!authHeader.success) {
        return res.status(401).json({ message: "Login or signup" });
    }
    const token = authHeader.data.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, exports.USER_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Login or signup" });
        }
        if (!payload || typeof payload == "string") {
            //payload should neither be undefined nor a string.
            return res.status(403).json({ message: "Login or signup" });
        }
        req.headers["userId"] = payload.id;
        next();
    });
};
exports.authenticateUser = authenticateUser;
//Invalid Routes
const handleInvalidRoutes = (req, res, next) => {
    // If no route has matched the request so far, this middleware will be executed
    // Respond with a "404 Not Found" error
    res.status(404).json({ message: "Route not found" });
};
exports.handleInvalidRoutes = handleInvalidRoutes;
