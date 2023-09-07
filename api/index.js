import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import AuthRouter from "./routers/AuthRouter.js";
import PostRouter from "./routers/postrouter.js";
import PackageRouter from "./routers/PackageRouter.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use("/api", AuthRouter)
app.use("/api", PostRouter)
app.use("/api", PackageRouter)
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
})

