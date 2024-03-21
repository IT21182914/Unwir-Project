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

  const handleUpdateNote = () => {
    console.log("Note updated!");
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
        />
      ))}
    </div>
  );
};

export default NoteList;
