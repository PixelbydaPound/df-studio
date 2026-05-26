import { motion } from "motion/react";
import { ArrowLeft, ChevronDown, ChevronUp, X } from "lucide-react";
import { MaiaStats } from "./MaiaStats";
import { ScrollToTop } from "./ScrollToTop";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";
import { Footer } from "./Footer";
import designTokensPipeline from "figma:asset/81b90628e657159f87cb746ed0d6353db73e2f58.png";
import principlesImage from "figma:asset/f8596ce9f6b8ab87081265b150346c80bf3edaaa.png";
import foundationsImage from "figma:asset/324bec124a5d6a0b0bd0c8e77c130f9dc559e95e.png";
import tokensJsonImage from "figma:asset/87aaff7b74bed6c291a9fe5902700a559127f389.png";
import tokensVisualImage from "figma:asset/70c46e4607572805e4b8c6076c7497890a478129.png";
import colorsPreviewImage from "figma:asset/df8a9bc28102cb4611ec88c6dbfd31ba70cb93a2.png";
import colorsExpandedImage from "figma:asset/1268d9ab463cde00a26c2e92cb94f2b4a6206b6d.png";
import typographyPreviewImage from "figma:asset/7f29354e18e81580fc4e4b15c75571bd0a69742d.png";
import typographyExpandedImage from "figma:asset/8694a3355e920c9d098944cbb6c0fbb600f64f11.png";
import iconsImage from "figma:asset/1ab801fea6215eb6d0cbad00f9e9dacb067c4490.png";
import spacingImage from "figma:asset/3013d34d03c53a507e698d9c76fbefdf0375112f.png";
import componentLibraryImage1 from "figma:asset/1f0607ae2c4e3531bff064e8d1df1560ef83b2c9.png";
import componentLibraryImage2 from "figma:asset/1e4a3cb7fb0c7456c9069d480b796927b0b5b025.png";
import componentLibraryImage3 from "figma:asset/f690758f4d9e655676e9ef97b33aefdef99662bf.png";
import componentLibraryImage4 from "figma:asset/2df69b89744abad2e499c0a627286c6d4805f2b8.png";
import componentLibraryImage5 from "figma:asset/c9010056be23d23f5217f1e04ef4d3607a1cbb68.png";
import componentLibraryImage6 from "figma:asset/30ead9b46ac20dc789c8bc39957348e3fc24582a.png";

import booleansVariantsImage1 from "figma:asset/abaafa28270cde1356136b9ecef4a64cd043d7d2.png";
import booleansVariantsImage2 from "figma:asset/ac9cb380ac846bebd0b2a07d5c2167af6ac2d76f.png";
import booleansVariantsImage3 from "figma:asset/b808586ea14c40b0edb7330c64a5d7019c7e1741.png";
import atomsExampleImage from "figma:asset/b7d4d97d8edb91e4958cc4bd9d259289f8179f76.png";
import atomicDesignDiagram from "figma:asset/57b8006a066d825074be4c47e09b7917e676b698.png";
import danielPhoto from "figma:asset/388b535163e57fc79f201828d5784df63990acf0.png";
import montyPhoto from "figma:asset/81665140801fee8ff4dba43088883d3e1b646c67.png";
import melissaPhoto from "figma:asset/264159335a68003a5bb77134a04bc9204ab4b898.png";
import joshuaPhoto from "figma:asset/a637e3a170f5a850aae577b234205ef855eb93ef.png";
import karlPhoto from "figma:asset/59988e80e54f5b7f687b675534da8c0df0834341.png";
import { useState, useEffect, useRef } from "react";

