import { motion } from "motion/react";

export function Story() {
  return (
    <section className="pt-8 mt-23 px-6 md:px-12" id="story">
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
          My story<span style={{ color: '#EB5097' }}>.</span>
        </motion.h2>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg mb-6"
            style={{ 
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8'
            }}
          >
            I'm a Product Designer with over 4 years of experience crafting scalable digital experiences across FinTech, GovTech, and AI-driven SaaS platforms. My work sits at the intersection of design systems, accessibility, and intelligent automation — where design thinking meets emerging technology.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg mb-6"
            style={{ 
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8'
            }}
          >
            In FinTech, I helped shape the member and business experiences at Mahalo Banking, a cloud-based digital platform built for credit unions. With accessibility and trust at the core, I designed omniplatform experiences that modernized legacy banking systems while maintaining strict security and fraud-prevention standards. I also led the development of a scalable design system that improved rollout consistency and enabled smaller institutions to compete with modern digital banks.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg mb-6"
            style={{ 
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8'
            }}
          >
            In GovTech, I joined Avue Technologies, contributing to the transformation of a legacy HR system into an AI-native SaaS platform within AWS GovCloud — serving federal and DoD agencies under FedRAMP compliance. My role focused on building modular design systems and conversational AI workflows for talent management, job matching, recruitment, and performance tracking. I worked closely with cross-functional teams to align designs with federal taxonomies and accessibility regulations while introducing role-based, multi-tenant interfaces that improved both recruiter and civilian jobseeker experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg mb-6"
            style={{ 
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8'
            }}
          >
            Alongside product work, I run{" "}
            <a 
              href="https://localfluxai.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white"
              style={{ 
                color: '#EB5097',
                textDecoration: 'none'
              }}
            >
              Local Flux
            </a>
            {" "}— a private design studio that helps businesses grow through tailored branding, websites, and digital experiences. These real-world projects keep my craft sharp and constantly inspire fresh thinking.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-lg"
            style={{ 
              fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.8'
            }}
          >
            Today, I continue to explore how AI, design systems, and human-centered design can work together to create more adaptive, inclusive, and intelligent digital ecosystems.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
