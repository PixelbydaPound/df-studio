import { motion } from "motion/react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import juiceUpImage from "figma:asset/ec5c9f654ffd53a331f6467ea48686a76c3c640d.png";
import logoOriginal from "figma:asset/fd9ce0ee04def711ade70fb60e7c393846163c0c.png";
import logoRedraw from "figma:asset/06b7fa177a53390714a3afd1b22cfaed3063cecc.png";
import styleGuideImage from "figma:asset/38deaa0fa523985ca1ba4b32b7337c9a22bb0ac0.png";
import laptopMockup from "figma:asset/b5d8fe6621d7a39fe2fa1680e38afeb49b9dbd07.png";
import juiceUpWebMockup from "figma:asset/dffefc757c123dcca5b589abc571d5dc9efeebf1.png";
import juiceUpCheckoutLive from "../../assets/juice-up-checkout-live.jpg";
import juiceUpOrderConfirmation from "../../assets/juice-up-order-confirmation-live.jpg";
import juiceUpMobileMock from "../../assets/juice-up-mobile-mock.jpg";
import juiceUpItemCards from "../../assets/juice-up-item-cards.jpg";
import juiceUpAndroidAppPhones from "../../assets/juice-up-android-app-phones.png";
import juiceUpGooglePlayBadge from "../../assets/juice-up-google-play-badge.png";
import juiceUpCateringHero from "../../assets/juice-up-catering-packs.jpg";
import juiceUpCateringBuildPacks from "../../assets/juice-up-catering-build-packs.jpg";
import juiceUpCateringDelivery from "../../assets/juice-up-catering-delivery-pay.jpg";
import juiceUpCateringPayment from "../../assets/juice-up-catering-payment.jpg";
import chalkboardMenu from "figma:asset/4538f9e0fc0d2179c0bf849a56c46ee2238e6ba5.png";
import digitalMenuCloseup from "figma:asset/f1afbd8a9ace1049ef49ed6a97f7f231f3320ea7.png";
import digitalMenuWide from "figma:asset/4d8a67311bb1cbd96c49f3526d642f4c71e6bbf5.png";
import productCardImage from "figma:asset/3be49cdda283745c14564f0f28ae82ff222488b2.png";
import Slider from "react-slick";
import { ScrollToTop } from "./ScrollToTop";
import { Footer } from "./Footer";
import { NextProject } from "./NextProject";
import { PreviousProject } from "./PreviousProject";

