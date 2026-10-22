import { ScrollReveal } from "./ScrollReveal";

export function Education() {
  const education = [
    {
      id: "hugging-face-ai-agents",
      title: "AI Agents Fundamentals",
      institution: "Hugging Face",
      year: "Mar 2026",
      credentialId: "Daniel Fornica",
    },
    {
      id: "mit-xpro",
      title: "Designing and Building AI Products and Services",
      institution: "MIT xPRO (Emeritus)",
      year: "Aug 2025 - Oct 2025",
    },
    {
      id: "google-conversation",
      title: "Google Cloud Conversation Design Fundamentals",
      institution: "Google",
      year: "2025",
    },
    {
      id: "conversation-design-ai",
      title: "Conversation Design: Practical Tips for AI Design",
      institution: "IxDF - Interaction Design Foundation",
      year: "Feb 2025",
    },
    {
      id: "search-ux",
      title: "How to Design the Perfect Search UX",
      institution: "IxDF - Interaction Design Foundation",
      year: "Nov 2024",
    },
    {
      id: "designer-developer",
      title: "A Guide To Hassle-Free Designer-Developer Collaboration",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Sep 2024",
    },
    {
      id: "ai-design-patterns",
      title: "How to Elevate the User Experience of AI with Design Patterns",
      institution: "IxDF - Interaction Design Foundation",
      year: "Jul 2024",
    },
    {
      id: "ai-for-designers",
      title: "AI for Designers",
      institution: "IxDF - Interaction Design Foundation",
      year: "Jul 2024",
    },
    {
      id: "vr-prototyping",
      title: "Rapid Prototyping for Virtual Reality",
      institution: "IxDF - Interaction Design Foundation",
      year: "Nov 2023",
    },
    {
      id: "research-maturity",
      title: "Research Maturity: Building a Strong Foundation for Effective Research",
      institution: "Meta",
      year: "Oct 2023",
    },
    {
      id: "complex-ui",
      title: "Complex UI Design: Practical Techniques",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Oct 2023",
    },
    {
      id: "neurodiversity",
      title: "How to Design for Neurodiversity, Inclusive Content and UX",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Sep 2023",
    },
    {
      id: "ai-design",
      title: "How to Design with and for Artificial Intelligence",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Aug 2023",
    },
    {
      id: "xr-immersive",
      title: "How To Craft Immersive Experiences in XR",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Jul 2023",
    },
    {
      id: "ar-vr-design",
      title: "How to Design for Augmented and Virtual Reality",
      institution: "IxDF - The Interaction Design Foundation",
      year: "May 2023",
    },
    {
      id: "don-norman",
      title: "Design for the 21st Century with Don Norman",
      institution: "IxDF - The Interaction Design Foundation",
      year: "Jan 2023",
    },
    {
      id: "circuit-stream",
      title: "XR Designer",
      institution: "Circuit Stream",
      year: "Dec 2021 - March 2023",
    },
    {
      id: "thinkful",
      title: "UX UI Certification",
      institution: "Thinkful",
      year: "Jan 2021 - July 2021",
    },
    {
      id: "mtsu",
      title: "Computer Science Engineering",
      institution: "Middle Tennessee State University",
      year: "2015 - 2017",
    },
  ];

  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio" id="education">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal as="h2" className="text-4xl md:text-5xl mb-12 text-white">
          Education<span className="text-[#EB5097]">.</span>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {education.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={Math.min(index * 0.03, 0.4)}
              className="border-b border-white/10 pb-8"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg mb-2 text-white">{item.title}</h3>
                  <p className="text-base text-white/50">{item.institution}</p>
                </div>
                <div className="text-base flex-shrink-0 text-white/40">{item.year}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
