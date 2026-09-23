import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { getAdminContent } from "@/lib/cms.functions";
import { listAllNews } from "@/lib/news.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard Admin | IAIKU Cirebon" },
      { name: "description", content: "Ringkasan pengelolaan konten IAIKU Cirebon." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const fetchContent = useServerFn(getAdminContent);
  const fetchNews = useServerFn(listAllNews);

  const content = useQuery({ queryKey: ["admin-content"], queryFn: () => fetchContent() });
  const news = useQuery({ queryKey: ["admin-news"], queryFn: () => fetchNews() });

  const c = content.data;
  const cards = [
    { label: "Fakultas", value: c?.faculties.length ?? 0, to: "/admin/akademik" as const },
    { label: "Program Studi", value: c?.programs.length ?? 0, to: "/admin/akademik" as const },
    { label: "Dosen", value: c?.lecturers.length ?? 0, to: "/admin/dosen" as const },
    { label: "Berita", value: news.data?.length ?? 0, to: "/admin/berita" as const },
    { label: "Pendaftar PMB", value: c?.admissions.length ?? 0, to: "/admin/pmb" as const },
  ];

  const baru = (c?.admissions ?? []).filter((a) => a.status === "baru");

  return (
    <div>
      <h1 className="font-display text-forest text-2xl">Ringkasan</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Kelola seluruh konten situs IAIKU Cirebon dari satu tempat.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="border-border hover:border-emerald/60 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <p className="text-muted-foreground text-xs tracking-wide uppercase">{card.label}</p>
            <p className="font-display text-forest mt-2 text-3xl">{card.value}</p>
          </Link>
        ))}
      </div>

      <section className="border-border mt-8 rounded-2xl border bg-white p-6">
        <h2 className="font-display text-forest text-lg">Pendaftar PMB Terbaru</h2>
        {baru.length === 0 ? (
          <p className="text-muted-foreground mt-3 text-sm">Belum ada pendaftar baru.</p>
        ) : (
          <ul className="mt-3 divide-y">
            {baru.slice(0, 5).map((a) => (
              <li key={a.id} className="py-3 text-sm">
                <span className="text-forest font-semibold">{a.full_name}</span>
                <span className="text-muted-foreground"> · {a.whatsapp}</span>
                {a.program_name ? (
                  <span className="text-muted-foreground"> · {a.program_name}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
