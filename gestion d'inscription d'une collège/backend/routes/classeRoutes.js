import express from "express";
import {
  createClasse,
  getClasses,
  updateClasse,
  deleteClasse
} from "../controllers/classeController.js";

import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ADMIN ONLY
router.post("/", auth, isAdmin, createClasse);
router.get("/", auth, getClasses);
router.put("/:id", auth, isAdmin, updateClasse);
router.delete("/:id", auth, isAdmin, deleteClasse);

export default router;



/* import express from "express";
import { getClasses, addClasse } from "../controllers/classeController.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", auth, getClasses);
router.post("/", auth, role("admin"), addClasse);

export default router; */