// Import utility function for conditional class names (Tailwind helpers)
import { cn } from "@/lib/utils";

// Import menu icons from lucide-react
import { Menu, X } from "lucide-react";

// Import React hooks
import { useEffect, useState } from "react";

// React Router for navigation and linking
import { Link, useNavigate } from "react-router-dom";

// Default navigation items (not actually used, replaced by renderNavItems logic)
const navItems = [
	{ name: "Home", link: "/" },
	{ name: "Projects", link: "/all-projects" },
	{ name: "Login", link: "/login" }, 
];

// Navbar component takes the user's `token` and `setToken` function as props
export const Navbar = ({ token, setToken }) => {
	// State to track whether the page is scrolled down (used to apply shadow/background)
	const [isScrolled, setIsScrolled] = useState(false);

	// State to track if the mobile menu is open
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// React Router navigation function
	const navigate = useNavigate();

	// Add scroll listener when component mounts
	useEffect(() => {
		const handleScroll = () => {
			// Set isScrolled to true if user scrolls more than 10px
			setIsScrolled(window.scrollY > 10);
		};

		// Listen for scroll event
		window.addEventListener("scroll", handleScroll);

		// Clean up listener when component unmounts
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Function to log out the user
	const handleLogout = () => {
		// Remove token from localStorage
		localStorage.removeItem("token");

		// Clear token from app state
		setToken(null);

		// Redirect to homepage
		navigate("/");
	};

	// Render menu items dynamically depending on if the user is logged in
	const renderNavItems = () => {
		const items = [{ name: "Home", link: "/" }];

		// If user is authenticated, show Projects and Logout
		if (token) {
			items.push({ name: "Projects", link: "/all-projects" });
			items.push({ name: "Logout", action: handleLogout });
		} else {
			// If not authenticated, show Login
			items.push({ name: "Login", link: "/login" });
		}

		// Convert item array into JSX Links or Buttons
		return items.map((item, index) =>
			item.link ? (
				// If item has a link, render a <Link />
				<Link
					key={index}
					to={item.link}
					className="text-foreground/80 hover:text-primary transition-colors duration-300"
					onClick={() => setIsMenuOpen(false)} // Close mobile menu if open
				>
					{item.name}
				</Link>
			) : (
				// If item has an action (like Logout), render a <button />
				<button
					key={index}
					onClick={() => {
						item.action();
						setIsMenuOpen(false); // Close menu on action
					}}
					className="text-foreground/80 hover:text-primary transition-colors duration-300"
				>
					{item.name}
				</button>
			)
		);
	};

	return (
		// Main <nav> element with conditional styles (based on scroll state)
		<nav className={cn(
			"fixed w-full z-40 transition-all duration-300",
			isScrolled
				? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
				: "py-5"
		)}>
			<div className="container flex items-center justify-between">
				{/* Logo (clickable, goes to homepage) */}
				<Link to="/" className="text-xl font-bold text-primary flex items-center">
					<span className="relative z-10">
						<span className="text-glow text-foreground">Nicolas Ho</span> Portfolio
					</span>
				</Link>

				{/* Desktop navigation links (hidden on mobile) */}
				<div className="hidden md:flex space-x-8">
					{renderNavItems()}
				</div>

				{/* Mobile menu toggle button (shows either hamburger or close icon) */}
				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className="md:hidden p-2 text-foreground z-50"
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Mobile menu overlay (only visible when isMenuOpen is true) */}
				<div
					className={cn(
						"fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
						"transition-all duration-300 md:hidden",
						isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
					)}
				>
					{/* Mobile menu links stacked vertically */}
					<div className="flex flex-col space-y-8 text-xl">
						{renderNavItems()}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
