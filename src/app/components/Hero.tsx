import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import portraitImage from "figma:asset/a96981bb6877cda98199de6acc8b2114d354d90a.png";
import avatarImage from "figma:asset/97babe4e241b7f49dd489e07cf0b1b719e61f640.png";
import { HalftonePortrait } from "./HalftonePortrait";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-start items-center px-6 md:px-12 pt-20 relative overflow-hidden">
      {/* Custom Cursor - stays within hero section */}
      <motion.div
        className="absolute pointer-events-none"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 30, 60, 30, 0],
          y: [0, -20, 0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          right: "114px",
          top: "120px",
          zIndex: 50
        }}
      >
        {/* Tooltip with triangle pointer */}
        <div className="relative">
          {/* Main tooltip box */}
          <div
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "#EB5097",
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            DanielF
          </div>
          {/* Triangle pointer */}
          <div
            className="absolute"
            style={{
              left: "8px",
              bottom: "-6px",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #EB5097",
            }}
          />
        </div>
      </motion.div>

      <div
        className="max-w-6xl mx-auto text-center px-4 relative w-full"
        style={{ zIndex: 20, marginTop: 'calc(3rem + 72px)' }}
      >
        <div className="flex flex-col items-center gap-12">
          {/* Text content */}
          <div className="flex-1" style={{ position: 'relative' }}>
            <motion.h1
              className="mb-6 text-6xl md:text-8xl lg:text-9xl leading-none overflow-hidden"
              style={{ position: 'relative', fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif', color: 'white' }}
            >
              <motion.span
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: 'relative',
                  fontWeight: 700,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 60%, #999999 85%, #3D3D3D 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Hi there
                <HalftonePortrait />
              </motion.span>
              <motion.span 
                className="block text-center" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ fontWeight: 300 }}
              >
                I am <span style={{ fontWeight: 700 }}>Daniel</span><span style={{ color: '#EB5097' }}>.</span>
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-8 mt-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif', color: 'white' }}
            >
              Product Designer — AI & Enterprise Systems
            </motion.p>

            <motion.p
              className="text-base md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}
            >
              I design AI-native and enterprise systems in regulated environments. My work focuses on transforming complex workflows into scalable, accessible, and high-performing product experiences — balancing innovation, compliance, and operational efficiency.
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}