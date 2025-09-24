const getAllNotes = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get all notes successfully",
        data: []
    });
};

const addNote = (req, res) => {
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: req.body
    });
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

