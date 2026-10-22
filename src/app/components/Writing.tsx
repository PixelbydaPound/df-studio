import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Writing() {
  const articles = [
    {
      id: "agentic-data-plane",
      title: "The Agentic Data Plane (ADP): A New Category in AI Infrastructure",
      description: "Connecting AI agents with Enterprise Systems",
      link: "https://medium.com/@danielfornicauxui/the-agentic-data-plane-adp-a-new-category-in-ai-infrastructure-9ea329d6cbc3",
    },
    {
      id: "designing-intelligence",
      title: "Designing Intelligence: A Framework for Building Human-Centered AI Products",
      description: "We used to design screens. Now we design decisions.",
      link: "https://medium.com/@danielfornicauxui/designing-intelligence-a-framework-for-building-human-centered-ai-products-cd336cb6330a",
    },
  ];

  return (
    <section className="pt-8 mt-8 px-6 md:px-12 font-portfolio" id="writing">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal as="h2" className="text-4xl md:text-5xl mb-12 text-white">
          Writing<span className="text-[#EB5097]">.</span>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ScrollReveal
              key={article.id}
              as="a"
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              delay={index * 0.1}
              className="group portfolio-card portfolio-card--interactive p-8 min-h-[240px] justify-between"
            >
              <div>
                <h3 className="text-xl mb-4 text-white">{article.title}</h3>
                <p className="text-base mb-6 text-white/60">{article.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                Read article on Medium
                <ArrowUpRight className="portfolio-card__link-icon w-4 h-4" aria-hidden />
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal
            as="a"
            href="https://medium.com/@danielfornicauxui"
            target="_blank"
            rel="noopener noreferrer"
            delay={0.2}
            className="group portfolio-card portfolio-card--interactive p-8 min-h-[240px] items-center justify-center text-center"
          >
            <p className="text-sm mb-4 text-white/40">Read all my articles on</p>
            <div className="text-5xl mb-6 text-white font-normal" style={{ fontFamily: "Georgia, serif" }}>
              Medium
            </div>
            <ArrowUpRight className="portfolio-card__link-icon w-8 h-8 text-white/60 mx-auto" aria-hidden />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
