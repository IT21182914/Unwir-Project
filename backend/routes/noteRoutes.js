const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.post("/add", noteController.createNote);
router.put("/update/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
