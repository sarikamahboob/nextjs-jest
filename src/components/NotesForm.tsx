"use client"

import React, { useState } from 'react'

interface NotesFormProps { 
  addNote: (note:string) => void
}

const NotesForm: React.FC<NotesFormProps> = ({ addNote }) => {
  const [note, setNote] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (note.trim()) {
      addNote(note);
      setNote("");
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit} className='flex space-x-4 mb-4'>
      <input type="text" value={note} onChange={handleChange} placeholder="Add a note" className='border border-gray-300 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-blue-500' />
      <button type="submit" disabled={note.trim() === ""} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Add</button>
    </form>
  );
};

interface NoteListProps {
  notes: string[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <ul className="list-disc space-y-2" data-testid="noteslist">
      {notes.map((note, index) => (
        <li key={index} className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
          {note}
        </li>
      ))}
    </ul>
  );
};

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const addNote = (note: string) => { 
    setNotes(prevNotes => [...prevNotes, note]);
  }
  return (
    <div className='max-w-lg mx-auto mt-10 p-4 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Notes App</h1>
      <NotesForm addNote={addNote} />
      <NoteList notes={notes} />
    </div>
  );
};

export default NotesApp;