import express from "express";
import categoryFileUpload from "../config/categoryUpload.js";
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoriesController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRoute = express.Router();
categoriesRoute.post(
  "/",
  isLoggedIn,
  categoryFileUpload.single("file"),
  createCategory
);
categoriesRoute.get("/", getCategories);
categoriesRoute.get("/:id", getCategory);
categoriesRoute.delete("/:id", deleteCategory);
categoriesRoute.put("/:id", updateCategory);

export default categoriesRoute;
