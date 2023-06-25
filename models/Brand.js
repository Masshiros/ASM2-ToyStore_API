import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    toys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toy",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// user model
const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;
