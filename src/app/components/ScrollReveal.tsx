import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { scrollRevealMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

type MotionTag = "div" | "h2" | "h3" | "p" | "a" | "section" | "ul" | "li";

type ScrollRevealProps<T extends MotionTag = "div"> = {
  as?: T;
  delay?: number;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">;

export function ScrollReveal<T extends MotionTag = "div">({
  as,
  delay = 0,
  className,
  children,
  ...rest
}: ScrollRevealProps<T>) {
  const reducedMotion = useReducedMotion();
  const reveal = scrollRevealMotion(reducedMotion, delay);
  const Component = motion[as ?? "div"] as ElementType;

  return (
    <Component {...reveal} className={className} {...rest}>
      {children}
    </Component>
  );
}
