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
const toysRoutes = express.Router();

toysRoutes.post("/", isLoggedIn, upload.array("files"), createNewToy);
toysRoutes.get("/", getToys);
toysRoutes.get("/:id", getOneToy);
toysRoutes.put("/:id", isLoggedIn, updateOneToy);
toysRoutes.delete("/:id", isLoggedIn, deleteToy);

export default toysRoutes;
