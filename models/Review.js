import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    toys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toy",
        required: [true, "Review must belong to a toy"],
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a number between 1 and 5"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);
// user model
const Review = mongoose.model("Review", ReviewSchema);
export default Review;
