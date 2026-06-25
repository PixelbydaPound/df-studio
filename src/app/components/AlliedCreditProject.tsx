import { motion } from "motion/react";
import { Expand, X } from "lucide-react";
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
import alliedMemberJourney from "../../assets/Allied_MemberJourney.png";
import alliedCoreFlow from "../../assets/Allied_CoreFlow.png";
import alliedCompetitiveAudit from "../../assets/Allied_CompetitiveAudit.png";

const helvetica = '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif';

type ExpandableArtifactProps = {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  onExpand: () => void;
};

function ExpandableArtifact({ title, subtitle, src, alt, onExpand }: ExpandableArtifactProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 pb-0">
        <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
          {title}
        </h3>
        <p className="text-white/40 text-sm mt-1" style={{ fontFamily: helvetica }}>
          {subtitle}
        </p>
      </div>
      <div className="relative group p-6 pt-4">
        <button
          onClick={onExpand}
          className="absolute top-8 right-8 z-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-2 transition-all duration-200 flex items-center gap-2 group"
          aria-label={`Expand ${title}`}
        >
          <Expand className="w-4 h-4 text-white" />
          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">Expand</span>
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto cursor-pointer rounded-lg"
          loading="lazy"
          onClick={onExpand}
        />
      </div>
    </div>
  );
}

type ArtifactModalProps = {
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  onClose: () => void;
};

function ArtifactModal({ title, subtitle, src, alt, onClose }: ArtifactModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg p-3 transition-all duration-200"
        aria-label="Close expanded view"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="max-w-[95vw] max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 pb-0">
            <h3 className="text-lg text-white" style={{ fontFamily: helvetica }}>
              {title}
            </h3>
            <p className="text-white/40 text-sm mt-1" style={{ fontFamily: helvetica }}>
              {subtitle}
            </p>
          </div>
          <img src={src} alt={alt} className="w-full h-auto" />
        </div>
      </div>
    </motion.div>
  );
}

