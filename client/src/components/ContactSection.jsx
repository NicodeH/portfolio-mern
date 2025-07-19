import {
  Linkedin,
  Mail,
  Phone,
} from "lucide-react"; // Import social and contact icons

// This is the ContactSection component
export const ContactSection = () => {
  // The component returns JSX (HTML-like code) that will be displayed on the page
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">

        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        {/* Section description */}
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities.
        </p>

        {/* Contact information */}
        <div className="space-y-8 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Contact Information
          </h3>

          {/* Email */}
          <div className="space-y-6 justify-center">

            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium"> Email</h4>
                <a
                  href="mailto:nicolas.ho.pro@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  nicolas.ho.pro@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium"> Phone</h4>
                <a
                  href="tel:+775745319"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +33 7 75 74 53 19
                </a>
              </div>
            </div>

            {/* Linkedin */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium"> LinkedIn</h4>
                <a 
                  href="https://www.linkedin.com/in/nicolas-ho-64b7ab2a0/" 
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Link to my profile
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};