import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import juiceUpImage from "figma:asset/ec5c9f654ffd53a331f6467ea48686a76c3c640d.png";
import logoOriginal from "figma:asset/fd9ce0ee04def711ade70fb60e7c393846163c0c.png";
import logoRedraw from "figma:asset/06b7fa177a53390714a3afd1b22cfaed3063cecc.png";
import styleGuideImage from "figma:asset/38deaa0fa523985ca1ba4b32b7337c9a22bb0ac0.png";
import laptopMockup from "figma:asset/b5d8fe6621d7a39fe2fa1680e38afeb49b9dbd07.png";
import mobileMockup from "figma:asset/87cb8c7e42137f23c64b08aeba765a8ab2ebcea1.png";
import guestCheckoutImage from "figma:asset/05a3b589358a3d3d57dc124947d4251fb6b4a7ea.png";
import juiceUpWebMockup from "figma:asset/dffefc757c123dcca5b589abc571d5dc9efeebf1.png";
import cateringMockup from "figma:asset/1853c47cbb1a6a42ec21e7c166c7cd5644b70245.png";
import chalkboardMenu from "figma:asset/4538f9e0fc0d2179c0bf849a56c46ee2238e6ba5.png";
import digitalMenuCloseup from "figma:asset/f1afbd8a9ace1049ef49ed6a97f7f231f3320ea7.png";
import digitalMenuWide from "figma:asset/4d8a67311bb1cbd96c49f3526d642f4c71e6bbf5.png";
import productCardImage from "figma:asset/3be49cdda283745c14564f0f28ae82ff222488b2.png";
import mobileCardImage from "figma:asset/72ae596ccdf701667bc43ec1895678f26ab698b9.png";
import Slider from "react-slick";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";

