import express from "express";
import {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRoute = express.Router();
brandsRoute.post("/", isLoggedIn, createBrand);
brandsRoute.get("/", getBrands);
brandsRoute.get("/:id", getBrand);
brandsRoute.delete("/:id", deleteBrand);
brandsRoute.put("/:id", updateBrand);

export default brandsRoute;
