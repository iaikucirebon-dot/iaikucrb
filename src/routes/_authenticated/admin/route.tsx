import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, Newspaper, Users } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { claimFirstAdmin, getMyAdminStatus } from "@/lib/news.functions";
import logoIaiku from "@/assets/logo-iaiku.png.asset.json";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Ringkasan", icon: LayoutDashboard, exact: true },
  { to: "/admin/akademik", label: "Fakultas & Prodi", icon: GraduationCap, exact: false },
  { to: "/admin/dosen", label: "Dosen", icon: Users, exact: false },
  { to: "/admin/berita", label: "Berita", icon: Newspaper, exact: false },
  { to: "/admin/pmb", label: "PMB & Biaya", icon: BookOpen, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchStatus = useServerFn(getMyAdminStatus);
  const claim = useServerFn(claimFirstAdmin);

  const statusQuery = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const isAdmin = statusQuery.data?.isAdmin ?? false;

  const claimMutation = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => {
      toast.success("Anda kini menjadi admin.");
      queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (statusQuery.isLoading) {
    return <p className="p-10 text-center text-sm">Memuat...</p>;
  }

  if (!isAdmin) {
    return (
      <main className="bg-sand flex min-h-screen items-center justify-center px-4">
        <div className="border-border max-w-md rounded-2xl border bg-white p-8 text-center">
          <h1 className="font-display text-forest text-xl">Akses admin diperlukan</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            Akun Anda belum berstatus admin. Jika ini pemasangan pertama, jadikan akun ini sebagai
            admin utama.
          </p>
          <Button
            className="mt-5"
            onClick={() => claimMutation.mutate()}
            disabled={claimMutation.isPending}
          >
            Jadikan akun ini admin
          </Button>
          <p className="mt-5 text-sm">
            <button className="text-muted-foreground underline" onClick={handleSignOut}>
              Keluar
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-sand min-h-screen">
      <header className="bg-forest sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logoIaiku} alt="Logo IAIKU Cirebon" className="h-9 w-9 object-contain" />
            <span className="font-display text-sm text-white sm:text-base">
              Dashboard Admin IAIKU
            </span>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant="secondary">
              <Link to="/">Lihat situs</Link>
            </Button>
            <Button size="sm" variant="secondary" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>
        <nav className="border-t border-white/10">
          <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 sm:px-4">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap text-white/70 transition-colors hover:text-white [&.active]:border-b-2 [&.active]:border-[color:var(--color-gold,#d4af37)] [&.active]:text-white"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
