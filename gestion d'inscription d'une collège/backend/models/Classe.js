import mongoose from "mongoose";

const classeSchema = new mongoose.Schema({
  nom: String,
  niveau: String,
  annee: Number
}, { timestamps: true });

export default mongoose.model("Classe", classeSchema);