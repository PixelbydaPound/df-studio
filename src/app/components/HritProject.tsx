import { motion } from "motion/react";
import { ArrowLeft, Expand, X, ChevronDown } from "lucide-react";
import { ScrollToTop } from "./ScrollToTop";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";
import { Footer } from "./Footer";
import { useState, useEffect } from "react";
import hritImage from "figma:asset/fd4ed4ac951d5261c50bc5fcc23d06cca40ca2c0.png";
import workflowImage1 from "figma:asset/48b237b78a7e71c0bd970cc1e8dfc9947d5e5068.png";
import workflowImage2 from "figma:asset/2cafd9253a0af5993add3d8c4b20a10f5b62ee06.png";
import workflowImage3 from "figma:asset/3b735189c3104e4de37209bba8022e4fc2a027a7.png";
import workflowImage4 from "figma:asset/afb424d96d68b1282dff65b01a2f28ca062fbf75.png";
import workflowImage5 from "figma:asset/36a7a8c03c50e308900acf9fa423c6d4ad874c59.png";
import designDecisionsImage from "figma:asset/216c1084b68217eb522b60a441ce202d52310c9c.png";
import researchInsightsImage from "../../imports/KeyReseachInsights.png";
import aiMatchingNew from "figma:asset/28f9050f93e280c1f9dc2224e9dd77c070048a76.png";
import candidateInterface1 from "figma:asset/643b3bc3c8295a67d7889ed3205ebe20722bebe5.png";
import candidateInterface2 from "figma:asset/a6fcd1653105fbc1c1cec38f6e42e4d9fca2e922.png";
import candidateInterface3 from "figma:asset/af6c4bf616117a934e7b97f9c572efb353ffebd3.png";
import candidateInterface4 from "figma:asset/5e095da898b375a440b8be559974174a66e7a278.png";
import candidateInterface5 from "figma:asset/c276dda4c247584248afdac5d3c0ee872c0e7cf5.png";
import candidateInterface6 from "figma:asset/b3d33cb881093a4327c010d180d1e99d622a7158.png";
import managerInterface1 from "figma:asset/5441e4fddf2446d3cb0683a34984c1ccff665d07.png";
import managerInterface2 from "figma:asset/c156ffbd841e9df62c243bcbfef8d341ee96254e.png";
import managerInterface3 from "figma:asset/cabaa1c9149ee96638e34fc3e0102317be2b3574.png";
import avatarJosh from "figma:asset/8ad14efc385c44224d799b843086e7dbd4b08f15.png";
import avatarHannah from "figma:asset/ff278087ef561a9799430e5bca180462704fec21.png";
import avatarJames from "figma:asset/5fdceefd4796b5948547abdc4d19cb7365e24b6a.png";
import avatarMatt from "figma:asset/12a3ec37ca809b6b381d36a0f1f81f04ad7d1c1e.png";
import avatarKarl from "figma:asset/f97bb00a4ef2e75a15a2ad098b2bb776e70c0fd7.png";
import avatarMonty from "figma:asset/c9f8f2ef859cc81ad63b114ec954d6d3f9ad7fac.png";
import avatarDaniel from "figma:asset/388b535163e57fc79f201828d5784df63990acf0.png";
import legacyHomeScreen from "figma:asset/d8394348e8a44bb86a1601a0be07ad81f560e00a.png";
import legacyListView from "figma:asset/d9df2e43292d0d39697f8052ac3c2dcb42aa91d4.png";
import outcomesImage from "../../imports/outcomes-and-impact-1.png";
import journeyMapMain from "figma:asset/f1a19916a9db70ecde38dd9a8ee7b5762bb02c61.png";
import journeyMapLegend from "figma:asset/28b6e1703f21442e935db3368d3b2087e32aeae8.png";
import journeyMapInstructions from "figma:asset/dd22940265bdc8145641d24f584e0415f2c517a7.png";
import impactQuoteImage from "figma:asset/a10ff03dde31fb236bf266bb7c6c444ebe0564d0.png";
import journeyMapInsight from "figma:asset/120ccd8f5b09b4633ce8fb8b6bb70d5c53e475a5.png";
import candidateSignIn from "figma:asset/3597b9eca0a7d0c491b98976e74d989858b7c1d1.png";
import candidateOnboarding from "figma:asset/727375b6d6dc0638d460f215f953265d9ff2cd3e.png";
import candidateCareerStory from "figma:asset/b16c5348283de7de909d4c109c6afeb430596682.png";
import candidateDocuments from "figma:asset/2f9156623a9e6d80a340afa80678bc7c1cfac88b.png";
import candidateUploaded from "figma:asset/6625952fa99bbe3e47925ad3e21f86cf6ba5bc55.png";
import candidateProfile from "figma:asset/36dc0241631664da5a0d1eef60ad17b0f809d3b3.png";
import candidateSettings from "figma:asset/99c6ebdbf605b0bfa27e682944840e478154afd5.png";

