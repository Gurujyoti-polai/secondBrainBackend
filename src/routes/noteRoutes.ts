import { Router } from "express";
import { verifyToken } from "../middleware/middleware";
import {
  createNote,
  deleteNote,
  getMyNotes,
  updateNote,
} from "../controllers/noteController";

const router = Router();

router.post(
  "/",
  verifyToken,
  (req, res, next) => {
    console.log("✅ GET /api/notes inisde router");
    next();
  },
  createNote
);

router.get(
  "/",
  verifyToken,
  (req, res, next) => {
    console.log("✅ POST /api/notes inside router");
    next();
  },
  getMyNotes
);

router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
