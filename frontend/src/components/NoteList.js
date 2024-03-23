import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:8080/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  const handleUpdateNote = (id, updatedTitle, updatedContent) => {
    // Update the state with the updated note
    setNotes(
      notes.map((note) =>
        note._id === id
          ? { ...note, title: updatedTitle, content: updatedContent }
          : note
      )
    );
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {notes.map((note, index) => (
        <NoteCard
          key={index}
          id={note._id}
          title={note.title}
          content={note.content}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
