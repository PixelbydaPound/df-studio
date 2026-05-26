import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface PreviousProjectProps {
  projectName: string;
  onNavigate?: () => void;
}

export function PreviousProject({ projectName, onNavigate }: PreviousProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="mt-16 mb-12"
    >
      <button
        onClick={onNavigate}
        className="group flex items-center gap-3 transition-all duration-300"
      >
        <span
          style={{
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          Previous
        </span>
        <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          <ArrowLeft
            className="transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#EB5097]"
            style={{
              width: '16px',
              height: '16px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          />
          <span
            className="border-b border-white/20 pb-0.5 transition-all duration-300 group-hover:border-[#EB5097] group-hover:text-white"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '-0.01em',
            }}
          >
            {projectName}
          </span>
        </div>
      </button>
    </motion.div>
  );
}