interface HritProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function HritProject({ onBack, onNavigateToProject }: HritProjectProps) {
  const [currentWorkflowImageIndex, setCurrentWorkflowImageIndex] = useState(0);
  const [currentCandidateImageIndex, setCurrentCandidateImageIndex] = useState(0);
  const [currentCandidateOnboardingIndex, setCurrentCandidateOnboardingIndex] = useState(0);
  const [currentManagerImageIndex, setCurrentManagerImageIndex] = useState(0);
  const [currentLegacyImageIndex, setCurrentLegacyImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isJourneyMapExpanded, setIsJourneyMapExpanded] = useState(false);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
  const [isLegacyImageExpanded, setIsLegacyImageExpanded] = useState(false);
  const [isWorkflowImageExpanded, setIsWorkflowImageExpanded] = useState(false);
  const [isCandidateOnboardingExpanded, setIsCandidateOnboardingExpanded] = useState(false);
  const [isCandidateInterfaceExpanded, setIsCandidateInterfaceExpanded] = useState(false);
  const [isManagerInterfaceExpanded, setIsManagerInterfaceExpanded] = useState(false);

  // Array of workflow images for cycling
  const workflowImages = [workflowImage1, workflowImage2, workflowImage3, workflowImage4, workflowImage5];

  // Array of candidate onboarding/profile images
  const candidateOnboardingImages = [
    { src: candidateSignIn, alt: "Candidate sign in — MAIA platform login with USG warning" },
    { src: candidateOnboarding, alt: "Candidate onboarding — AI-assisted Career Story profile creation with conversational flow" },
    { src: candidateProfile, alt: "Candidate profile — My Profile page with Career Snapshot and personal information" },
    { src: candidateCareerStory, alt: "Candidate profile — My Career Story timeline with work experience entries" },
    { src: candidateDocuments, alt: "Candidate profile — My Documents upload checklist with certifications and clearance" },
    { src: candidateUploaded, alt: "Candidate profile — My Uploaded Documents list with resume files" },
    { src: candidateSettings, alt: "Candidate Settings — Account settings with appearance, AI data retention, and system preferences" },
  ];

  // Array of candidate interface images for cycling
  const candidateImages = [candidateInterface1, candidateInterface3, candidateInterface2, candidateInterface4, candidateInterface5, candidateInterface6];

  // Array of manager interface images for cycling
  const managerImages = [managerInterface1, managerInterface2, managerInterface3];

  // Array of legacy system images (manual click only, no auto-slide)
  const legacyImages = [
    { src: legacyHomeScreen, alt: "LEGACY-M-CLASS-HOME-SCREEN — Avue Navigator M Class home screen with module menu grid" },
    { src: legacyListView, alt: "LEGACY-LIST-VIEW — Avue Navigator uploaded offerings list view with data table" },
  ];

