
import { Router } from "express";
import { createNote, getNotes, deleteNote, updateNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkSubscriptionLimit } from "../middleware/subscriptionMiddleware.js";

const router = Router();

router.post("/", protect, checkSubscriptionLimit, createNote );
router.get("/", protect, getNotes );
router.put("/:id", protect, updateNote );
router.delete("/:id", protect, deleteNote );

export default router ;
