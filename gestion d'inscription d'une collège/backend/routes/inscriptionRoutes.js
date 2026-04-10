import express from "express";
import {
  createInscription,
  getInscriptions,
  deleteInscription,
  updateInscription, // NOUVEAU
} from "../controllers/inscriptionController.js";

import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADMIN crée et supprime
router.post("/", auth, isAdmin, createInscription);
router.delete("/:id", auth, isAdmin, deleteInscription);
router.put("/:id", auth, isAdmin, updateInscription);  // ✅ AJOUTEZ CETTE LIGNE

// USER & ADMIN lisent
router.get("/", auth, getInscriptions);

export default router;