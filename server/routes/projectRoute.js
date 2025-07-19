// Import Express to create route handlers
import express from 'express';

// Import middleware that checks if a JWT token is valid (for protected routes)
import { verifyToken } from "../middlewares/verifyToken.js";

// Import controller functions that contain the logic for each route (CRUD operations)
import {
  create,
  deleteProjectById,
  getAllProject,
  getProjectById,
  update
} from '../controller/projectController.js';

// Import middleware to handle file uploads (images)
import upload from '../middlewares/multerConfig.js';

// Create a new router instance to define routes
const route = express.Router();

/**
 * POST api/project/new-project
 * Create a new project.
 * - verifyToken: make sure user is logged in (has a valid token)
 * - upload.array("images", 10): allow up to 10 images to be uploaded
 * - create: the controller function that saves project info and images to the database
 */
route.post("/new-project", verifyToken, upload.array("images", 10), create);

/**
 * GET api/project/all-projects
 * Get all projects from the database.
 * No token required here (public route).
 */
route.get("/all-projects", getAllProject);

/**
 * GET api/project/:id
 * Get one project by its ID.
 * Protected route — user must be logged in.
 */
route.get("/:id", verifyToken, getProjectById);

/**
 * PUT api/project/update/:id
 * Update a project by its ID.
 * - Protected route (verifyToken)
 * - Allows uploading up to 10 images (can add or update images)
 * - Controller updates project info in database
 */
route.put("/update/:id", verifyToken, upload.array("images", 10), update);

/**
 * DELETE api/project/delete/:id
 * Delete a project by its ID.
 * Protected route (only logged-in users can delete)
 */
route.delete("/delete/:id", verifyToken, deleteProjectById);

// Export the router so it can be imported and used in the main server file
export default route;
