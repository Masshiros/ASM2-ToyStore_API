import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateTokens.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc register user
// @route POST /api/v1/users/register
// @access public
export const register = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // 1) check user is existed or not
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Error("User already exist");
  }
  //2) hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //3) create
  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    status: "Success",
    msg: "Register User Successfully",
    data: newUser,
  });
});
// @desc Login user
// @route POST /api/v1/users/login
// @access public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user
  const foundUser = await User.findOne({
    email,
  });
  if (
    foundUser &&
    password &&
    (await bcrypt.compare(password, foundUser?.password))
  ) {
    res.json({
      status: "success",
      message: "User login successfully",
      foundUser,
      token: generateToken(foundUser?._id),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

// @desc GET user profile
// @route GET /api/v1/users/profile
// @access private

export const getUserProfile = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  console.log(token);
  // verify token
  const verified = verifyToken(token);
  console.log(verified);
  res.json({
    msg: "Welcome Profile Page",
  });
});
