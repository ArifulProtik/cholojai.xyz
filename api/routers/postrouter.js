import { Router } from "express";
import { PostValidation, CreatePost, GetAllPosst, UpdatePost, DeletePost, GetPostByUser, GetSinglePost, GetComments, CreateComment, DeleteComment, CommentValidation, createLike, deleteLike } from "../controllers/postcontroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const PostRouter = Router();

PostRouter.route("/post").post(isAuth, PostValidation, CreatePost)
PostRouter.route("/posts/:page").get(GetAllPosst)
PostRouter.route("/post/:id").put(isAuth, PostValidation, UpdatePost)
PostRouter.route("/post/:id").delete(isAuth, DeletePost)
PostRouter.route("/post/user/:id").get(GetPostByUser)
PostRouter.route("/post/:slug").get(GetSinglePost)
PostRouter.route("/comments/:id").get(isAuth, GetComments)
PostRouter.route("/comments/:id").post(CommentValidation, isAuth, CreateComment)
PostRouter.route("/comments/:id").delete(isAuth, DeleteComment)
PostRouter.route("/like/:id").post(isAuth, createLike)
PostRouter.route("/like/:id").delete(isAuth, deleteLike)

export default PostRouter
