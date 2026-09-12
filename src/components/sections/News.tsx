import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { NEWS } from "@/data/site";
import fallbackImage from "@/assets/hero-campus.jpg";
import type { PublicNewsItem } from "@/lib/news.functions";

export function News({ items }: { items?: PublicNewsItem[] }) {
  const list: PublicNewsItem[] =
    items && items.length > 0
      ? items
      : NEWS.map((n) => ({
          slug: n.slug,
          title: n.title,
          category: n.category,
          excerpt: n.excerpt,
          date: n.date,
          image: n.image,
        }));

  return (
    <section id="berita" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Informasi"
          title="Berita & Informasi Terbaru"
          subtitle="Kabar terkini seputar kegiatan akademik, penelitian, pengabdian, dan kemahasiswaan IAIKU Cirebon."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((n, i) => (
            <Reveal as="article" key={n.slug} delay={(i % 3) * 110}>
              <div className="group border-border flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="bg-forest absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    {n.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
                    <CalendarDays className="h-3.5 w-3.5" /> {n.date}
                  </span>
                  <h3 className="font-display text-forest group-hover:text-emerald mt-3 text-lg leading-snug transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
                    {n.excerpt}
                  </p>
                  <a
                    href="#berita"
                    className="text-emerald mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-1"
                  >
                    Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="#berita"
            className="border-forest text-forest hover:bg-forest inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:text-white"
          >
            LIHAT SEMUA BERITA <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
