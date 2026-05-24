import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import classeRoutes from "./routes/classeRoutes.js";
import eleveRoutes from "./routes/eleveRoutes.js";
import inscriptionRoutes from "./routes/inscriptionRoutes.js";
import usersRoutes from "./routes/users.js"; // À ajouter



//connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

//app.use("/api/auth", authRoutes);
app.use("/api/classes", classeRoutes);
app.use("/api/eleves", eleveRoutes);
app.use("/api/inscriptions", inscriptionRoutes);
//pour gestion user
app.use("/api/users", usersRoutes);

//app.listen(5000, () => console.log("🚀 Serveur backend: http://localhost:5000"));
// start server
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur le port ${PORT}`);
});