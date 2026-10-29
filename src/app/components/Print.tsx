import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import westeniaZineThumb from "../../assets/urc-westenia-zine-print.png";

const WESTENIA_DIGITAL_READER_URL = "https://cake-alter-80478593.figma.site/";

export function Print() {
  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio pb-20" id="print">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl mb-2 text-white">
            Print<span className="text-[#EB5097]">.</span>
          </h2>
          <p className="text-white/50 text-sm uppercase tracking-wide mb-3">
            URC Zine 001 — Westenia
          </p>
          <p className="text-white/60 text-base max-w-2xl mb-8">
            Editorial print design for URC Records — cover, typography, and a paired digital reader.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-8 max-w-3xl">
            <img
              src={westeniaZineThumb}
              alt="Westenia print zine — stacked copies, URC Zine 001 cover"
              className="w-full h-auto block"
              loading="lazy"
              decoding="async"
            />
            <p className="text-white/40 text-xs text-center py-3 px-4 border-t border-white/10">
              Cover and print mock — risograph-style treatment, serif title, stippled sprout motif
            </p>
          </div>

          <blockquote className="border-l-2 border-[#EB5097]/60 pl-5 mb-6 max-w-3xl">
            <p className="text-white/80 text-lg leading-relaxed italic">
              Westenia is near-future fiction I shaped as a zine:{" "}
              <span className="not-italic font-normal text-white">
                A Chronicle of Collapse &amp; Becoming
              </span>
              . The print piece is the object; the reader is the same layout and story in screen form — both
              designed as one editorial system for{" "}
              <a
                href="https://www.urc-records.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic font-normal text-white underline underline-offset-2 hover:text-[#EB5097] transition-colors"
              >
                URC Records
              </a>
              .
            </p>
          </blockquote>

          <a
            href={WESTENIA_DIGITAL_READER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#EB5097]/40 bg-[#EB5097]/10 px-6 py-3 text-white text-sm font-medium transition-colors hover:bg-[#EB5097]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]"
          >
            View Westenia — reader
            <ExternalLink className="w-4 h-4 text-white/70" aria-hidden />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
