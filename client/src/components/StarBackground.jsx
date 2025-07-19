import { useEffect, useState } from "react"; // Import React hooks for state and side effects

// This component creates an animated background with stars and meteors
export const StarBackground = () => {
    // Create two state variables: one for stars, one for meteors
    const [stars, setStars] = useState([]);      // stars = array of star objects
    const [meteors, setMeteors] = useState([]);  // meteors = array of meteor objects

    // useEffect runs code when the component is first shown (mounted)
    useEffect(() => {
        generateStars();   // Generate stars when the component mounts
        generateMeteors(); // Generate meteors when the component mounts

        // This function runs when the window is resized
        const handleResize = () => {
            generateStars(); // Regenerate stars to fit the new window size
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);

        // Cleanup: remove the event listener when the component is removed
        return () => window.removeEventListener("resize", handleResize);
    }, []); // [] means this runs only once, when the component mounts

    // Function to randomly generate stars based on the window size
    const generateStars = () => {
        // The number of stars depends on the window area
        const numberOfStars = Math.floor(
            window.innerWidth * window.innerHeight / 10000
        );

        const newStars = [];

        // Create each star with random properties
        for (let i = 0; i < numberOfStars; i++) {
            newStars.push({
                id: i, // unique identifier
                size: Math.random() * 3 + 1, // size between 1 and 4 pixels
                x: Math.random() * 100,      // horizontal position (percent)
                y: Math.random() * 100,      // vertical position (percent)
                opacity: Math.random() * 0.5 + 0.5, // opacity between 0.5 and 1
                animationDuration: Math.random() * 4 + 2 // animation duration (2s to 6s)
            });
        }

        setStars(newStars); // Update the state with the new stars
    };

    // Function to randomly generate meteors
    const generateMeteors = () => {
        const numberOfMeteors = Math.random() * 4 + 2; // We want 4 meteors
        const newMeteors = [];

        // Create each meteor with random properties
        for (let i = 0; i < numberOfMeteors; i++) {
            newMeteors.push({
                id: i, // unique identifier
                size: Math.random() * 2 + 1, // size between 1 and 3
                x: Math.random() * 100,      // horizontal position (percent)
                y: Math.random() * 20,       // vertical position (top 20% of the screen)
                delay: Math.random() * 15,   // animation delay (0s to 15s)
                animationDuration: Math.random() * 3 + 3 // animation duration (3s to 6s)
            });
        }

        setMeteors(newMeteors); // Update the state with the new meteors
    };

    // The code below describes what will be shown on the screen (the "render")
    return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Render each star */}
        {stars.map((star) => (
            <div
                key={star.id}
                className="star animate-pulse-subtle"
                style={{
                    width: star.size + "px",      // star width
                    height: star.size + "px",     // star height
                    left: star.x + "%",           // horizontal position
                    top: star.y + "%",            // vertical position
                    opacity: star.opacity,        // transparency
                    animationDuration: star.animationDuration + "s", // animation duration
                }}
            />
        ))}

        {/* Render each meteor */}
        {meteors.map((meteor) => (
            <div
                key={meteor.id}
                className="meteor animate-meteor"
                style={{
                    width: meteor.size * 50 + "px", // meteor width (much longer than a star)
                    height: meteor.size * 2 + "px", // meteor height
                    left: meteor.x + "%",           // horizontal position
                    top: meteor.y + "%",            // vertical position
                    animationDelay: meteor.delay,   // delay before animation starts 
                    animationDuration: meteor.animationDuration + "s", // animation duration
                }}
            />
        ))}
    </div>
    );
};
export default StarBackground;