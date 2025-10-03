# MERN Stack Note Taking Application

**🌟 Successfully Deployed on Netlify** | [Live Demo](https://deploy-preview-23--mernnotetakeapp.netlify.app/)

This is a demonstration of how MERN stack applications work in the real world. The project is structured with separate frontend and backend components and is successfully deployed on Netlify.

## 🌐 Live Demo

**🚀 Live Application**: [Visit the app on Netlify](https://deploy-preview-23--mernnotetakeapp.netlify.app/)

*Features a beautiful Synthwave theme with full CRUD functionality!*

> **Note**: This project has migrated from Vercel to Netlify. All Vercel deployments shown are outdated and can be ignored.

## 📋 Project Overview

This note-taking application showcases the implementation of a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with proper separation of concerns between frontend and backend. The app is deployed using Netlify Functions for serverless backend hosting.

## 🛠️ Technology Stack

### Backend
- **Node.js**: Server-side runtime environment for JavaScript
- **Express.js**: Popular backend framework for creating impactful APIs
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: MongoDB object modeling for Node.js
- **Netlify Functions**: Serverless backend deployment

### Frontend
- **React.js**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Beautiful UI components with Synthwave theme
- **Vite**: Fast frontend build tool

## 🔌 API Architecture

The application uses **REST APIs** (Representational State Transfer) to connect the frontend and database securely. REST API is a widely-used architectural style for designing networked applications.

### HTTP Methods Used

- **GET**: Retrieve data from the server
- **POST**: Create new data on the server
- **PUT**: Update existing data on the server
- **DELETE**: Remove data from the server

## 📁 Project Structure

```
MERN_NOTE_TAKE_APP/
├── backend/          # Server-side code
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── .env          # Environment variables
└── frontend/         # Client-side code (React)
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run server
   ```

The backend server will run on port 5000 (or as specified in environment variables).

## 🌟 Features

- Create, read, update, and delete notes (CRUD operations)
- RESTful API endpoints
- Secure data handling
- Responsive design
- Real-time updates

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/notes | Get all notes |
| POST   | /api/notes | Create a new note |
| PUT    | /api/notes/:id | Update a specific note |
| DELETE | /api/notes/:id | Delete a specific note |

## 🚀 Deployment

This application is successfully deployed on **Netlify** with the following architecture:

### Frontend Deployment
- **Platform**: Netlify Static Hosting
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/dist`

### Backend Deployment
- **Platform**: Netlify Functions (Serverless)
- **Function Path**: `/.netlify/functions/api`
- **Dependencies**: Automatically installed from root package.json

### Environment Variables Required
- `MONGODB_URI`: MongoDB Atlas connection string
- `UPSTASH_REDIS_REST_URL`: Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN`: Redis authentication token

## 🎨 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete notes
- ✅ **Beautiful Synthwave Theme**: Retro-futuristic dark theme with neon colors
- ✅ **Responsive Design**: Works perfectly on all device sizes
- ✅ **Rate Limiting**: Built-in API rate limiting for security
- ✅ **Real-time Feedback**: Toast notifications for user actions
- ✅ **Serverless Architecture**: Fast, scalable deployment on Netlify

## 🤝 Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## 📄 License

This project is open source and available under the [ISC License](LICENSE). 
