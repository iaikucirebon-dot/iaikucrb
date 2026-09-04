import { ArrowRight, Compass } from "lucide-react";
import hero from "@/assets/hero-campus.jpg";
import { Reveal } from "@/components/Reveal";

const STATS = [
  { value: "4", label: "Program Studi" },
  { value: "3", label: "Fakultas & Bidang Pengembangan Akademik" },
  { value: "24+", label: "Dosen Profesional" },
  { value: "100%", label: "Berbasis Pesantren & Teknologi Digital" },
];

export function Hero() {
  return (
    <section id="beranda" className="relative isolate overflow-hidden">
      <img
        src={hero}
        alt="Gedung kampus Institut Agama Islam Kanzul Ulum Cirebon"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="from-forest-deep/95 via-forest/80 to-forest-deep/70 absolute inset-0 bg-gradient-to-r" />
      <div className="from-forest-deep/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44 lg:px-8 lg:pt-52 lg:pb-24">
        <Reveal>
          <span className="border-gold/50 text-gold inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase">
            Institut Agama Islam Kanzul Ulum Cirebon
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="font-display mt-6 max-w-4xl text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Kearifan Lokal <span className="text-gold">Berdaya Saing Global</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Membangun generasi unggul, berakhlak, digital, dan berwawasan global
            berbasis pesantren serta kearifan lokal.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#pmb"
              className="bg-gold text-forest-deep inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              DAFTAR SEKARANG <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#tentang"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <Compass className="h-4 w-4" /> JELAJAHI KAMPUS
            </a>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-forest-deep/40 px-5 py-6">
                <dt className="font-display text-gold text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-white/75">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
