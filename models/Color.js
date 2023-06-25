import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
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
   
  },
  {
    timestamps: true,
  }
);
// user model
const Color = mongoose.model("Color", ColorSchema);
export default Color;
