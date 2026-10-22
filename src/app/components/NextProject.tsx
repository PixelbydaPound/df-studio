import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { scrollRevealMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

interface NextProjectProps {
  projectName: string;
  onNavigate: () => void;
}

export function NextProject({ projectName, onNavigate }: NextProjectProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div {...scrollRevealMotion(reducedMotion, 0)} className="mt-16 mb-12">
      <button
        type="button"
        onClick={onNavigate}
        className="portfolio-nav-link group flex items-center gap-3 font-portfolio"
      >
        <span className="text-sm uppercase tracking-wide text-white/50">Next</span>
        <div className="flex items-center gap-2">
          <span className="portfolio-nav-link__label pb-0.5 text-base text-white/70 tracking-tight">
            {projectName}
          </span>
          <ArrowRight className="portfolio-nav-link__arrow w-4 h-4 text-white/50" aria-hidden />
        </div>
      </button>
    </motion.div>
  );
}
