import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ScrollToTop } from "./ScrollToTop";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";
import { Footer } from "./Footer";
import alliedCreditImage from "figma:asset/9daa1e8dfdbd5558b29cc13a81b8a7712ffc0276.png";
import { useState, useEffect } from "react";
import { AutoCarousel } from "./AutoCarousel";
import logoIconsImage from "figma:asset/bf86359c7752165770356e23ef7e8e03fa6b1ec6.png";
import typographyImage from "figma:asset/a8ad8078cd47ad563ecec5e21ed596c3292e70b9.png";
import mobileGridImage from "figma:asset/c2fa1addf93f2a8915e1371258834dcd1b3c1568.png";
import colorPaletteImage from "figma:asset/b91d208a2157d5c3b307239c75d58ebcc7fbe260.png";
import organismsImage from "figma:asset/8e08f52ac248e9e3d899082276d9e4b1609cd390.png";
import atomsImage from "figma:asset/4a4bcd9f14013bceae3bdf52b8a52e59cbe14c09.png";
import bankDepositImage from "figma:asset/5092e327d0144578b653b1a92d7da657031dc1ff.png";
import usdAccountDetailsImage from "figma:asset/1e0578f3bdeab6e0aaa6662243b504086968922b.png";
import usdAccountShareImage from "figma:asset/bf535ca91842eee0f91b17be8fd6f9bebbf672ea.png";
import phoneVerificationImage from "figma:asset/8125b74d6ddc9a050456429024931a186b9c3ce0.png";
import cardsScreenImage from "figma:asset/766dfac716e15b36dad08d77dd7416fdd0f3933d.png";
import inviteFriendsImage from "figma:asset/fd1f793e9333f53255e34ada68181f9d886d39da.png";
import createPasscodeImage from "figma:asset/7e927c5e04716b285270a4d7e1c8777ec71063a2.png";
import verifyIdCardImage from "figma:asset/ff1d2f23c61623537a38fe4a0d604eaabd6827f3.png";
import verifyIdFaceImage from "figma:asset/e0b08ec80e429f6cd0a2f9463f43c8b0b1c8d27d.png";

