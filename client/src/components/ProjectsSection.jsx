import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Carousel from "./Carousel";

const backendUrl = import.meta.env.VITE_URL;

// Create an axios instance with default config:
// - baseURL is the backend API URL
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: `${backendUrl}`,
});

export const ProjectsSection = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await axios.get("http://localhost:8000/api/project/all-projects");
				const response = await axiosInstance.get("/api/project/all-projects");
				setProjects(response.data);
			} catch (error) {
				console.error("Error while fetching data", error);
			}
		};
		fetchData();
	}, []);

	return (
		<section id="projects" className="py-24 px-4 relative bg-background text-foreground">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
					Featured <span className="text-primary">Projects</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<div
							key={project._id || index}
							className="group bg-card text-muted-foreground rounded-xl overflow-hidden border border-border shadow-md hover:shadow-lg transition duration-300"
						>
							<div className="max-w-lg">
								<Carousel>
									{project.images?.length > 0
										? project.images.map((image, i) => (
												<img
													key={i}
													// src={`http://localhost:8000/${image}`}
													src={`${image}`}
													alt={`Image ${i + 1} of ${project.title}`}
													className="w-full h-full object-cover"
												/>
										))
										: [
												<img
													src="../assets/placeholder.png"
													alt="Image placeholder"
													className="w-full h-full object-cover"
												/>

										]}
								</Carousel>
							</div>

							<div className="p-6">
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tags?.map((tag, i) => (
										<span
											key={i}
											className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
										>
											{tag}
										</span>
									))}
								</div>

								<h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>

								<p className="text-gray-300 text-sm mb-4">{project.description}</p>

								<div className="flex justify-between items-center">
									<div className="flex space-x-3">
										{project.demoUrl && (
											<a
												href={project.demoUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-300 hover:text-primary"
											>
												<ExternalLink size={20} />
											</a>
										)}

										{project.githubUrl && (
											<a
												href={project.githubUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-gray-300 hover:text-primary"
											>
												<Github size={20} />
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<a
						href="https://github.com/NicodeH"
						target="_blank"
						className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
					>
						Check My GitHub <ArrowRight size={16} />
					</a>
				</div>
			</div>
		</section>
	);
};
