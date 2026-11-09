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
        <div className="flex flex-col items-center gap-6 pb-28">
          <div className="flex-1 relative w-full">
            <motion.h1 className="mb-4 text-6xl md:text-8xl lg:text-9xl leading-none overflow-hidden relative">
              <motion.span
                className="flex items-center justify-center gap-4 relative font-bold"
                {...heroEntranceMotion(reducedMotion, 0)}
                style={{
                  background:
                    "linear-gradient(180deg, var(--story-fg, #fff) 0%, var(--story-mid, #999) 55%, var(--story-soft, #666) 100%)",
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
                className="block text-center font-light text-story"
                {...heroEntranceMotion(reducedMotion, 0.1)}
              >
                I am <span className="font-bold">Daniel</span>
                <span className="text-[#EB5097]">.</span>
              </motion.span>
            </motion.h1>

            <motion.p
              className="font-portfolio-serif font-normal text-base sm:text-lg md:text-xl leading-[1.3] tracking-[-0.01em] [font-feature-settings:'kern'_on,'liga'_on] mb-4 mt-6 text-story max-w-xl md:max-w-2xl mx-auto text-left"
              {...heroEntranceMotion(reducedMotion, 0.3)}
            >
              Product Designer — B2C, B2B & SaaS
            </motion.p>

            <motion.div
              className="font-portfolio-serif font-normal text-[0.9375rem] sm:text-base md:text-[1.0625rem] leading-[1.45] md:leading-[1.5] tracking-[-0.01em] [font-feature-settings:'kern'_on,'liga'_on] max-w-xl md:max-w-2xl mx-auto text-left text-story space-y-3 md:space-y-4"
              {...heroEntranceMotion(reducedMotion, 0.5)}
            >
              <p>
                Technology moves fast, and AI is moving it faster than ever. Human psychology
                doesn&apos;t. Our desires, emotions, and motivations stay largely the same. The
                psychology that made an interface work in the 1970s is the same psychology that
                makes one work today, and it&apos;s what will make tomorrow&apos;s AI products
                work, too. The way people behave in groups hasn&apos;t changed much either, even
                as more of life moves online.
              </p>
              <p>
                AI can process data, generate options, and speed up workflow. It can&apos;t ask
                &ldquo;why?&rdquo; with empathy. It can&apos;t sit with someone and feel the
                frustration behind their words, or understand the sociological context they live in.
                It can&apos;t carry a design process from first idea to finished solution and make
                sure the result is what people actually need and want.
              </p>
              <p>That&apos;s the work I do.</p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div className="absolute bottom-12" {...heroFadeMotion(reducedMotion, 1)}>
        {reducedMotion ? (
          <ArrowDown className="w-6 h-6 text-story-mid" aria-hidden />
        ) : (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-story-mid" aria-hidden />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
