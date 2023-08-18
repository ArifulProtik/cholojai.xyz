
import express from 'express';
const AuthRouter = express.Router();
import { Signin, SigninValidation, Signup, SignupValidation } from '../controllers/usercontroller.js';

AuthRouter.route("/signup").post(SignupValidation, Signup)
AuthRouter.route("/signin").post(SigninValidation, Signin)

export default AuthRouter
