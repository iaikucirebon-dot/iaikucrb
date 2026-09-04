import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/95 border-border border-b shadow-sm backdrop-blur-md"
          : "bg-forest-deep/20 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="flex items-center gap-3">
          <span className="bg-forest text-primary-foreground ring-gold/40 flex h-11 w-11 items-center justify-center rounded-xl ring-1">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "font-display block text-base tracking-wide",
                scrolled || open ? "text-forest" : "text-white",
              )}
            >
              IAIKU CIREBON
            </span>
            <span
              className={cn(
                "block text-[11px]",
                scrolled || open ? "text-muted-foreground" : "text-white/70",
              )}
            >
              Institut Agama Islam Kanzul Ulum
            </span>
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    scrolled
                      ? "text-foreground hover:text-emerald hover:bg-secondary"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#pmb"
            className="bg-emerald hover:bg-forest hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            DAFTAR SEKARANG
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors xl:hidden",
              scrolled || open
                ? "text-forest hover:bg-secondary"
                : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}

      </div>

      {open ? (
        <div className="border-border bg-background border-t xl:hidden">
          <nav aria-label="Navigasi mobile" className="mx-auto max-w-7xl px-4 py-4">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-foreground hover:bg-secondary hover:text-emerald block rounded-md px-3 py-3 text-sm font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#pmb"
              onClick={() => setOpen(false)}
              className="bg-emerald mt-3 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
            >
              DAFTAR SEKARANG
            </a>
            <p className="text-muted-foreground mt-3 text-center text-xs">
              {SITE.website}
            </p>
          </nav>
        </div>
      ) : null}
      <span className="sr-only">
        <X aria-hidden="true" />
      </span>
    </header>
  );
}