interface AlliedCreditProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function AlliedCreditProject({ onBack, onNavigateToProject }: AlliedCreditProjectProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMemberJourneyExpanded, setIsMemberJourneyExpanded] = useState(false);
  const [isCoreFlowExpanded, setIsCoreFlowExpanded] = useState(false);
  const [isCompetitiveAuditExpanded, setIsCompetitiveAuditExpanded] = useState(false);

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
                style={{ fontFamily: helvetica, fontWeight: 500 }}
              >
                Overview<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  At Mahalo Technologies, I led the redesign of Allied Credit Union&apos;s iOS and Android mobile banking applications, transforming them into secure, intuitive, and future-ready platforms for a new generation of digital-first users.
                </p>
                <p>
                  This wasn&apos;t just a visual refresh — it was a strategic rebrand and a system redesign aimed at balancing innovation with trust, compliance, and accessibility.
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
                    style={{ fontFamily: helvetica }}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('the-problem')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    The Problem
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('research')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Research
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('ux-approach')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    UX Approach
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('interaction-architecture')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Interaction Architecture
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('key-decisions')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Key Decisions
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('design-system')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Design System
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('business-impact')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Business Impact
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('my-scope')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    My Scope
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('team')}
                    className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                    style={{ fontFamily: helvetica }}
                  >
                    Team
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
            {/* The Problem Section */}
            <section id="the-problem" className="mb-20">
              <h2 className="text-4xl mb-6" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                The Problem<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 mb-8">
                <h3 className="text-white text-xl" style={{ fontWeight: 500, fontFamily: helvetica }}>
                  Legacy mobile banking friction
                </h3>
                <div className="text-white/60 space-y-4">
                  <p>
                    Allied Credit Union&apos;s legacy mobile apps were built for an earlier generation of members — dense navigation, inconsistent account grouping, and accessibility gaps that failed WCAG 2.1 AA. Members expecting Chime- or Revolut-level clarity hit friction at the moments that mattered most: onboarding, transfers, and identity verification.
                  </p>
                  <p>
                    Over a nine-month engagement, Mahalo and Allied needed iOS and Android parity, PCI and KYC compliance, and a white-label foundation other credit union partners could adopt — without sacrificing Allied&apos;s brand trust.
                  </p>
                </div>
              </div>
              <p className="text-white/60 mb-4">Key friction points:</p>
              <div className="space-y-3">
                {[
                  "Too many taps to complete core tasks — transfer, pay, and balance review",
                  "Onboarding and KYC drop-off before members reached primary banking features",
                  "Weak contrast and typography excluding older members",
                  "Inconsistent multi-currency and card management patterns",
                  "Security flows that felt either too heavy or too opaque",
                ].map((point) => (
                  <div key={point} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    <p className="text-white/60 flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Value Proposition Section */}
            <section id="value-proposition" className="mb-20">
              <h2 className="text-4xl mb-8" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Value Proposition<span style={{ color: '#EB5097' }}>.</span>
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

            {/* Research Section */}
            <section id="research" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Research<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 mb-6">Research & Market Analysis</p>
              <div className="text-lg text-white/80 leading-relaxed space-y-4 mb-8">
                <p>
                  We ran competitor benchmarking across consumer FinTech and credit union apps, member interviews, and heuristic audits on the legacy Allied experience. Three patterns drove the redesign: <span className="text-white">navigation fatigue</span>, <span className="text-white">trust through security clarity</span>, and <span className="text-white">accessibility as a product requirement</span> — not a checklist item.
                </p>
              </div>

              <ExpandableArtifact
                title="Competitive Benchmark — Mobile Banking UX"
                subtitle="Navigation, security UX, accessibility, multi-currency, and onboarding speed across leading apps"
                src={alliedCompetitiveAudit}
                alt="Competitive audit matrix comparing Chime, Revolut, legacy credit union app, and Allied target across mobile banking UX criteria"
                onExpand={() => setIsCompetitiveAuditExpanded(true)}
              />

              <div className="mt-8 space-y-3">
                {[
                  "Members wanted faster paths to transfer, pay, and balance review — not more menu depth",
                  "Security had to feel visible and reassuring, not hidden behind opaque steps",
                  "White-label partners needed the same system with different brand tokens — patterns had to scale",
                  "Existing color contrast and typography reduced accessibility for older members",
                ].map((point) => (
                  <div key={point} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    <p className="text-white/80 flex-1">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="text-white/60 text-sm uppercase tracking-widest mb-2 text-center">Member Journey Deep Dive</p>
                <ExpandableArtifact
                  title="Allied Credit Union — Member Journey Map"
                  subtitle="Discovery through retention — pain points and opportunities mapped across the member lifecycle"
                  src={alliedMemberJourney}
                  alt="Allied Credit Union member journey map showing five phases from discovery and download through support and retention with pain points and opportunities"
                  onExpand={() => setIsMemberJourneyExpanded(true)}
                />
                <p className="text-white/80 mt-6 italic text-center max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>
                  Identity verification during onboarding became a primary design target — KYC drop-off before members reached transfer and pay flows drove the first sprint priorities.
                </p>
              </div>
            </section>

            {/* UX Approach Section */}
            <section id="ux-approach" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                UX Approach<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 mb-6">Process & Collaboration</p>
              <div className="text-lg text-white/80 leading-relaxed space-y-4">
                <p>
                  We used Lean UX in two-week cycles: hypothesis → prototype → test with members and Allied stakeholders → refine. Workshops aligned Mahalo PM, Allied product, and engineering on MVP scope under the nine-month deadline.
                </p>
                <div className="space-y-3 mt-6">
                  {[
                    "Personas and journey maps translated research into sprint-ready hypotheses",
                    "IA restructure reduced depth-to-task for transfer, pay, and card management",
                    "Figma → Zeplin → React Native handoff with daily design–dev syncs",
                    "Usability validation on onboarding, KYC, and core banking flows before launch",
                  ].map((point) => (
                    <div key={point} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                      <p className="text-white/80 flex-1">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Interaction Architecture Section */}
            <section id="interaction-architecture" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Interaction Architecture<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 mb-6">From insight to system design</p>
              <p className="text-white text-2xl mb-4" style={{ fontFamily: helvetica, fontWeight: 500, lineHeight: '1.4' }}>
                One primary job. Fewer taps. Clear security at every step.
              </p>
              <p className="text-white/80 mb-8 italic" style={{ lineHeight: '1.8' }}>
                Core banking flows were redesigned around a single constraint: a member should complete transfer or pay without hunting through nested menus or losing context mid-task.
              </p>
              <ExpandableArtifact
                title="Allied Credit Union — Core Banking Flow"
                subtitle="Sign in through biometric auth, home dashboard, transfer/pay, review, and confirmation"
                src={alliedCoreFlow}
                alt="Core banking user flow diagram for Allied Credit Union mobile app from sign in through transfer and pay confirmation"
                onExpand={() => setIsCoreFlowExpanded(true)}
              />
            </section>

            {/* Key Decisions Section */}
            <section id="key-decisions" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Key Decisions & Tradeoffs<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/80 mt-4 mb-8 italic" style={{ lineHeight: '1.8' }}>
                Allied required balancing member speed, regulatory compliance, and a white-label platform Mahalo could extend to partner credit unions.
              </p>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    Biometric-first auth with explicit fallbacks
                  </h3>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    Allied members span age and comfort with biometrics. We prioritized Face ID / Touch ID and PIN for speed, but kept passcode and recovery paths for members who could not or would not use biometrics.
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> the fastest possible single-path login
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> tiered auth with clear &quot;Use passcode instead&quot; at every step
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> trust in banking starts at the front door; excluding members erodes adoption faster than an extra tap
                  </p>
                </div>

                <div className="border-t border-white/10" />

                <div className="space-y-4">
                  <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    High-contrast accessibility over brand softness
                  </h3>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    Legacy palettes failed contrast for older members. We rebuilt tokens for WCAG 2.1 AA and dark-mode parity across iOS and Android.
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> softer, more consumer-FinTech visual warmth in the default theme
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> semantic color tokens; partner white-label could adjust within contrast guardrails
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> credit unions serve broad demographics; accessibility was a retention issue, not a compliance checkbox
                  </p>
                </div>

                <div className="border-t border-white/10" />

                <div className="space-y-4">
                  <h3 className="text-xl text-white flex items-center gap-3" style={{ fontWeight: 600 }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    White-label system vs. Allied-only polish
                  </h3>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    Mahalo&apos;s roadmap required reusable components for partner credit unions. Every Allied pattern had to work as a tenant theme — logo, type, color, and spacing tokens with documented partner theming.
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>What we gave up:</span> fully bespoke Allied-only UI experiments
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>How we mitigated it:</span> tokenized design system with tenant theming layer validated on Allied first
                  </p>
                  <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                    <span style={{ fontWeight: 600, borderBottom: '2px solid #EB5097', paddingBottom: '2px' }}>Why it was right:</span> Allied shipped first; the system became the product for Q1–Q2 partner growth
                  </p>
                </div>
              </div>
            </section>

            {/* Design System Carousel */}
            <section id="design-system" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Design System<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 mb-8">Scalable components for Allied and white-label partners</p>
              <AutoCarousel
                images={[
                  { src: logoIconsImage, alt: "Allied Credit Union Logo and Icons" },
                  { src: typographyImage, alt: "Allied Credit Union Typography System" },
                  { src: mobileGridImage, alt: "Allied Credit Union Mobile Grid System" },
                  { src: colorPaletteImage, alt: "Allied Credit Union Color Palette" },
                  { src: organismsImage, alt: "Allied Credit Union Organisms" },
                  { src: atomsImage, alt: "Allied Credit Union Atoms" },
                ]}
                autoplaySpeed={3000}
              />
            </section>

            {/* Business Impact Section */}
            <section id="business-impact" className="mb-20">
              <h2 className="text-4xl mb-8" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Business Impact<span style={{ color: '#EB5097' }}>.</span>
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
                  <div className="text-3xl text-[#EB5097] mb-2">↑ 35%</div>
                  <p className="text-white/80">Partner growth increase (Q1–Q2 2023) through reusable design assets, improved usability, and stronger product-market fit.</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <h3 className="text-xl text-white" style={{ fontWeight: 600 }}>How we measured impact</h3>
                <p className="text-white/80" style={{ lineHeight: '1.8' }}>
                  Task completion and time-on-task came from moderated usability runs on transfer, pay, and onboarding flows — baseline legacy vs. redesigned prototypes. Mobile adoption and support ticket reduction were tracked post-launch with Allied and Mahalo ops. Partner growth reflected new white-label deployments using the Mahalo design system — directional, aligned with the reusable-system bet rather than solely UX-attributed.
                </p>
              </div>
              
              <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl text-white mb-6" style={{ fontWeight: 600 }}>Interface Overview</h3>
                <AutoCarousel
                  images={[
                    { src: bankDepositImage, alt: "Choose the bank to deposit your money from" },
                    { src: usdAccountDetailsImage, alt: "USD Account details showing receiver information and bank details" },
                    { src: usdAccountShareImage, alt: "USD Account share sheet with contacts and sharing options" },
                    { src: phoneVerificationImage, alt: "Phone number verification screen with mobile number input" },
                    { src: cardsScreenImage, alt: "Cards screen displaying Allied Credit Union physical and virtual cards" },
                    { src: inviteFriendsImage, alt: "Invite friends screen with referral incentives" },
                    { src: createPasscodeImage, alt: "Create passcode screen with smart passcode warning" },
                    { src: verifyIdCardImage, alt: "Verify identity - back of driver's license" },
                    { src: verifyIdFaceImage, alt: "Verify identity - face position and capture" },
                  ]}
                  autoplaySpeed={3000}
                />
              </div>
            </section>

            {/* My Scope Section */}
            <section id="my-scope" className="mb-20">
              <h2 className="text-4xl mb-2" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                My Scope & Ownership<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 mb-6">My Role</p>
              <div className="space-y-3">
                {[
                  "Led end-to-end UX/UI for Allied iOS and Android redesign",
                  "Defined Mahalo design system foundations used across partner white-label clients",
                  "Ran research synthesis, workshops, and usability validation with stakeholders",
                  "Partnered with React Native and native iOS–Android engineering on spec and QA",
                  "Drove accessibility and security UX alignment with compliance stakeholders",
                ].map((point) => (
                  <div key={point} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EB5097' }} />
                    <p className="text-white/60 flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Section */}
            <section id="team" className="mb-20">
              <h2 className="text-4xl mb-6" style={{ fontFamily: helvetica, fontWeight: 500 }}>
                Team<span style={{ color: '#EB5097' }}>.</span>
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
                    <strong>Engineering:</strong> React Native (cross-platform core), Swift (iOS native), Kotlin (Android native) — Jacob Harvey & Randy Heaton / Ivan Tellez
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Accessibility Lead:</strong> Compliance Specialist
                  </li>
                  <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-[#EB5097]">
                    <strong>Client Partner:</strong> Allied Credit Union
                  </li>
                </ul>
                <p className="mt-6">
                  We maintained fast iteration loops through Figma libraries, Storybook documentation, and daily design–dev syncs.
                </p>
              </div>
            </section>

            {isMemberJourneyExpanded && (
              <ArtifactModal
                title="Allied Credit Union — Member Journey Map"
                subtitle="Discovery through retention — pain points and opportunities mapped across the member lifecycle"
                src={alliedMemberJourney}
                alt="Allied Credit Union member journey map"
                onClose={() => setIsMemberJourneyExpanded(false)}
              />
            )}
            {isCoreFlowExpanded && (
              <ArtifactModal
                title="Allied Credit Union — Core Banking Flow"
                subtitle="Sign in through biometric auth, home dashboard, transfer/pay, review, and confirmation"
                src={alliedCoreFlow}
                alt="Allied Credit Union core banking user flow"
                onClose={() => setIsCoreFlowExpanded(false)}
              />
            )}
            {isCompetitiveAuditExpanded && (
              <ArtifactModal
                title="Competitive Benchmark — Mobile Banking UX"
                subtitle="Navigation, security UX, accessibility, multi-currency, and onboarding speed across leading apps"
                src={alliedCompetitiveAudit}
                alt="Allied Credit Union competitive audit matrix"
                onClose={() => setIsCompetitiveAuditExpanded(false)}
              />
            )}
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