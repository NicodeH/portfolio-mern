import { ArrowLeftFromLine } from "lucide-react"; 
import { Link, useNavigate, useParams } from "react-router-dom";  // For routing/navigation in React
import { useEffect, useState } from "react";  // React hooks to handle state and lifecycle
import axios from "axios";  // For making HTTP requests
import toast from "react-hot-toast";  // For showing popup notifications

// Get the JWT token saved in local storage (used for auth)
const token = localStorage.getItem("token");

const backendUrl = import.meta.env.VITE_URL;

// Create an axios instance with default config:
// - baseURL is the backend API URL
// - Authorization header includes the JWT token for protected routes
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000",  
  baseURL: `${backendUrl}`,
  headers: {
    Authorization: "Bearer " + token,  // Add token in Authorization header
  },
});

const ProjectForm = () => {
  // Define initial empty project structure
  const projectModel = {
    title: "",
    description: "",
    demoUrl: "",
    githubUrl: "",
  };

  // State variables
  const [isNewProject, setIsNewProject] = useState(true); // Are we creating new or editing?
  const [project, setProject] = useState(projectModel);  // Project data to fill form inputs
  const [images, setImages] = useState([]);               // New images user adds
  const [existingImages, setExistingImages] = useState([]); // Images already saved on backend
  const [tags, setTags] = useState([]);                   // Tags/categories selected

  const navigate = useNavigate();  // Used to change pages programmatically
  const { id } = useParams();      // Get project ID from URL if editing

  // List of categories/tags user can select from
  const categories = [
    "C#", "C", "Java", "JavaScript", "TypeScript", "HTML/CSS", "PHP", "Python", "Powershell", "GDScript",
    "React", "Bootstrap", "Tailwind CSS", "Vue.js", "Angular", "Django", "JavaFX", "Express.js",
    "PostgreSQL", "MySQL", "Oracle SQL", "MongoDB", "PL/SQL",
    "VS Code", "PyCharm", "IntelliJ IDEA", 
    "phpMyAdmin", "Node.js", "API Rest", "Junit", "Multer", "JWT", "Git/GitHub", "Docker", "AWS", "GLPI", "Zabbix", "Cloudinary", "Godot"
  ];

  // When component mounts or id changes, fetch project data if editing
  useEffect(() => {
    const fetchProject = async () => {
      if (id) {  // If id exists, means editing existing project
        setIsNewProject(false); // Not a new project
        try {
          // Get project data from backend API
          const response = await axiosInstance.get(`/api/project/${id}`);
          setProject(response.data); // Fill form with existing data
          if (response.data.tags) setTags(response.data.tags);           // Load tags
          if (response.data.images) setExistingImages(response.data.images); // Load images
        } catch (error) {
          // If error happens, print it in console
          console.error("Fetch project error:", error.response?.data || error.message);
        }
      }
    };

    fetchProject();
  }, [id]);

  // Remove an existing image from the list when user clicks Delete
  const removeExistingImage = (imgToRemove) => {
    setExistingImages(existingImages.filter(image => image !== imgToRemove));
  };

  // Handle change for input fields (title, description, demoUrl, githubUrl)
  const handleChange = (e) => {
    // Update project state with new input value
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Handle change for images input (multiple files)
  const handleImagesChange = (e) => {
    setImages(e.target.files); // Save selected files to state
  };

  // When user submits the form
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(); // Create form data for sending files & data together
    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("existingImages", JSON.stringify(existingImages)); // Pass images that are kept
    for (let file of images) {
      formData.append("images", file); // Append each new image file
    }
    formData.append("demoUrl", project.demoUrl);
    formData.append("githubUrl", project.githubUrl);
    formData.append("tags", JSON.stringify(tags)); // Send tags as JSON string

    try {
      let res;
      if (isNewProject) {
        // If new, send POST request to create project
        res = await axiosInstance.post("/api/project/new-project", formData);
      } else {
        // If editing, send PUT request to update existing project
        res = await axiosInstance.put(`/api/project/update/${id}`, formData);
      }
      toast.success(res.data.message, { position: "top-right" }); // Show success message
      navigate("/all-projects"); // Redirect user to projects list
    } catch (error) {
      // Show error message if submit fails
      console.error("Submit error:", error.response?.data || error.message);
      toast.error("Error while submitting", { position: "top-right" });
    }
  };

  // JSX for the form UI
  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-32 relative">
      <form
        className="w-full max-w-2xl bg-white p-8 pt-14 rounded-xl shadow-lg space-y-6 relative"
        onSubmit={submitForm}
      >
        {/* Link to go back to project list */}
        <Link to="/all-projects" className="absolute top-4 left-4 flex items-center text-sm text-gray-600 hover:text-primary transition">
          <ArrowLeftFromLine className="w-4 h-4 mr-1" />
          Back
        </Link>

        {/* Title changes based on create or update */}
        <h2 className="text-2xl font-bold text-center text-primary uppercase">
          {isNewProject ? "Create a new project" : "Update a project"}
        </h2>

        {/* Project Title input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={project.title}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-700"
            placeholder="e.g. Portfolio V1"
          />
        </div>

        {/* Project Description input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={project.description}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-700"
            placeholder="Describe your project..."
          />
        </div>

        {/* Tags selector using checkboxes */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Tags</label>
          <div className="border rounded-lg p-3 max-h-48 overflow-y-auto grid grid-cols-3 gap-2 text-sm text-gray-700">
            {categories.map((category, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="tags"
                  value={category}
                  checked={tags.includes(category)} // Checked if tag selected
                  onChange={(e) => {
                    // Add or remove tag from state depending on checked
                    const updatedTags = e.target.checked
                      ? [...tags, category]
                      : tags.filter((tag) => tag !== category);
                    setTags(updatedTags);
                  }}
                  className="h-4 w-4"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image uploader input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Images uploader</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-primary text-gray-700"
          />
          <p className="mt-2 text-sm text-gray-500">Accepted formats: JPEG, PNG</p>

          {/* Display existing images with delete button */}
          <label className="block text-sm font-bold text-gray-700 mt-4">Current Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {existingImages.map((image) => (
              <div key={image.id || image} className="flex flex-col items-center space-y-2">
                <img
                  // src={`http://localhost:8000/${image}`}
                  src={`${image}`}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(image)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Demo URL input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Demo URL</label>
          <input
            type="text"
            name="demoUrl"
            value={project.demoUrl}
            onChange={handleChange}
            placeholder="Live project link..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-700"
          />
        </div>

        {/* GitHub URL input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">GitHub URL</label>
          <input
            type="text"
            name="githubUrl"
            value={project.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary text-gray-700"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button type="submit" className="cosmic-button rounded-lg">
            {isNewProject ? "Save" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
