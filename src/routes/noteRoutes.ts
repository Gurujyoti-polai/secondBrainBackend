import { Router } from "express";
import { verifyToken } from "../middleware/middleware";
import {
  createNote,
  deleteNote,
  getMyNotes,
  getPublicNote,
  toggleNoteShare,
  updateNote,
} from "../controllers/noteController";

const router = Router();

router.post(
  "/",
  verifyToken,
  (req, res, next) => {
    console.log("✅ POST /api/notes inisde router");
    next();
  },
  createNote
);

router.get(
  "/",
  verifyToken,
  (req, res, next) => {
    console.log("✅ GET /api/notes inside router");
    next();
  },
  getMyNotes
);

router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);
router.put("/share/:id", verifyToken, (req, res, next) => {
  console.log("✅ POST /api/toggleNoteShare inside router");
  next();
},toggleNoteShare);
router.get("/shared/:slug", (req, res, next) => {
  console.log("✅ GET /public/slug inside router");
  next();
},getPublicNote);

export default router;
