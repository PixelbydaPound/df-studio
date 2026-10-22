import { Calendar, Mail } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { ScrollReveal } from "./ScrollReveal";

export function Contact() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <ScrollReveal as="h2" className="text-4xl md:text-5xl mb-6 text-white">
              Contact Me<span className="text-[#EB5097]">.</span>
            </ScrollReveal>

            <ScrollReveal as="p" delay={0.1} className="text-lg max-w-xl text-white/70 leading-relaxed">
              Let's build something exceptional. I'm open to connecting about design roles,
              systems, and opportunities where strategy meets creativity.
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-4 md:min-w-[280px]">
            <ScrollReveal delay={0.2}>
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(true)}
                className="portfolio-cta group relative overflow-hidden rounded-xl flex items-center justify-center gap-3 px-6 py-4 w-full bg-[#EB5097] text-white"
              >
                <Calendar className="w-5 h-5" aria-hidden />
                <span>Schedule a Call</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                  }}
                />
              </button>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <a
                href="mailto:danielfornicauxui@gmail.com"
                className="portfolio-cta group relative overflow-hidden rounded-xl flex items-center justify-center gap-3 px-6 py-4 w-full bg-white/[0.03] border border-white/10 text-white"
              >
                <Mail className="w-5 h-5 text-[#EB5097]" aria-hidden />
                <span>Email Me</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(235, 80, 151, 0.1) 0%, transparent 100%)",
                  }}
                />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent
          className="max-w-4xl w-full p-0 overflow-hidden bg-[#0A0A0A] border border-white/10 max-h-[90vh]"
        >
          <DialogTitle className="sr-only">Schedule a Call</DialogTitle>
          <div className="relative w-full h-[700px]">
            <iframe
              src="https://calendly.com/danielfornicauxui/30min"
              width="100%"
              height="100%"
              title="Schedule a call with Daniel Fornica"
              style={{ minHeight: "700px", border: 0 }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
