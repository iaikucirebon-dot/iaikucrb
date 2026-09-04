import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { LECTURERS } from "@/data/site";

function initials(name: string) {
  const clean = name.replace(/(Prof\.|Dr\.|Drs\.|Ph\.D)/g, "").trim();
  const parts = clean.split(/\s+/).filter((p) => /^[A-Za-z]/.test(p));
  return (parts[0]?.[0] ?? "I") + (parts[1]?.[0] ?? "");
}

export function Lecturers() {
  return (
    <section id="dosen" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sumber Daya"
          title="Dosen & Akademisi IAIKU Cirebon"
          subtitle="Didukung guru besar, doktor, dan praktisi berpengalaman di bidang pendidikan Islam serta hukum."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LECTURERS.map((name, i) => (
            <Reveal as="li" key={name} delay={(i % 4) * 70}>
              <div className="group border-border flex h-full items-center gap-4 rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="bg-forest text-gold font-display group-hover:bg-emerald flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm transition-colors group-hover:text-white">
                  {initials(name).toUpperCase()}
                </span>
                <h3 className="text-forest text-sm leading-snug font-medium">
                  {name}
                </h3>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <a
            href="#kontak"
            className="border-forest text-forest hover:bg-forest inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:text-white"
          >
            LIHAT SEMUA DOSEN <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
