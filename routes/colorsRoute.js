import express from "express";
import {
  createColor,
  getColor,
  getColors,
  updateColor,
  deleteColor,
} from "../controllers/colorController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorsRoute = express.Router();
colorsRoute.post("/", isLoggedIn, createColor);
colorsRoute.get("/", getColors);
colorsRoute.get("/:id", getColor);
colorsRoute.delete("/:id",isLoggedIn, isAdmin, deleteColor);
colorsRoute.put("/:id",isLoggedIn, isAdmin, updateColor);

export default colorsRoute;
