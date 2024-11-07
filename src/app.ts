import express from "express"
import cors from 'cors'
import { notFoundHandler } from "./middleware/notFoundHandler"
import { GlobalErrorHandler} from "./middleware/globalErrorHandler"
import { UserRoutes } from "./module/user/user.routes"
import { AuthRoutes } from "./module/auth/auth.routes"
// import cookieParser from "cookie-parser"
import { RecipeRoutes } from "./module/recipe/recipe.routes"
import cookieParser from 'cookie-parser';
import { CommentRoutes } from "./module/comment/comment.routes"
const app = express()
app.use(cookieParser())
app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true}));

app.use(express.json())
// {origin: ['']}

app.use("/api/auth", UserRoutes)
app.use("/api/auth", AuthRoutes)
app.use("/api/recipe", RecipeRoutes)
app.use("/api/recipe", CommentRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!!')
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(notFoundHandler)
app.use(GlobalErrorHandler.globalErrorHandler)

export default app

