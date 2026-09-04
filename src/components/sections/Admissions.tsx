import { ArrowRight, MessageCircle } from "lucide-react";
import cta from "@/assets/cta-admission.jpg";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/data/site";

export function Admissions() {
  return (
    <section id="pmb" className="relative isolate overflow-hidden">
      <img
        src={cta}
        alt="Civitas akademika IAIKU Cirebon"
        loading="lazy"
        width={1920}
        height={900}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="bg-forest-deep/85 absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
            Penerimaan Mahasiswa Baru
          </span>
          <h2 className="font-display mt-5 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            Wujudkan Masa Depanmu Bersama IAIKU Cirebon
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            Bergabunglah bersama generasi yang berakhlak, unggul, digital, dan
            berdaya saing global.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-forest-deep inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              DAFTAR SEKARANG <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> KONSULTASI PMB
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
