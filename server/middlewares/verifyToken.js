// Import jsonwebtoken library to verify JWT tokens
import jwt from "jsonwebtoken";

// Middleware function to check if the request has a valid JWT token
export const verifyToken = (req, res, next) => {
    // Get the 'Authorization' header from the incoming request
    const authHeader = req.headers.authorization;

    // If there is no Authorization header or it doesn't start with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        // Respond with 401 Unauthorized error - no token provided
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract the token from the header ("Bearer tokenHere" => "tokenHere")
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token using the secret key
        // If valid, get the decoded token payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user info to request object for use in other routes
        req.user = decoded;

        // Call next() to continue to the next middleware or route handler
        next();
    } catch (err) {
        // If token is invalid or expired, respond with 403 Forbidden error
        res.status(403).json({ message: "Invalid or expired token." });
    }
};
