import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const ITEMS = [
  { label: "Biaya Pendaftaran", price: "Rp 250.000" },
  {
    label:
      "Uang Kemahasiswaan, Jas Almamater, Masa Orientasi & Kartu Mahasiswa",
    price: "Rp 500.000",
  },
  { label: "Uang Gedung", price: "Rp 1.000.000", note: "Beasiswa Yayasan 50%" },
  { label: "SPP 1 Semester", price: "Rp 1.200.000", note: "Beasiswa Yayasan 50%" },
];

export function Tuition() {
  return (
    <section id="biaya" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Biaya Kuliah"
          title="Biaya Kuliah Terjangkau, Masa Depan Berkualitas"
          subtitle="Rincian biaya yang transparan dengan dukungan beasiswa yayasan untuk meringankan mahasiswa."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ul className="border-border divide-border divide-y overflow-hidden rounded-2xl border bg-white">
              {ITEMS.map((it) => (
                <li
                  key={it.label}
                  className="hover:bg-secondary/60 flex flex-wrap items-center justify-between gap-3 px-6 py-5 transition-colors"
                >
                  <div>
                    <h3 className="text-forest text-sm font-semibold">
                      {it.label}
                    </h3>
                    {it.note ? (
                      <span className="text-emerald mt-1 inline-flex items-center gap-1 text-xs font-medium">
                        <BadgeCheck className="h-3.5 w-3.5" /> {it.note}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-display text-forest text-lg">
                    {it.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-4 text-xs">
              Biaya dapat menyesuaikan ketentuan dan kebijakan institusi.
            </p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="bg-forest ring-gold/40 h-full rounded-3xl p-8 shadow-xl ring-1">
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                Total Biaya
              </span>
              <p className="font-display mt-4 text-4xl text-white sm:text-5xl">
                Rp 2.950.000
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Total biaya masuk untuk semester pertama, sudah termasuk
                pendaftaran, kemahasiswaan, uang gedung, dan SPP.
              </p>
              <a
                href="#pmb"
                className="bg-gold text-forest-deep mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                DAFTAR SEKARANG <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
