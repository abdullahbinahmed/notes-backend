import { Router } from "express";
import { NoteController } from "../controllers/noteController";
import { NoteService } from "../services/noteService";
import { InMemoryNoteRepository } from "../repositories/noteRepository";

const router = Router();

const noteRepository = new InMemoryNoteRepository();

const noteService = new NoteService(noteRepository);

const noteController = new NoteController(noteService);

router
  .route("/")
  .post(noteController.createNote)
  .get(noteController.getAllNotes);

router
  .route("/:id")
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

export default router;
