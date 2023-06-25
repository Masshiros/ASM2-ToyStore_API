import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const reviewRoute = express.Router();

reviewRoute.post("/:toyID", isLoggedIn, createReview);

export default reviewRoute;
