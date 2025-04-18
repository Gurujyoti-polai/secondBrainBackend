import { Request, Response } from "express";
import Note from "../models/Note";
import { idText } from "typescript";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    console.log("inside Create Note");
    const userId = (req as any).userId;

    console.log("This is the User ID", userId);

    const note = await Note.create({ title, content, user: userId });
    console.log("This is the note", note);

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const getMyNotes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const notes = await Note.find({ user: userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note" });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const noteId = req.params.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};
