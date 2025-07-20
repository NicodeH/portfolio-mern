// Import the Project Mongoose model
import Project from '../model/projectModel.js';

// ================= CREATE NEW PROJECT =================
export const create = async (req, res) => {
    try {
        // Log the received form data (for debugging)
        console.log("BODY:", req.body);
        console.log("FILES:", req.files); // Cloudinary files

        // Destructure values from request body
        const { title, description, demoUrl, githubUrl, tags } = req.body;

        // Parse the tags if they are sent as a JSON string
        let parsedTags = [];
        try {
            parsedTags = JSON.parse(tags); // Expecting '["React", "Node.js"]'
        } catch (err) {
            parsedTags = Array.isArray(tags) ? tags : [tags];
        }

        // Extract Cloudinary URLs from uploaded files
        const images = req.files ? req.files.map((file) => file.path) : [];

        // Check if a project with the same title already exists
        const projectExist = await Project.findOne({ title });
        if (projectExist) {
            return res.status(400).json({ message: 'Project already exist.' });
        }

        // Create and save the new project
        const newProject = new Project({
            title,
            description,
            images, // Cloudinary image URLs
            demoUrl,
            githubUrl,
            tags: parsedTags,
        });

        await newProject.save();

        res.status(200).json({ message: 'Project added.' });

    } catch (error) {
        console.error("Error in create:", error);
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= GET ALL PROJECTS =================
export const getAllProject = async (req, res) => {
    try {
        const projectData = await Project.find();

        if (!projectData || projectData.length === 0) {
            return res.status(404).json({ message: "Project data not found" });
        }

        res.status(200).json(projectData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= GET PROJECT BY ID =================
export const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const projectExist = await Project.findById(id);

        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(projectExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= UPDATE PROJECT =================
export const update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if project exists
        const projectExist = await Project.findById(id);
        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        const { title, description, demoUrl, githubUrl, tags, existingImages } = req.body;

        // Parse the tags
        let parsedTags = [];
        try {
            parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        } catch (err) {
            parsedTags = Array.isArray(tags) ? tags : [tags];
        }

        // Parse the existing images the user wants to keep
        let parsedExistingImages = [];
        try {
            parsedExistingImages = typeof existingImages === 'string'
                ? JSON.parse(existingImages)
                : existingImages;
        } catch (err) {
            parsedExistingImages = [];
        }

        // Get the newly uploaded Cloudinary image URLs
        const uploadedImages = req.files?.map(file => file.path) || [];

        // Combine existing + new images
        const finalImages = [...parsedExistingImages, ...uploadedImages];

        // Update the project in the database
        await Project.findByIdAndUpdate(
            id,
            {
                title,
                description,
                demoUrl,
                githubUrl,
                tags: parsedTags,
                images: finalImages,
            },
            { new: true }
        );

        res.status(200).json({ message: "Project updated successfully." });

    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ errorMessage: error.message });
    }
};

// ================= DELETE PROJECT =================
export const deleteProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const projectExist = await Project.findById(id);

        if (!projectExist) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Project.findByIdAndDelete(id);

        res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
