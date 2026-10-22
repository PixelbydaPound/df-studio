import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { scrollRevealMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

export type ProjectCardData = {
  id: string;
  title: string;
  description: string;
  image?: string;
  thumbnail?: ReactNode;
  imageClassName?: string;
  company?: string;
  readingTime?: string;
  inConstruction?: boolean;
};

type ProjectCardProps = {
  project: ProjectCardData;
  index: number;
  onOpen?: (projectId: string) => void;
};

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const reveal = scrollRevealMotion(reducedMotion, index * 0.1);
  const disabled = Boolean(project.inConstruction);

  return (
    <motion.div
      key={project.id}
      {...reveal}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      onClick={() => !disabled && onOpen?.(project.id)}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.(project.id);
        }
      }}
      className={`group portfolio-card font-portfolio p-8 ${
        disabled ? "portfolio-card--disabled" : "portfolio-card--interactive"
      }`}
    >
      <div className="mb-6 flex justify-start">
        <div className="portfolio-card__media relative w-full h-64 rounded-3xl overflow-hidden bg-white shadow-2xl">
          {project.thumbnail ?? (
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full ${project.imageClassName || "object-cover"}`}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl mb-3 flex items-center gap-2 text-white">
          {project.title}
          {!disabled && (
            <ExternalLink
              className="portfolio-card__link-icon w-5 h-5 text-white/60"
              aria-hidden
            />
          )}
        </h3>
        {disabled && (
          <p className="text-sm mb-2 text-[#EB5097]">In construction..</p>
        )}
        <p className="text-base text-white/60">{project.description}</p>
        {project.company && (
          <p className="text-sm mt-2 text-white/40">{project.company}</p>
        )}
        {project.readingTime && (
          <p className="text-sm mt-3 text-white/40">
            Estimated reading time: {project.readingTime}
          </p>
        )}
      </div>
    </motion.div>
  );
}
