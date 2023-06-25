import Color from "../models/Color.js";
import asyncHandler from "express-async-handler";
// @desc create new color
// @route POST /api/v1/colors
// @access private/admin

export const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // color exists
  const foundColor = await Color.findOne({ name });
  if (foundColor) {
    throw new Error("Color already exist");
  }
  // create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthID,
  });
  res.json({
    status: "success",
    message: "Color created successfully",
    color,
  });
});

// @desc get all colors
// @route POST /api/v1/colors
// @access public
export const getColors = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: "success",
    message: "Fetch colors successfully",
    colors,
  });
});

// @desc get one color
// @route POST /api/v1/colors/:id
// @access public
export const getColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "success",
    message: "Color found",
    color,
  });
});

// @desc update one color
// @route PUT /api/v1/colors/:id
// @access private/admin

export const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Color updated successfully",
    color,
  });
});

// @desc delete color
// @route DELETE /api/v1/colors/:id
// @access private/admin

export const deleteColor = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Color deleted successfully",
  });
});
