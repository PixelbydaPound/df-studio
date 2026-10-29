import { Check } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function Readings() {
  const readingsList = [
    [
      { title: "Cybersecurity and Cyberwar - What Everyone Needs to Know - P.W. Singer (in progress)", checked: false },
      { title: "The Art of Shaolin Kung Fu - Wong Kiew Kit", checked: true },
      { title: "IKIGAI - Hector Garcia & Frances Miralles", checked: true },
      { title: "Emotional Intelligence - Daniel Goleman", checked: true },
      { title: "Superminds - Thomas W Malone", checked: true },
      { title: "Everything can be trained", checked: true },
      { title: "Influence", checked: true },
      { title: "Never eat alone", checked: true },
      { title: "The secret life of mind", checked: true },
      { title: "Age of invisible machines", checked: true },
      { title: "Crossing the chasm", checked: true },
    ],
    [
      { title: "The Politics of Design - Ruben Pater", checked: true },
      { title: "Design for the Real World - Papanek", checked: true },
      { title: "The 80/20 Principle", checked: true },
      { title: "Lean UX", checked: true },
      { title: "UX: Methods and principles", checked: true },
      { title: "Black box thinking", checked: true },
      { title: "Read people like a book", checked: true },
      { title: "Thinking, Fast and Slow", checked: true },
      { title: "Atomic habits", checked: true },
      { title: "Emotions revealed", checked: true },
      { title: "Learning how to learn", checked: true },
    ],
    [
      { title: "Don't make me think", checked: true },
      { title: "Slow productivity", checked: true },
      { title: "100 Things every designer needs to...", checked: true },
      { title: "Rocket surgery made easy", checked: true },
      { title: "Interaction of colors - Josef Albers", checked: true },
      { title: "Lateral thinking", checked: true },
      { title: "AI and UX - Gavin Lew", checked: true },
      { title: "Just Enough Research - Erika Hall", checked: true },
      { title: "Design is a job - Mike Monteiro", checked: true },
    ],
  ];

  return (
    <section className="mt-23 pt-8 pb-20 px-6 md:px-12 font-portfolio" id="readings">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl mb-2 text-white">
            Readings<span className="text-[#EB5097]">.</span>
          </h2>
          <p className="mb-12 text-white/50 text-sm">Updated - 10/28/2026</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {readingsList.map((column, colIndex) => (
              <ScrollReveal key={colIndex} delay={colIndex * 0.1} className="space-y-4">
                {column.map((reading, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-0.5 w-[18px] h-[18px] border-2 border-white/30 rounded-sm flex items-center justify-center"
                      style={{
                        backgroundColor: reading.checked ? "rgba(255, 255, 255, 0.15)" : "transparent",
                      }}
                      aria-hidden
                    >
                      {reading.checked && (
                        <Check className="w-3 h-3 text-white/70" />
                      )}
                    </div>
                    <span
                      className={`text-[15px] leading-normal ${
                        reading.checked ? "text-white/50" : "text-white/70"
                      }`}
                    >
                      {reading.title}
                    </span>
                  </div>
                ))}
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
