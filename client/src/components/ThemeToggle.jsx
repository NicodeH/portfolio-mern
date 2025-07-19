// This component allows the user to switch between light and dark themes on the website.

// Import the Sun and Moon icons from the "lucide-react" library.
// These icons will be shown depending on the current theme.
import { Sun, Moon } from "lucide-react";

// Import React hooks: useState (to store and update the theme state) and useEffect (to run code when the component loads).
import { useState, useEffect } from "react";

// Import a utility function for handling CSS class names (not essential for understanding the theme logic).
import { cn } from "@/lib/utils"

// The ThemeToggle component definition starts here.
export const ThemeToggle = () => {
    // Create a state variable "isDarkMode" to keep track of whether dark mode is active.
    // "setIsDarkMode" is used to change this value.
    // By default, dark mode is set to true.
    const [isDarkMode, setIsDarkMode] = useState(true);

    // This effect runs once when the component is first displayed.
    useEffect(() => {
        // Check if a theme is already saved in the browser's local storage.
        const storedTheme = localStorage.getItem("theme");

        // If the saved theme is "dark":
        if (storedTheme === "dark") {
            // Set dark mode to true and add the "dark" class to the page.
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        }
        // Otherwise, set dark mode to false and remove the "dark" class.
        else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []) // The empty array means this runs only once when the component loads.

    // This function is called when the user clicks the button to change the theme.
    const toggleTheme = () => {
        // If dark mode is currently active:
        if (isDarkMode) {
            // Remove the "dark" class to switch to light mode.
            document.documentElement.classList.remove("dark");
            // Save the user's choice ("light") in local storage.
            localStorage.setItem("theme", "light");
            // Update the state to indicate dark mode is off.
            setIsDarkMode(false);
        } 
        // If dark mode is not active:
        else {
            // Add the "dark" class to switch to dark mode.
            document.documentElement.classList.add("dark");
            // Save the user's choice ("dark") in local storage.
            localStorage.setItem("theme", "dark");
            // Update the state to indicate dark mode is on.
            setIsDarkMode(true);
        }
    }

    // This is what will be displayed on the screen:
    return (
        // A button that calls toggleTheme when clicked.
        <button 
            onClick={toggleTheme} 
            className={cn(
                // Button styling: fixed position, hidden on small screens, rounded, etc.
                "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
                "focus:outline-hidden"
            )}>
            {/* If dark mode is active, show the Sun icon (to switch to light mode).
                Otherwise, show the Moon icon (to switch to dark mode). */}
            { isDarkMode ? <Sun className="h-6 w-6 text-yellow-300"/> : <Moon className="h-6 w-6 text-blue-900"/> }
        </button>
    );
}

// Export the component so it can be used in other parts of the project.
export default ThemeToggle;