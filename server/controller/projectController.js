// Import the Project model from Mongoose schema
import Project from '../model/projectModel.js';

// ================= CREATE NEW PROJECT =================
export const create = async (req, res) => {
    try {
        // Log the incoming data for debugging
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        // Extract fields from request body
        const { title, description, demoUrl, githubUrl, tags } = req.body;

        // Try to parse tags if sent as JSON string, fallback to array
        let parsedTags = [];
        try {
            parsedTags = JSON.parse(tags);
        } catch (err) {
            parsedTags = Array.isArray(tags) ? tags : [tags];
        }

        // Extract image file paths from multer
        const images = req.files ? req.files.map((file) => file.path) : [];

        // Create a new project instance with the data
        const newProject = new Project({
            title,
            description,
            images,
            demoUrl,
            githubUrl,
            tags: parsedTags,
        });

        // Prevent duplicates: check if project with same title already exists
        const projectExist = await Project.findOne({ title });
        if (projectExist) {
            return res.status(400).json({ message: 'Project already exist.' });
        }

        // Save to database
        await newProject.save();

        // Respond with success
        res.status(200).json({ message: 'Project added.' });
    } catch (error) {
        // Catch unexpected errors
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= GET ALL PROJECTS =================
export const getAllProject = async (req, res) => {
    try {
        // Fetch all projects
        const projectData = await Project.find();

        // Return 404 if none found
        if (!projectData || projectData.length === 0) {
            return res.status(404).json({ message: "Project data not found" });
        }

        // Return project data
        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= GET PROJECT BY ID =================
export const getProjectById = async (req, res) => {
    try {
        const id = req.params.id; // Extract ID from URL
        const projectExist = await Project.findById(id); // Find project by ID

        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Return found project
        res.status(200).json(projectExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= UPDATE PROJECT =================
export const update = async (req, res) => {
    try {
        const id = req.params.id; // Extract ID

        // Check if project exists
        const projectExist = await Project.findById(id);
        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        const { title, description, demoUrl, githubUrl, tags, existingImages } = req.body;

        // Parse tags if stringified JSON
        let parsedTags = [];
        try {
            parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        } catch (err) {
            parsedTags = Array.isArray(tags) ? tags : [tags];
        }

        // Parse previously saved images
        let parsedExistingImages = [];
        try {
            parsedExistingImages = typeof existingImages === 'string'
                ? JSON.parse(existingImages)
                : existingImages;
        } catch (err) {
            parsedExistingImages = [];
        }

        // Get new uploaded images from multer
        const uploadedImages = req.files?.map(file => file.path) || [];

        // Merge existing and new images
        const finalImages = [...parsedExistingImages, ...uploadedImages];

        // Update the project
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                title,
                description,
                demoUrl,
                githubUrl,
                tags: parsedTags,
                images: finalImages,
            },
            { new: true } // Return the updated project
        );

        res.status(200).json({ message: "Project updated successfully." });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= DELETE PROJECT =================
export const deleteProjectById = async (req, res) => {
    try {
        const id = req.params.id; // Get project ID
        const projectExist = await Project.findById(id); // Check if it exists

        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Delete the project from DB
        await Project.findByIdAndDelete(id);

        res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
