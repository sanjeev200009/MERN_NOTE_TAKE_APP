const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get("/", (req, res) => {
    res.status(200).json({ message: 'Get all notes successfully' });
});

router.post("/", (req, res) => {
    res.status(201).json({ message: 'Note created successfully' });
});

router.put("/:id", (req, res) => {
    res.status(200).json({ message: 'Note updated successfully' });
});

router.delete("/:id", (req, res) => {
    res.status(200).json({ message: 'Note deleted successfully' });
});


module.exports = router;