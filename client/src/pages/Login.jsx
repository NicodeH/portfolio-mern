// Import React state hook
import { useState } from "react";
// Import Axios for making HTTP requests
import axios from "axios";
// Import toast for showing user notifications
import toast from "react-hot-toast";
// React Router hook to navigate programmatically
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_URL;

// Create an axios instance with default config:
// - baseURL is the backend API URL
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: `${backendUrl}`,
});


// Login component receives an `onLoginSucess` callback as a prop
export const Login = ({ onLoginSuccess }) => {
	// State for storing user input
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false); // Tracks login button loading state

	const navigate = useNavigate(); // For redirecting after login

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload on form submit
		setLoading(true); // Show loading state

		try {
			// Send login request to the backend with username and password
			// const res = await axios.post("http://localhost:8000/api/login", { username, password });
			const res = await axiosInstance.post("/api/auth/login", { username, password });
			const { token } = res.data; // Destructure token from the response

			// Save the token in localStorage (to persist the session)
			localStorage.setItem("token", token);

			// If there's a callback from the parent (App), call it with the token
			if (onLoginSuccess) onLoginSuccess(token);

			// Show success toast message
			toast.success("Logged in successfully");

			// Redirect to the /projects page
			navigate("/all-projects");
		} catch (error) {
			// Show error toast if login fails
			toast.error("Login failed: " + (error.response?.data?.message || error.message));
		}

		setLoading(false); // Reset loading state after attempt
	};

	return (
		// Full-screen centered container
		<div className="flex justify-center items-center min-h-screen bg-background px-4">
			{/* Login form */}
			<form
				onSubmit={handleSubmit}
				className="bg-card shadow-md rounded-xl p-8 w-full max-w-md space-y-6"
			>
				{/* Form title */}
				<h2 className="text-2xl font-bold text-center text-foreground">Admin Login</h2>

				{/* Username input field */}
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
				/>

				{/* Password input field */}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
				/>

				{/* Submit button with loading state */}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};
