import { ArrowRight } from "lucide-react";
import about from "@/assets/about-students.jpg";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <section id="tentang" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="bg-gold/25 absolute -top-6 -left-6 h-32 w-32 rounded-3xl" />
            <div className="border-emerald/30 absolute -right-6 -bottom-6 h-40 w-40 rounded-full border-2" />
            <img
              src={about}
              alt="Mahasiswa IAIKU Cirebon berdiskusi di lingkungan kampus"
              width={1200}
              height={1200}
              loading="lazy"
              className="relative h-full w-full rounded-3xl object-cover shadow-xl"
            />
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow="Tentang Kami"
              title="Mengenal IAI Kanzul Ulum Cirebon"
              subtitle="Perguruan Tinggi Islam Berbasis Pesantren, Teknologi Digital, dan Kearifan Lokal"
            />
            <p className="text-muted-foreground mt-6 text-base leading-relaxed">
              Institut Agama Islam Kanzul Ulum Cirebon (IAIKU Cirebon) hadir
              sebagai perguruan tinggi Islam yang mengintegrasikan nilai-nilai
              pesantren, perkembangan teknologi digital, ilmu pengetahuan, serta
              kearifan lokal Cirebon untuk membentuk generasi yang unggul dan
              mampu bersaing di tingkat global.
            </p>
            <a
              href="#visi"
              className="bg-forest hover:bg-emerald mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              SELENGKAPNYA <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
