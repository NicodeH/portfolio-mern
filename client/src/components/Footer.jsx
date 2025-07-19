import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex items-center justify-between">
      {/* Centered paragraph */}
      <div className="w-full flex justify-center">
        <p className="text-sm text-muted-foreground text-center">
          {/* JavaScript inside {} shows the current year automatically */}
          &copy; {new Date().getFullYear()} NicodeH. All rights reserved.
        </p>
      </div>
      {/* ArrowUp button aligned right */}
      <a
        href="#start"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors ml-4"
      >
        {/* The ArrowUp icon is shown inside the link */}
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};