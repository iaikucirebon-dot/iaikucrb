import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { FACILITIES } from "@/data/site";

export function Facilities() {
  return (
    <section id="fasilitas" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fasilitas"
          title="Fasilitas untuk Mendukung Masa Depan Anda"
          subtitle="Sarana belajar yang lengkap dan nyaman untuk menunjang aktivitas akademik serta pengembangan diri mahasiswa."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 4) * 90}>
              <figure className="group relative h-56 overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={f.img}
                  alt={`Fasilitas ${f.title} IAIKU Cirebon`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="from-forest-deep/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-95" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-base leading-snug text-white">
                    {f.title}
                  </h3>
                  <span className="bg-gold mt-2 block h-0.5 w-0 transition-all duration-300 group-hover:w-12" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
