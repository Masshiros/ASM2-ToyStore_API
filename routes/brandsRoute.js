import express from "express";
import {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRoute = express.Router();
brandsRoute.post("/", isLoggedIn,isAdmin, createBrand);
brandsRoute.get("/", getBrands);
brandsRoute.get("/:id", getBrand);
brandsRoute.delete("/:id", isLoggedIn, isAdmin,deleteBrand);
brandsRoute.put("/:id", isLoggedIn, isAdmin,updateBrand);

export default brandsRoute;
