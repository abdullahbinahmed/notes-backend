import { Note, notes } from "../models/noteModel";

export interface IReadNoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: string): Promise<Note | null>;
}

export interface IWriteNoteRepository {
  create(title: string, content: string): Promise<Note>;
  update(id: string, title: string, content: string): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}

export interface INoteRepository
  extends IReadNoteRepository, IWriteNoteRepository {}

export class InMemoryNoteRepository implements INoteRepository {
  async findAll(): Promise<Note[]> {
    return [...notes];
  }
  async findById(id: string): Promise<Note | null> {
    const note = notes.find((note) => note.id === id);
    return note || null;
  }
  async create(title: string, content: string): Promise<Note> {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title,
      content: content,
      createdAt: new Date(),
    };
    notes.push(newNote);
    return newNote;
  }
  async update(
    id: string,
    title: string,
    content: string,
  ): Promise<Note | null> {
    const noteIndex = notes.findIndex((e) => e.id === id);

    if (noteIndex === -1) {
      return null;
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title !== undefined ? title.trim() : notes[noteIndex].title,
      content:
        content !== undefined ? content.trim() : notes[noteIndex].content,
    };
    return notes[noteIndex];
  }
  async delete(id: string): Promise<boolean> {
    const noteIndex = notes.findIndex((e) => e.id === id);

    if (noteIndex === -1) {
      return false;
    }
    notes.splice(noteIndex, 1);
    return true;
  }
}
