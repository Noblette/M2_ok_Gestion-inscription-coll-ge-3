import mongoose from "mongoose";

const inscriptionSchema = new mongoose.Schema({
  eleve: { type: mongoose.Schema.Types.ObjectId, ref: "Eleve" },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
  anneeScolaire: String,
  frais: Number,
  dateInscription: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Inscription", inscriptionSchema);