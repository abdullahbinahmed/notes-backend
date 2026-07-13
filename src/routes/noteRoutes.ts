import {Router} from "express";
import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
} from "../controllers/noteController";

const router = Router();

router.route('/')
    .post(createNote)
    .get(getAllNotes);

router.route('/:id')
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

export default router;