interface JuiceUpProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function JuiceUpProject({ onBack, onNavigateToProject }: JuiceUpProjectProps) {
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
          E-Commerce Experience Redesign
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-6xl md:text-7xl lg:text-8xl mb-16"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          Juice Up<span style={{ color: '#EB5097' }}>.</span>
        </motion.h1>

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
              <h3 className="text-white mb-2">Client</h3>
              <p className="text-white/60">Juice Up Eats LLC</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Role</h3>
              <p className="text-white/60">Lead Product Designer & Design Engineer</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Date</h3>
              <p className="text-white/60">October 2025</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Responsibilities</h3>
              <div className="text-white/60 space-y-1">
                <p>Brand Strategy</p>
                <p>UI/UX Design</p>
                <p>3D Art Direction</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Stack</h3>
              <div className="text-white/60 space-y-2">
                <p><span className="text-white">Front-end:</span> React 18, TypeScript, Vite, Tailwind CSS, Motion, EmailJS</p>
                <p><span className="text-white">Back-end:</span> Firebase Functions, Firestore, Nodemailer</p>
                <p><span className="text-white">UI:</span> Radix UI, shadcn/ui</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">7 days</p>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-9"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {/* Hero Image */}
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={juiceUpImage}
                alt="Juice Up 3D Brand Visualization"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Overview */}
            <div className="mb-16" id="overview">
              <h2 className="text-2xl mb-6">Overview</h2>
              <div className="text-white/60 space-y-4 text-lg">
                <p>
                  <span className="text-white">Juice Up</span> is a family-owned, direct-to-consumer wellness brand based in Coral Springs, Florida, specializing in cold-pressed organic juices, smoothies, and functional wellness products. The project involved a complete digital rebrand and e-commerce redesign to attract a younger, design-conscious demographic while supporting high-frequency, conversion-driven purchasing behavior.
                </p>
                <p>
                  The goal was to move away from the traditional "rustic farm" aesthetic common in the industry and embrace a <span className="text-white">bold, energetic, and modern visual language</span>.
                </p>
                <a href="https://www.juiceupeats.com" target="_blank" rel="noopener noreferrer" className="block text-[#EB5097] hover:text-white transition-colors">
                  www.juiceupeats.com
                </a>
              </div>
            </div>

            {/* Outcome */}
            <div className="mb-16" id="outcome">
              <h2 className="text-2xl mb-6">Outcome</h2>
              <p className="text-white/60 text-lg">
                Designing an E-commerce Funnel for a High-Frequency Consumer Product.
              </p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-12 mb-16" id="challenge-solution">
              <div>
                <h3 className="text-xl text-white mb-4">The Challenge</h3>
                <p className="text-white/60">
                  The previous website suffered from low engagement and a generic visual identity that failed to stand out in a saturated market. Users perceived the brand as outdated, and the mobile shopping experience was cumbersome.
                </p>
              </div>
              <div>
                <h3 className="text-xl text-white mb-4">The Solution</h3>
                <p className="text-white/60">
                  We rebuilt the web experience from the ground up, prioritizing mobile-first interactions and high-fidelity visuals. The new design system uses motion and 3D elements to create a sense of freshness and modernity, resulting in a 40% increase in session duration.
                </p>
              </div>
            </div>

            {/* Logo Remake Section */}
            <div className="mb-16" id="logo-remake">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Logo Remake<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                This project focused on accurately reconstructing an existing logo in Adobe Illustrator using a grid-based system. The original mark was redrawn with clean vector paths to improve consistency, scalability, and alignment across digital and print applications. The remake preserves the brand’s original visual identity while refining proportions, spacing, and legibility for modern use.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
                  <span className="text-white/40 mb-4 text-sm uppercase tracking-wider">Original</span>
                  <img 
                      src={logoOriginal}
                      alt="Original Juice Up Logo"
                      className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
                  <span className="text-white/40 mb-4 text-sm uppercase tracking-wider">Redraw with Grid</span>
                  <img 
                      src={logoRedraw}
                      alt="Juice Up Logo Redraw"
                      className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Style Guide Section */}
            <div className="mb-16" id="style-guide">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Style Guide<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <div className="space-y-8 text-white/60 text-lg">
                <div>
                  <h3 className="text-white text-xl mb-3">Overview</h3>
                  <p>
                    This style guide defines a scalable visual system designed to support high-traffic, conversion-driven digital experiences. The system prioritizes clarity, accessibility, and consistency across customer touchpoints, enabling rapid iteration while maintaining brand integrity. All design decisions are documented to support cross-functional collaboration between design, engineering, and product teams.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white text-xl mb-3">Core System Principles</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white text-lg font-medium mb-2">1. Brand & Logo Governance</h4>
                      <p>
                        The logo system establishes clear rules for placement, spacing, and hierarchy to ensure consistent brand representation across digital surfaces. Usage guidelines are designed to support responsive layouts, campaign variations, and scalable production workflows.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Style Guide Visual */}
                <div className="mt-12">
                  <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-8">
                    <img 
                      src={styleGuideImage} 
                      alt="Juice Up Enterprise Style Guide" 
                      className="w-full h-auto"
                    />
                  </div>
                  <h3 className="text-white text-2xl text-center font-medium">Web and Mobile Ready</h3>
                  <div className="mt-8 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={juiceUpWebMockup}
                      alt="Juice Up Web and Mobile Mockup"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Principles */}
            <div className="mb-16" id="design-principles">
              <h2 
                className="text-4xl mb-12"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Key Design Principles Applied<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <div className="space-y-24">
                {/* Principle 1 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl text-white mb-4">1. Speed to Checkout</h3>
                    <div className="text-white/60 space-y-4">
                      <p>
                        The experience minimizes steps between product discovery and purchase. Key actions are surfaced immediately, allowing users to move from menu browsing to checkout with minimal friction.
                      </p>
                      <div>
                        <strong className="text-white block mb-1">Applied in:</strong>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Prominent “Order Now” CTA in the header</li>
                          <li>Shallow navigation depth from category → product → checkout</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">Why it matters:</strong>
                        <p>Prepaid customers are highly conversion-sensitive and abandon quickly when flows feel slow or complex.</p>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 bg-white/5 rounded-2xl p-6 border border-white/10">
                    <img 
                      src={laptopMockup} 
                      alt="Speed to Checkout Interface" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>

                {/* Principle 2 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="order-1">
                    <Slider
                      dots={true}
                      infinite={true}
                      speed={500}
                      slidesToShow={1}
                      slidesToScroll={1}
                      autoplay={true}
                      autoplaySpeed={4000}
                      arrows={false}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <div className="outline-none">
                        <img 
                          src={mobileCardImage} 
                          alt="Mobile Interface Hierarchy" 
                          className="w-full h-auto rounded-2xl"
                        />
                      </div>
                      <div className="outline-none">
                        <img 
                          src={productCardImage} 
                          alt="Product Card Detail" 
                          className="w-full h-auto rounded-2xl"
                        />
                      </div>
                    </Slider>
                  </div>
                  <div className="order-2">
                    <h3 className="text-2xl text-white mb-4">2. Reducing Cognitive Load</h3>
                    <div className="text-white/60 space-y-4">
                      <p>
                        Content hierarchy, spacing, and labeling were intentionally simplified to reduce decision fatigue. Products are grouped clearly by category, with essential information prioritized over secondary details.
                      </p>
                      <div>
                        <strong className="text-white block mb-1">Applied in:</strong>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Clear category filters (e.g., Vegan, Popular, Size)</li>
                          <li>Consistent card layouts and predictable scanning patterns</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-white block mb-1">Why it matters:</strong>
                        <p>This mirrors prepaid plan selection, where clarity and comparison speed directly impact conversion.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principle 3 */}
                <div>
                  <h3 className="text-2xl text-white mb-4">3. Guest Checkout Logic</h3>
                  <div className="text-white/60 space-y-6 max-w-4xl mb-12">
                    <p>
                      The flow is designed to support quick, commitment-light purchases without forcing account creation upfront.
                    </p>
                    <div>
                      <strong className="text-white block mb-2">Applied in:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Checkout flow optimized for first-time and prepaid users</li>
                        <li>No mandatory sign-up barrier before purchase</li>
                        <li>Clear handoff into third-party ordering platforms already familiar to users</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white block mb-2">Platform & Channel Reality:</strong>
                      <p className="mb-4">
                        The client operates on Toast as their primary POS, with active ordering channels through DoorDash and Uber Eats. These platforms fully own cart, payment, and account logic.
                      </p>
                      <p className="mb-4">
                        Given this ecosystem—and the client’s budget constraints—the solution intentionally avoided modifying or extending the existing checkout infrastructure or introducing new internal integrations.
                      </p>
                      <p className="mb-2">Instead, the work focused on strengthening the pre-checkout layer:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Item clarity and individualized menu views</li>
                        <li>Intent-driven CTAs (Order via Toast, DoorDash, or Uber Eats)</li>
                        <li>Reduced decision friction before users enter platform-controlled checkout flows</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <img
                      src={guestCheckoutImage}
                      alt="Guest Checkout Flow"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Catering Expansion & Order Management Microservice */}
            <div className="mb-16" id="catering">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Catering Expansion & Order Management Microservice<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <div className="space-y-12 text-white/60 text-lg">
                <p>
                  As Juice Up expanded beyond individual consumer orders, the business identified a growing demand for corporate catering and high-volume group orders. Existing e-commerce flows were optimized for single purchases but lacked the flexibility and operational clarity required to support larger, customized orders at scale.
                </p>
                <p>
                  To address this need, I designed and implemented a dedicated catering ordering microservice, purpose-built to handle bulk orders, customization, and regional availability without impacting the core consumer checkout experience.
                </p>

                {/* Catering Mockup Image */}
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={cateringMockup}
                    alt="Juice Up Catering Interface"
                    className="w-full h-auto"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-white text-2xl mb-6">Business Need</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Support corporate clients and event-based orders</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Handle larger order volumes and custom menus</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Prevent friction in the primary consumer checkout flow</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-white text-2xl mb-6">Solution</h3>
                    <p className="mb-6">
                      A standalone catering flow was introduced as a modular extension of the e-commerce system. This approach allows the business to scale catering independently while maintaining a fast, low-friction experience for everyday customers.
                    </p>
                    <strong className="text-white block mb-4">Key capabilities include:</strong>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Location-based ordering for Parkland, Coconut Creek, Coral Springs, and Tamarac</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Event-specific order configuration and quantity selection</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Clear lead-time and availability logic</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Dedicated inquiry and quote request workflow for large orders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Store to Digital Menu System Alignment */}
            <div className="mb-16" id="menu-alignment">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                In-Store to Digital Menu System Alignment<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <div className="text-white/60 text-lg space-y-8">
                <p>
                  Juice Up’s original menu existed primarily as a handwritten, in-store chalkboard, which made pricing updates, consistency, and cross-channel alignment difficult as the brand expanded its digital presence.
                </p>
                <p>
                  As part of the rebrand, the menu needed to function not only as a visual asset, but as a shared system across physical and digital environments.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="flex flex-col gap-4">
                    <span className="text-white/40 text-sm uppercase tracking-wider">Original Chalkboard</span>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex-grow">
                      <div className="rounded-lg overflow-hidden h-full">
                        <img 
                          src={chalkboardMenu} 
                          alt="Original Chalkboard Menu" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <span className="text-white/40 text-sm uppercase tracking-wider">Unified Digital System</span>
                    <div className="flex flex-col gap-8">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={digitalMenuWide} 
                            alt="Digital Menu Boards Wide" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={digitalMenuCloseup} 
                            alt="Digital Menu Detail" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Notes */}
            <div className="mb-16" id="technical">
              <h2 
                className="text-4xl mb-8"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500
                }}
              >
                Technical Implementation<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-xl text-white mb-6">Key Features</h3>
                   <ul className="space-y-3 text-white/60">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Product catalog — 71+ products across 10 categories</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Catering form — Integrated with Firestore and EmailJS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Product detail pages with navigation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Responsive design — Mobile, tablet, desktop breakpoints</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Animations — Motion/react animations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Firebase integration — Firestore for data storage</span>
                      </li>
                   </ul>
                </div>

                <div>
                   <h3 className="text-xl text-white mb-6">Stack</h3>
                   <div className="space-y-4 text-white/60">
                      <div>
                        <span className="text-white block mb-1">Front-end:</span>
                        React 18, TypeScript, Vite, Tailwind CSS, Motion, EmailJS
                      </div>
                      <div>
                        <span className="text-white block mb-1">Back-end:</span>
                         Firebase Functions, Firestore, Nodemailer
                      </div>
                      <div>
                        <span className="text-white block mb-1">UI:</span>
                        Radix UI, shadcn/ui
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                 <p className="text-white/60">
                    <strong className="text-white">System Architecture:</strong> All code is in place. The front-end runs via Vite, and the back-end is deployed as Firebase Cloud Functions. The catering form saves to Firestore and sends emails via both EmailJS (client-side) and Firebase Functions (server-side).
                 </p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-32 border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PreviousProject 
              projectName="Allied Credit Union"
              onNavigate={() => onNavigateToProject?.("project-3")}
            />
            <NextProject 
              projectName="Maia - AI native GovTech HRIT Solution"
              onNavigate={() => onNavigateToProject?.("rappi-mix")}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}