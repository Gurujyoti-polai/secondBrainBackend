import { Router } from "express";
import {
  signup,
  login,
  getProfile,
  logout,
} from "../controllers/authController";
import { verifyToken } from "../middleware/middleware";
import { createNote, getMyNotes } from "../controllers/noteController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, getProfile);

export default router;
