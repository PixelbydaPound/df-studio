import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { HalftonePortrait } from "./HalftonePortrait";
import { heroEntranceMotion, heroFadeMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-start items-center px-6 md:px-12 pt-20 relative overflow-hidden font-portfolio"
    >
      {!reducedMotion && (
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
            zIndex: 50,
          }}
        >
          <div className="relative">
            <div className="px-4 py-2 rounded bg-[#EB5097] text-white text-sm font-medium whitespace-nowrap">
              DanielF
            </div>
            <div
              className="absolute left-2 -bottom-1.5 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#EB5097]"
              aria-hidden
            />
          </div>
        </motion.div>
      )}

      <div
        className="max-w-6xl mx-auto text-center px-4 relative w-full"
        style={{ zIndex: 20, marginTop: "calc(3rem + 72px)" }}
      >
        <div className="flex flex-col items-center gap-12">
          <div className="flex-1 relative">
            <motion.h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl leading-none overflow-hidden text-white relative">
              <motion.span
                className="flex items-center justify-center gap-4 relative font-bold"
                {...heroEntranceMotion(reducedMotion, 0)}
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 60%, #999999 85%, #3D3D3D 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Hi there
                <HalftonePortrait />
              </motion.span>
              <motion.span
                className="block text-center font-light"
                {...heroEntranceMotion(reducedMotion, 0.1)}
              >
                I am <span className="font-bold">Daniel</span>
                <span className="text-[#EB5097]">.</span>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 mt-8 text-white"
              {...heroEntranceMotion(reducedMotion, 0.3)}
            >
              Product Designer — B2C, B2B & SaaS · Human-in-the-Loop AI
            </motion.p>

            <motion.p
              className="text-base md:text-lg max-w-2xl mx-auto text-white/70 mb-8"
              {...heroEntranceMotion(reducedMotion, 0.5)}
            >
              B2C, B2B, and SaaS product design: AI-native flows with human judgment at the
              center—not automation for its own sake. Owned checkout, mobile apps, FinTech,
              enterprise admin, healthtech, and GovTech—fast launches when the product allows, regulated depth
              when trust requires it—always balancing speed, clarity, and trust.
            </motion.p>
          </div>
        </div>
      </div>

      <motion.div className="absolute bottom-12" {...heroFadeMotion(reducedMotion, 1)}>
        {reducedMotion ? (
          <ArrowDown className="w-6 h-6 text-muted-foreground" aria-hidden />
        ) : (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" aria-hidden />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
