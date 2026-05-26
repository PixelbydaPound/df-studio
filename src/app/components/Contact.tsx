import { motion } from "motion/react";
import { Calendar, Mail, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export function Contact() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  return (
    <section className="pt-8 mt-23 px-6 md:px-12" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left side - Hero text */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl mb-6"
              style={{ 
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'white'
              }}
            >
              Contact Me<span style={{ color: '#EB5097' }}>.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg max-w-xl"
              style={{ 
                fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.8'
              }}
            >
              Let's build something exceptional. I'm open to connecting about design roles, systems, and opportunities where strategy meets creativity.
            </motion.p>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex flex-col gap-4 md:min-w-[280px]">
            <motion.button
              onClick={() => setIsCalendlyOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 px-6 py-4"
              style={{
                backgroundColor: '#EB5097'
              }}
            >
              <Calendar className="w-5 h-5" style={{ color: 'white' }} />
              <span 
                style={{
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  color: 'white'
                }}
              >
                Schedule a Call
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
                }}
              />
            </motion.button>

            <motion.a
              href="mailto:danielfornicauxui@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 px-6 py-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Mail className="w-5 h-5" style={{ color: '#EB5097' }} />
              <span 
                style={{
                  fontFamily: '"Helvetica Now Display", -apple-system, BlinkMacSystemFont, sans-serif',
                  color: 'white'
                }}
              >
                Email Me
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(235, 80, 151, 0.1) 0%, transparent 100%)'
                }}
              />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <Dialog open={isCalendlyOpen} onOpenChange={setIsCalendlyOpen}>
        <DialogContent 
          className="max-w-4xl w-full p-0 overflow-hidden"
          style={{
            backgroundColor: '#0A0A0A',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxHeight: '90vh'
          }}
        >
          <DialogTitle className="sr-only">Schedule a Call</DialogTitle>
          <div className="relative w-full h-[700px]">
            <iframe
              src="https://calendly.com/danielfornicauxui/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ minHeight: '700px' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
