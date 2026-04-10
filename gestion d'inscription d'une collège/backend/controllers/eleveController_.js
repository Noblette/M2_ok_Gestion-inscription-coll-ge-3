import Eleve from "../models/Eleve.js";

export const ajouterEleve = async (req, res) => {
  try {
    const eleve = await Eleve.create(req.body);
    res.status(201).json(eleve);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listeEleves = async (req, res) => {
  try {
    const data = await Eleve.find().populate("classe");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};