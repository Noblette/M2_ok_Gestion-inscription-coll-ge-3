import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  // empêcher un visiteur de se donner un rôle admin
  // const role = req.body.role === "admin" ? "user" : "user";
  // const role = "user"; // aucune discussion
  //aona ty?
  try {
    const { nom, email, motdepasse, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motdepasse, 10);

    const user = await User.create({
      nom,
      email,
      motdepasse: hash,
      role
    });

    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!match) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//amboarina ty