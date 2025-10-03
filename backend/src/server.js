const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const path = require("path");

const connectDB = require('./config/db.js');
const notesRoutes = require('./routes/nodeRoutes.js');
const { ratelimiter } = require('./middleware/rateLimiter.js');

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === "production" 
  ? ["https://mern-note-take-app.vercel.app"] 
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware for JSON parsing
app.use(express.json());


// Routes
app.use("/api/notes", ratelimiter, notesRoutes);

 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}
// Connect to database
connectDB().then(()=>{
    if (process.env.NODE_ENV !== "production") {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});

// Export for Vercel serverless functions
module.exports = app;



