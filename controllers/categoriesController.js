import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";

// @desc create new cate
// @route POST /api/v1/categories
// @access private/admin

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // category exists
  const foundCategory = await Category.findOne({ name });
  if (foundCategory) {
    throw new Error("Category already exist");
  }
  // create
  const category = await Category.create({
    name: name.toLowerCase(),
    user: req.userAuthID,
    image: req.file.path,
  });
  res.json({
    status: "success",
    message: "Category created successfully",
    category,
  });
});

// @desc get all cate
// @route POST /api/v1/categories
// @access public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "Fetch categories successfully",
    categories,
  });
});

// @desc get one cate
// @route POST /api/v1/categories/:id
// @access public
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json({
    status: "success",
    message: "Category found",
    category,
  });
});

// @desc update one cate
// @route PUT /api/v1/categories
// @access private/admin

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Category updated successfully",
    category,
  });
});

// @desc delete one cate
// @route DELETE /api/v1/categories
// @access private/admin

export const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Category deleted successfully",
  });
});
