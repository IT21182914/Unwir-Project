import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

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
