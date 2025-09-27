const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const notesRoutes = require('./routes/nodeRoutes.js');

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


