const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getAllNotes, addNote, updateNote, deleteNote } = require('../controllers/notesController');

router.get("/", getAllNotes);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;