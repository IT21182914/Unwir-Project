import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:8080/notes"); // Adjust the URL as needed
        setNotes(response.data); // Assuming response.data is an array of notes
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {notes.map((note, index) => (
        <NoteCard key={index} title={note.title} content={note.content} />
      ))}
    </div>
  );
};

export default NoteList;