  // Remove all three auto-cycle useEffects below and go straight to handleScroll
  useEffect(() => {
    const handleScroll = () => {
      const teamSection = document.getElementById('team');
      if (teamSection) {
        const teamBottom = teamSection.offsetTop + teamSection.offsetHeight;
        const scrollBottom = window.scrollY + window.innerHeight;
        
        // Hide the indexer when we've scrolled past the team section
        if (scrollBottom > teamBottom + 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ paddingTop: '64px' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/60 mb-4"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          GovTech HRIT solution
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-6xl md:text-7xl lg:text-8xl mb-4"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Maia HRIT<span style={{ color: '#EB5097' }}>.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 mb-16"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          AI-Assisted Federal Hiring Platform
        </motion.p>

        {/* Fixed Right Content Index */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden lg:block fixed right-12 w-[200px] z-50"
          style={{ top: 'calc(64px + 2rem)', pointerEvents: isVisible ? 'auto' : 'none' }}
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 
              className="text-white mb-8"
              style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Content
            </h3>
            <nav className="space-y-4">
              <button 
                onClick={() => handleScrollToSection('overview')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Overview
              </button>
              <button 
                onClick={() => handleScrollToSection('the-problem')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                The Problem
              </button>
              <button 
                onClick={() => handleScrollToSection('research')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Research
              </button>
              <button 
                onClick={() => handleScrollToSection('key-decisions')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Key Decisions & Tradeoffs
              </button>
              <button 
                onClick={() => handleScrollToSection('design-decisions')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Interface Overview
              </button>
              <button 
                onClick={() => handleScrollToSection('impact')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Outcomes & Impact
              </button>
              <button 
                onClick={() => handleScrollToSection('my-scope')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                My Scope & Ownership
              </button>
              <button 
                onClick={() => handleScrollToSection('team')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Team
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-8"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div>
              <h3 className="text-white mb-2">Role</h3>
              <p className="text-white/60">Product Designer, AI Systems</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Responsibilities</h3>
              <div className="text-white/60 space-y-1">
                <p>Product strategy</p>
                <p>UX research</p>
                <p>Design system</p>
                <p>Prototyping</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Company</h3>
              <p className="text-white/60">Avue Technologies</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Date</h3>
              <p className="text-white/60">March 2025</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">6 months</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Team</h3>
              <p className="text-white/60">Product, AI/ML, Engineering, Compliance</p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div id="overview">
              <h2 className="text-2xl mb-6">Overview</h2>
              <div className="text-white/60 space-y-4">
                <p>
                  <span className="text-white">Avue Technologies</span> was modernizing a legacy HRIT system used by the Department of Defense to recruit and manage civilian and contractor talent. <span className="text-white">MAIA</span> was redesigned as a secure AI-assisted platform deployed in <span className="text-white">AWS GovCloud</span>, aligned with <span className="text-white">FedRAMP security requirements</span> and federal accessibility standards.
                </p>
                <p>
                  The design hypothesis was simple. <span className="text-white">AI surfaces evidence. Humans take action.</span> On the hiring manager side, that meant surfacing the reasoning behind every candidate match so managers could defend their decisions. On the candidate side, it meant surfacing opportunity recommendations so applicants could understand how the system was reading their qualifications. The platform's job was to make that boundary legible at every step.
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <img 
                  src={hritImage} 
                  alt="HRIT Platform Interface"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>

          </motion.div>

          {/* The Problem Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="the-problem"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="space-y-8">
              <h2 className="text-4xl" style={{ fontWeight: 500 }}>
                The Problem<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Systemic Challenge Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-white text-xl" style={{ fontWeight: 500, fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  The Systemic Hiring Challenge in Federal HRIT
                </h3>
                <div className="text-white/60 space-y-4">
                  <p>
                    Federal agencies compete with the private sector for critical talent across technology, cybersecurity, and healthcare, yet rely on slow, fragmented legacy hiring systems.
                  </p>
                  <p>
                    The result is a hiring ecosystem where qualified candidates drop off, vacancies remain open for months, and agencies struggle to maintain workforce readiness.
                  </p>
                </div>
              </div>

              <div className="text-white/60 space-y-4">
                <p>
                  In a pilot program across 3 U.S. Department of Defense agencies, hiring decisions were taking up to <span className="text-white font-medium">6 months</span>. Recruiters context-switched across fragmented tools, parsed resumes manually, and worked through compliance-heavy workflows that slowed decisions and reduced visibility into the candidate pipeline.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-white/60 mb-4">Key friction points:</p>
                <div className="space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/60 flex-1">Manual filtering consumed significant workflow time</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/60 flex-1">Cognitive overload across multi-step review flows</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/60 flex-1">Limited visibility into candidate-job alignment</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/60 flex-1">Accessibility gaps affecting federal compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Research Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="research"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl" style={{ fontWeight: 500 }}>
                  Research<span style={{ color: '#EB5097' }}>.</span>
                </h2>
                <p className="text-white/60 mt-2">Research Insights</p>
              </div>

              {/* Research Insights Illustration */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <img 
                  src={researchInsightsImage} 
                  alt="Key Research Insights illustration from recruiter interviews and usability testing"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              <p className="text-white/60">
                Through recruiter interviews, usability testing, and heuristic audits of the existing Avue HR legacy system, three patterns emerged: fragmented systems, cognitive overload, and a trust deficit around how candidates were matched and ranked.
              </p>

              <div className="space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Manual document parsing slowed hiring cycles and introduced data-entry error across compliance-sensitive steps.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Explainability was the core design problem, not a downstream feature.</p>
                </div>
              </div>

              {/* The Research Environment */}
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                  The Research Environment
                </h3>

                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  Maia operated within a federal contracting context where direct end-user access was structurally constrained. DoD agency end-users, recruiters, hiring managers, and applicants, could not be recruited through conventional UX research channels due to clearance requirements, agency protocols, and contractual access boundaries. Primary qualitative signal flowed through stakeholder-mediated channels: sales engineers, implementation leads, and program contacts at client agencies.
                </p>

                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  This is a common reality in federal-adjacent product work, and it shaped the research approach. Rather than treating it as a limitation to apologize for, we structured the practice around the methods that were viable inside the constraint, and triangulated across them.
                </p>

                <div className="bg-white/5 border-l-4 rounded-r-lg p-6 mt-8" style={{ borderLeftColor: '#EB5097' }}>
                  <p className="text-white/80 italic" style={{ lineHeight: '1.8', fontSize: '1.125rem' }}>
                    Maia operated within federal contracting access constraints. Research signal came through stakeholder synthesis, heuristic evaluation of the legacy Avue HR system, cognitive walkthroughs of high-volume hiring workflows, and recruiter-side interviews with internal Avue staff who worked daily with agency contacts.
                  </p>
                </div>

                <h4 className="text-lg text-white mt-8" style={{ fontWeight: 600 }}>
                  What This Surfaced
                </h4>

                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  Five concrete findings drove the design direction:
                </p>

                <div className="space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/80 flex-1" style={{ lineHeight: '1.8' }}>Fragmented tools created operational silos that the new platform needed to dissolve.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/80 flex-1" style={{ lineHeight: '1.8' }}>Manual document parsing slowed hiring cycles and introduced data-entry error.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/80 flex-1" style={{ lineHeight: '1.8' }}>Dense interfaces increased error rates in compliance-sensitive steps.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/80 flex-1" style={{ lineHeight: '1.8' }}>Hiring managers could not verify the candidates the system surfaced to them — eroding trust in the AI layer.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></div>
                    <p className="text-white/80 flex-1" style={{ lineHeight: '1.8' }}>Explainability was the core design problem, not a downstream feature.</p>
                  </div>
                </div>

                <div className="bg-white/5 border-l-4 rounded-r-lg p-6 mt-8" style={{ borderLeftColor: '#EB5097' }}>
                  <p className="text-white/80 italic" style={{ lineHeight: '1.8', fontSize: '1.125rem' }}>
                    These insights were synthesized into a dual journey map — surfacing where AI intervention could meaningfully reduce friction for both candidates and recruiters/hiring managers.
                  </p>
                </div>
              </div>

              {/* Subheader for Dual Journey Map */}
              <p className="text-white mt-12 mb-6 text-center">Recruiter/Hiring Manager & Candidates Journey Map</p>

              {/* Dual Journey Map */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative w-full">
                  {/* How to Read This Map - Legend */}
                  <div className="border-b border-white/10">
                    <button
                      onClick={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                      aria-expanded={isInstructionsExpanded}
                      aria-label="Toggle journey map legend"
                    >
                      <span className="text-white text-sm" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                        How to Read This Map
                      </span>
                      <ChevronDown className={`w-5 h-5 text-white/60 transition-transform duration-200 ${isInstructionsExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    {isInstructionsExpanded && (
                      <div className="px-6 pb-6 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Candidate */}
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#5FCFAB' }}></div>
                            <div>
                              <p className="text-white text-sm" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Candidate
                              </p>
                              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Job seeker experience
                              </p>
                            </div>
                          </div>

                          {/* Recruiter */}
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#EB2853' }}></div>
                            <div>
                              <p className="text-white text-sm" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Recruiter/HM
                              </p>
                              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Hiring manager flow
                              </p>
                            </div>
                          </div>

                          {/* AI Opportunity */}
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#A08DF3' }}></div>
                            <div>
                              <p className="text-white text-sm" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                AI Opportunity
                              </p>
                              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Intervention points
                              </p>
                            </div>
                          </div>

                          {/* Pain Point */}
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: '#AC7041' }}></div>
                            <div>
                              <p className="text-white text-sm" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Pain Point
                              </p>
                              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                                Friction areas
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="p-6 pb-0">
                    <h3 className="text-lg text-white" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Dual Journey Map — Candidate and Recruiter/HM experiences mapped in parallel
                    </h3>
                    <p className="text-white/40 text-sm mt-1" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Showing where AI intervention reduces friction on both sides of the hiring flow.
                    </p>
                  </div>
                  {/* Legend bar */}
                  <div className="flex justify-end p-4">
                    <img 
                      src={journeyMapLegend} 
                      alt="Journey map legend — Candidate, Recruiter/HM, AI Opportunity, Pain Point"
                      className="h-[28px] w-auto"
                      loading="lazy"
                    />
                  </div>
                  {/* Main journey map with expand button */}
                  <div className="relative group">
                    <button
                      onClick={() => setIsJourneyMapExpanded(true)}
                      className="absolute top-4 left-4 z-10 bg-black/80 hover:bg-black border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200 flex items-center gap-2"
                      aria-label="Expand journey map"
                    >
                      <Expand className="w-4 h-4 text-white" />
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">Expand</span>
                    </button>
                    <img 
                      src={journeyMapMain} 
                      alt="Maia Dual Journey Map — MMV Jobseekers showing 5 stages: Awareness & Onboarding, Exploration & Search, Decision Making, Application, and Post-Application with Candidate, Recruiter/HM, Pain Points, and AI Opportunity rows"
                      className="w-full h-auto cursor-pointer"
                      loading="lazy"
                      onClick={() => setIsJourneyMapExpanded(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Journey Map Insight */}
              <div className="mt-8 bg-black border border-white/10 rounded-2xl p-8">
                <p className="text-white/80 text-lg italic" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  The journey map became a strategic input for the pilot product roadmap, revealing where AI could meaningfully reduce friction in federal hiring workflows.
                </p>
                <p className="text-white/80 text-lg italic mt-4" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Key outcomes included SmartMatch™ candidate scoring and real-time LLM form guidance, designed to reduce administrative burden for both candidates and recruiters.
                </p>
                <p className="text-white/80 text-lg italic mt-4" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Rather than automating hiring decisions, the system uses AI to absorb repetitive tasks so humans can focus on what matters most: helping hiring managers evaluate candidate fit while guiding applicants toward opportunities aligned with their qualifications.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Avue's SmartMatch™
                    </h4>
                    <p className="text-white/60 text-sm">
                      AI-powered candidate relevance scoring based on resumes, licenses, certifications, and federal hiring requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white text-sm mb-1" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                      Real-Time LLM Form Guidance
                    </h4>
                    <p className="text-white/60 text-sm">
                      Context-aware assistance that helps applicants complete complex federal hiring forms accurately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Journey Map Expanded Modal */}
              {isJourneyMapExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsJourneyMapExpanded(false)}
                >
                  <button
                    onClick={() => setIsJourneyMapExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <div className="p-6 pb-0">
                        <h3 className="text-lg text-white" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                          Dual Journey Map — Candidate and Recruiter/HM experiences mapped in parallel
                        </h3>
                        <p className="text-white/40 text-sm mt-1" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                          Showing where AI intervention reduces friction on both sides of the hiring flow.
                        </p>
                      </div>
                      <div className="flex justify-end p-4">
                        <img
                          src={journeyMapLegend}
                          alt="Journey map legend — Candidate, Recruiter/HM, AI Opportunity, Pain Point"
                          className="h-[28px] w-auto"
                        />
                      </div>
                      <img
                        src={journeyMapMain}
                        alt="Maia Dual Journey Map — MMV Jobseekers showing 5 stages: Awareness & Onboarding, Exploration & Search, Decision Making, Application, and Post-Application with Candidate, Recruiter/HM, Pain Points, and AI Opportunity rows"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Legacy Image Expanded Modal */}
              {isLegacyImageExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsLegacyImageExpanded(false)}
                >
                  <button
                    onClick={() => setIsLegacyImageExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={legacyImages[currentLegacyImageIndex].src}
                      alt={legacyImages[currentLegacyImageIndex].alt}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}

              {/* Workflow Image Expanded Modal */}
              {isWorkflowImageExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsWorkflowImageExpanded(false)}
                >
                  <button
                    onClick={() => setIsWorkflowImageExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={workflowImages[currentWorkflowImageIndex]}
                      alt={`HRIT Platform Workflow - Step ${currentWorkflowImageIndex + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}

              {/* Candidate Onboarding Expanded Modal */}
              {isCandidateOnboardingExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsCandidateOnboardingExpanded(false)}
                >
                  <button
                    onClick={() => setIsCandidateOnboardingExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={candidateOnboardingImages[currentCandidateOnboardingIndex].src}
                      alt={candidateOnboardingImages[currentCandidateOnboardingIndex].alt}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}

              {/* Candidate Interface Expanded Modal */}
              {isCandidateInterfaceExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsCandidateInterfaceExpanded(false)}
                >
                  <button
                    onClick={() => setIsCandidateInterfaceExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={candidateImages[currentCandidateImageIndex]}
                      alt={`AI MAIA Candidate interface screen ${currentCandidateImageIndex + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}

              {/* Manager Interface Expanded Modal */}
              {isManagerInterfaceExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                  onClick={() => setIsManagerInterfaceExpanded(false)}
                >
                  <button
                    onClick={() => setIsManagerInterfaceExpanded(false)}
                    className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close expanded view"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={managerImages[currentManagerImageIndex]}
                      alt={`AI MAIA Hiring Manager interface screen ${currentManagerImageIndex + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Key Decisions & Tradeoffs Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="key-decisions"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl" style={{ fontWeight: 500 }}>
                  Key Decisions & Tradeoffs<span style={{ color: '#EB5097' }}>.</span>
                </h2>
                <p className="text-white/60 mt-2">Key Decisions</p>
                <p className="text-white/80 mt-4 italic" style={{ lineHeight: '1.8', fontSize: '1.125rem' }}>
                  Designing MAIA meant making explicit choices about where AI should lead, where it should assist, and where it should stay out of the way. These are the three decisions that shaped the platform.
                </p>

                {/* Decision Blocks */}
                <div className="mt-8 space-y-8">
                  {/* Decision 1 */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                      Conversational AI over structured forms
                    </h3>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      Federal hiring workflows are traditionally form-heavy. We chose a conversational entry point instead, anchored on a single prompt: "Tell us what you're looking for."
                    </p>
                    <p className="text-white/80 italic" style={{ lineHeight: '1.8' }}>
                      Early concepts explored a structured wizard with conditional branching. It tested cleaner than legacy forms but reintroduced the same context-switching problem the conversational model was meant to solve.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> the predictability of structured inputs and the easier compliance auditing that comes with discrete form fields. Free-text intent is harder to validate against FedRAMP and hiring policy requirements than a checkbox.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> structured guardrails behind the conversation. The LLM parsed intent into validated fields, surfaced compliance flags inline, and offered structured shortcuts (Find candidates that match a resume, a job description, a posted opportunity) for users who preferred direct entry. The conversation was the front door, not the only door.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> legacy users were not failing because forms were too simple. They were failing because they had to context-switch across ten modules to complete one hiring action. Conversational entry collapsed that into a single intent.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Decision 2 */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                      Explainability over a cleaner UI
                    </h3>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      SmartMatch could have shipped as a confidence score and a ranked list. Cleaner, faster, more impressive on first look.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      We chose to expose the reasoning instead. Every recommendation surfaces its rationale in plain language: which qualifications matched, which were missing, what the model weighed, and what additional observations were worth flagging.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> visual restraint. The recommendation card carries more text than a typical product surface, and we accepted that the interface would feel denser than a consumer AI experience.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> progressive disclosure. The headline recommendation reads in two seconds. Key Strengths, Additional Observations, and the full SmartMatch Assessment expand only when the hiring manager wants to defend the decision.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> research surfaced Trust Deficit as the single highest barrier to AI adoption in federal hiring. A hiring manager cannot act on a recommendation they cannot defend to a panel, a candidate, or an inspector general. Explainability was not a polish item. It was the product.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Decision 3 */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                      Human-in-the-loop over full automation
                    </h3>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      The strongest demo would have been MAIA shortlisting candidates and pushing interview invitations automatically. We did not build that. We chose to keep the hiring manager as the decision-maker at every consequential step. MAIA generates the shortlist. The human approves it, adjusts the ranking, and triggers next actions.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> throughput. A fully automated pipeline would have moved candidates faster and produced more impressive efficiency numbers in the pilot.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> we automated the work that exhausted hiring managers without removing their judgment. Resume parsing, qualification matching, compliance validation, and form pre-population all run automatically. The decisions stay with people.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> federal hiring carries legal accountability that cannot be delegated to a model. Hiring managers were not asking for a system that hired for them, they were asking for one that gave them back the hours they were losing to administrative work.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Decision 4 */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                      Calibration as a design surface
                    </h3>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      The temptation in AI product work is to treat the model's outputs as an engineering problem and the screen around them as a design problem. That split breaks down quickly. What the AI says — its tone, its confidence calibration, its refusal behavior, the way it surfaces reasoning — is product surface. It needs to be designed.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      LLM-driven dialogue does not behave like a rule-based system. Outputs are probabilistic. Confidence varies. The model will sometimes generate plausible language that is not grounded in the actual candidate data. Designing for that requires owning the system prompt as a design artifact, not just the screen the output appears on.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      I partnered with the conversational LLM fine-tuning specialist on the calibration work. The engineer owned the model behavior end of the pipeline. I owned the design end: applying prompt engineering and context engineering to shape what the AI should say in each context, where its confidence language should shift, when it should defer to the human, and how explanations should be structured for the hiring manager's accountability needs.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      Calibration drew on three streams of context: research findings on trust and explainability, PRD-aligned outcomes the hiring manager workflow needed to support, and the engineering constraints of what the model could reliably do. That context fed every prompt iteration and every eval scenario we built.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> speed. Treating language as a design surface meant slower iteration cycles than letting the model define its own voice.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we worked it:</span> structured eval scenarios tied to hiring workflows, prompt iterations reviewed against the explainability bar SmartMatch needed to clear, and sample-based auditing of outputs against the trust-deficit findings from research. We tracked edit distance on AI-generated content as a quality signal — how much hiring managers were changing the model's output to make it usable. We designed deliberately for the failure states: what the model should say when it was uncertain, when it had partial data, and when it should defer to the human rather than guess. Calibration was not a one-time tuning pass — it was an ongoing partnership between design and ML, informed by sampled conversation behavior across the pipeline.
                    </p>
                    <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                      <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> federal hiring managers were going to defend AI recommendations to auditors and panels. The language the AI used had to be defensible by design, not by accident. Owning system prompts as design artifacts was the only way to make the explainability commitment real.
                    </p>
                  </div>
                </div>

                {/* Transitional sentence */}
                <p className="text-white/60 mt-8 italic" style={{ lineHeight: '1.8', fontSize: '1.125rem' }}>
                  These decisions produced a system that looks and behaves nothing like its predecessor.
                </p>
              </div>

              {/* Legacy System Gallery */}
              <div className="mt-12">
                <h4 className="text-lg text-white/80 mb-4 text-center">
                  Before
                </h4>
                
                <div className="relative w-full">
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10" style={{ height: '600px' }}>
                    {legacyImages.map((image, index) => (
                      <motion.img
                        key={`legacy-${index}`}
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: currentLegacyImageIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    ))}
                    <button
                      onClick={() => setIsLegacyImageExpanded(true)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200"
                      aria-label="Expand legacy system view"
                    >
                      <Expand className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {legacyImages.map((_, index) => (
                      <button
                        key={`legacy-dot-${index}`}
                        onClick={() => setCurrentLegacyImageIndex(index)}
                        className="transition-all duration-300 cursor-pointer"
                        style={{
                          width: currentLegacyImageIndex === index ? '32px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: currentLegacyImageIndex === index ? '#EB5097' : 'rgba(255, 255, 255, 0.3)',
                        }}
                        aria-label={`View legacy system screen ${index + 1}`}
                      />
                    ))}
                  </div>

                  <p className="text-white/60 text-sm text-center mt-4">
                    Filter-heavy dashboard - Avue's Legacy M Class Navigator - 10+ modules, no hierarchy, high cognitive load
                  </p>
                </div>
              </div>

              {/* AI MAIA Hiring Manager - SmartMatch (After - Redesign) */}
              <div className="mt-12">
                <h4 className="text-lg text-white/80 mb-4 text-center">
                  After
                </h4>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ height: '600px' }}>
                    {workflowImages.map((image, index) => (
                      <motion.img
                        key={`smartmatch-${index}`}
                        src={image}
                        alt={`HRIT Platform Workflow - Step ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-contain rounded-lg"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentWorkflowImageIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                    <button
                      onClick={() => setIsWorkflowImageExpanded(true)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200"
                      aria-label="Expand workflow view"
                    >
                      <Expand className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    {workflowImages.map((_, index) => (
                      <button
                        key={`smartmatch-dot-${index}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentWorkflowImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentWorkflowImageIndex === index 
                            ? 'w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        style={{
                          backgroundColor: currentWorkflowImageIndex === index ? '#EB5097' : undefined
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-white/60 text-sm text-center mt-4">
                  Conversational AI workflow — intent-driven, compliance-aware, reduced to a single entry point - MAIA AI Powered - Recruiter
                </p>
              </div>

              <p className="text-white text-2xl mt-12" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 500 }}>
                From document chaos to ranked candidates — in one intelligent flow.
              </p>

              {/* AI Matching Workflow Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mt-8">
                <img 
                  src={aiMatchingNew} 
                  alt="AI Matching workflow diagram showing candidate side (Resume Upload, AI Tokenization, Skill Extraction, Optimized Federal Position Results) and manager side (Post Job Description, AI Parsing and Classification, Candidate Matching, Shortlist Results)"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* Key Decisions bullets - hidden
              <div className="space-y-3 mt-8">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Balanced automation with human oversight to maintain auditability in compliance-sensitive environments.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Reduced component variance and introduced boolean logic patterns to decrease design-to-dev friction.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Prioritized modular architecture to support multi-tenant DoD agency deployment.</p>
                </div>
              </div>
              */}
            </div>
          </motion.div>

          {/* Interface Overview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="design-decisions"
          >
            <div className="space-y-8">
              {/* Title */}
              <h2 
                className="text-4xl"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Interface Overview<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              <p className="text-white/80 mt-4 italic" style={{ lineHeight: '1.8', fontSize: '1.125rem' }}>
                MAIA's design hypothesis was simple: AI generates insights, but only humans can take action. The interface had to make that boundary legible at every step.
              </p>

              {/* AI MAIA Candidate Side Interface Carousel */}
              <div className="mt-16">
                <h3 
                  className="text-2xl text-white/60 mb-8"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  AI MAIA Candidate side interface
                </h3>

                {/* Candidate Onboarding & Profile Carousel */}
                <div className="relative w-full mb-16">
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10" style={{ height: '600px' }}>
                    {candidateOnboardingImages.map((image, index) => (
                      <motion.img
                        key={`onboarding-${index}`}
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: currentCandidateOnboardingIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    ))}
                    <button
                      onClick={() => setIsCandidateOnboardingExpanded(true)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200"
                      aria-label="Expand candidate onboarding view"
                    >
                      <Expand className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {candidateOnboardingImages.map((_, index) => (
                      <button
                        key={`onboarding-dot-${index}`}
                        onClick={() => setCurrentCandidateOnboardingIndex(index)}
                        className="transition-all duration-300"
                        style={{
                          width: currentCandidateOnboardingIndex === index ? '32px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: currentCandidateOnboardingIndex === index ? '#EB5097' : 'rgba(255, 255, 255, 0.3)',
                        }}
                        aria-label={`View candidate onboarding screen ${index + 1}`}
                      />
                    ))}
                  </div>

                  <p className="text-white/60 text-sm text-center mt-4">
                    Candidate onboarding and candidates profile
                  </p>
                </div>

                {/* Candidate Interface Carousel */}
                <div className="relative w-full">
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10" style={{ height: '600px' }}>
                    {candidateImages.map((image, index) => (
                      <motion.img
                        key={`candidate-${index}`}
                        src={image}
                        alt={`AI MAIA Candidate interface screen ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: currentCandidateImageIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    ))}
                    <button
                      onClick={() => setIsCandidateInterfaceExpanded(true)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200"
                      aria-label="Expand candidate interface view"
                    >
                      <Expand className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {candidateImages.map((_, index) => (
                      <button
                        key={`candidate-dot-${index}`}
                        onClick={() => setCurrentCandidateImageIndex(index)}
                        className="transition-all duration-300"
                        style={{
                          width: currentCandidateImageIndex === index ? '32px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: currentCandidateImageIndex === index ? '#EB5097' : 'rgba(255, 255, 255, 0.3)',
                        }}
                        aria-label={`View candidate interface ${index + 1}`}
                      />
                    ))}
                  </div>

                  <p className="text-white/60 text-sm text-center mt-4">
                    SmartMatch top opportunities, Candidates top opportunities & My talent marketplace opportunities
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Impact Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="business-impact"
          >
            <div className="space-y-8">
              {/* AI MAIA Hiring Manager Side Interface Carousel */}
              <div className="mt-16">
                <h3 
                  className="text-2xl text-white/60 mb-3"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  AI MAIA Hiring Manager side DoD interface
                </h3>
                
                <div className="relative w-full">
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10" style={{ height: '600px' }}>
                    {managerImages.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`AI MAIA Hiring Manager interface screen ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: currentManagerImageIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                    ))}
                    <button
                      onClick={() => setIsManagerInterfaceExpanded(true)}
                      className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200"
                      aria-label="Expand manager interface view"
                    >
                      <Expand className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Carousel indicators */}
                  <div className="flex justify-center gap-2 mt-6">
                    {managerImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentManagerImageIndex(index)}
                        className="transition-all duration-300"
                        style={{
                          width: currentManagerImageIndex === index ? '32px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: currentManagerImageIndex === index ? '#EB5097' : 'rgba(255, 255, 255, 0.3)',
                        }}
                        aria-label={`View manager interface ${index + 1}`}
                      />
                    ))}
                  </div>

                  <p className="text-white/60 text-sm text-center mt-4">
                    Geographic salary comparisons, Market positioning analysis, Competitive intelligence
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="impact"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl" style={{ fontWeight: 500 }}>
                  Outcomes & Impact<span style={{ color: '#EB5097' }}>.</span>
                </h2>
                <p className="text-white/60 mt-2">Outcomes & Impact</p>
              </div>

              {/* Outcomes & Impact Illustration */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <img
                  src={outcomesImage}
                  alt="Outcomes and Impact — 40% Faster design-to-dev turnaround, AI-Driven recruiter workflow efficiency, FedRAMP compliance architecture, Auto-Match AI candidate shortlisting, WCAG 2.1 AA accessibility and inclusive design"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>

              {/* How we measured impact */}
              <div className="mt-12 space-y-6">
                <h3 className="text-2xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }}></span>
                  How we measured impact
                </h3>

                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  Impact in regulated enterprise platforms is rarely clean. Most outcomes show up across telemetry, stakeholder reporting, and qualitative observation, and rarely all at once. The numbers above reflect a combination of measured pilot data and stakeholder estimates from the Avue leadership team and DoD program partners, captured during the U.S. Air Force pilot rollout.
                </p>

                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  Rather than present a single headline number, the impact of MAIA is best read in three layers.
                </p>

                {/* Quantitative */}
                <div className="space-y-3 mt-8">
                  <h4 className="text-lg text-white" style={{ fontWeight: 600 }}>
                    Quantitative — what we measured directly
                  </h4>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    Pilot telemetry and time-to-action tracking informed the matching accuracy and hiring efficiency figures. Onboarding time reduction was measured against the legacy M Class workflow baseline. Administrative workload reduction and adoption percentages were captured through a combination of in-platform analytics and structured feedback from hiring managers participating in the pilot.
                  </p>
                </div>

                {/* Directional */}
                <div className="space-y-3 mt-8">
                  <h4 className="text-lg text-white" style={{ fontWeight: 600 }}>
                    Directional — what shifted at the program level
                  </h4>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    The most defensible signal is what happened around the product, not just inside it. MAIA closed a competitive bid contract pilot with the U.S. Air Force, an outcome that required the platform to clear FedRAMP security review, federal accessibility standards, and a hiring manager evaluation panel. A platform does not pass that gauntlet on aesthetics. It passes when the work answers a procurement question Avue had not been able to answer before.
                  </p>
                </div>

                {/* Design */}
                <div className="space-y-3 mt-8">
                  <h4 className="text-lg text-white" style={{ fontWeight: 600 }}>
                    Design — what research and testing told us was working
                  </h4>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    Three signals from research validated the design direction before pilot data was available. Hiring managers tested against the new SmartMatch interface could defend AI recommendations to a hypothetical review panel, where they could not with the legacy ranked-list approach. Cognitive load measured through task-completion testing dropped on the conversational entry point compared to the modular legacy navigator. Trust calibration improved when reasoning was surfaced inline rather than hidden behind a confidence score.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* My Scope & Ownership Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="my-scope"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl" style={{ fontWeight: 500 }}>
                  My Scope & Ownership<span style={{ color: '#EB5097' }}>.</span>
                </h2>
                <p className="text-white/60 mt-2">My Role</p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Led UX strategy for AI-assisted recruiter and candidate workflows</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Defined system architecture for conversational matching interactions</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Built and governed a tokenized design system for scalable deployment</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Collaborated with AI/ML to integrate resume ingestion and skill extraction pipelines</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#EB5097' }}></div>
                  <p className="text-white/60 flex-1">Worked with compliance stakeholders to align flows with FedRAMP and WCAG standards</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="team"
          >
            <div className="space-y-8">
              {/* Title */}
              <h2 
                className="text-4xl"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Team<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Description */}
              <div className="text-white/60 space-y-4">
                <p style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  This initiative was a collaborative effort between <span className="text-white">product design, engineering, AI/ML, and compliance teams</span>. We partnered directly with DoD stakeholders to ensure the platform met rigorous standards in security, accessibility, and user experience.
                </p>
              </div>

              {/* Team Avatars */}
              <div className="mt-12 flex items-center gap-6 flex-wrap">
                {/* Josh Richardson */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarJosh} 
                      alt="Josh Richardson - Software Implementation and QA"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Josh Richardson
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Software Implementation & QA
                    </p>
                  </div>
                </div>

                {/* Hannah Sinn */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarHannah} 
                      alt="Hannah Sinn - Conversational Logic and LLM Fine-tuning"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Hannah Sinn
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Conversational Logic & LLM Fine-tuning
                    </p>
                  </div>
                </div>

                {/* James Faulkner */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarJames} 
                      alt="James Faulkner - Conversational Logic and LLM Fine-tuning"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      James Faulkner
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Conversational Logic & LLM Fine-tuning
                    </p>
                  </div>
                </div>

                {/* Matt Lemieux */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarMatt} 
                      alt="Matt Lemieux - UX Research and Lead Usability"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Matt Lemieux
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      UX Research & Lead Usability
                    </p>
                  </div>
                </div>

                {/* Karl Zajac */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarKarl} 
                      alt="Karl Zajac - AI Integration Architect"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Karl Zajac
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      AI Integration Architect
                    </p>
                  </div>
                </div>

                {/* Monty Cook */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarMonty} 
                      alt="Monty Cook - Chief Innovation Officer"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Monty Cook
                    </p>
                    <p 
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Chief Innovation Officer
                    </p>
                  </div>
                </div>

                {/* Daniel Fornica */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10"
                    style={{ 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img 
                      src={avatarDaniel} 
                      alt="Daniel Fornica - UX Design Specialist and Systems Implementation"
                      className="w-full h-full object-cover"
                      style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                    />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-white text-sm"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Daniel Fornica
                    </p>
                    <p
                      className="text-white/60 text-xs"
                      style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      Product Designer, AI Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
        
        {/* Project Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <PreviousProject 
            projectName="Juice Up App"
            onNavigate={() => onNavigateToProject?.('juice-up')}
          />
          <NextProject 
            projectName="Building a Conversational AI Design System for GovTech HRIT"
            onNavigate={() => onNavigateToProject?.('maia')}
          />
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}