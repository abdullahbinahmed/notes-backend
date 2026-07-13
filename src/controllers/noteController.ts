import {Request, Response} from "express";
import crypto from "node:crypto";
import {notes, Note} from "../models/noteModel";

export const createNote = (req: Request, res: Response):void => {
    if (!req.body){
        res.status(400).json({error: "Malformed request. Missing request body"});
        return;
    }

    const {title,content} = req.body;

    if(!title || !content || typeof title !== "string" || typeof content !== "string") {
        res.status(400).json({error: 'Title and content are required fields.'});
        return;
    }
    const newNote: Note = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
    };

    notes.push(newNote);
    res.status(201).json({newNote})
}

export const getAllNotes = (req: Request, res: Response):void => {
    res.status(200).json(notes);
}

export const getNoteById = (req: Request, res: Response):void => {
    const {id} = req.params;
    const note = notes.find(note => note.id === id);

    if(!note) {
        res.status(404).json({error: `Note with ID ${id} not found.`});
        return;
    }

    res.status(200).json(note);
};

export const updateNote = (req: Request, res: Response):void => {
    const {id} = req.params;
    const {title, content} = req.body;

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1){
        res.status(404).json({error: `Note with ID ${id} not found.`});
        return;
    }

    if (!title || !content || typeof title !== "string" || typeof content !== "string") {
        res.status(400).json({error: 'Title and content are required fields.'});
        return;
    }

    notes[noteIndex]= {
        ...notes[noteIndex],
        title: title.trim(),
        content: content.trim(),
    };
    res.status(200).json(notes[noteIndex]);
};

export const deleteNote = (req: Request, res: Response):void => {
    const {id} = req.params;
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1){
        res.status(404).json({error: `Note with ID ${id} not found.`});
        return;
    }
    notes.splice(noteIndex, 1);
    res.status(200).json({messsage: 'Note successfully deleted.'});

}

