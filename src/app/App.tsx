import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Writing } from "./components/Writing";
import { Story } from "./components/Story";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Readings } from "./components/Readings";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { BlurReveal } from "./components/BlurReveal";
import { MaiaProject } from "./components/MaiaProject";
import { HritProject } from "./components/HritProject";
import { AlliedCreditProject } from "./components/AlliedCreditProject";
import { JuiceUpProject } from "./components/JuiceUpProject";
import { UrcRecordsProject } from "./components/UrcRecordsProject";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]);
  const [blurOpacity, setBlurOpacity] = useState<number>(1);

  const handleNavigateToProject = (projectId: string) => {
    setPageHistory(prev => [...prev, projectId]);
    setCurrentPage(projectId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setPageHistory(["home"]);
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (pageHistory.length > 1) {
      // Remove current page from history
      const newHistory = pageHistory.slice(0, -1);
      setPageHistory(newHistory);
      // Navigate to previous page
      setCurrentPage(newHistory[newHistory.length - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Fallback to home if no history
      handleBackToHome();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      
      // Distance from bottom of page
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      // Start fading out when within 400px of bottom
      if (distanceFromBottom < 400) {
        const opacity = distanceFromBottom / 400;
        setBlurOpacity(Math.max(0, opacity));
      } else {
        setBlurOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Render project detail pages
  if (currentPage === "maia") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <MaiaProject onBack={handleBackToHome} onNavigateToProject={handleNavigateToProject} />
      </>
    );
  }

  if (currentPage === "rappi-mix") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <HritProject onBack={handleBackToHome} onNavigateToProject={handleNavigateToProject} />
      </>
    );
  }

  if (currentPage === "project-3") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <AlliedCreditProject onBack={handleBackToHome} onNavigateToProject={handleNavigateToProject} />
      </>
    );
  }

  if (currentPage === "juice-up") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <JuiceUpProject onBack={handleBackToHome} onNavigateToProject={handleNavigateToProject} />
      </>
    );
  }

  if (currentPage === "urc-records") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <UrcRecordsProject onBack={handleBackToHome} onNavigateToProject={handleNavigateToProject} />
      </>
    );
  }

  // Render home page
  return (
    <div className="min-h-screen bg-background dark relative">
      {/* Subtle blur vignette at bottom for storytelling */}
      <div 
        className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 transition-opacity duration-300"
        style={{
          height: '200px',
          background: 'linear-gradient(to top, rgba(3, 7, 18, 0.3), transparent)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          opacity: blurOpacity,
        }}
      />
      
      <Navigation />
      <main>
        <Hero />
        <BlurReveal>
          <Projects onNavigateToProject={handleNavigateToProject} />
        </BlurReveal>
        <BlurReveal>
          <Writing />
        </BlurReveal>
        <BlurReveal>
          <Story />
        </BlurReveal>
        <BlurReveal>
          <Education />
        </BlurReveal>
        <BlurReveal>
          <Experience />
        </BlurReveal>
        <BlurReveal>
          <Readings />
        </BlurReveal>
        <BlurReveal>
          <Contact />
        </BlurReveal>
      </main>
      <div className="mt-20">
        <BlurReveal>
          <Footer />
        </BlurReveal>
      </div>
      <ScrollToTop />
    </div>
  );
}