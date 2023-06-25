import User from "../models/User.js";
import asyncHandler from "express-async-handler";
const isAdmin = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.userAuthID);
  if (user?.isAdmin) {
    next();
  } else {
    throw new Error("Access denied, admin only");
  }
});

export default isAdmin;
