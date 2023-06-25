import express from "express";
import upload from "../config/fileUpload.js";
import {
  createNewToy,
  getToys,
  getOneToy,
  updateOneToy,
  deleteToy,
} from "../controllers/toyController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const toysRoutes = express.Router();

toysRoutes.post("/", isLoggedIn, isAdmin, upload.array("files"), createNewToy);
toysRoutes.get("/", getToys);
toysRoutes.get("/:id", getOneToy);
toysRoutes.put("/:id", isLoggedIn, isAdmin, updateOneToy);
toysRoutes.delete("/:id", isLoggedIn, isAdmin, deleteToy);

export default toysRoutes;
