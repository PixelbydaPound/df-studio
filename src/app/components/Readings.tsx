import { motion } from "motion/react";
import { Check } from "lucide-react";

export function Readings() {
  const readingsList = [
    // Column 1
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
    // Column 2
    [
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
    // Column 3
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
    <section className="mt-23 pt-8 pb-20 px-6 md:px-12" id="readings">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl mb-2"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: "white",
            }}
          >
            Readings<span style={{ color: "#EB5097" }}>.</span>
          </h2>
          <p
            className="mb-12"
            style={{
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "14px",
            }}
          >
            Updated - 03/13/2026
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {readingsList.map((column, colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: colIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {column.map((reading, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-0.5"
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: "3px",
                        backgroundColor: reading.checked
                          ? "rgba(255, 255, 255, 0.15)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {reading.checked && (
                        <Check
                          className="w-3 h-3"
                          style={{ color: "rgba(255, 255, 255, 0.7)" }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                        color: reading.checked
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(255, 255, 255, 0.7)",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      {reading.title}
                    </span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}