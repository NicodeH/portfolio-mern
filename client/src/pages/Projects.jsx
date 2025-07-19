// Import icons for UI buttons from lucide-react library
import { PencilLine, Trash, Github, LogOut } from "lucide-react";

// Import React hooks to handle component lifecycle and state
import { useEffect, useState } from "react";

// Import Link from react-router-dom to navigate between pages
import { Link } from "react-router-dom";

// Import axios for making HTTP requests and toast for showing notifications
import axios from "axios";
import toast from "react-hot-toast";

// Get the JWT token saved in localStorage (used for authentication)
const token = localStorage.getItem("token");

const backendUrl = import.meta.env.VITE_URL;

// Create an axios instance with default config:
// - baseURL is the backend API URL
// - Authorization header includes the JWT token for protected routes
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: `${backendUrl}`,
    headers: {
        Authorization: "Bearer " + token,
    },
});

// Main component to display and manage the list of projects
export const Projects = () => {
    // State to hold all projects fetched from the backend
    const [projects, setProjects] = useState([]);

    // useEffect runs once when the component loads (empty dependency array)
    useEffect(() => {
        // Function to fetch projects from the API
        const fetchData = async () => {
            try {
                // Send GET request to "/all-projects" endpoint
                const response = await axiosInstance.get("/api/project/all-projects");
                // Save fetched projects in state to display them
                setProjects(response.data);
            } catch (error) {
                // Log any error that occurs during fetch
                console.log("Error while fetching data", error);
            }
        };
        fetchData(); // Call fetch function
    }, []);

    // Function to delete a project by its ID
    const deleteProject = async (projectId) => {
        // Ask user for confirmation before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return; // If user cancels, do nothing

        try {
            // Send DELETE request to backend with project ID
            const response = await axiosInstance.delete("/api/project/delete/" + projectId);

            // Remove the deleted project from state to update UI immediately
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project._id !== projectId)
            );

            // Show success notification on top-right corner
            toast.success(response.data.message, { position: "top-right" });
        } catch (error) {
            // If error, log it and show error notification
            console.error("Delete error:", error.response?.data || error.message);
            toast.error("Failed to delete the project.", { position: "top-right" });
        }
    };

    return (
        <div className="min-h-screen text-foreground overflow-x-hidden py-32 z-10 relative">
            {/* Page title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="text-primary"> Projects</span> List
            </h2>

            {/* Container for the "Create new project" button and project table */}
            <div className="flex flex-col items-center">
                
                {/* Button to navigate to the form for adding a new project */}
                <div className="w-3/4 flex justify-start py-6">
                    <Link to="/new-project" className="cosmic-button rounded-lg">
                        Create a new project
                    </Link>
                </div>

                {/* Table showing the list of projects */}
                <div className="overflow-auto w-3/4 rounded-xl shadow-md bg-white">
                    <table className="w-full">
                        <thead className="bg-primary border-b-2 border-gray-200 rounded-t-xl">
                            <tr>
                                {/* Table headers for each column */}
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">ID</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">Title</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">Description</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">Tags</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">Demo URL</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">GitHub URL</th>
                                <th className="w-1/7 p-3 text-sm text-white font-semibold tracking-wide text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {/* Loop through projects array and render each project as a row */}
                            {projects.map((project, index) => {
                                return (
                                    <tr className="bg-white" key={project._id}>
                                        {/* Show project index + 1 as ID */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{index + 1}</td>

                                        {/* Show project title */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{project.title}</td>

                                        {/* Show project description */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">{project.description}</td>

                                        {/* Show tags associated with project */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">
                                            {project.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 mr-1"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </td>

                                        {/* Link to the live demo URL */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">
                                            <div className="flex justify-center items-center">
                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                                    <LogOut className="text-black hover:text-primary transition-colors duration-300" size={20} />
                                                </a>
                                            </div>
                                        </td>

                                        {/* Link to the GitHub repository */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap">
                                            <div className="flex justify-center items-center">
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="text-black hover:text-primary transition-colors duration-300" size={20} />
                                                </a>
                                            </div>
                                        </td>

                                        {/* Action buttons: Edit and Delete */}
                                        <td className="p-3 text-sm text-black whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                {/* Edit button: navigate to project edit form */}
                                                <Link
                                                    to={"/project/" + project._id}
                                                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-black hover:text-red-800 transition-colors"
                                                >
                                                    <PencilLine size={20} />
                                                </Link>

                                                {/* Delete button: calls deleteProject function */}
                                                <button
                                                    onClick={() => deleteProject(project._id)}
                                                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-black hover:text-red-800 transition-colors"
                                                >
                                                    <Trash size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Projects;
