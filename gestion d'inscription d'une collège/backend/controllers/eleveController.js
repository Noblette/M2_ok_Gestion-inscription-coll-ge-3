import Eleve from "../models/Eleve.js";

// CREATE
export const createEleve = async (req, res) => {
  try {
    const eleve = await Eleve.create(req.body);
    res.status(201).json(eleve);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getEleves = async (req, res) => {
  try {
    const data = await Eleve.find().populate("classe");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
export const getEleve = async (req, res) => {
  try {
    const eleve = await Eleve.findById(req.params.id).populate("classe");
    if (!eleve) return res.status(404).json({ message: "Élève introuvable" });

    res.json(eleve);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateEleve = async (req, res) => {
  try {
    const updated = await Eleve.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Élève introuvable" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteEleve = async (req, res) => {
  try {
    const deleted = await Eleve.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Élève introuvable" });

    res.json({ message: "Élève supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};