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
const auth_routes_1 = require("./module/auth/auth.routes");
// import cookieParser from "cookie-parser"
const recipe_routes_1 = require("./module/recipe/recipe.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const comment_routes_1 = require("./module/comment/comment.routes");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
// {origin: ['']}
app.use("/api/auth", user_routes_1.UserRoutes);
app.use("/api/auth", auth_routes_1.AuthRoutes);
app.use("/api/recipe", recipe_routes_1.RecipeRoutes);
app.use("/api/recipe", comment_routes_1.CommentRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!!');
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(notFoundHandler_1.notFoundHandler);
app.use(globalErrorHandler_1.GlobalErrorHandler.globalErrorHandler);
exports.default = app;
