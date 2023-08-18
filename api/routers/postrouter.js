import { Router } from "express";
import { PostValidation, CreatePost, GetAllPosst, UpdatePost, DeletePost, GetPostByUser, GetSinglePost } from "../controllers/postcontroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const PostRouter = Router();

PostRouter.route("/post").post(isAuth, PostValidation, CreatePost)
PostRouter.route("/posts/:page").get(GetAllPosst)
PostRouter.route("/post/:id").put(isAuth, PostValidation, UpdatePost)
PostRouter.route("/post/:id").delete(isAuth, DeletePost)
PostRouter.route("/post/user/:id").get(GetPostByUser)
PostRouter.route("/post/:slug").get(GetSinglePost)

export default PostRouter
