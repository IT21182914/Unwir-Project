import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(
          "https://unwir-project-0joa.onrender.com/notes"
        );
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
      await axios.delete(`https://unwir-project-0joa.onrender.com/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      style={{
        backgroundImage: `url(https://cdn.pixabay.com/photo/2016/01/09/18/28/notepad-1130743_1280.jpg)`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
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
