
import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { CreatePackage, GetAllPackage } from '../controllers/PackageController.js';



const PackageRouter = express.Router();

PackageRouter.route("/package").post(isAuth, CreatePackage)
PackageRouter.route("/package").get(GetAllPackage)

export default PackageRouter