const JUICE_UP_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.juiceupeats.app&utm_source=na_Med";
const JUICE_UP_MOBILE_BACKEND_URL = "https://juiceupmobileapp.netlify.app";

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
          E-Commerce, Android App & Owned Checkout
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
                <p>Checkout, Catering & Cart Flows</p>
                <p>Android Mobile App UX</p>
                <p>Loyalty, Reorder & In-App Pay</p>
                <p>3D Art Direction</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Stack</h3>
              <div className="text-white/60 space-y-2">
                <p><span className="text-white">Marketing site:</span> React 18, TypeScript, Vite, Tailwind, Firebase, EmailJS</p>
                <p><span className="text-white">Pickup checkout:</span> juiceupeats.com cart/checkout, Stripe Elements, Netlify Functions</p>
                <p><span className="text-white">Android app:</span> Google Play listing, shared menu &amp; payment backend (Netlify), Google Pay + card checkout</p>
                <p><span className="text-white">iOS app:</span> App Store release targeted Q4 2026; store links on marketing site via env configuration</p>
                <p><span className="text-white">Monitoring:</span> Stripe, Microsoft Clarity, Vercel Analytics, Google Play Console (App Store Connect post-iOS)</p>
                <p><span className="text-white">UI:</span> Radix UI, shadcn/ui, brand system shared across web and mobile</p>
              </div>
            </div>

            <div>
              <h3 className="text-white mb-2">Timeline</h3>
              <p className="text-white/60">7-day rebrand · owned Stripe checkout · Android on Google Play (Oct 2025) · iOS App Store (target Q4 2026)</p>
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
                <p>
                  A follow-on <span className="text-white">mobile ordering web experience</span> brought cart and payment in-house—so guests complete purchases on Juice Up instead of being sent to Toast, DoorDash, or Uber Eats at the highest-intent moment in the funnel.
                </p>
                <p>
                  A dedicated <span className="text-white">Android app on Google Play</span> extended the same brand, menu, and payment rails into a home-screen channel—loyalty rewards, one-tap reorder, and wallet-native checkout for repeat Coral Springs guests. An{" "}
                  <span className="text-white">iOS App Store release is planned for Q4 2026</span> on the same architecture.
                </p>
                <a href="https://www.juiceupeats.com" target="_blank" rel="noopener noreferrer" className="block text-[#EB5097] hover:text-white transition-colors">
                  www.juiceupeats.com
                </a>
                <a href="https://www.juiceupeats.com/cart" target="_blank" rel="noopener noreferrer" className="block text-[#EB5097] hover:text-white transition-colors">
                  juiceupeats.com — cart, checkout & confirmation
                </a>
                <a href="https://www.juiceupeats.com/catering" target="_blank" rel="noopener noreferrer" className="block text-[#EB5097] hover:text-white transition-colors">
                  juiceupeats.com/catering — packs, delivery & pay
                </a>
                <a
                  href={JUICE_UP_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#EB5097] hover:text-white transition-colors"
                >
                  Google Play — Juice Up Android app
                </a>
              </div>
            </div>

            {/* Outcome */}
            <div className="mb-16" id="outcome">
              <h2 className="text-2xl mb-6">Outcome</h2>
              <p className="text-white/60 text-lg max-w-3xl mb-8">
                Rebrand, owned <span className="text-white">Stripe checkout</span> on juiceupeats.com, and native mobile
                ordering—one catalog and kitchen-ticket path instead of sending pay intent to Toast, DoorDash, or Uber
                Eats at checkout.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-4xl">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Online pickup</p>
                  <p className="text-2xl text-white mb-1">~20%</p>
                  <p className="text-white/50 text-sm">Higher online revenue (owner-reported) after owned Stripe checkout vs. marketplace/POS handoffs</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Android</p>
                  <p className="text-2xl text-white mb-1">Live</p>
                  <p className="text-white/50 text-sm">Google Play — baseline metrics; adoption outcomes too early to report</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">iOS</p>
                  <p className="text-2xl text-white mb-1">Q4 2026</p>
                  <p className="text-white/50 text-sm">App Store target — same stack; metrics after launch</p>
                </div>
              </div>

              <div className="text-white/60 text-lg max-w-3xl space-y-4">
                <p>
                  <span className="text-white">Online pickup (measured):</span> After moving payment to Stripe on
                  juiceupeats.com, the owner reported roughly{" "}
                  <span className="text-white">~20% higher online revenue</span> versus the prior flow that pushed orders
                  through third-party marketplaces and POS handoffs. Scope is digital pickup on owned surfaces—not total
                  in-store sales. Owner-reported; not third-party audited.
                </p>
                <p>
                  <span className="text-white">Android (recent launch):</span> The native app is public on Google Play;
                  it is too early for adoption or mobile revenue claims. Near-term focus is installs, first order,
                  stability, and 30–90 day repeat—see measurement plan below.
                </p>
                <p>
                  <span className="text-white">iOS (planned Q4 2026):</span> App Store release on the same product
                  architecture. Long-term planning benchmark:{" "}
                  <span className="text-white">~25–30% of new digital pickup customers</span> completing a first order
                  via mobile (Android + iOS combined) over six months post–dual-platform launch—a target, not a current
                  result.
                </p>
              </div>
            </div>

            {/* Measurement & monitoring */}
            <div className="mb-16" id="measurement">
              <h2 className="text-2xl mb-6">Measurement &amp; monitoring</h2>
              <p className="text-white/60 text-lg max-w-3xl mb-8">
                Ongoing instrumentation separates <span className="text-white">revenue truth</span> (Stripe) from{" "}
                <span className="text-white">quantitative traffic</span> (Vercel Analytics) and{" "}
                <span className="text-white">qualitative UX</span> (Microsoft Clarity)—used to benchmark checkout and
                menu changes without blocking the guest experience.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full max-w-4xl text-left text-sm border border-white/10 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/5 text-white/70">
                      <th className="px-4 py-3 font-medium">Layer</th>
                      <th className="px-4 py-3 font-medium">Tools</th>
                      <th className="px-4 py-3 font-medium">Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/60 divide-y divide-white/10">
                    <tr>
                      <td className="px-4 py-3 text-white">Online revenue</td>
                      <td className="px-4 py-3">Stripe, kitchen tickets</td>
                      <td className="px-4 py-3">Paid pickup volume, AOV, failed payments; validates ~20% online narrative</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white">Web (quant)</td>
                      <td className="px-4 py-3">Vercel Analytics</td>
                      <td className="px-4 py-3">Paths, devices, referrers (e.g. Play UTM), performance signals</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white">Web (qual)</td>
                      <td className="px-4 py-3">Microsoft Clarity</td>
                      <td className="px-4 py-3">Session replay, heatmaps, checkout friction on menu → cart → pay</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white">Android</td>
                      <td className="px-4 py-3">Google Play Console</td>
                      <td className="px-4 py-3">Installs, crashes, store conversion — baseline from launch</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white">iOS (Q4 2026)</td>
                      <td className="px-4 py-3">App Store Connect</td>
                      <td className="px-4 py-3">Same funnel metrics as Android once live; cohort compare after release</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white">Ops</td>
                      <td className="px-4 py-3">Netlify Functions / logs</td>
                      <td className="px-4 py-3">Stripe webhooks, checkout → kitchen-ticket reliability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 text-base max-w-3xl mt-6">
                Cadence: weeks 1–2 establish Android baseline; 30-day readout on web funnel + app installs; 90-day review
                on repeat and owned vs. marketplace channel mix. Clarity and Vercel inform iteration—they do not replace
                Stripe or owner reporting for revenue.
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
                  The web experience was rebuilt from the ground up, prioritizing mobile-first interactions and high-fidelity visuals. The design system uses motion and 3D elements to signal freshness, then extends into a transactional mobile web flow—browse, cart, Stripe checkout, and kitchen fulfillment—without forcing users out to third-party apps at checkout.
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
                          <li>Cart icon with live item count in the header</li>
                          <li>Shallow navigation depth from category → product → cart → checkout</li>
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
                      src={juiceUpMobileMock} 
                      alt="Juice Up mobile menu with cart access" 
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
                      <div className="outline-none px-1">
                        <img 
                          src={juiceUpItemCards} 
                          alt="Juice Up menu item cards on mobile" 
                          className="w-full h-auto rounded-2xl"
                        />
                      </div>
                      <div className="outline-none px-1">
                        <img 
                          src={juiceUpMobileMock} 
                          alt="Juice Up mobile web menu overview" 
                          className="w-full h-auto rounded-2xl"
                        />
                      </div>
                      <div className="outline-none px-1">
                        <img 
                          src={productCardImage} 
                          alt="Product card detail" 
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
                <div id="checkout">
                  <h3 className="text-2xl text-white mb-4">3. Owned checkout on juiceupeats.com</h3>
                  <div className="text-white/60 space-y-6 max-w-4xl mb-12">
                    <p>
                      Previously, the marketing site sent high-intent guests out to Toast, DoorDash, or Uber Eats at “Order Now”—extra hops, marketplace fees, and brand drop-off at the cart. Pickup orders now stay on juiceupeats.com through cart, embedded Stripe checkout, and a post-payment confirmation with counter-ready order numbers.
                    </p>
                    <div>
                      <strong className="text-white block mb-2">Flow:</strong>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Menu → product detail → cart (“Pay online — your order goes straight to the counter”)</li>
                        <li>Guest checkout — name, email, mobile, scheduled pickup when closed</li>
                        <li>Embedded Stripe card form with subtotal, tax, and single Pay CTA</li>
                        <li>Order received screen — progress steps, order number, receipt email, pickup location</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-white block mb-2">Why it matters for the business:</strong>
                      <p>
                        Conversion happens at checkout. Keeping the transaction on Juice Up’s surface reduces abandonment from app-switching, preserves margin that marketplaces take on each order, and gives the owner a single funnel to optimize instead of three disconnected handoffs.
                      </p>
                    </div>
                    <p className="text-white/50 text-base">
                      In-store register and legacy delivery apps remain part of operations; this work targets direct digital orders where owning the cart materially changes revenue and repeat behavior.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Checkout</p>
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                        <img
                          src={juiceUpCheckoutLive}
                          alt="Juice Up checkout with guest fields, pickup time, and Stripe card payment"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Confirmation</p>
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                        <img
                          src={juiceUpOrderConfirmation}
                          alt="Juice Up order received confirmation with order number and pickup details"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Android mobile app */}
            <div className="mb-16" id="mobile-app">
              <h2
                className="text-4xl mb-8"
                style={{
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500,
                }}
              >
                Mobile Apps<span style={{ color: "#EB5097" }}>.</span>
              </h2>
              <p className="text-white/50 text-base mb-8 -mt-4">
                Android live on Google Play · iOS App Store target Q4 2026
              </p>
              <div className="space-y-8 text-white/60 text-lg">
                <p>
                  After the rebrand and owned web checkout, the next growth lever was{" "}
                  <span className="text-white">native mobile ordering</span>—not a wrapped mobile site, but store
                  destinations with loyalty, reorder, QR scan, and wallet checkout tuned for high-frequency wellness
                  purchases in South Florida. Android shipped first; iOS follows on the same backend.
                </p>
                <p>
                  The app shares the same catalog, Stripe payment path, and kitchen-ticket backend as juiceupeats.com
                  ({JUICE_UP_MOBILE_BACKEND_URL}), so in-store fulfillment stays one pipeline whether the guest orders
                  from the browser or from a pinned home-screen icon.
                </p>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <img
                    src={juiceUpAndroidAppPhones}
                    alt="Juice Up Android app on three phones: rewards tier progress, seasonal menu grid with search and categories, and checkout with Google Pay and card payment"
                    className="w-full h-auto"
                  />
                  <p className="px-6 py-4 text-white/40 text-sm border-t border-white/10">
                    Store promotional creative — production Android UI: loyalty tiers, seasonal menu, Google Pay and
                    card checkout.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-white text-2xl mb-6">Product strategy</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Meet guests on Android-first devices common in the trade area—reduce dependence on
                          marketplace discovery fees for repeat orders.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Pair loyalty point tiers (shots, juices, smoothies) with reorder shortcuts so habitual buyers
                          skip category hunting.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Surface catering as a secondary path inside search (“Feeding a group?”) without diluting the
                          consumer checkout funnel.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
                    <h3 className="text-white text-2xl mb-2">Platform impact</h3>
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Online (Stripe) — realized</p>
                      <p>
                        ~20% higher <span className="text-white">online revenue</span> (owner-reported) after owned
                        checkout replaced Toast / marketplace handoffs at pay—not attributed to the app.
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-1">Android — learning</p>
                      <p>
                        Play Store launch is recent; installs → first order → 30-day repeat are being tracked in Play
                        Console and paired with Clarity/Vercel on web referral paths. No mobile outcome claims yet.
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium mb-1">iOS — Q4 2026</p>
                      <p>
                        App Store release expected Q4 2026 with parity on menu, pay, and loyalty. Success criteria match
                        Android once both platforms have a 30–90 day baseline.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-w-xl flex flex-col gap-6">
                    <div>
                      <h3 className="text-white text-xl mb-3">Shipped on Google Play</h3>
                      <p className="mb-4">
                        Package{" "}
                        <span className="text-white font-mono text-base">com.juiceupeats.app</span> — public listing
                        for Coral Springs pickup and loyalty.
                      </p>
                      <a
                        href={JUICE_UP_PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#EB5097] hover:text-white transition-colors mb-4"
                      >
                        View on Google Play
                        <ExternalLink className="w-4 h-4" aria-hidden />
                      </a>
                      <a
                        href={JUICE_UP_PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        aria-label="Get Juice Up on Google Play"
                      >
                        <img
                          src={juiceUpGooglePlayBadge}
                          alt="Get it on Google Play"
                          className="h-12 w-auto"
                        />
                      </a>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <h3 className="text-white text-lg mb-2">iOS — App Store (Q4 2026)</h3>
                      <p className="text-white/50 text-base">
                        Target release Q4 2026 on the same catalog, Stripe, and kitchen-ticket stack. Marketing site
                        store badges and deep links are env-driven so iOS can ship without a full site redeploy. Metrics
                        will be added to this case study after launch and the first monitoring window.
                      </p>
                    </div>
                </div>
              </div>
            </div>

            {/* Catering packs & online payment */}
            <div className="mb-16" id="catering">
              <h2
                className="text-4xl mb-8"
                style={{
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontWeight: 500,
                }}
              >
                Catering packs &amp; streamlined payment<span style={{ color: "#EB5097" }}>.</span>
              </h2>
              <div className="space-y-12 text-white/60 text-lg">
                <p>
                  Corporate and event orders need a different funnel than single-item pickup—but the same{" "}
                  <span className="text-white">trust at pay time</span>. Catering on juiceupeats.com is a dedicated
                  three-step flow—<span className="text-white">Packs → Delivery → Pay</span>—with pack customization,
                  delivery or Coral Springs pickup, and Stripe checkout on the same owned infrastructure as consumer
                  orders, without slowing the main menu cart.
                </p>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                  <img
                    src={juiceUpCateringHero}
                    alt="Juice Up catering landing — NOW CATERING hero and Catering Packs introduction"
                    className="w-full h-auto"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Build packs</p>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                      <img
                        src={juiceUpCateringBuildPacks}
                        alt="Catering pack builder with fulfillment toggle and Smoothie and Juice Pack"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Delivery details</p>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                      <img
                        src={juiceUpCateringDelivery}
                        alt="Catering delivery form with ASAP scheduling and service-area fields"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Payment</p>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white">
                    <img
                      src={juiceUpCateringPayment}
                      alt="Catering order summary with delivery fee, tax, and Pay CTA via Stripe"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Flow</p>
                    <p className="text-white text-sm">3 steps on one page — packs, fulfillment, pay</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Fulfillment</p>
                    <p className="text-white text-sm">Delivery ($35, free over $400) or store pickup</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Service area</p>
                    <p className="text-white text-sm">Coral Springs, Parkland, Coconut Creek (+ custom via phone)</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-white text-2xl mb-6">What it does now</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Pre-built packs (smoothie &amp; juice, açaí bowls, wrap &amp; salad, booster shots) with
                          per-pack flavor customization and serves 10–20 guidance
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Live order summary — subtotal, delivery, tax, and a single{" "}
                          <span className="text-white">Pay</span> action (Stripe) once packs and contact details are
                          complete
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>ASAP / scheduled readiness messaging tied to kitchen capacity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          Escalation path for large custom menus (phone + catering@juiceupeats.com) without blocking
                          standard pack checkout
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Entry from app search (“Feeding a group?”) and site nav — isolated from consumer cart</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-white text-2xl mb-6">Benchmarks &amp; monitoring</h3>
                    <p className="mb-6">
                      Catering metrics are tracked separately from pickup checkout (Stripe + Clarity on{" "}
                      <span className="text-white">/catering</span>) so pack conversion and pay completion can be
                      optimized without mixing B2C funnel data.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          <span className="text-white">Target:</span> majority of standard pack orders complete payment
                          online vs. phone/email quote-only
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          <span className="text-white">Watch:</span> pack add rate, delivery vs. pickup mix, abandon before
                          Pay unlock
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>
                          <span className="text-white">Ops:</span> free delivery threshold ($400+) and $35 delivery line
                          item visible pre-pay — fewer invoice surprises
                        </span>
                      </li>
                    </ul>
                    <p className="text-white/45 text-sm mt-6">
                      Directional targets for a single-location catering program; update with Stripe cohort data after
                      30–90 days live.
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.juiceupeats.com/catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#EB5097] hover:text-white transition-colors"
                >
                  juiceupeats.com/catering
                  <ExternalLink className="w-4 h-4" aria-hidden />
                </a>
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
                        <span>On-site cart & checkout — Stripe Elements, webhooks, kitchen tickets</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Android app — Google Play, loyalty tiers, Google Pay + card checkout, shared Netlify backend</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Kitchen tickets — Paid orders routed for in-store fulfillment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#EB5097] mt-1.5">•</span>
                        <span>Catering — /catering pack builder, delivery fields, Stripe pay (shared Netlify backend)</span>
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
                        <span className="text-white block mb-1">Marketing site:</span>
                        React 18, TypeScript, Vite, Tailwind CSS, Motion, EmailJS
                      </div>
                      <div>
                        <span className="text-white block mb-1">Pickup checkout:</span>
                        React cart store (localStorage), Stripe card form, order confirmation route
                      </div>
                      <div>
                        <span className="text-white block mb-1">Back-end:</span>
                        Firebase (catering & catalog), Netlify Functions on juiceupeats.com and juiceupmobileapp.netlify.app (Stripe, webhooks, kitchen board)
                      </div>
                      <div>
                        <span className="text-white block mb-1">Android app:</span>
                        Google Play (com.juiceupeats.app), shared payment & kitchen-ticket API with web checkout
                      </div>
                      <div>
                        <span className="text-white block mb-1">UI:</span>
                        Radix UI, shadcn/ui, shared Juice Up design tokens
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                 <p className="text-white/60">
                    <strong className="text-white">System Architecture:</strong> The marketing site runs on Vite with Firebase for catalog and legacy lead capture, plus first-party pickup and catering funnels on juiceupeats.com—consumer cart in the browser, catering packs on /catering, both paying through Stripe with kitchen routing on Netlify. The Android app calls the same mobile backend host for payments and fulfillment routing.
                 </p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-32 border-t border-white/10 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PreviousProject 
              projectName="Proactive MSO access control"
              onNavigate={() => onNavigateToProject?.("enterprise-roles")}
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