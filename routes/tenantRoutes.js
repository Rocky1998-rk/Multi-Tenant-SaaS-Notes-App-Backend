
import { Router } from "express";
import { getTenants, upgradeTenant } from "../controllers/tenantController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = Router();

// Get all tenants
router.get("/", protect, isAdmin, getTenants);


// Upgrade Subscription
router.post("/:id/upgrade", protect, isAdmin, upgradeTenant);

export default router;
