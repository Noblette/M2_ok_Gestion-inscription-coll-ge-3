/* import express from "express";
import { register, login } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// test route admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({ message: "Bienvenue admin" });
});

// test route user
router.get("/user", auth, (req, res) => {
  res.json({ message: "Bienvenue utilisateur" });
});

export default router; */
import express from "express";
import { register, login } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// route test admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({ message: "Bienvenue Admin" });
});

// route test user
router.get("/user", auth, (req, res) => {
  res.json({ message: "Bienvenue Utilisateur" });
});

export default router;