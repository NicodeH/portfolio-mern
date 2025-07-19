// Import Express framework
import express from "express";

// Import the login function from the auth controller
import { login } from "../controller/authController.js";

// Create a new router object from Express
const router = express.Router();

// Define a POST route at "api/auth/login"
// When a POST request is made to "/login", call the login function
router.post("/login", login);

// Export this router so it can be used in other parts of the app
export default router;
