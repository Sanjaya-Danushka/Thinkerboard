import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notecontroller.js";
const router = express.Router();

// routings
router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