interface MaiaProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function MaiaProject({ onBack, onNavigateToProject }: MaiaProjectProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isFoundationsImageExpanded, setIsFoundationsImageExpanded] = useState(false);
  const [isColorsImageExpanded, setIsColorsImageExpanded] = useState(false);
  const [isTypographyImageExpanded, setIsTypographyImageExpanded] = useState(false);
  const [isSpacingImageExpanded, setIsSpacingImageExpanded] = useState(false);
  const [isComponentLibraryImageExpanded, setIsComponentLibraryImageExpanded] = useState(false);
  const [currentComponentLibraryImageIndex, setCurrentComponentLibraryImageIndex] = useState(0);
  const [isBooleansVariantsExpanded, setIsBooleansVariantsExpanded] = useState(false);
  const [currentBooleansVariantsImageIndex, setCurrentBooleansVariantsImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Array of booleans/variants images for cycling
  const booleansVariantsImages = [booleansVariantsImage1, booleansVariantsImage2, booleansVariantsImage3];
  
  // Array of component library images for cycling
  const componentLibraryImages = [
    componentLibraryImage1, 
    componentLibraryImage2, 
    componentLibraryImage3,
    componentLibraryImage4,
    componentLibraryImage5,
    componentLibraryImage6
  ];

  // Auto-cycle through booleans/variants images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBooleansVariantsImageIndex((prevIndex) => 
        (prevIndex + 1) % booleansVariantsImages.length
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through component library images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComponentLibraryImageIndex((prevIndex) => 
        (prevIndex + 1) % componentLibraryImages.length
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle visibility of the content index on scroll
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
          Maia AI Design System
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-6xl md:text-7xl lg:text-8xl mb-16"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Maia<span style={{ color: '#EB5097' }}>.</span>
        </motion.h1>

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
                onClick={() => handleScrollToSection('maia-ai-design-system')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Maia AI Design System
              </button>
              <button 
                onClick={() => handleScrollToSection('goals')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Goals
              </button>
              <button 
                onClick={() => handleScrollToSection('principles')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Principles
              </button>
              <button 
                onClick={() => handleScrollToSection('foundations')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Foundations
              </button>
              <button 
                onClick={() => handleScrollToSection('general-improvements')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                General improvements
              </button>
              <button 
                onClick={() => handleScrollToSection('components-library')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Components library
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
        <div className="relative">

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
              <p className="text-white/60">UX Design Specialist II</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Date</h3>
              <p className="text-white/60">January 15th 2025</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Responsibilities</h3>
              <div className="text-white/60 space-y-1">
                <p>Leadership</p>
                <p>Design execution</p>
                <p>Cross-team collaboration</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">1 month</p>
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
                  I led the redesign and implementation of the <span className="text-white">Maia Design System</span> to support Avue's Conversational AI platform for DoD agencies. Over three months, I oversaw <span className="text-white">design execution, cross-team collaboration</span>, and the modernization of Avue's component library, introducing refined foundations to enhance <span className="text-white">consistency, efficiency, and scalability</span> across platforms while strengthening alignment between design and development.
                </p>
              </div>
            </div>

            {/* Maia Stats Widget */}
            <div className="mt-8">
              <MaiaStats />
            </div>
          </motion.div>

          {/* Design System Structure Section - Spans left sidebar + main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-8"
            id="maia-ai-design-system"
          >
            <div className="space-y-6">
              {/* Title */}
              <h2 
                className="text-4xl"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Maia AI Design System<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Description Paragraph */}
              <div className="text-white/60">
                <p style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  The Maia AI Design System required developing a high-level understanding of the technical landscape supporting an LLM-powered conversational interface designed to deliver a seamless experience for DoD agencies. Operating within Avue's HRIT multi-tenant platform, the system serves both hiring managers and federal job seekers. Due to strict security and compliance requirements within the GovTech ecosystem, the product was optimized exclusively for desktop environments. To ensure design and development alignment, the Maia Design System was built around a <span className="text-white">design token pipeline</span>, enabling consistent component behavior and visual parity from design to code. This structure provided <span className="text-white">scalable components, unified visual foundations, and AI-adaptive interaction patterns</span> to support a complex, high-security product ecosystem.
                </p>
              </div>

              {/* Design Tokens Pipeline */}
              <div 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setIsImageExpanded(!isImageExpanded)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                  aria-label="Expand image"
                >
                  <ChevronDown className="w-5 h-5 text-white/80" />
                </button>

                <img 
                  src={designTokensPipeline} 
                  alt="Design Tokens Pipeline"
                  className="w-full h-auto cursor-pointer"
                  loading="lazy"
                  onClick={() => setIsImageExpanded(true)}
                />
                  
                  {/* Section Labels */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
                    <div className="w-[110px]">Source file</div>
                    <div className="w-[90px]">Version control</div>
                    <div className="w-[220px]">CI/CD Pipeline</div>
                    <div className="w-[90px]">Build&Deploy</div>
                    <div className="w-[110px]">Transforming</div>
                    <div className="flex-1">Platform</div>
                  </div>
                </div>
              </div>

              {/* Fullscreen Image Modal */}
              {isImageExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                  onClick={() => setIsImageExpanded(false)}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsImageExpanded(false)}
                    className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Expanded Image */}
                  <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={designTokensPipeline} 
                      alt="Design Tokens Pipeline - Expanded"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </motion.div>
              )}
          </motion.div>

          {/* Goals Section - Spans left sidebar + main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="goals"
          >
            <div className="space-y-12">
              {/* Title */}
              <h2 
                className="text-4xl"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Goals<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Goal 1 */}
              <div className="flex gap-6 items-start">
                <div 
                  className="text-[120px] leading-none text-white/10"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 700
                  }}
                >
                  1.
                </div>
                <div className="flex-1 pt-8">
                  <h3 
                    className="text-2xl text-white mb-3"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Visual consistency
                  </h3>
                  <p className="text-white/60" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Standardize components, styles, and interactions to ensure a cohesive and polished user experience.
                  </p>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="flex gap-6 items-start">
                <div 
                  className="text-[120px] leading-none text-white/10"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 700
                  }}
                >
                  2.
                </div>
                <div className="flex-1 pt-8">
                  <h3 
                    className="text-2xl text-white mb-3"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Improve design and development efficiency
                  </h3>
                  <p className="text-white/60" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Streamline workflows, reduce redundancies, and enhance collaboration to speed up execution.
                  </p>
                </div>
              </div>

              {/* Goal 3 */}
              <div className="flex gap-6 items-start">
                <div 
                  className="text-[120px] leading-none text-white/10"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    fontWeight: 700
                  }}
                >
                  3.
                </div>
                <div className="flex-1 pt-8">
                  <h3 
                    className="text-2xl text-white mb-3"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Create a flexible and scalable system
                  </h3>
                  <p className="text-white/60" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    Create a seamless design-to-code workflow, enabling faster iteration, improved collaboration, and a single source of truth for UI components.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Principles Section - Spans left sidebar + main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="principles"
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
                Principles<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Principles Image - with cropped top to hide embedded title */}
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={principlesImage} 
                  alt="Six design principles displayed in cards: Aesthetics (polished UI enhances trust), Gestalt approach (intuitive coherent components), Light cognitive load (clear choices enable effortless decisions), Visual hierarchy (contrast and spacing improve focus), Consistency (predictable patterns accelerate learning), and Adaptability (components evolve to support new cases)"
                  className="w-full h-auto"
                  style={{ marginTop: '-60px' }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Foundations Section - Spans left sidebar + main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="foundations"
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
                Foundations<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Subtitle */}
              <h3 
                className="text-2xl text-white"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Organization of the file
              </h3>

              {/* Content */}
              <div className="space-y-6">
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  In our Foundations file, we follow industry best practices for structuring Design Systems, with dedicated pages for essential design elements.
                </p>
                
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Each page is organized with a clear layout: an introductory section on the left that provides context and guidelines, and a main content area on the right that showcases all design assets and specifications in detail.
                </p>
                
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  This structure ensures clarity, ease of navigation, and efficient collaboration across teams.
                </p>
              </div>

              {/* Foundations Image with Expand Button */}
              <div 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 relative group"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setIsFoundationsImageExpanded(!isFoundationsImageExpanded)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                  aria-label="Expand image"
                >
                  <ChevronDown className="w-5 h-5 text-white/80" />
                </button>

                <img 
                  src={foundationsImage} 
                  alt="Foundations file organization showing color tokens, with primary and secondary color palettes displayed alongside a list of tokens with their hex values and usage descriptions"
                  className="w-full h-auto cursor-pointer rounded-lg"
                  loading="lazy"
                  onClick={() => setIsFoundationsImageExpanded(true)}
                />
              </div>

              {/* Fullscreen Foundations Image Modal */}
              {isFoundationsImageExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                  onClick={() => setIsFoundationsImageExpanded(false)}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsFoundationsImageExpanded(false)}
                    className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Expanded Image */}
                  <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={foundationsImage} 
                      alt="Foundations file organization - Expanded"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* General Improvements Section - Spans left sidebar + main content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="general-improvements"
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
                General improvements<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              {/* Subtitle */}
              <h3 
                className="text-2xl text-white"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Tokens
              </h3>

              {/* Content */}
              <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                We improved the definition and structure of our design tokens, making them more scalable and adaptable to the diverse needs to all Avue's conversational UI workdlows. This new system ensures consistency across our ecosystem while allowing flexibility to support future growth and evolving design requirements.
              </p>

              {/* Tokens Images Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* JSON View Image */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <img 
                    src={tokensJsonImage} 
                    alt="Tokens Studio showing JSON code structure with primary and secondary colors defined with hex values and types"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>

                {/* Visual View Image */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <img 
                    src={tokensVisualImage} 
                    alt="Tokens Studio showing visual color palette interface with primary, secondary, neutrals, background, and overlay color groups"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Colors Subsection */}
              <div className="mt-16 space-y-6">
                {/* Subtitle */}
                <h3 
                  className="text-2xl text-white"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Colors
                </h3>

                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  The color palette was designed to be subtle yet professional, aligning with the standards of a federal GovTech environment while reflecting a modern aesthetic suited for AI interfaces. Colors were carefully selected to ensure strong contrast, accessibility, and a consistent brand experience for all users.
                </p>

                {/* Colors Image Widget with Expand */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group">
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsColorsImageExpanded(!isColorsImageExpanded)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                    aria-label="Expand image"
                  >
                    <ChevronDown className="w-5 h-5 text-white/80" />
                  </button>

                  <img 
                    src={colorsPreviewImage} 
                    alt="Maia Design System Colors page showing primary colors (Edo Indigo shades) and secondary colors (purple shades) with hex values"
                    className="w-full h-auto cursor-pointer rounded-lg"
                    loading="lazy"
                    onClick={() => setIsColorsImageExpanded(true)}
                  />
                </div>

                {/* Fullscreen Colors Image Modal */}
                {isColorsImageExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                    onClick={() => setIsColorsImageExpanded(false)}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsColorsImageExpanded(false)}
                      className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Expanded Image - Shows the full color palette */}
                    <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                      <img 
                        src={colorsExpandedImage} 
                        alt="Complete Maia color palette showing primary, secondary, neutral, background, overlay, brand, white label, and gradient colors with all variations and hex values"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Typography Subsection */}
              <div className="mt-16 space-y-6">
                {/* Subtitle */}
                <h3 
                  className="text-2xl text-white"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Typography
                </h3>

                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  We refined our typography system to create a more balanced and readable conversational interface. Our type families and their three weights demonstrate a clear hierarchical relationship across headings, body text, and system messages—ensuring accessibility, consistency, and ease of reading within our AI-driven interface. We carefully balanced the hierarchical readability between these three weights to emphasize key components and sections of the interface, guiding users' attention naturally without visual fatigue.
                </p>

                {/* Typography Image Widget with Expand */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group">
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsTypographyImageExpanded(!isTypographyImageExpanded)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                    aria-label="Expand image"
                  >
                    <ChevronDown className="w-5 h-5 text-white/80" />
                  </button>

                  <img 
                    src={typographyPreviewImage} 
                    alt="Maia Design System Typography widget showing Roboto font family with Display text styles (Display 10, 9, 8) and their corresponding sizes, line heights, and weights"
                    className="w-full h-auto cursor-pointer rounded-lg"
                    loading="lazy"
                    onClick={() => setIsTypographyImageExpanded(true)}
                  />
                </div>

                {/* Fullscreen Typography Image Modal */}
                {isTypographyImageExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                    onClick={() => setIsTypographyImageExpanded(false)}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsTypographyImageExpanded(false)}
                      className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Expanded Image - Shows the full typography system */}
                    <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                      <img 
                        src={typographyExpandedImage} 
                        alt="Complete Maia typography system showing Roboto and Roboto Condensed type families with all Display and Paragraph text styles, sizes, line heights, and three weights (Regular, Medium, Semibold)"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Icons Subsection */}
              <div className="mt-16 space-y-6">
                {/* Subtitle */}
                <h3 
                  className="text-2xl text-white"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Icons
                </h3>

                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  We added numerous icons and redesigned them with a 2px stroke, ensuring visual harmony with the lighter Medium weight typography and creating a more cohesive, balanced interface.
                </p>

                {/* Icons Image */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
                  <img 
                    src={iconsImage} 
                    alt="Maia Design System Icons outlined showing general icon set including activity, download, edit, share, and other interface icons with 2px stroke weight"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Spacing Subsection */}
              <div className="mt-16 space-y-6">
                {/* Subtitle */}
                <h3 
                  className="text-2xl text-white"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Spacing
                </h3>

                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  We defined semantic spacing tokens for every type of spacing, achieving a solid and consistent rhythm across all areas of the design interface from foundational components to application UI components.
                </p>

                {/* Spacing Image Widget with Expand */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group">
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsSpacingImageExpanded(!isSpacingImageExpanded)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                    aria-label="Expand image"
                  >
                    <ChevronDown className="w-5 h-5 text-white/80" />
                  </button>

                  <img 
                    src={spacingImage} 
                    alt="Maia Design System Spacing tokens showing semantic spacing values for consistent rhythm across foundational and application UI components"
                    className="w-full h-auto cursor-pointer rounded-lg"
                    loading="lazy"
                    onClick={() => setIsSpacingImageExpanded(true)}
                  />
                </div>

                {/* Fullscreen Spacing Image Modal */}
                {isSpacingImageExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                    onClick={() => setIsSpacingImageExpanded(false)}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsSpacingImageExpanded(false)}
                      className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Expanded Image - Shows the full spacing system */}
                    <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                      <img 
                        src={spacingImage} 
                        alt="Complete Maia spacing system showing all semantic spacing tokens with values for maintaining consistent rhythm throughout the interface"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Booleans and Variants Subsection */}
              <div className="mt-16 space-y-6">
                {/* Subtitle */}
                <h3 
                  className="text-2xl text-white"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Booleans and Variants
                </h3>

                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Using booleans is crucial for optimizing the number of variants within our components, improving usability while simplifying maintenance and scalability. While variants form the foundation of component flexibility, analyzing their characteristics helps determine which features can coexist—clarifying when to use a variant and when to implement a boolean for a more efficient and adaptable design system.
                </p>

                {/* Booleans/Variants Video-like Widget with Auto-cycling Images */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group">
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsBooleansVariantsExpanded(!isBooleansVariantsExpanded)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                    aria-label="Expand image"
                  >
                    <ChevronDown className="w-5 h-5 text-white/80" />
                  </button>

                  {/* Auto-cycling Images */}
                  <div className="relative w-full cursor-pointer rounded-lg overflow-hidden" style={{ height: '600px' }} onClick={() => setIsBooleansVariantsExpanded(true)}>
                    {booleansVariantsImages.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`Maia Design System component showing booleans and variants configuration - state ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentBooleansVariantsImageIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: index === 0 ? 'relative' : 'absolute',
                          top: index === 0 ? 'auto' : 0,
                          left: index === 0 ? 'auto' : 0,
                        }}
                      />
                    ))}
                  </div>

                  {/* Playback indicator dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {booleansVariantsImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentBooleansVariantsImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentBooleansVariantsImageIndex === index 
                            ? 'bg-white w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Fullscreen Booleans/Variants Modal with Auto-cycling */}
                {isBooleansVariantsExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                    onClick={() => setIsBooleansVariantsExpanded(false)}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsBooleansVariantsExpanded(false)}
                      className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Expanded Auto-cycling Images */}
                    <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                      <div className="relative w-full">
                        {booleansVariantsImages.map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`Complete view of Maia booleans and variants system demonstrating component configuration flexibility - state ${index + 1}`}
                            className="w-full h-auto rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentBooleansVariantsImageIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              position: index === 0 ? 'relative' : 'absolute',
                              top: index === 0 ? 'auto' : 0,
                              left: index === 0 ? 'auto' : 0,
                            }}
                          />
                        ))}
                      </div>

                      {/* Playback indicator dots - expanded view */}
                      <div className="flex justify-center gap-2 mt-6">
                        {booleansVariantsImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentBooleansVariantsImageIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentBooleansVariantsImageIndex === index 
                                ? 'bg-white w-8' 
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Atomic Design Content - Outside of Widget */}
              <div className="mt-8 space-y-6">
                {/* Atomic Design Introduction */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  Atomic Design ensures a scalable, modular structure by breaking components into smaller parts, promoting consistency, reusability, and faster design and development.
                </p>

                {/* Atomic Design Diagram */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <img 
                    src={atomicDesignDiagram} 
                    alt="Atomic Design methodology diagram showing progression from atoms to molecules to organisms to templates to pages"
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>

                {/* Talent Card Example Text */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  The Talent Card component includes an atom called <span className="text-[#E89B3C]" style={{ fontFamily: 'monospace' }}>_link</span>, responsible for directing recruiters to the candidate or job seeker's assessment for review. Well, in reality, this atomic component is much more complex — this example is purely illustrative.
                </p>
              </div>
            </div>

            {/* Component Library Section */}
            <div id="components-library" className="scroll-mt-24 mb-16 mt-24">
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '48px',
                  fontWeight: '500'
                }}
              >
                Component Library<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <div className="space-y-6">
                {/* Content */}
                <p className="text-white/60 text-lg" style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  To eliminate drift between design and implementation, we merged all approved Figma components directly into Storybook, establishing a single source of truth for the design system. Using Figma MCP connected to Cursor (our chosen IDE), finalized Figma variants were translated into typed React components and corresponding Storybook stories, ensuring variant properties such as variant, size, isDisabled, and isLoading mapped one-to-one with component props in code. Storybook became the primary environment for browsing, testing, and validating components in isolation, without spinning up the full product, allowing teams to interact with live components, toggle props in real time via the Controls panel, and review every variant, size, and state instantly. Auto-generated documentation pulled directly from TypeScript types and JSDoc comments kept docs continuously up to date, while focused stories (individual variants, size comparisons, edge cases, and an All Variants grid) enabled fast visual QA and consistency checks. Designers were also able to contribute directly to Storybook via scoped repository access, opening and merging PRs for stories and documentation, which kept design intent aligned with implementation in the same sprint. This workflow significantly reduced handoff friction, accelerated development, and ensured React components, documentation, and design decisions stayed tightly synchronized, resulting in faster delivery and higher confidence across design and engineering.
                </p>

                {/* Component Library Image Widget with Expand */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6 relative group">
                  {/* Expand Button */}
                  <button
                    onClick={() => setIsComponentLibraryImageExpanded(!isComponentLibraryImageExpanded)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all duration-200 z-10"
                    aria-label="Expand image"
                  >
                    <ChevronDown className="w-5 h-5 text-white/80" />
                  </button>

                  {/* Auto-cycling Images */}
                  <div className="relative w-full cursor-pointer rounded-lg overflow-hidden" style={{ height: '600px' }} onClick={() => setIsComponentLibraryImageExpanded(true)}>
                    {componentLibraryImages.map((image, index) => (
                      <motion.img
                        key={index}
                        src={image}
                        alt={`Maia Component Library - view ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentComponentLibraryImageIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: index === 0 ? 'relative' : 'absolute',
                          top: index === 0 ? 'auto' : 0,
                          left: index === 0 ? 'auto' : 0,
                        }}
                      />
                    ))}
                  </div>

                  {/* Playback indicator dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {componentLibraryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentComponentLibraryImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentComponentLibraryImageIndex === index 
                            ? 'bg-white w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Fullscreen Component Library Image Modal */}
                {isComponentLibraryImageExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
                    onClick={() => setIsComponentLibraryImageExpanded(false)}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsComponentLibraryImageExpanded(false)}
                      className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition-all duration-200"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Expanded Image - Shows the full component library */}
                    <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
                      <div className="relative w-full">
                        {componentLibraryImages.map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`Complete Maia Component Library - view ${index + 1}`}
                            className="w-full h-auto rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentComponentLibraryImageIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              position: index === 0 ? 'relative' : 'absolute',
                              top: index === 0 ? 'auto' : 0,
                              left: index === 0 ? 'auto' : 0,
                            }}
                          />
                        ))}
                      </div>

                      {/* Playback indicator dots - expanded view */}
                      <div className="flex justify-center gap-2 mt-6">
                        {componentLibraryImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentComponentLibraryImageIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentComponentLibraryImageIndex === index 
                                ? 'bg-white w-8' 
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Team Section */}
            <div id="team" className="scroll-mt-24 mb-16 mt-24">
              <h2 
                className="text-white mb-12"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '48px',
                  fontWeight: '500'
                }}
              >
                Team<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Daniel Fornica - with real photo */}
                <div className="flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={danielPhoto}
                      alt="Daniel Fornica"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 
                    className="text-white mb-1"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Daniel Fornica
                  </h3>
                  <p 
                    className="text-white/60"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    UX Design Specialist
                  </p>
                </div>

                {/* Melissa Ganzfried */}
                <div className="flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={melissaPhoto}
                      alt="Melissa Ganzfried"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 
                    className="text-white mb-1"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Melissa Ganzfried
                  </h3>
                  <p 
                    className="text-white/60"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Software Developer
                  </p>
                </div>

                {/* Monty Cook - CENTER POSITION */}
                <div className="flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={montyPhoto}
                      alt="Monty Cook"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{
                        objectPosition: 'center center',
                        transform: 'scale(1.15)',
                      }}
                    />
                  </div>
                  <h3 
                    className="text-white mb-1"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Monty Cook
                  </h3>
                  <p 
                    className="text-white/60"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Chief Design Officer
                  </p>
                </div>

                {/* Joshua Richardson */}
                <div className="flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={joshuaPhoto}
                      alt="Joshua Richardson"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      style={{
                        objectPosition: 'center center',
                        transform: 'scale(1.1)',
                      }}
                    />
                  </div>
                  <h3 
                    className="text-white mb-1"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Joshua Richardson
                  </h3>
                  <p 
                    className="text-white/60"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    QA
                  </p>
                </div>

                {/* Karl Zajac */}
                <div className="flex flex-col">
                  <div className="aspect-square bg-white/5 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={karlPhoto}
                      alt="Karl Zajac"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 
                    className="text-white mb-1"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Karl Zajac
                  </h3>
                  <p 
                    className="text-white/60"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Principal Engineer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
        
        {/* Project Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <PreviousProject 
            projectName="Maia - AI native GovTech HRIT Solution"
            onNavigate={() => onNavigateToProject?.('rappi-mix')}
          />
          <NextProject 
            projectName="Allied Credit Union"
            onNavigate={() => onNavigateToProject?.('project-3')}
          />
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}