import express from "express";
import {
  createColor,
  getColor,
  getColors,
  updateColor,
  deleteColor,
} from "../controllers/colorController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const colorsRoute = express.Router();
colorsRoute.post("/", isLoggedIn, createColor);
colorsRoute.get("/", getColors);
colorsRoute.get("/:id", getColor);
colorsRoute.delete("/:id", deleteColor);
colorsRoute.put("/:id", updateColor);

export default colorsRoute;
