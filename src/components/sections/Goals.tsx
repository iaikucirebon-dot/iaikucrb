import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const GOALS = [
  {
    no: "01",
    title: "Menghasilkan Lulusan Unggul",
    text: "Menghasilkan lulusan unggul, berakhlak, dan siap menghadapi tantangan global.",
  },
  {
    no: "02",
    title: "Mengembangkan Ilmu & Inovasi",
    text: "Mengembangkan ilmu pengetahuan dan inovasi berbasis pesantren, teknologi digital, dan kearifan lokal.",
  },
  {
    no: "03",
    title: "Berkontribusi untuk Masyarakat",
    text: "Berkontribusi dalam pembangunan masyarakat melalui pendidikan, penelitian, dan pengabdian.",
  },
];

export function Goals() {
  return (
    <section id="tujuan" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tujuan"
          title="Tujuan IAIKU Cirebon"
          subtitle="Arah capaian institusi yang dirancang untuk memberi dampak nyata bagi mahasiswa dan masyarakat."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {GOALS.map((g, i) => (
            <Reveal key={g.no} delay={i * 120}>
              <article className="border-border relative h-full overflow-hidden rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="font-display text-secondary absolute -top-4 right-4 text-8xl select-none">
                  {g.no}
                </span>
                <div className="bg-gold h-1 w-12 rounded-full" />
                <h3 className="font-display text-forest relative mt-6 text-xl">
                  {g.title}
                </h3>
                <p className="text-muted-foreground relative mt-3 text-sm leading-relaxed">
                  {g.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
