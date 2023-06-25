import Review from "../models/Review.js";
import Toy from "../models/Toy.js";
import asyncHandler from "express-async-handler";

// @desc   CREATE new review
// @route  POST /api/v1/reviews
// @access Private/admin
export const createReview = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  // 1 find toy
  const foundToy = await Toy.findById(req.params.toyID).populate("reviews");
  if (!foundToy) {
    throw new Error("Toy not found");
  }
  // check if user already reviewed this product
  const hasReviewed = foundToy.reviews?.find((review) => {
    return review?.user?.toString() === req.userAuthID.toString();
  });
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }
  // 2 create
  const review = await Review.create({
    message,
    rating,
    toys: foundToy?._id,
    user: req.userAuthID,
  });
  // 3 push review into toys' reviews
  foundToy.reviews.push(review?._id);
  await foundToy.save();
  res.status(201).json({
    success: "true",
    message: "Review created successfully",
  });
});
