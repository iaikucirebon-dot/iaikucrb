import { Facebook, Instagram, Youtube, Music2, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/data/site";
import logoIaiku from "@/assets/logo-iaiku.png.asset.json";

const AKADEMIK = [
  "Program Studi",
  "PMB",
  "Dosen",
  "Fasilitas",
  "Berita",
];

const SOCIALS = [
  { icon: Instagram, label: "@iaikanzululum.cirebon", href: SITE.socials.instagram },
  { icon: Music2, label: "@iaikanzululum.cirebon", href: SITE.socials.tiktok },
  { icon: Facebook, label: "IAIKU Cirebon", href: SITE.socials.facebook },
  { icon: Youtube, label: "IAIku Cirebon", href: SITE.socials.youtube },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoIaiku.url}
                alt="Logo IAIKU Cirebon"
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 shrink-0 object-contain"
              />
              <span className="font-display text-lg tracking-wide">IAIKU CIREBON</span>
            </div>
            <p className="text-gold mt-5 text-sm italic">&ldquo;{SITE.slogan}&rdquo;</p>
            <div className="mt-6">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
                Ikuti IAIKU Cirebon
              </h3>
              <ul className="mt-3 flex gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.href + s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="hover:bg-gold hover:text-forest-deep flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors"
                    >
                      <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Navigasi footer">
            <h3 className="font-display text-base">Navigasi</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="hover:text-gold text-sm text-white/70 transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-base">Akademik</h3>
            <ul className="mt-4 space-y-2.5">
              {AKADEMIK.map((a) => (
                <li key={a}>
                  <a
                    href="#fakultas"
                    className="hover:text-gold text-sm text-white/70 transition-colors"
                  >
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base">Kontak</h3>
            <p className="mt-4 flex gap-3 text-sm leading-relaxed text-white/70">
              <MapPin className="text-gold mt-0.5 h-5 w-5 shrink-0" />
              {SITE.address}
            </p>
            <p className="mt-3 text-sm text-white/70">Website: {SITE.website}</p>
            <p className="mt-3 text-sm">
              <Link to="/auth" className="hover:text-gold text-white/50 transition-colors">
                Masuk Pengelola
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          © 2026 Institut Agama Islam Kanzul Ulum Cirebon. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
