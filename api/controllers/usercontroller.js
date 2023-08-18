import { body, validationResult } from "express-validator";
import prisma from "../prisma/index.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const SignupValidation = [
  body("name").trim().notEmpty().withMessage("Name field Required"),
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password").isLength({ min: 5 }).withMessage("Password must be 6 char long"),
  body("role").notEmpty().withMessage("role field is Required")

];
export const Signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ "errors": errors.array() })
  }
  const { name, email, username, password, role } = req.body
  const salt = bcrypt.genSaltSync(10)
  const newPass = bcrypt.hashSync(password, salt)
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: newPass,
        role,
        username
      }
    })
    user.password = undefined;
    return res.status(201).json(user)
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "username or pasword Already Exiss"
      }
    })
  }

}

export const SigninValidation = [
  body("email").notEmpty().isEmail().withMessage("Email is required"),
  body("password").isLength({ min: 5 }).withMessage("Password must be 6 char long"),
];
export const Signin = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ "errors": errors.array() })
  }
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(401).json({
        "errors": {
          "msg": "Invalid Credintials"
        }
      })
    }
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        "errors": {
          "msg": "Invalid Credintials"
        }
      })
    }
    user.password = undefined;
    const acces_token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT)

    return res
      .cookie("acces_token", acces_token, {
        httpOnly: true,
      })
      .status(201)
      .json(user)
  } catch (error) {
    return res.status(401).json({
      "errors": {
        "msg": "Invalid Credintials"
      }
    })
  }

}

