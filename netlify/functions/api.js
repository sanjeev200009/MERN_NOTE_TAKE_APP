const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('../../backend/src/config/db.js');
const notesRoutes = require('../../backend/src/routes/nodeRoutes.js');
const { ratelimiter } = require('../../backend/src/middleware/rateLimiter.js');

const app = express();

// CORS configuration for Netlify
app.use(cors({
  origin: true, // Allow all origins for Netlify
  credentials: true
}));

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Base route for testing
app.get('/', (req, res) => {
  res.json({
    message: "MERN Notes API - Netlify Functions",
    status: "Running",
    endpoints: {
      "GET /.netlify/functions/api/notes": "Get all notes",
      "POST /.netlify/functions/api/notes": "Create a new note",
      "GET /.netlify/functions/api/notes/:id": "Get a specific note", 
      "PUT /.netlify/functions/api/notes/:id": "Update a note",
      "DELETE /.netlify/functions/api/notes/:id": "Delete a note"
    }
  });
});

// API routes
app.use('/notes', ratelimiter, notesRoutes);

// Export handler for Netlify Functions
module.exports.handler = serverless(app);