import { GraduationCap, School } from "lucide-react"; // Import some icons from an icon library
import cv from "../assets/CV.pdf";

// This is the AboutSection component
export const AboutSection = () => {
  // The component returns JSX (HTML-like code) that will be displayed on the page
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Main container for the content, centered and with a max width */}
      <div className="container mx-auto max-w-5xl">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        {/* Grid layout: text on the left, cards on the right (on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: introduction and buttons */}
          <div className="space-y-6">
            {/* Subtitle */}
            <h3 className="text-2xl font-semibold">
              Summary
            </h3>

            {/* Short description */}
            <p className="text-muted-foreground">
              Currently in the second year of a Bachelor's degree in Computer 
              Science at the <span className="font-bold">University Institute of Technology of Blagnac</span>, 
              specializing in <span className="font-bold">app development</span>. Started programming in 2020.
            </p>

            {/* Buttons: Contact and Download CV */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href={cv}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                download="cv"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right side: cards with icons and descriptions */}
          <div className="grid grid-cols-1 gap-6">
            <h3 className="text-2xl font-semibold">
              Degrees
            </h3>

            {/* Card 1: Baccalaureate */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="p-3 rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                {/* Card content */}
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> High School</h4>
                  <p className="text-muted-foreground">
                    Baccalaureate in <span className="font-bold">Industrial Science and Technology (STI2D)</span>, 
                    with a specialization in <span className="font-bold"> Information and Digital Systems (SIN)</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Bachelor’s Degree in Computer Science */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg"> IUT Blagnac </h4>
                  <p className="text-muted-foreground">
                    Bachelor’s Degree in Computer Science in application development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};