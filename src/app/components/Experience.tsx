import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import avueLogo from "figma:asset/a70f169fa35e5f08a59d3ce042699d994202ee99.png";
import mahaloLogo from "figma:asset/53a3832fe7428f6cc52caffe2850d2d69c72806c.png";
import localfluxaiLogo from "figma:asset/df3c61c545a4c62614ed9f8f4355df8196b5eb3a.png";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const experiences = [
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
        "Created interactive interfaces that improved job matching accuracy and recruitment efficiency by 35%."
      ]
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
        "Partnered with engineers to ensure UX accuracy, supporting a smooth transition from the legacy product to V2—driving a 15% increase in new partnerships in Q1 & Q2 of 2023."
      ]
    },
    {
      id: "localfluxai",
      title: "Product Designer",
      company: "Local Flux AI",
      period: "Jan 2019 – Current",
      logo: localfluxaiLogo,
      color: "#8B5CF6",
      responsibilities: [
        "Started with DFStudio delivering end-to-end design and digital services (web, branding, UI/UX, SaaS).",
        "Evolved into Local Flux AI, where I integrate design with AI-driven development, smart funnels, and automation to help businesses scale and grow."
      ]
    }
  ];

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.35"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="mt-23 pt-8 px-6 md:px-12" id="experience" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-20"
          style={{ 
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            color: 'white'
          }}
        >
          Experience<span style={{ color: '#EB5097' }}>.</span>
        </motion.h2>

        <div className="relative">
          {/* Experience items */}
          <div className="space-y-24 md:space-y-32" ref={timelineRef}>
            {/* Timeline container - connects through all icons */}
            <div 
              className="absolute left-1/2 hidden md:block pointer-events-none" 
              style={{ 
                top: 0, 
                bottom: '2rem',
                width: '2px',
                marginLeft: '-1px'
              }}
            >
              {/* Background line */}
              <div 
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              {/* Animated stroke line */}
              <motion.div 
                className="absolute top-0 left-0 right-0"
                style={{ 
                  height: lineHeight,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <div className={`flex flex-col md:flex-row gap-8 items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content card */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex-1"
                  >
                    <div 
                      className="border border-white/10 rounded-lg p-8 backdrop-blur-sm"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <h3 
                        className="text-2xl mb-2"
                        style={{ 
                          fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                          color: 'white'
                        }}
                      >
                        {exp.title}
                      </h3>
                      
                      <ul className="space-y-3 mt-6">
                        {exp.responsibilities.map((resp, idx) => (
                          <li 
                            key={idx}
                            className="text-base pl-5 relative"
                            style={{ 
                              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                              color: 'rgba(255, 255, 255, 0.7)',
                              lineHeight: '1.8'
                            }}
                          >
                            <span 
                              className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                            />
                            {resp}
                          </li>
                        ))}
                      </ul>

                      {exp.link && (
                        <a
                          href={exp.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-6 transition-colors"
                          style={{ 
                            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                            color: 'rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          {exp.link.text}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>

                  {/* Timeline icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative z-10 flex-shrink-0 hidden md:flex"
                  >
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden"
                      style={{ 
                        backgroundColor: exp.color,
                        boxShadow: `0 0 0 4px rgba(0, 0, 0, 1), 0 0 0 5px ${exp.color}`
                      }}
                    >
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </motion.div>

                  {/* Company info */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <h4 
                      className="text-xl mb-1"
                      style={{ 
                        fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'white'
                      }}
                    >
                      {exp.company}
                    </h4>
                    <p 
                      className="text-base"
                      style={{ 
                        fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        color: 'rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {exp.period}
                    </p>
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
