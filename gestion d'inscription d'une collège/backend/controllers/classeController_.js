import Classe from "../models/Classe.js";

export const ajouterClasse = async (req, res) => {
  try {
    const classe = await Classe.create(req.body);
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listeClasses = async (req, res) => {
  try {
    const data = await Classe.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};