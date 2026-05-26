import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import maiaImage from "figma:asset/3190ee252e430ddc0a37cd5af483a733ab0fed76.png";
import hritImage from "figma:asset/fd4ed4ac951d5261c50bc5fcc23d06cca40ca2c0.png";
import alliedCreditImage from "figma:asset/9daa1e8dfdbd5558b29cc13a81b8a7712ffc0276.png";
import galaxyExplorerImage from "figma:asset/c2e91c09f637cdf53613cf99ef37464d1ba34a97.png";
import innovaImage from "figma:asset/16080b81b729b442705c0b67d2debc0d28a47f3f.png";
import plantAppImage from "figma:asset/c4ddb26665e31ada9c167dceb2f8a0b59bfb2fa3.png";
import freshBarImage from "figma:asset/a510424c2b5d16a68616af145cba0e22c4ae1086.png";
import appleSpatialImage from "figma:asset/2d4b851546795fc694b24751036686ba1e3e2676.png";
import juiceUpImage from "figma:asset/ec5c9f654ffd53a331f6467ea48686a76c3c640d.png";
import urcRecordsImage from "figma:asset/79d52d96b4f36b2e183f9c070df95eb2a06167d9.png";

interface ProjectsProps {
  onNavigateToProject?: (projectId: string) => void;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  company?: string;
  readingTime?: string;
  inConstruction?: boolean;
  imageClassName?: string;
}

