import mongoose from "mongoose";

const eleveSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  sexe: String,
  dateNaissance: Date,
  adresse: String,
  classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" }
}, { timestamps: true });

export default mongoose.model("Eleve", eleveSchema);
//tsy ilaina io champs classe io