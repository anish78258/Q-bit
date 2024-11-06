import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({
    extended: true,

}));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";


// Default route
app.get("/", (req, res) => {
    res.send("<h1>Running OK</h1>");
});


app.use("/user", userRouter);




export { app };
