import express from "express";
import {
  register,
  login,
  getUserProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedin.js";
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/profile", isLoggedIn, getUserProfile);

export default userRoutes;
