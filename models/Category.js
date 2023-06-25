import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
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
    image: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/269/200/300.jpg?hmac=3bslnrdmLgmcyTAWbxcbaG1-8CQ1XS0z2jWEi25pSrE",
      required: true,
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
    toJSON: { virtuals: true },
  }
);
// user model
const Category = mongoose.model("Category", CategorySchema);
export default Category;
