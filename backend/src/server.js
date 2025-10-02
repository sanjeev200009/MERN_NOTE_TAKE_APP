const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db.js');
const notesRoutes = require('./routes/nodeRoutes.js');
const { ratelimiter } = require('./middleware/rateLimiter.js');

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], 
}));

// Middleware for JSON parsing
app.use(express.json());


// Routes
app.use("/api/notes", ratelimiter, notesRoutes);

// Connect to database
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});



