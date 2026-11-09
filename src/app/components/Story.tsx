import { ScrollReveal } from "./ScrollReveal";
import {
  storyTokensFromParts,
  StoryScrollScrubParagraph,
} from "./StoryScrollScrubParagraph";

const LOCAL_FLUX_LINK =
  "text-[#EB5097] no-underline transition-opacity duration-300 hover:opacity-90 font-[inherit]";

const storyParagraphs = [
  storyTokensFromParts([
    {
      kind: "text",
      text:
        "I'm a Product Designer with over four years of experience crafting scalable digital experiences in regulated, AI-driven SaaS — across FinTech, GovTech, and HealthTech. My work sits at the intersection of design systems, accessibility, and intelligent automation.",
    },
  ]),
  storyTokensFromParts([
    {
      kind: "text",
      text:
        "In FinTech, I helped shape the member and business experiences at Mahalo Banking, a cloud-based digital platform built for credit unions. With accessibility and trust at the core, I designed omniplatform experiences that modernized legacy banking systems while maintaining strict security and fraud-prevention standards. I also led the development of a scalable design system that improved rollout consistency and enabled smaller institutions to compete with modern digital banks.",
    },
  ]),
  storyTokensFromParts([
    {
      kind: "text",
      text:
        "In GovTech, at Avue Technologies, I contributed to the transformation of a legacy HR system into an AI-native SaaS platform within AWS GovCloud — serving federal and DoD agencies under FedRAMP compliance. I built modular design systems and conversational AI workflows for talent management, job matching, recruitment, and performance tracking, and worked with cross-functional teams to align designs with federal taxonomies and accessibility regulations while introducing role-based, multi-tenant interfaces for recruiters and civilian jobseekers.",
    },
  ]),
  storyTokensFromParts([
    {
      kind: "text",
      text:
        "In HealthTech, at Modernizing Medicine (ModMed), I designed administration and permission workflows for enterprise healthcare software used by multi-location practices. I also worked with the revenue cycle management product team to prepare the OBGYN experience for the 2027 shift away from the global OB package, aligning it with new billing guidelines and the needs of providers, practices, and other stakeholders. Alongside our UX research team, I applied established research methods to keep work aligned with team and business goals, and worked hands-on with AI-assisted prototyping and front-end code within the team's workflow. Confidentiality agreements limit how much of this work I can show here; I'm glad to discuss it in a private review.",
    },
  ]),
  storyTokensFromParts([
    { kind: "text", text: "Alongside product work, I run" },
    {
      kind: "link",
      text: "Local Flux",
      href: "https://localfluxai.com/",
      linkClassName: LOCAL_FLUX_LINK,
    },
    {
      kind: "text",
      text:
        "— a private design studio that helps businesses grow through tailored branding, websites, and digital experiences. These real-world projects keep my craft sharp and constantly inspire fresh thinking.",
    },
  ]),
  storyTokensFromParts([
    {
      kind: "text",
      text:
        "Today, I continue to explore how AI, design systems, and human-centered design can work together to create more adaptive, inclusive, and intelligent digital ecosystems.",
    },
  ]),
];

export function Story() {
  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio" id="story">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal as="h2" className="text-4xl md:text-5xl mb-12 text-story">
          My story<span className="text-[#EB5097]">.</span>
        </ScrollReveal>

        <div className="font-portfolio-serif">
          {storyParagraphs.map((tokens, index) => (
            <StoryScrollScrubParagraph
              key={index}
              tokens={tokens}
              className="text-lg mb-6 text-story leading-relaxed last:mb-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
