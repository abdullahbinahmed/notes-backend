import { Request, Response } from "express";
import crypto from "node:crypto";
import { notes, Note } from "../models/noteModel";

export const createNote = (req: Request, res: Response): void => {
  if (!req.body) {
    res.status(400).json({ error: "Malformed request. Missing request body" });
    return;
  }

  const { title, content } = req.body;

  if (
    !title ||
    !content ||
    typeof title !== "string" ||
    typeof content !== "string"
  ) {
    console.error({ error: "Title and content are required fields." });
    res.status(400).json({ error: "Title and content are required fields." });
    return;
  }
  const newNote: Note = {
    id: crypto.randomUUID(),
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date(),
  };

  notes.push(newNote);

  console.log(newNote);
  res.status(201).json({ newNote });
};

export const getAllNotes = (req: Request, res: Response): void => {
  console.log(notes);
  res.status(200).json(notes);
};

export const getNoteById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);

  if (!note) {
    console.error({ error: `Note with ID ${id} not found.` });
    res.status(404).json({ error: `Note with ID ${id} not found.` });
    return;
  }

  console.log(note);
  res.status(200).json(note);
};

export const updateNote = (req: Request, res: Response): void => {
  const { id } = req.params;

  if (!req.body) {
    console.error({ error: "Malformed request. Missing request body" });
    res.status(400).json({ error: "Malformed request. Missing request body" });
    return;
  }

  const { title, content } = req.body;

  if (title === undefined && content === undefined) {
    console.error({
      error: "Please provide a title or content field to update.",
    });
    res
      .status(400)
      .json({ error: "Please provide a title or content field to update." });
    return;
  }
  if (title !== undefined && typeof title !== "string") {
    console.error({ error: "Title must be a valid string value." });
    res.status(400).json({ error: "Title must be a valid string value." });
    return;
  }
  if (content !== undefined && typeof content !== "string") {
    console.error({ error: "Content must be a valid string value." });
    res.status(400).json({ error: "Content must be a valid string value." });
    return;
  }

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    console.error({ error: `Note with ID ${id} not found.` });
    res.status(404).json({ error: `Note with ID ${id} not found.` });
    return;
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title !== undefined ? title.trim() : notes[noteIndex].title,
    content: content !== undefined ? content.trim() : notes[noteIndex].content,
  };

  console.log(notes[noteIndex]);
  res.status(200).json(notes[noteIndex]);
};

export const deleteNote = (req: Request, res: Response): void => {
  const { id } = req.params;
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    console.error({ error: `Note with ID ${id} not found.` });
    res.status(404).json({ error: `Note with ID ${id} not found.` });
    return;
  }
  notes.splice(noteIndex, 1);
  console.log("Note successfully deleted.");
  res.status(200).json({ message: "Note successfully deleted." });
};
