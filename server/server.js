import express from "express";               // Import Express framework to create the web server
import mongoose from "mongoose";             // Import Mongoose to connect and work with MongoDB database
import bodyParser from "body-parser";        // Middleware to parse incoming JSON and form data in requests
import dotenv from "dotenv";                  // Load environment variables from a .env file
import cors from "cors";                      // Middleware to enable Cross-Origin Resource Sharing (CORS)
import route from "./routes/projectRoute.js"; // Import project-related routes
import authRoute from "./routes/authRoute.js"; // Import authentication-related routes

import path from "path";                      // Node.js module to handle file paths
import { fileURLToPath } from 'url';          // Utilities for URL and file path conversions
import { dirname } from 'path';

// These three lines are used to get the current directory path (needed for serving static files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // Create an Express app (the web server)

dotenv.config(); // Load environment variables from a .env file

app.use(cors({
  origin: "https://portfolio-mern-frontend-bk2d.onrender.com", // URL front-end part
})); // Enable CORS so the API can be accessed from other domains (like your frontend)

app.use(bodyParser.json()); // Tell Express to parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Also parse URL-encoded form data

// Set up routes for authentication and projects, both under the "/api" prefix
app.use("/api/auth", authRoute);
app.use("/api/project", route);

const PORT = process.env.PORT || 7000;           // Use port from environment or default to 7000
const MONGOURL = process.env.MONGO_URL;          // Get MongoDB connection string from environment variables

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// Connect to MongoDB database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log('MongoDB connected successfully.');

    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });