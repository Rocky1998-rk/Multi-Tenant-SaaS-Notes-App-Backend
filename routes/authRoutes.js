
import { Router } from "express";
import { inviteUser, login } from "../controllers/authControllers.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = Router();

// Login
router.post("/login", login);

// invite (Admin only)
router.post("/invite", protect, isAdmin, inviteUser);

export default router;
