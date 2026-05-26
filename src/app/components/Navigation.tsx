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

interface NavigationProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Navigation({ showBackButton = false, onBack }: NavigationProps = { showBackButton: false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch temperature for Coral Springs, Florida
  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        // Coral Springs, Florida coordinates: 26.27, -80.25
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=26.27&longitude=-80.25&current=temperature_2m&temperature_unit=fahrenheit'
        );
        const data = await response.json();
        if (data.current && data.current.temperature_2m) {
          setTemperature(Math.round(data.current.temperature_2m));
        }
      } catch (error) {
        // Silently fail - temperature is optional
      }
    };

    fetchTemperature();
    // Refresh temperature every 10 minutes
    const interval = setInterval(fetchTemperature, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);



  const formatTime = () => {
    // Get GMT time
    const gmtHours = currentTime.getUTCHours();
    const gmtMinutes = currentTime.getUTCMinutes();
    
    // Calculate local time (GMT - 4)
    const localDate = new Date(currentTime);
    localDate.setUTCHours(gmtHours - 4);
    
    const localHours = localDate.getUTCHours().toString().padStart(2, '0');
    const localMinutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    
    return `${localHours}:${localMinutes}`;
  };

  const navLinks = [
    { name: "Recent work", href: "#projects" },
    { name: "Writing", href: "#writing" },
    { name: "My Story", href: "#story" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Readings", href: "#readings" },
    { name: "Contact Me", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex items-center justify-between"
      style={{ 
        height: '64px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Left side - Logo or Back Button */}
      <div className="flex items-center gap-4">
        {showBackButton && onBack ? (
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'white',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        ) : (
          <>
            {/* Logo as Menu Trigger - All Screen Sizes */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="hover:opacity-70 transition-opacity">
                  <img 
                    src={logoImage} 
                    alt="Daniel Fornica Logo" 
                    className="h-10 w-10"
                  />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="w-[280px] sm:w-[350px] p-8"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation links to different sections of the portfolio
                </SheetDescription>
                <div className="flex flex-col gap-6 mt-4">
                  <img 
                    src={logoImage} 
                    alt="Daniel Fornica Logo" 
                    className="h-12 w-12 mb-2"
                  />
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      type="button"
                      onClick={(e) => handleNavClick(e, link.href, true)}
                      className="hover:opacity-70 transition-opacity text-left bg-transparent border-0 p-0 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      style={{
                        fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white',
                        fontSize: '20px',
                      }}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>

      {/* Center - Desktop Navigation Links */}
      {!showBackButton && (
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:opacity-70 transition-opacity"
              style={{
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'white',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Right side - Location and Time Info */}
      <div 
        className="text-right"
        style={{ 
          fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '12px'
        }}
      >
        <div style={{ color: 'white' }}>Based in Coral Springs, Florida</div>
        <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Local Time {formatTime()} GMT−4{temperature !== null && ` · ${temperature}°F`}
        </div>
      </div>
    </nav>
  );
}
