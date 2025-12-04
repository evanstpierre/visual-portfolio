import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  passwordHash: String,
  role: String
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);