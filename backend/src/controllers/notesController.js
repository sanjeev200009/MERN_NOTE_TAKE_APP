const Note = require('../models/Node');

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({
            success: true,
            message: "Retrieved all notes successfully",
            data: notes,
            count: notes.length
        });
    } catch (error) {
        console.error("Error while getting all notes:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Add a note
const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();

        return res.status(201).json({
            success: true,
            message: `Note '${savedNote.title}' added successfully`,
            data: savedNote
        });
    } catch (error) {
        console.error("Error while creating note:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });
    } catch (error) {
        console.error("Error while updating note:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.error("Error while deleting note:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { getAllNotes, addNote, updateNote, deleteNote };
