import { BookOpen, FlaskConical, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const MISSIONS = [
  {
    no: "01",
    icon: BookOpen,
    title: "Pendidikan",
    text: "Menyelenggarakan pendidikan sarjana unggul berbasis integrasi pesantren dan teknologi digital.",
  },
  {
    no: "02",
    icon: FlaskConical,
    title: "Penelitian",
    text: "Mengembangkan penelitian inovatif berbasis kearifan lokal yang diakui secara internasional.",
  },
  {
    no: "03",
    icon: HeartHandshake,
    title: "Pengabdian",
    text: "Melaksanakan pengabdian kepada masyarakat yang transformatif dan berkelanjutan.",
  },
];

export function Mission() {
  return (
    <section id="misi" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Misi"
          title="Misi Kami"
          subtitle="Tiga pilar utama yang menjadi arah gerak institusi dalam melaksanakan Tri Dharma Perguruan Tinggi."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MISSIONS.map((m, i) => (
            <Reveal key={m.no} delay={i * 120}>
              <article className="group border-border h-full rounded-2xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="bg-forest text-primary-foreground group-hover:bg-emerald flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                    <m.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-gold text-3xl">{m.no}</span>
                </div>
                <h3 className="font-display text-forest mt-6 text-xl">{m.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {m.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
