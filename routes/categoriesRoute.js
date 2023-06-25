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
import isAdmin from "../middlewares/isAdmin.js";

const categoriesRoute = express.Router();
categoriesRoute.post(
  "/",
  isLoggedIn,
  isAdmin,
  categoryFileUpload.single("file"),
  createCategory
);
categoriesRoute.get("/", getCategories);
categoriesRoute.get("/:id", getCategory);
categoriesRoute.delete("/:id",isLoggedIn, isAdmin, deleteCategory);
categoriesRoute.put("/:id",isLoggedIn, isAdmin, updateCategory);

export default categoriesRoute;
