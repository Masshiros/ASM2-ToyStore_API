import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ToySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    ages: {
      type: [String],
      enum: ["0-1", "1-3", "3-6", "6-10", "10-12"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        default: "https://via.placeholder.com/150",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
// virtuals
//  total rating
ToySchema.virtual("totalReviews").get(function () {
  const toy = this;
  return toy?.reviews?.length;
});
// average rating
ToySchema.virtual("averageRatings").get(function () {
  let totalRatings = 0;
  const toy = this;
  toy?.reviews?.forEach((review) => {
    totalRatings += review?.rating;
  });
  const averageRating = Number(totalRatings / toy?.reviews?.length).toFixed();
  return averageRating;
});
// user model
const Toy = mongoose.model("Toy", ToySchema);
export default Toy;
