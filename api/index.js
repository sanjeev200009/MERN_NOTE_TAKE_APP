const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from local .env file
dotenv.config();

const connectDB = require('../backend/src/config/db.js');
const notesRoutes = require('../backend/src/routes/nodeRoutes.js');
const { ratelimiter } = require('../backend/src/middleware/rateLimiter.js');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://mern-note-take-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/notes', ratelimiter, notesRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    message: "MERN Notes API - Vercel Deployment",
    status: "Running",
    endpoints: {
      "GET /api/notes": "Get all notes",
      "POST /api/notes": "Create a new note", 
      "GET /api/notes/:id": "Get a specific note",
      "PUT /api/notes/:id": "Update a note",
      "DELETE /api/notes/:id": "Delete a note"
    }
  });
});

module.exports = app;