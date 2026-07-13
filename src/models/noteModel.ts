export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export let notes: Note[] = [];