import User from "../models/User.js";
import bcrypt from "bcrypt";

// GET ALL (admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-motdepasse"); // Cache le mot de passe
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// CREATE (admin only)
export const createUser = async (req, res) => {
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motdepasse, 10);

    const user = await User.create({
      nom,
      email,
      motdepasse: hash,
      role: role || "user",
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (admin only)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, motdepasse, role } = req.body;

    const userData = { nom, email, role };

    // Nouveau mot de passe seulement si fourni
    if (motdepasse) {
      userData.motdepasse = await bcrypt.hash(motdepasse, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      userData,
      { returnDocument: 'after', runValidators: true }
    ).select("-motdepasse");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Empêche la suppression de soi-même
    if (id === req.user.id) {
      return res.status(400).json({ message: "Impossible de se supprimer soi-même" });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};