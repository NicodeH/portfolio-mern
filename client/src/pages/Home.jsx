import { HeroSection } from "@/components/HeroSection.jsx";
import { AboutSection } from "@/components/AboutSection.jsx";
import { SkillsSection } from "@/components/SkillsSection.jsx";
import { ProjectsSection } from "@/components/ProjectsSection.jsx";
import { ContactSection } from "@/components/ContactSection.jsx";

// This is the main page of the application.
export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Main content */}
        <main>
            <HeroSection/>
            <AboutSection/>
            <SkillsSection/>
            <ProjectsSection/>
            <ContactSection/>
        </main>
    </div>;
}

export default Home;