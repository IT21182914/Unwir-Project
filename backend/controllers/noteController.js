const Note = require("../models/noteModel");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });
  try {
    await newNote.save();
    res.json("Note added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.json("Note updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json("Note deleted.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
