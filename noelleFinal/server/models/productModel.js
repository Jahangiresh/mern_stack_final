import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    isTrending: { type: Boolean, required: true },
    count: { type: Number, required: true, default: 1 },
    instruction: { type: String, required: true },
    ratings: [
      {
        rating: { type: Number, default: 0 },
      },
    ],
    substance: { type: String },

    comments: [
      {
        userName: { type: String },
        comment: { type: String, default: " " },
        created_at: { type: Date, required: true, default: Date.now },
        replies: [
          {
            reply: { type: String },
          },
        ],
      },
    ],
    reRender: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
