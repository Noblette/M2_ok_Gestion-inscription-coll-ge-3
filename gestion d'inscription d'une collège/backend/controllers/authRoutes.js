import express from "express";
import { register, login, registerAdmin } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// admin only
router.post("/register-admin", authMiddleware, roleMiddleware("admin"), registerAdmin);

export default router;