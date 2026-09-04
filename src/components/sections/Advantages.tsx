import {
  Landmark,
  Cpu,
  Sprout,
  Users,
  MoonStar,
  Globe2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const ITEMS = [
  {
    icon: Landmark,
    title: "Pendidikan Berbasis Pesantren",
    text: "Mengintegrasikan pendidikan tinggi dengan nilai-nilai pesantren.",
  },
  {
    icon: Cpu,
    title: "Teknologi Digital",
    text: "Mempersiapkan mahasiswa menghadapi transformasi digital.",
  },
  {
    icon: Sprout,
    title: "Kearifan Lokal",
    text: "Mengembangkan ilmu yang berakar pada budaya dan kearifan lokal.",
  },
  {
    icon: Users,
    title: "Dosen Profesional",
    text: "Didukung oleh akademisi dan tenaga pengajar berpengalaman.",
  },
  {
    icon: MoonStar,
    title: "Lingkungan Akademik Islami",
    text: "Membangun karakter, akhlak, dan kompetensi mahasiswa.",
  },
  {
    icon: Globe2,
    title: "Berorientasi Global",
    text: "Mempersiapkan lulusan agar mampu bersaing di tingkat nasional dan internasional.",
  },
];

export function Advantages() {
  return (
    <section id="keunggulan" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keunggulan"
          title="Mengapa Memilih IAIKU Cirebon?"
          subtitle="Enam alasan utama yang menjadikan IAIKU Cirebon pilihan tepat untuk masa depan Anda."
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal as="li" key={it.title} delay={(i % 3) * 100}>
              <div className="group border-border hover:bg-forest h-full rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <span className="bg-secondary text-forest group-hover:bg-gold group-hover:text-forest-deep flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                  <it.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-display text-forest mt-5 text-lg group-hover:text-white">
                  {it.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed group-hover:text-white/75">
                  {it.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
