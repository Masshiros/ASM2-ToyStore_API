import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import mongoConnect from "../config/mongoConnect.js";

import userRoutes from "../routes/userRoute.js";
import toysRoutes from "../routes/toysRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
import brandsRoute from "../routes/brandsRoute.js";
import colorsRoute from "../routes/colorsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import {
  globalErrorHandle,
  notFound,
} from "../middlewares/globalErrorHandle.js";
// connect to mongoDB
mongoConnect();
const app = express();
// cors
app.use(cors());
// pass req.body
app.use(express.json());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/toys", toysRoutes);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/colors", colorsRoute);
app.use("/api/v1/reviews", reviewsRoute);

// error middleware
app.use(notFound);
app.use(globalErrorHandle);

export default app;
