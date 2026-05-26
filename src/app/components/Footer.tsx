import { Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";
import logoImage from "figma:asset/5b7fc6137b16addceda935b00c948edf786eee68.png";
import { MemoryGame } from "./MemoryGame";

export function Footer() {
  const [visitorCount, setVisitorCount] = useState<number>(900);

  useEffect(() => {
    // Get the current visitor count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (storedCount) {
      const currentCount = parseInt(storedCount, 10);
      setVisitorCount(currentCount);
      
      // Only increment if this is a new session
      if (!hasVisited) {
        const newCount = currentCount + 1;
        localStorage.setItem('visitorCount', newCount.toString());
        sessionStorage.setItem('hasVisited', 'true');
        setVisitorCount(newCount);
      }
    } else {
      // First time setup
      localStorage.setItem('visitorCount', '900');
      sessionStorage.setItem('hasVisited', 'true');
      setVisitorCount(900);
    }
  }, []);

  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-white/10">
      {/* Blur effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(37, 37, 37, 0.8) 0%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-start justify-between gap-12">
          {/* Left side */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={logoImage} 
                alt="Logo" 
                className="w-8 h-8"
              />
              <a 
                href="https://df-studio.net" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  color: 'white'
                }}
              >
                df-studio.net
              </a>
            </div>
            <p 
              className="text-sm mb-4"
              style={{ 
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'rgba(255, 255, 255, 0.7)'
              }}
            >
              Design, code, and motion by me.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/daniel-fornica-13b50766/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" style={{ color: 'white' }} />
              </a>
              <a
                href="https://github.com/PixelbydaPound/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" style={{ color: 'white' }} />
              </a>
              <a
                href="https://medium.com/@danielfornicauxui"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Medium"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right side - Memory Game */}
          <div className="flex-shrink-0">
            <MemoryGame />
          </div>
        </div>
      </div>
    </footer>
  );
}
