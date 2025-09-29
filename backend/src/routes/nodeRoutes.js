const express = require('express');
const router = express.Router();
const { getAllNotes, addNote, updateNote, deleteNote,getNoteById } = require('../controllers/notesController');

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;