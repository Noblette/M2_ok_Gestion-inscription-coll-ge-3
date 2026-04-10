import Inscription from "../models/Inscription.js";

// CREATE
export const createInscription = async (req, res) => {
  try {
    const inscription = await Inscription.create(req.body);
    res.status(201).json(inscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ALL
export const getInscriptions = async (req, res) => {
  try {
    const data = await Inscription.find()
      .populate("eleve")
      .populate("classe");
      
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteInscription = async (req, res) => {
  try {
    const deleted = await Inscription.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Inscription introuvable" });

    res.json({ message: "Inscription supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update
// UPDATE (NOUVEAU)
/* export const updateInscription = async (req, res) => {
  try {
    const { id } = req.params;
    const inscription = await Inscription.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }//ty hoe erreur
    )
    .populate("eleve")
    .populate("classe");
    
    if (!inscription) {
      return res.status(404).json({ message: "Inscription introuvable" });
    }
    
    res.json(inscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; */
export const updateInscription = async (req, res) => {
  try {
    const { id } = req.params;
    const inscription = await Inscription.findByIdAndUpdate(
      id,
      req.body,
      { 
        returnDocument: 'after',  // ✅ Remplace new: true
        runValidators: true 
      }
    )
    .populate("eleve")
    .populate("classe");
    
    if (!inscription) {
      return res.status(404).json({ message: "Inscription introuvable" });
    }
    
    res.json(inscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};