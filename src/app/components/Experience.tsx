import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import avueLogo from "figma:asset/a70f169fa35e5f08a59d3ce042699d994202ee99.png";
import mahaloLogo from "figma:asset/53a3832fe7428f6cc52caffe2850d2d69c72806c.png";
import localfluxaiLogo from "figma:asset/df3c61c545a4c62614ed9f8f4355df8196b5eb3a.png";
import modmedLotusM from "../../assets/modmed-lotus-m.png";
import { ScrollReveal } from "./ScrollReveal";
import { experienceSlideMotion } from "../lib/motionPresets";
import { useReducedMotion } from "../lib/useReducedMotion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const experiences = [
    {
      id: "localfluxai",
      title: "Product Designer",
      company: "Local Flux",
      period: "Nov 2025 – Current",
      logo: localfluxaiLogo,
      color: "#8B5CF6",
      responsibilities: [
        "Product Strategy and UX execution for small businesses and B2C platforms.",
        "UX strategy, conversion-focused experiences, digital product architecture, and end-to-end delivery from concept through launch.",
      ],
    },
    {
      id: "modmed",
      title: "Senior Product Designer",
      company: "Modernizing Medicine",
      period: "Jul – Oct 2025",
      logo: modmedLotusM,
      color: "#FFFFFF",
      logoClass: "w-14 h-14 object-contain",
      responsibilities: [
        "Enterprise UX on roles and permissions at the MSO admin layer, part of a multi-product unified authorization program.",
        "Phase 0–1 design direction for read-only access proof-of-concept, area-level enforcement, and org-admin assignment flows.",
        "Cross-functional partnership with product and engineering on compliance-oriented admin patterns; initiative ongoing at time of departure.",
      ],
    },
    {
      id: "avue",
      title: "Senior Product Designer",
      company: "Avue Technologies",
      period: "Oct 2023 – Aug 2025",
      logo: avueLogo,
      color: "#1E3A8A",
      responsibilities: [
        "Led Avue Technologies' design transformation into an AI-native platform, achieving in six months what typically takes years, redefining our go-to-market strategy.",
        "Leveraged AI-powered tools to accelerate ideation, build interactive prototypes, and bridge design-to-code workflows, enabling faster iteration and more effective collaboration with engineering teams.",
        "Built scalable design systems, transforming legacy interfaces into AI-powered conversational experiences for talent management.",
        "Created interactive interfaces to enhance talent mobility, job matching, recruitment, and performance tracking.",
        "Led the design and optimization of HR technology workflows, improving compliance with federal workforce taxonomies and regulations.",
        "Spearheaded the transition from legacy systems to AI-powered conversational experiences, reducing administrative workload by 30% and increasing user adoption by 40%.",
        "Developed role-based access and user journeys, streamlining operations and cutting onboarding time by 25%.",
        "Created interactive interfaces that improved job matching accuracy and recruitment efficiency by 35%.",
      ],
    },
    {
      id: "mahalo",
      title: "Product Designer",
      company: "Mahalo Technologies",
      period: "April 2022 – June 2023",
      logo: mahaloLogo,
      color: "#10B981",
      responsibilities: [
        "Designed user-centered solutions for complex banking features, ensuring seamless stakeholder alignment.",
        "Created intuitive, polished UI while maintaining brand consistency and enhancing engagement.",
        "Developed user flows, wireframes, and prototypes, leveraging insights for data-driven decision-making.",
        "Built and maintained scalable design systems to optimize efficiency across projects.",
        "Partnered with engineers to ensure UX accuracy, supporting a smooth transition from the legacy product to V2—driving a 15% increase in new partnerships in Q1 & Q2 of 2023.",
      ],
    },
  ];

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.35"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="mt-23 pt-8 px-6 md:px-12 font-portfolio" id="experience" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal as="h2" className="text-4xl md:text-5xl mb-20 text-white">
          Experience<span className="text-[#EB5097]">.</span>
        </ScrollReveal>

        <div className="relative">
          <div className="space-y-24 md:space-y-32" ref={timelineRef}>
            <div
              className="absolute left-1/2 hidden md:block pointer-events-none"
              style={{
                top: 0,
                bottom: "2rem",
                width: "2px",
                marginLeft: "-1px",
              }}
            >
              <div className="absolute inset-0 bg-white/10" />
              <motion.div
                className="absolute top-0 left-0 right-0 bg-white/80"
                style={
                  reducedMotion
                    ? { height: "100%" }
                    : { height: lineHeight }
                }
              />
            </div>
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <div
                  className={`flex flex-col md:flex-row gap-8 items-start ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <motion.div
                    className="flex-1"
                    {...experienceSlideMotion(reducedMotion, index, "content")}
                  >
                    <div className="border border-white/10 rounded-lg p-8 backdrop-blur-sm bg-black/30">
                      <h3 className="text-2xl mb-2 text-white">{exp.title}</h3>

                      <ul className="space-y-3 mt-6">
                        {exp.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-base pl-5 relative text-white/70 leading-relaxed"
                          >
                            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-white/50" />
                            {resp}
                          </li>
                        ))}
                      </ul>

                    </div>
                  </motion.div>

                  <motion.div
                    className="relative z-10 flex-shrink-0 hidden md:flex"
                    {...experienceSlideMotion(reducedMotion, index, "icon")}
                  >
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: exp.color,
                        boxShadow: `0 0 0 4px rgba(0, 0, 0, 1), 0 0 0 5px ${exp.color}`,
                      }}
                    >
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className={exp.logoClass ?? "w-12 h-12 object-contain"}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}
                    {...experienceSlideMotion(reducedMotion, index, "meta")}
                  >
                    <h4 className="text-xl mb-1 text-white">{exp.company}</h4>
                    <p className="text-base text-white/50">{exp.period}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
