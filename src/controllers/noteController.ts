import { Request, Response } from "express";
import { NoteService } from "../services/noteService";

export class NoteController {
  constructor(private noteService: NoteService) {}
  createNote = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body) {
        console.error({ error: "Malformed request. Missing request body" });
        res
          .status(400)
          .json({ error: "Malformed request. Missing request body" });
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
        res
          .status(400)
          .json({ error: "Title and content are required fields." });
        return;
      }
      const newNote = await this.noteService.createNote(title, content);

      console.log(newNote);
      res.status(201).json({ newNote });
    } catch (error: any) {
      console.error({ error: error.message });
      res.status(400).json({ error: error.message });
    }
  };

  getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const allNotes = await this.noteService.getAllNotes();
      console.log(allNotes);
      res.status(200).json(allNotes);
    } catch (error: any) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  };

  getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const note = await this.noteService.getNoteById(id);

      console.log(note);
      res.status(200).json(note);
    } catch (error: any) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  };

  updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;

      if (!req.body) {
        console.error({ error: "Malformed request. Missing request body" });
        res
          .status(400)
          .json({ error: "Malformed request. Missing request body" });
        return;
      }

      const { title, content } = req.body;

      const updatedNote = await this.noteService.updateNote(id, title, content);

      console.log(updatedNote);
      res.status(200).json(updatedNote);
    } catch (error: any) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  };

  deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;

      await this.noteService.deleteNote(id);
      console.log("Note successfully deleted.");
      res.status(200).json({ message: "Note successfully deleted." });
    } catch (error: any) {
      console.error({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  };
}
