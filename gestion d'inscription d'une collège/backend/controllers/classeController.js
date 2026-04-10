import Classe from "../models/Classe.js";

// --- CREATE ---
export const createClasse = async (req, res) => {
  try {
    const classe = await Classe.create(req.body);
    res.status(201).json(classe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- READ ALL ---
export const getClasses = async (req, res) => {
  try {
    const classes = await Classe.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- UPDATE ---
export const updateClasse = async (req, res) => {
  try {
    const updated = await Classe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Classe introuvable" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- DELETE ---
export const deleteClasse = async (req, res) => {
  try {
    const deleted = await Classe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Classe introuvable" });

    res.json({ message: "Classe supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};