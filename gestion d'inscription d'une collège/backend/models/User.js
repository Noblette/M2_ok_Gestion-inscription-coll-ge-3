import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, unique: true },
  motdepasse: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);