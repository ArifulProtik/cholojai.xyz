
import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { CreatePackage, GetAllPackage, GetPackageBySlug, SearchPackage } from '../controllers/PackageController.js';



const PackageRouter = express.Router();

PackageRouter.route("/package").post(isAuth, CreatePackage)
PackageRouter.route("/package").get(GetAllPackage)
PackageRouter.route("/package/:slug").get(GetPackageBySlug)
PackageRouter.route("/search").get(SearchPackage)

export default PackageRouter
