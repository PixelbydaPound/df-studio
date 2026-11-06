import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import logoImage from "figma:asset/5b7fc6137b16addceda935b00c948edf786eee68.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { prefersReducedMotion } from "../lib/useReducedMotion";

interface NavigationProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Navigation({ showBackButton = false, onBack }: NavigationProps = { showBackButton: false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const gmtHours = currentTime.getUTCHours();
    const gmtMinutes = currentTime.getUTCMinutes();

    const localDate = new Date(currentTime);
    localDate.setUTCHours(gmtHours - 4);

    const localHours = localDate.getUTCHours().toString().padStart(2, "0");
    const localMinutes = localDate.getUTCMinutes().toString().padStart(2, "0");

    return `${localHours}:${localMinutes}`;
  };

  const navLinks = [
    { name: "Recent work", href: "#projects" },
    { name: "Writing", href: "#writing" },
    { name: "My Story", href: "#story" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Readings", href: "#readings" },
    { name: "Photography", href: "#photography" },
    { name: "Print", href: "#print" },
    { name: "Contact Me", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLElement>,
    href: string,
    closeMenu = false,
  ) => {
    e.preventDefault();

    if (closeMenu) {
      setIsMobileMenuOpen(false);
      window.setTimeout(() => scrollToSection(href), 320);
      return;
    }

    scrollToSection(href);
  };

  return (
    <nav
      className="portfolio-nav-bar fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex items-center justify-between font-portfolio"
      style={{ height: "64px" }}
    >
      <div className="flex items-center gap-4">
        {showBackButton && onBack ? (
          <motion.button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity text-story"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        ) : (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button type="button" className="hover:opacity-70 transition-opacity" aria-label="Open navigation menu">
                <img src={logoImage} alt="Daniel Fornica Logo" className="h-10 w-10" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] sm:w-[350px] p-8"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation links to different sections of the portfolio
              </SheetDescription>
              <div className="flex flex-col gap-6 mt-4">
                <img src={logoImage} alt="" className="h-12 w-12 mb-2" aria-hidden />
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    type="button"
                    onClick={(e) => handleNavClick(e, link.href, true)}
                    className="hover:opacity-70 transition-opacity text-left bg-transparent border-0 p-0 cursor-pointer text-story text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {!showBackButton && (
        <div className="text-right text-xs text-story-mid tabular-nums">
          <span className="text-story-soft">Local time</span> {formatTime()}{" "}
          <span className="text-story-soft">GMT−4</span>
        </div>
      )}
    </nav>
  );
}
