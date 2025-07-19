import { ArrowDown } from "lucide-react"; // Import an arrow icon from an icon library

// This is the HeroSection component
export const HeroSection = () => {
    // The component returns JSX (HTML-like code) that will be displayed on the page
    return (
        <section 
            className="relative min-h-screen flex flex-col items-center justify-center px-4" // Styling classes
        >
            {/* Main container for the content, centered and with a max width */}
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="space-y-6">
                    {/* Big title with animated fade-in for each part */}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1"> Nicolas</span>
                        <span className="text-gradient ml-1 opacity-0 animate-fade-in-delay-2"> Ho</span>
                    </h1>

                    {/* Subtitle/description with fade-in animation */}
                    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                            I am a student in <span className="font-bold"> Bachelor’s Degree in Computer Science </span> and a multidisciplinary developer specializing 
                            in <span className="font-bold"> web and application development </span>, as well as <span className="font-bold">database. </span>
                    </p>

                    {/* Button to view projects, also fades in */}
                    <div className="opacity-0 animate-fade-in-delay-4">
                        <a href="#projects" className="cosmic-button">
                            View my work
                        </a>
                    </div>
                </div>
            </div>

            {/* Animated arrow at the bottom to encourage scrolling */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    )    
};

export default HeroSection; // Export the component so it can be used elsewhere