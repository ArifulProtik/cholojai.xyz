
import express from 'express';
const AuthRouter = express.Router();
import { Signin, SigninValidation, Signup, SignupValidation, logout } from '../controllers/usercontroller.js';
import { isAuth } from '../middlewares/isAuth.js';

AuthRouter.route("/signup").post(SignupValidation, Signup)
AuthRouter.route("/signin").post(SigninValidation, Signin)
AuthRouter.route("/logout").post(isAuth, logout)

export default AuthRouter