export function Projects({ onNavigateToProject }: ProjectsProps) {
  const [isMoreProjectsExpanded, setIsMoreProjectsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects: ProjectData[] = [
    {
      id: "rappi-mix",
      title: "Maia - AI native GovTech HRIT Solution",
      description: "Empowering recruiters and jobseekers through accessible, AI-powered HR experiences within secure federal systems.",
      company: "| Avue Technologies |",
      readingTime: "10 min",
      image: hritImage,
      link: "#"
    },
    {
      id: "maia",
      title: "Building a Conversational AI Design System for GovTech HRIT",
      description: "Governance, Scalability, and Multitenant Design Workflows",
      company: "| Avue Technologies |",
      readingTime: "10 min",
      image: maiaImage,
      link: "#"
    },
    {
      id: "project-3",
      title: "Allied Credit Union — Redefining the Mobile Banking Experience",
      description: "Mahalo Banking | FinTech | Mobile App Design System | iOS & Android",
      readingTime: "10 min",
      image: alliedCreditImage,
      link: "#"
    }
  ];

  const zeroToOneProjects: ProjectData[] = [
    {
      id: "juice-up",
      title: "Juice Up — Sip, Energize and Repeat",
      description: "Rebranded ecommerce web experience",
      readingTime: "10 min",
      image: juiceUpImage,
      link: "#"
    },
    {
      id: "urc-records",
      title: "URC Records — Underrated Art Creations",
      description: "0→1 e-commerce platform for an underground dance music vinyl label",
      readingTime: "10 min",
      image: urcRecordsImage,
      link: "#"
    }
  ];

  const moreProjectsImages = [
    { 
      src: innovaImage, 
      alt: "Innova", 
      title: "Innova Recording", 
      subtitle: "Music Productions & Mastering Services",
      description: "High-fidelity audio design and mastering for digital and vinyl releases — blending creative direction with technical precision." 
    },
    { 
      src: plantAppImage, 
      alt: "Plant App", 
      title: "Plant App", 
      subtitle: "Botanical Trading Network",
      description: "Curious Crane Botanicals - Discover, trade and share plants among your network with detailed care information." 
    },
    { 
      src: freshBarImage, 
      alt: "Fresh Bar", 
      title: "Freshbar Juice Bar", 
      subtitle: "E-Commerce Platform",
      description: "Custom online ordering experience for a local juice bar, featuring real-time menu updates, loyalty integrations, and a clean mobile-first UI" 
    },
    { 
      src: appleSpatialImage, 
      alt: "Apple Spatial Design", 
      title: "Apple Spatial Design", 
      subtitle: "VisionOS Interface Concept",
      description: "Discogs integration for spatial computing - Exploring music discovery in immersive 3D environments" 
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isMoreProjectsExpanded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % moreProjectsImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isMoreProjectsExpanded, moreProjectsImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + moreProjectsImages.length) % moreProjectsImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % moreProjectsImages.length);
  };

  return (
    <section className="pt-10 px-6 md:px-12" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2
            className="text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'white'
            }}
          >
            Enterprise work<span style={{ color: '#EB5097' }}>.</span>
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            Product design within cross-functional teams at scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => !project.inConstruction && onNavigateToProject?.(project.id)}
              className={`group relative bg-black border border-white/10 rounded-2xl p-8 transition-all duration-300 ${project.inConstruction ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              style={{
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!project.inConstruction) {
                  e.currentTarget.style.borderColor = '#EB5097';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(235, 80, 151, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!project.inConstruction) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Phone Mockup */}
              <div className="mb-6 flex justify-start group/image">
                <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-white shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project.imageClassName || 'object-cover'}`}
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 
                  className="text-2xl mb-3 flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'white'
                  }}
                >
                  {project.title}
                  <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                {('inConstruction' in project && project.inConstruction) && (
                  <p 
                    className="text-sm mb-2"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      color: '#EB5097'
                    }}
                  >
                    In construction..
                  </p>
                )}
                <p
                  className="text-base"
                  style={{
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {project.description}
                </p>
                {project.company && (
                  <p
                    className="text-sm mt-2"
                    style={{
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    {project.company}
                  </p>
                )}
                {project.readingTime && (
                  <p
                    className="text-sm mt-3"
                    style={{
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    Estimated reading time: {project.readingTime}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Solo builds Divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 mb-12"
        >
          <h2
            className="text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'white'
            }}
          >
            Solo builds<span style={{ color: '#EB5097' }}>.</span>
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            Designed, architected, shipped — end to end
          </p>
        </motion.div>

        {/* Solo builds Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {zeroToOneProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => !project.inConstruction && onNavigateToProject?.(project.id)}
              className={`group relative bg-black border border-white/10 rounded-2xl p-8 transition-all duration-300 ${project.inConstruction ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              style={{
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!project.inConstruction) {
                  e.currentTarget.style.borderColor = '#EB5097';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(235, 80, 151, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!project.inConstruction) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Phone Mockup */}
              <div className="mb-6 flex justify-start group/image">
                <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-white shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${project.imageClassName || 'object-cover'}`}
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 
                  className="text-2xl mb-3 flex items-center gap-2"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'white'
                  }}
                >
                  {project.title}
                  <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                {('inConstruction' in project && project.inConstruction) && (
                  <p 
                    className="text-sm mb-2"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      color: '#EB5097'
                    }}
                  >
                    In construction..
                  </p>
                )}
                <p 
                  className="text-base"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {project.description}
                </p>
                {project.readingTime && (
                  <p 
                    className="text-sm mt-3"
                    style={{ 
                      fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                      color: 'rgba(255, 255, 255, 0.4)'
                    }}
                  >
                    Estimated reading time: {project.readingTime}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable More Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div 
            className="relative bg-black border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              padding: '24px',
              borderRadius: '16px',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#EB5097';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(235, 80, 151, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Title Row */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMoreProjectsExpanded(!isMoreProjectsExpanded)}
            >
              <div>
                <h3 
                  className="text-2xl mb-1"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'white'
                  }}
                >
                  More Projects
                </h3>
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'rgba(255, 255, 255, 0.4)'
                  }}
                >
                  {isMoreProjectsExpanded ? 'Click to collapse' : 'Click to view additional work'}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isMoreProjectsExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown 
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                />
              </motion.div>
            </div>

            {/* Expandable Carousel Section */}
            <AnimatePresence>
              {isMoreProjectsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-white/10">
                    {/* Carousel Container */}
                    <div className="relative">
                      {/* Main Carousel */}
                      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: '500px' }}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            <div className="relative w-full h-full bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 flex items-center justify-center">
                              <img
                                src={moreProjectsImages[currentSlide].src}
                                alt={moreProjectsImages[currentSlide].alt}
                                className="w-full h-full object-contain rounded-xl"
                              />
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button
                          onClick={goToPrevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:border-pink-500/50"
                          style={{ zIndex: 10 }}
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                          onClick={goToNextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:border-pink-500/50"
                          style={{ zIndex: 10 }}
                        >
                          <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                      </div>

                      {/* Project Info */}
                      <div className="mt-6 text-center">
                        <h4
                          className="text-xl mb-1"
                          style={{ 
                            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                            color: 'white'
                          }}
                        >
                          {moreProjectsImages[currentSlide].title}
                        </h4>
                        <p
                          className="text-sm mb-2"
                          style={{ 
                            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                            color: '#EB5097'
                          }}
                        >
                          {moreProjectsImages[currentSlide].subtitle}
                        </p>
                        <p
                          className="text-sm"
                          style={{ 
                            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                            color: 'rgba(255, 255, 255, 0.6)'
                          }}
                        >
                          {moreProjectsImages[currentSlide].description}
                        </p>
                      </div>

                      {/* Dots Navigation */}
                      <div className="flex justify-center gap-2 mt-6">
                        {moreProjectsImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: index === currentSlide ? "#EB5097" : "rgba(255, 255, 255, 0.3)",
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}