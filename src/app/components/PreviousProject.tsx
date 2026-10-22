import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { scrollRevealMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

interface PreviousProjectProps {
  projectName: string;
  onNavigate?: () => void;
}

export function PreviousProject({ projectName, onNavigate }: PreviousProjectProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div {...scrollRevealMotion(reducedMotion, 0)} className="mt-16 mb-12">
      <button
        type="button"
        onClick={onNavigate}
        className="portfolio-nav-link portfolio-nav-link--previous group flex items-center gap-3 font-portfolio"
      >
        <span className="text-sm uppercase tracking-wide text-white/50">Previous</span>
        <div className="flex items-center gap-2">
          <ArrowLeft className="portfolio-nav-link__arrow w-4 h-4 text-white/50" aria-hidden />
          <span className="portfolio-nav-link__label pb-0.5 text-base text-white/70 tracking-tight">
            {projectName}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
