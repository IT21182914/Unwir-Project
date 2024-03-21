import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal"; // Import Modal
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

Modal.setAppElement("#root"); // Set the app element to the root of your React app

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteForm />} />
        <Route path="/cards" element={<NoteList />} />
      </Routes>
    </Router>
  );
}

export default App;
