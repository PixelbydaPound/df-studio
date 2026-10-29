import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import westeniaZineThumb from "../../assets/urc-westenia-zine-print.png";

const URC_ZINES_SHOP_URL = "https://www.urc-records.com/zines.html";
const WESTENIA_DIGITAL_READER_URL = "https://cake-alter-80478593.figma.site/";

export function Print() {
  return (
    <section className="pt-8 mt-23 px-6 md:px-12 font-portfolio pb-20" id="print">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl mb-2 text-white">
            Print<span className="text-[#EB5097]">.</span>
          </h2>
          <p className="text-white/50 text-sm uppercase tracking-wide mb-8">
            URC Zine 001 — Westenia
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
              Print edition — risograph-style cover, limited run (sold out on{" "}
              <a
                href={URC_ZINES_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 underline underline-offset-2 hover:text-[#EB5097]"
              >
                urc-records.com/zines
              </a>
              )
            </p>
          </div>

          <blockquote className="border-l-2 border-[#EB5097]/60 pl-5 mb-6 max-w-3xl">
            <p className="text-white/80 text-lg leading-relaxed italic mb-3">
              Westenia is fiction set in the near future—not a forecast, but a world still becoming after
              old orders crack.{" "}
              <span className="not-italic font-normal text-white">
                A Chronicle of Collapse &amp; Becoming
              </span>{" "}
              is URC&apos;s first long-form editorial: the print object for collectors, with a digital edition
              so the story still travels when the run is gone.
            </p>
            <p className="text-white/50 text-sm not-italic">
              For recruiters: the link below opens the full 22-spread reader (same narrative as print).
            </p>
          </blockquote>

          <div className="flex flex-wrap gap-3">
            <a
              href={WESTENIA_DIGITAL_READER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EB5097]/40 bg-[#EB5097]/10 px-6 py-3 text-white text-sm font-medium transition-colors hover:bg-[#EB5097]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]"
            >
              Read Westenia
              <ExternalLink className="w-4 h-4 text-white/70" aria-hidden />
            </a>
            <a
              href={URC_ZINES_SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-white/80 text-sm transition-colors hover:border-white/25 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5097]"
            >
              Zines shop — digital $5
              <ExternalLink className="w-4 h-4 text-white/50" aria-hidden />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
