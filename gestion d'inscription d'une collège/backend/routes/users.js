// routes/users.js - VERSION PROPRE
import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ✅ LECTURE pour TOUS (user + admin)
router.get("/", auth, getUsers);

// TEMPORAIRE pour test
//router.get("/", getUsers);  // SANS auth, tsy mety

// ✅ MODIFICATION Admin SEULEMENT
router.post("/", auth, isAdmin, createUser);
router.put("/:id", auth, isAdmin, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

export default router;