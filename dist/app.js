"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const user_routes_1 = require("./module/user/user.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", user_routes_1.UserRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!!');
});
app.use(globalErrorHandler_1.GlobalErrorHandler.globalErrorHandler);
app.use(notFoundHandler_1.notFoundHandler);
exports.default = app;
