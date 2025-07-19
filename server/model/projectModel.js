import mongoose from "mongoose"; // Import mongoose for MongoDB interaction

// Define the schema for a project document in MongoDB
const projectSchema = new mongoose.Schema({
    title: {
        type: String, // Title as a string
        required: true // This field is required
    },
    description: {
        type: String, // Description as a string
        required: true // This field is required
    },
    images: {
        type: [String] // Image URL as a string
    },
    demoUrl: {
        type: String, // Demo URL as a string
    },
    githubUrl: { // GitHub URL as a string
        type: String
    },
    tags: {
        type: [String], // Tags as an array of string
        required: true // This field is required
    }
})

// Export the Mongoose model for the "Projects" collection
export default mongoose.model("Projects", projectSchema)