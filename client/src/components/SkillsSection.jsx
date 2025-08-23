import { useState } from "react"; // Import React's useState hook to manage state
import { cn } from "@/lib/utils"   // Import a utility function for class names (project-specific)

// List of skills, each with a name, level (percentage), and category
const skills = [
    // Languages
    { name: "C#", level: 70, category: "language" },
    { name: "C", level: 60, category: "language" },
    { name: "Java", level: 90, category: "language" },
    { name: "JavaScript", level: 50, category: "language" },
    { name: "TypeScript", level: 60, category: "language" },
    { name: "HTML/CSS", level: 70, category: "language" },
    { name: "PHP", level: 80, category: "language" },
    { name: "Python", level: 70, category: "language" },
    { name: "Godot", level: 60, category: "language" },

    // Frameworks
    { name: "ASP.NET Core MVC", level: 60, category: "framework" },
    { name: "Express.js", level: 70, category: "framework" },
    { name: "React", level: 80, category: "framework" },
    { name: "Bootstrap", level: 70, category: "framework" },
    { name: "Tailwind CSS", level: 50, category: "framework" },
    { name: "Vue.js", level: 60, category: "framework" },
    { name: "Angular", level: 70, category: "framework" },
    { name: "Django", level: 60, category: "framework" },
    { name: "JavaFX", level: 70, category: "framework" },

    // Database
    { name: "PostgreSQL", level: 70, category: "database" },
    { name: "PL/SQL", level: 70, category: "database" },
    { name: "MySQL", level: 70, category: "database" },
    { name: "SQLite", level: 60, category: "database" },
    { name: "Oracle SQL", level: 90, category: "database" },

    // Tools
    { name: "Git/GitHub", level: 70, category: "tools" },
    { name: "Docker", level: 80, category: "tools" },
    { name: "VS Code", level: 70, category: "tools" },
    { name: "phpMyAdmin", level: 70, category: "tools" },

    // Others
    { name: "Node.js", level: 70, category: "other" },
    { name: "API Rest", level: 70, category: "other" },
    { name: "Junit", level: 80, category: "other" },
];

// List of categories for filtering
const categories = ["all", "language", "framework", "tools", "other"];

// This is the SkillsSection component
export const SkillsSection = () => {
    // State to keep track of the selected category (default is "all")
    const [activeCategory, setActiveCategory] = useState("all")

    // Filter the skills based on the selected category
    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory);

    // The component returns JSX (HTML-like code) that will be displayed on the page
    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                {/* Section title */}
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary"> Skills</span>
                </h2>

                {/* Category filter buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                            key={key}
                            onClick={() => setActiveCategory(category)} // Change the active category when clicked
                            className={cn(
                                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bd-secondary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Display the filtered skills as cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div 
                            key={key} 
                            className="bg-card p-6 rounded-lg shadow-xs card-hover"
                        >
                            {/* Skill name */}
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>

                            {/* Progress bar showing skill level */}
                            <div className="w-full bg -secondary/50 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-2 rounded-full origin-left animate-grow_1.5s_ease_out" 
                                    style={{width: skill.level + "%"}}
                                />
                            </div>

                            {/* Percentage label on the right */}
                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">
                                    {skill.level}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection; // Export the component so it can be used elsewhere