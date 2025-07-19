// Import jsonwebtoken library to create and verify JWT tokens
import jwt from "jsonwebtoken";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load variables from .env file into process.env
dotenv.config()

// Controller function to handle login requests
export const login = async (req, res) => {
    // Extract username and password sent in the request body
    const {username, password} = req.body;

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if provided username and password match the admin credentials
    if (username !== adminUsername || password !== adminPassword) {
        // If they don't match, respond with 401 Unauthorized and error message
        return res.status(401).json({message:"Invalid credentials"});
    }

    // If credentials are valid, create a JWT token
    // The token payload contains the username
    // The token is signed using a secret key stored in environment variables
    // The token expires in 1 hour
    const token = jwt.sign(
        {username},
        process.env.JWT_SECRET,
        { expiresIn: "1h"}
    );

    // Send back the generated token to the client
    res.status(200).json({token});
};
