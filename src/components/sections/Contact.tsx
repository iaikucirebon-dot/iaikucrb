import { useState, type FormEvent } from "react";
import { Globe, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/data/site";

export function Contact() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Terima kasih! Pesan Anda telah kami terima.");
      e.currentTarget?.reset?.();
    }, 600);
  }

  return (
    <section id="kontak" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Kontak"
          title="Hubungi Kami"
          subtitle="Kami siap membantu Anda mendapatkan informasi seputar pendaftaran dan akademik."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="border-border overflow-hidden rounded-3xl border bg-white shadow-sm">
              <iframe
                title="Peta lokasi kampus IAIKU Cirebon"
                src="https://www.google.com/maps?q=Jl.%20Pemuda%20No.%2033%20Sunyaragi%20Kesambi%20Kota%20Cirebon&output=embed"
                loading="lazy"
                className="h-72 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="space-y-4 p-7">
                <p className="text-forest flex gap-3 text-sm leading-relaxed">
                  <MapPin className="text-emerald mt-0.5 h-5 w-5 shrink-0" />
                  {SITE.address}
                </p>
                <p className="text-forest flex gap-3 text-sm">
                  <Globe className="text-emerald h-5 w-5 shrink-0" />
                  Website: {SITE.website}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              onSubmit={onSubmit}
              className="border-border space-y-5 rounded-3xl border bg-white p-7 shadow-sm"
            >
              <div>
                <label htmlFor="nama" className="text-forest text-sm font-medium">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  required
                  className="border-input focus:border-emerald focus:ring-emerald/30 mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                  placeholder="Nama lengkap Anda"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-forest text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-input focus:border-emerald focus:ring-emerald/30 mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                  placeholder="nama@email.com"
                />
              </div>
              <div>
                <label htmlFor="wa" className="text-forest text-sm font-medium">
                  Nomor WhatsApp
                </label>
                <input
                  id="wa"
                  name="wa"
                  inputMode="tel"
                  required
                  className="border-input focus:border-emerald focus:ring-emerald/30 mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="text-forest text-sm font-medium">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={4}
                  required
                  className="border-input focus:border-emerald focus:ring-emerald/30 mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2"
                  placeholder="Tuliskan pertanyaan Anda"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="bg-forest hover:bg-emerald inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-70"
              >
                <Send className="h-4 w-4" />
                {sending ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
