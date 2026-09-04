import { ArrowRight, GraduationCap, Scale, Baby, School } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FACULTIES } from "@/data/site";

const ICONS: Record<string, typeof GraduationCap> = {
  PAI: GraduationCap,
  PIAUD: Baby,
  PGMI: School,
  HPI: Scale,
};

export function Faculties() {
  return (
    <section id="fakultas" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Akademik"
          title="Fakultas & Program Studi"
          subtitle="Temukan program studi yang sesuai dengan minat dan masa depan Anda."
        />

        <div className="mt-14 space-y-10">
          {FACULTIES.map((f, fi) => (
            <Reveal key={f.name} delay={fi * 100}>
              <div className="border-border overflow-hidden rounded-3xl border bg-white shadow-sm">
                <div className="bg-forest px-8 py-7">
                  <h3 className="font-display text-xl text-white sm:text-2xl">
                    {f.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-white/70">{f.desc}</p>
                </div>
                <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
                  {f.programs.map((p) => {
                    const Icon = ICONS[p.code] ?? GraduationCap;
                    return (
                      <article
                        key={p.code}
                        className="group border-border hover:border-emerald/50 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                      >
                        <span className="bg-secondary text-forest group-hover:bg-emerald flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <h4 className="font-display text-forest mt-5 text-lg leading-snug">
                          {p.name}
                        </h4>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {p.desc}
                        </p>
                        <a
                          href="#pmb"
                          className="text-emerald mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                        >
                          Lihat Program Studi <ArrowRight className="h-4 w-4" />
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
