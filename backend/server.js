const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const notesRoutes = require('./routes/nodeRoutes.js');
dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


