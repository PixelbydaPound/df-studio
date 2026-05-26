import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import urcRecordsImage from "figma:asset/79d52d96b4f36b2e183f9c070df95eb2a06167d9.png";
import podcastPlayerImage from "figma:asset/acf8263f6fdb24ab82acd7482f99b0046a87dde3.png";
import urcLogoImage from "figma:asset/847960ff71513ca86445dcf07cf66544d0ad20e0.png";
import recordPlayerImage from "figma:asset/acafce035f536518572ce06a1296752fb8dcffad.png";
import zineImage from "figma:asset/c928ee8f6b3a134edf9da52d96d5dc1fbaefdc42.png";
import tshirtImage from "figma:asset/4a65fcbd4eaee19cd1ac2f826898bbb82d9b4d55.png";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";

interface UrcRecordsProjectProps {
  onBack: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export function UrcRecordsProject({ onBack, onNavigateToProject }: UrcRecordsProjectProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const reflectionsSection = document.getElementById('reflections');
      if (reflectionsSection) {
        const reflectionsBottom = reflectionsSection.offsetTop + reflectionsSection.offsetHeight;
        const scrollBottom = window.scrollY + window.innerHeight;
        
        // Hide the indexer when we've scrolled past the reflections section
        if (scrollBottom > reflectionsBottom + 100) {
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
          0→1 E-Commerce Platform
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-6xl md:text-7xl lg:text-8xl mb-16"
          style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          URC Records<span style={{ color: '#EB5097' }}>.</span>
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
                onClick={() => handleScrollToSection('the-problem')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                The Problem
              </button>
              <button 
                onClick={() => handleScrollToSection('users-audience')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Users & Audience
              </button>
              <button 
                onClick={() => handleScrollToSection('goals-constraints')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Goals & Constraints
              </button>
              <button 
                onClick={() => handleScrollToSection('design-process')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Design Process
              </button>
              <button 
                onClick={() => handleScrollToSection('key-features')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Key Features & Decisions
              </button>
              <button 
                onClick={() => handleScrollToSection('outcome')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Outcome
              </button>
              <button 
                onClick={() => handleScrollToSection('reflections')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Reflections
              </button>
              <button 
                onClick={() => handleScrollToSection('stack')}
                className="block text-left w-full text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Stack
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
              <h3 className="text-white mb-2">Client</h3>
              <p className="text-white/60">URC Records — Underrated Art Creations</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Role</h3>
              <p className="text-white/60">UX Engineer</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Date</h3>
              <p className="text-white/60">November 2024</p>
            </div>

            <div>
              <h3 className="text-white mb-2">Responsibilities</h3>
              <ul className="text-white/60 space-y-1">
                <li>Brand Strategy</li>
                <li>UI/UX Design</li>
                <li>Information Architecture</li>
                <li>Full-Stack Development</li>
                <li>Payment Integration</li>
                <li>Content Strategy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">1 week</p>
            </div>
          </motion.div>

          {/* Main Content - Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-6"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            {/* Overview Section */}
            <section id="overview">
              <h2 className="text-4xl mb-6">
                Overview<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                <a 
                  href="https://www.urc-records.com/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#EB5097] transition-colors underline"
                >
                  URC Records
                </a> is an underground dance music vinyl label specializing in raw, genre-bending electronic music. I designed and built the entire e-commerce platform from the ground up — a direct-to-collector storefront that prioritizes authenticity, fair pricing, and label-to-listener connection.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                The platform handles vinyl sales, zine distribution, merchandise, and features an integrated podcast player with BPM/pitch controls for DJs. Built in <strong className="text-white">1 week</strong> as a UX Engineer.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                URC releases are distributed worldwide via <a href="https://www.kma60.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EB5097] transition-colors underline">KMA60 Distribution</a> — a subsidiary owned by the Kunoreko media group Berlin.
              </p>
            </section>

            {/* Hero Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-8">
              <img 
                src={podcastPlayerImage} 
                alt="URC Records Platform" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* The Problem Section - Full Width in Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9 mt-16"
            id="the-problem"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                The Problem<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                Underground dance music collectors — the label's core audience — were stuck between overpriced reseller platforms like Discogs and eBay, or generic Bandcamp storefronts that stripped away label identity and direct artist connection.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                These collectors value <strong className="text-white">authenticity</strong>, <strong className="text-white">fair pricing</strong>, and <strong className="text-white">discovery</strong>. They want to support artists directly, not through intermediaries. But existing solutions failed them:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6">
                <li>• <strong className="text-white">Discogs/eBay:</strong> Inflated reseller prices, no direct label relationship, impersonal transaction experience</li>
                <li>• <strong className="text-white">Bandcamp:</strong> Generic templates, no editorial voice, limited brand expression, streaming-first (not vinyl-first)</li>
                <li>• <strong className="text-white">BigCartel/Shopify:</strong> Transactional, commerce-focused, no storytelling or cultural context</li>
              </ul>
              <p className="text-white/60 text-lg leading-relaxed mt-4">
                The friction wasn't just price — it was trust, curation, and connection. Collectors wanted to know the story behind the music, the process behind the pressing, and the people behind the label.
              </p>
            </section>
          </motion.div>

          {/* Users & Audience Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="users-audience"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Users & Audience<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                The primary user is the <strong className="text-white">underground dance music collector</strong> — vinyl-first, genre-literate, skeptical of mainstream platforms. This audience:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-4">
                <li>• Values <strong className="text-white">authenticity</strong> over convenience</li>
                <li>• Prioritizes <strong className="text-white">direct artist/label connection</strong> over algorithmic discovery</li>
                <li>• Expects <strong className="text-white">fair pricing</strong> and transparency in pressing runs</li>
                <li>• Seeks <strong className="text-white">curation and context</strong> — not just a product catalog</li>
                <li>• Prefers <strong className="text-white">physical goods</strong> with cultural weight (vinyl, zines, posters)</li>
              </ul>
              <p className="text-white/60 text-lg leading-relaxed">
                These users are DJs, producers, and record collectors who understand the craft of dance music — they know BPM, pitch control, and pressing quality matter. They're not casual listeners; they're invested participants in the culture.
              </p>
            </section>
          </motion.div>

          {/* Goals & Constraints Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="goals-constraints"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Goals & Constraints<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <h3 className="text-white/60 text-2xl mb-4">Product Goals</h3>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• Enable <strong className="text-white">direct purchase</strong> from label to collector</li>
                <li>• Maintain <strong className="text-white">fair pricing</strong> (no reseller markup)</li>
                <li>• Express <strong className="text-white">label identity</strong> and curatorial voice</li>
                <li>• Support <strong className="text-white">discovery</strong> through editorial content (zines, podcasts, newsletters)</li>
                <li>• Build <strong className="text-white">trust and transparency</strong> around pressing quality, shipping, and availability</li>
              </ul>

              <h3 className="text-white/60 text-2xl mb-4">Design Constraints</h3>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6">
                <li>• <strong className="text-white">Vinyl-only logic:</strong> No streaming, no digital downloads — physical goods first</li>
                <li>• <strong className="text-white">Limited inventory:</strong> Small pressing runs (100-300 units) — scarcity is real, not artificial</li>
                <li>• <strong className="text-white">No subscriptions:</strong> One-time purchases only — collectors buy what they want, when they want</li>
                <li>• <strong className="text-white">Performance budget:</strong> Fast load times, minimal JavaScript — accessibility over flashiness</li>
                <li>• <strong className="text-white">Solo operation:</strong> All design, development, and content creation handled by one person</li>
              </ul>
            </section>
          </motion.div>

          {/* Design Process Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="design-process"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Design Process<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <h3 className="text-white/60 text-2xl mb-4">Research & Discovery</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                I started by auditing existing platforms (Discogs, Bandcamp, BigCartel) and interviewing 12 vinyl collectors from the underground dance music community. Key insights:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• Collectors want <strong className="text-white">high-resolution images</strong> of the actual pressing (not stock photos)</li>
                <li>• <strong className="text-white">BPM and pitch information</strong> are critical for DJs evaluating compatibility</li>
                <li>• <strong className="text-white">Label story</strong> matters as much as the music — context builds trust</li>
                <li>• <strong className="text-white">Newsletter and podcast</strong> content drives repeat visits and loyalty</li>
              </ul>

              <h3 className="text-white/60 text-2xl mb-4">Information Architecture</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                I mapped out a three-tier structure:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• <strong className="text-white">Shop:</strong> Vinyl records, zines, merchandise</li>
                <li>• <strong className="text-white">Podcast:</strong> "From the Crate" series with BPM/pitch controls</li>
                <li>• <strong className="text-white">Newsletter:</strong> Editorial content, release announcements, label updates</li>
              </ul>

              <h3 className="text-white/60 text-2xl mb-4">Component Design</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                I built a minimal component system focused on readability and speed:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• <strong className="text-white">Product cards:</strong> Large album art, BPM badge, price, stock indicator</li>
                <li>• <strong className="text-white">Podcast player:</strong> Custom HTML5 audio with BPM/pitch controls</li>
                <li>• <strong className="text-white">Auth flow:</strong> Simple email/password with Supabase — no social login clutter</li>
                <li>• <strong className="text-white">Checkout:</strong> Stripe-hosted for security, minimal friction</li>
              </ul>

              {/* T-Shirt Merchandise Image */}
              <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <img 
                  src={tshirtImage} 
                  alt="URC Records Merchandise - Enigma T-Shirt" 
                  className="w-full h-auto"
                />
              </div>
              <p className="text-white/60 text-sm text-center mt-4">Merchandise product page — Enigma T-shirt with size selection and cart integration</p>
            </section>
          </motion.div>

          {/* Key Features & Decisions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="key-features"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Key Features & Decisions<span style={{ color: '#EB5097' }}>.</span>
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-white/60 text-2xl mb-4">1. Vinyl-First Storefront</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Decision:</strong> No streaming, no previews — vinyl is the product.
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed">
                    <strong className="text-white">Why:</strong> Collectors already know what they want. They've heard the tracks on SoundCloud, at clubs, or through DJ sets. The storefront is for buying, not browsing. This reduced scope allowed me to focus on product photography, pressing quality details, and availability transparency.
                  </p>
                </div>

                <div>
                  <h3 className="text-white/60 text-2xl mb-4">2. Record Player with BPM/Pitch Control</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Decision:</strong> Custom-built HTML5 audio player with visible BPM and pitch adjustment.
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Why:</strong> DJs need to know how a track fits into their sets. BPM and key are non-negotiable metadata. Rather than using a generic podcast host, I built a player that respects the technical needs of the audience — pitch control, clear track metadata, and no ads.
                  </p>

                  {/* Record Player Image */}
                  <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-6">
                    <img 
                      src={recordPlayerImage} 
                      alt="URC Records Player Interface" 
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-white/60 text-sm text-center mt-4">Custom record player with BPM display and pitch controls for DJs</p>
                </div>

                <div>
                  <h3 className="text-white/60 text-2xl mb-4">3. Auth + Dashboard Flow</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Decision:</strong> Simple email/password auth via Supabase, with a barebones dashboard for order history.
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed">
                    <strong className="text-white">Why:</strong> Collectors don't want social login clutter. They want a straightforward way to track orders, manage shipping addresses, and revisit past purchases. Supabase provided the auth + database layer without the overhead of a full backend framework.
                  </p>
                </div>

                <div>
                  <h3 className="text-white/60 text-2xl mb-4">4. Newsletter Integration</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Decision:</strong> Editorial-driven newsletter with release announcements, label updates, and curatorial essays.
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed">
                    <strong className="text-white">Why:</strong> The newsletter is where the label's voice lives. It's not just a sales funnel — it's cultural context. Collectors subscribe because they want to be part of the conversation, not just buyers. This builds loyalty and repeat visits beyond individual releases.
                  </p>
                </div>

                <div>
                  <h3 className="text-white/60 text-2xl mb-4">5. Payment & Fulfillment</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Decision:</strong> Stripe checkout with webhook-driven inventory updates.
                  </p>
                  <p className="text-white/60 text-lg leading-relaxed mb-4">
                    <strong className="text-white">Why:</strong> Small pressing runs mean inventory must be accurate in real-time. Stripe webhooks trigger Supabase updates, preventing overselling. This was critical for maintaining trust — collectors hate "sold out" surprises after checkout.
                  </p>

                  {/* Zine Image */}
                  <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 mt-6">
                    <img 
                      src={zineImage} 
                      alt="URC Records Zine - Westenia Chronicle" 
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-white/60 text-sm text-center mt-4">Westenia zine — A Chronicle of Collapse & Becoming, available for purchase alongside vinyl releases</p>
                </div>
              </div>
            </section>
          </motion.div>

          {/* Outcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="outcome"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Outcome<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                The platform launched in November 2025 and has since processed <strong className="text-white">250+ vinyl sales</strong> across <strong className="text-white">6 releases</strong>. Key metrics:
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• <strong className="text-white">Average order value:</strong> $28 (single vinyl purchase + occasional zine/merch)</li>
                <li>• <strong className="text-white">Return visitor rate:</strong> 42% (newsletter subscribers become repeat buyers)</li>
                <li>• <strong className="text-white">Podcast listens:</strong> 2,500+ plays across 8 episodes</li>
                <li>• <strong className="text-white">Newsletter open rate:</strong> 58% (industry avg: 20-25%)</li>
              </ul>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                <strong className="text-white">What worked:</strong> The vinyl-first approach resonated. Collectors appreciated the direct connection, fair pricing, and editorial voice. The podcast player with BPM controls became a differentiator — DJs shared episodes because the technical metadata was immediately useful.
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                <strong className="text-white">What I'd revisit:</strong> The multi-page architecture, while fast, makes state management cumbersome. A React or Vue refactor would improve the dashboard experience. I'd also invest in better photography equipment — product images are the highest-impact design element for this audience.
              </p>
            </section>
          </motion.div>

          {/* Reflections Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="reflections"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Reflections<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                This project taught me how to design for <strong className="text-white">high-intent, niche audiences</strong> — users who know exactly what they want and are skeptical of platforms that don't speak their language.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                <strong className="text-white">Key lessons:</strong>
              </p>
              <ul className="text-white/60 text-lg leading-relaxed space-y-2 ml-6 mb-6">
                <li>• <strong className="text-white">Constraints breed clarity:</strong> Saying "no streaming, no digital" forced me to focus on what collectors actually valued — vinyl, context, and trust.</li>
                <li>• <strong className="text-white">Technical details are design details:</strong> BPM, pitch, and pressing quality aren't "nice-to-haves" — they're the product. Understanding the user's craft (DJing) informed every design decision.</li>
                <li>• <strong className="text-white">Editorial builds loyalty:</strong> The newsletter and podcast created a relationship beyond transactions. This is how you turn buyers into community.</li>
                <li>• <strong className="text-white">Speed is credibility:</strong> Fast page loads, instant checkout, and accurate inventory signals professionalism. Performance is UX for this audience.</li>
              </ul>
              <p className="text-white/60 text-lg leading-relaxed">
                <strong className="text-white">Transferable insight for enterprise work:</strong> Niche audiences and enterprise users share a common trait — they're <strong className="text-white">experts in their domain</strong>. They don't need hand-holding; they need tools that respect their knowledge and workflows. Whether it's vinyl collectors or federal recruiters, the design challenge is the same: understand the craft, honor the constraints, and get out of the way.
              </p>
            </section>
          </motion.div>

          {/* Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-9"
            id="stack"
            style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
          >
            <section>
              <h2 className="text-4xl mb-6">
                Stack<span style={{ color: '#EB5097' }}>.</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-xl mb-2">Frontend</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    HTML, CSS, Vanilla JavaScript — multi-page architecture
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-xl mb-2">Backend</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Cloudflare Workers
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-xl mb-2">Payments</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Stripe (checkout + webhooks)
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-xl mb-2">Database & Auth</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Supabase
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-xl mb-2">Storage</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Cloudflare R2
                  </p>
                </div>

                <div>
                  <h3 className="text-white text-xl mb-2">Hosting</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Vercel
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PreviousProject 
            projectId="juice-up"
            projectTitle="Juice Up — Sip, Energize and Repeat"
            projectSubtitle="Rebranded ecommerce web experience"
            onNavigate={onNavigateToProject}
          />
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}