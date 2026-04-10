import mongoose from "mongoose";
import User from "../models/User.js";
//import bcrypt from "bcryptjs";
import bcrypt from "bcrypt"; // <-- ajouté ici
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // Vérifie si un admin existe déjà
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // mot de passe par défaut

      await User.create({
        nom: "Admin",
        email: "admin@ecole.com",
        motdepasse: hashedPassword,
        role: "admin"
      });

      console.log("👑 Admin par défaut créé : admin@ecole.com / admin123");
    }

  } catch (error) {
    console.error("❌ Erreur MongoDB :", error);
    process.exit(1);
  }
};

export default connectDB;