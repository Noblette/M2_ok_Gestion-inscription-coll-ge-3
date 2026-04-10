import express from "express";
import {
  createEleve,
  getEleves,
  getEleve,
  updateEleve,
  deleteEleve
} from "../controllers/eleveController.js";

import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADMIN peut créer / modifier / supprimer
router.post("/", auth, isAdmin, createEleve);
router.put("/:id", auth, isAdmin, updateEleve);
router.delete("/:id", auth, isAdmin, deleteEleve);

// USER & ADMIN peuvent lire
router.get("/", auth, getEleves);
router.get("/:id", auth, getEleve);


export default router;