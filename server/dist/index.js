"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = require("./db/connect");
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const middlewares_1 = require("./middlewares");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Routes
app.use("/user", user_1.default);
app.use("/admin", admin_1.default);
app.use(middlewares_1.handleInvalidRoutes);
//Database connection
(0, connect_1.dbConnect)().then(() => {
    //Start server
    app.listen(3000, () => {
        console.log("listening on port 3000");
    });
});
