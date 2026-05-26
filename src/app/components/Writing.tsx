import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Writing() {
  const articles = [
    {
      id: "agentic-data-plane",
      title: "The Agentic Data Plane (ADP): A New Category in AI Infrastructure",
      description: "Connecting AI agents with Enterprise Systems",
      link: "https://medium.com/@danielfornicauxui/the-agentic-data-plane-adp-a-new-category-in-ai-infrastructure-9ea329d6cbc3"
    },
    {
      id: "designing-intelligence",
      title: "Designing Intelligence: A Framework for Building Human-Centered AI Products",
      description: "We used to design screens. Now we design decisions.",
      link: "https://medium.com/@danielfornicauxui/designing-intelligence-a-framework-for-building-human-centered-ai-products-cd336cb6330a"
    }
  ];

  return (
    <section className="pt-8 mt-8 px-6 md:px-12" id="writing">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl mb-12"
          style={{ 
            fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
            color: 'white'
          }}
        >
          Writing<span style={{ color: '#EB5097' }}>.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black border border-white/10 rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              style={{
                minHeight: '240px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#EB5097';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(235, 80, 151, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 
                  className="text-xl mb-4"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'white'
                  }}
                >
                  {article.title}
                </h3>
                <p 
                  className="text-base mb-6"
                  style={{ 
                    fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {article.description}
                </p>
              </div>

              <div 
                className="flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors"
                style={{ 
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                Read article on Medium
                <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.a>
          ))}

          {/* Medium Link Card */}
          <motion.a
            href="https://medium.com/@danielfornicauxui"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-black border border-white/10 rounded-2xl p-8 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
            style={{
              minHeight: '240px',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#EB5097';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(235, 80, 151, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <p 
              className="text-sm mb-4 text-white/40"
              style={{ 
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              Read all my articles on
            </p>
            <div 
              className="text-5xl mb-6"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: 'white',
                fontWeight: 400
              }}
            >
              Medium
            </div>
            <ArrowUpRight className="w-8 h-8 text-white/60 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}