interface AlliedCreditProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function AlliedCreditProject({ onBack, onNavigateToProject }: AlliedCreditProjectProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const overviewObserver = new IntersectionObserver(
      ([entry]) => {
        // Show navigation when overview comes into view
        if (entry.isIntersecting) {
          setShowNavigation(true);
        } else {
          // Hide navigation if we scroll back up above overview
          const rect = entry.boundingClientRect;
          if (rect.top > 0) {
            setShowNavigation(false);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px 0px 0px"
      }
    );

    const overviewElement = document.getElementById('overview');
    
    if (overviewElement) {
      overviewObserver.observe(overviewElement);
    }

    return () => {
      if (overviewElement) {
        overviewObserver.unobserve(overviewElement);
      }
    };
  }, []);

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
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl mb-6"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Allied Credit Union<span style={{ color: '#EB5097' }}>.</span>
          </h1>
          <p 
            className="text-xl text-white/60 mb-16"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            Mahalo Banking | FinTech | Mobile App Design System | iOS & Android
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8">
            <img
              src={alliedCreditImage}
              alt="Allied Credit Union Mobile App"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Main Grid Layout - Overview Section Only */}
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
              <p className="text-white/60">Lead Product Designer</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Date</h3>
              <p className="text-white/60">2022 - 2023</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Responsibilities</h3>
              <div className="text-white/60 space-y-1">
                <p>UX/UI Design</p>
                <p>Design System</p>
                <p>User Research</p>
                <p>Prototyping</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">9 months</p>
            </div>
          </motion.div>

          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section id="overview" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Overview
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  At Mahalo Technologies, I led the redesign of Allied Credit Union's iOS and Android mobile banking applications, transforming them into secure, intuitive, and future-ready platforms for a new generation of digital-first users.
                </p>
                <p>
                  This wasn't just a visual refresh — it was a strategic rebrand and a system redesign aimed at balancing innovation with trust, compliance, and accessibility.
                </p>
                <p>
                  Our goal was to modernize the experience for younger, tech-savvy members while maintaining the reliability and integrity essential to a financial institution.
                </p>
              </div>
            </section>
          </motion.div>

          {/* Right Sidebar - Content Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showNavigation && isVisible ? 1 : 0, y: showNavigation ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {showNavigation && (
              <div className="lg:fixed lg:top-24 lg:right-12 lg:w-[200px] z-50" style={{ pointerEvents: isVisible ? 'auto' : 'none' }}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 
                  className="text-white mb-3 text-sm"
                  style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                >
                  Content
                </h3>
                <nav className="space-y-2">
                  <button 
                    onClick={() => handleScrollToSection('overview')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('value-proposition')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Value Proposition
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('research')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Research & Market Analysis
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('design-decisions')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Design Decisions
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('business-impact')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Business Impact
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('ux-approach')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    UX Approach & Process
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('conclusion')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Conclusion
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('team')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    Team & Collaboration
                  </button>
                </nav>
              </div>
            </div>
            )}
          </motion.div>
        </div>

        {/* Remaining Sections - Left Aligned with spacing for indexer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content - Full Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-9"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {/* Value Proposition Section */}
            <section id="value-proposition" className="mb-20">
              <h2 
                className="text-4xl mb-8"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Value Proposition
              </h2>
              <div className="space-y-8">
                <div className="border-l-2 border-[#EB5097] pl-6">
                  <h3 className="text-2xl mb-3">01 — Security & Trust</h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Financial systems demand rigor. We implemented two-factor authentication, PIN access, biometric login, and security questions, ensuring frictionless yet compliant protection of sensitive user data.
                  </p>
                </div>
                <div className="border-l-2 border-[#EB5097] pl-6">
                  <h3 className="text-2xl mb-3">02 — Financial Empowerment & Transparency</h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    We introduced tools like a live currency converter, expense tracking, and payment reminders — empowering users to manage money confidently at home or abroad.
                  </p>
                </div>
              </div>
            </section>

            {/* Research & Market Analysis Section */}
            <section id="research" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Research & Market Analysis
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  We conducted competitor benchmarking, user interviews, and feature audits across leading FinTech apps to define key differentiators and usability gaps.
                </p>
                <p className="mt-6 mb-4">Key insights identified:</p>
                <ul className="space-y-3 pl-6">
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Users wanted faster, clearer navigation and multi-currency control.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Existing color contrast and typography reduced accessibility for older members.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Account visibility and balance grouping were inconsistent.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Members valued security first, followed closely by ease of managing daily finances.
                  </li>
                </ul>
                <p className="mt-6">
                  We used Lean UX to iterate quickly — validating assumptions through low- to high-fidelity prototypes and immediate user testing.
                </p>
              </div>
            </section>

            {/* Design Decisions Section */}
            <section id="design-decisions" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Design Decisions
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  We adopted a mobile-first design system approach, ensuring cross-platform parity between iOS and Android while adhering to Apple HIG and Material Design standards.
                </p>
                <p className="mt-6 mb-4">Core design initiatives:</p>
                <ul className="space-y-3 pl-6">
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Developed a scalable UI library for credit union partners, enabling white-label rebranding.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Created a style grid system for consistent spacing, layout, and component scaling.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Introduced dark-mode accessibility and increased contrast for WCAG 2.1 AA compliance.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Designed for multi-currency functionality, card management, and expense insights.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Implemented predictive contextual alerts for savings and spending patterns.
                  </li>
                </ul>
                <p className="mt-6">
                  The Mahalo Design System unified product development, accelerating feature delivery and maintaining brand alignment across multiple clients.
                </p>
              </div>
            </section>

            {/* Design System Carousel */}
            <section className="mb-20">
              <h3 
                className="text-3xl mb-8"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Design System Components
              </h3>
              <AutoCarousel
                images={[
                  {
                    src: logoIconsImage,
                    alt: "Allied Credit Union Logo and Icons"
                  },
                  {
                    src: typographyImage,
                    alt: "Allied Credit Union Typography System"
                  },
                  {
                    src: mobileGridImage,
                    alt: "Allied Credit Union Mobile Grid System"
                  },
                  {
                    src: colorPaletteImage,
                    alt: "Allied Credit Union Color Palette"
                  },
                  {
                    src: organismsImage,
                    alt: "Allied Credit Union Organisms"
                  },
                  {
                    src: atomsImage,
                    alt: "Allied Credit Union Atoms"
                  }
                ]}
                autoplaySpeed={3000}
              />
            </section>

            {/* Business Impact Section */}
            <section id="business-impact" className="mb-20">
              <h2 
                className="text-4xl mb-8"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Business Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl text-[#EB5097] mb-2">↓ 32%</div>
                  <p className="text-white/80">Faster task completion across key mobile flows (transfer, pay, review) due to streamlined navigation and simplified interactions.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl text-[#EB5097] mb-2">↑ 28%</div>
                  <p className="text-white/80">Increase in mobile adoption rate within the first quarter, driven by improved onboarding flow and clearer navigation patterns.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl text-[#EB5097] mb-2">↓ 22%</div>
                  <p className="text-white/80">Reduction in member support inquiries related to navigation, card management, and account access.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl text-[#EB5097] mb-2">35%</div>
                  <p className="text-white/80">Partner growth increase (Q1–Q2 2023) through reusable design assets, improved usability, and stronger product-market fit.</p>
                </div>
              </div>
              
              {/* Business Impact Carousel */}
              <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-8">
                <AutoCarousel
                  images={[
                    {
                      src: bankDepositImage,
                      alt: "Choose the bank to deposit your money from"
                    },
                    {
                      src: usdAccountDetailsImage,
                      alt: "USD Account details showing receiver information and bank details"
                    },
                    {
                      src: usdAccountShareImage,
                      alt: "USD Account share sheet with contacts and sharing options"
                    },
                    {
                      src: phoneVerificationImage,
                      alt: "Phone number verification screen with mobile number input"
                    },
                    {
                      src: cardsScreenImage,
                      alt: "Cards screen displaying Allied Credit Union physical and virtual cards"
                    },
                    {
                      src: inviteFriendsImage,
                      alt: "Invite friends screen with referral incentives"
                    },
                    {
                      src: createPasscodeImage,
                      alt: "Create passcode screen with smart passcode warning"
                    },
                    {
                      src: verifyIdCardImage,
                      alt: "Verify identity - back of driver's license"
                    },
                    {
                      src: verifyIdFaceImage,
                      alt: "Verify identity - face position and capture"
                    }
                  ]}
                  autoplaySpeed={3000}
                />
              </div>
            </section>

            {/* UX Approach & Process Section */}
            <section id="ux-approach" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                UX Approach & Process
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <ul className="space-y-3 pl-6">
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Adopted Lean UX to allow incremental validation and continuous client alignment.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Hosted UX workshops with Mahalo and Allied stakeholders to define hypotheses, test assumptions, and prioritize MVP features.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Used personas, journey mapping, and IA redesigns to support intuitive user paths.
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    Transitioned prototypes to production via Figma → Zeplin → React Native workflows.
                  </li>
                </ul>
              </div>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Conclusion
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  Despite a tight nine-month timeline, we successfully redesigned and deployed Allied Credit Union's iOS and Android mobile applications, delivering a modern, secure, and accessible banking experience that resonated with both members and partner credit unions.
                </p>
                <p>
                  The result established a new benchmark for FinTech UX within the credit-union ecosystem, laying the foundation for a multi-tenant, design-system-driven future at Mahalo Technologies.
                </p>
              </div>
            </section>

            {/* Team & Collaboration Section */}
            <section id="team" className="mb-20">
              <h2 
                className="text-4xl mb-6"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Team & Collaboration
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <ul className="space-y-3 pl-6">
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Lead Product Designer:</strong> Daniel Fornica
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>PM:</strong> Mahalo Product Team
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Engineering:</strong> React Native (cross-platform core), Swift (iOS native), Kotlin (Android native) - Jacob Harvey & Randy Heaton / Ivan Tellez
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Accessibility Lead:</strong> Compliance Specialist
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Client Partner:</strong> Allied Credit Union
                  </li>
                </ul>
                <p className="mt-6">
                  We maintained fast iteration loops through Figma libraries, Storybook documentation, and daily design-dev syncs.
                </p>
              </div>
            </section>
          </motion.div>
        </div>
        
        {/* Project Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <PreviousProject 
            projectName="Building a Conversational AI Design System for GovTech HRIT"
            onNavigate={() => onNavigateToProject?.('maia')}
          />
          <NextProject 
            projectName="Juice Up App"
            onNavigate={() => onNavigateToProject?.('juice-up')}
          />
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}