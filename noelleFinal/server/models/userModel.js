import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profilePic: { type: String, default: " " },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    totalSpend: { type: Number, default: 0 },
    totalAddToCart: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    role: { type: String, default: " " },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
