import { motion } from "motion/react";
import { Code2, Palette, Sparkles } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Code2,
      title: "Development",
      description: "Building robust and scalable web applications using modern technologies and best practices."
    },
    {
      icon: Palette,
      title: "Design",
      description: "Creating intuitive and beautiful interfaces that users love to interact with."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Exploring creative solutions and pushing the boundaries of what's possible on the web."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate creative developer with a keen eye for design and a love for building
            exceptional digital experiences. With years of experience in the industry, I bring ideas
            to life through code and creativity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-accent/50 hover:bg-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
