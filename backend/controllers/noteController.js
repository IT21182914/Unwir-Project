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
  try {
    const existingNote = await Note.findOne({ title });
    if (existingNote) {
      return res
        .status(400)
        .json({ message: "Note with this title already exists." });
    }

    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();
    res.status(201).json({ message: "Note added!", note: newNote });
  } catch (err) {
    res.status(400).json({ message: "Error: " + err });
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
