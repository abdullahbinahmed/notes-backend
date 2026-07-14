import { INoteRepository } from "../repositories/noteRepository";
import { Note } from "../models/noteModel";

export class NoteService {
  constructor(private noteRepository: INoteRepository) {}

  async getAllNotes(): Promise<Note[]> {
    return this.noteRepository.findAll();
  }

  async getNoteById(id: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return note;
  }

  async createNote(title: any, content: any): Promise<Note> {
    if (
      !title ||
      !content ||
      typeof title !== "string" ||
      typeof content !== "string"
    ) {
      throw new Error("Title and content are required string fields.");
    }
    return this.noteRepository.create(title, content);
  }

  async updateNote(id: string, title: any, content: any): Promise<Note> {
    if (title === undefined && content === undefined) {
      throw new Error("Please provide a title and content to update.");
    }
    if (title !== undefined && typeof title !== "string") {
      throw new Error("Title must be a valid string.");
    }
    if (content !== undefined && typeof content !== "string") {
      throw new Error("Content must be a valid string.");
    }
    const updateNote = await this.noteRepository.update(id, title, content);
    if (!updateNote) {
      throw new Error(`Note with ID ${id} not found.`);
    }
    return updateNote;
  }
  async deleteNote(id: string): Promise<void> {
    const success = await this.noteRepository.delete(id);
    if (!success) {
      throw new Error(`Note with ID ${id} not found.`);
    }
  }
}
