import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteForm />}></Route>
        <Route path="/cards" element={<NoteList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
