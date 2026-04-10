import Inscription from "../models/Inscription.js";

export const inscrireEleve = async (req, res) => {
  try {
    const inscription = await Inscription.create(req.body);
    res.status(201).json(inscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listeInscriptions = async (req, res) => {
  try {
    const data = await Inscription.find()
      .populate("eleve")
      .populate("classe");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};