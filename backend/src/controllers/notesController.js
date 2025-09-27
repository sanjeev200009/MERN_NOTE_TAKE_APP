const Note = require('../models/Node');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({
            success: true,
            message: "Get all notes successfully",
            data: notes,
            count: notes.length
        });
    } catch (error) {
        console.error("Error while getting all notes from DB:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const addNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const note = new Note({title, content});
       const saveNote = await note.save();
        res.status(201).json(saveNote);
    } catch (error) {
        console.error("Error while creating notes:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
};

const updateNote = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: { id: req.params.id, ...req.body }
    });
};

const deleteNote = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        data: { id: req.params.id }
    });
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote };

