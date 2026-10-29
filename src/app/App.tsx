import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Writing } from "./components/Writing";
import { Story } from "./components/Story";
import { Photography } from "./components/Photography";
import { Print } from "./components/Print";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Readings } from "./components/Readings";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { BlurReveal } from "./components/BlurReveal";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import {
  isAnalyticsDashboardEnabled,
  trackCaseStudyView,
  trackPortfolioSession,
} from "./lib/analytics";
import { SHOW_ENTERPRISE_ROLES_CASE_STUDY } from "./lib/featureFlags";
import { prefersReducedMotion } from "./lib/useReducedMotion";

const MaiaProject = lazy(() =>
  import("./components/MaiaProject").then((module) => ({
    default: module.MaiaProject,
  })),
);

const HritProject = lazy(() =>
  import("./components/HritProject").then((module) => ({
    default: module.HritProject,
  })),
);

const AlliedCreditProject = lazy(() =>
  import("./components/AlliedCreditProject").then((module) => ({
    default: module.AlliedCreditProject,
  })),
);

const JuiceUpProject = lazy(() =>
  import("./components/JuiceUpProject").then((module) => ({
    default: module.JuiceUpProject,
  })),
);

const UrcRecordsProject = lazy(() =>
  import("./components/UrcRecordsProject").then((module) => ({
    default: module.UrcRecordsProject,
  })),
);

const EnterpriseRolesProject = lazy(() =>
  import("./components/EnterpriseRolesProject").then((module) => ({
    default: module.EnterpriseRolesProject,
  })),
);

function ProjectLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center text-white/50 font-portfolio">
      Loading case study...
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]);
  const [blurOpacity, setBlurOpacity] = useState<number>(1);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(
    () => isAnalyticsDashboardEnabled(),
  );

  useEffect(() => {
    setShowAnalyticsDashboard(isAnalyticsDashboardEnabled());
  }, [currentPage]);

  const handleNavigateToProject = useCallback((projectId: string) => {
    trackCaseStudyView(projectId);
    setPageHistory((prev) => [...prev, projectId]);
    setCurrentPage(projectId);
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    if (currentPage === "home") {
      trackPortfolioSession();
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === "enterprise-roles" && !SHOW_ENTERPRISE_ROLES_CASE_STUDY) {
      setPageHistory(["home"]);
      setCurrentPage("home");
    }
  }, [currentPage]);

  const handleBackToHome = () => {
    setPageHistory(["home"]);
    setCurrentPage("home");
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom < 400) {
        const opacity = distanceFromBottom / 400;
        setBlurOpacity(Math.max(0, opacity));
      } else {
        setBlurOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  if (currentPage === "maia") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <MaiaProject
            onBack={handleBackToHome}
            onNavigateToProject={handleNavigateToProject}
          />
        </Suspense>
      </>
    );
  }

  if (currentPage === "rappi-mix") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <HritProject
            onBack={handleBackToHome}
            onNavigateToProject={handleNavigateToProject}
          />
        </Suspense>
      </>
    );
  }

  if (currentPage === "project-3") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <AlliedCreditProject
            onBack={handleBackToHome}
            onNavigateToProject={handleNavigateToProject}
          />
        </Suspense>
      </>
    );
  }

  if (currentPage === "enterprise-roles" && SHOW_ENTERPRISE_ROLES_CASE_STUDY) {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <EnterpriseRolesProject />
        </Suspense>
      </>
    );
  }

  if (currentPage === "juice-up") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <JuiceUpProject
            onBack={handleBackToHome}
            onNavigateToProject={handleNavigateToProject}
          />
        </Suspense>
      </>
    );
  }

  if (currentPage === "urc-records") {
    return (
      <>
        <Navigation showBackButton onBack={handleBackToHome} />
        <Suspense fallback={<ProjectLoading />}>
          <UrcRecordsProject
            onBack={handleBackToHome}
            onNavigateToProject={handleNavigateToProject}
          />
        </Suspense>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background dark relative">
      <div
        className="fixed bottom-0 left-0 right-0 pointer-events-none z-40 transition-opacity duration-300"
        style={{
          height: "200px",
          background: "linear-gradient(to top, rgba(3, 7, 18, 0.3), transparent)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
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
          <Photography />
        </BlurReveal>
        <BlurReveal>
          <Print />
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

      {showAnalyticsDashboard && (
        <AnalyticsDashboard
          onClose={() => {
            setShowAnalyticsDashboard(false);
            const url = new URL(window.location.href);
            url.searchParams.delete("analytics");
            window.history.replaceState({}, "", url.toString());
          }}
        />
      )}
    </div>
  );
}
