import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
// @desc create new brand
// @route POST /api/v1/brands
// @access private/admin

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  // brand exists
  const foundBrand = await Brand.findOne({ name });
  if (foundBrand) {
    throw new Error("Brand already exist");
  }
  // create
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthID,
  });
  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});

// @desc get all brands
// @route POST /api/v1/brands
// @access public
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "success",
    message: "Fetch brands successfully",
    brands,
  });
});

// @desc get one brand
// @route POST /api/v1/brands/:id
// @access public
export const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    message: "Brand found",
    brand,
  });
});

// @desc update one brand
// @route PUT /api/v1/brands/:id
// @access private/admin

export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  res.json({
    status: "success",
    message: "Brand updated successfully",
    brand,
  });
});

// @desc delete brand
// @route DELETE /api/v1/brands/:id
// @access private/admin

export const deleteBrand = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Brand deleted successfully",
  });
});
